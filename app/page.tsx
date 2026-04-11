"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import {
  Github,
  Linkedin,
  Mail,
  Twitter,
  Download,
  ArrowUpRight,
  ExternalLink,
  FileText,
  ChevronLeft,
  ChevronRight,
  MapPin,
  Briefcase,
  GraduationCap,
  Globe,
} from "lucide-react"
import React from "react"

import { Button } from "@/components/ui/button"
import { ProjectCard } from "@/components/project-card"
import { Timeline } from "@/components/timeline"
import { FloatingNav } from "@/components/floating-nav"
import { SiteFooter } from "@/components/site-footer"
import { SectionHeading } from "@/components/section-heading"
import { GitHubActivity } from "@/components/ui/github-activity"
import { SkillsShowcase } from "@/components/skills-showcase"

/* ------------------------------------------------------------------ */
/*  Data                                                               */
/* ------------------------------------------------------------------ */

const socialLinks = [
  { href: "https://github.com/MahmoudAbuAwd", icon: Github, label: "GitHub" },
  { href: "https://www.linkedin.com/in/mahmoud-abuawd-247290225/", icon: Linkedin, label: "LinkedIn" },
  { href: "https://twitter.com/s9mod", icon: Twitter, label: "Twitter" },
  { href: "mailto:mahmoodabuawad08@gmail.com", icon: Mail, label: "Email" },
]

const projects = [
  {
    title: "MedGANs",
    description: "GAN architectures for generating synthetic medical images, focusing on brain tumor MRI scans.",
    tags: ["PyTorch", "Generative AI", "Medical Imaging"],
    repoUrl: "https://github.com/MahmoudAbuAwd/MedGANs",
    demoUrl: null,
  },
  {
    title: "PhishGuard",
    description: "ML-based phishing detection comparing Logistic Regression, KNN, and SVC classifiers.",
    tags: ["Scikit-learn", "ML", "Cybersecurity"],
    repoUrl: "https://github.com/MahmoudAbuAwd/PhishGuard-ML-Based-Website-Threat-Detection",
    demoUrl: null,
  },
  {
    title: "FluentWave",
    description: "Web-based speech-to-text system enhanced with Word2Vec semantic vectors.",
    tags: ["Flask", "NLP", "Web App"],
    repoUrl: "https://github.com/MahmoudAbuAwd/FluentWave-Web-Based-Speech-Transcriber",
    demoUrl: null,
  },
  {
    title: "Price Pilot",
    description: "AI-powered multi-agent system for e-commerce pricing and operations.",
    tags: ["AI Agents", "LLMs", "E-commerce"],
    repoUrl: "https://github.com/MahmoudAbuAwd/price-pilot",
    demoUrl: null,
  },
  {
    title: "Network Anomaly Detection",
    description: "Isolation Forest and deep learning for detecting anomalies in network traffic.",
    tags: ["Deep Learning", "Cybersecurity", "Anomaly Detection"],
    repoUrl: "https://github.com/MahmoudAbuAwd/Anomaly-Detection-in-Network-Traffic-Using-Isolation-Forest-and-Deep-Learning",
    demoUrl: null,
  },
  {
    title: "ML Toolkit",
    description: "Collection of supervised and unsupervised ML models for classification, regression, and clustering.",
    tags: ["Scikit-learn", "ML", "Data Science"],
    repoUrl: "https://github.com/MahmoudAbuAwd/MLToolkit-A-Collection-of-Supervised-Unsupervised-Models",
    demoUrl: null,
  },
]

const certifications = [
  { file: "Mahmoud Abu Awad - AWS Certified AI Practitioner.pdf", label: "AWS Certified AI Practitioner", issuer: "Amazon Web Services", date: "May 2025" },
  { file: "Deep-Learning-specialization.pdf", label: "Deep Learning Specialization", issuer: "DeepLearning.AI", date: "Sep 2024" },
  { file: "DeepLearning.AI-TensorFlow-Developer.pdf", label: "TensorFlow Developer Certificate", issuer: "DeepLearning.AI", date: "Feb 2025" },
  { file: "aws-cloud-practitioner-essentials.pdf", label: "Cloud Practitioner Essentials", issuer: "Amazon Web Services", date: "Jun 2025" },
  { file: "Artificial-Intelligence-on-Microsoft-Azure.pdf", label: "AI on Microsoft Azure", issuer: "Microsoft", date: "Jun 2025" },
  { file: "Microsoft-Azure-Machine-Learning.pdf", label: "Azure Machine Learning", issuer: "Microsoft", date: "Jul 2025" },
  { file: "Coursera RPTTHMOVRFDQ.pdf", label: "Build RAG Applications", issuer: "IBM", date: "Oct 2025" },
  { file: "Advanced RAG-with-Vector-Databases-and-Retrievers.pdf", label: "Advanced RAG with Vector Databases", issuer: "IBM", date: "Oct 2025" },
  { file: "develop-Generative-AI-Applications-Get-Started.pdf", label: "Develop Generative AI Applications", issuer: "IBM", date: "Oct 2025" },
  { file: "Build-Multimodal-Generative-AI-Applications.pdf", label: "Build Multimodal Gen AI Apps", issuer: "IBM", date: "Nov 2025" },
  { file: "Coursera QVU2E4HXVVDU.pdf", label: "Fundamentals of Building AI Agents", issuer: "IBM", date: "Feb 2026" },
  { file: "neural-networks.pdf", label: "Neural Networks and Deep Learning", issuer: "DeepLearning.AI", date: "Apr 2024" },
  { file: "Coursera WPZETQXD9APJ.pdf", label: "Improving Deep Neural Networks", issuer: "DeepLearning.AI", date: "Jul 2024" },
  { file: "Coursera U7XAVF5N39L4.pdf", label: "Structuring ML Projects", issuer: "DeepLearning.AI", date: "Aug 2024" },
  { file: "Convolutional-Neural-Networks.pdf", label: "Convolutional Neural Networks", issuer: "DeepLearning.AI", date: "Sep 2024" },
  { file: "Sequence-Models.pdf", label: "Sequence Models", issuer: "DeepLearning.AI", date: "Sep 2024" },
  { file: "Introduction-to-TensorFlow-for-Artificial-Intelligence-Machine-Learning-and-Deep-Learning.pdf", label: "Introduction to TensorFlow", issuer: "DeepLearning.AI", date: "Oct 2024" },
  { file: "Convolutional-Neural-Networks-in-TensorFlow.pdf", label: "CNNs in TensorFlow", issuer: "DeepLearning.AI", date: "Jan 2025" },
  { file: "Coursera VF311PYYKCJ2.pdf", label: "NLP in TensorFlow", issuer: "DeepLearning.AI", date: "Jan 2025" },
  { file: "Coursera QUROULK5RKLZ.pdf", label: "Sequences, Time Series and Prediction", issuer: "DeepLearning.AI", date: "Feb 2025" },
  { file: "Harnessing-the-Power-of-Data-with-Power-BI.pdf", label: "Power of Data with Power BI", issuer: "Microsoft", date: "Apr 2025" },
  { file: "Preparing-Data-for-Analysis-with-Microsoft-Excel.pdf", label: "Data Analysis with Excel", issuer: "Microsoft", date: "Mar 2025" },
  { file: "Intensive-power-bi-course.pdf", label: "Intensive Power BI Course", issuer: "Microsoft", date: "2024" },
  { file: "AWS-AI-PRACTITIONER-COURSE.pdf", label: "AWS AI Practitioner Course", issuer: "Amazon Web Services", date: "2025" },
  { file: "AWS-Becoming-Machine-learning-engineer.pdf", label: "Becoming a Machine Learning Engineer", issuer: "Amazon Web Services", date: "2025" },
  { file: "Python-for-DataScience-MachineLearning.pdf", label: "Python for Data Science & ML", issuer: "Udemy", date: "Mar 2024" },
  { file: "Embedded-Systems.pdf", label: "Embedded Systems Design", issuer: "INJO4", date: "2024" },
  { file: "Scientific-Research-Paper-Award.pdf", label: "Scientific Research Paper Award", issuer: "University of Jordan", date: "2023" },
]

/* ------------------------------------------------------------------ */
/*  Floating Glass Orb                                                 */
/* ------------------------------------------------------------------ */

function GlassOrb({ className }: { className?: string }) {
  return (
    <div
      className={`pointer-events-none absolute rounded-full opacity-30 blur-3xl ${className ?? ""}`}
      aria-hidden
    />
  )
}

/* ------------------------------------------------------------------ */
/*  Certifications — Card Carousel with Arrows                         */
/* ------------------------------------------------------------------ */

function CertificationsSection() {
  const [current, setCurrent] = React.useState(0)
  const [direction, setDirection] = React.useState(0) // -1 left, 1 right
  const total = certifications.length

  const go = (dir: number) => {
    setDirection(dir)
    setCurrent((c) => (c + dir + total) % total)
  }

  const getVisible = () => {
    const indices = []
    for (let offset = -1; offset <= 1; offset++) {
      indices.push((current + offset + total) % total)
    }
    return indices
  }

  const visible = getVisible()

  const cardContent = (c: typeof certifications[0]) => (
    <>
      <div className="flex items-center gap-2 mb-4">
        <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-white/[0.06] border border-white/[0.08]">
          <GraduationCap className="h-4 w-4 text-pal-200" />
        </div>
        <span className="text-xs font-medium text-pal-300 uppercase tracking-wider">{c.issuer}</span>
      </div>
      <h3 className="text-base font-semibold text-white leading-snug min-h-[3rem] flex items-center">{c.label}</h3>
      <div className="mt-4 flex items-center justify-between pt-3 border-t border-white/[0.06]">
        <span className="text-xs text-pal-300">{c.date}</span>
        <span className="text-xs text-pal-200 flex items-center gap-1">
          View <ExternalLink className="h-3 w-3" />
        </span>
      </div>
    </>
  )

  return (
    <div className="space-y-6">
      {/* Desktop: 3 cards */}
      <div className="hidden sm:grid sm:grid-cols-3 gap-4">
        {visible.map((idx, pos) => {
          const c = certifications[idx]
          const isCenter = pos === 1
          return (
            <motion.a
              key={`d-${current}-${pos}`}
              href={`/Certification/${encodeURIComponent(c.file)}`}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, x: direction * 60 }}
              animate={{ opacity: isCenter ? 1 : 0.5, x: 0, scale: isCenter ? 1 : 0.95 }}
              transition={{ duration: 0.4, ease: [0.25, 1, 0.5, 1] }}
              className={`flex flex-col justify-between rounded-2xl glass p-6 h-[180px] transition-shadow duration-300 ${
                isCenter ? "border-white/[0.14] shadow-[0_12px_40px_rgba(166,177,225,0.08)]" : ""
              }`}
            >
              {cardContent(c)}
            </motion.a>
          )
        })}
      </div>

      {/* Mobile: 1 card */}
      <div className="sm:hidden overflow-hidden">
        <motion.a
          key={`m-${current}`}
          href={`/Certification/${encodeURIComponent(certifications[current].file)}`}
          target="_blank"
          rel="noopener noreferrer"
          initial={{ opacity: 0, x: direction * 80 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.35, ease: [0.25, 1, 0.5, 1] }}
          className="flex flex-col justify-between rounded-2xl glass p-6 h-[180px] border-white/[0.14]"
        >
          {cardContent(certifications[current])}
        </motion.a>
      </div>

      {/* Controls */}
      <div className="flex items-center justify-center gap-5">
        <button
          onClick={() => go(-1)}
          aria-label="Previous certification"
          className="flex h-10 w-10 items-center justify-center rounded-full glass-pill transition-all duration-200 hover:bg-white/[0.1] hover:border-white/[0.15] active:scale-90"
        >
          <ChevronLeft className="h-5 w-5 text-pal-200" />
        </button>

        <span className="text-sm text-pal-300 tabular-nums min-w-[4rem] text-center">
          <span className="text-white font-semibold">{current + 1}</span> / {total}
        </span>

        <button
          onClick={() => go(1)}
          aria-label="Next certification"
          className="flex h-10 w-10 items-center justify-center rounded-full glass-pill transition-all duration-200 hover:bg-white/[0.1] hover:border-white/[0.15] active:scale-90"
        >
          <ChevronRight className="h-5 w-5 text-pal-200" />
        </button>
      </div>
    </div>
  )
}

/* ------------------------------------------------------------------ */
/*  Page                                                               */
/* ------------------------------------------------------------------ */

export default function Portfolio() {
  const handleDownloadResume = () => {
    const link = document.createElement("a")
    link.href = "/resume/Resume.pdf"
    link.download = "Resume.pdf"
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  return (
    <div className="relative min-h-screen bg-pal-950 text-white overflow-hidden">
      {/* ── Global floating orbs for depth ── */}
      <GlassOrb className="bg-pal-500/40 h-96 w-96 -top-48 -left-48 animate-float" />
      <GlassOrb className="bg-pal-200/30 h-72 w-72 top-[60vh] -right-36 animate-float-reverse" />
      <GlassOrb className="bg-pal-400/20 h-80 w-80 top-[150vh] -left-40 animate-float-slow" />
      <GlassOrb className="bg-pal-100/15 h-64 w-64 top-[250vh] right-0 animate-float" />
      <GlassOrb className="bg-pal-500/25 h-72 w-72 top-[350vh] -left-20 animate-float-reverse" />

      <a
        href="#main-content"
        className="sr-only focus-visible:fixed focus-visible:top-4 focus-visible:left-4 focus-visible:z-50 focus-visible:rounded-lg focus-visible:bg-pal-900 focus-visible:px-4 focus-visible:py-2 focus-visible:text-white focus-visible:shadow-lg focus-visible:clip-auto focus-visible:h-auto focus-visible:w-auto focus-visible:overflow-visible focus-visible:whitespace-normal focus-visible:m-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-pal-400"
      >
        Skip to main content
      </a>

      <FloatingNav />

      <main id="main-content" className="relative z-10">

        {/* ══════════════════════════════════════════════════════════
            HERO
        ══════════════════════════════════════════════════════════ */}
        <header className="relative flex min-h-[100svh] items-center overflow-hidden px-4 sm:px-6">
          <div className="pointer-events-none absolute inset-0 hero-aurora" />
          <div className="pointer-events-none absolute inset-0 noise-overlay" />
          <div className="pointer-events-none absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-pal-950 to-transparent" />

          <div className="relative z-10 mx-auto w-full max-w-5xl py-24">
            <div className="grid items-center gap-12 lg:grid-cols-[1.1fr_0.9fr]">
              {/* Left — copy */}
              <motion.div
                className="space-y-6 text-center sm:text-left"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, ease: "easeOut" }}
              >
                <motion.span
                  className="inline-block rounded-full glass-pill px-4 py-1.5 text-xs font-medium uppercase tracking-widest text-pal-100"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.4, delay: 0.2 }}
                >
                  AI &amp; ML Engineer
                </motion.span>

                <h1 className="text-4xl font-bold leading-tight tracking-tight sm:text-5xl lg:text-6xl">
                  Mahmoud
                  <br />
                  <span className="bg-gradient-to-r from-pal-200 to-pal-50 bg-clip-text text-transparent">
                    AbuAwd
                  </span>
                </h1>

                <p className="mx-auto max-w-lg text-base leading-relaxed text-pal-200 sm:mx-0 sm:text-lg">
                  I design and ship AI products with measurable impact — from model
                  development to production deployment and monitoring.
                </p>

                <div className="flex flex-col gap-3 sm:flex-row">
                  <Button
                    className="rounded-xl bg-pal-500 px-5 py-2.5 text-sm font-medium text-white shadow-lg shadow-pal-500/25 hover:bg-pal-400 hover:shadow-pal-400/30 transition-all duration-300"
                    onClick={handleDownloadResume}
                  >
                    <Download className="mr-2 h-4 w-4" />
                    Download Resume
                  </Button>
                  <Button
                    variant="outline"
                    className="rounded-xl border-white/[0.1] bg-white/[0.04] backdrop-blur-sm px-5 py-2.5 text-sm font-medium text-pal-100 hover:bg-white/[0.08] hover:text-white transition-all duration-300"
                    asChild
                  >
                    <Link href="/contact">
                      Get in Touch
                      <ArrowUpRight className="ml-1.5 h-3.5 w-3.5" />
                    </Link>
                  </Button>
                </div>

                <div className="flex justify-center gap-2 sm:justify-start">
                  {socialLinks.map((s) => (
                    <Link
                      key={s.label}
                      href={s.href}
                      target={s.href.startsWith("mailto") ? "_self" : "_blank"}
                      rel="noopener noreferrer"
                      aria-label={s.label}
                      className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/[0.08] bg-white/[0.03] text-pal-300 backdrop-blur-sm transition-all duration-300 hover:bg-white/[0.08] hover:text-white hover:-translate-y-0.5 hover:border-white/[0.15]"
                    >
                      <s.icon className="h-4 w-4" />
                    </Link>
                  ))}
                </div>
              </motion.div>

              {/* Right — glass stats card */}
              <motion.div
                className="hidden lg:block"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
              >
                <div className="glass-strong rounded-3xl p-8">
                  <div className="mb-6 flex items-center justify-between">
                    <p className="text-xs font-medium uppercase tracking-widest text-pal-300">
                      At a Glance
                    </p>
                    <span className="flex items-center gap-1.5 text-xs text-emerald-400">
                      <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
                      Available for work
                    </span>
                  </div>

                  <div className="grid grid-cols-3 gap-3">
                    {[
                      { value: "15+", label: "Projects" },
                      { value: "30+", label: "Certifications" },
                      { value: "30+", label: "OS PRs" },
                    ].map((s) => (
                      <div key={s.label} className="rounded-2xl bg-white/[0.04] border border-white/[0.06] p-4 text-center">
                        <p className="text-2xl font-bold text-white">{s.value}</p>
                        <p className="mt-1 text-[11px] uppercase tracking-wider text-pal-300">{s.label}</p>
                      </div>
                    ))}
                  </div>

                  <div className="mt-6 space-y-3 text-sm">
                    {[
                      { icon: MapPin, label: "Location", value: "Amman, Jordan" },
                      { icon: Briefcase, label: "Focus", value: "AI \u00b7 ML \u00b7 Cloud" },
                      { icon: Globe, label: "Languages", value: "Arabic, English" },
                    ].map((item) => (
                      <div key={item.label} className="flex items-center justify-between border-b border-white/[0.06] pb-2.5 last:border-0 last:pb-0">
                        <span className="flex items-center gap-2 text-pal-300">
                          <item.icon className="h-3.5 w-3.5" />
                          {item.label}
                        </span>
                        <span className="text-pal-100">{item.value}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </header>

        {/* ══════════════════════════════════════════════════════════
            ABOUT — Glass Bento Grid
        ══════════════════════════════════════════════════════════ */}
        <section id="about" className="py-24 px-4 sm:px-6">
          <div className="mx-auto max-w-5xl">
            <SectionHeading title="About Me" subtitle="Background" className="mb-12" />

            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              <motion.div
                className="sm:col-span-2 rounded-3xl glass p-8"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
                viewport={{ once: true }}
              >
                <div className="space-y-4 text-pal-200 leading-relaxed">
                  <p>
                    I&rsquo;m an AI engineer with hands-on experience building intelligent applications
                    using machine learning and deep learning. My work spans end-to-end AI
                    solutions — from research and model training through to production
                    deployment on cloud infrastructure.
                  </p>
                  <p>
                    Certified as an AWS AI Practitioner, I specialize in delivering scalable
                    AI products across web and cloud environments. I&rsquo;ve built solutions
                    using GANs, NLP pipelines, agentic AI systems, and RAG architectures that
                    solve real business problems.
                  </p>
                </div>
              </motion.div>

              <motion.div
                className="rounded-3xl glass p-6"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.1 }}
                viewport={{ once: true }}
              >
                <p className="text-xs font-medium uppercase tracking-widest text-pal-200 mb-4">Highlights</p>
                <ul className="space-y-3 text-sm text-pal-100">
                  {[
                    "AI Engineer at Kawkab AI",
                    "AWS AI Practitioner Certified",
                    "Founder of MedGAN AI",
                    "30+ professional certifications",
                    "Active open-source contributor",
                    "IEEE & GDG volunteer",
                  ].map((item) => (
                    <li key={item} className="flex items-start gap-2">
                      <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-pal-200" />
                      {item}
                    </li>
                  ))}
                </ul>
              </motion.div>

              {[
                { icon: Briefcase, value: "15+", label: "Projects Built", color: "text-pal-200" },
                { icon: GraduationCap, value: "30+", label: "Certifications", color: "text-blue-400" },
                { icon: Github, value: "30+", label: "Open-Source PRs", color: "text-emerald-400" },
              ].map((stat, i) => (
                <motion.div
                  key={stat.label}
                  className="group rounded-3xl glass p-6 flex items-center gap-4 transition-all duration-500 hover:border-white/[0.14]"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: 0.15 + i * 0.05 }}
                  viewport={{ once: true }}
                >
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-white/[0.05] border border-white/[0.08]">
                    <stat.icon className={`h-5 w-5 ${stat.color}`} />
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-white">{stat.value}</p>
                    <p className="text-xs text-pal-300">{stat.label}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ══════════════════════════════════════════════════════════
            SKILLS — Categorized Glass Grid
        ══════════════════════════════════════════════════════════ */}
        <section id="skills" className="py-24">
          <div className="mx-auto max-w-5xl px-4 sm:px-6 mb-12">
            <SectionHeading title="Skills & Tools" subtitle="Tech stack" />
          </div>
          <SkillsShowcase />
        </section>

        {/* ══════════════════════════════════════════════════════════
            PROJECTS
        ══════════════════════════════════════════════════════════ */}
        <section id="projects" className="py-24 px-4 sm:px-6">
          <div className="mx-auto max-w-5xl">
            <SectionHeading title="Projects" subtitle="Featured work" className="mb-12" />

            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {projects.map((p) => (
                <ProjectCard key={p.title} {...p} />
              ))}
            </div>

            <motion.div
              className="mt-10 text-center"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.4, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <Link
                href="https://github.com/MahmoudAbuAwd"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-sm text-pal-200 transition-colors hover:text-white"
              >
                View all projects on GitHub
                <ArrowUpRight className="h-3.5 w-3.5" />
              </Link>
            </motion.div>
          </div>
        </section>

        {/* ══════════════════════════════════════════════════════════
            EXPERIENCE
        ══════════════════════════════════════════════════════════ */}
        <section id="experience" className="py-24 px-4 sm:px-6">
          <div className="mx-auto max-w-3xl">
            <SectionHeading title="Experience" subtitle="Career" className="mb-12" />
            <Timeline />
          </div>
        </section>

        {/* ══════════════════════════════════════════════════════════
            CERTIFICATIONS — Visual Glass Cards
        ══════════════════════════════════════════════════════════ */}
        <section id="certifications" className="py-24 px-4 sm:px-6">
          <div className="mx-auto max-w-5xl">
            <div className="flex items-end justify-between mb-12">
              <SectionHeading title="Certifications" subtitle="Credentials" />
              <span className="hidden sm:inline-block glass-pill rounded-full px-3 py-1 text-xs font-medium text-pal-200">
                {certifications.length} total
              </span>
            </div>
            <CertificationsSection />
          </div>
        </section>

        {/* ══════════════════════════════════════════════════════════
            GITHUB ACTIVITY
        ══════════════════════════════════════════════════════════ */}
        <section id="activity" className="py-24 px-4 sm:px-6">
          <div className="mx-auto max-w-5xl">
            <SectionHeading title="GitHub Activity" subtitle="Open source" className="mb-12" />
            <GitHubActivity />
          </div>
        </section>

        {/* ── CTA Banner ─────────────────────────────────────────── */}
        <section className="py-24 px-4 sm:px-6">
          <div className="mx-auto max-w-3xl">
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              viewport={{ once: true }}
              className="relative overflow-hidden rounded-3xl glass-strong p-10 text-center"
            >
              {/* Background accent */}
              <div className="pointer-events-none absolute -top-20 left-1/2 -translate-x-1/2 h-40 w-80 rounded-full bg-gradient-to-r from-pal-500/20 to-pal-200/15 blur-3xl" />

              <div className="relative">
                <h2 className="text-2xl font-bold text-white sm:text-3xl">
                  Let&rsquo;s build something together
                </h2>
                <p className="mt-3 text-pal-200 max-w-md mx-auto">
                  I&rsquo;m always open to discussing new projects, ideas, or opportunities to create impactful AI solutions.
                </p>
                <div className="mt-6 flex flex-col sm:flex-row items-center justify-center gap-3">
                  <Button
                    className="rounded-xl bg-pal-500 px-6 py-2.5 text-sm font-medium text-white shadow-lg shadow-pal-500/25 hover:bg-pal-400 transition-all duration-300"
                    asChild
                  >
                    <Link href="/contact">
                      <Mail className="mr-2 h-4 w-4" />
                      Get in Touch
                    </Link>
                  </Button>
                  <Button
                    variant="outline"
                    className="rounded-xl border-white/[0.1] bg-white/[0.04] backdrop-blur-sm px-6 py-2.5 text-sm font-medium text-pal-100 hover:bg-white/[0.08] hover:text-white transition-all duration-300"
                    onClick={handleDownloadResume}
                  >
                    <Download className="mr-2 h-4 w-4" />
                    Resume
                  </Button>
                </div>
              </div>
            </motion.div>
          </div>
        </section>
      </main>

      <SiteFooter />
    </div>
  )
}
