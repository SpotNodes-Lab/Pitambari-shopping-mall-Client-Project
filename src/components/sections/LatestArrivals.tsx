import { useRef } from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { ProductCard } from "@/components/shared/ProductCard"
import { Skeleton } from "@/components/ui/Skeleton"

interface Product {
  id: number
  name: string
  category: string
  price: string
  image: string
}

interface LatestArrivalsProps {
  data: Product[]
  isLoading: boolean
}

export function LatestArrivals({ data, isLoading }: LatestArrivalsProps) {
  const scrollContainerRef = useRef<HTMLDivElement>(null)

  const scrollLeft = () => {
    scrollContainerRef.current?.scrollBy({ left: -400, behavior: "smooth" })
  }

  const scrollRight = () => {
    scrollContainerRef.current?.scrollBy({ left: 400, behavior: "smooth" })
  }

  return (
    <section className="py-24 md:py-32 bg-surface-container-low overflow-hidden">
      <div className="px-6 md:px-12 max-w-[1920px] mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12 md:mb-16 gap-6">
          <h2 className="font-headline text-4xl md:text-5xl font-bold text-on-surface tracking-tighter">
            The Latest Arrivals
          </h2>

          <div className="flex gap-4">
            <button
              onClick={scrollLeft}
              className="w-12 h-12 rounded-full border border-outline-variant flex items-center justify-center text-on-surface hover:bg-primary hover:text-on-primary hover:border-primary transition-all duration-300 shadow-sm"
              aria-label="Scroll left"
            >
              <ChevronLeft size={24} strokeWidth={1.5} />
            </button>
            <button
              onClick={scrollRight}
              className="w-12 h-12 rounded-full border border-outline-variant flex items-center justify-center text-on-surface hover:bg-primary hover:text-on-primary hover:border-primary transition-all duration-300 shadow-sm"
              aria-label="Scroll right"
            >
              <ChevronRight size={24} strokeWidth={1.5} />
            </button>
          </div>
        </div>

        {isLoading ? (
          <div className="flex gap-8 overflow-hidden pb-10">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="min-w-[400px] p-4">
                <Skeleton className="aspect-[3/4] mb-6 rounded-lg" />
                <Skeleton className="h-6 w-48 mb-2" />
                <Skeleton className="h-4 w-32" />
              </div>
            ))}
          </div>
        ) : (
          <div
            ref={scrollContainerRef}
            className="flex gap-6 md:gap-8 overflow-x-auto no-scrollbar pb-10 snap-x snap-mandatory px-4 -mx-4 md:px-0 md:mx-0"
          >
            {data.map((product) => (
              <div key={product.id} className="snap-start shrink-0">
                <ProductCard product={product} />
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  )
}
