import { motion } from "framer-motion"
import { Skeleton } from "@/components/ui/Skeleton"

interface Story {
  id: number
  image: string
  alt: string
  delay: number
  mt?: boolean
}

interface AtelierStoriesProps {
  data: Story[]
  isLoading: boolean
}

export function AtelierStories({ data, isLoading }: AtelierStoriesProps) {
  return (
    <section className="py-24 md:py-32 bg-surface">
      <div className="max-w-[1920px] mx-auto px-6 md:px-12">
        <div className="text-center mb-16 md:mb-20">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="font-headline text-4xl md:text-5xl font-extrabold tracking-tighter text-on-surface mb-4"
          >
            #ATELIERSTORIES
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-on-surface/60 font-body max-w-lg mx-auto"
          >
            Portraits of elegance from across the globe.
          </motion.p>
        </div>

        {isLoading ? (
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4 md:gap-6">
            {[1, 2, 3, 4, 5].map((i) => (
              <Skeleton key={i} className="aspect-[3/4] rounded-lg" />
            ))}
          </div>
        ) : data.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-on-surface/40 font-body text-lg">No stories yet. Be the first to share yours!</p>
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4 md:gap-6">
            {data.map((story) => (
              <motion.div
                key={story.id}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{
                  duration: 0.8,
                  delay: story.delay,
                  ease: "easeOut",
                }}
                className={`aspect-[3/4] overflow-hidden group relative rounded-lg ${story.mt ? "md:mt-12" : ""}`}
              >
                <img
                  src={story.image}
                  alt={story.alt}
                  className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-primary/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center backdrop-blur-sm">
                  <span className="text-white font-headline font-bold uppercase tracking-widest text-sm translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                    View Story
                  </span>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </section>
  )
}
