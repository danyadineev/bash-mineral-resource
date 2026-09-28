import { useEffect, useId, useRef, useState, type ReactNode, type TouchEvent } from 'react'
import { createPortal } from 'react-dom'
import { ChevronLeft, ChevronRight, Images, Maximize2, X } from 'lucide-react'
import './CompanyCapabilityGallery.css'

const asset = (path: string) => `${import.meta.env.BASE_URL}${path}`
type Props = {
  title: string
  photos: readonly string[]
  className?: string
  photoClassName?: string
  as?: 'div' | 'article'
  children?: ReactNode
}

export function VisualGallery({ title, photos, className = '', photoClassName = '', as: Tag = 'div', children }: Props) {
  const [index, setIndex] = useState(0)
  const [open, setOpen] = useState(false)
  const dialogRef = useRef<HTMLDialogElement>(null)
  const touchStart = useRef<{ x: number; y: number } | null>(null)
  const suppressClickUntil = useRef(0)
  const openerRef = useRef<HTMLButtonElement>(null)
  const titleId = useId()
  const multiple = photos.length > 1

  function step(direction: number) {
    setIndex((current) => (current + direction + photos.length) % photos.length)
  }

  function preloadNeighbours() {
    if (!multiple) return
    for (const offset of [-1, 1]) {
      const image = new Image()
      image.src = asset(photos[(index + offset + photos.length) % photos.length])
    }
  }

  useEffect(() => {
    if (open) {
      for (const offset of [-1, 1]) {
        const image = new Image()
        image.src = asset(photos[(index + offset + photos.length) % photos.length])
      }
    }
  }, [open, index, photos])

  useEffect(() => {
    const dialog = dialogRef.current
    if (!dialog) return
    if (open && !dialog.open) dialog.showModal()
    if (!open && dialog.open) {
      dialog.close()
      openerRef.current?.focus({ preventScroll: true })
    }
  }, [open])

  useEffect(() => {
    if (!open) return
    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => { document.body.style.overflow = previousOverflow }
  }, [open])

  function startSwipe(event: TouchEvent) {
    touchStart.current = event.touches.length === 1 ? { x: event.touches[0].clientX, y: event.touches[0].clientY } : null
  }

  function endSwipe(event: TouchEvent) {
    const start = touchStart.current
    touchStart.current = null
    if (!start || !multiple) return
    const touch = event.changedTouches[0]
    const dx = touch.clientX - start.x
    const dy = touch.clientY - start.y
    if (Math.abs(dx) > 50 && Math.abs(dx) > Math.abs(dy) * 1.3) {
      suppressClickUntil.current = Date.now() + 400
      step(dx < 0 ? 1 : -1)
    }
  }

  return <>
    <Tag className={`visualGallery ${className}`} aria-label={title} aria-roledescription="галерея фотографий" onMouseEnter={preloadNeighbours} onTouchStart={startSwipe} onTouchEnd={endSwipe} onTouchCancel={() => { touchStart.current = null }}>
      <img className={`visualGalleryPhoto ${photoClassName}`} src={asset(photos[index])} alt={`${title} — фото ${index + 1} из ${photos.length}`} loading="lazy" draggable={false} />
      <button ref={openerRef} className="capabilityOpen" type="button" aria-label={`Открыть галерею: ${title}`} onClick={() => { if (Date.now() >= suppressClickUntil.current) setOpen(true) }}><Maximize2 className="capabilityExpand" size={20} strokeWidth={1.5} aria-hidden="true" /></button>
      {children}
      {multiple && <>
        <span className="capabilityCount" aria-hidden="true"><Images size={14} />{index + 1} / {photos.length}</span>
        <button className="capabilityArrow capabilityArrow--previous" type="button" aria-label={`Предыдущее фото: ${title}`} onClick={() => step(-1)}><ChevronLeft size={24} strokeWidth={1.5} aria-hidden="true" /></button>
        <button className="capabilityArrow capabilityArrow--next" type="button" aria-label={`Следующее фото: ${title}`} onClick={() => step(1)}><ChevronRight size={24} strokeWidth={1.5} aria-hidden="true" /></button>
      </>}
    </Tag>
    {createPortal(
      <dialog ref={dialogRef} className="companyLightbox" aria-labelledby={titleId} aria-modal="true" onCancel={(event) => { event.preventDefault(); setOpen(false) }} onClose={() => setOpen(false)} onClick={(event) => { if (event.target === event.currentTarget) setOpen(false) }} onKeyDown={(event) => {
        if (multiple && (event.key === 'ArrowLeft' || event.key === 'ArrowRight')) {
          event.preventDefault()
          step(event.key === 'ArrowRight' ? 1 : -1)
        }
      }}>
        {open && <div className="companyLightboxLayout">
          <header className="companyLightboxHeader"><h2 id={titleId}>{title}</h2><button type="button" className="companyLightboxButton" aria-label="Закрыть галерею" autoFocus onClick={() => setOpen(false)}><X size={24} aria-hidden="true" /></button></header>
          <div className="companyLightboxStage" onTouchStart={startSwipe} onTouchEnd={endSwipe} onTouchCancel={() => { touchStart.current = null }} onClick={(event) => { if (event.target === event.currentTarget && Date.now() >= suppressClickUntil.current) setOpen(false) }}>
            <img src={asset(photos[index])} alt={`${title} — фото ${index + 1} из ${photos.length}`} draggable={false} />
            {multiple && <>
              <button type="button" className="companyLightboxButton companyLightboxPrevious" aria-label="Предыдущее фото" onClick={() => step(-1)}><ChevronLeft size={28} strokeWidth={1.5} aria-hidden="true" /></button>
              <button type="button" className="companyLightboxButton companyLightboxNext" aria-label="Следующее фото" onClick={() => step(1)}><ChevronRight size={28} strokeWidth={1.5} aria-hidden="true" /></button>
            </>}
          </div>
          <footer className="companyLightboxFooter"><span role="status" aria-live="polite" aria-atomic="true">{index + 1} / {photos.length}</span><span className="companyLightboxHint">{multiple ? '← → — листать · ' : ''}Esc — закрыть</span>{multiple && <span className="companyLightboxTouchHint">Свайп — листать</span>}</footer>
        </div>}
      </dialog>, document.body,
    )}
  </>
}
