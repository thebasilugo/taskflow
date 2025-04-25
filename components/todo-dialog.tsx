"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { type Todo, RecurrencePattern } from "@/lib/types"

interface TodoDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  onAddTodo: (todo: Todo) => void
  initialData?: Todo
}

export default function TodoDialog({ open, onOpenChange, onAddTodo, initialData }: TodoDialogProps) {
  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [priority, setPriority] = useState<number>(1)
  const [recurrence, setRecurrence] = useState<string | null>(null)

  // Reset form when dialog opens/closes or initialData changes
  useEffect(() => {
    if (initialData) {
      setTitle(initialData.title)
      setDescription(initialData.description)
      setPriority(initialData.priority)
      setRecurrence(initialData.recurrence)
    } else {
      setTitle("")
      setDescription("")
      setPriority(1)
      setRecurrence(null)
    }
  }, [open, initialData])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    const todo: Todo = {
      id: initialData?.id || "",
      title,
      description,
      completed: initialData?.completed || false,
      priority,
      recurrence: recurrence as RecurrencePattern | null,
      createdAt: initialData?.createdAt || new Date().toISOString(),
    }

    onAddTodo(todo)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <form onSubmit={handleSubmit}>
          <DialogHeader>
            <DialogTitle>{initialData ? "Edit To-Do" : "Add New To-Do"}</DialogTitle>
          </DialogHeader>

          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="title">Title</Label>
              <Input
                id="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="To-do title"
                required
              />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="To-do description"
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
              <Label htmlFor="recurrence">Recurrence</Label>
              <Select value={recurrence || ""} onValueChange={(value) => setRecurrence(value || null)}>
                <SelectTrigger>
                  <SelectValue placeholder="One-time (no recurrence)" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="none">One-time (no recurrence)</SelectItem>
                  <SelectItem value={RecurrencePattern.Daily}>Daily</SelectItem>
                  <SelectItem value={RecurrencePattern.Weekly}>Weekly</SelectItem>
                  <SelectItem value={RecurrencePattern.Monthly}>Monthly</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button type="submit">{initialData ? "Update To-Do" : "Create To-Do"}</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}

