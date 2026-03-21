import { useRef, useEffect } from "react";
import styled from "styled-components";
import { motion } from "framer-motion";
import { Instagram } from "lucide-react";

interface Reel {
  id: string;
  videoUrl: string;
  title: string;
}

// Your actual client videos
const REELS_DATA: Reel[] = [
  {
    id: "1",
    videoUrl:
      "https://shreedholisatiretailmall.com/wp-content/uploads/2025/10/WhatsApp-Video-2025-08-28-at-16.mp4",
    title: "Bridal Elegance",
  },
  {
    id: "2",
    videoUrl:
      "https://shreedholisatiretailmall.com/wp-content/uploads/2025/10/WhatsApp-Video-2025-08-28-at-16-1.mp4",
    title: "Festive Glamour",
  },
  {
    id: "3",
    videoUrl:
      "https://shreedholisatiretailmall.com/wp-content/uploads/2025/10/WhatsApp-Video-2025-08-28-at-16-3.mp4",
    title: "Menswear Edit",
  },
  {
    id: "4",
    videoUrl:
      "https://shreedholisatiretailmall.com/wp-content/uploads/2025/10/WhatsApp-Video-2025-08-28-at-16-2.mp4",
    title: "Signature Silks",
  },
];

export function ReelsSection() {
  return (
    <Section>
      <GiantWatermark>SOCIAL</GiantWatermark>
      <Container>
        {/* Left Panel: Sticky Text */}
        <LeftPanel
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <EyebrowWrapper>
            <DecorativeDiamond />
            <Eyebrow>@DholiSatiRetail</Eyebrow>
          </EyebrowWrapper>
          <Title>
            The Instagram <span className="serif-italic">Edit</span>
          </Title>
          <Subtitle>
            Get inspired by real patrons, fresh arrivals, and the latest ethnic
            trends straight from our showrooms.
          </Subtitle>
          <FollowButton
            href="https://instagram.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Instagram size={18} />
            Follow Our Journey
          </FollowButton>
        </LeftPanel>

        {/* Right Panel: Staggered Scrolling Videos */}
        <RightPanel>
          <ReelsTrack>
            {REELS_DATA.map((reel, index) => (
              <ReelCard key={reel.id} reel={reel} index={index} />
            ))}
          </ReelsTrack>
        </RightPanel>
      </Container>
    </Section>
  );
}

// Sub-component for individual Reel
function ReelCard({ reel, index }: { reel: Reel; index: number }) {
  const videoRef = useRef<HTMLVideoElement>(null);

  // Intersection Observer for Mobile Autoplay UX (Plays when in center of screen)
  useEffect(() => {
    const videoElement = videoRef.current;
    if (!videoElement) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        if (entry.isIntersecting) {
          videoElement.play().catch(() => {});
        } else {
          videoElement.pause();
        }
      },
      { threshold: 0.6 },
    );

    observer.observe(videoElement);
    return () => observer.disconnect();
  }, []);

  const handleMouseEnter = () => videoRef.current?.play();
  const handleMouseLeave = () => videoRef.current?.pause();

  return (
    <CardWrapper
      className={index % 2 !== 0 ? "staggered-down" : ""}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.7, delay: index * 0.15 }}
    >
      <Card onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
        <Video
          ref={videoRef}
          src={reel.videoUrl}
          muted
          loop
          playsInline
          preload="metadata"
        />
        <Overlay>
          <ReelTitle>{reel.title}</ReelTitle>
        </Overlay>
      </Card>
    </CardWrapper>
  );
}

// --- Styled Components ---

const Section = styled.section`
  padding: 6rem 0;
  background-color: #faf9f7; /* Very soft ivory */
  position: relative;
  overflow: hidden;
`;

const GiantWatermark = styled.div`
  position: absolute;
  top: 10%;
  left: -5%;
  font-family: "Playfair Display", serif;
  font-size: 15vw;
  font-weight: 900;
  color: var(--color-primary);
  opacity: 0.03; /* Barely visible, adds texture */
  line-height: 1;
  pointer-events: none;
  white-space: nowrap;
`;

const Container = styled.div`
  max-width: 1440px;
  margin: 0 auto;
  padding: 0 1.5rem;
  display: flex;
  flex-direction: column;
  gap: 3rem;

  @media (min-width: 1024px) {
    flex-direction: row;
    align-items: flex-start; /* Required for sticky positioning */
  }
`;

/* --- LEFT PANEL (Sticky Editorial) --- */
const LeftPanel = styled(motion.div)`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  z-index: 2;

  @media (min-width: 1024px) {
    flex: 0 0 35%; /* Takes up 35% of the screen */
    position: sticky;
    top: 8rem; /* Locks in place as the user scrolls down the page */
    padding-top: 4rem;
  }
`;

const EyebrowWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 1rem;
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
  font-size: 3rem;
  font-weight: 800;
  color: #222222;
  margin-bottom: 1rem;
  line-height: 1.1;
  letter-spacing: -0.02em;

  .serif-italic {
    font-family: "Playfair Display", "Baskerville", serif;
    font-style: italic;
    font-weight: 400;
    color: var(--color-primary);
    font-size: 110%;
  }
`;

const Subtitle = styled.p`
  font-family: var(--font-body);
  color: #666666;
  font-size: 1.05rem;
  line-height: 1.6;
  max-width: 350px;
  margin-bottom: 2.5rem;
`;

const FollowButton = styled.a`
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.85rem 1.75rem;
  border: 1px solid #dcdcdc;
  border-radius: 4px;
  font-family: var(--font-headline);
  font-size: 0.85rem;
  font-weight: 700;
  letter-spacing: 0.05em;
  text-transform: uppercase;
  color: #222222;
  text-decoration: none;
  background: transparent;
  transition: all 0.3s ease;

  &:hover {
    background-color: var(--color-primary);
    color: #ffffff;
    border-color: var(--color-primary);
    transform: translateY(-2px);
  }
`;

/* --- RIGHT PANEL (Staggered Scrolling Track) --- */
const RightPanel = styled.div`
  width: 100%;
  overflow-x: auto;
  padding-bottom: 2rem;

  @media (min-width: 1024px) {
    flex: 1; /* Takes the remaining 65% of screen */
    min-width: 0; /* Prevents flexbox blowout */
    padding-left: 2rem;

    /* Adds extra padding at the bottom so the staggered cards aren't cut off */
    padding-bottom: 5rem;
  }

  scroll-snap-type: x mandatory;
  scrollbar-width: none;
  &::-webkit-scrollbar {
    display: none;
  }
`;

const ReelsTrack = styled.div`
  display: flex;
  gap: 2rem;
  width: max-content;

  /* Adds breathing room to the right side of the scroll */
  padding-right: 2rem;
`;

const CardWrapper = styled(motion.div)`
  flex-shrink: 0;
  scroll-snap-align: center;

  /* THE MAGIC: This pushes every 2nd card down to create a stylish wave/staggered layout */
  @media (min-width: 768px) {
    &.staggered-down {
      margin-top: 4rem;
    }
  }
`;

const Card = styled.div`
  position: relative;
  width: 280px;
  aspect-ratio: 9 / 16;
  border-radius: 6px;
  overflow: hidden;
  background-color: #eaeaea;
  box-shadow: 0 15px 40px rgba(0, 0, 0, 0.08);
  transition:
    transform 0.4s ease,
    box-shadow 0.4s ease;
  cursor: default;

  @media (min-width: 768px) {
    width: 300px;
  }

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 20px 50px rgba(0, 0, 0, 0.12);
  }
`;

const Video = styled.video`
  width: 100%;
  height: 100%;
  object-fit: cover;
  background-color: #111111;
`;

const Overlay = styled.div`
  position: absolute;
  inset: 0;
  background: linear-gradient(
    to top,
    rgba(0, 0, 0, 0.8) 0%,
    rgba(0, 0, 0, 0.1) 40%,
    transparent 100%
  );
  display: flex;
  align-items: flex-end;
  padding: 2rem 1.5rem;
  pointer-events: none;
`;

const ReelTitle = styled.h3`
  color: #ffffff;
  font-family: var(--font-headline);
  font-size: 1.15rem;
  font-weight: 700;
  letter-spacing: 0.05em;
  text-transform: uppercase;
  text-shadow: 0 2px 10px rgba(0, 0, 0, 0.5);
`;
