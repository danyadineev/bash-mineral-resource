export const HERO_BUFFER_SECONDS = 2.5

// Require a small lead, not the entire file. Near the end of a loop the remaining
// duration is enough. Different TimeRanges may follow a seek or partial download.
export function hasPlaybackBuffer(
  buffered: Pick<TimeRanges, 'length' | 'start' | 'end'>,
  currentTime: number,
  duration: number,
): boolean {
  if (!Number.isFinite(duration) || duration <= currentTime) return false
  const required = Math.min(HERO_BUFFER_SECONDS, duration - currentTime)
  for (let index = 0; index < buffered.length; index += 1) {
    if (buffered.start(index) <= currentTime && buffered.end(index) - currentTime >= required) return true
  }
  return false
}
