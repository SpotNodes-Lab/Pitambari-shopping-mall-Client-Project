import { PageBanner } from "@/components/shared/PageBanner";
import { GalleryHeroSlideshow } from "@/components/sections/GalleryHeroSlideshow";
import { GalleryGridSection } from "@/components/sections/GalleryGridSection";
import { useEffect, useMemo, useState } from "react";
import { ImageModal } from "@/components/shared/ImageModal";
import { useDataStore } from "@/store/dataStore";

export function GalleryPage() {
  const { gallery, fetchHomeData } = useDataStore();
  const { heroSlides, gridImages } = gallery;

  useEffect(() => {
    fetchHomeData();
  }, [fetchHomeData]);

  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  const modalImage = useMemo(() => {
    if (selectedIndex === null) return null;
    return gridImages[selectedIndex] ?? null;
  }, [selectedIndex, gridImages]);

  const open = selectedIndex !== null && modalImage !== null;

  const onPrev = () => {
    if (selectedIndex === null) return;
    setSelectedIndex((prev) => {
      if (prev === null) return 0;
      return (prev - 1 + gridImages.length) % gridImages.length;
    });
  };

  const onNext = () => {
    if (selectedIndex === null) return;
    setSelectedIndex((prev) => {
      if (prev === null) return 0;
      return (prev + 1) % gridImages.length;
    });
  };

  return (
    <>
      <PageBanner title="Gallery" breadcrumb="Home > Gallery" />
      <GalleryHeroSlideshow slides={heroSlides} />
      <GalleryGridSection images={gridImages} onSelect={setSelectedIndex} />

      {modalImage && (
        <ImageModal
          open={open}
          image={modalImage.image}
          alt={modalImage.alt}
          onClose={() => setSelectedIndex(null)}
          onPrev={onPrev}
          onNext={onNext}
        />
      )}
    </>
  );
}
