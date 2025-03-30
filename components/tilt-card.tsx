"use client"

import type React from "react"

import { useState, useRef, type ReactNode } from "react"
import { useAnimations } from "@/contexts/animation-context"
import { motion } from "framer-motion"
import { cn } from "@/lib/utils"

interface TiltCardProps {
  children: ReactNode
  className?: string
  onClick?: () => void
  tiltAmount?: number
  glareEnabled?: boolean
  scale?: number
}

export default function TiltCard({
  children,
  className,
  onClick,
  tiltAmount = 10,
  glareEnabled = true,
  scale = 1.02,
}: TiltCardProps) {
  const { animationsEnabled } = useAnimations()
  const cardRef = useRef<HTMLDivElement>(null)
  const [rotation, setRotation] = useState({ x: 0, y: 0 })
  const [glarePosition, setGlarePosition] = useState({ x: 0, y: 0 })
  const [isHovered, setIsHovered] = useState(false)

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!animationsEnabled || !cardRef.current) return

    const card = cardRef.current
    const rect = card.getBoundingClientRect()

    // Calculate mouse position relative to card center
    const x = e.clientX - rect.left - rect.width / 2
    const y = e.clientY - rect.top - rect.height / 2

    // Calculate rotation (inverted for natural feel)
    const rotateX = -(y / (rect.height / 2)) * tiltAmount
    const rotateY = (x / (rect.width / 2)) * tiltAmount

    setRotation({ x: rotateX, y: rotateY })

    // Calculate glare position
    const glareX = ((e.clientX - rect.left) / rect.width) * 100
    const glareY = ((e.clientY - rect.top) / rect.height) * 100
    setGlarePosition({ x: glareX, y: glareY })
  }

  const handleMouseLeave = () => {
    setRotation({ x: 0, y: 0 })
    setIsHovered(false)
  }

  const handleMouseEnter = () => {
    setIsHovered(true)
  }

  // If animations are disabled, render a regular div
  if (!animationsEnabled) {
    return (
      <div className={className} onClick={onClick}>
        {children}
      </div>
    )
  }

  return (
    <motion.div
      ref={cardRef}
      className={cn(className, "relative overflow-hidden")}
      onClick={onClick}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onMouseEnter={handleMouseEnter}
      style={{
        transformStyle: "preserve-3d",
      }}
      animate={{
        rotateX: rotation.x,
        rotateY: rotation.y,
        scale: isHovered ? scale : 1,
      }}
      transition={{
        type: "spring",
        stiffness: 300,
        damping: 15,
        mass: 0.5,
      }}
    >
      {children}

      {/* Glare effect */}
      {glareEnabled && isHovered && (
        <div
          className="absolute inset-0 pointer-events-none opacity-60 bg-gradient-radial from-white/30 to-transparent"
          style={{
            backgroundPosition: `${glarePosition.x}% ${glarePosition.y}%`,
            backgroundSize: "200% 200%",
          }}
        />
      )}
    </motion.div>
  )
}

