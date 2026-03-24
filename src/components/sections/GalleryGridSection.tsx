import styled from "styled-components";
import { motion } from "framer-motion";

export function GalleryGridSection({
  images,
  onSelect,
}: {
  images: { id: number | string; image: string; alt: string }[];
  onSelect?: (index: number) => void;
}) {
  return (
    <Section>
      <Container>
        <Grid>
          {images.map((img, idx) => (
            <motion.div
              key={img.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{
                duration: 0.6,
                delay: (idx % 4) * 0.1,
                ease: "easeOut",
              }}
            >
              <GalleryCard
                type="button"
                onClick={() => onSelect?.(idx)}
                aria-label={`Open ${img.alt} full screen`}
              >
                <ImageWrapper>
                  <Img src={img.image} alt={img.alt} loading="lazy" />
                </ImageWrapper>

                <TextContainer>
                  <CollectionTitle>{img.alt}</CollectionTitle>
                  <DecorativeLine />
                </TextContainer>
              </GalleryCard>
            </motion.div>
          ))}
        </Grid>
      </Container>
    </Section>
  );
}

// --- Styled Components ---

const Section = styled.section`
  padding-top: clamp(2rem, 4vw, 3rem);
  padding-bottom: 8rem;
  background-color: #ffffff; /* Crisp white for maximum contrast */
`;

const Container = styled.div`
  max-width: 1440px;
  margin-left: auto;
  margin-right: auto;
  padding-left: 1.5rem;
  padding-right: 1.5rem;
`;

/* UNIFORM GRID: Creates perfect, identical columns */
const Grid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  /* Massive row-gap gives the text room to breathe without looking cluttered */
  row-gap: 3.5rem;
  column-gap: 1.5rem;

  @media (min-width: 640px) {
    grid-template-columns: repeat(2, 1fr);
    column-gap: 2rem;
  }

  @media (min-width: 1024px) {
    grid-template-columns: repeat(4, 1fr);
    row-gap: 4.5rem; /* Even more breathing room on desktop */
    column-gap: 2.5rem;
  }
`;

const GalleryCard = styled.button`
  display: flex;
  flex-direction: column;
  width: 100%;
  background: transparent;
  border: none;
  cursor: pointer;
  padding: 0;
  text-align: center; /* Centers the text beautifully under the image */

  &:focus-visible {
    outline: 2px solid var(--color-primary);
    outline-offset: 4px;
  }
`;

/* THE MAGIC: Forces every admin image into a perfect vertical portrait crop */
const ImageWrapper = styled.div`
  width: 100%;
  aspect-ratio: 4 / 5; /* The standard high-fashion editorial ratio */
  overflow: hidden;
  border-radius: 4px; /* Very subtle rounding */
  background-color: #f5f5f5;
  margin-bottom: 1.5rem;
`;

const Img = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover; /* Prevents stretching and perfectly fills the 4:5 box */
  object-position: top center; /* Focuses on the face/upper body of the model */
  transition: transform 0.8s ease;

  /* Slow, luxurious zoom effect when the user hovers over the card */
  ${GalleryCard}:hover & {
    transform: scale(1.05);
  }
`;

const TextContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
`;

const CollectionTitle = styled.h3`
  font-family: var(--font-headline);
  font-weight: 600;
  font-size: 1.15rem;
  color: #222222;
  letter-spacing: 0.03em;
  margin-bottom: 0.75rem;
  transition: color 0.3s ease;

  /* Changes color to your primary brand color on hover */
  ${GalleryCard}:hover & {
    color: var(--color-primary);
  }
`;

const DecorativeLine = styled.div`
  width: 30px;
  height: 2px;
  background-color: var(--color-primary);
  opacity: 0.5;
  transition:
    width 0.4s ease,
    opacity 0.4s ease;

  /* The line gracefully expands when hovered */
  ${GalleryCard}:hover & {
    width: 50px;
    opacity: 1;
  }
`;
