// Animate content groups, not section backgrounds or layout wrappers. Individual
// translate preserves existing transforms (notably the fixed, centered header).
const groups: [string, string[], number][] = [
  ['.siteHeader', ['top'], 0],
  ['.heroKicker, .productHeroCopy > .backLink', ['left'], 80],
  ['.heroBody > h1, .productBrand', ['left'], 160],
  ['.productHeroCopy > .eyebrow', ['top'], 220],
  ['.heroStatement, .productHeroCopy > h1', ['bottom'], 260],
  ['.heroActions, .productHeroCopy > p:last-child', ['right'], 360],
  ['.heroScroll, .productHeroAccent', ['bottom'], 440],
  ['.sectionHeading', ['left', 'right'], 0],
  ['.productChoice', ['left', 'right'], 0],
  ['.historyContent, .testingTimeline', ['right'], 80],
  ['.capabilityCard, .productProcessList > article', ['left', 'top', 'bottom', 'right'], 0],
  ['.greetingPortrait, .applicationPhoto', ['left'], 0],
  ['.greetingCopy, .applicationPassport, .passportSheet', ['right'], 100],
  ['.applicationBenefits > h3', ['left'], 0],
  ['.applicationBenefits li, .useGrid > article, .evidenceGrid > article', ['left', 'bottom', 'right'], 0],
  ['.applicationQuality', ['bottom'], 0],
  ['.productConsumerGrid > article, .productGalleryGrid > figure', ['left', 'right'], 0],
  ['.sampleInner > div', ['left', 'right'], 0],
  ['.contactList', ['right'], 80],
  ['.siteFooter > *', ['left', 'top', 'bottom', 'right'], 0],
]

const revealedHeaders = new WeakSet<HTMLElement>()

export function installPageMotion(root: HTMLElement) {
  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)')
  if (reduced.matches || !('IntersectionObserver' in window)) return () => {}

  const targets = new Set<HTMLElement>()
  for (const [selector, directions, delay] of groups) {
    root.querySelectorAll<HTMLElement>(selector).forEach((element, index) => {
      if (targets.has(element)) return
      targets.add(element)
      element.dataset.motion = directions[index % directions.length]
      element.style.setProperty('--motion-delay', `${delay + Math.min(index % 4, 3) * 80}ms`)
      element.dataset.motionState = revealedHeaders.has(element) ? 'visible' : 'pending'
    })
  }

  const reveal = (element: HTMLElement, immediate = false) => {
    if (immediate) element.style.setProperty('--motion-delay', '0ms')
    element.dataset.motionState = 'visible'
    if (element.matches('.siteHeader')) revealedHeaders.add(element)
    observer.unobserve(element)
  }
  const observer = new IntersectionObserver((entries) => {
    for (const entry of entries) {
      if (!entry.isIntersecting) continue
      for (const element of targets) {
        if (entry.target === element || entry.target.contains(element)) reveal(element)
      }
      observer.unobserve(entry.target)
    }
  }, { threshold: 0, rootMargin: '0px 0px -24px 0px' })

  let started = false
  const start = () => {
    if (started) return
    started = true
    for (const element of targets) {
      // Hero elements can begin just outside their overflow-hidden background.
      // Observe the stable section, so translated controls cannot stay hidden.
      if (element.dataset.motionState !== 'visible') observer.observe(element.closest('.hero, .productHero') ?? element)
    }
  }
  const revealAll = () => {
    for (const element of targets) reveal(element, true)
    observer.disconnect()
  }
  const onPreference = () => { if (reduced.matches) revealAll() }
  const onFocus = (event: FocusEvent) => {
    if (!(event.target instanceof Element)) return
    const element = event.target.closest<HTMLElement>('[data-motion]')
    if (element && targets.has(element)) reveal(element, true)
  }

  // A jump to an anchor keeps the same page/observer. New product routes install
  // fresh targets, but never repeat the startup overlay or fetch new video files.
  root.addEventListener('focusin', onFocus)
  reduced.addEventListener('change', onPreference)
  window.addEventListener('site:revealed', start)
  if (root.dataset.bootState !== 'loading') start()

  return () => {
    observer.disconnect()
    root.removeEventListener('focusin', onFocus)
    reduced.removeEventListener('change', onPreference)
    window.removeEventListener('site:revealed', start)
    for (const element of targets) {
      delete element.dataset.motion
      delete element.dataset.motionState
      element.style.removeProperty('--motion-delay')
    }
  }
}
