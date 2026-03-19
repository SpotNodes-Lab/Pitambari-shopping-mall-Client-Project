import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/utils/cn"

const buttonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap font-headline font-bold uppercase tracking-wider transition-all duration-300 disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        primary:
          "bg-primary text-on-primary rounded-xl shadow-md hover:bg-primary-container hover:shadow-lg",
        ghost:
          "bg-transparent text-primary hover:text-primary-container hover:underline underline-offset-4 rounded-xl",
        outline:
          "border border-outline-variant bg-transparent hover:bg-surface-container-high hover:border-outline text-on-surface rounded-xl",
        glass:
          "bg-white/10 backdrop-blur-md border border-white/20 text-on-primary rounded-xl hover:bg-white/20",
        icon:
          "w-10 h-10 bg-white/80 backdrop-blur-md rounded-full text-primary hover:bg-primary hover:text-white flex items-center justify-center",
        nav: 
          "w-12 h-12 rounded-full border border-outline-variant flex items-center justify-center hover:bg-primary hover:text-on-primary hover:border-primary text-on-surface",
      },
      size: {
        default: "h-12 px-6 py-3",
        sm: "h-9 rounded-md px-3",
        lg: "h-16 px-10 py-5 text-lg",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "default",
    },
  }
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    return (
      <button
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    )
  }
)
Button.displayName = "Button"

export { Button, buttonVariants }
