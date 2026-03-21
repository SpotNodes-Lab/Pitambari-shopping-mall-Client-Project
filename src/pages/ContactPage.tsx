import { PageBanner } from "@/components/shared/PageBanner"
import { ContactFormSection } from "@/components/sections/ContactFormSection"
import { TestimonialsSection } from "@/components/sections/TestimonialsSection"
import { TESTIMONIALS } from "@/constants"

export function ContactPage() {
  return (
    <>
      <PageBanner title="Contact" breadcrumb="Home > Contact" />
      <ContactFormSection />
      <TestimonialsSection data={TESTIMONIALS} />
    </>
  )
}

