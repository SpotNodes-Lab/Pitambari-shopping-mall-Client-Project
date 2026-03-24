import { PageBanner } from "@/components/shared/PageBanner"
import { ContactFormSection } from "@/components/sections/ContactFormSection"
import { RewardsPromoSection } from "@/components/sections/RewardsPromoSection"
import { TestimonialsSection } from "@/components/sections/TestimonialsSection"
import { TESTIMONIALS } from "@/constants"

export function ContactPage() {
  return (
    <>
      <PageBanner title="Get in Touch" breadcrumb="Home > Get in Touch" />
      <ContactFormSection />
      <RewardsPromoSection />
      <TestimonialsSection data={TESTIMONIALS} />
    </>
  )
}

