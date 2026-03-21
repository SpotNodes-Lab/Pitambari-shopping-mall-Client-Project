import { motion } from "framer-motion";
import styled from "styled-components";
import { Skeleton } from "@/components/ui/Skeleton";

interface Category {
  id: string;
  title: string;
  subtitle: string;
  image: string;
}

interface CategoryCurationProps {
  data: Category[];
  isLoading: boolean;
}

export function CategoryCuration({ data, isLoading }: CategoryCurationProps) {
  // Skeleton loader mimics the perfect 6-square grid
  if (isLoading || !data || data.length === 0) {
    return (
      <Section>
        <Container>
          <Header>
            <Skeleton
              width="18rem"
              height="2.5rem"
              style={{ marginBottom: "1rem" }}
            />
            <Skeleton width="22rem" height="1rem" />
          </Header>
          <Grid>
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <Skeleton
                key={i}
                aspectRatio="1 / 1"
                borderRadius="4px"
                style={{ width: "100%" }}
              />
            ))}
          </Grid>
        </Container>
      </Section>
    );
  }

  // Force exactly 6 items for the perfect 3x2 grid layout
  const displayData = data.slice(0, 6);

  return (
    <Section>
      <Container>
        <Header
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <Title>Curated Categories</Title>
          <Subtitle>
            A glimpse of the fine craftsmanship waiting for you in-store.
          </Subtitle>
        </Header>

        <Grid>
          {displayData.map((cat, idx) => (
            <LookbookItem
              key={cat.id}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: "-20px" }}
              transition={{ duration: 0.7, delay: idx * 0.1, ease: "easeOut" }}
            >
              <img src={cat.image} alt={cat.title} />
              <GradientOverlay />
              <TextOverlay>
                <h4>{cat.title}</h4>
                <p>{cat.subtitle}</p>
              </TextOverlay>
            </LookbookItem>
          ))}
        </Grid>
      </Container>
    </Section>
  );
}

// --- Styled Components ---

const Section = styled.section`
  padding-top: 4rem;
  padding-bottom: 6rem;
  background-color: #fdfdfc; /* Clean, very soft off-white */
  display: flex;
  align-items: center;
`;

const Container = styled.div`
  width: 100%;
  max-width: 1250px; /* Constrains width so squares don't get overly massive */
  margin-left: auto;
  margin-right: auto;
  padding-left: 1.5rem;
  padding-right: 1.5rem;
`;

const Header = styled(motion.div)`
  text-align: center;
  margin-bottom: 3.5rem;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Title = styled.h2`
  font-family: "Playfair Display", "Baskerville", serif; /* Elegant styling */
  font-size: 2.25rem;
  font-weight: 500;
  color: #222222;
  margin-bottom: 0.5rem;
  letter-spacing: 0.02em;
`;

const Subtitle = styled.p`
  font-family: var(--font-body);
  font-size: 1rem;
  color: #666666;
  max-width: 500px;
`;

/* THE UNIFORM SQUARE GRID:
  Mobile: 2 columns (2x3 grid)
  Tablet/Desktop: 3 columns (3x2 grid)
*/
const Grid = styled.div`
  display: grid;
  gap: 1.5rem;
  grid-template-columns: repeat(2, 1fr); /* 2 items per row on mobile */

  @media (min-width: 768px) {
    grid-template-columns: repeat(3, 1fr); /* 3 items per row on desktop */
    gap: 2rem;
  }
`;

/* By removing grid-area and adding `aspect-ratio: 1 / 1`, 
  we guarantee a perfect square no matter the screen size. 
*/
const LookbookItem = styled(motion.div)`
  position: relative;
  aspect-ratio: 1 / 1; /* THE MAGIC FIX: Forces a perfect square */
  border-radius: 4px; /* Subtle rounding for a softer feel */
  overflow: hidden;
  background-color: #eaeaea;

  /* CRITICAL: No pointer cursor. This tells the user "Look, don't click" */
  cursor: default;

  img {
    width: 100%;
    height: 100%;
    /* THE MAGIC FIX 2: perfectly crops any admin image to fill the square */
    object-fit: cover;
    object-position: center;
    transition: transform 1.2s ease;
  }

  /* Very slow, elegant zoom on hover instead of a fast UI reaction */
  &:hover img {
    transform: scale(1.05);
  }
`;

const GradientOverlay = styled.div`
  position: absolute;
  inset: 0;
  /* Darkens the bottom slightly more so text is always readable */
  background: linear-gradient(
    to top,
    rgba(0, 0, 0, 0.7) 0%,
    rgba(0, 0, 0, 0.15) 40%,
    transparent 100%
  );
  pointer-events: none;
`;

const TextOverlay = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  padding: 1.5rem;
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
  pointer-events: none;

  h4 {
    font-family: var(--font-headline);
    font-size: 1.15rem;
    font-weight: 700;
    color: #ffffff;
    letter-spacing: 0.05em;
    text-transform: uppercase;
  }

  p {
    font-family: var(--font-body);
    font-size: 0.85rem;
    color: rgba(255, 255, 255, 0.85);
  }
`;
