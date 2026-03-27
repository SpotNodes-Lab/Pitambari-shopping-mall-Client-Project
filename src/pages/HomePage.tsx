import { useEffect } from "react";
import { useDataStore } from "@/store/dataStore";
import { BannerSection } from "@/components/sections/BannerSection";
import { CategoryCuration } from "@/components/sections/CategoryCuration";
import { PrivilegeSale } from "@/components/sections/PrivilegeSale";
import { LatestArrivals } from "@/components/sections/LatestArrivals";
import { ValuePropsSection } from "@/components/sections/ValuePropsSection";
import { FaqSection } from "@/components/sections/FaqSection";
import { TestimonialsSection } from "@/components/sections/TestimonialsSection";
import { ReelsSection } from "@/components/sections/ReelsSection";
import sabseSastaImage from "@/assets/sabseSasta.webp";

export function HomePage() {
  const {
    categories,
    reelsClips,
    youtubeClips,
    latestArrivals,
    patronReviews,
    isLoading,
    fetchHomeData,
  } = useDataStore();

  useEffect(() => {
    fetchHomeData();
  }, [fetchHomeData]);

  return (
    <>
      <BannerSection />
      <ValuePropsSection />
      <PrivilegeSale />
      <CategoryCuration data={categories} isLoading={isLoading.categories} />
      <ReelsSection clips={reelsClips} />
      <PrivilegeSale
        imageSrc={sabseSastaImage}
        imageAlt="Sabse Sasta feature poster"
        imagePosition="right center"
      />
      <ReelsSection variant="youtube" clips={youtubeClips} />
      <LatestArrivals data={latestArrivals} isLoading={isLoading.arrivals} />
      <TestimonialsSection data={patronReviews} />
      <FaqSection />
    </>
  );
}
