"use client"

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { Github, GitCommit, GitPullRequest, Star, GitBranch, Clock, Code2, Users, Activity, TrendingUp } from 'lucide-react'
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
      sha: string
      url: string
    }>
    pull_request?: {
      html_url: string
      title: string
    }
  }
  created_at: string
}

interface GitHubStats {
  totalRepos: number
  totalStars: number
  totalCommits: number
  followers: number
  following: number
}

const GitHubActivity = () => {
  const [activity, setActivity] = useState<GitHubEvent[]>([])
  const [stats, setStats] = useState<GitHubStats | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [activeTab, setActiveTab] = useState<'activity' | 'stats'>('activity')
  const [timeRange, setTimeRange] = useState<'day' | 'week' | 'month'>('week')

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true)
        setError(null)
        
        // Fetch both activity and stats in parallel
        const [activityResponse, userResponse] = await Promise.all([
          fetch('https://api.github.com/users/MahmoudAbuAwd/events'),
          fetch('https://api.github.com/users/MahmoudAbuAwd')
        ])
        
        if (!activityResponse.ok || !userResponse.ok) {
          throw new Error('Failed to fetch GitHub data')
        }

        const activityData: GitHubEvent[] = await activityResponse.json()
        const userData = await userResponse.json()

        // Filter and sort events based on time range
        const now = new Date()
        const filteredEvents = activityData
          .filter(event => {
            const eventDate = new Date(event.created_at)
            let timeDiff = 0
            
            if (timeRange === 'day') {
              timeDiff = (now.getTime() - eventDate.getTime()) / (1000 * 60 * 60 * 24)
              return timeDiff <= 1
            } else if (timeRange === 'week') {
              timeDiff = (now.getTime() - eventDate.getTime()) / (1000 * 60 * 60 * 24 * 7)
              return timeDiff <= 1
            } else { // month
              timeDiff = (now.getTime() - eventDate.getTime()) / (1000 * 60 * 60 * 24 * 30)
              return timeDiff <= 1
            }
          })
          .filter(event => ['PushEvent', 'CreateEvent', 'PullRequestEvent', 'WatchEvent'].includes(event.type))
          .sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime())
          .slice(0, 10)

        setActivity(filteredEvents)
        
        // Set user statistics
        setStats({
          totalRepos: userData.public_repos,
          totalStars: 0, // Will be fetched separately
          totalCommits: 0, // Will be fetched separately
          followers: userData.followers,
          following: userData.following
        })

        // Fetch additional stats (stars and commits)
        const [starsResponse, commitsResponse] = await Promise.all([
          fetch('https://api.github.com/users/MahmoudAbuAwd/starred?per_page=1'),
          fetch('https://api.github.com/search/commits?q=author:MahmoudAbuAwd', {
            headers: {
              'Accept': 'application/vnd.github.cloak-preview'
            }
          })
        ])

        if (starsResponse.ok && commitsResponse.ok) {
          const starsData = await starsResponse.json()
          const commitsData = await commitsResponse.json()
          
          setStats(prev => ({
            ...prev!,
            totalStars: starsData.length,
            totalCommits: commitsData.total_count
          }))
        }

      } catch (err) {
        console.error('GitHub fetch error:', err)
        setError(err instanceof Error ? err.message : 'Unknown error occurred')
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [timeRange])

  const getEventDetails = (event: GitHubEvent) => {
    const repoName = event.repo.name.replace('MahmoudAbuAwd/', '')
    
    switch (event.type) {
      case 'PushEvent':
        return {
          icon: <GitCommit className="h-4 w-4 text-purple-400" />,
          text: `Pushed ${event.payload?.commits?.length || 1} commit${event.payload?.commits?.length !== 1 ? 's' : ''} to`,
          color: 'bg-purple-500/10 border-purple-500/20',
          url: `https://github.com/${event.repo.name}/commits`
        }
      case 'CreateEvent':
        return {
          icon: <GitBranch className="h-4 w-4 text-blue-400" />,
          text: event.payload?.ref_type === 'branch' 
            ? `Created branch ${event.payload.ref} in` 
            : `Created ${event.payload?.ref_type || 'repository'} in`,
          color: 'bg-blue-500/10 border-blue-500/20',
          url: `https://github.com/${event.repo.name}`
        }
      case 'PullRequestEvent':
        return {
          icon: <GitPullRequest className="h-4 w-4 text-green-400" />,
          text: `${event.payload?.action || 'updated'} pull request in`,
          color: 'bg-green-500/10 border-green-500/20',
          url: event.payload?.pull_request?.html_url || `https://github.com/${event.repo.name}/pulls`
        }
      case 'WatchEvent':
        return {
          icon: <Star className="h-4 w-4 text-yellow-400" />,
          text: 'Starred',
          color: 'bg-yellow-500/10 border-yellow-500/20',
          url: `https://github.com/${event.repo.name}`
        }
      default:
        return {
          icon: <Github className="h-4 w-4 text-gray-400" />,
          text: `Performed ${event.type.replace('Event', '').toLowerCase()} on`,
          color: 'bg-gray-500/10 border-gray-500/20',
          url: `https://github.com/${event.repo.name}`
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

  const renderCommitMessage = (message: string) => {
    const truncatedMessage = message.length > 50 
      ? `${message.substring(0, 50)}...` 
      : message
    return (
      <span className="text-xs text-zinc-300 block mt-1 truncate">
        {truncatedMessage}
      </span>
    )
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
          <h3 className="text-xl font-bold text-white">GitHub Profile</h3>
          <p className="text-sm text-zinc-400">Recent activity and statistics</p>
        </div>
      </div>

      <div className="flex items-center justify-between border-b border-zinc-800 pb-2">
        <div className="flex gap-2">
          <button
            onClick={() => setActiveTab('activity')}
            className={`px-3 py-1 text-sm rounded-md transition-colors ${activeTab === 'activity' ? 'bg-purple-500/20 text-purple-300' : 'text-zinc-400 hover:text-zinc-200'}`}
          >
            Activity
          </button>
          <button
            onClick={() => setActiveTab('stats')}
            className={`px-3 py-1 text-sm rounded-md transition-colors ${activeTab === 'stats' ? 'bg-purple-500/20 text-purple-300' : 'text-zinc-400 hover:text-zinc-200'}`}
          >
            Statistics
          </button>
        </div>
        {activeTab === 'activity' && (
          <div className="flex items-center gap-2 text-xs">
            <Clock className="h-4 w-4 text-zinc-500" />
            <select 
              value={timeRange}
              onChange={(e) => setTimeRange(e.target.value as 'day' | 'week' | 'month')}
              className="bg-zinc-900 border border-zinc-800 rounded-md px-2 py-1 text-zinc-300 focus:outline-none focus:ring-1 focus:ring-purple-500"
            >
              <option value="day">Last 24h</option>
              <option value="week">Last week</option>
              <option value="month">Last month</option>
            </select>
          </div>
        )}
      </div>

      {loading ? (
        <div className="space-y-3">
          {[...Array(3)].map((_, i) => (
            <Skeleton key={i} className="h-16 w-full rounded-lg bg-zinc-800/50" />
          ))}
        </div>
      ) : activeTab === 'activity' ? (
        activity.length === 0 ? (
          <div className="text-center py-6 text-zinc-400">
            No recent activity found for selected time range.
          </div>
        ) : (
          <div className="grid gap-3">
            {activity.map((event) => {
              const { icon, text, color, url } = getEventDetails(event)
              const repoName = event.repo.name.replace('MahmoudAbuAwd/', '')
              
              return (
                <motion.a
                  key={event.id}
                  href={url}
                  target="_blank"
                  rel="noopener noreferrer"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  whileHover={{ scale: 1.02 }}
                  className={`p-4 rounded-xl border ${color} backdrop-blur-sm transition-all duration-300 block`}
                >
                  <div className="flex items-start gap-3">
                    <div className="mt-0.5">
                      {icon}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-white">
                        {text} <span className="text-purple-300">{repoName}</span>
                      </p>
                      {event.type === 'PushEvent' && event.payload?.commits?.[0]?.message && (
                        renderCommitMessage(event.payload.commits[0].message)
                      )}
                      <p className="text-xs text-zinc-400 mt-1">
                        {formatDate(event.created_at)}
                      </p>
                    </div>
                  </div>
                </motion.a>
              )
            })}
          </div>
        )
      ) : (
        <div className="grid grid-cols-2 gap-4 pt-2">
          <div className="p-4 rounded-xl bg-zinc-900/50 border border-zinc-800">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-blue-500/10 border border-blue-500/20">
                <Code2 className="h-5 w-5 text-blue-400" />
              </div>
              <div>
                <p className="text-sm text-zinc-400">Repositories</p>
                <p className="text-xl font-bold text-white">{stats?.totalRepos || 0}</p>
              </div>
            </div>
          </div>
          
          <div className="p-4 rounded-xl bg-zinc-900/50 border border-zinc-800">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-yellow-500/10 border border-yellow-500/20">
                <Star className="h-5 w-5 text-yellow-400" />
              </div>
              <div>
                <p className="text-sm text-zinc-400">Stars</p>
                <p className="text-xl font-bold text-white">{stats?.totalStars || 0}</p>
              </div>
            </div>
          </div>
          
          <div className="p-4 rounded-xl bg-zinc-900/50 border border-zinc-800">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-purple-500/10 border border-purple-500/20">
                <GitCommit className="h-5 w-5 text-purple-400" />
              </div>
              <div>
                <p className="text-sm text-zinc-400">Commits</p>
                <p className="text-xl font-bold text-white">{stats?.totalCommits || 0}</p>
              </div>
            </div>
          </div>
          
          <div className="p-4 rounded-xl bg-zinc-900/50 border border-zinc-800">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-green-500/10 border border-green-500/20">
                <Users className="h-5 w-5 text-green-400" />
              </div>
              <div>
                <p className="text-sm text-zinc-400">Followers</p>
                <p className="text-xl font-bold text-white">{stats?.followers || 0}</p>
              </div>
            </div>
          </div>
          
          <div className="p-4 rounded-xl bg-zinc-900/50 border border-zinc-800 col-span-2">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-pink-500/10 border border-pink-500/20">
                <Activity className="h-5 w-5 text-pink-400" />
              </div>
              <div className="flex-1">
                <p className="text-sm text-zinc-400">Contribution Activity</p>
                <div className="flex items-center gap-2 mt-2">
                  {[...Array(7)].map((_, i) => (
                    <div 
                      key={i} 
                      className={`h-3 flex-1 rounded-sm ${Math.random() > 0.7 ? 'bg-green-500' : 'bg-zinc-800'}`}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
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