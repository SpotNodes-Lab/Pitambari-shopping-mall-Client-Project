import { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import styled from "styled-components";
import { Star } from "lucide-react";
import { Button } from "@/components/ui/Button";
import {
  AddReviewModal,
  type ReviewFormValues,
} from "@/components/shared/AddReviewModal";
import { submitPatronReviewToSheet } from "@/lib/patronReviewSheet";

/** Production reviews Web App; override with `VITE_REVIEW_FORM_URL` if you redeploy. */
const DEFAULT_REVIEW_FORM_WEB_APP_URL =
  "https://script.google.com/macros/s/AKfycbzKteZDnu3TMYQXvR0J_TLO-4m4tinogeO_9-r8sAKE-CW8l7DFovhMpAjLU65_RJU1/exec";

const REVIEW_FORM_ENDPOINT =
  import.meta.env.VITE_REVIEW_FORM_URL?.trim() ||
  DEFAULT_REVIEW_FORM_WEB_APP_URL;

/** Removed feature: client-side review list. Clear any legacy data from older builds. */
const LEGACY_USER_REVIEWS_STORAGE_KEY = "pitambari-patrons-reviews";

export interface Testimonial {
  id: number;
  name: string;
  title: string;
  quote: string;
  /** 1–5; defaults to 5 in the UI when omitted (e.g. static copy). */
  rating?: number;
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
      "My family has been shopping at Pitambari for three generations. Their sherwani craftsmanship is unmatched, and the fabric quality speaks for itself. It is our go-to for every festival.",
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
  /** Cards reflect CMS/homepage API or fallback only — form posts go to the Sheet, not here. */
  const testimonials = useMemo(
    () => (data && data.length > 0 ? data : fallbackData),
    [data]
  );
  const [reviewModalOpen, setReviewModalOpen] = useState(false);

  useEffect(() => {
    try {
      localStorage.removeItem(LEGACY_USER_REVIEWS_STORAGE_KEY);
    } catch {
      /* ignore */
    }
  }, []);

  async function handleAddReview(values: ReviewFormValues) {
    console.log(
      "[Pitambari TestimonialsSection] handleAddReview — Google Sheet only (no grid update)",
      {
        reviewFormUrlSource: import.meta.env.VITE_REVIEW_FORM_URL?.trim()
          ? "VITE_REVIEW_FORM_URL"
          : "DEFAULT_REVIEW_FORM_WEB_APP_URL",
      }
    );

    await submitPatronReviewToSheet(REVIEW_FORM_ENDPOINT, values);

    console.log(
      "[Pitambari TestimonialsSection] done; published quotes still come from admin/CMS only."
    );
  }

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
          <CtaWrap>
            <Button
              type="button"
              variant="outline"
              onClick={() => setReviewModalOpen(true)}
            >
              Write a review
            </Button>
          </CtaWrap>
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
                {[1, 2, 3, 4, 5].map((star) => {
                  const filled = star <= (t.rating ?? 5);
                  return (
                    <Star
                      key={star}
                      size={14}
                      fill={filled ? "#d4af37" : "none"}
                      color="#d4af37"
                    />
                  );
                })}
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

      <AddReviewModal
        open={reviewModalOpen}
        onClose={() => setReviewModalOpen(false)}
        onSubmitReview={handleAddReview}
      />
    </Section>
  );
}
// --- Styled Components ---

const Section = styled.section`
  padding-top: var(--section-y);
  padding-bottom: var(--section-y);
  background-color: #fcfbf9;
  position: relative;
`;

const Container = styled.div`
  max-width: 1250px;
  margin-left: auto;
  margin-right: auto;
  padding-left: calc(var(--page-gutter-x) + env(safe-area-inset-left, 0px));
  padding-right: calc(var(--page-gutter-x) + env(safe-area-inset-right, 0px));
`;

const Header = styled(motion.div)`
  text-align: center;
  margin-bottom: clamp(1.75rem, 4vw, 2.5rem);
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 0 clamp(0rem, 2vw, 0.5rem);
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
  font-size: clamp(1.65rem, 4.8vw, 2.25rem);
  color: #222222;
  margin-bottom: 0.75rem;
  line-height: 1.2;
  font-weight: 500;

  @media (min-width: 768px) {
    font-size: 2.75rem;
  }
`;

const Subtitle = styled.p`
  font-family: var(--font-body);
  font-size: clamp(0.9rem, 2.4vw, 1rem);
  color: #666666;
  max-width: 32rem;
  line-height: 1.55;
`;

const CtaWrap = styled.div`
  margin-top: 1.25rem;
  display: flex;
  justify-content: center;
  width: 100%;
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: clamp(1.15rem, 3vw, 1.5rem);

  @media (min-width: 768px) {
    grid-template-columns: repeat(3, 1fr);
    gap: 1.5rem;
    align-items: start;

    & > div:nth-child(2) {
      margin-top: 1.5rem;
    }
  }
`;

const Card = styled(motion.div)`
  background-color: #ffffff;
  border-radius: 4px;
  padding: clamp(1.35rem, 4vw, 2rem);
  position: relative;
  overflow: hidden;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.04);
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  min-height: clamp(240px, 42vw, 280px);
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
  top: -1.25rem;
  left: 0.35rem;
  font-family: "Playfair Display", serif;
  font-size: clamp(4.5rem, 18vw, 8rem);
  font-weight: 900;
  color: var(--color-primary);
  opacity: 0.04;
  line-height: 1;
  pointer-events: none;
`;

const Stars = styled.div`
  display: flex;
  gap: 0.25rem;
  margin-bottom: clamp(0.75rem, 2.5vw, 1rem);
  z-index: 1;
`;

const Quote = styled.p`
  font-family: "Playfair Display", "Baskerville", serif;
  font-style: italic;
  font-size: clamp(0.95rem, 2.6vw, 1.05rem);
  color: #444444;
  line-height: 1.58;
  margin-bottom: clamp(1.1rem, 3vw, 1.5rem);
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
