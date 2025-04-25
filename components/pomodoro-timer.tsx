"use client"

import { useState, useEffect, useCallback } from "react"
import { Button } from "@/components/ui/button"
import { Slider } from "@/components/ui/slider"
import { Play, Pause, RotateCcw } from "lucide-react"
import { Progress } from "@/components/ui/progress"

interface PomodoroTimerProps {
  onComplete: () => void
}

export default function PomodoroTimer({ onComplete }: PomodoroTimerProps) {
  const [duration, setDuration] = useState(25) // minutes
  const [timeLeft, setTimeLeft] = useState(duration * 60) // seconds
  const [isActive, setIsActive] = useState(false)
  const [progress, setProgress] = useState(100)

  useEffect(() => {
    setTimeLeft(duration * 60)
    setProgress(100)
  }, [duration])

  useEffect(() => {
    let interval: NodeJS.Timeout | null = null

    if (isActive && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft((prevTime) => {
          const newTime = prevTime - 1
          setProgress((newTime / (duration * 60)) * 100)
          return newTime
        })
      }, 1000)
    } else if (isActive && timeLeft === 0) {
      setIsActive(false)
      onComplete()
    }

    return () => {
      if (interval) clearInterval(interval)
    }
  }, [isActive, timeLeft, duration, onComplete])

  const toggleTimer = useCallback(() => {
    setIsActive((prev) => !prev)
  }, [])

  const resetTimer = useCallback(() => {
    setIsActive(false)
    setTimeLeft(duration * 60)
    setProgress(100)
  }, [duration])

  const formatTime = useCallback((seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`
  }, [])

  return (
    <div className="flex flex-col gap-3">
      <div className="flex justify-between items-center">
        <div className="text-2xl font-mono">{formatTime(timeLeft)}</div>
        <div className="flex gap-2">
          <Button variant="outline" size="icon" onClick={toggleTimer} className="h-8 w-8">
            {isActive ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
          </Button>
          <Button variant="outline" size="icon" onClick={resetTimer} className="h-8 w-8">
            <RotateCcw className="h-4 w-4" />
          </Button>
        </div>
      </div>
      <Progress value={progress} className="h-2" />
      <div className="flex items-center gap-2">
        <span className="text-xs">Duration:</span>
        <Slider
          value={[duration]}
          min={5}
          max={60}
          step={5}
          onValueChange={(value) => setDuration(value[0])}
          disabled={isActive}
          className="flex-1"
        />
        <span className="text-xs w-8">{duration}m</span>
      </div>
    </div>
  )
}

