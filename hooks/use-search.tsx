"use client"

import { useState, useMemo } from "react"
import type { Task, Todo } from "@/lib/types"

export function useSearch(tasks: Task[], todos: Todo[]) {
  const [searchQuery, setSearchQuery] = useState("")

  const filteredTasks = useMemo(() => {
    if (!searchQuery.trim()) return tasks

    const query = searchQuery.toLowerCase()
    return tasks.filter(
      (task) =>
        task.title.toLowerCase().includes(query) ||
        (task.description && task.description.toLowerCase().includes(query)),
    )
  }, [tasks, searchQuery])

  const filteredTodos = useMemo(() => {
    if (!searchQuery.trim()) return todos

    const query = searchQuery.toLowerCase()
    return todos.filter(
      (todo) =>
        todo.title.toLowerCase().includes(query) ||
        (todo.description && todo.description.toLowerCase().includes(query)),
    )
  }, [todos, searchQuery])

  return {
    searchQuery,
    setSearchQuery,
    filteredTasks,
    filteredTodos,
  }
}

