import { useState } from "react"
import { motion } from "framer-motion"
import { Heart } from "lucide-react"
import { Skeleton } from "@/components/ui/Skeleton"
import styled from "styled-components"

interface ProductCardProps {
  product: {
    id: number
    name: string
    category: string
    price: string
    image: string
  }
}

const Card = styled(motion.div)`
  min-width: 320px;
  background-color: var(--color-surface-container-lowest);
  padding: 1rem;
  border-radius: var(--radius-lg);
  flex-shrink: 0;

  @media (min-width: 768px) {
    min-width: 400px;
  }
`

const ImageWrapper = styled.div`
  position: relative;
  overflow: hidden;
  aspect-ratio: 3 / 4;
  margin-bottom: 1.5rem;
  border-radius: var(--radius-lg);
`

const WishlistButton = styled.button`
  position: absolute;
  top: 1rem;
  right: 1rem;
  width: 2.5rem;
  height: 2.5rem;
  border-radius: 9999px;
  border: none;
  background-color: rgba(255, 255, 255, 0.8);
  backdrop-filter: blur(12px);
  color: var(--color-primary);
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: background-color 200ms ease, color 200ms ease;

  &:hover {
    background-color: var(--color-primary);
    color: var(--color-on-primary);
  }
`

const DetailsRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
`

const Name = styled.h4`
  font-family: var(--font-headline);
  font-weight: 800;
  color: var(--color-on-surface);
  font-size: 1.125rem;
  margin-bottom: 0.25rem;

  @media (min-width: 768px) {
    font-size: 1.25rem;
  }
`

const Category = styled.p`
  font-family: var(--font-body);
  color: color-mix(in srgb, var(--color-on-surface) 50%, transparent);
  font-size: 0.75rem;
  text-transform: uppercase;
  letter-spacing: 0.2em;

  @media (min-width: 768px) {
    font-size: 0.875rem;
  }
`

const Price = styled.span`
  font-family: var(--font-headline);
  font-weight: 800;
  color: var(--color-primary);
`

export function ProductCard({ product }: ProductCardProps) {
  const [isHovered, setIsHovered] = useState(false)
  const [imgLoaded, setImgLoaded] = useState(false)

  return (
    <Card
      initial={{ opacity: 0, scale: 0.95 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <ImageWrapper>
        {!imgLoaded && (
          <Skeleton
            borderRadius="var(--radius-lg)"
            style={{ position: "absolute", inset: 0 }}
          />
        )}
        <motion.img
          src={product.image}
          alt={product.name}
          style={{ width: "100%", height: "100%", objectFit: "cover" }}
          animate={{ scale: isHovered ? 1.05 : 1 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          onLoad={() => setImgLoaded(true)}
        />

        <WishlistButton
          aria-label="Add to wishlist"
        >
          <Heart size={20} />
        </WishlistButton>
      </ImageWrapper>

      <DetailsRow>
        <div>
          <Name>{product.name}</Name>
          <Category>{product.category}</Category>
        </div>
        <Price>{product.price}</Price>
      </DetailsRow>
    </Card>
  )
}
