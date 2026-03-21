import { useRef } from "react";
import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight, MapPin } from "lucide-react";
import { Skeleton } from "@/components/ui/Skeleton";
import styled from "styled-components";

// Notice we removed 'price' from the interface. It's an offline showcase!
interface Product {
  id: number;
  name: string;
  category: string;
  image: string;
}

interface LatestArrivalsProps {
  data: Product[];
  isLoading: boolean;
}

export function LatestArrivals({ data, isLoading }: LatestArrivalsProps) {
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const scrollLeft = () => {
    scrollContainerRef.current?.scrollBy({ left: -350, behavior: "smooth" });
  };

  const scrollRight = () => {
    scrollContainerRef.current?.scrollBy({ left: 350, behavior: "smooth" });
  };

  return (
    <Section>
      <Container>
        <HeaderRow
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <HeaderLeft>
            <EyebrowWrapper>
              <DecorativeDiamond />
              <Eyebrow>Just Landed</Eyebrow>
            </EyebrowWrapper>
            <Title>
              <span className="serif-italic">New</span> Arrivals
            </Title>
          </HeaderLeft>

          <HeaderRight>
            <Subtitle>
              Be the first to explore our latest seasonal curations, available
              exclusively in-store.
            </Subtitle>
            <ScrollButtons>
              <ScrollButton onClick={scrollLeft} aria-label="Scroll left">
                <ChevronLeft size={22} strokeWidth={1.2} />
              </ScrollButton>
              <ScrollButton onClick={scrollRight} aria-label="Scroll right">
                <ChevronRight size={22} strokeWidth={1.2} />
              </ScrollButton>
            </ScrollButtons>
          </HeaderRight>
        </HeaderRow>

        {isLoading ? (
          <LoadingRow>
            {[1, 2, 3, 4].map((i) => (
              <LoadingCard key={i}>
                <Skeleton
                  aspectRatio="3/4"
                  borderRadius="4px"
                  style={{ marginBottom: "1.25rem" }}
                />
                <Skeleton
                  width="6rem"
                  height="0.8rem"
                  style={{ marginBottom: "0.5rem" }}
                />
                <Skeleton width="12rem" height="1.25rem" />
              </LoadingCard>
            ))}
          </LoadingRow>
        ) : (
          <Carousel ref={scrollContainerRef}>
            {data.map((product, idx) => (
              <CarouselItem
                key={product.id}
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{
                  duration: 0.6,
                  delay: idx * 0.1,
                  ease: "easeOut",
                }}
              >
                <ArrivalCard>
                  <ImageWrapper>
                    <img
                      src={product.image}
                      alt={product.name}
                      loading="lazy"
                    />
                  </ImageWrapper>
                  <CardContent>
                    <Category>{product.category}</Category>
                    <ProductName>{product.name}</ProductName>
                    <StoreLabel>
                      <MapPin size={12} /> Available In-Store
                    </StoreLabel>
                  </CardContent>
                </ArrivalCard>
              </CarouselItem>
            ))}
          </Carousel>
        )}
      </Container>
    </Section>
  );
}

// --- Styled Components ---

const Section = styled.section`
  padding-top: 2rem;
  padding-bottom: 4rem;
  background-color: #ffffff; /* Crisp white to contrast with previous ivory sections */
  overflow: hidden;
`;

const Container = styled.div`
  max-width: 1440px;
  margin-left: auto;
  margin-right: auto;
  padding-left: 1.5rem;
  padding-right: 1.5rem;
`;
const HeaderRow = styled(motion.div)`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  /* Reduced from 3rem to pull images closer on mobile */
  margin-bottom: 1.5rem;

  @media (min-width: 768px) {
    flex-direction: row;
    justify-content: space-between;
    align-items: flex-end;
    /* Reduced from 4rem to 2rem to fix the massive vertical gap on desktop */
    margin-bottom: 2rem;
  }
`;

const HeaderLeft = styled.div`
  display: flex;
  flex-direction: column;
`;

const EyebrowWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 0.75rem;
`;

const DecorativeDiamond = styled.div`
  width: 5px;
  height: 5px;
  background-color: var(--color-primary);
  transform: rotate(45deg);
`;

const Eyebrow = styled.span`
  font-family: var(--font-label);
  font-weight: 700;
  letter-spacing: 0.15em;
  text-transform: uppercase;
  font-size: 0.75rem;
  color: var(--color-primary);
`;

const Title = styled.h2`
  font-family: var(--font-headline);
  font-weight: 500;
  color: #222222;
  font-size: 2.5rem;
  letter-spacing: -0.01em;

  .serif-italic {
    font-family: "Playfair Display", "Baskerville", serif;
    font-style: italic;
    color: var(--color-primary);
    font-size: 110%;
  }

  @media (min-width: 768px) {
    font-size: 3.25rem;
  }
`;

const HeaderRight = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 1.5rem;

  @media (min-width: 768px) {
    align-items: flex-end;
    text-align: right;
    /* Tightened the gap between the text and the buttons */
    gap: 1rem;
  }
`;

const Subtitle = styled.p`
  font-family: var(--font-body);
  color: #666666;
  font-size: 1rem;
  max-width: 350px;
  line-height: 1.6;
`;

const ScrollButtons = styled.div`
  display: flex;
  gap: 1rem;
`;

const ScrollButton = styled.button`
  width: 3rem;
  height: 3rem;
  border-radius: 50%;
  border: 1px solid #eaeaea;
  display: flex;
  align-items: center;
  justify-content: center;
  background: transparent;
  color: #222222;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    background: var(--color-primary);
    color: #ffffff;
    border-color: var(--color-primary);
    transform: translateY(-2px);
    box-shadow: 0 10px 20px rgba(0, 0, 0, 0.05);
  }
`;

/* THE CAROUSEL */
const Carousel = styled.div`
  display: flex;
  gap: 2rem;
  overflow-x: auto;
  padding-bottom: 2.5rem;

  /* Smooth snapping for mobile */
  scroll-snap-type: x mandatory;

  /* Hides the ugly scrollbar but keeps functionality */
  scrollbar-width: none;
  &::-webkit-scrollbar {
    display: none;
  }
`;

const CarouselItem = styled(motion.div)`
  flex-shrink: 0;
  scroll-snap-align: start;
  width: 280px; /* Fixed width so cards don't stretch */

  @media (min-width: 768px) {
    width: 320px; /* Slightly larger on desktop */
  }
`;

/* CUSTOM ARRIVAL CARD (Replaces generic ProductCard) */
const ArrivalCard = styled.div`
  display: flex;
  flex-direction: column;
  cursor: default; /* Tells user this is a showcase, not a clickable shop item */
  group: hover;
`;

const ImageWrapper = styled.div`
  width: 100%;
  aspect-ratio: 3 / 4; /* Perfect admin-proof cookie cutter */
  overflow: hidden;
  border-radius: 4px;
  background-color: #f5f5f5;
  margin-bottom: 1.25rem;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    object-position: top center;
    transition: transform 0.8s ease;
  }

  ${ArrivalCard}:hover img {
    transform: scale(1.05); /* Elegant slow zoom on hover */
  }
`;

const CardContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
`;

const Category = styled.span`
  font-family: var(--font-label);
  text-transform: uppercase;
  letter-spacing: 0.1em;
  font-size: 0.7rem;
  color: #888888;
  margin-bottom: 0.35rem;
`;

const ProductName = styled.h3`
  font-family: var(--font-headline);
  font-size: 1.15rem;
  font-weight: 700;
  color: #222222;
  margin-bottom: 0.75rem;
  line-height: 1.3;
`;

const StoreLabel = styled.span`
  display: inline-flex;
  align-items: center;
  gap: 0.35rem;
  font-family: var(--font-body);
  font-size: 0.8rem;
  color: var(--color-primary);
  background-color: color-mix(in srgb, var(--color-primary) 8%, transparent);
  padding: 0.35rem 0.75rem;
  border-radius: 2px;
`;

/* LOADING STATE */
const LoadingRow = styled.div`
  display: flex;
  gap: 2rem;
  overflow: hidden;
  padding-bottom: 2.5rem;
`;

const LoadingCard = styled.div`
  min-width: 280px;

  @media (min-width: 768px) {
    min-width: 320px;
  }
`;
