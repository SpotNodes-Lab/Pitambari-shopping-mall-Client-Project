import { motion } from "framer-motion"
import { Button } from "@/components/ui/Button"
import { Skeleton } from "@/components/ui/Skeleton"

interface HeroData {
  title: string
  subtitle: string
  description: string
  image: string
}

interface HeroSectionProps {
  data: HeroData | null
  isLoading: boolean
}

export function HeroSection({ data, isLoading }: HeroSectionProps) {
  if (isLoading || !data) {
    return (
      <section className="relative h-screen w-full flex items-center bg-surface-dim">
        <Skeleton className="absolute inset-0" />
        <div className="relative z-10 px-6 md:px-12 lg:px-24 max-w-7xl space-y-4">
          <Skeleton className="h-6 w-48" />
          <Skeleton className="h-24 w-96" />
          <Skeleton className="h-16 w-80" />
          <div className="flex gap-6">
            <Skeleton className="h-16 w-48 rounded-xl" />
            <Skeleton className="h-16 w-36 rounded-xl" />
          </div>
        </div>
      </section>
    )
  }

  return (
    <section className="relative h-screen w-full overflow-hidden flex items-center bg-surface-dim">
      {/* Background Image with Zoom */}
      <motion.div
        className="absolute inset-0 z-0"
        initial={{ scale: 1.1 }}
        animate={{ scale: 1 }}
        transition={{ duration: 1.5, ease: "easeOut" }}
      >
        <img
          src={data.image}
          alt="Elegant bridal lehenga detail"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-on-surface/50 via-on-surface/30 to-transparent" />
      </motion.div>

      {/* Content */}
      <div className="relative z-10 px-6 md:px-12 lg:px-24 max-w-7xl">
        <motion.span
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="font-headline text-on-primary-container text-xs md:text-sm tracking-[0.2em] uppercase mb-4 block"
        >
          {data.subtitle}
        </motion.span>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="font-headline text-6xl md:text-8xl lg:text-9xl font-bold text-on-primary mb-6 tracking-tighter leading-none"
        >
          {data.title.split(" ").slice(0, 2).join(" ")} <br />
          {data.title.split(" ").slice(2).join(" ")}
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="text-on-primary/90 text-base md:text-lg lg:text-xl max-w-xl mb-10 font-body leading-relaxed"
        >
          {data.description}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="flex flex-col sm:flex-row gap-4 md:gap-6"
        >
          <Button size="lg" className="w-full sm:w-auto">
            Explore Collection
          </Button>
          <Button variant="glass" size="lg" className="w-full sm:w-auto">
            View Film
          </Button>
        </motion.div>
      </div>
    </section>
  )
}
