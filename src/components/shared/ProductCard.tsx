import { useState } from "react"
import { motion } from "framer-motion"
import { Heart } from "lucide-react"
import { Skeleton } from "@/components/ui/Skeleton"

interface ProductCardProps {
  product: {
    id: number
    name: string
    category: string
    price: string
    image: string
  }
}

export function ProductCard({ product }: ProductCardProps) {
  const [isHovered, setIsHovered] = useState(false)
  const [imgLoaded, setImgLoaded] = useState(false)

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="min-w-[320px] md:min-w-[400px] bg-surface-container-lowest p-4 group rounded-lg shrink-0"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="relative overflow-hidden aspect-[3/4] mb-6 rounded-lg">
        {!imgLoaded && <Skeleton className="absolute inset-0 rounded-lg" />}
        <motion.img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover"
          animate={{ scale: isHovered ? 1.05 : 1 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          onLoad={() => setImgLoaded(true)}
        />

        <button
          className="absolute top-4 right-4 w-10 h-10 bg-white/80 backdrop-blur-md rounded-full flex items-center justify-center text-primary hover:bg-primary hover:text-white transition-colors"
          aria-label="Add to wishlist"
        >
          <Heart size={20} />
        </button>
      </div>

      <div className="flex justify-between items-start">
        <div>
          <h4 className="font-headline font-bold text-on-surface text-lg md:text-xl mb-1">{product.name}</h4>
          <p className="text-on-surface/50 text-xs md:text-sm uppercase tracking-widest">{product.category}</p>
        </div>
        <span className="font-headline font-bold text-primary">{product.price}</span>
      </div>
    </motion.div>
  )
}
