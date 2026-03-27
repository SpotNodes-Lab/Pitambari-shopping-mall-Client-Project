/** Matches Pitambari-backend Instagram reel/post URL rules (client-side). */
export function isInstagramShareUrl(url: string): boolean {
  return /instagram\.com\/(reel|reels|p)\//i.test(url.trim());
}

/** Matches Pitambari-backend YouTube share URL rules (client-side). */
export function isYoutubeShareUrl(url: string): boolean {
  return /^(https?:\/\/)?(((www|m)\.)?youtube\.com\/(watch|shorts|embed|live)|youtu\.be)\//i.test(
    url.trim(),
  );
}

export function isDirectHttpVideoUrl(url: string): boolean {
  return /\.(mp4|webm|ogg)(\?|#|$)/i.test(url.trim());
}

/** YouTube watch / Shorts / share URL → video id, or null. */
export function extractYoutubeVideoId(url: string): string | null {
  const raw = url.trim();
  try {
    const u = new URL(raw);
    const host = u.hostname.replace(/^www\./i, "").toLowerCase();

    if (host === "youtu.be") {
      const id = u.pathname.replace(/^\//, "").split("/")[0];
      return id || null;
    }

    if (host === "m.youtube.com" || host === "youtube.com") {
      const path = u.pathname;
      if (path.startsWith("/shorts/")) {
        return path.split("/")[2]?.split("?")[0] || null;
      }
      if (path.startsWith("/embed/")) {
        return path.split("/")[2]?.split("?")[0] || null;
      }
      if (path.startsWith("/live/")) {
        return path.split("/")[2]?.split("?")[0] || null;
      }
      if (path === "/watch" || path.startsWith("/watch/")) {
        return u.searchParams.get("v");
      }
    }
  } catch {
    return null;
  }
  return null;
}

/**
 * Base embed URL (no query). Prefer `buildYoutubeIframeSrc` for player params.
 */
export function getYoutubeEmbedUrl(url: string): string | null {
  const id = extractYoutubeVideoId(url);
  return id ? `https://www.youtube.com/embed/${encodeURIComponent(id)}` : null;
}

/**
 * Full iframe `src` for YouTube embed.
 * Use `autoplay: true` + `mute: true` for Shorts-style muted autoplay (browser policy).
 */
export function buildYoutubeIframeSrc(
  pageUrl: string,
  opts: { autoplay: boolean; mute?: boolean },
): string | null {
  const id = extractYoutubeVideoId(pageUrl);
  if (!id) return null;
  const params = new URLSearchParams({
    rel: "0",
    playsinline: "1",
    modestbranding: "1",
  });
  if (opts.autoplay) {
    params.set("autoplay", "1");
    params.set("mute", opts.mute === false ? "0" : "1");
    params.set("loop", "1");
    params.set("playlist", id);
  }
  return `https://www.youtube.com/embed/${encodeURIComponent(id)}?${params.toString()}`;
}

/**
 * Instagram reel/post URL → embed iframe URL (shows official poster / player inside iframe).
 * Falls back for `reel`, `reels`, and `p` permalinks.
 */
export function getInstagramEmbedUrl(url: string): string | null {
  const raw = url.trim();
  const m = raw.match(/instagram\.com\/(?:reel|reels|p)\/([^/?#]+)/i);
  if (!m?.[1]) return null;
  const shortcode = m[1];
  return `https://www.instagram.com/p/${encodeURIComponent(shortcode)}/embed/?captioned=false`;
}

/** Use iframe/video instead of `<img src>` for HTTPS media URLs (reels, Shorts, MP4). */
export function isEmbeddableMediaUrl(url: string): boolean {
  const u = url.trim();
  if (!/^https?:\/\//i.test(u)) return false;
  return (
    isDirectHttpVideoUrl(u) ||
    extractYoutubeVideoId(u) !== null ||
    getInstagramEmbedUrl(u) !== null
  );
}
