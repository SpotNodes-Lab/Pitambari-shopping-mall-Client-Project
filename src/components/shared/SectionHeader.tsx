import { motion } from "framer-motion"

interface SectionHeaderProps {
  title: string
  subtitle?: string
  align?: "left" | "center" | "right"
  className?: string
}

export function SectionHeader({ title, subtitle, align = "left", className = "" }: SectionHeaderProps) {
  const alignmentClass =
    align === "center"
      ? "items-center text-center mx-auto"
      : align === "right"
        ? "items-end text-right ml-auto"
        : "items-start text-left"

  return (
    <div className={`flex flex-col mb-16 ${alignmentClass} ${className}`}>
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className="font-headline text-4xl md:text-5xl font-extrabold tracking-tighter text-on-surface"
      >
        {title}
      </motion.h2>

      {align === "left" && (
        <motion.div
          initial={{ opacity: 0, scaleX: 0 }}
          whileInView={{ opacity: 1, scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
          className="h-1 w-24 bg-primary mt-4 origin-left"
        />
      )}

      {subtitle && (
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="max-w-md text-on-surface/60 font-body mt-4"
        >
          {subtitle}
        </motion.p>
      )}
    </div>
  )
}
