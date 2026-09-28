import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'
import { hasPlaybackBuffer } from '../src/lib/heroMedia.ts'

const html = readFileSync(new URL('../index.html', import.meta.url), 'utf8')
assert.ok(html.includes('<div id="root"></div>'), 'Site is interactive without a loading gate')
assert.doesNotMatch(html, /site-loader|site-startup|is-booting|\binert\b|aria-busy/)
const ranges = (...items) => ({ length: items.length, start: (i) => items[i][0], end: (i) => items[i][1] })
assert.equal(hasPlaybackBuffer(ranges(), 0, 45), false)
assert.equal(hasPlaybackBuffer(ranges([0, 2]), 0, 45), false)
assert.equal(hasPlaybackBuffer(ranges([0, 3]), 0, 45), true)
assert.equal(hasPlaybackBuffer(ranges([0, 3]), 1, 45), false)
assert.equal(hasPlaybackBuffer(ranges([0, 3], [10, 15]), 10, 45), true)
assert.equal(hasPlaybackBuffer(ranges([0, 45]), 44, 45), true)
assert.equal(hasPlaybackBuffer(ranges([0, 45]), 0, NaN), false)
assert.equal(hasPlaybackBuffer(ranges([0, 45]), 45, 45), false)
console.log('No-loader startup and playback-buffer checks passed.')
