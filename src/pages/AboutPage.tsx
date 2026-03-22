import { AboutStorySection } from "@/components/sections/AboutStorySection";
import { PageBanner } from "@/components/shared/PageBanner";
import { TestimonialsSection } from "@/components/sections/TestimonialsSection";
import { TESTIMONIALS, ATELIER_STORIES } from "@/constants";

export function AboutPage() {
  return (
    <>
      <PageBanner title="About us" breadcrumb="Home > About us" />
      <AboutStorySection
        image={ATELIER_STORIES[3]?.image ?? ATELIER_STORIES[0].image}
        paragraphs={[
          "Pitambari Shopping Mall is more than just a place to shop; it is a well-established brand with a long history that dates back over eighty years.",
          "Originally founded with the goal of offering exceptional shopping encounters, we have grown into a reputable presence in the retail sector, creating a space where heritage, craft, and customer contentment meet.",
          "Our commitment to trust, excellence, and customer satisfaction has helped us craft a dedicated customer experience across multiple generations.",
        ]}
      />
      <TestimonialsSection data={TESTIMONIALS} />
    </>
  );
}
