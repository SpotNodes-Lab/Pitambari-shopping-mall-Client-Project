import { useEffect } from "react"
import { useDataStore } from "@/store/dataStore"
import { HeroSection } from "@/components/sections/HeroSection"
import { CategoryCuration } from "@/components/sections/CategoryCuration"
import { PrivilegeSale } from "@/components/sections/PrivilegeSale"
import { LatestArrivals } from "@/components/sections/LatestArrivals"
import { AtelierStories } from "@/components/sections/AtelierStories"

export function HomePage() {
  const { hero, categories, latestArrivals, stories, isLoading, fetchHomeData } =
    useDataStore()

  useEffect(() => {
    fetchHomeData()
  }, [fetchHomeData])

  return (
    <>
      <HeroSection data={hero} isLoading={isLoading.hero} />
      <CategoryCuration data={categories} isLoading={isLoading.categories} />
      <PrivilegeSale />
      <LatestArrivals data={latestArrivals} isLoading={isLoading.arrivals} />
      <AtelierStories data={stories} isLoading={isLoading.stories} />
    </>
  )
}
