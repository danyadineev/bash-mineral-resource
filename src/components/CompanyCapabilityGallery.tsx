import { useEffect, useRef, useState, type TouchEvent } from 'react'
import { createPortal } from 'react-dom'
import { ChevronLeft, ChevronRight, Images, Maximize2, X } from 'lucide-react'
import { capabilities } from '../septemberContent'
import { companyGalleries } from '../companyGalleries'
import './CompanyCapabilityGallery.css'

type GalleryId = keyof typeof companyGalleries
const asset = (path: string) => `${import.meta.env.BASE_URL}${path}`

export function CompanyCapabilityGallery() {
  const [indices, setIndices] = useState<Partial<Record<GalleryId, number>>>({})
  const [activeId, setActiveId] = useState<GalleryId | null>(null)
  const dialogRef = useRef<HTMLDialogElement>(null)
  const touchStart = useRef<{ id: GalleryId; x: number; y: number } | null>(null)
  const suppressClickUntil = useRef(0)
  const openerRef = useRef<HTMLButtonElement | null>(null)
  const active = capabilities.find(({ image }) => image === activeId)
  const activeIndex = activeId ? indices[activeId] ?? 0 : 0

  function step(id: GalleryId, direction: number) {
    setIndices((current) => ({
      ...current,
      [id]: ((current[id] ?? 0) + direction + companyGalleries[id].length) % companyGalleries[id].length,
    }))
  }

  function preloadNeighbours(id: GalleryId, index: number) {
    const photos = companyGalleries[id]
    for (const offset of [-1, 1]) {
      const image = new Image()
      image.src = asset(photos[(index + offset + photos.length) % photos.length])
    }
  }

  useEffect(() => {
    if (activeId) preloadNeighbours(activeId, activeIndex)
  }, [activeId, activeIndex])

  useEffect(() => {
    const dialog = dialogRef.current
    if (!dialog) return
    if (activeId && !dialog.open) dialog.showModal()
    if (!activeId && dialog.open) {
      dialog.close()
      openerRef.current?.focus({ preventScroll: true })
    }
  }, [activeId])

  useEffect(() => {
    if (!activeId) return
    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => { document.body.style.overflow = previousOverflow }
  }, [activeId])

  function startSwipe(event: TouchEvent, id: GalleryId) {
    const touch = event.touches[0]
    if (event.touches.length !== 1) {
      touchStart.current = null
      return
    }
    touchStart.current = { id, x: touch.clientX, y: touch.clientY }
  }

  function endSwipe(event: TouchEvent, id: GalleryId) {
    const start = touchStart.current
    touchStart.current = null
    if (!start || start.id !== id) return
    const touch = event.changedTouches[0]
    const dx = touch.clientX - start.x
    const dy = touch.clientY - start.y
    if (Math.abs(dx) > 50 && Math.abs(dx) > Math.abs(dy) * 1.3) {
      suppressClickUntil.current = Date.now() + 400
      step(id, dx < 0 ? 1 : -1)
    }
  }

  return (
    <>
      <div className="section companyCapabilityGrid">
        {capabilities.map(({ title, image: id, metric, text }) => {
          const photos = companyGalleries[id]
          const index = indices[id] ?? 0
          return (
            <article
              className="capabilityCard"
              key={id}
              aria-label={title}
              aria-roledescription="галерея фотографий"
              onMouseEnter={() => preloadNeighbours(id, index)}
              onTouchStart={(event) => startSwipe(event, id)}
              onTouchEnd={(event) => endSwipe(event, id)}
              onTouchCancel={() => { touchStart.current = null }}
            >
              <img className="capabilityPhoto" src={asset(photos[index])} alt={`${title} — фото ${index + 1} из ${photos.length}`} loading="lazy" draggable={false} />
              <button
                className="capabilityOpen"
                type="button"
                aria-label={`Открыть галерею: ${title}`}
                onClick={(event) => {
                  if (Date.now() < suppressClickUntil.current) return
                  openerRef.current = event.currentTarget
                  setActiveId(id)
                }}
              >
                <Maximize2 className="capabilityExpand" size={22} aria-hidden="true" />
              </button>
              <div className="capabilityCaption"><h3>{title}</h3>{metric && <strong>{metric}</strong>}<span>{text}</span></div>
              <span className="capabilityCount" aria-hidden="true"><Images size={14} />{index + 1} / {photos.length}</span>
              <button className="capabilityArrow capabilityArrow--previous" type="button" aria-label={`Предыдущее фото: ${title}`} onClick={() => step(id, -1)}><ChevronLeft size={22} aria-hidden="true" /></button>
              <button className="capabilityArrow capabilityArrow--next" type="button" aria-label={`Следующее фото: ${title}`} onClick={() => step(id, 1)}><ChevronRight size={22} aria-hidden="true" /></button>
            </article>
          )
        })}
      </div>
      {createPortal(
        <dialog
          ref={dialogRef}
          className="companyLightbox"
          aria-labelledby="company-gallery-title"
          aria-modal="true"
          onCancel={(event) => { event.preventDefault(); setActiveId(null) }}
          onClose={() => setActiveId(null)}
          onClick={(event) => { if (event.target === event.currentTarget) setActiveId(null) }}
          onKeyDown={(event) => {
            if (!activeId) return
            if (event.key === 'ArrowLeft' || event.key === 'ArrowRight') {
              event.preventDefault()
              step(activeId, event.key === 'ArrowRight' ? 1 : -1)
            }
          }}
        >
          {active && activeId && (
            <div className="companyLightboxLayout">
              <header className="companyLightboxHeader">
                <h2 id="company-gallery-title">{active.title}</h2>
                <button type="button" className="companyLightboxButton" aria-label="Закрыть галерею" autoFocus onClick={() => setActiveId(null)}><X size={24} aria-hidden="true" /></button>
              </header>
              <div
                className="companyLightboxStage"
                onTouchStart={(event) => startSwipe(event, activeId)}
                onTouchEnd={(event) => endSwipe(event, activeId)}
                onTouchCancel={() => { touchStart.current = null }}
                onClick={(event) => { if (event.target === event.currentTarget && Date.now() >= suppressClickUntil.current) setActiveId(null) }}
              >
                <img src={asset(companyGalleries[activeId][activeIndex])} alt={`${active.title} — фото ${activeIndex + 1} из ${companyGalleries[activeId].length}`} draggable={false} />
                <button type="button" className="companyLightboxButton companyLightboxPrevious" aria-label="Предыдущее фото" onClick={() => step(activeId, -1)}><ChevronLeft size={28} aria-hidden="true" /></button>
                <button type="button" className="companyLightboxButton companyLightboxNext" aria-label="Следующее фото" onClick={() => step(activeId, 1)}><ChevronRight size={28} aria-hidden="true" /></button>
              </div>
              <footer className="companyLightboxFooter">
                <span role="status" aria-live="polite" aria-atomic="true">{activeIndex + 1} / {companyGalleries[activeId].length}</span>
                <span className="companyLightboxHint">← → — листать · Esc — закрыть</span>
                <span className="companyLightboxTouchHint">Свайп — листать</span>
              </footer>
            </div>
          )}
        </dialog>,
        document.body,
      )}
    </>
  )
}
