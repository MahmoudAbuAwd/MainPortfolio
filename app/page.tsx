"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import { ArrowRight, Github, Linkedin, Mail, Twitter, ArrowUpRight, Download, Phone , Star , Code , Award , Globe, BookOpen, FolderOpen } from "lucide-react"
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
  const achievements = [
    { text: "AWS AI Practitioner Certified", icon: Award },
    { text: "AI/ML Specialist", icon: Code },
    { text: "Full-Stack AI Developer", icon: Globe },
    { text: "Open Source Contributor", icon: Star }
  ]

  const stats = [
    { label: "Projects", value: "15+", icon: Code },
    { label: "Certifications", value: "30+", icon: Award },
    { label: "Open Source PRs", value: "30+", icon: Star },
    { label: "Domains", value: "AI • ML • Cloud", icon: Globe },
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
    <section className="py-24 relative overflow-hidden">
      {/* Decorative background elements */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -top-20 -left-20 w-64 h-64 bg-purple-900/20 rounded-full mix-blend-multiply filter blur-3xl opacity-20"></div>
        <div className="absolute -bottom-20 -right-20 w-64 h-64 bg-pink-900/20 rounded-full mix-blend-multiply filter blur-3xl opacity-20"></div>
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(168,85,247,0.05),transparent_60%)]"></div>
      </div>

      <div className="container mx-auto px-8 max-w-6xl relative z-10">

        {/* Main content in cards */}
        <div className="grid lg:grid-cols-3 gap-8 mb-12">
          {/* Story Card */}
          <div className="lg:col-span-2 rounded-3xl p-8 border border-zinc-700/50 backdrop-blur-sm bg-gradient-to-br from-zinc-800/80 to-zinc-900/80">
            <h3 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
              <span className="inline-block w-8 h-8 rounded-full bg-gradient-to-r from-purple-500 to-pink-500" />
              My Journey
            </h3>
            <div className="space-y-6 text-zinc-300 text-lg leading-relaxed">
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

           
          </div>

          {/* Profile Card */}
          <div className="rounded-3xl p-8 border border-zinc-700/50 backdrop-blur-sm bg-gradient-to-br from-zinc-800/80 to-zinc-900/80">
            {/* Avatar */}
            <div className="flex items-center gap-4 mb-6">
              <div className="relative">
                <div className="w-16 h-16 rounded-full bg-gradient-to-tr from-purple-600 to-pink-600 p-[2px]">
                  <div className="w-full h-full rounded-full bg-zinc-900 flex items-center justify-center text-white font-bold">
                    MA
                  </div>
                </div>
                <span className="absolute -bottom-1 -right-1 w-4 h-4 rounded-full bg-green-500 ring-2 ring-zinc-900" />
              </div>
              <div>
                <p className="text-sm text-zinc-400">AI Engineer</p>
                <h4 className="text-xl font-semibold text-white">Mahmoud AbuAwd</h4>
              </div>
            </div>

            <div className="space-y-5">
              <div className="flex items-center justify-between">
                <span className="text-zinc-400">Based in</span>
                <span className="text-white font-medium">Amman, Jordan</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-zinc-400">Languages</span>
                <span className="text-white font-medium">Arabic, English</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-zinc-400">Volunteering</span>
                <span className="text-white font-medium">IEEE & GDG</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-zinc-400">Focus Area</span>
                <span className="text-white font-medium">AI/ML</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-zinc-400">Status</span>
                <div className="flex items-center gap-2">
                  <span className="w-3 h-3 bg-green-400 rounded-full animate-pulse" />
                  <span className="text-green-400 font-medium">Available</span>
                </div>
              </div>
            </div>

            {/* Socials */}
            <div className="mt-6 grid grid-cols-4 gap-3">
              <Link href="https://github.com/MahmoudAbuAwd" target="_blank" rel="noopener noreferrer" className="group flex items-center justify-center rounded-xl border border-zinc-700/60 bg-zinc-800/50 py-2 hover:border-purple-500/50 transition-colors">
                <Github className="w-5 h-5 text-zinc-300 group-hover:text-white" />
              </Link>
              <Link href="https://www.linkedin.com/in/mahmoud-abuawd-247290225/" target="_blank" rel="noopener noreferrer" className="group flex items-center justify-center rounded-xl border border-zinc-700/60 bg-zinc-800/50 py-2 hover:border-purple-500/50 transition-colors">
                <Linkedin className="w-5 h-5 text-zinc-300 group-hover:text-white" />
              </Link>
              <Link href="https://twitter.com/s9mod" target="_blank" rel="noopener noreferrer" className="group flex items-center justify-center rounded-xl border border-zinc-700/60 bg-zinc-800/50 py-2 hover:border-purple-500/50 transition-colors">
                <Twitter className="w-5 h-5 text-zinc-300 group-hover:text-white" />
              </Link>
              <Link href="mailto:mahmoodabuawad08@gmail.com" className="group flex items-center justify-center rounded-xl border border-zinc-700/60 bg-zinc-800/50 py-2 hover:border-purple-500/50 transition-colors">
                <Mail className="w-5 h-5 text-zinc-300 group-hover:text-white" />
              </Link>
            </div>

            {/* Profile actions */}
            <div className="mt-6 flex gap-3">
              <button
                onClick={handleDownloadResume}
                className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-2 rounded-xl text-sm text-white bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 transition-colors"
              >
                <Download className="w-4 h-4" />
                Resume
              </button>
              <Link
                href="tel:+962791034222"
                className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-2 rounded-xl text-sm text-zinc-200 border border-zinc-700/60 bg-zinc-800/50 hover:border-purple-500/50 hover:text-white transition-colors"
              >
                <Phone className="w-4 h-4" />
                Call
              </Link>
            </div>
          </div>
        </div>

        {/* Quick stats */}
        <div className="mb-12 grid grid-cols-2 md:grid-cols-4 gap-4">
          {stats.map((item, idx) => {
            const Icon = item.icon
            return (
              <div key={idx} className="group rounded-2xl border border-zinc-700/50 bg-zinc-900/60 p-5 hover:border-purple-500/50 transition-colors">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-xl bg-gradient-to-br from-purple-500/15 to-pink-500/15">
                    <Icon className="w-5 h-5 text-purple-400" />
                  </div>
                  <div>
                    <div className="text-white font-semibold leading-tight">{item.value}</div>
                    <div className="text-xs text-zinc-400">{item.label}</div>
                  </div>
                </div>
              </div>
            )
          })}
        </div>

        {/* Achievements */}
        <div className="mb-12">
          <h3 className="text-3xl font-bold text-white mb-8 text-center">Key Achievements</h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {achievements.map((achievement, index) => {
              const IconComponent = achievement.icon;
              return (
                <div 
                  key={index}
                  className="group bg-gradient-to-br from-zinc-800/60 to-zinc-900/60 rounded-2xl p-6 border border-zinc-700/40 hover:border-purple-500/50 transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-purple-500/20"
                >
                  <div className="flex flex-col items-center text-center space-y-4">
                    <div className="p-3 rounded-2xl bg-gradient-to-br from-purple-500/20 to-pink-500/20 group-hover:from-purple-500/30 group-hover:to-pink-500/30 transition-all duration-300">
                      <IconComponent className="w-8 h-8 text-purple-400 group-hover:text-purple-300" />
                    </div>
                    <p className="text-zinc-300 group-hover:text-white transition-colors font-medium">
                      {achievement.text}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* CTA */}
        <div className="text-center">
          <button
            onClick={handleDownloadResume}
            className="group relative inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-semibold rounded-2xl transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-2xl hover:shadow-purple-500/25"
          >
            <Download className="w-5 w-5 group-hover:animate-bounce" />
            Download My Resume
            <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-purple-400/20 to-pink-400/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          </button>
        </div>
      </div>
    </section>
  )
}

// Enhanced Certifications Component
const EnhancedCertifications = () => {
  const certifications = [
    {
      title: "AWS Certified AI Practitioner",
      issuer: "Amazon Web Services",
      date: "2025",
      link: "https://www.credly.com/badges/76fc2476-6790-45c8-90a0-6526068e976a/linked_in_profile",
      image: "/certs/awss.png",
      color: "from-orange-500 to-yellow-500"
    },
    {
      title: "Deep Learning Specialization",
      issuer: "DeepLearning.AI",
      date: "2024",
      link: "https://coursera.org/share/2d41f0f09d47d4647f704700734fa4eb",
      image: "/certs/dl.png",
      color: "from-blue-500 to-cyan-500"
    },
    {
      title: "TensorFlow Developer Certificate",
      issuer: "DeepLearning.AI",
      date: "2025",
      link: "https://www.coursera.org/account/accomplishments/specialization/25N87WOKCBL4",
      image: "/certs/dl.png",
      color: "from-orange-500 to-red-500"
    },
    {
      title: "Machine Learning & Data Science",
      issuer: "the Hope INT",
      date: "2023",
      link: "https://www.credential.net/f38b4114-3c4a-445c-b2a7-4cc7104e5063?record_view=true#gs.72uzz5",
      image: "/certs/front.png",
      color: "from-green-500 to-emerald-500"
    },
    {
      title: "Embedded System Designing",
      issuer: "INJO4",
      date: "2024",
      link: "https://injo4.org/injo-certificate/?cert_hash=378d773629422772",
      image: "/certs/injo4.png",
      color: "from-purple-500 to-pink-500"
    },
    {
      title: "Scientific Research Award",
      issuer: "University Of Jordan",
      date: "2023",
      link: "https://ibb.co/jVvh5Qp",
      image: "/certs/uj.png",
      color: "from-indigo-500 to-blue-500"
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {certifications.map((cert, index) => (
        <motion.div
          key={cert.title}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: index * 0.1 }}
          viewport={{ once: true }}
          whileHover={{ y: -5 }}
          className="group relative"
        >
          <a 
            href={cert.link} 
            target="_blank" 
            rel="noopener noreferrer"
            className="block h-full"
          >
            <div className="h-full rounded-xl bg-zinc-900/50 border border-zinc-800/50 hover:border-zinc-700/50 transition-all duration-300 p-6 flex flex-col">
              {/* Animated background gradient */}
              <div className={`absolute inset-0 bg-gradient-to-br ${cert.color} opacity-0 group-hover:opacity-10 transition-opacity duration-300 rounded-xl`} />
              
              {/* Certification content */}
              <div className="relative z-10">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="text-lg font-bold text-white group-hover:text-purple-300 transition-colors duration-300">
                      {cert.title}
                    </h3>
                    <p className="text-sm text-zinc-400">{cert.issuer}</p>
                  </div>
                  <span className="text-xs font-medium px-2 py-1 bg-zinc-800/50 text-zinc-300 rounded-full">
                    {cert.date}
                  </span>
                </div>
                
                {/* Certificate image */}
                <div className="aspect-video bg-zinc-800/50 flex items-center justify-center relative overflow-hidden">
                  <Image 
                    src={cert.image} 
                    alt={`${cert.title} certificate`}
                    fill
                    className="object-cover"
                  />
                  <div className="absolute inset-0 flex items-center justify-center bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <span className="text-white font-medium">View Certificate</span>
                  </div>
                </div>
                
                {/* View link */}
                <div className="mt-4 flex items-center justify-end">
                  <span className="text-xs font-medium text-zinc-500 group-hover:text-purple-400 transition-colors duration-300 flex items-center">
                    View credential
                    <ArrowUpRight className="ml-1 h-3 w-3" />
                  </span>
                </div>
              </div>
              
              {/* Decorative elements */}
              <div className="absolute -top-1 -right-1 w-3 h-3 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 animate-pulse" />
              <div className="absolute -bottom-1 -left-1 w-2 h-2 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 animate-pulse" />
            </div>
          </a>
        </motion.div>
      ))}
    </div>
  );
};

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
  className="relative isolate overflow-hidden border-b border-white/10 bg-zinc-900 px-4 pb-12 pt-16 text-white sm:pb-20 sm:pt-28 lg:pt-32"
>
  <div className="pointer-events-none absolute inset-0 z-0">
    <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_15%,rgba(168,85,247,0.22),transparent_45%),radial-gradient(circle_at_84%_20%,rgba(236,72,153,0.16),transparent_40%),radial-gradient(circle_at_50%_85%,rgba(139,92,246,0.14),transparent_50%)]" />
    <div className="absolute inset-0 bg-[linear-gradient(to_bottom,rgba(24,24,27,0.05),rgba(9,9,11,0.85))]" />
    <div className="hero-grid" />
  </div>

  <div className="container relative z-10">
    <div className="mx-auto grid max-w-6xl items-center gap-8 sm:gap-12 lg:grid-cols-[1.2fr_0.8fr]">
      <div className="space-y-5 text-center sm:space-y-7 sm:text-left">
        <div className="space-y-3 sm:space-y-5">
          <div className="flex justify-center sm:justify-start">
            <span className="inline-flex items-center justify-center rounded-full border border-purple-500/35 bg-purple-500/15 px-3 py-1.5 text-[0.65rem] font-semibold uppercase tracking-[0.18em] text-purple-100/90 sm:px-4 sm:py-2 sm:text-xs sm:tracking-[0.22em]">
              AI/ML Engineer • Based in Jordan
            </span>
          </div>
          <h1 className="text-3xl font-semibold leading-[1.14] tracking-tight text-white sm:text-5xl lg:text-7xl">
            <span className="block">{headlineName}</span>
            <span className="mt-2 block pb-2 bg-gradient-to-r from-purple-300 via-pink-300 to-purple-200 bg-clip-text text-transparent sm:mt-4 sm:pb-3">
              {headlineRole}
            </span>
          </h1>
          <p className="mx-auto max-w-xl text-[0.8rem] leading-relaxed text-zinc-400 sm:mx-0 sm:max-w-2xl sm:text-base lg:text-lg">
            I design and ship AI products with measurable impact, from model development to production deployment and monitoring.
          </p>
        </div>

        <div className="flex flex-wrap justify-center gap-1.5 sm:justify-start sm:gap-3">
          <span className="rounded-full border border-purple-500/25 bg-purple-500/10 px-2.5 py-0.5 text-[0.65rem] text-zinc-200 sm:px-3 sm:py-1 sm:text-xs">LLMs</span>
          <span className="rounded-full border border-purple-500/25 bg-purple-500/10 px-2.5 py-0.5 text-[0.65rem] text-zinc-200 sm:px-3 sm:py-1 sm:text-xs">Generative AI</span>
          <span className="rounded-full border border-purple-500/25 bg-purple-500/10 px-2.5 py-0.5 text-[0.65rem] text-zinc-200 sm:px-3 sm:py-1 sm:text-xs">Machine Learning</span>
          <span className="rounded-full border border-purple-500/25 bg-purple-500/10 px-2.5 py-0.5 text-[0.65rem] text-zinc-200 sm:px-3 sm:py-1 sm:text-xs">MLOps</span>
          <span className="rounded-full border border-purple-500/25 bg-purple-500/10 px-2.5 py-0.5 text-[0.65rem] text-zinc-200 sm:px-3 sm:py-1 sm:text-xs">AWS</span>
        </div>

        <div className="flex flex-col gap-2.5 sm:flex-row sm:flex-wrap sm:items-center sm:gap-4">
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

        <div className="flex justify-center gap-2.5 pt-0.5 sm:gap-3 sm:pt-1 sm:justify-start">
          <Link href="https://github.com/MahmoudAbuAwd" target="_blank" rel="noopener noreferrer">
            <Button
              variant="ghost"
              size="icon"
              className="h-9 w-9 rounded-full bg-white/10 text-white/80 transition-colors duration-200 hover:bg-purple-500/20 hover:text-white sm:h-10 sm:w-10"
            >
              <Github className="h-4 w-4 sm:h-5 sm:w-5" />
              <span className="sr-only">GitHub</span>
            </Button>
          </Link>
          <Link href="https://www.linkedin.com/in/mahmoud-abuawd/" target="_blank" rel="noopener noreferrer">
            <Button
              variant="ghost"
              size="icon"
              className="h-9 w-9 rounded-full bg-white/10 text-white/80 transition-colors duration-200 hover:bg-purple-500/20 hover:text-white sm:h-10 sm:w-10"
            >
              <Linkedin className="h-4 w-4 sm:h-5 sm:w-5" />
              <span className="sr-only">LinkedIn</span>
            </Button>
          </Link>
          <Link href="https://twitter.com/s9mod" target="_blank" rel="noopener noreferrer">
            <Button
              variant="ghost"
              size="icon"
              className="h-9 w-9 rounded-full bg-white/10 text-white/80 transition-colors duration-200 hover:bg-purple-500/20 hover:text-white sm:h-10 sm:w-10"
            >
              <Twitter className="h-4 w-4 sm:h-5 sm:w-5" />
              <span className="sr-only">Twitter</span>
            </Button>
          </Link>
          <Link href="mailto:mahmoodabuawad08@gmail.com">
            <Button
              variant="ghost"
              size="icon"
              className="h-9 w-9 rounded-full bg-white/10 text-white/80 transition-colors duration-200 hover:bg-purple-500/20 hover:text-white sm:h-10 sm:w-10"
            >
              <Mail className="h-4 w-4 sm:h-5 sm:w-5" />
              <span className="sr-only">Email</span>
            </Button>
          </Link>
        </div>
      </div>

      <div className="relative hidden lg:block">
        <div className="rounded-3xl border border-purple-500/20 bg-zinc-800/50 p-6 shadow-2xl shadow-black/30 backdrop-blur-xl sm:p-8">
          <div className="mb-6 flex items-center justify-between">
            <p className="text-sm font-medium uppercase tracking-[0.2em] text-zinc-300">Impact Snapshot</p>
            <span className="rounded-full border border-emerald-300/40 bg-emerald-300/15 px-3 py-1 text-xs font-medium text-emerald-200">
              Available
            </span>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="rounded-2xl border border-purple-500/15 bg-zinc-900/60 p-4">
              <p className="text-3xl font-semibold text-white">15+</p>
              <p className="mt-1 text-xs uppercase tracking-[0.16em] text-zinc-400">Projects Built</p>
            </div>
            <div className="rounded-2xl border border-purple-500/15 bg-zinc-900/60 p-4">
              <p className="text-3xl font-semibold text-white">30+</p>
              <p className="mt-1 text-xs uppercase tracking-[0.16em] text-zinc-400">Certifications</p>
            </div>
            <div className="rounded-2xl border border-purple-500/15 bg-zinc-900/60 p-4">
              <p className="text-3xl font-semibold text-white">25+</p>
              <p className="mt-1 text-xs uppercase tracking-[0.16em] text-zinc-400">Open Source PRs</p>
            </div>
            <div className="rounded-2xl border border-purple-500/15 bg-zinc-900/60 p-4">
              <p className="text-sm font-semibold text-white">AI • ML • Cloud</p>
              <p className="mt-1 text-xs uppercase tracking-[0.16em] text-zinc-400">Core Domains</p>
            </div>
          </div>

          <div className="mt-6 rounded-2xl border border-purple-500/25 bg-gradient-to-r from-purple-600/12 via-pink-500/10 to-purple-900/12 p-4">
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
            <EnhancedCertifications />
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
