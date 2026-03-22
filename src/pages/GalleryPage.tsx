import { GALLERY_IMAGES } from "@/constants";
import { PageBanner } from "@/components/shared/PageBanner";
import { GalleryGridSection } from "@/components/sections/GalleryGridSection";
import { useMemo, useState } from "react";
import { ImageModal } from "@/components/shared/ImageModal";

export function GalleryPage() {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  const modalImage = useMemo(() => {
    if (selectedIndex === null) return null;
    return GALLERY_IMAGES[selectedIndex] ?? null;
  }, [selectedIndex]);

  const open = selectedIndex !== null && modalImage !== null;

  const onPrev = () => {
    if (selectedIndex === null) return;
    setSelectedIndex((prev) => {
      if (prev === null) return 0;
      return (prev - 1 + GALLERY_IMAGES.length) % GALLERY_IMAGES.length;
    });
  };

  const onNext = () => {
    if (selectedIndex === null) return;
    setSelectedIndex((prev) => {
      if (prev === null) return 0;
      return (prev + 1) % GALLERY_IMAGES.length;
    });
  };

  return (
    <>
      <PageBanner title="Gallery" breadcrumb="Home > Gallery" />
      <GalleryGridSection images={GALLERY_IMAGES} onSelect={setSelectedIndex} />

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
