export enum TaskStatus {
  Pending = "pending",
  InProgress = "in-progress",
  Completed = "completed",
}

export enum RecurrencePattern {
  Daily = "daily",
  Weekly = "weekly",
  Monthly = "monthly",
}

export interface Task {
  id: string
  title: string
  description: string
  status: TaskStatus
  priority: number // 1 = low, 2 = medium, 3 = high
  progress: number // 0-100
  createdAt: string
}

export interface Todo {
  id: string
  title: string
  description: string
  completed: boolean
  priority: number // 1 = low, 2 = medium, 3 = high
  recurrence: RecurrencePattern | null
  createdAt: string
}

