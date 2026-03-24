import { useEffect } from "react";
import { useDataStore } from "@/store/dataStore";
import { BannerSection } from "@/components/sections/BannerSection";
import { CategoryCuration } from "@/components/sections/CategoryCuration";
import { PrivilegeSale } from "@/components/sections/PrivilegeSale";
import { LatestArrivals } from "@/components/sections/LatestArrivals";
import { ValuePropsSection } from "@/components/sections/ValuePropsSection";
import { FaqSection } from "@/components/sections/FaqSection";
import { TestimonialsSection } from "@/components/sections/TestimonialsSection";
import { TESTIMONIALS } from "@/constants";
import { ReelsSection } from "@/components/sections/ReelsSection";
import sabseSastaImage from "@/assets/sabseSasta.webp";

export function HomePage() {
  const { categories, latestArrivals, isLoading, fetchHomeData } = useDataStore();

  useEffect(() => {
    fetchHomeData();
  }, [fetchHomeData]);

  return (
    <>
      <BannerSection />
      <ValuePropsSection />
      <PrivilegeSale />
      <CategoryCuration data={categories} isLoading={isLoading.categories} />
      <ReelsSection />
      <PrivilegeSale
        imageSrc={sabseSastaImage}
        imageAlt="Sabse Sasta feature poster"
        imagePosition="right center"
      />
      <ReelsSection variant="youtube" />
      <LatestArrivals data={latestArrivals} isLoading={isLoading.arrivals} />
      <TestimonialsSection data={TESTIMONIALS} />
      <FaqSection />
    </>
  );
}
