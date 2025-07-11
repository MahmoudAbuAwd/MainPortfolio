"use client"

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { Github, GitCommit, GitPullRequest, Star, GitBranch } from 'lucide-react'
import { Skeleton } from './skeleton'

interface GitHubEvent {
  id: string
  type: string
  repo: {
    name: string
  }
  payload?: {
    action?: string
    ref?: string
    ref_type?: string
    commits?: Array<{
      message: string
    }>
  }
  created_at: string
}

const GitHubActivity = () => {
  const [activity, setActivity] = useState<GitHubEvent[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchActivity = async () => {
      try {
        // Add your GitHub token here if needed (store in env variables)
        // const token = process.env.NEXT_PUBLIC_GITHUB_TOKEN;
        const headers = {
          // ...(token && { Authorization: `token ${token}` }),
          Accept: 'application/vnd.github.v3+json'
        }

        const response = await fetch('https://api.github.com/users/MahmoudAbuAwd/events', {
          headers
        })
        
        if (!response.ok) {
          const errorData = await response.json().catch(() => ({}))
          throw new Error(
            errorData.message || `Failed to fetch GitHub activity (HTTP ${response.status})`
          )
        }

        const data: GitHubEvent[] = await response.json()
        console.log('Raw GitHub data:', data) // Debugging
        
        // Filter and sort events
        const filteredEvents = data
          .filter(event => {
            // Include only relevant event types
            return ['PushEvent', 'CreateEvent', 'PullRequestEvent', 'WatchEvent'].includes(event.type)
          })
          .sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime())
          .slice(0, 5)

        console.log('Filtered events:', filteredEvents) // Debugging
        setActivity(filteredEvents)
      } catch (err) {
        console.error('GitHub fetch error:', err)
        setError(err instanceof Error ? err.message : 'Unknown error occurred')
      } finally {
        setLoading(false)
      }
    }

    fetchActivity()
  }, [])

  const getEventDetails = (event: GitHubEvent) => {
    const repoName = event.repo.name.replace('MahmoudAbuAwd/', '')
    
    switch (event.type) {
      case 'PushEvent':
        return {
          icon: <GitCommit className="h-4 w-4 text-purple-400" />,
          text: `Pushed ${event.payload?.commits?.length || 1} commit${event.payload?.commits?.length !== 1 ? 's' : ''} to`,
          color: 'bg-purple-500/10 border-purple-500/20'
        }
      case 'CreateEvent':
        return {
          icon: <GitBranch className="h-4 w-4 text-blue-400" />,
          text: event.payload?.ref_type === 'branch' 
            ? `Created branch ${event.payload.ref} in` 
            : `Created ${event.payload?.ref_type || 'repository'} in`,
          color: 'bg-blue-500/10 border-blue-500/20'
        }
      case 'PullRequestEvent':
        return {
          icon: <GitPullRequest className="h-4 w-4 text-green-400" />,
          text: `${event.payload?.action || 'updated'} pull request in`,
          color: 'bg-green-500/10 border-green-500/20'
        }
      case 'WatchEvent':
        return {
          icon: <Star className="h-4 w-4 text-yellow-400" />,
          text: 'Starred',
          color: 'bg-yellow-500/10 border-yellow-500/20'
        }
      default:
        return {
          icon: <Github className="h-4 w-4 text-gray-400" />,
          text: `Performed ${event.type.replace('Event', '').toLowerCase()} on`,
          color: 'bg-gray-500/10 border-gray-500/20'
        }
    }
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    const now = new Date()
    const diffInHours = Math.abs(now.getTime() - date.getTime()) / (1000 * 60 * 60)

    if (diffInHours < 24) {
      return new Intl.DateTimeFormat('en-US', {
        hour: '2-digit',
        minute: '2-digit',
        hour12: true
      }).format(date) + ' today'
    } else if (diffInHours < 48) {
      return 'Yesterday'
    } else {
      return new Intl.DateTimeFormat('en-US', {
        month: 'short',
        day: 'numeric'
      }).format(date)
    }
  }

  if (error) {
    return (
      <div className="rounded-lg bg-red-900/20 border border-red-800/50 p-4 text-red-300">
        Error loading GitHub activity: {error}
        <div className="mt-2 text-sm">
          Note: GitHub API has rate limits. Try refreshing later or adding a token.
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3 mb-6">
        <div className="p-2 rounded-lg bg-gradient-to-br from-purple-600/20 to-pink-600/20 border border-purple-500/30">
          <Github className="h-6 w-6 text-purple-400" />
        </div>
        <div>
          <h3 className="text-xl font-bold text-white">GitHub Activity</h3>
          <p className="text-sm text-zinc-400">Recent contributions and updates</p>
        </div>
      </div>

      {loading ? (
        <div className="space-y-3">
          {[...Array(3)].map((_, i) => (
            <Skeleton key={i} className="h-16 w-full rounded-lg bg-zinc-800/50" />
          ))}
        </div>
      ) : activity.length === 0 ? (
        <div className="text-center py-6 text-zinc-400">
          No recent activity found. This could be due to:
          <ul className="text-xs mt-2 space-y-1">
            <li>• GitHub API rate limits (try refreshing later)</li>
            <li>• Private repository activity (not visible via public API)</li>
            <li>• No recent qualifying events (pushes, PRs, etc.)</li>
          </ul>
        </div>
      ) : (
        <div className="grid gap-3">
          {activity.map((event) => {
            const { icon, text, color } = getEventDetails(event)
            const repoName = event.repo.name.replace('MahmoudAbuAwd/', '')
            
            return (
              <motion.div
                key={event.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                whileHover={{ scale: 1.02 }}
                className={`p-4 rounded-xl border ${color} backdrop-blur-sm transition-all duration-300`}
              >
                <div className="flex items-start gap-3">
                  <div className="mt-0.5">
                    {icon}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-white">
                      {text} <span className="text-purple-300">{repoName}</span>
                    </p>
                    <p className="text-xs text-zinc-400 mt-1">
                      {formatDate(event.created_at)}
                    </p>
                  </div>
                </div>
              </motion.div>
            )
          })}
        </div>
      )}

      <div className="pt-2 text-center">
        <a
          href="https://github.com/MahmoudAbuAwd"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1 text-sm font-medium text-purple-400 hover:text-purple-300 transition-colors group"
        >
          View full GitHub profile
          <span className="group-hover:translate-x-1 transition-transform">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M7 7h10v10" />
              <path d="M7 17 17 7" />
            </svg>
          </span>
        </a>
      </div>
    </div>
  )
}

export { GitHubActivity }