import { useEffect } from "react";
import { AboutStorySection } from "@/components/sections/AboutStorySection";
import { CustomerAnalyticsSection } from "@/components/sections/CustomerAnalyticsSection";
import { PageBanner } from "@/components/shared/PageBanner";
import { TestimonialsSection } from "@/components/sections/TestimonialsSection";
import { useDataStore } from "@/store/dataStore";
import pitambriLogo from "@/assets/pitambri-logo.png";
import sabseSastaCropped from "@/assets/sabseSastaCropped.png";

export function AboutPage() {
  const { patronReviews, insights, fetchHomeData } = useDataStore();
  useEffect(() => {
    fetchHomeData();
  }, [fetchHomeData]);

  return (
    <>
      <PageBanner title="About us" breadcrumb="Home > About us" />
      <AboutStorySection
        image={pitambriLogo}
        paragraphs={[
          "Pitambari is more than just a place to shop; it is a well-established brand with a long history that dates back over years. Originally founded with the goal of offering exceptional shopping encounters, we have grown to become a reputable presence in the retail sector, recognized for our dedication to high standards, diverse selection, and customer contentment.",
          "An inheritance of greatness.",
          "Pitambari has been leading the way in the retail industry for more than years, establishing standards for others to emulate. Our adventure started with a tiny shop that emphasized offering top-notch items to our neighborhood. Today, we proudly stand as a diverse retail store serving a varied customer base that appreciates both tradition and modernity.",
          "Our dedication to trust, excellence, and customer satisfaction is the foundation of our success. These principles have led us through many years of transformation and expansion, helping us create a dedicated customer following across multiple generations. The tradition of trust and quality is being passed down as families who shopped with us in the past now bring their children and grandchildren to our store.",
          "Specially selected sets for all requirements. We take pride in our carefully selected range of products at Pitambari. Our variety consists of top brands, designs, hues, fabrics, and prints in various categories. We offer a variety of styles to cater to all preferences and events, whether you prefer trendy looks or traditional pieces.",
        ]}
      />
      <CustomerAnalyticsSection
        image={insights.image || sabseSastaCropped}
        imageAlt={insights.imageAlt}
        imageObjectFit={insights.imageObjectFit}
        headline={insights.headline}
        description={insights.description}
        stats={insights.stats}
      />
      <TestimonialsSection data={patronReviews} />
    </>
  );
}
