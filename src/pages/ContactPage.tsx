import { useEffect } from "react"
import { PageBanner } from "@/components/shared/PageBanner"
import { ContactFormSection } from "@/components/sections/ContactFormSection"
import { RewardsPromoSection } from "@/components/sections/RewardsPromoSection"
import { TestimonialsSection } from "@/components/sections/TestimonialsSection"
import { useDataStore } from "@/store/dataStore"

export function ContactPage() {
  const { patronReviews, rewardsQrBlocks, fetchHomeData } = useDataStore()
  useEffect(() => {
    fetchHomeData()
  }, [fetchHomeData])

  return (
    <>
      <PageBanner title="Get in Touch" breadcrumb="Home > Get in Touch" />
      <ContactFormSection />
      <RewardsPromoSection blocks={rewardsQrBlocks} />
      <TestimonialsSection data={patronReviews} />
    </>
  )
}

