import { useEffect, useRef, useState } from 'react'
import { hasPlaybackBuffer } from '../lib/heroMedia'

type HeroVideoProps = {
  desktop: string
  mobile: string
  poster: string
  className: 'heroMedia' | 'productHeroMedia'
}

export function HeroVideo({ desktop, mobile, poster, className }: HeroVideoProps) {
  // Pick once per mount: resizing must not interrupt playback or fetch two files.
  const [isMobile] = useState(() => window.matchMedia('(max-width: 719px)').matches)
  const [visible, setVisible] = useState(false)
  const videoRef = useRef<HTMLVideoElement>(null)
  const src = isMobile ? mobile : desktop

  useEffect(() => {
    const video = videoRef.current
    if (!video) return
    let firstFrame = false
    let frameRequest = 0
    let waitingTimer: ReturnType<typeof setTimeout> | undefined
    let announced = false
    let playRequested = false
    const check = () => {
      // Build the lead before playing. Otherwise playback behind the loader can
      // consume bytes as quickly as they arrive, defeating initial prebuffering.
      if (!playRequested) {
        if (video.readyState < 3 || !hasPlaybackBuffer(video.buffered, video.currentTime, video.duration)) return
        playRequested = true
        void video.play().catch(() => setVisible(false))
      }
      // The first frame consumes part of the lead; don't demand the same buffer
      // again and accidentally keep a playing video hidden on a slower link.
      if (!firstFrame || video.paused || video.readyState < 3) return
      clearTimeout(waitingTimer)
      setVisible(true)
      if (!announced) {
        announced = true
        window.dispatchEvent(new Event('hero:ready'))
      }
    }
    const onFrame = () => { firstFrame = true; check() }
    const onPlaying = () => {
      playRequested = true
      clearTimeout(waitingTimer)
      if ('requestVideoFrameCallback' in video) frameRequest = video.requestVideoFrameCallback(onFrame)
      else onFrame()
      check()
    }
    const onWaiting = () => {
      clearTimeout(waitingTimer)
      // A long stall falls back gracefully; short buffering doesn't flash a still.
      waitingTimer = setTimeout(() => setVisible(false), 600)
    }
    const onError = () => { clearTimeout(waitingTimer); setVisible(false) }
    video.addEventListener('playing', onPlaying)
    video.addEventListener('progress', check)
    video.addEventListener('waiting', onWaiting)
    video.addEventListener('error', onError)
    const interval = setInterval(check, 250)
    if (!video.paused) onPlaying()
    check()
    return () => {
      clearInterval(interval)
      clearTimeout(waitingTimer)
      if (frameRequest) video.cancelVideoFrameCallback(frameRequest)
      video.removeEventListener('playing', onPlaying)
      video.removeEventListener('progress', check)
      video.removeEventListener('waiting', onWaiting)
      video.removeEventListener('error', onError)
    }
  }, [src])

  return <>
    <img className={`${className}Poster`} src={poster} alt="" aria-hidden="true" fetchPriority="high" decoding="async" />
    <video ref={videoRef} className={`${className}${visible ? ' is-ready' : ''}`} src={src}
      muted loop playsInline preload="auto" poster={poster} aria-hidden="true" />
  </>
}
