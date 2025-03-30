"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"

type AnimationContextType = {
  animationsEnabled: boolean
  toggleAnimations: () => void
  isReducedMotion: boolean
}

const AnimationContext = createContext<AnimationContextType | undefined>(undefined)

export function AnimationProvider({ children }: { children: ReactNode }) {
  // Check if animations were previously disabled in localStorage
  const [animationsEnabled, setAnimationsEnabled] = useState(true)
  const [isReducedMotion, setIsReducedMotion] = useState(false)

  useEffect(() => {
    // Check localStorage for animation preference
    const storedPreference = localStorage.getItem("animationsEnabled")
    if (storedPreference !== null) {
      setAnimationsEnabled(storedPreference === "true")
    }

    // Check for reduced motion preference
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches
    setIsReducedMotion(prefersReducedMotion)

    // If user prefers reduced motion, disable animations by default
    if (prefersReducedMotion && storedPreference === null) {
      setAnimationsEnabled(false)
    }
  }, [])

  // Update localStorage when animation preference changes
  useEffect(() => {
    localStorage.setItem("animationsEnabled", animationsEnabled.toString())

    // Apply or remove animation class to the document
    if (animationsEnabled) {
      document.documentElement.classList.remove("reduce-motion")
    } else {
      document.documentElement.classList.add("reduce-motion")
    }
  }, [animationsEnabled])

  const toggleAnimations = () => {
    setAnimationsEnabled((prev) => !prev)
  }

  return (
    <AnimationContext.Provider value={{ animationsEnabled, toggleAnimations, isReducedMotion }}>
      {children}
    </AnimationContext.Provider>
  )
}

export function useAnimations() {
  const context = useContext(AnimationContext)
  if (context === undefined) {
    throw new Error("useAnimations must be used within an AnimationProvider")
  }
  return context
}

