import assert from 'node:assert/strict'
import { installPageMotion } from '../src/lib/pageMotion.ts'

class MotionElement {
  dataset = {}
  properties = new Map()
  style = {
    setProperty: (name, value) => this.properties.set(name, value),
    removeProperty: (name) => this.properties.delete(name),
  }
  constructor(header = false) { this.header = header }
  matches(selector) { return this.header && selector === '.siteHeader' }
  contains(element) { return element === this || element.hero === this }
  closest(selector) { return selector === '.hero, .productHero' ? this.hero ?? null : this }
}
globalThis.Element = MotionElement
let observers = []
class Observer {
  targets = new Set()
  constructor(callback) { this.callback = callback; observers.push(this) }
  observe(element) { this.targets.add(element) }
  unobserve(element) { this.targets.delete(element) }
  disconnect() { this.targets.clear() }
  enter(element) { this.callback([{ isIntersecting: true, target: element }]) }
}
globalThis.IntersectionObserver = Observer

function fixture({ reduced = false, available = true, header = new MotionElement(true), heroChildren = [] } = {}) {
  const events = new Map()
  const rootEvents = new Map()
  const mediaEvents = new Map()
  const cards = Array.from({ length: 4 }, () => new MotionElement())
  const heading = new MotionElement()
  const nodes = [header, heading, ...cards, ...heroChildren]
  const media = { matches: reduced, addEventListener: (key, cb) => mediaEvents.set(key, cb), removeEventListener: (key) => mediaEvents.delete(key) }
  const root = {
    querySelectorAll: (selector) => selector === '.siteHeader' ? [header] : selector === '.sectionHeading' ? [heading] : selector.startsWith('.capabilityCard,') ? cards : selector === '.heroScroll, .productHeroAccent' ? heroChildren : [],
    addEventListener: (key, cb) => rootEvents.set(key, cb),
    removeEventListener: (key) => rootEvents.delete(key),
  }
  globalThis.window = {
    matchMedia: () => media,
    ...(available ? { IntersectionObserver: Observer } : {}),
    addEventListener: (key, cb) => events.set(key, cb),
    removeEventListener: (key) => events.delete(key),
  }
  return { root, nodes, header, heading, cards, events, rootEvents, media, mediaEvents }
}

const normal = fixture()
const cleanup = installPageMotion(normal.root)
const observer = observers.at(-1)
assert.equal(observer.targets.size, 6, 'Entrances start immediately without a loading screen')
assert.deepEqual(normal.cards.map((card) => card.dataset.motion), ['left', 'top', 'bottom', 'right'])
assert.equal(observer.targets.size, 6)
observer.enter(normal.header)
assert.equal(normal.header.dataset.motionState, 'visible')
assert.equal(observer.targets.has(normal.header), false, 'Entrances run once per page')
assert.equal(normal.heading.dataset.motionState, 'pending', 'Offscreen groups wait for intersection')
normal.rootEvents.get('focusin')({ target: normal.cards[0] })
assert.equal(normal.cards[0].dataset.motionState, 'visible', 'Keyboard focus reveals content')
assert.equal(normal.cards[0].properties.get('--motion-delay'), '0ms')
normal.media.matches = true
normal.mediaEvents.get('change')()
assert.ok(normal.nodes.every((node) => node.dataset.motionState === 'visible'))
cleanup()
assert.equal(normal.events.size, 0)
assert.equal(normal.rootEvents.size, 0)
assert.ok(normal.nodes.every((node) => !node.dataset.motion && !node.dataset.motionState && node.properties.size === 0))

const route = fixture({ header: normal.header })
const cleanupRoute = installPageMotion(route.root)
assert.equal(route.header.dataset.motionState, 'visible', 'Preserve an already visible fixed header')
assert.equal(observers.at(-1).targets.size, 5, 'SPA routes start with the existing header')
cleanupRoute()

const hero = new MotionElement()
const clippedControl = new MotionElement()
clippedControl.hero = hero
const clipped = fixture({ heroChildren: [clippedControl] })
const cleanupClipped = installPageMotion(clipped.root)
const clippedObserver = observers.at(-1)
assert.equal(clippedObserver.targets.has(hero), true, 'Observe the stable hero, not a translated clipped control')
assert.equal(clippedObserver.targets.has(clippedControl), false)
clippedObserver.enter(hero)
assert.equal(clippedControl.dataset.motionState, 'visible')
cleanupClipped()

for (const options of [{ reduced: true }, { available: false }]) {
  const fallback = fixture(options)
  observers = []
  installPageMotion(fallback.root)()
  assert.equal(observers.length, 0)
  assert.ok(fallback.nodes.every((node) => !node.dataset.motionState), 'Fallback content must never be hidden')
}
console.log('Immediate scroll reveal, focus, route cleanup and reduced-motion checks passed.')
