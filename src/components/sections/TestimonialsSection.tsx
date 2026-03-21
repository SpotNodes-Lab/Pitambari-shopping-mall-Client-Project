import { motion } from "framer-motion";
import styled from "styled-components";
import { Star } from "lucide-react";

export interface Testimonial {
  id: number;
  name: string;
  title: string;
  quote: string;
}

// Supplying some fallback premium data if backend doesn't provide it
const fallbackData: Testimonial[] = [
  {
    id: 1,
    name: "Aarti Sharma",
    title: "Bride-to-be",
    quote:
      "The bridal collection is absolutely breathtaking. The staff gave me their undivided attention and helped me customize my lehenga to absolute perfection. A truly royal experience.",
  },
  {
    id: 2,
    name: "Vikram Singh",
    title: "Loyal Patron",
    quote:
      "My family has been shopping at Dholi Sati for three generations. Their sherwani craftsmanship is unmatched, and the fabric quality speaks for itself. It is our go-to for every festival.",
  },
  {
    id: 3,
    name: "Priya Desai",
    title: "Festive Shopper",
    quote:
      "Finding outfits for the whole family used to be exhausting until we visited the mall. The spacious trial rooms and the sheer variety across all floors made our Diwali shopping effortless.",
  },
];

export function TestimonialsSection({ data }: { data?: Testimonial[] }) {
  const testimonials = data && data.length > 0 ? data : fallbackData;

  return (
    <Section>
      <Container>
        <Header
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <EyebrowWrapper>
            <DecorativeDiamond />
            <Eyebrow>Client Diaries</Eyebrow>
            <DecorativeDiamond />
          </EyebrowWrapper>
          <Title>Words from our Patrons</Title>
          <Subtitle>
            Discover what families are saying about their in-store experiences.
          </Subtitle>
        </Header>

        <Grid>
          {testimonials.slice(0, 3).map((t, index) => (
            <Card
              key={t.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{
                duration: 0.7,
                delay: index * 0.15,
                ease: "easeOut",
              }}
            >
              {/* Massive faded quotation mark as an elegant background watermark */}
              <QuoteWatermark>“</QuoteWatermark>

              <Stars>
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star key={star} size={14} fill="#d4af37" color="#d4af37" />
                ))}
              </Stars>

              <Quote>"{t.quote}"</Quote>

              <Person>
                <Name>{t.name}</Name>
                <TitleText>{t.title}</TitleText>
              </Person>
            </Card>
          ))}
        </Grid>
      </Container>
    </Section>
  );
}
// --- Styled Components ---

const Section = styled.section`
  /* Reduced from 6rem to 4rem to pull it closer to the sections above and below */
  padding-top: 4rem;
  padding-bottom: 4rem;
  background-color: #fcfbf9;
  position: relative;
`;

const Container = styled.div`
  max-width: 1250px;
  margin-left: auto;
  margin-right: auto;
  padding-left: 1.5rem;
  padding-right: 1.5rem;
`;

const Header = styled(motion.div)`
  text-align: center;
  /* Reduced from 4rem to 2.5rem to pull the cards closer to the title */
  margin-bottom: 2.5rem;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const EyebrowWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 0.75rem; /* Tighter gap */
`;

const DecorativeDiamond = styled.div`
  width: 5px;
  height: 5px;
  background-color: var(--color-primary);
  transform: rotate(45deg);
  opacity: 0.7;
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
  font-family: "Playfair Display", "Baskerville", serif;
  font-size: 2.25rem;
  color: #222222;
  margin-bottom: 0.75rem; /* Tighter gap */
  line-height: 1.2;
  font-weight: 500;

  @media (min-width: 768px) {
    font-size: 2.75rem;
  }
`;

const Subtitle = styled.p`
  font-family: var(--font-body);
  font-size: 1rem;
  color: #666666;
  max-width: 500px;
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 1.5rem; /* Tighter gap between cards on mobile */

  @media (min-width: 768px) {
    grid-template-columns: repeat(3, 1fr);
    gap: 1.5rem; /* Tighter gap between cards on desktop */
    align-items: start;

    /* Reduced the "stagger" effect from 2.5rem to 1.5rem so it doesn't push the middle card down too far */
    & > div:nth-child(2) {
      margin-top: 1.5rem;
    }
  }
`;

const Card = styled(motion.div)`
  background-color: #ffffff;
  border-radius: 4px;
  /* Reduced padding inside the card to make it more compact */
  padding: 2rem 2rem;
  position: relative;
  overflow: hidden;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.04);
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  /* Reduced minimum height so cards hug the text more tightly */
  min-height: 280px;
  transition:
    transform 0.4s ease,
    box-shadow 0.4s ease;

  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 15px 40px rgba(0, 0, 0, 0.08);
  }
`;

const QuoteWatermark = styled.div`
  position: absolute;
  top: -1.5rem;
  left: 0.5rem;
  font-family: "Playfair Display", serif;
  font-size: 8rem; /* Slightly smaller watermark to fit the smaller card */
  font-weight: 900;
  color: var(--color-primary);
  opacity: 0.04;
  line-height: 1;
  pointer-events: none;
`;

const Stars = styled.div`
  display: flex;
  gap: 0.25rem;
  margin-bottom: 1rem; /* Tighter gap */
  z-index: 1;
`;

const Quote = styled.p`
  font-family: "Playfair Display", "Baskerville", serif;
  font-style: italic;
  font-size: 1.05rem;
  color: #444444;
  line-height: 1.6; /* Tighter line height */
  margin-bottom: 1.5rem; /* Tighter gap */
  flex-grow: 1;
  z-index: 1;
`;

const Person = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.15rem; /* Tighter gap */
  z-index: 1;
  border-top: 1px solid #eaeaea;
  padding-top: 1.25rem; /* Tighter padding */
`;

const Name = styled.span`
  font-family: var(--font-headline);
  font-weight: 700;
  font-size: 1rem;
  color: #222222;
  letter-spacing: 0.02em;
`;

const TitleText = styled.span`
  font-family: var(--font-label);
  text-transform: uppercase;
  letter-spacing: 0.15em;
  font-size: 0.7rem;
  color: var(--color-primary);
`;
