"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import { ArrowRight, Github, Linkedin, Mail, Twitter, ArrowUpRight, Download, Phone , Star , Code , Award , Globe, BookOpen, FolderOpen, ChevronLeft, ChevronRight, FileText } from "lucide-react"
import React from "react"
import type { ReactNode } from "react"

import { Button } from "@/components/ui/button"
import { ProjectCard } from "@/components/project-card"
import { SkillBadge } from "@/components/skill-badge"
import { Timeline } from "@/components/timeline"
import { FloatingNav } from "@/components/floating-nav"
import { MouseFollower } from "@/components/mouse-follower"
import { SiteFooter } from "@/components/site-footer"
import { SectionHeading } from "@/components/section-heading"
import { GlassmorphicCard } from "@/components/glassmorphic-card"
import { GitHubActivity } from "@/components/ui/github-activity"
import Image from 'next/image'

// Enhanced Skill Badge Component
type GradientColor = "purple" | "blue" | "green" | "orange" | "indigo" | "yellow"

interface EnhancedSkillBadgeProps {
  name: string
  level: number
  color?: GradientColor
}

const colorClasses: Record<GradientColor, string> = {
  purple: "from-purple-500 to-pink-500",
  blue: "from-blue-500 to-cyan-500",
  green: "from-green-500 to-emerald-500",
  orange: "from-orange-500 to-red-500",
  indigo: "from-indigo-500 to-purple-500",
  yellow: "from-yellow-500 to-orange-500",
}

const EnhancedSkillBadge = ({ name, level, color = "purple" }: EnhancedSkillBadgeProps) => {

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      viewport={{ once: true }}
      whileHover={{ scale: 1.05, y: -5 }}
      className="group"
    >
      <div className="relative overflow-hidden rounded-xl bg-zinc-900/50 border border-zinc-800/50 hover:border-zinc-700/50 transition-all duration-300 p-6">
        {/* Animated background gradient */}
        <div className={`absolute inset-0 bg-gradient-to-br ${colorClasses[color]} opacity-0 group-hover:opacity-10 transition-opacity duration-300`} />
        
        {/* Skill icon/name */}
        <div className="relative z-10 flex items-center justify-between mb-4">
          <h3 className="font-semibold text-white group-hover:text-purple-300 transition-colors duration-300">
            {name}
          </h3>
          <span className="text-sm font-medium text-zinc-400 group-hover:text-purple-400 transition-colors duration-300">
            {level}%
          </span>
        </div>

        {/* Progress bar */}
        <div className="relative z-10 space-y-2">
          <div className="w-full bg-zinc-800 rounded-full h-2 overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              whileInView={{ width: `${level}%` }}
              transition={{ duration: 1.5, delay: 0.2, ease: "easeOut" }}
              viewport={{ once: true }}
              className={`h-full bg-gradient-to-r ${colorClasses[color]} relative overflow-hidden`}
            >
              {/* Animated shine effect */}
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
                animate={{
                  x: ['-100%', '100%'],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  repeatDelay: 3,
                  ease: "linear"
                }}
              />
            </motion.div>
          </div>
          
          {/* Skill level indicators */}
          <div className="flex justify-between text-xs text-zinc-500">
            <span>Beginner</span>
            <span>Expert</span>
          </div>
        </div>

        {/* Decorative elements */}
        <div className="absolute -top-1 -right-1 w-3 h-3 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 animate-pulse" />
        <div className="absolute -bottom-1 -left-1 w-2 h-2 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 animate-pulse" />
      </div>
    </motion.div>
  )
}

// Reusable ContactCard component
interface ContactCardProps {
  icon: ReactNode
  title: string
  value: string
  href: string
  gradient: string
  hoverColor: string
  external?: boolean
}

const ContactCard = ({ icon, title, value, href, gradient, hoverColor, external = false }: ContactCardProps) => (
  <motion.div 
    whileHover={{ scale: 1.02 }}
    whileTap={{ scale: 0.98 }}
    className="group"
  >
    <a 
      href={href} 
      target={external ? "_blank" : "_self"}
      rel={external ? "noopener noreferrer" : ""}
      className="flex items-center gap-4 p-4 rounded-xl bg-zinc-800/40 hover:bg-zinc-800/60 transition-all duration-300 border border-zinc-800 hover:border-zinc-700/50"
    >
      <div className={`w-11 h-11 rounded-lg bg-gradient-to-br ${gradient} flex items-center justify-center group-hover:rotate-6 transition-transform duration-300 shadow-md`}>
        {icon}
      </div>
      <div className="flex-1 min-w-0">
        <div className="text-xs font-medium text-zinc-400 uppercase tracking-wider">{title}</div>
        <div className={`font-medium text-white group-hover:text-${hoverColor} transition-colors duration-300 truncate`}>
          {value}
        </div>
      </div>
      <div className={`ml-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-${hoverColor}`}>
        {external ? (
          <ArrowUpRight className="h-4 w-4" />
        ) : (
          <ArrowRight className="h-4 w-4" />
        )}
      </div>
    </a>
  </motion.div>
)

// Enhanced About Section Component with new design
const EnhancedAboutSection = () => {
  const highlights = [
    { text: "AWS AI Practitioner Certified", icon: Award, color: "from-orange-500 to-amber-500" },
    { text: "AI/ML Specialist", icon: Code, color: "from-purple-500 to-violet-500" },
    { text: "Full-Stack AI Developer", icon: Globe, color: "from-blue-500 to-cyan-500" },
    { text: "Open Source Contributor", icon: Star, color: "from-pink-500 to-rose-500" },
  ]

  const stats = [
    { label: "Projects", value: "15+", icon: Code },
    { label: "Certifications", value: "30+", icon: Award },
    { label: "Open Source PRs", value: "30+", icon: Star },
    { label: "Domains", value: "AI • ML • Cloud", icon: Globe },
  ]

  const details = [
    { label: "Based in", value: "Amman, Jordan" },
    { label: "Languages", value: "Arabic, English" },
    { label: "Volunteering", value: "IEEE & GDG" },
    { label: "Focus Area", value: "AI/ML" },
  ]

  const handleDownloadResume = () => {
    const link = document.createElement('a')
    link.href = '/Resume.pdf'
    link.download = 'Resume.pdf'
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  return (
    <section className="relative overflow-hidden">
      {/* Decorative background */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -top-32 -left-32 w-80 h-80 bg-purple-900/15 rounded-full blur-3xl" />
        <div className="absolute -bottom-32 -right-32 w-80 h-80 bg-pink-900/15 rounded-full blur-3xl" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(168,85,247,0.04),transparent_60%)]" />
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl relative z-10">

        {/* Stats bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 mb-10 sm:mb-14"
        >
          {stats.map((item, idx) => {
            const Icon = item.icon
            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4, delay: idx * 0.08 }}
                viewport={{ once: true }}
                className="group relative rounded-2xl border border-zinc-800/60 bg-zinc-900/40 backdrop-blur-sm p-4 sm:p-5 hover:border-purple-500/40 transition-all duration-300"
              >
                <div className="flex items-center gap-3">
                  <div className="shrink-0 p-2 rounded-xl bg-gradient-to-br from-purple-500/15 to-pink-500/15 group-hover:from-purple-500/25 group-hover:to-pink-500/25 transition-colors duration-300">
                    <Icon className="w-4 h-4 sm:w-5 sm:h-5 text-purple-400" />
                  </div>
                  <div className="min-w-0">
                    <div className="text-lg sm:text-xl font-bold text-white leading-tight">{item.value}</div>
                    <div className="text-[11px] sm:text-xs text-zinc-500 font-medium uppercase tracking-wider">{item.label}</div>
                  </div>
                </div>
              </motion.div>
            )
          })}
        </motion.div>

        {/* Two-column layout: Story + Profile */}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-6 sm:gap-8 mb-10 sm:mb-14">

          {/* Story Card — 3/5 width on desktop */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="lg:col-span-3"
          >
            <div className="h-full rounded-2xl sm:rounded-3xl border border-zinc-800/60 backdrop-blur-sm bg-gradient-to-br from-zinc-900/80 via-zinc-900/60 to-zinc-900/80 p-6 sm:p-8 lg:p-10">
              {/* Section label */}
              <div className="flex items-center gap-3 mb-6 sm:mb-8">
                <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center shadow-lg shadow-purple-500/20">
                  <BookOpen className="w-4 h-4 text-white" />
                </div>
                <h3 className="text-xl sm:text-2xl font-bold text-white">My Journey</h3>
              </div>

              <div className="space-y-4 sm:space-y-5 text-zinc-300 text-[15px] sm:text-base leading-relaxed">
                <p>
                  I'm a passionate AI engineer with experience building intelligent applications using machine learning and deep learning. My journey in tech started with a strong foundation in developing AI and ML models that solve real-world problems.
                </p>
                <p>
                  Certified as an AWS AI Practitioner, I specialize in delivering end-to-end AI solutions across web and cloud environments. I've worked with various techniques to create intelligent, efficient, and scalable applications that enhance user experiences.
                </p>
                <p>
                  When I'm not coding, you can find me exploring new technologies, contributing to open-source projects, and staying up-to-date with the latest industry trends in AI and machine learning.
                </p>
              </div>

              {/* Inline highlights */}
              <div className="mt-6 sm:mt-8 flex flex-wrap gap-2 sm:gap-3">
                {highlights.map((h, i) => {
                  const HIcon = h.icon
                  return (
                    <motion.span
                      key={i}
                      initial={{ opacity: 0, scale: 0.8 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.3, delay: 0.3 + i * 0.08 }}
                      viewport={{ once: true }}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs sm:text-sm font-medium bg-zinc-800/70 border border-zinc-700/50 text-zinc-300 hover:border-purple-500/40 hover:text-white transition-all duration-300"
                    >
                      <HIcon className="w-3.5 h-3.5 text-purple-400" />
                      {h.text}
                    </motion.span>
                  )
                })}
              </div>
            </div>
          </motion.div>

          {/* Profile Card — 2/5 width on desktop */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="lg:col-span-2"
          >
            <div className="h-full rounded-2xl sm:rounded-3xl border border-zinc-800/60 backdrop-blur-sm bg-gradient-to-br from-zinc-900/80 via-zinc-900/60 to-zinc-900/80 p-6 sm:p-8 flex flex-col">
              {/* Avatar header */}
              <div className="flex items-center gap-4 mb-6">
                <div className="relative shrink-0">
                  <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-gradient-to-tr from-purple-600 to-pink-600 p-[2px]">
                    <div className="w-full h-full rounded-2xl bg-zinc-900 flex items-center justify-center text-white font-bold text-lg">
                      MA
                    </div>
                  </div>
                  <span className="absolute -bottom-1 -right-1 w-4 h-4 rounded-full bg-green-500 ring-2 ring-zinc-900" />
                </div>
                <div>
                  <h4 className="text-lg sm:text-xl font-bold text-white">Mahmoud AbuAwd</h4>
                  <p className="text-sm text-zinc-400 flex items-center gap-1.5">
                    AI Engineer
                    <span className="inline-block w-1 h-1 rounded-full bg-zinc-600" />
                    <span className="text-green-400 text-xs font-medium">Available</span>
                  </p>
                </div>
              </div>

              {/* Details */}
              <div className="space-y-3 flex-1">
                {details.map((d, i) => (
                  <div key={i} className="flex items-center justify-between py-2 border-b border-zinc-800/50 last:border-0">
                    <span className="text-sm text-zinc-500">{d.label}</span>
                    <span className="text-sm text-white font-medium">{d.value}</span>
                  </div>
                ))}
              </div>

              {/* Socials */}
              <div className="mt-6 grid grid-cols-4 gap-2">
                {[
                  { href: "https://github.com/MahmoudAbuAwd", icon: Github, label: "GitHub" },
                  { href: "https://www.linkedin.com/in/mahmoud-abuawd-247290225/", icon: Linkedin, label: "LinkedIn" },
                  { href: "https://twitter.com/s9mod", icon: Twitter, label: "Twitter" },
                  { href: "mailto:mahmoodabuawad08@gmail.com", icon: Mail, label: "Email" },
                ].map((s, i) => (
                  <Link
                    key={i}
                    href={s.href}
                    target={s.href.startsWith("mailto") ? "_self" : "_blank"}
                    rel="noopener noreferrer"
                    aria-label={s.label}
                    className="group flex items-center justify-center rounded-xl border border-zinc-800/60 bg-zinc-800/30 py-2.5 hover:border-purple-500/50 hover:bg-purple-500/10 transition-all duration-300"
                  >
                    <s.icon className="w-4 h-4 sm:w-5 sm:h-5 text-zinc-400 group-hover:text-white transition-colors duration-300" />
                  </Link>
                ))}
              </div>

              {/* Actions */}
              <div className="mt-4 grid grid-cols-2 gap-3">
                <button
                  onClick={handleDownloadResume}
                  className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium text-white bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 transition-all duration-300 shadow-lg shadow-purple-500/10 hover:shadow-purple-500/20"
                >
                  <Download className="w-4 h-4" />
                  Resume
                </button>
                <Link
                  href="tel:+962791034222"
                  className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium text-zinc-300 border border-zinc-700/60 bg-zinc-800/40 hover:border-purple-500/50 hover:text-white transition-all duration-300"
                >
                  <Phone className="w-4 h-4" />
                  Call Me
                </Link>
              </div>
            </div>
          </motion.div>
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <button
            onClick={handleDownloadResume}
            className="group relative inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-semibold rounded-2xl transition-all duration-300 transform hover:scale-[1.03] shadow-lg hover:shadow-2xl hover:shadow-purple-500/25"
          >
            <Download className="w-5 h-5 group-hover:animate-bounce" />
            Download My Resume
            <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-purple-400/20 to-pink-400/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          </button>
        </motion.div>
      </div>
    </section>
  )
}

// Certifications Carousel Component — reads all PDFs from /public/Certification
const CertificationsCarousel = () => {
  const certifications = [
    // AWS
    { file: "Mahmoud Abu Awad - AWS Certified AI Practitioner.pdf",   label: "AWS Certified AI Practitioner",                         issuer: "Amazon Web Services",        date: "May 2025",  color: "from-orange-500 to-yellow-500" },
    { file: "aws-cloud-practitioner-essentials.pdf",                   label: "AWS Cloud Practitioner Essentials",                     issuer: "Amazon Web Services",        date: "Jun 2025",  color: "from-amber-500 to-orange-400" },
    // DeepLearning.AI Specializations
    { file: "Deep-Learning-specialization.pdf",                        label: "Deep Learning Specialization",                          issuer: "DeepLearning.AI / Coursera", date: "Sep 2024",  color: "from-blue-600 to-indigo-500" },
    { file: "DeepLearning.AI-TensorFlow-Developer.pdf",                label: "DeepLearning.AI TensorFlow Developer Certificate",       issuer: "DeepLearning.AI / Coursera", date: "Feb 2025",  color: "from-indigo-500 to-violet-500" },
    // DeepLearning.AI individual courses
    { file: "neural-networks.pdf",                                     label: "Neural Networks and Deep Learning",                      issuer: "DeepLearning.AI / Coursera", date: "Apr 2024",  color: "from-purple-600 to-pink-500" },
    { file: "Coursera WPZETQXD9APJ.pdf",                               label: "Improving Deep Neural Networks",                         issuer: "DeepLearning.AI / Coursera", date: "Jul 2024",  color: "from-blue-500 to-cyan-500" },
    { file: "Coursera U7XAVF5N39L4.pdf",                               label: "Structuring Machine Learning Projects",                  issuer: "DeepLearning.AI / Coursera", date: "Aug 2024",  color: "from-indigo-400 to-blue-500" },
    { file: "Convolutional-Neural-Networks.pdf",                       label: "Convolutional Neural Networks",                          issuer: "DeepLearning.AI / Coursera", date: "Sep 2024",  color: "from-cyan-500 to-blue-600" },
    { file: "Sequence-Models.pdf",                                     label: "Sequence Models",                                        issuer: "DeepLearning.AI / Coursera", date: "Sep 2024",  color: "from-violet-500 to-indigo-500" },
    { file: "Introduction-to-TensorFlow-for-Artificial-Intelligence-Machine-Learning-and-Deep-Learning.pdf", label: "Introduction to TensorFlow for AI, ML & Deep Learning", issuer: "DeepLearning.AI / Coursera", date: "Oct 2024", color: "from-teal-500 to-blue-500" },
    { file: "Convolutional-Neural-Networks-in-TensorFlow.pdf",         label: "Convolutional Neural Networks in TensorFlow",            issuer: "DeepLearning.AI / Coursera", date: "Jan 2025",  color: "from-blue-400 to-indigo-600" },
    { file: "Coursera VF311PYYKCJ2.pdf",                               label: "Natural Language Processing in TensorFlow",              issuer: "DeepLearning.AI / Coursera", date: "Jan 2025",  color: "from-indigo-500 to-teal-500" },
    { file: "Coursera QUROULK5RKLZ.pdf",                               label: "Sequences, Time Series and Prediction",                  issuer: "DeepLearning.AI / Coursera", date: "Feb 2025",  color: "from-blue-600 to-violet-400" },
    // IBM / Coursera
    { file: "Coursera RPTTHMOVRFDQ.pdf",                               label: "Build RAG Applications: Get Started",                    issuer: "IBM / Coursera",             date: "Oct 2025",  color: "from-blue-500 to-teal-400" },
    { file: "Advanced RAG-with-Vector-Databases-and-Retrievers.pdf",   label: "Advanced RAG with Vector Databases and Retrievers",      issuer: "IBM / Coursera",             date: "Oct 2025",  color: "from-teal-500 to-cyan-500" },
    { file: "develop-Generative-AI-Applications-Get-Started.pdf",      label: "Develop Generative AI Applications: Get Started",        issuer: "IBM / Coursera",             date: "Oct 2025",  color: "from-violet-500 to-blue-500" },
    { file: "Build-Multimodal-Generative-AI-Applications.pdf",         label: "Build Multimodal Generative AI Applications",            issuer: "IBM / Coursera",             date: "Nov 2025",  color: "from-purple-500 to-indigo-500" },
    { file: "Coursera QVU2E4HXVVDU.pdf",                               label: "Fundamentals of Building AI Agents",                     issuer: "IBM / Coursera",             date: "Feb 2026",  color: "from-indigo-600 to-purple-500" },
    // Microsoft / Coursera
    { file: "Artificial-Intelligence-on-Microsoft-Azure.pdf",          label: "Artificial Intelligence on Microsoft Azure",             issuer: "Microsoft / Coursera",       date: "Jun 2025",  color: "from-blue-500 to-sky-400" },
    { file: "Microsoft-Azure-Machine-Learning.pdf",                    label: "Microsoft Azure Machine Learning",                       issuer: "Microsoft / Coursera",       date: "Jul 2025",  color: "from-sky-500 to-blue-600" },
    { file: "Harnessing-the-Power-of-Data-with-Power-BI.pdf",          label: "Harnessing the Power of Data with Power BI",             issuer: "Microsoft / Coursera",       date: "Apr 2025",  color: "from-yellow-500 to-orange-500" },
    { file: "Preparing-Data-for-Analysis-with-Microsoft-Excel.pdf",    label: "Preparing Data for Analysis with Microsoft Excel",       issuer: "Microsoft / Coursera",       date: "Mar 2025",  color: "from-green-500 to-teal-500" },
    { file: "Intensive-power-bi-course.pdf",                           label: "Intensive Power BI Course",                              issuer: "Microsoft",                  date: "2024",      color: "from-yellow-400 to-amber-500" },
    // Other
    { file: "Python-for-DataScience-MachineLearning.pdf",              label: "Python for Data Science & Machine Learning",             issuer: "Udemy",                      date: "Mar 2024",  color: "from-blue-500 to-cyan-400" },
    { file: "Embedded-Systems.pdf",                                    label: "Embedded Systems Design",                                issuer: "INJO4",                      date: "2024",      color: "from-green-600 to-emerald-500" },
    { file: "IEEE-Member.pdf",                                         label: "IEEE Membership",                                        issuer: "IEEE",                       date: "2024",      color: "from-blue-700 to-indigo-600" },
    { file: "Scientific-Research-Paper-Award.pdf",                     label: "Scientific Research Paper Award",                        issuer: "University of Jordan",       date: "2023",      color: "from-indigo-500 to-blue-500" },
    { file: "AWS-AI-PRACTITIONER-COURSE.pdf",                              label: "AWS AI Practitioner Course",                             issuer: "Amazon Web Services",        date: "2025",      color: "from-orange-400 to-yellow-400" },
    { file: "AWS-Becoming-Machine-learning-engineer.pdf",               label: "Becoming a Machine Learning Engineer",                    issuer: "Amazon Web Services",        date: "2025",      color: "from-amber-500 to-orange-500" },
  ]

  const ITEMS_PER_PAGE = 3
  const totalPages = Math.ceil(certifications.length / ITEMS_PER_PAGE)
  const [page, setPage] = React.useState(0)

  const visible = certifications.slice(page * ITEMS_PER_PAGE, page * ITEMS_PER_PAGE + ITEMS_PER_PAGE)

  return (
    <div className="relative">
      {/* Carousel row */}
      <div className="flex items-center gap-4">
        {/* Prev arrow */}
        <button
          onClick={() => setPage(p => Math.max(0, p - 1))}
          disabled={page === 0}
          aria-label="Previous certifications"
          className="flex-shrink-0 w-12 h-12 rounded-full bg-zinc-800/80 border border-zinc-700/50 flex items-center justify-center hover:bg-zinc-700/80 hover:border-purple-500/50 transition-all disabled:opacity-30 disabled:cursor-not-allowed"
        >
          <ChevronLeft className="w-6 h-6 text-white" />
        </button>

        {/* Cards grid */}
        <div className="flex-1 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {visible.map((cert, i) => (
            <motion.div
              key={cert.file}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: i * 0.08 }}
              whileHover={{ y: -6 }}
              className="group relative"
            >
              <div className="h-full rounded-xl bg-zinc-900/50 border border-zinc-800/50 hover:border-purple-500/40 transition-all duration-300 p-6 flex flex-col overflow-hidden relative">
                {/* Gradient wash on hover */}
                <div className={`absolute inset-0 bg-gradient-to-br ${cert.color} opacity-0 group-hover:opacity-10 transition-opacity duration-300 rounded-xl pointer-events-none`} />

                <div className="relative z-10 flex flex-col h-full">
                  {/* Icon */}
                  <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${cert.color} flex items-center justify-center mb-4 shadow-lg`}>
                    <FileText className="w-6 h-6 text-white" />
                  </div>

                  {/* Label */}
                  <h3 className="text-base font-bold text-white group-hover:text-purple-300 transition-colors duration-300 leading-snug mb-1">
                    {cert.label}
                  </h3>

                  {/* Issuer & date */}
                  <p className="text-xs text-zinc-400 mb-1">{cert.issuer}</p>
                  <p className="text-xs text-zinc-500">{cert.date}</p>

                  {/* Action buttons */}
                  <div className="mt-auto pt-4 flex items-center gap-2">
                    <a
                      href={`/Certification/${encodeURIComponent(cert.file)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={e => e.stopPropagation()}
                      className="flex-1 flex items-center justify-center gap-1.5 px-3 py-2 rounded-lg bg-purple-600/80 hover:bg-purple-600 text-white text-xs font-medium transition-colors"
                    >
                      <ArrowUpRight className="w-3.5 h-3.5" />
                      Open in tab
                    </a>
                    <a
                      href={`/Certification/${encodeURIComponent(cert.file)}`}
                      download={cert.file}
                      onClick={e => e.stopPropagation()}
                      className="flex-1 flex items-center justify-center gap-1.5 px-3 py-2 rounded-lg bg-zinc-700/80 hover:bg-zinc-600 text-white text-xs font-medium transition-colors"
                    >
                      <Download className="w-3.5 h-3.5" />
                      Download
                    </a>
                  </div>
                </div>

                {/* Corner pulse dot */}
                <div className="absolute -top-1 -right-1 w-3 h-3 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 animate-pulse" />
              </div>
            </motion.div>
          ))}
        </div>

        {/* Next arrow */}
        <button
          onClick={() => setPage(p => Math.min(totalPages - 1, p + 1))}
          disabled={page >= totalPages - 1}
          aria-label="Next certifications"
          className="flex-shrink-0 w-12 h-12 rounded-full bg-zinc-800/80 border border-zinc-700/50 flex items-center justify-center hover:bg-zinc-700/80 hover:border-purple-500/50 transition-all disabled:opacity-30 disabled:cursor-not-allowed"
        >
          <ChevronRight className="w-6 h-6 text-white" />
        </button>
      </div>

      {/* Page counter + dots */}
      <div className="flex flex-col items-center gap-3 mt-8">
        <span className="text-xs text-zinc-500">
          Showing {page * ITEMS_PER_PAGE + 1}–{Math.min((page + 1) * ITEMS_PER_PAGE, certifications.length)} of {certifications.length}
        </span>
        <div className="flex items-center gap-2">
          {Array.from({ length: totalPages }).map((_, i) => (
            <button
              key={i}
              onClick={() => setPage(i)}
              aria-label={`Go to page ${i + 1}`}
              className={`h-2 rounded-full transition-all duration-300 ${
                i === page ? "w-6 bg-purple-500" : "w-2 bg-zinc-600 hover:bg-zinc-400"
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  )
}

// Quote Component with trending font style
const InspirationalQuote = () => {
  const quotes = [
    {
      text: "The future belongs to those who believe in the beauty of their dreams.",
      author: "Eleanor Roosevelt"
    },
    {
      text: "Innovation distinguishes between a leader and a follower.",
      author: "Steve Jobs"
    },
    {
      text: "The only way to do great work is to love what you do.",
      author: "Steve Jobs"
    }
  ];

  const [currentQuote, setCurrentQuote] = React.useState(quotes[0]);

  React.useEffect(() => {
    const interval = setInterval(() => {
      const currentIndex = quotes.findIndex(q => q.text === currentQuote.text);
      const nextIndex = (currentIndex + 1) % quotes.length;
      setCurrentQuote(quotes[nextIndex]);
    }, 8000);

    return () => clearInterval(interval);
  }, [currentQuote]);

  return (
    <section className="py-16 md:py-24 relative overflow-hidden">
      <div className="absolute inset-0 z-0">
        <div className="absolute top-1/3 left-1/4 w-64 h-64 bg-purple-500/10 rounded-full mix-blend-multiply filter blur-3xl opacity-20"></div>
        <div className="absolute bottom-1/3 right-1/4 w-64 h-64 bg-pink-500/10 rounded-full mix-blend-multiply filter blur-3xl opacity-20"></div>
      </div>
      
      <div className="container relative z-10">
        <motion.div
          key={currentQuote.text}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1 }}
          className="text-center max-w-3xl mx-auto"
        >
          <div className="text-4xl md:text-5xl font-bold mb-8 text-white font-serif italic">
            <span className="text-purple-400">"</span>
            <span className="bg-gradient-to-r from-purple-200 to-pink-200 bg-clip-text text-transparent">
              {currentQuote.text}
            </span>
            <span className="text-pink-400">"</span>
          </div>
          <div className="text-lg text-zinc-400 font-medium">
            — {currentQuote.author}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default function Portfolio() {
  const headlineName = "Mahmoud AbuAwd"
  const headlineRole = "AI & ML Engineer"

  // Smooth scroll function
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-zinc-900 via-zinc-900 to-black text-white">
      <a
        href="#main-content"
        className="sr-only focus-visible:fixed focus-visible:top-4 focus-visible:left-4 focus-visible:z-50 focus-visible:rounded-lg focus-visible:bg-zinc-900 focus-visible:px-4 focus-visible:py-2 focus-visible:text-white focus-visible:shadow-lg focus-visible:clip-auto focus-visible:h-auto focus-visible:w-auto focus-visible:overflow-visible focus-visible:whitespace-normal focus-visible:m-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-purple-500"
      >
        Skip to main content
      </a>
      <MouseFollower />
      <FloatingNav />
      <main id="main-content" className="overflow-hidden">
{/* Hero Section */}
<header
  id="hero"
  className="relative isolate flex min-h-[100svh] overflow-hidden border-b border-white/10 bg-zinc-900 px-4 sm:px-6 text-white"
>
  <div className="pointer-events-none absolute inset-0 z-0">
    <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_15%,rgba(168,85,247,0.22),transparent_45%),radial-gradient(circle_at_84%_20%,rgba(236,72,153,0.16),transparent_40%),radial-gradient(circle_at_50%_85%,rgba(139,92,246,0.14),transparent_50%)]" />
    <div className="absolute inset-0 bg-[linear-gradient(to_bottom,rgba(24,24,27,0.05),rgba(9,9,11,0.85))]" />
    <div className="hero-grid" />
  </div>

  <div className="container relative z-10 flex flex-1 items-center py-20 sm:py-24">
    <div className="mx-auto grid w-full max-w-6xl items-center gap-8 lg:gap-12 lg:grid-cols-[1.2fr_0.8fr]">
      <div className="space-y-5 text-center sm:space-y-6 sm:text-left">
        <div className="space-y-3 sm:space-y-4">
          <div className="flex justify-center sm:justify-start">
            <span className="inline-flex items-center justify-center rounded-full border border-purple-500/35 bg-purple-500/15 px-4 py-1.5 text-[11px] font-semibold uppercase tracking-[0.2em] text-purple-100/90 sm:text-xs sm:tracking-[0.22em]">
              AI/ML Engineer • Based in Jordan
            </span>
          </div>
          <h1 className="text-[clamp(2rem,6vw,4.5rem)] font-semibold leading-[1.14] tracking-tight text-white">
            <span className="block">{headlineName}</span>
            <span className="mt-2 block pb-1 bg-gradient-to-r from-purple-300 via-pink-300 to-purple-200 bg-clip-text text-transparent sm:mt-3 sm:pb-2">
              {headlineRole}
            </span>
          </h1>
          <p className="mx-auto max-w-xl text-sm leading-relaxed text-zinc-400 sm:mx-0 sm:max-w-2xl sm:text-base lg:text-lg">
            I design and ship AI products with measurable impact, from model development to production deployment and monitoring.
          </p>
        </div>

        <div className="flex flex-wrap justify-center gap-2 sm:justify-start sm:gap-3">
          {["LLMs", "Generative AI", "Machine Learning", "MLOps", "AWS"].map(tag => (
            <span key={tag} className="rounded-full border border-purple-500/25 bg-purple-500/10 px-3 py-1 text-xs text-zinc-200">{tag}</span>
          ))}
        </div>

        <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center sm:gap-4">
          <Link href="/blog" className="w-full sm:w-auto">
            <Button className="w-full rounded-full bg-gradient-to-r from-purple-600 to-pink-600 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-purple-500/25 transition-all duration-200 hover:-translate-y-1 hover:from-purple-700 hover:to-pink-700 sm:w-auto sm:text-base">
              <BookOpen className="mr-2 h-4 w-4" />
              Read My Blogs
            </Button>
          </Link>
          <Link href="/resources" className="w-full sm:w-auto">
            <Button
              variant="outline"
              className="w-full rounded-full border-white/30 bg-white/5 px-6 py-3 text-sm font-semibold text-white transition-all duration-200 hover:-translate-y-1 hover:bg-white/10 hover:text-white sm:w-auto sm:text-base"
            >
              <FolderOpen className="mr-2 h-4 w-4" />
              Explore My Resources
            </Button>
          </Link>
        </div>

        <div className="flex justify-center gap-3 pt-1 sm:justify-start">
          {[
            { href: "https://github.com/MahmoudAbuAwd", icon: Github, label: "GitHub" },
            { href: "https://www.linkedin.com/in/mahmoud-abuawd/", icon: Linkedin, label: "LinkedIn" },
            { href: "https://twitter.com/s9mod", icon: Twitter, label: "Twitter" },
            { href: "mailto:mahmoodabuawad08@gmail.com", icon: Mail, label: "Email" },
          ].map(s => (
            <Link key={s.label} href={s.href} target={s.href.startsWith("mailto") ? "_self" : "_blank"} rel="noopener noreferrer">
              <Button
                variant="ghost"
                size="icon"
                className="h-9 w-9 rounded-full bg-white/10 text-white/80 transition-colors duration-200 hover:bg-purple-500/20 hover:text-white sm:h-10 sm:w-10"
              >
                <s.icon className="h-4 w-4 sm:h-5 sm:w-5" />
                <span className="sr-only">{s.label}</span>
              </Button>
            </Link>
          ))}
        </div>
      </div>

      <div className="relative hidden lg:block">
        <div className="rounded-3xl border border-purple-500/20 bg-zinc-800/50 p-6 shadow-2xl shadow-black/30 backdrop-blur-xl xl:p-8">
          <div className="mb-5 flex items-center justify-between">
            <p className="text-sm font-medium uppercase tracking-[0.2em] text-zinc-300">Impact Snapshot</p>
            <span className="rounded-full border border-emerald-300/40 bg-emerald-300/15 px-3 py-1 text-xs font-medium text-emerald-200">
              Available
            </span>
          </div>

          <div className="grid grid-cols-2 gap-3 xl:gap-4">
            <div className="rounded-2xl border border-purple-500/15 bg-zinc-900/60 p-3 xl:p-4">
              <p className="text-2xl font-semibold text-white xl:text-3xl">15+</p>
              <p className="mt-1 text-[10px] uppercase tracking-[0.16em] text-zinc-400 xl:text-xs">Projects Built</p>
            </div>
            <div className="rounded-2xl border border-purple-500/15 bg-zinc-900/60 p-3 xl:p-4">
              <p className="text-2xl font-semibold text-white xl:text-3xl">30+</p>
              <p className="mt-1 text-[10px] uppercase tracking-[0.16em] text-zinc-400 xl:text-xs">Certifications</p>
            </div>
            <div className="rounded-2xl border border-purple-500/15 bg-zinc-900/60 p-3 xl:p-4">
              <p className="text-2xl font-semibold text-white xl:text-3xl">25+</p>
              <p className="mt-1 text-[10px] uppercase tracking-[0.16em] text-zinc-400 xl:text-xs">Open Source PRs</p>
            </div>
            <div className="rounded-2xl border border-purple-500/15 bg-zinc-900/60 p-3 xl:p-4">
              <p className="text-sm font-semibold text-white">AI • ML • Cloud</p>
              <p className="mt-1 text-[10px] uppercase tracking-[0.16em] text-zinc-400 xl:text-xs">Core Domains</p>
            </div>
          </div>

          <div className="mt-5 rounded-2xl border border-purple-500/25 bg-gradient-to-r from-purple-600/12 via-pink-500/10 to-purple-900/12 p-4">
            <p className="text-sm text-zinc-200">
              Building reliable, production-ready AI systems with a strong focus on business outcomes and user experience.
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</header>
      {/* New Quote Section */}
      <InspirationalQuote />

      {/* About Section */}
      <section id="about" className="py-32 relative">
        <div className="container relative z-10">
          <SectionHeading 
            title="About Me" 
            subtitle="My background and journey" 
            className="mb-16"
          />
          <EnhancedAboutSection />
        </div>
      </section>

      {/* Skills Section */}
      <section id="skills" className="py-32 relative">
        <div className="absolute inset-0 z-0">
          <div className="absolute top-1/3 left-1/4 w-64 h-64 bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl opacity-10"></div>
          <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl opacity-10"></div>
        </div>

        <div className="container relative z-10">
          <SectionHeading title="Skills" subtitle="Technologies I work with" />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 mt-16">
            <EnhancedSkillBadge name="PyTorch" level={90} color="orange" />
            <EnhancedSkillBadge name="TensorFlow" level={95} color="blue" />
            <EnhancedSkillBadge name="NLP" level={95} color="green" />
            <EnhancedSkillBadge name="Computer Vision" level={90} color="purple" />
            <EnhancedSkillBadge name="Generative AI" level={90} color="blue" />
            <EnhancedSkillBadge name="Data Analysis" level={90} color="indigo" />
            <EnhancedSkillBadge name="AWS" level={90} color="orange" />
            <EnhancedSkillBadge name="Git & GitHub" level={95} color="blue" />
            <EnhancedSkillBadge name="LLMs" level={85} color="purple" />
            <EnhancedSkillBadge name="Agentic AI" level={80} color="green" />
            <EnhancedSkillBadge name="Prompt Engineering" level={90} color="blue" />
            <EnhancedSkillBadge name="MLOps" level={85} color="yellow" />
          </div>
        </div>
      </section>

      {/* Certifications Section */}
      <section id="certifications" className="py-32 relative">
        <div className="absolute inset-0 z-0">
          <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-yellow-500 rounded-full mix-blend-multiply filter blur-3xl opacity-10"></div>
          <div className="absolute bottom-1/3 right-1/4 w-64 h-64 bg-green-500 rounded-full mix-blend-multiply filter blur-3xl opacity-10"></div>
        </div>

        <div className="container relative z-10">
          <SectionHeading 
            title="Certifications" 
            subtitle="Validations of my expertise" 
          />

          <div className="mt-16">
            <CertificationsCarousel />
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="py-32 relative">
        <div className="absolute inset-0 z-0">
          <div className="absolute top-1/4 left-1/3 w-64 h-64 bg-pink-500 rounded-full mix-blend-multiply filter blur-3xl opacity-10"></div>
          <div className="absolute bottom-1/3 right-1/4 w-64 h-64 bg-yellow-500 rounded-full mix-blend-multiply filter blur-3xl opacity-10"></div>
        </div>

        <div className="container relative z-10">
          <SectionHeading title="Featured Projects" subtitle="Some of my recent work" />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-16">
            <ProjectCard
              title="MedGANs"
              description="GAN architectures for generating medical images, focusing on brain tumor MRI scans."
              tags={["Python", "PyTorch", "Generative AI", "Medical"]}
              image="/git.jpg"
              repoUrl="https://github.com/MahmoudAbuAwd/MedGANs"
              demoUrl={null}
            />
            <ProjectCard
              title="PhishGuard"
              description="ML models for phishing detection comparing Logistic Regression, KNN, and SVC."
              tags={["Python", "Scikit-learn", "ML", "Cybersecurity"]}
              image="/git.jpg"
              repoUrl="https://github.com/MahmoudAbuAwd/PhishGuard-ML-Based-Website-Threat-Detection"
              demoUrl={null}
            />
            <ProjectCard
              title="FluentWave"
              description="Web-based speech-to-text system enhanced with Word2Vec semantic vectors."
              tags={["Python", "Flask", "NLP", "Web App"]}
              image="/git.jpg"
              repoUrl="https://github.com/MahmoudAbuAwd/FluentWave-Web-Based-Speech-Transcriber"
              demoUrl={null}
            />
            <ProjectCard
              title="Price Pilot"
              description="AI-powered multi-agent system for e-commerce operations."
              tags={["Python", "AI Agents", "E-commerce", "LLMs"]}
              image="/git.jpg"
              repoUrl="https://github.com/MahmoudAbuAwd/price-pilot"
              demoUrl="https://www.price-pilot.site"
            />
            <ProjectCard
              title="Network Anomaly Detection"
              description="Isolation Forest and Deep Learning for detecting network traffic anomalies."
              tags={["Python", "Deep Learning", "AI", "Cybersecurity"]}
              image="/git.jpg"
              repoUrl="https://github.com/MahmoudAbuAwd/Anomaly-Detection-in-Network-Traffic-Using-Isolation-Forest-and-Deep-Learning"
              demoUrl={null}
            />
            <ProjectCard
              title="ML Toolkit"
              description="Collection of supervised & unsupervised ML models for various tasks."
              tags={["Python", "Scikit-learn", "ML", "Data Science"]}
              image="/git.jpg"
              repoUrl="https://github.com/MahmoudAbuAwd/MLToolkit-A-Collection-of-Supervised-Unsupervised-Models"
              demoUrl={null}
            />
          </div>
        </div>
      </section>

      {/* Experience Section */}
      <section id="experience" className="py-32 relative">
        <div className="absolute inset-0 z-0">
          <div className="absolute top-1/3 right-1/3 w-64 h-64 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl opacity-10"></div>
          <div className="absolute bottom-1/4 left-1/4 w-64 h-64 bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl opacity-10"></div>
        </div>

        <div className="container relative z-10">
          <SectionHeading title="Work Experience" subtitle="My professional journey" />

          <div className="mt-16">
            <Timeline />
          </div>
        </div>
      </section>
        

      {/* GitHub Activity Section */}
      <section id="activity" className="py-24 relative">
        <div className="absolute inset-0 z-0">
          <div className="absolute top-1/3 left-1/4 w-64 h-64 bg-purple-900/20 rounded-full mix-blend-multiply filter blur-3xl opacity-20"></div>
          <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-indigo-900/20 rounded-full mix-blend-multiply filter blur-3xl opacity-20"></div>
        </div>

        <div className="container relative z-10">
          <SectionHeading 
            title="GitHub Contributions" 
            subtitle="My recent GitHub contributions" 
          />

          <div className="mt-12 max-w-3xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="p-6 rounded-2xl bg-gradient-to-br from-zinc-900/50 to-zinc-800/30 border border-zinc-700/50 backdrop-blur-sm"
            >
              <GitHubActivity />
            </motion.div>
          </div>
        </div>
      </section>

      </main>

      <SiteFooter />

    </div>
  )
}
