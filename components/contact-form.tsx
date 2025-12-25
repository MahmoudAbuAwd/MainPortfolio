"use client"

import { useState, useRef, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Send, CheckCircle, X } from "lucide-react"
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { useToast } from "@/hooks/use-toast"

export function ContactForm() {
  const { toast } = useToast()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [showSuccessModal, setShowSuccessModal] = useState(false)
  const formRef = useRef<HTMLFormElement>(null)
  const successCloseButtonRef = useRef<HTMLButtonElement>(null)
  const supabase = createClientComponentClient()

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
    const name = formData.get("name") as string
    const email = formData.get("email") as string
    const subject = formData.get("subject") as string
    const message = formData.get("message") as string

    try {
      const { error } = await supabase
        .from("contact")
        .insert({
          name,
          email,
          service: subject,
          message,
          created_at: new Date().toISOString(),
        })

      if (error) {
        throw error
      }

      // Show success modal instead of toast
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

  const closeSuccessModal = () => {
    setShowSuccessModal(false)
  }

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        viewport={{ once: true }}
      >
        <div className="relative overflow-hidden rounded-xl bg-zinc-800/50 backdrop-blur-sm border border-zinc-700/50 p-6 transition-all duration-300 hover:border-purple-500/50">
          <div className="absolute -inset-1 bg-gradient-to-r from-purple-500/10 to-pink-500/10 rounded-xl blur opacity-25 hover:opacity-100 transition duration-1000 hover:duration-200"></div>

          <div className="relative">
            <h3 id="contact-form-heading" className="text-2xl font-bold mb-6">Send Me a Message</h3>

            <form
              ref={formRef}
              onSubmit={handleSubmit}
              className="space-y-6"
              aria-labelledby="contact-form-heading"
            >
              <div className="space-y-2">
                <label htmlFor="contact-name" className="block text-sm font-medium text-zinc-200">
                  Name
                </label>
                <Input
                  id="contact-name"
                  name="name"
                  placeholder="Enter your full name"
                  required
                  className="bg-zinc-900/50 border-zinc-700 focus:border-blue-500 focus:ring-blue-500/20"
                />
              </div>
              <div className="space-y-2">
                <label htmlFor="contact-email" className="block text-sm font-medium text-zinc-200">
                  Email address
                </label>
                <Input
                  id="contact-email"
                  name="email"
                  type="email"
                  placeholder="name@example.com"
                  required
                  className="bg-zinc-900/50 border-zinc-700 focus:border-blue-500 focus:ring-blue-500/20"
                />
              </div>
              <div className="space-y-2">
                <label htmlFor="contact-subject" className="block text-sm font-medium text-zinc-200">
                  Subject
                </label>
                <Input
                  id="contact-subject"
                  name="subject"
                  placeholder="What would you like to discuss?"
                  required
                  className="bg-zinc-900/50 border-zinc-700 focus:border-blue-500 focus:ring-blue-500/20"
                />
              </div>
              <div className="space-y-2">
                <label htmlFor="contact-message" className="block text-sm font-medium text-zinc-200">
                  Message
                </label>
                <Textarea
                  id="contact-message"
                  name="message"
                  placeholder="Share the details of your project or question"
                  rows={5}
                  required
                  className="bg-zinc-900/50 border-zinc-700 focus:border-blue-500 focus:ring-blue-500/20"
                />
              </div>
              <Button
                type="submit"
                className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-pink-500 hover:to-purple-500 border-0"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <>Sending...</>
                ) : (
                  <>
                    Send Message <Send className="ml-2 h-4 w-4" />
                  </>
                )}
              </Button>
            </form>
          </div>
        </div>
      </motion.div>

      {/* Success Modal */}
      <AnimatePresence>
        {showSuccessModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm"
            role="dialog"
            aria-modal="true"
            aria-labelledby="contact-success-title"
            aria-describedby="contact-success-description"
            onClick={closeSuccessModal}
          >
            <motion.div
              initial={{ scale: 0.7, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.7, opacity: 0, y: 20 }}
              transition={{ 
                type: "spring",
                damping: 25,
                stiffness: 300,
                duration: 0.4 
              }}
              className="relative bg-zinc-900/95 backdrop-blur-sm rounded-2xl p-8 max-w-md w-full mx-4 border border-zinc-700/50 shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Gradient Background */}
              <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 via-pink-500/10 to-purple-500/10 rounded-2xl"></div>
              
              {/* Close Button */}
              <button
                onClick={closeSuccessModal}
                className="absolute top-4 right-4 text-zinc-400 hover:text-white transition-colors duration-200"
                aria-label="Close message sent modal"
                ref={successCloseButtonRef}
              >
                <X className="h-5 w-5" />
              </button>

              <div className="relative text-center">
                {/* Success Icon with Animation */}
                <motion.div
                  initial={{ scale: 0, rotate: -180 }}
                  animate={{ scale: 1, rotate: 0 }}
                  transition={{ 
                    delay: 0.2,
                    type: "spring",
                    damping: 20,
                    stiffness: 300 
                  }}
                  className="mx-auto w-16 h-16 bg-gradient-to-r from-green-400 to-emerald-500 rounded-full flex items-center justify-center mb-6"
                >
                  <CheckCircle className="h-8 w-8 text-white" />
                </motion.div>

                {/* Success Text */}
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4, duration: 0.3 }}
                >
                  <h3 id="contact-success-title" className="text-2xl font-bold text-white mb-2">
                    Message Sent Successfully! 🎉
                  </h3>
                  <p id="contact-success-description" className="text-zinc-300 mb-6">
                    Thanks for reaching out! I'll get back to you as soon as possible.
                  </p>
                </motion.div>

                {/* Animated Particles */}
                <div className="absolute inset-0 pointer-events-none">
                  {[...Array(6)].map((_, i) => (
                    <motion.div
                      key={i}
                      initial={{ scale: 0, x: 0, y: 0 }}
                      animate={{ 
                        scale: [0, 1, 0],
                        x: [0, (Math.random() - 0.5) * 200],
                        y: [0, (Math.random() - 0.5) * 200],
                      }}
                      transition={{
                        delay: 0.6 + i * 0.1,
                        duration: 1.5,
                        ease: "easeOut"
                      }}
                      className="absolute top-1/2 left-1/2 w-2 h-2 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full"
                    />
                  ))}
                </div>

                {/* Action Button */}
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6, duration: 0.3 }}
                >
                  <Button
                    onClick={closeSuccessModal}
                    className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-pink-500 hover:to-purple-500 border-0 px-6"
                    aria-label="Dismiss success message"
                  >
                    Got it!
                  </Button>
                </motion.div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}