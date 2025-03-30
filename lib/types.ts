export interface GitHubRepo {
  id: number
  name: string
  full_name: string
  html_url: string
  description: string | null
  created_at: string
  updated_at: string
  pushed_at: string
  homepage: string | null
  size: number
  stargazers_count: number
  watchers_count: number
  forks_count: number
  language: string | null
  languages?: Record<string, number>
  image?: string
  // Custom fields
  featured?: boolean
  visible?: boolean
  custom_description?: string
  demo_url?: string
  tags?: string[]
}

