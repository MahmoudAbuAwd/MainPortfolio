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
import { FloatingNav } from "@/components/floating-nav"
import { SiteFooter } from "@/components/site-footer"
import { SectionHeading } from "@/components/section-heading"
import { GitHubActivity } from "@/components/ui/github-activity"
import { SkillsShowcase } from "@/components/skills-showcase"
import { ScrollProgress } from "@/components/scroll-progress"
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
  { value: "15+", label: "projects", fill: 0.6 },
  { value: "30+", label: "certs", fill: 1 },
  { value: "30+", label: "os_prs", fill: 0.85 },
]

const highlights = [
  "AI Engineer at Kawkab AI",
  "AWS AI Practitioner Certified",
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
  const cells = 14
  const filled = Math.round(fill * cells)
  return (
    <div className="flex items-center gap-3 text-sm">
      <span className="w-20 shrink-0 text-pal-300">{label}</span>
      <span className="tracking-tighter" aria-hidden>
        <span className="text-amber-400">{"█".repeat(filled)}</span>
        <span className="text-pal-700">{"░".repeat(cells - filled)}</span>
      </span>
      <span className="ml-auto font-semibold text-pal-50">
        <CountUp value={value} />
      </span>
    </div>
  )
}

/* ------------------------------------------------------------------ */
/*  Terminal window chrome                                             */
/* ------------------------------------------------------------------ */

function WindowBar({ path }: { path: string }) {
  return (
    <div className="flex items-center gap-2 border-b border-white/[0.08] bg-white/[0.02] px-4 py-2.5">
      <span className="flex items-center gap-1.5" aria-hidden>
        <span className="h-2.5 w-2.5 rounded-full bg-[#ff5f56]/80" />
        <span className="h-2.5 w-2.5 rounded-full bg-amber-400/80" />
        <span className="h-2.5 w-2.5 rounded-full bg-term-green/80" />
      </span>
      <span className="ml-2 text-xs text-pal-400">{path}</span>
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
        <span className="text-pal-400">.pdf</span>
      </div>
      <h3 className="mt-3 flex min-h-[2.75rem] items-center text-sm font-semibold leading-snug text-pal-50">
        {c.label}
      </h3>
      <div className="mt-3 flex items-center justify-between border-t border-dashed border-white/[0.1] pt-3 text-xs">
        <span className="text-pal-400">{c.date}</span>
        <span className="flex items-center gap-1 text-amber-400">
          open <ExternalLink className="h-3 w-3" />
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
              className={`flex h-[170px] flex-col justify-between border p-5 transition-colors duration-300 ${
                isCenter
                  ? "border-amber-400/40 bg-pal-900/70"
                  : "border-white/[0.07] bg-pal-900/30"
              }`}
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
          className="flex h-[170px] flex-col justify-between border border-amber-400/40 bg-pal-900/70 p-5"
        >
          {cardContent(certifications[current])}
        </motion.a>
      </div>

      {/* Controls */}
      <div className="flex items-center justify-center gap-5 font-mono">
        <button
          onClick={() => go(-1)}
          aria-label="Previous certification"
          className="flex h-9 w-9 items-center justify-center border border-white/[0.1] text-pal-200 transition-colors hover:border-amber-400/40 hover:text-amber-300 active:scale-90"
        >
          <ChevronLeft className="h-4 w-4" />
        </button>
        <span className="min-w-[5rem] text-center text-sm text-pal-400 tabular-nums">
          <span className="font-semibold text-amber-400">{String(current + 1).padStart(2, "0")}</span>
          <span className="text-pal-500"> / {total}</span>
        </span>
        <button
          onClick={() => go(1)}
          aria-label="Next certification"
          className="flex h-9 w-9 items-center justify-center border border-white/[0.1] text-pal-200 transition-colors hover:border-amber-400/40 hover:text-amber-300 active:scale-90"
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
    link.href = "/resume/Resume.pdf"
    link.download = "Resume.pdf"
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  return (
    <div className="relative min-h-screen overflow-hidden bg-pal-950 text-pal-100">
      <ScrollProgress />
      <div className="terminal-atmosphere" aria-hidden />

      <a
        href="#main-content"
        className="sr-only focus-visible:fixed focus-visible:left-4 focus-visible:top-4 focus-visible:z-50 focus-visible:h-auto focus-visible:w-auto focus-visible:rounded-sm focus-visible:bg-pal-900 focus-visible:px-4 focus-visible:py-2 focus-visible:text-amber-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-400"
      >
        Skip to main content
      </a>

      <FloatingNav />

      <main id="main-content" className="relative z-10">
        {/* ════════════════ HERO ════════════════ */}
        <header className="relative flex min-h-[100svh] items-center px-4 pt-16 sm:px-6">
          <div className="mx-auto w-full max-w-7xl 2xl:max-w-[96rem] py-16">
            <motion.div
              className="overflow-hidden rounded-md term-panel"
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: easeOutExpo }}
            >
              <WindowBar path="mahmoud@abuawd: ~/portfolio" />

              <div className="grid gap-8 p-6 sm:p-8 lg:grid-cols-[1.15fr_0.85fr]">
                {/* Left — prompt block */}
                <motion.div
                  className="space-y-5 text-sm sm:text-base"
                  variants={staggerContainer(0.12, 0.2)}
                  initial="hidden"
                  animate="show"
                >
                  <motion.div variants={staggerItem}>
                    <p className="text-pal-400">
                      <span className="text-amber-400">$</span> whoami
                    </p>
                    <h1 className="mt-1 text-3xl font-bold tracking-tight text-pal-50 sm:text-4xl lg:text-5xl 2xl:text-6xl">
                      Mahmoud AbuAwd
                    </h1>
                    <p className="mt-1 text-pal-200">
                      <span className="text-pal-500">&gt; </span>
                      AI / ML Engineer
                      <span className="text-pal-400"> · Amman, Jordan</span>
                    </p>
                  </motion.div>

                  <motion.div variants={staggerItem}>
                    <p className="text-pal-400">
                      <span className="text-amber-400">$</span> cat bio.txt
                    </p>
                    <p className="mt-1 max-w-md font-sans leading-relaxed text-pal-300">
                      I design and ship AI products with measurable impact — from model
                      development to production deployment and monitoring.
                    </p>
                  </motion.div>

                  <motion.div variants={staggerItem}>
                    <p className="text-pal-400">
                      <span className="text-amber-400">$</span> status
                    </p>
                    <p className="mt-1 flex items-center gap-2 text-pal-200">
                      <span className="h-1.5 w-1.5 rounded-full bg-term-green animate-pulse" />
                      <span className="text-term-green">available for work</span>
                    </p>
                  </motion.div>

                  <motion.div variants={staggerItem} className="flex flex-wrap gap-3 pt-1">
                    <button
                      onClick={handleDownloadResume}
                      className="inline-flex items-center gap-2 rounded-sm border border-amber-400/50 bg-amber-400/10 px-4 py-2 text-sm text-amber-300 transition-colors hover:bg-amber-400/20 hover:text-amber-200"
                    >
                      <Download className="h-4 w-4" />
                      ./resume.pdf
                    </button>
                    <Link
                      href="/contact"
                      className="inline-flex items-center gap-1.5 rounded-sm border border-white/[0.12] px-4 py-2 text-sm text-pal-200 transition-colors hover:border-white/[0.25] hover:text-pal-50"
                    >
                      ./contact
                      <ArrowUpRight className="h-3.5 w-3.5" />
                    </Link>
                  </motion.div>

                  <motion.div variants={staggerItem} className="flex flex-wrap gap-x-5 gap-y-1 pt-1 text-sm">
                    {socialLinks.map((s) => (
                      <Link
                        key={s.label}
                        href={s.href}
                        target={s.href.startsWith("mailto") ? "_self" : "_blank"}
                        rel="noopener noreferrer"
                        className="text-pal-400 transition-colors hover:text-amber-300"
                      >
                        {s.label}
                      </Link>
                    ))}
                  </motion.div>
                </motion.div>

                {/* Right — stats panel */}
                <motion.div
                  className="self-start border border-white/[0.08] bg-pal-950/40 p-5"
                  variants={fadeUp}
                  initial="hidden"
                  animate="show"
                >
                  <p className="mb-4 text-xs text-pal-400">
                    <span className="text-term-green">~/stats</span> $ cat summary
                  </p>
                  <div className="space-y-3">
                    {stats.map((s) => (
                      <StatBar key={s.label} {...s} />
                    ))}
                  </div>

                  <div className="mt-5 space-y-2 border-t border-dashed border-white/[0.1] pt-4 text-xs">
                    {[
                      ["location", "Amman, JO"],
                      ["focus", "AI · ML · Cloud"],
                      ["langs", "Arabic, English"],
                    ].map(([k, v]) => (
                      <div key={k} className="flex justify-between">
                        <span className="text-pal-400">{k}</span>
                        <span className="text-pal-200">{v}</span>
                      </div>
                    ))}
                  </div>
                  <p className="mt-4 text-sm text-pal-300 cursor-blink" aria-hidden />
                </motion.div>
              </div>
            </motion.div>
          </div>
        </header>

        {/* ════════════════ ABOUT ════════════════ */}
        <section id="about" className="px-4 py-20 sm:px-6">
          <div className="mx-auto max-w-7xl 2xl:max-w-[96rem]">
            <SectionHeading title="About" subtitle="~/about" className="mb-10" />

            <motion.div
              className="grid gap-8 lg:grid-cols-[1.4fr_1fr]"
              variants={staggerContainer(0.12)}
              initial="hidden"
              whileInView="show"
              viewport={viewportOnce}
            >
              <motion.div variants={staggerItem} className="space-y-4 font-sans leading-relaxed text-pal-300">
                <p className="font-mono text-xs text-pal-400">$ cat about.md</p>
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
                <p className="font-mono text-xs text-pal-400">$ ls ./highlights</p>
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
        <section id="skills" className="py-20">
          <div className="mx-auto mb-10 max-w-7xl 2xl:max-w-[96rem] px-4 sm:px-6">
            <SectionHeading title="Skills" subtitle="~/skills" />
          </div>
          <SkillsShowcase />
        </section>

        {/* ════════════════ PROJECTS ════════════════ */}
        <section id="projects" className="px-4 py-20 sm:px-6">
          <div className="mx-auto max-w-7xl 2xl:max-w-[96rem]">
            <SectionHeading title="Projects" subtitle="~/projects" className="mb-10" />

            <motion.div
              className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3"
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
                className="inline-flex items-center gap-2 text-pal-300 transition-colors hover:text-amber-300"
              >
                <span className="text-amber-400">$</span> git remote -v
                <span className="text-pal-400">→ view all on github</span>
                <ArrowUpRight className="h-3.5 w-3.5" />
              </Link>
            </motion.div>
          </div>
        </section>

        {/* ════════════════ EXPERIENCE ════════════════ */}
        <section id="experience" className="px-4 py-20 sm:px-6">
          <div className="mx-auto max-w-5xl">
            <SectionHeading title="Experience" subtitle="~/experience" className="mb-10" />
            <Timeline />
          </div>
        </section>

        {/* ════════════════ CERTIFICATIONS ════════════════ */}
        <section id="certifications" className="px-4 py-20 sm:px-6">
          <div className="mx-auto max-w-7xl 2xl:max-w-[96rem]">
            <div className="mb-10 flex items-end justify-between">
              <SectionHeading title="Certifications" subtitle="~/certs" className="flex-1" />
              <span className="ml-4 hidden shrink-0 border border-white/[0.1] px-2.5 py-1 font-mono text-xs text-pal-300 sm:inline-block">
                {certifications.length} files
              </span>
            </div>
            <CertificationsSection />
          </div>
        </section>

        {/* ════════════════ GITHUB ACTIVITY ════════════════ */}
        <section id="activity" className="px-4 py-20 sm:px-6">
          <div className="mx-auto max-w-7xl 2xl:max-w-[96rem]">
            <SectionHeading title="Activity" subtitle="~/activity" className="mb-10" />
            <GitHubActivity />
          </div>
        </section>

        {/* ════════════════ CTA ════════════════ */}
        <section className="px-4 py-20 sm:px-6">
          <div className="mx-auto max-w-4xl">
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease: easeOutExpo }}
              viewport={viewportOnce}
              className="overflow-hidden rounded-md term-panel"
            >
              <WindowBar path="mahmoud@abuawd: ~/contact" />
              <div className="p-8 text-center sm:p-10">
                <p className="font-mono text-xs text-pal-400">$ ./start-project --with you</p>
                <h2 className="mt-3 text-2xl font-bold tracking-tight text-pal-50 sm:text-3xl">
                  Let&rsquo;s build something together
                </h2>
                <p className="mx-auto mt-3 max-w-md font-sans text-pal-300">
                  I&rsquo;m always open to discussing new projects, ideas, or opportunities to create
                  impactful AI solutions.
                </p>
                <div className="mt-6 flex flex-col items-center justify-center gap-3 sm:flex-row">
                  <Link
                    href="/contact"
                    className="inline-flex items-center gap-2 rounded-sm border border-amber-400/50 bg-amber-400/10 px-5 py-2.5 text-sm text-amber-300 transition-colors hover:bg-amber-400/20 hover:text-amber-200"
                  >
                    get in touch
                    <ArrowUpRight className="h-4 w-4" />
                  </Link>
                  <button
                    onClick={handleDownloadResume}
                    className="inline-flex items-center gap-2 rounded-sm border border-white/[0.12] px-5 py-2.5 text-sm text-pal-200 transition-colors hover:border-white/[0.25] hover:text-pal-50"
                  >
                    <Download className="h-4 w-4" />
                    ./resume.pdf
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
