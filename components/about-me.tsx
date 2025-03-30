"use client"

import { Github, Linkedin, Mail, MapPin } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { motion } from "framer-motion"
import { useAnimations } from "@/contexts/animation-context"

export default function AboutMe() {
  const { animationsEnabled } = useAnimations()

  // Replace with your information
  const personalInfo = {
    name: "Your Name",
    title: "Full Stack Developer",
    location: "San Francisco, CA",
    email: "your.email@example.com",
    github: "pakkid",
    linkedin: "yourlinkedin",
    bio: "Passionate developer with expertise in React, Next.js, and TypeScript. I love building user-friendly web applications and exploring new technologies.",
    skills: [
      "JavaScript",
      "TypeScript",
      "React",
      "Next.js",
      "Node.js",
      "Tailwind CSS",
      "GraphQL",
      "MongoDB",
      "PostgreSQL",
    ],
  }

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 },
    },
  }

  // If animations are disabled, render without animations
  if (!animationsEnabled) {
    return (
      <div className="grid gap-6 md:grid-cols-[1fr_2fr]">
        <Card className="overflow-hidden">
          <div className="aspect-square overflow-hidden md:aspect-auto md:h-full">
            <div className="flex h-full flex-col items-center justify-center bg-muted p-6 text-center">
              <Avatar className="h-32 w-32 mb-4">
                <AvatarImage src="/placeholder.svg?height=128&width=128" alt={personalInfo.name} />
                <AvatarFallback>
                  {personalInfo.name
                    .split(" ")
                    .map((n) => n[0])
                    .join("")}
                </AvatarFallback>
              </Avatar>
              <h1 className="text-2xl font-bold">{personalInfo.name}</h1>
              <p className="text-muted-foreground">{personalInfo.title}</p>
              <div className="mt-2 flex items-center text-sm text-muted-foreground">
                <MapPin className="mr-1 h-4 w-4" />
                {personalInfo.location}
              </div>
              <div className="mt-4 flex space-x-2">
                <Button variant="outline" size="icon" asChild>
                  <a href={`https://github.com/${personalInfo.github}`} target="_blank" rel="noopener noreferrer">
                    <Github className="h-4 w-4" />
                    <span className="sr-only">GitHub</span>
                  </a>
                </Button>
                <Button variant="outline" size="icon" asChild>
                  <a
                    href={`https://linkedin.com/in/${personalInfo.linkedin}`}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Linkedin className="h-4 w-4" />
                    <span className="sr-only">LinkedIn</span>
                  </a>
                </Button>
                <Button variant="outline" size="icon" asChild>
                  <a href={`mailto:${personalInfo.email}`}>
                    <Mail className="h-4 w-4" />
                    <span className="sr-only">Email</span>
                  </a>
                </Button>
              </div>
            </div>
          </div>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="space-y-4">
              <div>
                <h2 className="text-xl font-bold">About Me</h2>
                <p className="mt-2 text-muted-foreground">{personalInfo.bio}</p>
              </div>
              <div>
                <h2 className="text-xl font-bold">Skills</h2>
                <div className="mt-2 flex flex-wrap gap-2">
                  {personalInfo.skills.map((skill) => (
                    <Badge key={skill} variant="secondary">
                      {skill}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  // With animations
  return (
    <motion.div
      className="grid gap-6 md:grid-cols-[1fr_2fr]"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <motion.div variants={itemVariants}>
        <Card className="overflow-hidden hover:shadow-lg transition-shadow duration-300">
          <div className="aspect-square overflow-hidden md:aspect-auto md:h-full">
            <div className="flex h-full flex-col items-center justify-center bg-muted p-6 text-center">
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                <Avatar className="h-32 w-32 mb-4 ring-4 ring-primary/20">
                  <AvatarImage src="/placeholder.svg?height=128&width=128" alt={personalInfo.name} />
                  <AvatarFallback>
                    {personalInfo.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </AvatarFallback>
                </Avatar>
              </motion.div>
              <motion.h1 className="text-2xl font-bold" variants={itemVariants}>
                {personalInfo.name}
              </motion.h1>
              <motion.p className="text-muted-foreground" variants={itemVariants}>
                {personalInfo.title}
              </motion.p>
              <motion.div className="mt-2 flex items-center text-sm text-muted-foreground" variants={itemVariants}>
                <MapPin className="mr-1 h-4 w-4" />
                {personalInfo.location}
              </motion.div>
              <motion.div className="mt-4 flex space-x-2" variants={itemVariants}>
                <Button variant="outline" size="icon" asChild className="hover:scale-110 transition-transform">
                  <a href={`https://github.com/${personalInfo.github}`} target="_blank" rel="noopener noreferrer">
                    <Github className="h-4 w-4" />
                    <span className="sr-only">GitHub</span>
                  </a>
                </Button>
                <Button variant="outline" size="icon" asChild className="hover:scale-110 transition-transform">
                  <a
                    href={`https://linkedin.com/in/${personalInfo.linkedin}`}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Linkedin className="h-4 w-4" />
                    <span className="sr-only">LinkedIn</span>
                  </a>
                </Button>
                <Button variant="outline" size="icon" asChild className="hover:scale-110 transition-transform">
                  <a href={`mailto:${personalInfo.email}`}>
                    <Mail className="h-4 w-4" />
                    <span className="sr-only">Email</span>
                  </a>
                </Button>
              </motion.div>
            </div>
          </div>
        </Card>
      </motion.div>
      <motion.div variants={itemVariants}>
        <Card className="hover:shadow-lg transition-shadow duration-300 h-full">
          <CardContent className="p-6">
            <div className="space-y-4">
              <motion.div variants={itemVariants}>
                <h2 className="text-xl font-bold">About Me</h2>
                <p className="mt-2 text-muted-foreground">{personalInfo.bio}</p>
              </motion.div>
              <motion.div variants={itemVariants}>
                <h2 className="text-xl font-bold">Skills</h2>
                <div className="mt-2 flex flex-wrap gap-2">
                  {personalInfo.skills.map((skill, index) => (
                    <motion.div
                      key={skill}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3, delay: 0.5 + index * 0.1 }}
                    >
                      <Badge
                        variant="secondary"
                        className="hover:bg-primary hover:text-primary-foreground transition-colors duration-300"
                      >
                        {skill}
                      </Badge>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </motion.div>
  )
}

