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
import { WindowBar } from '@/components/window-bar'

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

/* Two-tone terminal icon colors: amber `acc` for most actions,
   phosphor `term-green` for commits (git success), dim gray otherwise. */
function eventMeta(event: GitHubEvent) {
  const repo = event.repo.name.replace(`${GITHUB_USER}/`, '')
  switch (event.type) {
    case 'PushEvent': {
      const n = event.payload?.size ?? event.payload?.commits?.length ?? 1
      return { icon: GitCommit, iconColor: 'text-term-green', verb: `Pushed ${n} commit${n !== 1 ? 's' : ''} to`, repo, detail: event.payload?.commits?.[0]?.message ?? null, url: `https://github.com/${event.repo.name}/commits` }
    }
    case 'CreateEvent':
      return { icon: GitBranch, iconColor: 'text-acc', verb: event.payload?.ref_type === 'branch' ? `Created branch ${event.payload.ref} in` : `Created ${event.payload?.ref_type ?? 'repo'}`, repo, detail: null, url: `https://github.com/${event.repo.name}` }
    case 'PullRequestEvent':
      return { icon: GitPullRequest, iconColor: 'text-acc', verb: `${event.payload?.action ?? 'Updated'} PR in`, repo, detail: event.payload?.pull_request?.title ?? null, url: event.payload?.pull_request?.html_url ?? `https://github.com/${event.repo.name}/pulls` }
    case 'WatchEvent':
      return { icon: Star, iconColor: 'text-acc', verb: 'Starred', repo, detail: null, url: `https://github.com/${event.repo.name}` }
    default:
      return { icon: Github, iconColor: 'text-pal-300', verb: event.type.replace('Event', ''), repo, detail: null, url: `https://github.com/${event.repo.name}` }
  }
}

/* Deterministic terminal ramp (amber + phosphor green + grays), indexed by
   language rank, so the language bar stays two-tone instead of rainbow. */
const LANG_RAMP = ['bg-acc', 'bg-term-green', 'bg-acc/60', 'bg-pal-300', 'bg-term-green/60', 'bg-pal-500']

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
      <div className="grid grid-cols-2 gap-2.5 sm:grid-cols-4">
        {[
          { icon: Code2, label: 'repos', value: stats.totalRepos },
          { icon: Star, label: 'stars', value: stats.totalStars },
          { icon: GitFork, label: 'forks', value: stats.totalForks },
          { icon: Users, label: 'followers', value: stats.followers },
        ].map((s) => (
          <div key={s.label} className="rounded-sm border border-hair/[0.08] bg-hair/[0.02] p-3.5">
            <div className="flex items-center gap-2">
              <s.icon className="h-4 w-4 text-acc" />
              <span className="text-[11px] text-pal-400 sm:text-xs">{s.label}</span>
            </div>
            <p className="mt-1.5 text-xl font-bold tabular-nums text-pal-50">{s.value}</p>
          </div>
        ))}
      </div>

      {/* Language bar */}
      {sortedLanguages.length > 0 && (
        <div className="space-y-2.5">
          <p className="text-[11px] text-pal-400">
            <span className="text-acc">$</span> lang --dist
          </p>
          <div className="flex h-2 overflow-hidden rounded-sm bg-hair/[0.05]">
            {sortedLanguages.map(([lang, count], i) => (
              <div key={lang} className={LANG_RAMP[i % LANG_RAMP.length]} style={{ width: `${(count / totalLangRepos) * 100}%` }} />
            ))}
          </div>
          <div className="flex flex-wrap gap-x-3 gap-y-1">
            {sortedLanguages.map(([lang, count], i) => (
              <span key={lang} className="flex items-center gap-1.5 text-[11px] text-pal-200">
                <span className={`inline-block h-1.5 w-1.5 rounded-full ${LANG_RAMP[i % LANG_RAMP.length]}`} />
                {lang} <span className="text-pal-400">{Math.round((count / totalLangRepos) * 100)}%</span>
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
    return <p className="py-6 text-center text-sm text-pal-400">No recent public activity.</p>
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
            className="group flex items-start gap-3 rounded-sm border border-hair/[0.06] bg-hair/[0.02] px-3 py-3 transition-colors duration-300 hover:border-acc/30 hover:bg-hair/[0.05] sm:px-4"
          >
            <div className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-sm border border-hair/[0.08] bg-hair/[0.03] sm:h-8 sm:w-8">
              <Icon className={`h-3 w-3 sm:h-3.5 sm:w-3.5 ${meta.iconColor}`} />
            </div>
            <div className="min-w-0 flex-1">
              <p className="text-[13px] leading-snug text-pal-100 sm:text-sm">
                {meta.verb}{' '}
                <span className="font-semibold text-pal-50">{meta.repo}</span>
              </p>
              {meta.detail && (
                <p className="mt-0.5 truncate text-[11px] text-pal-400 sm:text-xs">
                  {meta.detail.length > 50 ? meta.detail.slice(0, 50) + '...' : meta.detail}
                </p>
              )}
            </div>
            <span className="mt-0.5 shrink-0 text-[10px] text-pal-400 tabular-nums sm:text-[11px]">{timeAgo(event.created_at)}</span>
          </motion.a>
        )
      })}
    </div>
  )
}

/* Shared terminal-window shell so every state (loading/error/loaded) reads
   as the same "gh" panel. */
function ActivityWindow({ children }: { children: React.ReactNode }) {
  return (
    <div className="overflow-hidden rounded-md term-panel">
      <WindowBar path={`~/activity $ gh api users/${GITHUB_USER}`} />
      <div className="p-5 sm:p-6">{children}</div>
    </div>
  )
}

/* ------------------------------------------------------------------ */
/*  Main                                                               */
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
      <ActivityWindow>
        <p className="text-sm text-pal-100">
          <span className="text-red-400">! error</span> could not load GitHub data
        </p>
        <p className="mt-1 text-xs text-pal-400">
          GitHub API rate limit may have been reached. Try refreshing later.
        </p>
      </ActivityWindow>
    )
  }

  if (loading) {
    return (
      <ActivityWindow>
        <div className="space-y-6">
          <div className="grid grid-cols-2 gap-2.5 sm:grid-cols-4">
            {[...Array(4)].map((_, i) => <Skeleton key={i} className="h-20 rounded-sm bg-hair/[0.05]" />)}
          </div>
          <Skeleton className="h-32 w-full rounded-sm bg-hair/[0.05]" />
        </div>
      </ActivityWindow>
    )
  }

  return (
    <ActivityWindow>
      <div className="space-y-6">
        {/* Live status + profile link */}
        <div className="flex items-center justify-between text-sm">
          <span className="flex items-center gap-2">
            <span className="h-1.5 w-1.5 rounded-full bg-term-green animate-pulse" />
            <span className="text-term-green">live</span>
            <span className="text-pal-500">·</span>
            <span className="text-pal-400">public activity</span>
          </span>
          <a
            href={`https://github.com/${GITHUB_USER}`}
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex items-center gap-1 text-pal-300 transition-colors hover:text-acc"
          >
            @{GITHUB_USER}
            <ArrowUpRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </a>
        </div>

        {/* Two columns: stats/languages | recent activity */}
        <div className="grid gap-6 lg:grid-cols-2 lg:gap-8">
          <div className="space-y-4">
            <p className="text-xs text-pal-400">
              <span className="text-acc">$</span> gh stats
            </p>
            {stats && <StatsAndLanguages stats={stats} sortedLanguages={sortedLanguages} totalLangRepos={totalLangRepos} />}
          </div>

          <div className="space-y-4 lg:border-l lg:border-hair/[0.06] lg:pl-8">
            <p className="text-xs text-pal-400">
              <span className="text-acc">$</span> gh events --recent
            </p>
            <ActivityFeed events={events} />
          </div>
        </div>

        {/* Footer link */}
        <div className="border-t border-dashed border-hair/[0.1] pt-4 text-center">
          <a
            href={`https://github.com/${GITHUB_USER}`}
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex items-center gap-1.5 text-sm text-pal-300 transition-colors hover:text-acc"
          >
            view full profile
            <ArrowUpRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </a>
        </div>
      </div>
    </ActivityWindow>
  )
}

export { GitHubActivity }
