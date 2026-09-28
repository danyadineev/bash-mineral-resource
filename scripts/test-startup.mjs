import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'
import { runInNewContext } from 'node:vm'
import { hasPlaybackBuffer } from '../src/lib/heroMedia.ts'

const html = readFileSync(new URL('../index.html', import.meta.url), 'utf8')
const startup = html.match(/<script id="site-startup">([\s\S]*?)<\/script>/)[1]

// Exercise the actual early HTML shell without a browser or real timers.
function boot() {
  let now = 0
  let id = 0
  let removed = false
  const timers = new Map()
  const events = new Map()
  const root = { inert: true, dataset: { bootState: 'loading' }, removeAttribute() {} }
  const loader = { setAttribute() {}, classList: { add() {} }, remove() { removed = true } }
  runInNewContext(startup, {
    performance: { now: () => now },
    document: { getElementById: (name) => name === 'root' ? root : loader, documentElement: { classList: { remove() {} } } },
    window: { addEventListener: (name, cb) => events.set(name, cb), removeEventListener: (name) => events.delete(name) },
    setTimeout: (cb, delay) => { timers.set(++id, { cb, time: now + delay }); return id },
    clearTimeout: (timer) => timers.delete(timer),
  })
  return {
    root,
    get removed() { return removed },
    ready() { events.get('hero:ready')?.() },
    at(time) {
      while (true) {
        const next = [...timers].sort((a, b) => a[1].time - b[1].time)[0]
        if (!next || next[1].time > time) break
        timers.delete(next[0]); now = next[1].time; next[1].cb()
      }
      now = time
    },
  }
}

const early = boot()
early.at(100); early.ready(); early.at(2999)
assert.equal(early.root.inert, true)
early.at(3000)
assert.equal(early.root.dataset.bootState, 'ready')
assert.equal(early.root.inert, false)
early.at(3420)
assert.equal(early.removed, true)

const late = boot()
late.at(3800); late.ready(); late.at(3800)
assert.equal(late.root.dataset.bootElapsed, '3800')

// Slow, failed, autoplay-blocked or missing JS/media cannot trap the visitor.
const failed = boot()
failed.at(4500)
assert.equal(failed.root.dataset.bootState, 'poster')
assert.equal(failed.root.inert, false)
failed.at(4920)
assert.equal(failed.removed, true)
failed.ready()
assert.equal(failed.root.dataset.bootState, 'poster')

const ranges = (...items) => ({ length: items.length, start: (i) => items[i][0], end: (i) => items[i][1] })
assert.equal(hasPlaybackBuffer(ranges(), 0, 45), false)
assert.equal(hasPlaybackBuffer(ranges([0, 2]), 0, 45), false)
assert.equal(hasPlaybackBuffer(ranges([0, 3]), 0, 45), true)
assert.equal(hasPlaybackBuffer(ranges([0, 3]), 1, 45), false)
assert.equal(hasPlaybackBuffer(ranges([0, 3], [10, 15]), 10, 45), true)
assert.equal(hasPlaybackBuffer(ranges([0, 45]), 44, 45), true)
assert.equal(hasPlaybackBuffer(ranges([0, 45]), 0, NaN), false)
assert.equal(hasPlaybackBuffer(ranges([0, 45]), 45, 45), false)
console.log('Startup timing, cleanup, fallback and playback-buffer checks passed.')
