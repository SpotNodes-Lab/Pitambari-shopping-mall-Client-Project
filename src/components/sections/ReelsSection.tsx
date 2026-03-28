import { useRef, useEffect, useState } from "react";
import styled from "styled-components";
import { motion } from "framer-motion";
import { Instagram, Youtube, X } from "lucide-react";
import { SOCIAL_REELS_FALLBACK } from "@/constants/index";
import type { SocialClip } from "@/services/cmsApi";
import {
  buildYoutubeIframeSrc,
  getInstagramEmbedUrl,
  isDirectHttpVideoUrl,
} from "@/utils/socialEmbed";

export type ReelsSectionVariant = "instagram" | "youtube";

/** Clips shown in the horizontal strip; the rest are reachable via “View all”. */
const PREVIEW_REEL_COUNT = 3;

const VARIANT_COPY: Record<
  ReelsSectionVariant,
  {
    eyebrow: string;
    titleBeforeItalic: string;
    subtitle: string;
    cta: string;
    href: string;
    viewAllModalTitle: string;
    moreLabel: string;
  }
> = {
  instagram: {
    eyebrow: "@PitambariShoppingMall",
    titleBeforeItalic: "The Instagram ",
    subtitle:
      "Get inspired by real patrons, fresh arrivals, and the latest ethnic trends straight from our showrooms.",
    cta: "Follow Our Journey",
    href: "https://instagram.com",
    viewAllModalTitle: "All Instagram reels",
    moreLabel: "reel",
  },
  youtube: {
    eyebrow: "@PitambariShoppingMall",
    titleBeforeItalic: "The YouTube Shorts ",
    subtitle:
      "Quick looks, styling ideas, and showroom moments in bite-sized clips—same energy as our floor, in vertical form.",
    cta: "Subscribe to Our Channel",
    href: "https://www.youtube.com/@PitambariShoppingMall",
    viewAllModalTitle: "All YouTube Shorts",
    moreLabel: "Short",
  },
};

export function ReelsSection({
  variant = "instagram",
  clips,
}: {
  variant?: ReelsSectionVariant;
  clips: SocialClip[];
}) {
  const copy = VARIANT_COPY[variant];
  const [viewAllOpen, setViewAllOpen] = useState(false);
  const previewReels = clips.slice(0, PREVIEW_REEL_COUNT);
  const hiddenCount = Math.max(0, clips.length - PREVIEW_REEL_COUNT);
  const hasMore = hiddenCount > 0;

  useEffect(() => {
    if (!viewAllOpen) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [viewAllOpen]);

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
            <Eyebrow>{copy.eyebrow}</Eyebrow>
          </EyebrowWrapper>
          <Title>
            {copy.titleBeforeItalic}
            <span className="serif-italic">Edit</span>
          </Title>
          <Subtitle>{copy.subtitle}</Subtitle>
          <FollowButton
            href={copy.href}
            target="_blank"
            rel="noopener noreferrer"
          >
            {variant === "youtube" ? (
              <Youtube size={18} />
            ) : (
              <Instagram size={18} />
            )}
            {copy.cta}
          </FollowButton>
          {hasMore && (
            <ViewAllHint>
              <span>
                {Math.min(PREVIEW_REEL_COUNT, clips.length)} of {clips.length}{" "}
                shown · {hiddenCount} more {copy.moreLabel}
                {hiddenCount === 1 ? "" : "s"}
              </span>
              <ViewAllTextButton
                type="button"
                onClick={() => setViewAllOpen(true)}
              >
                View all
              </ViewAllTextButton>
            </ViewAllHint>
          )}
        </LeftPanel>

        {/* Right Panel: Staggered Scrolling Videos */}
        <RightPanel>
          {hasMore && (
            <RightPanelToolbar>
              <ToolbarSpacer aria-hidden />
              <ToolbarViewAll
                type="button"
                onClick={() => setViewAllOpen(true)}
              >
                View all ({clips.length})
              </ToolbarViewAll>
            </RightPanelToolbar>
          )}
          <ReelsScrollViewport>
            <ReelsTrack>
              {previewReels.map((reel, index) => (
                <ReelCard
                  key={`${variant}-${reel.id}`}
                  reel={reel}
                  index={index}
                  variant={variant}
                />
              ))}
            </ReelsTrack>
          </ReelsScrollViewport>
          {hasMore && (
            <MoreReelsIndicatorRow>
              <MoreReelsEllipsis
                type="button"
                onClick={() => setViewAllOpen(true)}
                aria-label={`View all ${clips.length} clips`}
              >
                <span aria-hidden>…</span>
              </MoreReelsEllipsis>
            </MoreReelsIndicatorRow>
          )}
        </RightPanel>
      </Container>

      {viewAllOpen && (
        <ReelsViewAllModal
          title={copy.viewAllModalTitle}
          reels={clips}
          variantKey={variant}
          onClose={() => setViewAllOpen(false)}
        />
      )}
    </Section>
  );
}

function ReelsViewAllModal({
  title,
  reels,
  variantKey,
  onClose,
}: {
  title: string;
  reels: SocialClip[];
  variantKey: ReelsSectionVariant;
  onClose: () => void;
}) {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  return (
    <ModalOverlay
      role="dialog"
      aria-modal="true"
      aria-labelledby="reels-view-all-title"
      onMouseDown={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <ModalShell>
        <ModalTop>
          <ModalTitle id="reels-view-all-title">{title}</ModalTitle>
          <ModalClose type="button" onClick={onClose} aria-label="Close">
            <X size={20} strokeWidth={2} />
          </ModalClose>
        </ModalTop>
        <ModalGrid>
          {reels.map((reel, index) => (
            <ReelCard
              key={`${variantKey}-modal-${reel.id}`}
              reel={reel}
              index={index}
              variant={variantKey}
              autoplayOnIntersect={false}
              staggerLayout={false}
              compact
            />
          ))}
        </ModalGrid>
      </ModalShell>
    </ModalOverlay>
  );
}

// Sub-component for individual Reel
function ReelCard({
  reel,
  index,
  variant,
  autoplayOnIntersect = true,
  staggerLayout = true,
  compact = false,
}: {
  reel: SocialClip;
  index: number;
  variant: ReelsSectionVariant;
  autoplayOnIntersect?: boolean;
  staggerLayout?: boolean;
  compact?: boolean;
}) {
  const url = reel.url.trim();
  const hostedVideo = reel.videoUrl?.trim() ?? "";
  const isMp4 = isDirectHttpVideoUrl(url);
  const useHostedVideo =
    !isMp4 && hostedVideo.length > 0 && isDirectHttpVideoUrl(hostedVideo);
  const ytIframeSrc =
    !isMp4 && !useHostedVideo ? buildYoutubeIframeSrc(url, { autoplay: false }) : null;
  const igPermalink = !isMp4 && !useHostedVideo && !ytIframeSrc ? getInstagramEmbedUrl(url) : null;
  const instagramNativeVideoUrl =
    variant === "instagram" && igPermalink
      ? SOCIAL_REELS_FALLBACK[index % SOCIAL_REELS_FALLBACK.length]?.url
      : undefined;

  const staggerClass =
    staggerLayout && index % 2 !== 0 ? "staggered-down" : "";

  if (isMp4) {
    return (
      <VideoReelCard
        reel={reel}
        videoUrl={url}
        index={index}
        staggerClass={staggerClass}
        compact={compact}
        autoplayOnIntersect={autoplayOnIntersect}
      />
    );
  }

  if (useHostedVideo) {
    return (
      <VideoReelCard
        reel={reel}
        videoUrl={hostedVideo}
        index={index}
        staggerClass={staggerClass}
        compact={compact}
        autoplayOnIntersect={autoplayOnIntersect}
        openOriginalUrl={igPermalink ? url : undefined}
      />
    );
  }

  if (instagramNativeVideoUrl) {
    return (
      <VideoReelCard
        reel={reel}
        videoUrl={instagramNativeVideoUrl}
        index={index}
        staggerClass={staggerClass}
        compact={compact}
        autoplayOnIntersect={autoplayOnIntersect}
        openOriginalUrl={url}
      />
    );
  }

  if (ytIframeSrc) {
    return (
      <YoutubeReelCard
        reel={reel}
        pageUrl={url}
        index={index}
        staggerClass={staggerClass}
        compact={compact}
        autoplayOnIntersect={autoplayOnIntersect}
      />
    );
  }

  return (
    <CardWrapper
      className={staggerClass}
      $compact={compact}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.7, delay: index * 0.15 }}
    >
      <Card $compact={compact}>
        <ExternalClipLink
          href={url}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`Open ${reel.title} — ${variant === "youtube" ? "YouTube" : "Instagram"}`}
          $variant={variant}
        >
          {variant === "youtube" ? (
            <Youtube size={compact ? 36 : 44} strokeWidth={1.25} />
          ) : (
            <Instagram size={compact ? 36 : 44} strokeWidth={1.25} />
          )}
        </ExternalClipLink>
        <Overlay>
          <ReelTitle>{reel.title}</ReelTitle>
        </Overlay>
      </Card>
    </CardWrapper>
  );
}

/** YouTube Shorts / watch links: muted autoplay when the card is in view (preview strip only). */
function YoutubeReelCard({
  reel,
  pageUrl,
  index,
  staggerClass,
  compact,
  autoplayOnIntersect,
}: {
  reel: SocialClip;
  pageUrl: string;
  index: number;
  staggerClass: string;
  compact: boolean;
  autoplayOnIntersect: boolean;
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(!autoplayOnIntersect);

  useEffect(() => {
    if (!autoplayOnIntersect) return;
    const el = containerRef.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        setInView(entry.isIntersecting);
      },
      { threshold: 0.35, rootMargin: "0px 0px -8% 0px" },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [autoplayOnIntersect]);

  const src =
    buildYoutubeIframeSrc(pageUrl, {
      autoplay: autoplayOnIntersect ? inView : false,
    }) ?? "";

  return (
    <CardWrapper
      ref={containerRef}
      className={staggerClass}
      $compact={compact}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.7, delay: index * 0.15 }}
    >
      <Card $compact={compact}>
        {src ? (
          <EmbedIframe
            key={autoplayOnIntersect ? `${src}-in-${inView}` : src}
            src={src}
            title={reel.title}
            loading="lazy"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
          />
        ) : null}
        <Overlay>
          <ReelTitle>{reel.title}</ReelTitle>
        </Overlay>
      </Card>
    </CardWrapper>
  );
}

function VideoReelCard({
  reel,
  videoUrl,
  index,
  staggerClass,
  compact,
  autoplayOnIntersect,
  openOriginalUrl,
}: {
  reel: SocialClip;
  videoUrl: string;
  index: number;
  staggerClass: string;
  compact: boolean;
  autoplayOnIntersect: boolean;
  /** When the card plays a hosted MP4 but the canonical clip lives on Instagram. */
  openOriginalUrl?: string;
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (!autoplayOnIntersect) return;
    const root = containerRef.current;
    const videoElement = videoRef.current;
    if (!root || !videoElement) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        if (entry.isIntersecting) {
          videoElement.play().catch(() => {});
        } else {
          videoElement.pause();
        }
      },
      { threshold: 0.35, rootMargin: "0px 0px -8% 0px" },
    );

    observer.observe(root);
    return () => observer.disconnect();
  }, [autoplayOnIntersect, videoUrl]);

  const handleMouseEnter = () => videoRef.current?.play();
  const handleMouseLeave = () => videoRef.current?.pause();

  return (
    <CardWrapper
      ref={containerRef}
      className={staggerClass}
      $compact={compact}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.7, delay: index * 0.15 }}
    >
      <Card
        $compact={compact}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <Video
          ref={videoRef}
          src={videoUrl}
          muted
          loop
          playsInline
          preload={autoplayOnIntersect ? "auto" : "metadata"}
        />
        {openOriginalUrl ? (
          <OpenOnInstagram
            href={openOriginalUrl}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`Open ${reel.title} on Instagram`}
            $compact={compact}
          >
            <Instagram size={compact ? 18 : 20} strokeWidth={2} />
          </OpenOnInstagram>
        ) : null}
        <Overlay>
          <ReelTitle>{reel.title}</ReelTitle>
        </Overlay>
      </Card>
    </CardWrapper>
  );
}

// --- Styled Components ---

const Section = styled.section`
  padding-top: var(--section-y-loose);
  padding-bottom: var(--section-y-loose);
  background-color: #faf9f7; /* Very soft ivory */
  position: relative;
  overflow: hidden;
`;

const GiantWatermark = styled.div`
  position: absolute;
  top: 8%;
  left: -8%;
  font-family: "Playfair Display", serif;
  font-size: clamp(3.25rem, 14vw, 8.5rem);
  font-weight: 900;
  color: var(--color-primary);
  opacity: 0.03; /* Barely visible, adds texture */
  line-height: 1;
  pointer-events: none;
  white-space: nowrap;

  @media (max-width: 480px) {
    opacity: 0.02;
  }
`;

const Container = styled.div`
  max-width: 1440px;
  margin: 0 auto;
  padding-left: calc(var(--page-gutter-x) + env(safe-area-inset-left, 0px));
  padding-right: calc(var(--page-gutter-x) + env(safe-area-inset-right, 0px));
  display: flex;
  flex-direction: column;
  gap: clamp(1.75rem, 5vw, 3rem);

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
  max-width: 100%;

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
  font-size: clamp(1.85rem, 6vw, 3rem);
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
  font-size: clamp(0.95rem, 2.5vw, 1.05rem);
  line-height: 1.6;
  max-width: 26rem;
  margin-bottom: clamp(1.5rem, 4vw, 2.5rem);
`;

const FollowButton = styled.a`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  padding: clamp(0.75rem, 2.2vw, 0.85rem) clamp(1.25rem, 4vw, 1.75rem);
  border: 1px solid #dcdcdc;
  border-radius: 4px;
  font-family: var(--font-headline);
  font-size: clamp(0.78rem, 2.2vw, 0.85rem);
  font-weight: 700;
  letter-spacing: 0.05em;
  text-transform: uppercase;
  color: #222222;
  text-decoration: none;
  background: transparent;
  transition: all 0.3s ease;
  width: 100%;
  max-width: 20rem;
  box-sizing: border-box;

  @media (min-width: 1024px) {
    width: auto;
    max-width: none;
  }

  &:hover {
    background-color: var(--color-primary);
    color: #ffffff;
    border-color: var(--color-primary);
    transform: translateY(-2px);
  }
`;

const ViewAllHint = styled.p`
  margin: 1rem 0 0;
  max-width: 26rem;
  font-family: var(--font-body);
  font-size: 0.8125rem;
  line-height: 1.5;
  color: #666666;

  span {
    display: block;
    margin-bottom: 0.35rem;
  }
`;

const ViewAllTextButton = styled.button`
  border: none;
  background: none;
  padding: 0;
  cursor: pointer;
  font-family: var(--font-label);
  font-size: 0.7rem;
  font-weight: 700;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  color: var(--color-primary);
  text-decoration: underline;
  text-underline-offset: 3px;

  &:hover {
    color: #222222;
  }
`;

/* --- RIGHT PANEL (Staggered Scrolling Track) --- */
const RightPanel = styled.div`
  width: 100%;
  padding-bottom: clamp(1.25rem, 4vw, 2rem);

  @media (min-width: 1024px) {
    flex: 1; /* Takes the remaining 65% of screen */
    min-width: 0; /* Prevents flexbox blowout */
    padding-left: 2rem;

    /* Adds extra padding at the bottom so the staggered cards aren't cut off */
    padding-bottom: 5rem;
  }
`;

const ReelsScrollViewport = styled.div`
  overflow-x: auto;
  scroll-snap-type: x mandatory;
  scrollbar-width: none;

  &::-webkit-scrollbar {
    display: none;
  }
`;

const RightPanelToolbar = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  margin-bottom: 0.75rem;
  padding-right: clamp(0.25rem, 2vw, 0.5rem);

  @media (min-width: 1024px) {
    padding-right: clamp(1rem, 4vw, 2rem);
  }
`;

const ToolbarSpacer = styled.div`
  flex: 1;
`;

const ToolbarViewAll = styled.button`
  border: none;
  background: none;
  cursor: pointer;
  font-family: var(--font-label);
  font-size: 0.7rem;
  font-weight: 700;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: var(--color-primary);
  padding: 0.35rem 0;

  &:hover {
    color: #222222;
    text-decoration: underline;
    text-underline-offset: 3px;
  }
`;

const ReelsTrack = styled.div`
  display: flex;
  gap: clamp(1rem, 3vw, 2rem);
  width: max-content;
  padding-right: clamp(1rem, 4vw, 2rem);
`;

const MoreReelsIndicatorRow = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
  min-width: 0;
  margin-top: clamp(0.35rem, 2vw, 0.65rem);
`;

const MoreReelsEllipsis = styled.button`
  border: none;
  background: none;
  cursor: pointer;
  padding: 0.4rem 0.6rem;
  line-height: 1;
  color: var(--color-primary);
  opacity: 0.75;
  transition:
    opacity 0.2s ease,
    transform 0.2s ease;

  span {
    display: inline-block;
    font-family: var(--font-headline);
    font-weight: 800;
    font-size: clamp(1.5rem, 4.5vw, 1.85rem);
    letter-spacing: 0.12em;
    transform: translateY(0.06em);
  }

  &:hover {
    opacity: 1;
    transform: translateY(-1px);
  }

  &:focus-visible {
    outline: 2px solid var(--color-primary);
    outline-offset: 3px;
    border-radius: 4px;
  }
`;

const CardWrapper = styled(motion.div)<{ $compact?: boolean }>`
  flex-shrink: 0;
  scroll-snap-align: center;

  ${({ $compact }) =>
    $compact &&
    `
    scroll-snap-align: unset;
    width: 100%;
    max-width: 220px;
    justify-self: center;
  `}

  /* THE MAGIC: This pushes every 2nd card down to create a stylish wave/staggered layout */
  @media (min-width: 768px) {
    &.staggered-down {
      margin-top: 4rem;
    }
  }
`;

const Card = styled.div<{ $compact?: boolean }>`
  position: relative;
  width: ${({ $compact }) =>
    $compact ? "min(100%, 220px)" : "min(78vw, 280px)"};
  margin: ${({ $compact }) => ($compact ? "0 auto" : "0")};
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
    width: ${({ $compact }) => ($compact ? "min(100%, 220px)" : "300px")};
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

const OpenOnInstagram = styled.a<{ $compact: boolean }>`
  position: absolute;
  top: ${({ $compact }) => ($compact ? "0.45rem" : "0.6rem")};
  right: ${({ $compact }) => ($compact ? "0.45rem" : "0.6rem")};
  z-index: 4;
  display: flex;
  align-items: center;
  justify-content: center;
  width: ${({ $compact }) => ($compact ? "2rem" : "2.35rem")};
  height: ${({ $compact }) => ($compact ? "2rem" : "2.35rem")};
  border-radius: 50%;
  color: #ffffff;
  background: rgba(0, 0, 0, 0.42);
  backdrop-filter: blur(6px);
  transition: background 0.2s ease;

  &:hover {
    background: rgba(131, 58, 180, 0.88);
  }
`;

const EmbedIframe = styled.iframe`
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  border: 0;
  background: #0a0a0a;
`;

const ExternalClipLink = styled.a<{ $variant: ReelsSectionVariant }>`
  position: absolute;
  inset: 0;
  z-index: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  text-decoration: none;
  cursor: pointer;
  color: #ffffff;
  background: ${(p) =>
    p.$variant === "youtube"
      ? "linear-gradient(160deg, #0f0f0f 0%, #3d1c1c 42%, #b8322d 100%)"
      : "linear-gradient(145deg, #833ab4 0%, #fd1d1d 52%, #fcb045 100%)"};
  opacity: 0.94;
  transition: opacity 0.2s ease;

  &:hover {
    opacity: 1;
  }

  svg {
    filter: drop-shadow(0 4px 18px rgba(0, 0, 0, 0.4));
  }
`;

const Overlay = styled.div`
  position: absolute;
  inset: 0;
  z-index: 2;
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

const ModalOverlay = styled.div`
  position: fixed;
  inset: 0;
  z-index: 230;
  background: rgba(34, 28, 24, 0.45);
  backdrop-filter: blur(8px);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 1rem;
`;

const ModalShell = styled.div`
  width: 100%;
  max-width: min(960px, 100%);
  max-height: min(90vh, 880px);
  overflow: hidden;
  display: flex;
  flex-direction: column;
  background: #faf9f7;
  border-radius: 6px;
  border: 1px solid #eaeaea;
  box-shadow: 0 24px 60px rgba(0, 0, 0, 0.12);
`;

const ModalTop = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 1rem;
  padding: clamp(1rem, 3vw, 1.35rem) clamp(1rem, 3vw, 1.5rem);
  border-bottom: 1px solid #eae8e4;
  flex-shrink: 0;
`;

const ModalTitle = styled.h2`
  font-family: "Playfair Display", "Baskerville", serif;
  font-size: clamp(1.2rem, 4vw, 1.5rem);
  font-weight: 600;
  color: #222222;
  line-height: 1.25;
  margin: 0;
`;

const ModalClose = styled.button`
  flex-shrink: 0;
  border: none;
  cursor: pointer;
  width: 2.25rem;
  height: 2.25rem;
  border-radius: 9999px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #444444;
  background: #f5f3f0;
  transition: background-color 0.2s ease;

  &:hover {
    background: #eae8e4;
  }
`;

const ModalGrid = styled.div`
  overflow-y: auto;
  padding: clamp(1rem, 3vw, 1.5rem);
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(160px, 1fr));
  gap: clamp(1rem, 3vw, 1.5rem);
  align-content: start;
`;
