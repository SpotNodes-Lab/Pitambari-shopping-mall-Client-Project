import { create } from "zustand";
import { HomeService } from "@/services/home.service";
import type { Testimonial } from "@/components/sections/TestimonialsSection";
import {
  fetchHomepage,
  fetchPublicPatronReviews,
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
  patronReviewsLoading: boolean;
  patronReviewsError: string | null;
  insights: InsightsContent;
  gallery: GalleryContent;
  /** Active QR blocks from `GET /api/v1/qr-codes/public` (empty → homepage uses static fallback). */
  rewardsQrBlocks: RewardsQrBlock[];
  stories: any[];
  isLoading: Record<string, boolean>;
  fetchHomeData: () => Promise<void>;
  refreshPatronReviews: () => Promise<void>;
}

export const useDataStore = create<DataState>((set) => ({
  hero: null,
  categories: [],
  reelsClips: reelsFromHomepage(null),
  youtubeClips: youtubeFromHomepage(null),
  latestArrivals: arrivalsFromHomepage(null),
  patronReviews: reviewsFromHomepage(null),
  patronReviewsLoading: true,
  patronReviewsError: null,
  insights: insightsFromHomepage(null),
  gallery: galleryFromHomepage(null),
  rewardsQrBlocks: [],
  stories: [],
  isLoading: { hero: true, categories: true, arrivals: true, stories: true },

  fetchHomeData: async () => {
    HomeService.getHeroContent().then((data) =>
      set((s) => ({ hero: data, isLoading: { ...s.isLoading, hero: false } })),
    );
    Promise.all([
      fetchHomepage().catch(() => null),
      fetchPublicPatronReviews().catch(() => [] as Testimonial[]),
    ]).then(([hp, prList]) =>
      set((s) => ({
        categories: curatedCategoriesFromHomepage(hp),
        reelsClips: reelsFromHomepage(hp),
        youtubeClips: youtubeFromHomepage(hp),
        latestArrivals: arrivalsFromHomepage(hp),
        patronReviews:
          prList.length > 0 ? prList : reviewsFromHomepage(hp),
        insights: insightsFromHomepage(hp),
        gallery: galleryFromHomepage(hp),
        isLoading: { ...s.isLoading, categories: false, arrivals: false },
        patronReviewsLoading: false,
        patronReviewsError: null,
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

  refreshPatronReviews: async () => {
    set({ patronReviewsLoading: true, patronReviewsError: null });
    try {
      const prList = await fetchPublicPatronReviews();
      set(() => ({
        patronReviews:
          prList.length > 0 ? prList : reviewsFromHomepage(null),
        patronReviewsLoading: false,
      }));
    } catch {
      set({
        patronReviewsLoading: false,
        patronReviewsError: "Could not refresh reviews.",
      });
    }
  },
}));
