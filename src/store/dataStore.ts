import { create } from "zustand";
import { HomeService } from "@/services/home.service";

interface DataState {
  hero: any | null;
  categories: any[];
  latestArrivals: any[];
  stories: any[];
  isLoading: Record<string, boolean>;
  fetchHomeData: () => Promise<void>;
}

export const useDataStore = create<DataState>((set) => ({
  hero: null,
  categories: [],
  latestArrivals: [],
  stories: [],
  isLoading: { hero: true, categories: true, arrivals: true, stories: true },

  fetchHomeData: async () => {
    // Parallel fetching simulation
    HomeService.getHeroContent().then((data) =>
      set((s) => ({ hero: data, isLoading: { ...s.isLoading, hero: false } })),
    );
    HomeService.getCategories().then((data: any) =>
      set((s) => ({
        categories: data,
        isLoading: { ...s.isLoading, categories: false },
      })),
    );
    HomeService.getLatestArrivals().then((data: any) =>
      set((s) => ({
        latestArrivals: data,
        isLoading: { ...s.isLoading, arrivals: false },
      })),
    );
    HomeService.getAtelierStories().then((data: any) =>
      set((s) => ({
        stories: data,
        isLoading: { ...s.isLoading, stories: false },
      })),
    );
  },
}));
