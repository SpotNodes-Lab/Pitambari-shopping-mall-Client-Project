import styled from "styled-components";
import { motion } from "framer-motion";
import { MapPin, Phone, Clock, ArrowRight } from "lucide-react";

export interface Showroom {
  id: string | number;
  title: string;
  image: string;
  address?: string;
  phone?: string;
  hours?: string;
  cta: string;
  mapLink?: string;
}

export function ShowroomsSection({ showrooms }: { showrooms: Showroom[] }) {
  return (
    <Section>
      <Container>
        <StoreGrid>
          {showrooms.map((store, idx) => (
            <StoreCard
              key={store.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: idx * 0.1, ease: "easeOut" }}
            >
              <ImageWrapper>
                <Img src={store.image} alt={store.title} loading="lazy" />
              </ImageWrapper>

              <InfoWrapper>
                <Title>{store.title}</Title>

                <DetailsList>
                  {store.address && (
                    <DetailRow>
                      <IconBox>
                        <MapPin size={15} strokeWidth={2} />
                      </IconBox>
                      <DetailText>{store.address}</DetailText>
                    </DetailRow>
                  )}
                  {store.hours && (
                    <DetailRow>
                      <IconBox>
                        <Clock size={15} strokeWidth={2} />
                      </IconBox>
                      <DetailText>{store.hours}</DetailText>
                    </DetailRow>
                  )}
                  {store.phone && (
                    <DetailRow>
                      <IconBox>
                        <Phone size={15} strokeWidth={2} />
                      </IconBox>
                      <DetailText>{store.phone}</DetailText>
                    </DetailRow>
                  )}
                </DetailsList>

                <DirectionsLink
                  href={store.mapLink || "#"}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {store.cta || "Get Directions"} <ArrowRight size={16} />
                </DirectionsLink>
              </InfoWrapper>
            </StoreCard>
          ))}
        </StoreGrid>
      </Container>
    </Section>
  );
}

// --- Styled Components ---

const Section = styled.section`
  padding-top: 3rem;
  padding-bottom: 6rem;
  background-color: #faf9f7; /* Soft ivory */
`;

const Container = styled.div`
  max-width: 1250px;
  margin-left: auto;
  margin-right: auto;
  padding-left: 1.5rem;
  padding-right: 1.5rem;
`;

/* Switched back to a Grid to keep cards compact and side-by-side */
const StoreGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 2rem;

  @media (min-width: 768px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (min-width: 1024px) {
    /* If you have 3 locations, this fits them all perfectly in one row */
    grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
    gap: 2.5rem;
  }
`;

const StoreCard = styled(motion.div)`
  display: flex;
  flex-direction: column;
  background-color: #ffffff;
  border-radius: 6px;
  overflow: hidden;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.04);
  transition:
    transform 0.3s ease,
    box-shadow 0.3s ease;

  /* Keeps the card from stretching unnecessarily */
  height: 100%;

  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 15px 35px rgba(0, 0, 0, 0.08);
  }
`;

const ImageWrapper = styled.div`
  width: 100%;
  aspect-ratio: 16 / 9; /* Sleek, shorter widescreen ratio */
  background-color: #eaeaea;
  overflow: hidden;
`;

const Img = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.6s ease;

  ${StoreCard}:hover & {
    transform: scale(1.05);
  }
`;

const InfoWrapper = styled.div`
  /* Significantly tighter padding to keep the card compact */
  padding: 1.75rem 1.5rem;
  display: flex;
  flex-direction: column;
  flex-grow: 1; /* Pushes the button to the bottom if cards are different heights */
`;

const Title = styled.h3`
  font-family: "Playfair Display", "Baskerville", serif;
  font-size: 1.5rem; /* Scaled down from 2.25rem */
  font-weight: 600;
  color: #222222;
  margin-bottom: 1.25rem;
  line-height: 1.2;
`;

const DetailsList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.85rem; /* Tighter gap between address/phone/hours */
  margin-bottom: 2rem;
`;

const DetailRow = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 0.75rem;
`;

const IconBox = styled.div`
  color: var(--color-primary);
  margin-top: 0.15rem;
  flex-shrink: 0;
`;

const DetailText = styled.p`
  font-family: var(--font-body);
  font-size: 0.9rem; /* Scaled down for neatness */
  color: #555555;
  line-height: 1.5;
  margin: 0;
`;

/* Changed from a bulky button to a sleek, expanding editorial link */
const DirectionsLink = styled.a`
  margin-top: auto; /* Always sits at the bottom */
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  font-family: var(--font-headline);
  font-size: 0.85rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  color: #222222;
  text-decoration: none;
  padding-bottom: 0.25rem;
  border-bottom: 1px solid #dcdcdc;
  transition: all 0.3s ease;
  align-self: flex-start; /* Keeps it tight to the left instead of stretching */

  svg {
    transition: transform 0.3s ease;
  }

  ${StoreCard}:hover & {
    color: var(--color-primary);
    border-color: var(--color-primary);
  }

  ${StoreCard}:hover & svg {
    transform: translateX(4px);
  }
`;
