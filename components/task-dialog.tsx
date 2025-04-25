"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Slider } from "@/components/ui/slider"
import { type Task, TaskStatus } from "@/lib/types"

interface TaskDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  onAddTask: (task: Task) => void
  initialData?: Task
}

export default function TaskDialog({ open, onOpenChange, onAddTask, initialData }: TaskDialogProps) {
  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [priority, setPriority] = useState<number>(1)
  const [progress, setProgress] = useState<number>(0)

  // Reset form when dialog opens/closes or initialData changes
  useEffect(() => {
    if (initialData) {
      setTitle(initialData.title)
      setDescription(initialData.description)
      setPriority(initialData.priority)
      setProgress(initialData.progress)
    } else {
      setTitle("")
      setDescription("")
      setPriority(1)
      setProgress(0)
    }
  }, [open, initialData])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    const task: Task = {
      id: initialData?.id || "",
      title,
      description,
      status: initialData?.status || TaskStatus.Pending,
      priority,
      progress,
      createdAt: initialData?.createdAt || new Date().toISOString(),
    }

    onAddTask(task)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <form onSubmit={handleSubmit}>
          <DialogHeader>
            <DialogTitle>{initialData ? "Edit Task" : "Add New Task"}</DialogTitle>
          </DialogHeader>

          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="title">Title</Label>
              <Input
                id="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Task title"
                required
              />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Task description"
                rows={3}
              />
            </div>

            <div className="grid gap-2">
              <Label>Priority</Label>
              <RadioGroup
                value={priority.toString()}
                onValueChange={(value) => setPriority(Number.parseInt(value))}
                className="flex space-x-2"
              >
                <div className="flex items-center space-x-1">
                  <RadioGroupItem value="1" id="low" />
                  <Label htmlFor="low" className="text-sm">
                    Low
                  </Label>
                </div>
                <div className="flex items-center space-x-1">
                  <RadioGroupItem value="2" id="medium" />
                  <Label htmlFor="medium" className="text-sm">
                    Medium
                  </Label>
                </div>
                <div className="flex items-center space-x-1">
                  <RadioGroupItem value="3" id="high" />
                  <Label htmlFor="high" className="text-sm">
                    High
                  </Label>
                </div>
              </RadioGroup>
            </div>

            <div className="grid gap-2">
              <div className="flex justify-between">
                <Label>Progress</Label>
                <span className="text-sm text-muted-foreground">{progress}%</span>
              </div>
              <Slider value={[progress]} min={0} max={100} step={5} onValueChange={(value) => setProgress(value[0])} />
            </div>
          </div>

          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button type="submit">{initialData ? "Update Task" : "Create Task"}</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}

