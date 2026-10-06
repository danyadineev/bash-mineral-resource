import { useEffect, useRef, useState } from 'react'

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
  const [blocked, setBlocked] = useState(false)
  const videoRef = useRef<HTMLVideoElement>(null)
  const src = isMobile ? mobile : desktop

  useEffect(() => {
    const video = videoRef.current
    if (!video) return
    let disposed = false
    let frameRequest = 0
    let pending = false
    // Set the DOM properties as well as attributes for mobile autoplay.
    video.muted = true
    video.defaultMuted = true
    const play = () => {
      if (pending || disposed || document.hidden || !video.paused) return
      pending = true
      void video.play().then(() => {
        if (!disposed) setBlocked(false)
      }).catch((error: unknown) => {
        if (!disposed && error instanceof DOMException && error.name === 'NotAllowedError') setBlocked(true)
      }).finally(() => { pending = false })
    }
    const onFrame = () => { if (!disposed) setVisible(true) }
    const onPlaying = () => {
      setBlocked(false)
      if (frameRequest) video.cancelVideoFrameCallback(frameRequest)
      if ('requestVideoFrameCallback' in video) frameRequest = video.requestVideoFrameCallback(onFrame)
      else onFrame()
    }
    const onError = () => { setVisible(false) }
    video.addEventListener('playing', onPlaying)
    video.addEventListener('canplay', play)
    video.addEventListener('loadeddata', play)
    video.addEventListener('error', onError)
    document.addEventListener('visibilitychange', play)
    document.addEventListener('pointerdown', play)
    document.addEventListener('keydown', play)
    if (!video.paused) onPlaying()
    play()
    return () => {
      disposed = true
      if (frameRequest) video.cancelVideoFrameCallback(frameRequest)
      video.removeEventListener('playing', onPlaying)
      video.removeEventListener('canplay', play)
      video.removeEventListener('loadeddata', play)
      video.removeEventListener('error', onError)
      document.removeEventListener('visibilitychange', play)
      document.removeEventListener('pointerdown', play)
      document.removeEventListener('keydown', play)
    }
  }, [src])

  return <>
    <img className={`${className}Poster`} src={poster} alt="" aria-hidden="true" fetchPriority="high" decoding="async" />
    <video ref={videoRef} className={`${className}${visible ? ' is-ready' : ''}`} src={src}
      autoPlay muted loop playsInline preload="auto" poster={poster} aria-hidden="true" />
    {blocked && <button className="heroVideoPlay" onClick={() => {
      const video = videoRef.current
      if (video) { video.muted = true; void video.play().then(() => setBlocked(false)).catch(() => {}) }
    }}>▶ Включить видео</button>}
  </>
}
