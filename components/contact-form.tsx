"use client"

import { useState, useRef, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Send, CheckCircle, X } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { WindowBar } from "@/components/window-bar"
import { useToast } from "@/hooks/use-toast"

const fieldClass =
  "rounded-lg border-hair/[0.14] bg-pal-950/60 font-sans text-pal-50 placeholder:text-pal-400 focus-visible:border-acc/50 focus-visible:ring-2 focus-visible:ring-acc/15"

export function ContactForm() {
  const { toast } = useToast()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [showSuccessModal, setShowSuccessModal] = useState(false)
  const formRef = useRef<HTMLFormElement>(null)
  const successCloseButtonRef = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    if (showSuccessModal) {
      const timeoutId = window.setTimeout(() => {
        successCloseButtonRef.current?.focus()
      }, 150)
      return () => window.clearTimeout(timeoutId)
    }
  }, [showSuccessModal])

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (!formRef.current) return
    setIsSubmitting(true)
    const formData = new FormData(formRef.current)

    try {
      const response = await fetch("https://formsubmit.co/mahmoodabuawad08@gmail.com", {
        method: "POST",
        body: formData,
        headers: { Accept: "application/json" },
      })
      if (!response.ok) throw new Error("Failed to send message")
      setShowSuccessModal(true)
      formRef.current.reset()
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to send message. Please try again later.",
        variant: "destructive",
      })
      console.error("Submission error:", error)
    } finally {
      setIsSubmitting(false)
    }
  }

  const closeSuccessModal = () => setShowSuccessModal(false)

  return (
    <>
      <form ref={formRef} onSubmit={handleSubmit} className="space-y-5" aria-label="Contact form">
        {/* Hidden fields for FormSubmit configuration */}
        <input type="hidden" name="_captcha" value="false" />
        <input type="hidden" name="_subject" value="New Contact Form Submission from Portfolio" />

        <div className="space-y-1.5">
          <label htmlFor="contact-name" className="block font-display text-2xl leading-none text-acc">
            Name
          </label>
          <Input id="contact-name" name="name" placeholder="Your full name" required className={fieldClass} />
        </div>
        <div className="space-y-1.5">
          <label htmlFor="contact-email" className="block font-display text-2xl leading-none text-acc">
            Email
          </label>
          <Input id="contact-email" name="email" type="email" placeholder="name@example.com" required className={fieldClass} />
        </div>
        <div className="space-y-1.5">
          <label htmlFor="contact-subject" className="block font-display text-2xl leading-none text-acc">
            Subject
          </label>
          <Input id="contact-subject" name="subject" placeholder="What would you like to discuss?" required className={fieldClass} />
        </div>
        <div className="space-y-1.5">
          <label htmlFor="contact-message" className="block font-display text-2xl leading-none text-acc">
            Message
          </label>
          <Textarea
            id="contact-message"
            name="message"
            placeholder="Share the details of your project or question"
            rows={5}
            required
            className={fieldClass}
          />
        </div>
        <Button
          type="submit"
          disabled={isSubmitting}
          className="osd-btn h-auto w-full justify-center !py-1.5 !text-2xl disabled:opacity-50"
        >
          {isSubmitting ? (
            "Sending…"
          ) : (
            <>
              Send message <Send className="ml-2 h-4 w-4" />
            </>
          )}
        </Button>
      </form>

      {/* Success modal */}
      <AnimatePresence>
        {showSuccessModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-pal-950/70 p-4 backdrop-blur-sm"
            role="dialog"
            aria-modal="true"
            aria-labelledby="contact-success-title"
            aria-describedby="contact-success-description"
            onClick={closeSuccessModal}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 16 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 16 }}
              transition={{ type: "spring", damping: 24, stiffness: 300 }}
              className="relative w-full max-w-md overflow-hidden rounded-md term-panel font-mono"
              onClick={(e) => e.stopPropagation()}
            >
              <WindowBar
                path="Message sent"
                actions={
                  <button
                    onClick={closeSuccessModal}
                    className="text-pal-400 transition-colors hover:text-acc"
                    aria-label="Close"
                    ref={successCloseButtonRef}
                  >
                    <X className="h-4 w-4" />
                  </button>
                }
              />

              <div className="p-8 text-center">
                <div className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-full border border-term-green/40 bg-term-green/10">
                  <CheckCircle className="h-7 w-7 text-term-green" />
                </div>
                <h3 id="contact-success-title" className="font-display text-4xl text-pal-50">
                  Message sent
                </h3>
                <p id="contact-success-description" className="mt-2 font-sans text-sm text-pal-300">
                  Thanks for reaching out! I&rsquo;ll get back to you as soon as possible.
                </p>
                <Button
                  onClick={closeSuccessModal}
                  className="osd-btn mt-6 h-auto !px-6 !py-1 !text-2xl"
                >
                  Done
                </Button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
