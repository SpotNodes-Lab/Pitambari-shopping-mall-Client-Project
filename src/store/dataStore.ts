import { create } from "zustand";
import { HomeService } from "@/services/home.service";
import type { Testimonial } from "@/components/sections/TestimonialsSection";
import {
  fetchHomepage,
  fetchPublicQRCodes,
  arrivalsFromHomepage,
  curatedCategoriesFromHomepage,
  galleryFromHomepage,
  insightsFromHomepage,
  reelsFromHomepage,
  reviewsFromHomepage,
  youtubeFromHomepage,
  type ArrivalProduct,
  type GalleryContent,
  type InsightsContent,
  type RewardsQrBlock,
  type SocialClip,
} from "@/services/cmsApi";

interface DataState {
  hero: any | null;
  categories: any[];
  reelsClips: SocialClip[];
  youtubeClips: SocialClip[];
  latestArrivals: ArrivalProduct[];
  patronReviews: Testimonial[];
  insights: InsightsContent;
  gallery: GalleryContent;
  /** Active QR blocks from `GET /api/v1/qr-codes/public` (empty → homepage uses static fallback). */
  rewardsQrBlocks: RewardsQrBlock[];
  stories: any[];
  isLoading: Record<string, boolean>;
  fetchHomeData: () => Promise<void>;
}

export const useDataStore = create<DataState>((set) => ({
  hero: null,
  categories: [],
  reelsClips: reelsFromHomepage(null),
  youtubeClips: youtubeFromHomepage(null),
  latestArrivals: arrivalsFromHomepage(null),
  patronReviews: reviewsFromHomepage(null),
  insights: insightsFromHomepage(null),
  gallery: galleryFromHomepage(null),
  rewardsQrBlocks: [],
  stories: [],
  isLoading: { hero: true, categories: true, arrivals: true, stories: true },

  fetchHomeData: async () => {
    // Parallel fetching simulation
    HomeService.getHeroContent().then((data) =>
      set((s) => ({ hero: data, isLoading: { ...s.isLoading, hero: false } })),
    );
    fetchHomepage().then((hp) =>
      set((s) => ({
        categories: curatedCategoriesFromHomepage(hp),
        reelsClips: reelsFromHomepage(hp),
        youtubeClips: youtubeFromHomepage(hp),
        latestArrivals: arrivalsFromHomepage(hp),
        patronReviews: reviewsFromHomepage(hp),
        insights: insightsFromHomepage(hp),
        gallery: galleryFromHomepage(hp),
        isLoading: { ...s.isLoading, categories: false, arrivals: false },
      })),
    );
    fetchPublicQRCodes().then((blocks) =>
      set((s) => ({ ...s, rewardsQrBlocks: blocks })),
    );
    HomeService.getAtelierStories().then((data: any) =>
      set((s) => ({
        stories: data,
        isLoading: { ...s.isLoading, stories: false },
      })),
    );
  },
}));
