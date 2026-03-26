"use client"

import { useEffect, useState, useMemo } from 'react'
import { motion } from 'framer-motion'
import {
  Github,
  GitCommit,
  GitPullRequest,
  Star,
  GitBranch,
  Code2,
  Users,
  ArrowUpRight,
  GitFork,
} from 'lucide-react'
import { Skeleton } from './skeleton'

/* ------------------------------------------------------------------ */
/*  Types                                                              */
/* ------------------------------------------------------------------ */

interface GitHubEvent {
  id: string
  type: string
  repo: { name: string }
  payload?: {
    action?: string
    ref?: string
    ref_type?: string
    size?: number
    commits?: Array<{ message: string; sha: string }>
    pull_request?: { html_url: string; title: string }
  }
  created_at: string
}

interface GitHubStats {
  totalRepos: number
  totalStars: number
  followers: number
  following: number
  totalForks: number
}

interface RepoInfo {
  stargazers_count: number
  forks_count: number
  language: string | null
}

/* ------------------------------------------------------------------ */
/*  Helpers                                                            */
/* ------------------------------------------------------------------ */

const GITHUB_USER = 'MahmoudAbuAwd'

function timeAgo(dateString: string): string {
  const seconds = Math.floor((Date.now() - new Date(dateString).getTime()) / 1000)
  if (seconds < 60) return 'just now'
  const minutes = Math.floor(seconds / 60)
  if (minutes < 60) return `${minutes}m ago`
  const hours = Math.floor(minutes / 60)
  if (hours < 24) return `${hours}h ago`
  const days = Math.floor(hours / 24)
  if (days < 7) return `${days}d ago`
  return new Intl.DateTimeFormat('en-US', { month: 'short', day: 'numeric' }).format(new Date(dateString))
}

function eventMeta(event: GitHubEvent) {
  const repo = event.repo.name.replace(`${GITHUB_USER}/`, '')
  switch (event.type) {
    case 'PushEvent': {
      const n = event.payload?.size ?? event.payload?.commits?.length ?? 1
      return { icon: GitCommit, iconColor: 'text-pal-200', accent: 'from-pal-500/15 to-pal-400/5', verb: `Pushed ${n} commit${n !== 1 ? 's' : ''} to`, repo, detail: event.payload?.commits?.[0]?.message ?? null, url: `https://github.com/${event.repo.name}/commits` }
    }
    case 'CreateEvent':
      return { icon: GitBranch, iconColor: 'text-blue-400', accent: 'from-blue-500/15 to-blue-400/5', verb: event.payload?.ref_type === 'branch' ? `Created branch ${event.payload.ref} in` : `Created ${event.payload?.ref_type ?? 'repo'}`, repo, detail: null, url: `https://github.com/${event.repo.name}` }
    case 'PullRequestEvent':
      return { icon: GitPullRequest, iconColor: 'text-green-400', accent: 'from-green-500/15 to-green-400/5', verb: `${event.payload?.action ?? 'Updated'} PR in`, repo, detail: event.payload?.pull_request?.title ?? null, url: event.payload?.pull_request?.html_url ?? `https://github.com/${event.repo.name}/pulls` }
    case 'WatchEvent':
      return { icon: Star, iconColor: 'text-yellow-400', accent: 'from-yellow-500/15 to-yellow-400/5', verb: 'Starred', repo, detail: null, url: `https://github.com/${event.repo.name}` }
    default:
      return { icon: Github, iconColor: 'text-pal-300', accent: 'from-pal-500/10 to-pal-400/5', verb: event.type.replace('Event', ''), repo, detail: null, url: `https://github.com/${event.repo.name}` }
  }
}

const langColors: Record<string, string> = {
  Python: 'bg-blue-500', JavaScript: 'bg-yellow-400', TypeScript: 'bg-blue-400',
  Jupyter: 'bg-orange-400', 'Jupyter Notebook': 'bg-orange-400', HTML: 'bg-red-400',
  CSS: 'bg-purple-400', Shell: 'bg-green-400', Dockerfile: 'bg-cyan-400',
}

/* ------------------------------------------------------------------ */
/*  Sub-components                                                     */
/* ------------------------------------------------------------------ */

function StatsAndLanguages({ stats, sortedLanguages, totalLangRepos }: {
  stats: GitHubStats
  sortedLanguages: [string, number][]
  totalLangRepos: number
}) {
  return (
    <div className="space-y-5">
      {/* Stats grid — 2x2 on mobile, 4 cols on desktop */}
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        {[
          { icon: Code2, label: 'Repos', value: stats.totalRepos, color: 'text-blue-400' },
          { icon: Star, label: 'Stars', value: stats.totalStars, color: 'text-yellow-400' },
          { icon: GitFork, label: 'Forks', value: stats.totalForks, color: 'text-pal-200' },
          { icon: Users, label: 'Followers', value: stats.followers, color: 'text-green-400' },
        ].map((s) => (
          <div key={s.label} className="rounded-2xl bg-white/[0.03] border border-white/[0.06] p-3.5 sm:p-4">
            <div className="flex items-center gap-2">
              <s.icon className={`h-4 w-4 ${s.color}`} />
              <span className="text-[11px] sm:text-xs text-pal-300">{s.label}</span>
            </div>
            <p className="mt-1.5 text-xl font-bold text-white">{s.value}</p>
          </div>
        ))}
      </div>

      {/* Language bar */}
      {sortedLanguages.length > 0 && (
        <div className="space-y-2.5">
          <p className="text-[11px] font-medium text-pal-300 uppercase tracking-wider">Languages</p>
          <div className="flex h-2 overflow-hidden rounded-full bg-white/[0.04]">
            {sortedLanguages.map(([lang, count]) => (
              <div key={lang} className={`${langColors[lang] ?? 'bg-pal-400'}`} style={{ width: `${(count / totalLangRepos) * 100}%` }} />
            ))}
          </div>
          <div className="flex flex-wrap gap-x-3 gap-y-1">
            {sortedLanguages.map(([lang, count]) => (
              <span key={lang} className="flex items-center gap-1.5 text-[11px] text-pal-200">
                <span className={`inline-block h-1.5 w-1.5 rounded-full ${langColors[lang] ?? 'bg-pal-400'}`} />
                {lang} <span className="text-pal-300">{Math.round((count / totalLangRepos) * 100)}%</span>
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

function ActivityFeed({ events }: { events: GitHubEvent[] }) {
  if (events.length === 0) {
    return <p className="text-center py-6 text-sm text-pal-300">No recent public activity.</p>
  }

  return (
    <div className="space-y-2">
      {events.map((event, i) => {
        const meta = eventMeta(event)
        const Icon = meta.icon
        return (
          <motion.a
            key={event.id}
            href={meta.url}
            target="_blank"
            rel="noopener noreferrer"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: i * 0.04 }}
            className="group flex items-start gap-3 rounded-xl bg-white/[0.02] border border-white/[0.05] px-3 sm:px-4 py-3 transition-all duration-300 hover:bg-white/[0.05] hover:border-white/[0.1] block"
          >
            <div className={`mt-0.5 flex h-7 w-7 sm:h-8 sm:w-8 shrink-0 items-center justify-center rounded-lg bg-gradient-to-br ${meta.accent} border border-white/[0.06]`}>
              <Icon className={`h-3 w-3 sm:h-3.5 sm:w-3.5 ${meta.iconColor}`} />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-[13px] sm:text-sm text-pal-100 leading-snug">
                {meta.verb}{' '}
                <span className="font-semibold text-white">{meta.repo}</span>
              </p>
              {meta.detail && (
                <p className="mt-0.5 text-[11px] sm:text-xs text-pal-300 truncate">
                  {meta.detail.length > 50 ? meta.detail.slice(0, 50) + '...' : meta.detail}
                </p>
              )}
            </div>
            <span className="shrink-0 text-[10px] sm:text-[11px] text-pal-300 mt-0.5">{timeAgo(event.created_at)}</span>
          </motion.a>
        )
      })}
    </div>
  )
}

/* ------------------------------------------------------------------ */
/*  Main — exports two components for separate rendering               */
/* ------------------------------------------------------------------ */

function GitHubActivity() {
  const [events, setEvents] = useState<GitHubEvent[]>([])
  const [stats, setStats] = useState<GitHubStats | null>(null)
  const [languages, setLanguages] = useState<Record<string, number>>({})
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    let cancelled = false
    const fetchAll = async () => {
      try {
        setLoading(true)
        setError(null)
        const [userRes, eventsRes, reposRes] = await Promise.all([
          fetch(`https://api.github.com/users/${GITHUB_USER}`),
          fetch(`https://api.github.com/users/${GITHUB_USER}/events?per_page=30`),
          fetch(`https://api.github.com/users/${GITHUB_USER}/repos?per_page=100&sort=updated`),
        ])
        if (!userRes.ok || !eventsRes.ok || !reposRes.ok) throw new Error('GitHub API request failed')
        const [userData, eventsData, reposData]: [any, GitHubEvent[], RepoInfo[]] = await Promise.all([userRes.json(), eventsRes.json(), reposRes.json()])
        if (cancelled) return

        const totalStars = reposData.reduce((s, r) => s + (r.stargazers_count ?? 0), 0)
        const totalForks = reposData.reduce((s, r) => s + (r.forks_count ?? 0), 0)
        const langMap: Record<string, number> = {}
        for (const repo of reposData) { if (repo.language) langMap[repo.language] = (langMap[repo.language] ?? 0) + 1 }

        setStats({ totalRepos: userData.public_repos, totalStars, followers: userData.followers, following: userData.following, totalForks })
        setLanguages(langMap)
        setEvents(eventsData.filter((e) => ['PushEvent', 'CreateEvent', 'PullRequestEvent', 'WatchEvent'].includes(e.type)).slice(0, 6))
      } catch (err) {
        if (!cancelled) setError(err instanceof Error ? err.message : 'Unknown error')
      } finally {
        if (!cancelled) setLoading(false)
      }
    }
    fetchAll()
    return () => { cancelled = true }
  }, [])

  const sortedLanguages = useMemo(() => Object.entries(languages).sort(([, a], [, b]) => b - a).slice(0, 6), [languages])
  const totalLangRepos = sortedLanguages.reduce((s, [, c]) => s + c, 0)

  if (error) {
    return (
      <div className="rounded-2xl bg-red-500/10 border border-red-500/20 p-5 text-sm text-red-300">
        <p className="font-medium">Could not load GitHub data</p>
        <p className="mt-1 text-red-400/80 text-xs">GitHub API rate limit may have been reached. Try refreshing later.</p>
      </div>
    )
  }

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
          {[...Array(4)].map((_, i) => <Skeleton key={i} className="h-20 rounded-2xl bg-white/[0.04]" />)}
        </div>
        <Skeleton className="h-32 w-full rounded-2xl bg-white/[0.04]" />
      </div>
    )
  }

  return (
    <div className="space-y-8">
      {/* ── Profile header ── */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-white/[0.06] border border-white/[0.08]">
            <Github className="h-5 w-5 text-pal-200" />
          </div>
          <div>
            <h3 className="font-semibold text-white">GitHub Profile</h3>
            <p className="text-xs text-pal-300">Live data</p>
          </div>
        </div>
        <a
          href={`https://github.com/${GITHUB_USER}`}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-1 text-xs font-medium text-pal-200 transition-colors hover:text-white group"
        >
          @{GITHUB_USER}
          <ArrowUpRight className="h-3 w-3 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
        </a>
      </div>

      {/* ── Two-panel layout ── */}
      <div className="grid gap-4 lg:grid-cols-2">
        {/* Left: Stats & Languages */}
        <div className="rounded-2xl glass p-5">
          <p className="text-xs font-semibold text-white uppercase tracking-wider mb-4">Statistics</p>
          {stats && <StatsAndLanguages stats={stats} sortedLanguages={sortedLanguages} totalLangRepos={totalLangRepos} />}
        </div>

        {/* Right: Recent Activity */}
        <div className="rounded-2xl glass p-5">
          <p className="text-xs font-semibold text-white uppercase tracking-wider mb-4">Recent Activity</p>
          <ActivityFeed events={events} />
        </div>
      </div>

      {/* ── Footer ── */}
      <div className="text-center">
        <a
          href={`https://github.com/${GITHUB_USER}`}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 text-sm font-medium text-pal-200 hover:text-white transition-colors group"
        >
          View full profile
          <ArrowUpRight className="h-3.5 w-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
        </a>
      </div>
    </div>
  )
}

export { GitHubActivity }
