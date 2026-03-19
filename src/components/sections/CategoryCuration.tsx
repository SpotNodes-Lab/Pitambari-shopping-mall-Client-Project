import { motion } from "framer-motion"
import { Link } from "react-router-dom"
import { SectionHeader } from "@/components/shared/SectionHeader"
import { Skeleton } from "@/components/ui/Skeleton"

interface Category {
  id: string
  title: string
  subtitle: string
  image: string
  span?: string
}

interface CategoryCurationProps {
  data: Category[]
  isLoading: boolean
}

export function CategoryCuration({ data, isLoading }: CategoryCurationProps) {
  if (isLoading || data.length === 0) {
    return (
      <section className="py-24 md:py-32 bg-surface">
        <div className="max-w-[1920px] mx-auto px-6 md:px-12">
          <Skeleton className="h-12 w-80 mb-4" />
          <Skeleton className="h-1 w-24 mb-16" />
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 h-[800px]">
            <Skeleton className="md:col-span-7 rounded-xl" />
            <div className="md:col-span-5 grid grid-rows-2 gap-8">
              <Skeleton className="rounded-xl" />
              <Skeleton className="rounded-xl" />
            </div>
          </div>
        </div>
      </section>
    )
  }

  const mainCategory = data[0]
  const sideCategories = data.slice(1)

  return (
    <section className="py-24 md:py-32 bg-surface">
      <div className="max-w-[1920px] mx-auto px-6 md:px-12">
        <SectionHeader
          title="Curation by Category"
          subtitle="Selected masterpieces from our regional ateliers, celebrating the diversity of Indian craftsmanship."
        />

        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-8 h-auto md:h-[800px]">
          {/* Large Feature */}
          {mainCategory && (
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="md:col-span-7 relative group overflow-hidden bg-surface-container-high rounded-xl h-[400px] md:h-full"
            >
              <img
                src={mainCategory.image}
                alt={mainCategory.title}
                className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent transition-opacity duration-500" />
              <div className="absolute bottom-8 left-8 md:bottom-12 md:left-12">
                <h3 className="font-headline text-3xl md:text-5xl font-bold text-white mb-3">
                  {mainCategory.title}
                </h3>
                <Link
                  to={`/category/${mainCategory.id}`}
                  className="inline-block text-white font-label uppercase tracking-widest text-xs md:text-sm border-b border-white/50 pb-1 hover:border-white transition-all"
                >
                  {mainCategory.subtitle}
                </Link>
              </div>
            </motion.div>
          )}

          {/* Right Column */}
          <div className="md:col-span-5 grid grid-rows-2 gap-6 md:gap-8 h-[800px] md:h-full">
            {sideCategories.map((cat, idx) => (
              <motion.div
                key={cat.id}
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{
                  duration: 0.8,
                  delay: 0.2 * (idx + 1),
                  ease: "easeOut",
                }}
                className="relative group overflow-hidden bg-surface-container-high rounded-xl h-full"
              >
                <img
                  src={cat.image}
                  alt={cat.title}
                  className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110 object-top"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                <div className="absolute bottom-8 left-8">
                  <h3 className="font-headline text-2xl md:text-4xl font-bold text-white mb-2">
                    {cat.title}
                  </h3>
                  <Link
                    to={`/category/${cat.id}`}
                    className="inline-block text-white font-label uppercase tracking-widest text-xs border-b border-white/50 pb-1 hover:border-white transition-all"
                  >
                    {cat.subtitle}
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
