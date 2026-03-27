import { apiClient } from "@/services/api";
import {
  CURATED_CATEGORIES_FALLBACK,
  GALLERY_HERO_SLIDES,
  GALLERY_IMAGES,
  LATEST_ARRIVALS,
  SOCIAL_REELS_FALLBACK,
  TESTIMONIALS,
} from "@/constants";
import type { Testimonial } from "@/components/sections/TestimonialsSection";
import type { AnalyticsStat } from "@/components/sections/CustomerAnalyticsSection";
import { DEFAULT_ANALYTICS_STATS } from "@/components/sections/CustomerAnalyticsSection";
import { isInstagramShareUrl, isYoutubeShareUrl } from "@/utils/socialEmbed";

/** Matches `GET /api/v1/content/homepage` → `data.mainBanner`. */
export type HomepageMainBanner = {
  carouselImages: string[];
  rightImages: string[];
};

/** One curated category card from CMS (`description` maps to UI subtitle). */
export type CmsCategoryItem = {
  image: string;
  title: string;
  description?: string;
};

/** One reel / YouTube row from CMS (`GET .../content/homepage`). */
export type CmsLinkItem = {
  title: string;
  url: string;
};

/** Homepage “reviews” slice (`GET .../content/homepage` → `data.reviews`). */
export type CmsReviewItem = {
  quote: string;
  name: string;
  role?: string;
  stars: number;
};

/** New arrivals row — same shape as category cards; `image` may be a photo URL or an embeddable media link. */
export type CmsArrivalItem = {
  image: string;
  title: string;
  description?: string;
};

/** Homepage insights / stats block (`GET .../content/homepage` → `data.insights`). */
export type CmsInsightStat = {
  value: string;
  label: string;
};

export type CmsInsights = {
  heading?: string;
  description?: string;
  image?: string;
  stats?: CmsInsightStat[];
};

/** Gallery page: hero rail + grid (`GET .../content/homepage` → `data.gallery`). */
export type CmsGalleryImageItem = {
  image: string;
  title: string;
  description?: string;
};

export type CmsGallery = {
  banners?: string[];
  images?: CmsGalleryImageItem[];
};

export type HomepagePayload = {
  mainBanner: HomepageMainBanner;
  categories?: { items: CmsCategoryItem[] };
  reels?: { items: CmsLinkItem[] };
  youtube?: { items: CmsLinkItem[] };
  reviews?: { items: CmsReviewItem[] };
  arrivals?: { items: CmsArrivalItem[] };
  insights?: CmsInsights;
  gallery?: CmsGallery;
};

export type SocialClip = {
  id: string;
  title: string;
  url: string;
};

/** Product-row shape for `LatestArrivals` (CMS or fallback). */
export type ArrivalProduct = {
  id: string | number;
  name: string;
  category: string;
  /** Image URL or MP4 / YouTube / Instagram permalink for `VerticalMediaEmbed`. */
  image: string;
};

export type CuratedCategoryCard = {
  id: string;
  title: string;
  subtitle: string;
  image: string;
};

/** One gallery slide or grid tile (`image` may be a photo or embeddable media URL). */
export type GalleryMediaItem = {
  id: string | number;
  image: string;
  alt: string;
};

export type GalleryContent = {
  heroSlides: GalleryMediaItem[];
  gridImages: GalleryMediaItem[];
};

type HomepageApiEnvelope = {
  success?: boolean;
  data?: HomepagePayload;
  message?: string;
};

function isHttpUrl(s: string): boolean {
  const t = s.trim();
  return t.length > 0 && /^https?:\/\//i.test(t);
}

/** Normalize banner URLs from API (drop empty / invalid entries). */
export function normalizeMainBanner(raw: HomepageMainBanner | undefined | null): {
  carouselImages: string[];
  rightImages: string[];
} {
  if (!raw) return { carouselImages: [], rightImages: [] };
  const carousel = (raw.carouselImages ?? [])
    .map((u) => String(u ?? "").trim())
    .filter(isHttpUrl);
  const right = (raw.rightImages ?? [])
    .map((u) => String(u ?? "").trim())
    .filter(isHttpUrl);
  return { carouselImages: carousel, rightImages: right };
}

function slugId(s: string, index: number): string {
  const base = s
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "")
    .slice(0, 48);
  return base ? `cms-${base}-${index}` : `cms-card-${index}`;
}

/**
 * Map homepage `categories.items` to the homepage grid shape.
 * Uses `CURATED_CATEGORIES_FALLBACK` when CMS has no usable cards (same pattern as banner fallbacks).
 */
export function curatedCategoriesFromHomepage(
  hp: HomepagePayload | null | undefined,
): CuratedCategoryCard[] {
  const items = hp?.categories?.items ?? [];
  const valid: CuratedCategoryCard[] = [];
  for (let i = 0; i < items.length; i += 1) {
    const it = items[i];
    const image = String(it?.image ?? "").trim();
    const title = String(it?.title ?? "").trim();
    const subtitle = String(it?.description ?? "").trim();
    if (!isHttpUrl(image) || !title) continue;
    valid.push({
      id: slugId(title, i),
      title,
      subtitle,
      image,
    });
  }
  if (valid.length === 0) {
    return CURATED_CATEGORIES_FALLBACK.map((c) => ({ ...c }));
  }
  return valid;
}

function socialClipsFromLinks(
  items: CmsLinkItem[] | undefined,
  platform: "instagram" | "youtube",
  fallback: readonly { id: string; title: string; url: string }[],
): SocialClip[] {
  const check = platform === "instagram" ? isInstagramShareUrl : isYoutubeShareUrl;
  const out: SocialClip[] = [];
  if (!items?.length) return fallback.map((x) => ({ ...x }));
  for (let i = 0; i < items.length; i += 1) {
    const title = String(items[i].title ?? "").trim();
    const url = String(items[i].url ?? "").trim();
    if (!title || !isHttpUrl(url) || !check(url)) continue;
    out.push({ id: slugId(title, i), title, url });
  }
  return out.length ? out : fallback.map((x) => ({ ...x }));
}

/** `data.reels.items` → strip cards; falls back to `SOCIAL_REELS_FALLBACK`. */
export function reelsFromHomepage(
  hp: HomepagePayload | null | undefined,
): SocialClip[] {
  return socialClipsFromLinks(hp?.reels?.items, "instagram", SOCIAL_REELS_FALLBACK);
}

/** `data.youtube.items` → strip cards; same fallback MP4s when empty. */
export function youtubeFromHomepage(
  hp: HomepagePayload | null | undefined,
): SocialClip[] {
  return socialClipsFromLinks(hp?.youtube?.items, "youtube", SOCIAL_REELS_FALLBACK);
}

/** `data.arrivals.items` → carousel rows; falls back to `LATEST_ARRIVALS`. */
export function arrivalsFromHomepage(
  hp: HomepagePayload | null | undefined,
): ArrivalProduct[] {
  const items = hp?.arrivals?.items ?? [];
  const out: ArrivalProduct[] = [];
  for (let i = 0; i < items.length; i += 1) {
    const it = items[i];
    const image = String(it?.image ?? "").trim();
    const title = String(it?.title ?? "").trim();
    const category = String(it?.description ?? "").trim();
    if (!title || !image || !isHttpUrl(image)) continue;
    out.push({
      id: slugId(title, i),
      name: title,
      category: category || "New in store",
      image,
    });
  }
  return out.length > 0 ? out : LATEST_ARRIVALS.map((p) => ({ ...p }));
}

/** `data.reviews.items` → testimonial cards; falls back to `TESTIMONIALS`. */
export function reviewsFromHomepage(
  hp: HomepagePayload | null | undefined,
): Testimonial[] {
  const items = hp?.reviews?.items ?? [];
  const out: Testimonial[] = [];
  for (let i = 0; i < items.length; i += 1) {
    const it = items[i];
    const quote = String(it?.quote ?? "").trim();
    const name = String(it?.name ?? "").trim();
    if (!quote || !name) continue;
    const stars = Number(it?.stars);
    const rating =
      Number.isFinite(stars) && stars >= 0 && stars <= 5
        ? Math.round(stars)
        : 5;
    out.push({
      id: 10_000 + i,
      name,
      title: String(it?.role ?? "").trim(),
      quote,
      rating,
    });
  }
  return out.length > 0 ? out : TESTIMONIALS.map((t) => ({ ...t }));
}

const INSIGHTS_HEADLINE_DEFAULT =
  "Best fashion collection for all generations";
const INSIGHTS_DESCRIPTION_DEFAULT =
  "Discover curated fashion and retail for every generation—from children to elders—all under one roof at Pitambari.";

function cmsInsightStatToAnalytics(
  valueRaw: string,
  labelRaw: string,
): AnalyticsStat | null {
  const label = labelRaw.trim();
  const value = valueRaw.trim();
  if (!label || !value) return null;
  const leadingNum = value.match(/^(\d+)(.*)$/);
  if (leadingNum) {
    return {
      end: parseInt(leadingNum[1], 10),
      suffix: leadingNum[2],
      label,
    };
  }
  return { end: 0, suffix: value, label };
}

/** Props bundle for `CustomerAnalyticsSection` (CMS + defaults). */
export type InsightsContent = {
  headline: string;
  description: string;
  /** HTTPS image or embeddable media URL; empty string → page uses local fallback asset. */
  image: string;
  imageAlt: string;
  imageObjectFit: "cover" | "contain";
  stats: AnalyticsStat[];
};

/** `data.insights` → About / analytics section; fills headline, copy, stat cards, and optional hero image URL. */
export function insightsFromHomepage(
  hp: HomepagePayload | null | undefined,
): InsightsContent {
  const ins = hp?.insights;
  const headline =
    String(ins?.heading ?? "").trim() || INSIGHTS_HEADLINE_DEFAULT;
  const description =
    String(ins?.description ?? "").trim() || INSIGHTS_DESCRIPTION_DEFAULT;
  const imageRaw = String(ins?.image ?? "").trim();
  const image = isHttpUrl(imageRaw) ? imageRaw : "";

  const rawStats = ins?.stats ?? [];
  const stats: AnalyticsStat[] = [];
  for (let i = 0; i < rawStats.length; i += 1) {
    const row = rawStats[i];
    const st = cmsInsightStatToAnalytics(
      String(row?.value ?? ""),
      String(row?.label ?? ""),
    );
    if (st) stats.push(st);
  }

  return {
    headline,
    description,
    image,
    imageAlt: "Sabse sasta ka wada — Pitambari",
    imageObjectFit: "contain",
    stats:
      stats.length > 0 ? stats : DEFAULT_ANALYTICS_STATS.map((s) => ({ ...s })),
  };
}

/** `data.gallery` → hero carousel + masonry-style grid; falls back to static `GALLERY_*` constants. */
export function galleryFromHomepage(
  hp: HomepagePayload | null | undefined,
): GalleryContent {
  const g = hp?.gallery;
  const banners = (g?.banners ?? [])
    .map((u) => String(u ?? "").trim())
    .filter(isHttpUrl);
  const heroSlides: GalleryMediaItem[] = banners.map((image, i) => ({
    id: `cms-gallery-banner-${i}`,
    image,
    alt: `Gallery highlight ${i + 1}`,
  }));

  const imgRows = g?.images ?? [];
  const gridImages: GalleryMediaItem[] = [];
  for (let i = 0; i < imgRows.length; i += 1) {
    const row = imgRows[i];
    const image = String(row?.image ?? "").trim();
    const title = String(row?.title ?? "").trim();
    if (!isHttpUrl(image) || !title) continue;
    gridImages.push({
      id: slugId(title, i),
      image,
      alt: title,
    });
  }

  return {
    heroSlides:
      heroSlides.length > 0
        ? heroSlides
        : GALLERY_HERO_SLIDES.map((s) => ({ ...s })),
    gridImages:
      gridImages.length > 0
        ? gridImages
        : GALLERY_IMAGES.map((s) => ({ ...s })),
  };
}

/**
 * Public homepage document (see USER_WEB_API.md).
 * On network/parse errors returns `null` so the UI can keep static fallbacks.
 */
export async function fetchHomepage(): Promise<HomepagePayload | null> {
  try {
    const res = (await apiClient.get(
      "v1/content/homepage",
    )) as unknown as HomepageApiEnvelope;
    if (!res?.data) return null;
    return res.data;
  } catch (e) {
    console.warn("[cms] homepage fetch failed, using fallbacks where defined", e);
    return null;
  }
}
