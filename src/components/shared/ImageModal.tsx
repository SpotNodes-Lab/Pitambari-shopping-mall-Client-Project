import { useEffect } from "react"
import styled from "styled-components"
import { VerticalMediaEmbed } from "@/components/shared/VerticalMediaEmbed"
import { isEmbeddableMediaUrl } from "@/utils/socialEmbed"

export function ImageModal({
  open,
  image,
  alt,
  onClose,
  onPrev,
  onNext,
}: {
  open: boolean
  image: string
  alt: string
  onClose: () => void
  onPrev: () => void
  onNext: () => void
}) {
  useEffect(() => {
    if (!open) return
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose()
      if (e.key === "ArrowLeft") onPrev()
      if (e.key === "ArrowRight") onNext()
    }

    window.addEventListener("keydown", onKeyDown)
    return () => window.removeEventListener("keydown", onKeyDown)
  }, [open, onClose, onPrev, onNext])

  if (!open) return null

  return (
    <Overlay
      role="dialog"
      aria-modal="true"
      aria-label="Image preview"
      onMouseDown={(e) => {
        if (e.target === e.currentTarget) onClose()
      }}
    >
      <Modal>
        <TopBar>
          <Counter aria-hidden="true">{alt}</Counter>
          <CloseButton type="button" onClick={onClose} aria-label="Close">
            ×
          </CloseButton>
        </TopBar>

        {isEmbeddableMediaUrl(image) ? (
          <EmbedModalStage>
            <VerticalMediaEmbed
              url={image}
              alt={alt}
              autoplayOnIntersect={false}
            />
          </EmbedModalStage>
        ) : (
          <Img src={image} alt={alt} />
        )}

        <NavButton type="button" onClick={onPrev} aria-label="Previous image">
          ‹
        </NavButton>
        <NavButtonRight
          type="button"
          onClick={onNext}
          aria-label="Next image"
        >
          ›
        </NavButtonRight>
      </Modal>
    </Overlay>
  )
}

const Overlay = styled.div`
  position: fixed;
  inset: 0;
  z-index: 200;
  background: rgba(0, 0, 0, 0.55);
  backdrop-filter: blur(10px);

  display: flex;
  align-items: center;
  justify-content: center;
  padding: 1rem;
`

const Modal = styled.div`
  width: 100%;
  max-width: 1100px;
  background-color: var(--color-surface-container-lowest);
  border-radius: var(--radius-xl);
  border: 1px solid color-mix(
    in srgb,
    var(--color-outline-variant) 20%,
    transparent
  );
  box-shadow: 0 30px 90px rgba(0, 0, 0, 0.35);
  position: relative;
  overflow: hidden;
`

const TopBar = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  z-index: 2;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.75rem 1rem;
  pointer-events: none;
`

const Counter = styled.div`
  pointer-events: none;
  font-family: var(--font-body);
  font-size: 0.8rem;
  color: rgba(255, 255, 255, 0.9);
`

const CloseButton = styled.button`
  pointer-events: auto;
  border: none;
  cursor: pointer;
  width: 2.5rem;
  height: 2.5rem;
  border-radius: 9999px;
  color: var(--color-on-surface);
  background-color: rgba(255, 255, 255, 0.75);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.8rem;
  line-height: 1;
  transition: background-color 200ms ease;

  &:hover {
    background-color: rgba(255, 255, 255, 0.95);
  }
`

const EmbedModalStage = styled.div`
  width: 100%;
  aspect-ratio: 16 / 9;
  max-height: 80vh;
  background: #111;
`

const Img = styled.img`
  display: block;
  width: 100%;
  height: auto;
  max-height: 80vh;
  object-fit: contain;
  background: var(--color-surface-container-high);
`

const NavButtonBase = styled.button`
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  z-index: 3;
  border: none;
  cursor: pointer;
  width: 3rem;
  height: 3rem;
  border-radius: 9999px;
  background-color: rgba(255, 255, 255, 0.75);
  color: var(--color-on-surface);
  font-size: 2rem;
  line-height: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background-color 200ms ease;

  &:hover {
    background-color: rgba(255, 255, 255, 0.95);
  }
`

const NavButton = styled(NavButtonBase)`
  left: 1rem;
`

const NavButtonRight = styled(NavButtonBase)`
  right: 1rem;
`

