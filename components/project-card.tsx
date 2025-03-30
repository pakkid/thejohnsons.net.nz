"use client"

import { formatDate } from "@/lib/utils"
import type { GitHubRepo } from "@/lib/types"
import { Calendar, GitCommit, Code, Star } from "lucide-react"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import TiltCard from "@/components/tilt-card"
import { motion } from "framer-motion"
import { useAnimations } from "@/contexts/animation-context"

interface ProjectCardProps {
  repo: GitHubRepo
  onClick: () => void
  delay?: number
}

export default function ProjectCard({ repo, onClick, delay = 0 }: ProjectCardProps) {
  const { animationsEnabled } = useAnimations()

  const cardContent = (
    <>
      <div className="relative aspect-video overflow-hidden bg-muted">
        {repo.featured && (
          <div className="absolute top-2 right-2 z-10">
            <Badge variant="default" className="flex items-center gap-1">
              <Star className="h-3 w-3" />
              Featured
            </Badge>
          </div>
        )}
        <img
          src={repo.image || `/placeholder.svg?height=200&width=400&text=${encodeURIComponent(repo.name)}`}
          alt={`${repo.name} screenshot`}
          className="object-cover w-full h-full rounded-t-lg transition-transform duration-500 group-hover:scale-105"
        />
      </div>
      <CardHeader className="pb-2">
        <h3 className="text-xl font-bold truncate">{repo.name}</h3>
        <p className="text-sm text-muted-foreground line-clamp-2 h-10">
          {repo.custom_description || repo.description || "No description provided"}
        </p>
      </CardHeader>
      <CardContent className="pb-2 flex-grow">
        <div className="grid grid-cols-2 gap-2 text-sm">
          <div className="flex items-center gap-1 text-muted-foreground">
            <Calendar className="h-3.5 w-3.5" />
            <span>Created: {formatDate(repo.created_at)}</span>
          </div>
          <div className="flex items-center gap-1 text-muted-foreground">
            <GitCommit className="h-3.5 w-3.5" />
            <span>Updated: {formatDate(repo.updated_at)}</span>
          </div>
        </div>
      </CardContent>
      <CardFooter className="pt-0">
        <div className="w-full">
          <div className="flex items-center gap-1 text-xs text-muted-foreground mb-2">
            <Code className="h-3.5 w-3.5" />
            <span>{repo.size ? `${Math.round((repo.size / 1024) * 10) / 10} MB` : "Unknown size"}</span>
          </div>
          <div className="flex flex-wrap gap-1">
            {repo.tags && repo.tags.length > 0
              ? repo.tags.map((tag) => (
                  <Badge key={tag} variant="outline" className="text-xs">
                    {tag}
                  </Badge>
                ))
              : repo.languages &&
                Object.keys(repo.languages).map((lang) => (
                  <Badge key={lang} variant="secondary" className="text-xs">
                    {lang}
                  </Badge>
                ))}
          </div>
        </div>
      </CardFooter>
    </>
  )

  // If animations are disabled, render a regular card
  if (!animationsEnabled) {
    return (
      <Card className="overflow-hidden cursor-pointer h-full flex flex-col group hover:shadow-lg" onClick={onClick}>
        {cardContent}
      </Card>
    )
  }

  // With animations enabled
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.5,
        delay: delay * 0.1,
        ease: "easeOut",
      }}
    >
      <TiltCard onClick={onClick}>
        <Card className="overflow-hidden cursor-pointer h-full flex flex-col group border-2 border-transparent hover:border-primary/20">
          {cardContent}
        </Card>
      </TiltCard>
    </motion.div>
  )
}

