import { useState } from "react"
import { motion } from "framer-motion"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { Button } from "@/components/ui/Button"
import { Input } from "@/components/ui/Input"

const formSchema = z.object({
  email: z.string().email("Please enter a valid email address."),
})

type FormValues = z.infer<typeof formSchema>

export function PrivilegeSale() {
  const [isSubmitted, setIsSubmitted] = useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>({
    resolver: zodResolver(formSchema),
  })

  function onSubmit(_values: FormValues) {
    return new Promise<void>((resolve) => {
      setTimeout(() => {
        setIsSubmitted(true)
        resolve()
      }, 1000)
    })
  }

  return (
    <section className="py-20 px-6 md:px-12 bg-surface">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="max-w-7xl mx-auto bg-surface-container-lowest overflow-hidden shadow-[0_20px_40px_rgba(22,29,30,0.06)] flex flex-col md:flex-row items-center rounded-2xl border border-outline-variant/10"
      >
        <div className="w-full md:w-1/2 p-8 md:p-16">
          <span className="text-primary font-headline font-bold tracking-[0.3em] uppercase text-xs mb-4 block">
            Exclusive Invitation
          </span>
          <h2 className="font-headline text-4xl md:text-5xl font-black text-on-surface mb-6 leading-tight">
            Festive Privilege <br />
            Sale
          </h2>
          <p className="text-on-surface/70 mb-8 font-body text-base md:text-lg leading-relaxed">
            Early access to our winter wedding collection. Experience luxury that
            speaks of heritage and modern elegance.
          </p>

          <div className="bg-surface-container-high inline-flex items-center px-6 py-3 rounded-xl mb-10 border border-outline-variant/20">
            <span className="text-xs font-label uppercase tracking-widest text-on-surface/60 mr-4">
              Use Code:
            </span>
            <span className="font-headline font-bold text-primary tracking-widest text-lg">
              ATELIER24
            </span>
          </div>

          {isSubmitted ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-surface-container-high p-6 rounded-xl border border-outline-variant/20 text-center"
            >
              <h4 className="font-headline font-bold text-primary mb-2">
                Invitation Claimed!
              </h4>
              <p className="text-on-surface/70 text-sm font-body">
                Please check your email for the exclusive access link.
              </p>
            </motion.div>
          ) : (
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              <div>
                <Input
                  placeholder="Enter your email to claim"
                  type="email"
                  {...register("email")}
                  className={
                    errors.email
                      ? "border-error focus-visible:border-error"
                      : ""
                  }
                />
                {errors.email && (
                  <p className="text-error text-xs mt-1 font-body">
                    {errors.email.message}
                  </p>
                )}
              </div>
              <Button type="submit" disabled={isSubmitting} className="w-full md:w-auto">
                {isSubmitting ? "Processing..." : "Claim Privilege"}
              </Button>
            </form>
          )}
        </div>

        <div className="w-full md:w-1/2 h-[400px] md:h-[600px]">
          <img
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuA1X4s4mH8XnZ9Ej_Jq8KF2mVZkHngt_KQwIhtBAZHj-HkZZlKKA9aDepzpyfvT6ghjF2d1KWOse79zHzPjwYqzct4FgcdWK4TYVBQmjyHp7Qcoc6pPEYyjLTA8r8u4oeRG2kURJMmHk4kbSf51mw1nuJ7jnLV0ctWRLC2xBo_-wpVKwxF_SoBTDpluoTtfHLULc2Vp5X5_kLFEJE6QOty9W_NbEfSJleQboEqY5gJuQc-gL3vViuza990kcfQV5e2haKB4Gzv6RpI"
            alt="Festive Privilege Sale"
            className="w-full h-full object-cover"
          />
        </div>
      </motion.div>
    </section>
  )
}
