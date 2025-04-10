"use client"

import { useState } from "react"
import { formatDate } from "@/lib/utils"
import type { GitHubRepo } from "@/lib/types"
import { Calendar, GitCommit, Code, Star, GitFork, ExternalLink, Eye } from "lucide-react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
// import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { motion, AnimatePresence } from "framer-motion"
import { useAnimations } from "@/contexts/animation-context"

interface ProjectModalProps {
  repo: GitHubRepo
  onClose: () => void
}

export default function ProjectModal({ repo, onClose }: ProjectModalProps) {
  const { animationsEnabled } = useAnimations()
  const [isOpen, setIsOpen] = useState(true)

  const handleClose = () => {
    setIsOpen(false)
    onClose()
  }

  const totalBytes = repo.languages ? Object.values(repo.languages).reduce((a, b) => a + b, 0) : 0

  return (
    <Dialog
      open={isOpen}
      onOpenChange={(open) => {
        setIsOpen(open)
        if (!open) onClose()
      }}
    >
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <div className="flex items-center justify-between">
            <DialogTitle className="text-2xl font-bold flex items-center gap-2">
              {repo.name}
              {repo.featured && (
                <Badge variant="default" className="flex items-center gap-1">
                  <Star className="h-3 w-3" />
                  Featured
                </Badge>
              )}
            </DialogTitle>
          </div>
        </DialogHeader>

        <div className="space-y-6">
          <div className="relative aspect-video overflow-hidden rounded-lg bg-muted">
            <img
              src={repo.image || `/placeholder.svg?height=400&width=800&text=${encodeURIComponent(repo.name)}`}
              alt={`${repo.name} screenshot`}
              className="object-cover w-full h-full"
            />
          </div>

          <AnimatePresence>
            <motion.div
              initial={animationsEnabled ? { opacity: 0, y: 20 } : false}
              animate={animationsEnabled ? { opacity: 1, y: 0 } : false}
              transition={{ duration: 0.3, delay: 0.1 }}
            >
              <h3 className="text-lg font-semibold mb-2">Description</h3>
              <p className="text-muted-foreground">
                {repo.custom_description || repo.description || "No description provided"}
              </p>
            </motion.div>
          </AnimatePresence>

          {repo.tags && repo.tags.length > 0 && (
            <AnimatePresence>
              <motion.div
                initial={animationsEnabled ? { opacity: 0, y: 20 } : false}
                animate={animationsEnabled ? { opacity: 1, y: 0 } : false}
                transition={{ duration: 0.3, delay: 0.2 }}
              >
                <h3 className="text-lg font-semibold mb-2">Tags</h3>
                <div className="flex flex-wrap gap-2">
                  {repo.tags.map((tag) => (
                    <Badge key={tag} variant="outline">
                      {tag}
                    </Badge>
                  ))}
                </div>
              </motion.div>
            </AnimatePresence>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <AnimatePresence>
              <motion.div
                className="space-y-2"
                initial={animationsEnabled ? { opacity: 0, y: 20 } : false}
                animate={animationsEnabled ? { opacity: 1, y: 0 } : false}
                transition={{ duration: 0.3, delay: 0.3 }}
              >
                <h3 className="text-lg font-semibold">Details</h3>
                <div className="grid gap-2">
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <Calendar className="h-4 w-4" />
                    <span>Created: {formatDate(repo.created_at)}</span>
                  </div>
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <GitCommit className="h-4 w-4" />
                    <span>Last updated: {formatDate(repo.updated_at)}</span>
                  </div>
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <Star className="h-4 w-4" />
                    <span>Stars: {repo.stargazers_count || 0}</span>
                  </div>
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <GitFork className="h-4 w-4" />
                    <span>Forks: {repo.forks_count || 0}</span>
                  </div>
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <Eye className="h-4 w-4" />
                    <span>Watchers: {repo.watchers_count || 0}</span>
                  </div>
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <Code className="h-4 w-4" />
                    <span>Size: {repo.size ? `${Math.round((repo.size / 1024) * 10) / 10} MB` : "Unknown"}</span>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>

            <AnimatePresence>
              <motion.div
                className="space-y-2"
                initial={animationsEnabled ? { opacity: 0, y: 20 } : false}
                animate={animationsEnabled ? { opacity: 1, y: 0 } : false}
                transition={{ duration: 0.3, delay: 0.4 }}
              >
                <h3 className="text-lg font-semibold">Languages</h3>
                {repo.languages && Object.keys(repo.languages).length > 0 ? (
                  <div className="space-y-2">
                    {Object.entries(repo.languages).map(([language, bytes], index) => {
                      const percentage = totalBytes ? Math.round((bytes / totalBytes) * 100) : 0
                      return (
                        <div key={language} className="flex justify-between items-center text-sm">
                          <span className="font-medium">{language}</span>
                          <span className="text-muted-foreground">{percentage}%</span>
                        </div>
                      )
                    })}
                  </div>
                ) : (
                  <p className="text-muted-foreground">Language data not available</p>
                )}
              </motion.div>
            </AnimatePresence>
          </div>

          <AnimatePresence>
            <motion.div
              className="flex flex-wrap gap-2 justify-center"
              initial={animationsEnabled ? { opacity: 0, y: 20 } : false}
              animate={animationsEnabled ? { opacity: 1, y: 0 } : false}
              transition={{ duration: 0.3, delay: 0.5 }}
            >
              <Button asChild>
                <a href={repo.html_url} target="_blank" rel="noopener noreferrer">
                  <GitFork className="mr-2 h-4 w-4" />
                  View on GitHub
                </a>
              </Button>
              {(repo.demo_url || repo.homepage) && (
                <Button variant="outline" asChild>
                  <a href={repo.demo_url || repo.homepage} target="_blank" rel="noopener noreferrer">
                    <ExternalLink className="mr-2 h-4 w-4" />
                    Live Demo
                  </a>
                </Button>
              )}
            </motion.div>
          </AnimatePresence>
        </div>
      </DialogContent>
    </Dialog>
  )
}

