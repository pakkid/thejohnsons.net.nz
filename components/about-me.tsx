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
    name: "Sebastian",
    title: "Full Stack Developer",
    location: "Auckland, NZ",
    email: "pakkid@mail.thejohnsons.net.nz",
    github: "pakkid",
    // linkedin: "yourlinkedin",
    bio: "Passionate developer with expertise in React, Next.js, and TypeScript. I love building user-friendly web applications and exploring new technologies.",
    skills: [
      { name: "JavaScript", icon: "https://raw.githubusercontent.com/danielcranney/readme-generator/main/public/icons/skills/javascript-colored.svg" },
      { name: "Git", icon: "https://raw.githubusercontent.com/danielcranney/readme-generator/main/public/icons/skills/git-colored.svg" },
      { name: "Python", icon: "https://raw.githubusercontent.com/danielcranney/readme-generator/main/public/icons/skills/python-colored.svg" },
      { name: "TypeScript", icon: "https://raw.githubusercontent.com/danielcranney/readme-generator/main/public/icons/skills/typescript-colored.svg" },
      { name: "Bash", icon: "https://raw.githubusercontent.com/danielcranney/readme-generator/main/public/icons/skills/gnubash.svg" },
      { name: "VS Code", icon: "https://raw.githubusercontent.com/danielcranney/readme-generator/main/public/icons/skills/visualstudiocode.svg" },
      { name: "Sublime Text", icon: "https://raw.githubusercontent.com/danielcranney/readme-generator/main/public/icons/skills/sublimetext.svg" },
      { name: "HTML5", icon: "https://raw.githubusercontent.com/danielcranney/readme-generator/main/public/icons/skills/html5-colored.svg" },
      { name: "React", icon: "https://raw.githubusercontent.com/danielcranney/readme-generator/main/public/icons/skills/react-colored.svg" },
      { name: "Next.js", icon: "https://raw.githubusercontent.com/danielcranney/readme-generator/main/public/icons/skills/nextjs.svg" },
      { name: "CSS3", icon: "https://raw.githubusercontent.com/danielcranney/readme-generator/main/public/icons/skills/css3-colored.svg" },
      { name: "Tailwind CSS", icon: "https://raw.githubusercontent.com/danielcranney/readme-generator/main/public/icons/skills/tailwindcss-colored.svg" },
      { name: "Bootstrap", icon: "https://raw.githubusercontent.com/danielcranney/readme-generator/main/public/icons/skills/bootstrap-colored.svg" },
      { name: "Node.js", icon: "https://raw.githubusercontent.com/danielcranney/readme-generator/main/public/icons/skills/nodejs.svg" },
      { name: "Firebase", icon: "https://raw.githubusercontent.com/danielcranney/readme-generator/main/public/icons/skills/firebase-colored.svg" },
      { name: "Flask", icon: "https://raw.githubusercontent.com/danielcranney/readme-generator/main/public/icons/skills/flask-colored.svg" },
      { name: "Arduino", icon: "https://raw.githubusercontent.com/danielcranney/readme-generator/main/public/icons/skills/arduino-colored.svg" },
      { name: "Blender", icon: "https://raw.githubusercontent.com/danielcranney/readme-generator/main/public/icons/skills/blender-colored.svg" },
      { name: "Docker", icon: "https://raw.githubusercontent.com/danielcranney/readme-generator/main/public/icons/skills/docker-colored.svg" },
      { name: "Linux", icon: "https://raw.githubusercontent.com/danielcranney/readme-generator/main/public/icons/skills/linux-colored.svg" },
      { name: "Raspberry Pi", icon: "https://raw.githubusercontent.com/danielcranney/readme-generator/main/public/icons/skills/raspberrypi-colored.svg" }
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
                <AvatarImage src="/user.png?height=128&width=128" alt={personalInfo.name} />
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
                {/*<Button variant="outline" size="icon" asChild>
                  <a
                    href={`https://linkedin.com/in/${personalInfo.linkedin}`}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Linkedin className="h-4 w-4" />
                    <span className="sr-only">LinkedIn</span>
                  </a>
                </Button>*/}
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
                <div className="mt-2 flex flex-wrap gap-4">
                  {personalInfo.skills.map((skill) => (
                    <div key={skill.name} className="tooltip" data-tip={skill.name}>
                      <img 
                        src={skill.icon} 
                        alt={skill.name} 
                        width={36} 
                        height={36} 
                        className="hover:scale-110 transition-transform"
                      />
                    </div>
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
                  <AvatarImage src="/user.png?height=128&width=128" alt={personalInfo.name} />
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
                {/*<Button variant="outline" size="icon" asChild className="hover:scale-110 transition-transform">
                  <a
                    href={`https://linkedin.com/in/${personalInfo.linkedin}`}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Linkedin className="h-4 w-4" />
                    <span className="sr-only">LinkedIn</span>
                  </a>
                </Button>*/}
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
                <div className="mt-2 flex flex-wrap gap-4">
                  {personalInfo.skills.map((skill, index) => (
                    <motion.div
                      key={skill.name}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3, delay: 0.5 + index * 0.1 }}
                      className="tooltip" 
                      data-tip={skill.name}
                    >
                      <img 
                        src={skill.icon} 
                        alt={skill.name} 
                        width={36} 
                        height={36}
                        className="hover:scale-110 transition-transform" 
                      />
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

