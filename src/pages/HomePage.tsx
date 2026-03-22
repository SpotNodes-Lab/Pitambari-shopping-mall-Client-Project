import { useEffect } from "react";
import { useDataStore } from "@/store/dataStore";
import { HeroSection } from "@/components/sections/HeroSection";
import { BannerSection } from "@/components/sections/BannerSection";
import { CategoryCuration } from "@/components/sections/CategoryCuration";
import { PrivilegeSale } from "@/components/sections/PrivilegeSale";
import { LatestArrivals } from "@/components/sections/LatestArrivals";
import { ValuePropsSection } from "@/components/sections/ValuePropsSection";
import { FaqSection } from "@/components/sections/FaqSection";
import { TestimonialsSection } from "@/components/sections/TestimonialsSection";
import { TESTIMONIALS } from "@/constants";
import { ReelsSection } from "@/components/sections/ReelsSection";

export function HomePage() {
  const { hero, categories, latestArrivals, isLoading, fetchHomeData } =
    useDataStore();

  useEffect(() => {
    fetchHomeData();
  }, [fetchHomeData]);

  return (
    <>
      <BannerSection />
      <HeroSection data={hero} isLoading={isLoading.hero} />
      <ValuePropsSection />
      <CategoryCuration data={categories} isLoading={isLoading.categories} />
      <PrivilegeSale />

      <FaqSection />

      <ReelsSection />
      <ReelsSection variant="youtube" />
      <LatestArrivals data={latestArrivals} isLoading={isLoading.arrivals} />

      <TestimonialsSection data={TESTIMONIALS} />
    </>
  );
}
