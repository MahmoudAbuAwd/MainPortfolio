"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import { ArrowRight, Github, Linkedin, Mail, Twitter, ArrowUpRight, Download, Phone , Star , Code , Award , Globe } from "lucide-react"
import React from "react"

import { Button } from "@/components/ui/button"
import { ProjectCard } from "@/components/project-card"
import { SkillBadge } from "@/components/skill-badge"
import { Timeline } from "@/components/timeline"
import { ContactForm } from "@/components/contact-form"
import { CreativeHero } from "@/components/creative-hero"
import { FloatingNav } from "@/components/floating-nav"
import { MouseFollower } from "@/components/mouse-follower"
import { SectionHeading } from "@/components/section-heading"
import { GlassmorphicCard } from "@/components/glassmorphic-card"
import { GitHubActivity } from "@/components/ui/github-activity"
import Image from 'next/image'

// Enhanced Skill Badge Component
const EnhancedSkillBadge = ({ name, level, icon, color = "purple" }) => {
  const colorClasses = {
    purple: "from-purple-500 to-pink-500",
    blue: "from-blue-500 to-cyan-500",
    green: "from-green-500 to-emerald-500",
    orange: "from-orange-500 to-red-500",
    indigo: "from-indigo-500 to-purple-500",
    yellow: "from-yellow-500 to-orange-500"
  }

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

// VS Code-style Skills Card for Hero right side
const VSCodeSkillsCard = () => {
  const [activeTab, setActiveTab] = React.useState<'skills' | 'readme'>('skills')
  const codeLines = [
    '""" core_skills: Mahmoud AbuAwd (AI Engineer) """',
    'from dataclasses import dataclass',
    '',
    '@dataclass',
    'class Profile:',
    '    name: str = "Mahmoud AbuAwd"',
    '    role: str = "AI Engineer"',
    '    location: str = "Amman, Jordan"',
    '',
    'skills = {',
    '    "core": ["Python", "ML", "DL", "NLP", "Computer Vision", "Generative AI"],',
    '    "tools": ["Tensorflow", "Pytorch", "Cloud", "Scikit-learn", "AWS"],',
    '    "focus": "AI/ML • MLOps • Full‑stack AI",',
    '    "status": "Available"',
    '}',
    '',
    'def currently_building():',
    '    return ["AI products", "Open‑source", "Learning daily"]',
    '',
    'if __name__ == "__main__":',
    '    me = Profile()',
    '    print(f"{me.role} — {me.location}")',
  ]

  return (
    <div className="w-full max-w-[780px] rounded-2xl border border-zinc-700/60 bg-[#0b0b0d]/90 shadow-2xl overflow-hidden">
      {/* Window controls */}
      <div className="flex items-center gap-2 px-4 py-2 border-b border-zinc-800 bg-zinc-900/80">
        <span className="w-3 h-3 rounded-full bg-red-500/80" />
        <span className="w-3 h-3 rounded-full bg-yellow-500/80" />
        <span className="w-3 h-3 rounded-full bg-green-500/80" />
        <div className="ml-3 text-xs text-zinc-400">skills.py — VS Code</div>
      </div>

      {/* Tab bar */}
      <div className="flex items-center gap-1 px-2 border-b border-zinc-800 bg-zinc-900/60">
        <button
          type="button"
          onClick={() => setActiveTab('skills')}
          className={`px-3 py-1.5 text-xs rounded-t-md border ${
            activeTab === 'skills'
              ? 'bg-zinc-800 text-zinc-200 border-zinc-700 border-b-0'
              : 'text-zinc-500 border-transparent hover:text-zinc-300'
          }`}
          aria-selected={activeTab === 'skills'}
        >
          skills.py
        </button>
        <button
          type="button"
          onClick={() => setActiveTab('readme')}
          className={`px-3 py-1.5 text-xs rounded-t-md border ${
            activeTab === 'readme'
              ? 'bg-zinc-800 text-zinc-200 border-zinc-700 border-b-0'
              : 'text-zinc-500 border-transparent hover:text-zinc-300'
          }`}
          aria-selected={activeTab === 'readme'}
        >
          README.md
        </button>
      </div>

      {/* Editor area */}
      <div className="relative">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(168,85,247,0.15),transparent_60%)]" />
        {activeTab === 'skills' ? (
          <pre className="relative m-0 p-4 font-mono text-[12px] leading-5 text-zinc-200 overflow-x-hidden overflow-y-hidden">
            {codeLines.map((line, idx) => (
              <div key={idx} className="whitespace-pre-wrap break-words">
                <span className="select-none text-zinc-600 w-8 inline-block text-right pr-4">{idx + 1}</span>
                <span>{line}</span>
              </div>
            ))}
          </pre>
        ) : (
          <div className="relative m-0 p-5 text-[13px] leading-6 text-zinc-200">
            <div className="font-semibold text-white text-sm">Core Skills</div>
            <ul className="mt-2 grid grid-cols-2 gap-y-1 gap-x-6 text-zinc-300 text-sm">
              <li>Python</li>
              <li>Machine Learning</li>
              <li>Deep Learning</li>
              <li>NLP</li>
              <li>Computer Vision</li>
              <li>Generative AI</li>
            </ul>

            <div className="mt-4 font-semibold text-white text-sm">Tools</div>
            <ul className="mt-2 grid grid-cols-2 gap-y-1 gap-x-6 text-zinc-300 text-sm">
              <li>Tensorflow</li>
              <li>Pytorch</li>
              <li>Scikit-learn</li>
              <li>Langchain</li>
              <li>Cloud</li>
              <li>AWS</li>
            </ul>

            <div className="mt-4 font-semibold text-white text-sm">Focus</div>
            <p className="mt-1 text-zinc-300 text-sm">AI/ML • MLOps • Full‑stack AI</p>

            <div className="mt-4 font-semibold text-white text-sm">Currently Building</div>
            <ul className="mt-2 list-disc pl-5 text-zinc-300 text-sm">
              <li>AI products</li>
              <li>Open‑source</li>
              <li>Learning daily</li>
            </ul>
          </div>
        )}
      </div>

      {/* Status bar */}
      <div className="flex items-center justify-between px-4 py-1.5 text-[11px] border-t border-zinc-800 bg-zinc-900/80 text-zinc-400">
        <div className="flex items-center gap-4">
          <span>{activeTab === 'skills' ? 'Python' : 'Markdown'}</span>
          <span>UTF‑8</span>
          <span>LF</span>
        </div>
        <div>{activeTab === 'skills' ? `Ln ${codeLines.length}, Col 1` : 'README'}</div>
      </div>
    </div>
  )
}

// Reusable ContactCard component
const ContactCard = ({ icon, title, value, href, gradient, hoverColor, external = false }) => (
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
    { label: "Certifications", value: "25+", icon: Award },
    { label: "Open Source PRs", value: "30+", icon: Star },
    { label: "Domains", value: "AI • ML • Cloud", icon: Globe },
  ]

  const handleDownloadResume = () => {
    const link = document.createElement('a')
    link.href = '/CV.pdf'
    link.download = 'CV.pdf'
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
  // Smooth scroll function
  const scrollToSection = (sectionId) => {
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
      <main id="main-content" className="overflow-hidden pt-16">
{/* Hero Section */}
<header id="hero" className="relative min-h-screen flex items-center justify-center overflow-hidden">
  <div className="absolute inset-0 z-0">
    <div className="absolute top-20 left-10 w-72 h-72 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
    <div className="absolute top-40 right-10 w-72 h-72 bg-yellow-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
    <div className="absolute bottom-20 left-1/3 w-72 h-72 bg-pink-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-4000"></div>
  </div>

  <div className="container relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
    <div className="space-y-6 text-center md:text-left">
      <div className="inline-block mt-6 md:mt-0"> {/* Reduced top margin on mobile to tighten spacing */}
        <div className="relative px-3 py-1 text-sm font-medium rounded-full bg-white/10 backdrop-blur-sm border border-white/20 mb-8 mx-auto md:mx-0">
          <span className="relative z-10">AI & ML Engineer</span>
          <span className="absolute inset-0 rounded-full bg-gradient-to-r from-purple-500/20 to-pink-500/20 animate-pulse"></span>
        </div>
      </div>
      <h1 className="text-5xl md:text-7xl font-bold tracking-tight">
        <span className="block">Hi, I'm</span>
        <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-600">
          Mahmoud AbuAwd
        </span>
      </h1>
      <p className="text-xl text-zinc-400 max-w-[600px]">
        I craft intelligent digital solutions by combining AI, code, and creativity—driven by a passion for innovation and real-world impact.
      </p>
      <div className="flex flex-wrap gap-4 pt-4 justify-center md:justify-start">
        {/* Primary Button - View Projects */}
        <motion.div
          whileHover={{ y: -2 }}
          whileTap={{ scale: 0.98 }}
          transition={{ type: "spring", stiffness: 400, damping: 10 }}
        >
          <Button 
            onClick={() => scrollToSection('projects')}
            className="relative overflow-hidden group bg-gradient-to-br from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 border-0 shadow-lg hover:shadow-purple-500/30 transition-all duration-300"
          >
            <span className="relative z-10 flex items-center font-medium tracking-wide">
              View Projects 
              <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1 group-hover:scale-110" />
            </span>
            <span className="absolute inset-0 bg-gradient-to-br from-pink-600 to-purple-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
            <span className="absolute inset-0 rounded-md bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
          </Button>
        </motion.div>

        {/* Secondary Button - Contact Me */}
        <motion.div
          whileHover={{ y: -2 }}
          whileTap={{ scale: 0.98 }}
          transition={{ type: "spring", stiffness: 400, damping: 10 }}
        >
          <Button
            onClick={() => scrollToSection('contact')}
            variant="outline"
            className="relative overflow-hidden group border border-zinc-700/80 hover:border-zinc-500 bg-zinc-900/50 hover:bg-zinc-800/50 text-zinc-200 hover:text-white transition-all duration-300"
          >
            <span className="relative z-10 flex items-center font-medium tracking-wide">
              Contact Me
            </span>
            <span className="absolute inset-0 rounded-md bg-white/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
            <span className="absolute -inset-1 rounded-md bg-purple-500/10 blur-md opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
          </Button>
        </motion.div>
      </div>
      <div className="flex gap-4 pt-4 justify-center md:justify-start">
        <Link href="https://github.com/MahmoudAbuAwd" target="_blank" rel="noopener noreferrer">
          <Button
            variant="ghost"
            size="icon"
            className="rounded-full bg-zinc-800/50 hover:bg-zinc-800 text-zinc-400 hover:text-white"
          >
            <Github className="h-5 w-5" />
            <span className="sr-only">GitHub</span>
          </Button>
        </Link>
        <Link href="https://www.linkedin.com/in/mahmoud-abuawd/" target="_blank" rel="noopener noreferrer">
          <Button
            variant="ghost"
            size="icon"
            className="rounded-full bg-zinc-800/50 hover:bg-zinc-800 text-zinc-400 hover:text-white"
          >
            <Linkedin className="h-5 w-5" />
            <span className="sr-only">LinkedIn</span>
          </Button>
        </Link>
        <Link href="https://twitter.com/s9mod" target="_blank" rel="noopener noreferrer">
          <Button
            variant="ghost"
            size="icon"
            className="rounded-full bg-zinc-800/50 hover:bg-zinc-800 text-zinc-400 hover:text-white"
          >
            <Twitter className="h-5 w-5" />
            <span className="sr-only">Twitter</span>
          </Button>
        </Link>
        <Link href="mailto:mahmoodabuawad08@gmail.com">
          <Button
            variant="ghost"
            size="icon"
            className="rounded-full bg-zinc-800/50 hover:bg-zinc-800 text-zinc-400 hover:text-white"
          >
            <Mail className="h-5 w-5" />
            <span className="sr-only">Email</span>
          </Button>
        </Link>
      </div>
    </div>
    <div className="flex justify-center">
      <VSCodeSkillsCard />
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

      {/* Enhanced Contact Section */}
      <section id="contact" className="py-32 relative overflow-hidden">
        {/* Animated gradient background */}
        <div className="absolute inset-0 z-0">
          <motion.div
            className="absolute top-1/4 left-1/4 w-64 h-64 bg-pink-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20"
            animate={{
              x: [-20, 20, -20],
              y: [-10, 10, -10],
            }}
            transition={{
              duration: 15,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
          <motion.div
            className="absolute bottom-1/3 right-1/3 w-64 h-64 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20"
            animate={{
              x: [10, -10, 10],
              y: [20, -20, 20],
            }}
            transition={{
              duration: 20,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 2
            }}
          />
          <motion.div
            className="absolute top-2/3 left-1/3 w-48 h-48 bg-indigo-500 rounded-full mix-blend-multiply filter blur-3xl opacity-15"
            animate={{
              x: [0, 15, 0],
              y: [15, 0, 15],
            }}
            transition={{
              duration: 12,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 1
            }}
          />
        </div>

        <div className="container relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <SectionHeading 
              title="Contact Me" 
              subtitle="Get In Touch" 
            />
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mt-16">
            {/* Contact Information - Enhanced */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <GlassmorphicCard className="hover:shadow-purple-500/10 transition-all duration-300">
                <h3 className="text-2xl font-bold mb-6 bg-gradient-to-r from-purple-400 to-pink-500 bg-clip-text text-transparent">
                  Contact Information
                </h3>
                
                <div className="space-y-4">
                  {/* Email */}
                  <ContactCard 
                    icon={<Mail className="h-5 w-5" />}
                    title="Email Address"
                    value="Mahmoodabuawad08@gmail.com"
                    href="mailto:mahmoodabuawad08@gmail.com"
                    gradient="from-purple-500 to-pink-600"
                    hoverColor="purple-400"
                  />
                  
                  {/* Phone */}
                  <ContactCard 
                    icon={<Phone className="h-5 w-5" />}
                    title="Phone Number"
                    value="+962 79 103 4222"
                    href="tel:+962791034222"
                    gradient="from-blue-500 to-teal-600"
                    hoverColor="blue-400"
                  />
                  
                  {/* LinkedIn */}
                  <ContactCard 
                    icon={<Linkedin className="h-5 w-5" />}
                    title="LinkedIn Profile"
                    value="Mahmoud AbuAwd"
                    href="https://www.linkedin.com/in/mahmoud-abuawd-247290225/"
                    gradient="from-blue-600 to-blue-700"
                    hoverColor="blue-400"
                    external
                  />
                  
                  {/* GitHub */}
                  <ContactCard 
                    icon={<Github className="h-5 w-5" />}
                    title="GitHub Profile"
                    value="MahmoudAbuAwd"
                    href="https://github.com/MahmoudAbuAwd"
                    gradient="from-gray-700 to-gray-800"
                    hoverColor="gray-300"
                    external
                  />
                </div>

                {/* Availability Status */}
                <div className="mt-8 pt-8 border-t border-zinc-800/50">
                  <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                    <div>
                      <h4 className="text-lg font-medium mb-1">Current Availability</h4>
                      <p className="text-sm text-zinc-400">Open to new opportunities and collaborations</p>
                    </div>
                    <motion.div
                      animate={{
                        scale: [1, 1.05, 1],
                      }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                      }}
                      className="flex items-center gap-2 px-4 py-2 bg-zinc-800 rounded-full border border-zinc-700/50"
                    >
                      <div className="w-2.5 h-2.5 rounded-full bg-green-500 animate-pulse"></div>
                      <span className="text-sm font-medium text-green-400">Available for work</span>
                    </motion.div>
                  </div>
                </div>
              </GlassmorphicCard>
            </motion.div>

            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              viewport={{ once: true }}
            >
              <ContactForm />
            </motion.div>
          </div>
        </div>
      </section>

      </main>

      {/* Footer */}
      <footer className="border-t border-zinc-800 py-12">
        <div className="container flex flex-col md:flex-row justify-between items-center gap-6">
          <div>
            <Link href="/" className="font-bold text-xl">
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-600">Mahmoud</span>
              <span className="text-white">AbuAwd</span>
            </Link>
            <p className="text-sm text-zinc-500 mt-2">
              © {new Date().getFullYear()} Mahmoud AbuAwd. All rights reserved.
            </p>
          </div>
          <div className="flex gap-4">
            <Link href="https://github.com/MahmoudAbuAwd" target="_blank" rel="noopener noreferrer">
              <Button
                variant="ghost"
                size="icon"
                className="rounded-full bg-zinc-800/50 hover:bg-zinc-800 text-zinc-400 hover:text-white"
              >
                <Github className="h-5 w-5" />
                <span className="sr-only">GitHub</span>
              </Button>
            </Link>
            <Link href="https://www.linkedin.com/in/mahmoud-abuawd-247290225/" target="_blank" rel="noopener noreferrer">
              <Button
                variant="ghost"
                size="icon"
                className="rounded-full bg-zinc-800/50 hover:bg-zinc-800 text-zinc-400 hover:text-white"
              >
                <Linkedin className="h-5 w-5" />
                <span className="sr-only">LinkedIn</span>
              </Button>
            </Link>
            <Link href="https://twitter.com/s9mod" target="_blank" rel="noopener noreferrer">
              <Button
                variant="ghost"
                size="icon"
                className="rounded-full bg-zinc-800/50 hover:bg-zinc-800 text-zinc-400 hover:text-white"
              >
                <Twitter className="h-5 w-5" />
                <span className="sr-only">Twitter</span>
              </Button>
            </Link>
            <Link href="mailto:mahmoodabuawad08@gmail.com">
              <Button
                variant="ghost"
                size="icon"
                className="rounded-full bg-zinc-800/50 hover:bg-zinc-800 text-zinc-400 hover:text-white"
              >
                <Mail className="h-5 w-5" />
                <span className="sr-only">Email</span>
              </Button>
            </Link>
          </div>
        </div>
      </footer>

    </div>
  )
}
