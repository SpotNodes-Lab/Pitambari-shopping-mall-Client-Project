import { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import {
  buildYoutubeIframeSrc,
  extractYoutubeVideoId,
  getInstagramEmbedUrl,
  isDirectHttpVideoUrl,
} from "@/utils/socialEmbed";

const Fill = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  overflow: hidden;
  transition: transform 0.8s ease;
`;

const MediaImg = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: top center;
`;

const MediaVideo = styled.video`
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center;
`;

const EmbedFrame = styled.iframe`
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  border: 0;
`;

/**
 * Portrait tile media: still image, direct MP4/WebM, YouTube, or Instagram embed.
 * YouTube uses muted in-view autoplay when `autoplayOnIntersect` is true (same policy as reels).
 */
export function VerticalMediaEmbed({
  url,
  alt,
  autoplayOnIntersect = true,
  className,
}: {
  url: string;
  alt: string;
  autoplayOnIntersect?: boolean;
  className?: string;
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const raw = url.trim();

  const isMp4 = isDirectHttpVideoUrl(raw);
  const isYt = !isMp4 && extractYoutubeVideoId(raw) !== null;
  const igSrc = !isMp4 && !isYt ? getInstagramEmbedUrl(raw) : null;

  const [inView, setInView] = useState(!autoplayOnIntersect);

  useEffect(() => {
    if (!autoplayOnIntersect || !isYt) return;
    const el = containerRef.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([e]) => setInView(e.isIntersecting),
      { threshold: 0.35, rootMargin: "0px 0px -8% 0px" },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [autoplayOnIntersect, isYt]);

  useEffect(() => {
    if (!autoplayOnIntersect || !isMp4) return;
    const video = videoRef.current;
    if (!video) return;
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) video.play().catch(() => {});
        else video.pause();
      },
      { threshold: 0.35 },
    );
    io.observe(video);
    return () => io.disconnect();
  }, [autoplayOnIntersect, isMp4]);

  const ytSrc = isYt
    ? buildYoutubeIframeSrc(raw, {
        autoplay: autoplayOnIntersect ? inView : false,
      })
    : null;

  if (isMp4) {
    return (
      <Fill data-arrival-media="root" className={className}>
        <MediaVideo
          ref={videoRef}
          src={raw}
          muted
          loop
          playsInline
          preload="metadata"
          aria-label={alt}
        />
      </Fill>
    );
  }

  if (isYt && ytSrc) {
    return (
      <Fill ref={containerRef} data-arrival-media="root" className={className}>
        <EmbedFrame
          key={autoplayOnIntersect ? `${ytSrc}-in-${inView}` : ytSrc}
          src={ytSrc}
          title={alt}
          loading="lazy"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
        />
      </Fill>
    );
  }

  if (igSrc) {
    return (
      <Fill data-arrival-media="root" className={className}>
        <EmbedFrame
          src={igSrc}
          title={alt}
          loading="lazy"
          allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
        />
      </Fill>
    );
  }

  return (
    <Fill data-arrival-media="root" className={className}>
      <MediaImg src={raw} alt={alt} loading="lazy" />
    </Fill>
  );
}
