"use client"

import { useState, useEffect } from "react"
import ProjectCard from "@/components/project-card"
import ProjectModal from "@/components/project-modal"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import type { GitHubRepo } from "@/lib/types"
import repoData from "@/data/repositories.json"
import { motion } from "framer-motion"
import { useAnimations } from "@/contexts/animation-context"
import AnimationToggle from "@/components/animation-toggle"

export default function ProjectGrid() {
  const { animationsEnabled } = useAnimations()
  const [repos, setRepos] = useState<GitHubRepo[]>([])
  const [filteredRepos, setFilteredRepos] = useState<GitHubRepo[]>([])
  const [loading, setLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState("")
  const [sortBy, setSortBy] = useState("updated")
  const [selectedRepo, setSelectedRepo] = useState<GitHubRepo | null>(null)

  useEffect(() => {
    // Load repositories from the JSON file
    try {
      // Filter out repositories that are marked as not visible
      const visibleRepos = repoData.filter((repo) => repo.visible !== false)
      setRepos(visibleRepos)
      setFilteredRepos(visibleRepos)
    } catch (error) {
      console.error("Error loading repositories:", error)
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    // Filter by search query
    const filtered = repos.filter(
      (repo) =>
        repo.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (repo.description && repo.description.toLowerCase().includes(searchQuery.toLowerCase())) ||
        (repo.custom_description && repo.custom_description.toLowerCase().includes(searchQuery.toLowerCase())),
    )

    // Sort repositories
    const sorted = [...filtered].sort((a, b) => {
      switch (sortBy) {
        case "name":
          return a.name.localeCompare(b.name)
        case "stars":
          return (b.stargazers_count || 0) - (a.stargazers_count || 0)
        case "created":
          return new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
        case "updated":
        default:
          return new Date(b.updated_at).getTime() - new Date(a.updated_at).getTime()
      }
    })

    setFilteredRepos(sorted)
  }, [repos, searchQuery, sortBy])

  const handleOpenModal = (repo: GitHubRepo) => {
    setSelectedRepo(repo)
  }

  const handleCloseModal = () => {
    setSelectedRepo(null)
  }

  if (loading) {
    return (
      <div className="flex justify-center items-center py-20">
        <div className="animate-pulse space-y-4">
          <div className="h-12 w-48 bg-muted rounded"></div>
          <div className="h-32 w-64 bg-muted rounded"></div>
          <div className="text-center text-muted-foreground">Loading repositories...</div>
        </div>
      </div>
    )
  }

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row gap-4 items-start justify-between">
        <div className="flex-1 w-full">
          <Input
            placeholder="Search projects..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full"
          />
        </div>
        <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
          <Select value={sortBy} onValueChange={setSortBy}>
            <SelectTrigger className="w-full sm:w-48">
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="updated">Last Updated</SelectItem>
              <SelectItem value="created">Date Created</SelectItem>
              <SelectItem value="name">Name</SelectItem>
              <SelectItem value="stars">Stars</SelectItem>
            </SelectContent>
          </Select>
          <AnimationToggle className="self-end" />
        </div>
      </div>

      {filteredRepos.length === 0 ? (
        <div className="text-center py-10 text-muted-foreground">No repositories found matching your search.</div>
      ) : animationsEnabled ? (
        <motion.div
          className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {filteredRepos.map((repo, index) => (
            <ProjectCard key={repo.id} repo={repo} onClick={() => handleOpenModal(repo)} delay={index} />
          ))}
        </motion.div>
      ) : (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filteredRepos.map((repo) => (
            <ProjectCard key={repo.id} repo={repo} onClick={() => handleOpenModal(repo)} />
          ))}
        </div>
      )}

      {selectedRepo && <ProjectModal repo={selectedRepo} onClose={handleCloseModal} />}
    </div>
  )
}

