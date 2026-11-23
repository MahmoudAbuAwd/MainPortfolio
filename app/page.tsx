"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import {
  Download,
  ArrowUpRight,
  ExternalLink,
  ChevronLeft,
  ChevronRight,
  FileText,
} from "lucide-react"
import React from "react"

import { ProjectCard } from "@/components/project-card"
import { Timeline } from "@/components/timeline"
import { SiteFooter } from "@/components/site-footer"
import { SectionHeading } from "@/components/section-heading"
import { WindowBar } from "@/components/window-bar"
import { GitHubActivity } from "@/components/ui/github-activity"
import { SkillsShowcase } from "@/components/skills-showcase"
import { CountUp } from "@/components/count-up"
import { fadeUp, staggerContainer, staggerItem, viewportOnce, easeOutExpo } from "@/lib/animations"

/* ------------------------------------------------------------------ */
/*  Data                                                               */
/* ------------------------------------------------------------------ */

const socialLinks = [
  { href: "https://github.com/MahmoudAbuAwd", label: "github" },
  { href: "https://www.linkedin.com/in/mahmoud-abuawd-247290225/", label: "linkedin" },
  { href: "https://twitter.com/s9mod", label: "twitter" },
  { href: "mailto:mahmoodabuawad08@gmail.com", label: "email" },
]

const stats = [
  { value: "15+", label: "Projects", fill: 0.6 },
  { value: "30+", label: "Certifications", fill: 1 },
  { value: "30+", label: "Open-source PRs", fill: 0.85 },
]

const highlights = [
  "AI Developer Associate at the Ministry of Interior of Jordan",
  "AI Engineer at Kawkab AI",
  "AWS AI & Cloud Practitioner Certified",
  "Founder of MedGAN AI",
  "30+ professional certifications",
  "Active open-source contributor",
  "IEEE & GDG volunteer",
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
  { file: "AWS-Certified-Cloud-Practitioner.pdf", label: "AWS Certified Cloud Practitioner", issuer: "Amazon Web Services", date: "Sep 2026" },
  { file: "Cert60094732260.pdf", label: "Azure Fundamentals", issuer: "Microsoft", date: "Jun 2026" },
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
/*  ASCII stat bar                                                     */
/* ------------------------------------------------------------------ */

function StatBar({ value, label, fill }: { value: string; label: string; fill: number }) {
  return (
    <div className="text-sm">
      <div className="flex items-baseline justify-between gap-3">
        <span className="text-pal-300">{label}</span>
        <span className="font-semibold text-pal-50">
          <CountUp value={value} />
        </span>
      </div>
      <div className="mt-1.5 h-3 w-full bg-pal-700/40" aria-hidden>
        <div
          className="h-full bg-acc"
          style={{
            width: `${Math.round(fill * 100)}%`,
            backgroundImage:
              "repeating-linear-gradient(90deg, transparent 0 6px, rgba(0,0,0,0.5) 6px 8px)",
          }}
        />
      </div>
    </div>
  )
}

/* ------------------------------------------------------------------ */
/*  Certifications — terminal card carousel                            */
/* ------------------------------------------------------------------ */

function CertificationsSection() {
  const [current, setCurrent] = React.useState(0)
  const [direction, setDirection] = React.useState(0)
  const total = certifications.length

  const go = (dir: number) => {
    setDirection(dir)
    setCurrent((c) => (c + dir + total) % total)
  }

  const getVisible = () => {
    const indices = []
    for (let offset = -1; offset <= 1; offset++) indices.push((current + offset + total) % total)
    return indices
  }

  const visible = getVisible()

  const cardContent = (c: (typeof certifications)[0]) => (
    <>
      <div className="flex items-center justify-between text-xs">
        <span className="flex items-center gap-1.5 text-term-green">
          <FileText className="h-3.5 w-3.5" />
          {c.issuer}
        </span>
        <span className="text-pal-400">PDF</span>
      </div>
      <h3 className="mt-3 flex min-h-[2.75rem] items-center font-display text-2xl leading-[1.05] text-pal-50">
        {c.label}
      </h3>
      <div className="mt-3 flex items-center justify-between border-t border-dashed border-hair/[0.1] pt-3 text-xs">
        <span className="text-pal-400">{c.date}</span>
        <span className="flex items-center gap-1 text-acc">
          Open <ExternalLink className="h-3 w-3" />
        </span>
      </div>
    </>
  )

  return (
    <div className="space-y-6">
      {/* Desktop: 3 cards */}
      <div className="hidden gap-4 sm:grid sm:grid-cols-3">
        {visible.map((idx, pos) => {
          const c = certifications[idx]
          const isCenter = pos === 1
          return (
            <motion.a
              key={`d-${current}-${pos}`}
              href={`/Certification/${encodeURIComponent(c.file)}`}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, x: direction * 50 }}
              animate={{ opacity: isCenter ? 1 : 0.45, x: 0 }}
              whileHover={isCenter ? { y: -5 } : undefined}
              transition={{ duration: 0.4, ease: easeOutExpo }}
              className={`tv-card flex h-[170px] flex-col justify-between p-5 ${isCenter ? "!border-acc/50" : ""}`}
            >
              {cardContent(c)}
            </motion.a>
          )
        })}
      </div>

      {/* Mobile: 1 card */}
      <div className="overflow-hidden sm:hidden">
        <motion.a
          key={`m-${current}`}
          href={`/Certification/${encodeURIComponent(certifications[current].file)}`}
          target="_blank"
          rel="noopener noreferrer"
          initial={{ opacity: 0, x: direction * 60 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.35, ease: easeOutExpo }}
          className="tv-card flex h-[170px] flex-col justify-between !border-acc/50 p-5"
        >
          {cardContent(certifications[current])}
        </motion.a>
      </div>

      {/* Controls */}
      <div className="flex items-center justify-center gap-5 font-mono">
        <button
          onClick={() => go(-1)}
          aria-label="Previous certification"
          className="flex h-9 w-9 items-center justify-center rounded-full border border-hair/[0.18] text-pal-200 transition-colors hover:border-acc/50 hover:text-acc active:scale-90"
        >
          <ChevronLeft className="h-4 w-4" />
        </button>
        <span className="min-w-[5rem] text-center text-sm text-pal-400 tabular-nums">
          <span className="font-semibold text-acc">{String(current + 1).padStart(2, "0")}</span>
          <span className="text-pal-500"> / {total}</span>
        </span>
        <button
          onClick={() => go(1)}
          aria-label="Next certification"
          className="flex h-9 w-9 items-center justify-center rounded-full border border-hair/[0.18] text-pal-200 transition-colors hover:border-acc/50 hover:text-acc active:scale-90"
        >
          <ChevronRight className="h-4 w-4" />
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
    link.href = "/Resume.pdf"
    link.download = "Resume.pdf"
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  return (
    <div className="relative min-h-[100cqh] overflow-hidden bg-transparent text-pal-100">
      <div className="terminal-atmosphere" aria-hidden />

      <a
        href="#main-content"
        className="sr-only focus-visible:fixed focus-visible:left-4 focus-visible:top-4 focus-visible:z-50 focus-visible:h-auto focus-visible:w-auto focus-visible:rounded-sm focus-visible:bg-pal-900 focus-visible:px-4 focus-visible:py-2 focus-visible:text-acc focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-acc"
      >
        Skip to main content
      </a>


      <main id="main-content" className="relative z-10">
        {/* ════════════════ HERO ════════════════ */}
        <header
          id="home"
          data-channel="Home"
          className="relative flex min-h-[100cqh] items-center pb-16 pt-20 sm:pt-24"
        >
          <div className="mx-auto w-full max-w-6xl">
            <div className="grid grid-cols-[minmax(0,1fr)] items-center gap-12 lg:grid-cols-[minmax(0,1.25fr)_minmax(0,0.75fr)]">
              <motion.div variants={staggerContainer(0.12, 0.7)} initial="hidden" animate="show">
                <motion.p
                  variants={staggerItem}
                  className="flex items-center gap-2.5 font-display text-2xl text-term-green"
                >
                  <span className="h-2 w-2 animate-pulse rounded-full bg-term-green" />
                  Available for work
                </motion.p>

                <motion.h1
                  variants={staggerItem}
                  className="crt-aberration mt-3 font-display text-[clamp(4rem,7.6vw,7.25rem)] leading-[0.86] text-pal-50"
                >
                  Mahmoud
                  <br />
                  AbuAwd
                </motion.h1>

                <motion.p
                  variants={staggerItem}
                  className="crt-glow mt-6 font-display text-3xl text-acc sm:text-4xl"
                >
                  AI / ML Engineer
                  <span className="text-pal-400"> in Amman, Jordan</span>
                </motion.p>

                <motion.p
                  variants={staggerItem}
                  className="mt-5 max-w-md font-sans text-base leading-relaxed text-pal-300 sm:text-lg"
                >
                  I design and ship AI products with measurable impact, from model development
                  to production deployment and monitoring.
                </motion.p>

                <motion.div variants={staggerItem} className="mt-8 flex flex-wrap gap-3">
                  <button onClick={handleDownloadResume} className="osd-btn !px-5 !py-1.5 !text-2xl">
                    <Download className="h-4 w-4" aria-hidden />
                    Download résumé
                  </button>
                  <Link
                    href="/contact"
                    className="inline-flex items-center gap-1.5 border border-hair/[0.18] px-5 py-1.5 font-display text-2xl leading-[1.2] text-pal-100 transition-colors hover:border-acc/60 hover:text-acc"
                  >
                    Get in touch
                    <ArrowUpRight className="h-4 w-4" aria-hidden />
                  </Link>
                </motion.div>

                <motion.div
                  variants={staggerItem}
                  className="mt-6 flex flex-wrap gap-x-6 gap-y-1 font-display text-2xl"
                >
                  {socialLinks.map((s) => (
                    <Link
                      key={s.label}
                      href={s.href}
                      target={s.href.startsWith("mailto") ? "_self" : "_blank"}
                      rel="noopener noreferrer"
                      className="text-pal-400 transition-colors hover:text-acc"
                    >
                      {s.label}
                    </Link>
                  ))}
                </motion.div>
              </motion.div>

              <motion.aside
                className="border-2 border-acc/35 bg-pal-950/60 p-5 shadow-[0_0_30px_rgb(var(--acc)/0.08)]"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 1 }}
                aria-label="At a glance"
              >
                <p className="font-display text-2xl text-acc crt-glow">At a glance</p>
                <div className="mt-4 space-y-3">
                  {stats.map((s) => (
                    <StatBar key={s.label} {...s} />
                  ))}
                </div>
                <dl className="mt-5 space-y-2 border-t border-dashed border-hair/[0.15] pt-4 text-sm">
                  {[
                    ["Location", "Amman, JO"],
                    ["Focus", "AI, ML, Cloud"],
                    ["Languages", "Arabic, English"],
                  ].map(([k, v]) => (
                    <div key={k} className="flex justify-between gap-4">
                      <dt className="text-pal-400">{k}</dt>
                      <dd className="text-pal-100">{v}</dd>
                    </div>
                  ))}
                </dl>
              </motion.aside>
            </div>

            <div className="smpte mt-10" aria-hidden>
              {["#c0c0c0", "#c0c000", "#00c0c0", "#00c000", "#c000c0", "#c00000", "#0000c0"].map((c) => (
                <i key={c} style={{ background: c }} />
              ))}
            </div>
          </div>
        </header>

        {/* ════════════════ ABOUT ════════════════ */}
        <section id="about" data-channel="About" className="px-4 py-20 sm:px-6">
          <div className="mx-auto max-w-7xl 2xl:max-w-[96rem]">
            <SectionHeading title="About" subtitle="CH 02" className="mb-10" />

            <motion.div
              className="grid grid-cols-1 gap-8 lg:grid-cols-[minmax(0,1.4fr)_minmax(0,1fr)]"
              variants={staggerContainer(0.12)}
              initial="hidden"
              whileInView="show"
              viewport={viewportOnce}
            >
              <motion.div variants={staggerItem} className="space-y-4 font-sans leading-relaxed text-pal-300">
                
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
              </motion.div>

              <motion.div variants={staggerItem}>
                <p className="font-display text-2xl text-acc">Highlights</p>
                <ul className="mt-4 space-y-2.5 text-sm">
                  {highlights.map((item) => (
                    <li key={item} className="flex items-start gap-2.5 text-pal-200">
                      <span className="mt-0.5 text-term-green">✓</span>
                      {item}
                    </li>
                  ))}
                </ul>
              </motion.div>
            </motion.div>
          </div>
        </section>

        {/* ════════════════ SKILLS ════════════════ */}
        <section id="skills" data-channel="Skills" className="py-20">
          <div className="mx-auto mb-10 max-w-7xl 2xl:max-w-[96rem] px-4 sm:px-6">
            <SectionHeading title="Skills" subtitle="CH 03" />
          </div>
          <SkillsShowcase />
        </section>

        {/* ════════════════ PROJECTS ════════════════ */}
        <section id="projects" data-channel="Projects" className="px-4 py-20 sm:px-6">
          <div className="mx-auto max-w-7xl 2xl:max-w-[96rem]">
            <SectionHeading title="Projects" subtitle="CH 04" className="mb-10" />

            <motion.div
              className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3"
              variants={staggerContainer(0.07)}
              initial="hidden"
              whileInView="show"
              viewport={viewportOnce}
            >
              {projects.map((p, i) => (
                <ProjectCard key={p.title} index={i} {...p} />
              ))}
            </motion.div>

            <motion.div
              className="mt-8 font-mono text-sm"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.4, delay: 0.15 }}
              viewport={viewportOnce}
            >
              <Link
                href="https://github.com/MahmoudAbuAwd"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-pal-300 transition-colors hover:text-acc"
              >
                <span className="font-display text-2xl">View all on GitHub</span>
                <ArrowUpRight className="h-3.5 w-3.5" />
              </Link>
            </motion.div>
          </div>
        </section>

        {/* ════════════════ EXPERIENCE ════════════════ */}
        <section id="experience" data-channel="Experience" className="px-4 py-20 sm:px-6">
          <div className="mx-auto max-w-5xl">
            <SectionHeading title="Experience" subtitle="CH 05" className="mb-10" />
            <Timeline />
          </div>
        </section>

        {/* ════════════════ CERTIFICATIONS ════════════════ */}
        <section id="certifications" data-channel="Certifications" className="px-4 py-20 sm:px-6">
          <div className="mx-auto max-w-7xl 2xl:max-w-[96rem]">
            <div className="mb-10 flex items-end justify-between">
              <SectionHeading title="Certifications" subtitle="CH 06" className="flex-1" />
              <span className="tv-chip ml-4 shrink-0 max-sm:!hidden">
                {certifications.length} certificates
              </span>
            </div>
            <CertificationsSection />
          </div>
        </section>

        {/* ════════════════ GITHUB ACTIVITY ════════════════ */}
        <section id="activity" data-channel="Activity" className="px-4 py-20 sm:px-6">
          <div className="mx-auto max-w-7xl 2xl:max-w-[96rem]">
            <SectionHeading title="Activity" subtitle="CH 07" className="mb-10" />
            <GitHubActivity />
          </div>
        </section>

        {/* ════════════════ CTA ════════════════ */}
        <section id="contact-cta" data-channel="Say hello" className="px-4 py-20 sm:px-6">
          <div className="mx-auto max-w-4xl">
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease: easeOutExpo }}
              viewport={viewportOnce}
              className="overflow-hidden rounded-md term-panel"
            >
              <WindowBar path="Contact" />
              <div className="p-8 text-center sm:p-10">
                
                <h2 className="font-display text-4xl text-pal-50 sm:text-5xl">
                  Let&rsquo;s build something together
                </h2>
                <p className="mx-auto mt-3 max-w-md font-sans text-pal-300">
                  I&rsquo;m always open to discussing new projects, ideas, or opportunities to create
                  impactful AI solutions.
                </p>
                <div className="mt-6 flex flex-col items-center justify-center gap-3 sm:flex-row">
                  <Link
                    href="/contact"
                    className="inline-flex items-center gap-2 rounded-sm border border-acc/50 bg-acc/10 px-5 py-2.5 text-sm text-acc transition-colors hover:bg-acc/20 hover:text-acc"
                  >
                    get in touch
                    <ArrowUpRight className="h-4 w-4" />
                  </Link>
                  <button
                    onClick={handleDownloadResume}
                    className="inline-flex items-center gap-2 rounded-sm border border-hair/[0.12] px-5 py-2.5 text-sm text-pal-200 transition-colors hover:border-hair/[0.25] hover:text-pal-50"
                  >
                    <Download className="h-4 w-4" />
                    Download résumé
                  </button>
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
