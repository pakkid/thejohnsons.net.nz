"use client"

import { useAnimations } from "@/contexts/animation-context"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Sparkles, Zap } from "lucide-react"
import { cn } from "@/lib/utils"

export default function AnimationToggle({ className }: { className?: string }) {
  const { animationsEnabled, toggleAnimations } = useAnimations()

  return (
    <div className={cn("flex items-center space-x-2", className)}>
      <Switch id="animation-toggle" checked={animationsEnabled} onCheckedChange={toggleAnimations} />
      <Label htmlFor="animation-toggle" className="flex items-center gap-1.5 cursor-pointer">
        {animationsEnabled ? (
          <>
            <Sparkles className="h-4 w-4 text-primary" />
            <span>Animations On</span>
          </>
        ) : (
          <>
            <Zap className="h-4 w-4" />
            <span>Performance Mode</span>
          </>
        )}
      </Label>
    </div>
  )
}

