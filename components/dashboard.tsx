"use client"

import { useState, useEffect, useCallback } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { PlusCircle, ListChecks, CheckSquare, BarChart3, Github, Linkedin } from "lucide-react"
import type { Task, Todo } from "@/lib/types"
import { v4 as uuidv4 } from "uuid"
import TaskList from "@/components/task-list"
import TodoList from "@/components/todo-list"
import TaskDialog from "@/components/task-dialog"
import TodoDialog from "@/components/todo-dialog"
import Analytics from "@/components/analytics"
import SearchBar from "@/components/search-bar"
import { ModeToggle } from "@/components/theme-toggle"
import { useLocalStorage } from "@/hooks/use-local-storage"

export default function Dashboard() {
  // State for tasks and todos
  const [tasks, setTasks] = useLocalStorage<Task[]>("tasks", [])
  const [todos, setTodos] = useLocalStorage<Todo[]>("todos", [])

  // Dialog states
  const [isTaskDialogOpen, setIsTaskDialogOpen] = useState(false)
  const [isTodoDialogOpen, setIsTodoDialogOpen] = useState(false)

  // Search state
  const [searchQuery, setSearchQuery] = useState("")

  // Client-side rendering check
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  // Filter tasks and todos based on search query
  const filteredTasks = tasks.filter((task) => {
    if (!searchQuery) return true
    const query = searchQuery.toLowerCase()
    return task.title.toLowerCase().includes(query) || task.description.toLowerCase().includes(query)
  })

  const filteredTodos = todos.filter((todo) => {
    if (!searchQuery) return true
    const query = searchQuery.toLowerCase()
    return todo.title.toLowerCase().includes(query) || todo.description.toLowerCase().includes(query)
  })

  // Task handlers
  const handleAddTask = useCallback(
    (task: Task) => {
      const newTask: Task = {
        ...task,
        id: uuidv4(),
        createdAt: new Date().toISOString(),
      }
      setTasks((prev) => [...prev, newTask])
      setIsTaskDialogOpen(false)
    },
    [setTasks],
  )

  const handleUpdateTask = useCallback(
    (updatedTask: Task) => {
      setTasks((prev) => prev.map((task) => (task.id === updatedTask.id ? updatedTask : task)))
    },
    [setTasks],
  )

  const handleDeleteTask = useCallback(
    (taskId: string) => {
      setTasks((prev) => prev.filter((task) => task.id !== taskId))
    },
    [setTasks],
  )

  // Todo handlers
  const handleAddTodo = useCallback(
    (todo: Todo) => {
      const newTodo: Todo = {
        ...todo,
        id: uuidv4(),
        createdAt: new Date().toISOString(),
      }
      setTodos((prev) => [...prev, newTodo])
      setIsTodoDialogOpen(false)
    },
    [setTodos],
  )

  const handleUpdateTodo = useCallback(
    (updatedTodo: Todo) => {
      setTodos((prev) => prev.map((todo) => (todo.id === updatedTodo.id ? updatedTodo : todo)))
    },
    [setTodos],
  )

  const handleDeleteTodo = useCallback(
    (todoId: string) => {
      setTodos((prev) => prev.filter((todo) => todo.id !== todoId))
    },
    [setTodos],
  )

  // Loading state
  if (!mounted) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="flex flex-col items-center gap-4">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
          <p className="text-muted-foreground">Loading TaskFlow...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen flex flex-col">
      <header className="sticky top-0 z-50 bg-background border-b py-4">
        <div className="container mx-auto px-4 flex flex-col sm:flex-row gap-4 justify-between items-center">
          <div className="flex items-center gap-2">
            <ListChecks className="h-6 w-6 text-primary" />
            <span className="font-bold text-xl">TaskFlow</span>
          </div>

          <div className="w-full max-w-md">
            <SearchBar value={searchQuery} onChange={setSearchQuery} />
          </div>

          <ModeToggle />
        </div>
      </header>

      <main className="flex-1 py-8">
        <div className="container mx-auto px-4">
          <Tabs defaultValue="tasks" className="space-y-6">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <TabsList>
                <TabsTrigger value="tasks" className="flex items-center gap-2">
                  <ListChecks className="h-4 w-4" />
                  Tasks
                </TabsTrigger>
                <TabsTrigger value="todos" className="flex items-center gap-2">
                  <CheckSquare className="h-4 w-4" />
                  To-Dos
                </TabsTrigger>
                <TabsTrigger value="analytics" className="flex items-center gap-2">
                  <BarChart3 className="h-4 w-4" />
                  Analytics
                </TabsTrigger>
              </TabsList>

              <div className="flex gap-2">
                {/* Conditionally render the appropriate Add button based on active tab */}
                <TabsContent value="tasks" className="m-0 p-0 border-0">
                  <Button onClick={() => setIsTaskDialogOpen(true)} className="flex items-center gap-2">
                    <PlusCircle className="h-4 w-4" />
                    Add Task
                  </Button>
                </TabsContent>
                <TabsContent value="todos" className="m-0 p-0 border-0">
                  <Button onClick={() => setIsTodoDialogOpen(true)} className="flex items-center gap-2">
                    <PlusCircle className="h-4 w-4" />
                    Add To-Do
                  </Button>
                </TabsContent>
              </div>
            </div>

            <TabsContent value="tasks" className="space-y-6">
              <TaskList tasks={filteredTasks} onUpdateTask={handleUpdateTask} onDeleteTask={handleDeleteTask} />
            </TabsContent>

            <TabsContent value="todos" className="space-y-6">
              <TodoList todos={filteredTodos} onUpdateTodo={handleUpdateTodo} onDeleteTodo={handleDeleteTodo} />
            </TabsContent>

            <TabsContent value="analytics" className="space-y-6">
              <Analytics tasks={tasks} todos={todos} />
            </TabsContent>
          </Tabs>
        </div>
      </main>

      <footer className="py-6 border-t">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-sm text-muted-foreground">© {new Date().getFullYear()} TaskFlow. All rights reserved.</p>

            <div className="flex flex-col md:flex-row items-center gap-4">
              <p className="text-sm text-muted-foreground">
                Designed & Developed by <span className="font-semibold text-foreground">Basil Ugo</span>
              </p>

              <div className="flex items-center gap-3">
                <a
                  href="https://github.com/thebasilugo"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-muted-foreground hover:text-primary transition-colors"
                  aria-label="GitHub Profile"
                >
                  <Github className="h-5 w-5" />
                </a>
                <a
                  href="https://linkedin.com/in/thebasilugo"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-muted-foreground hover:text-primary transition-colors"
                  aria-label="LinkedIn Profile"
                >
                  <Linkedin className="h-5 w-5" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </footer>

      {/* Task Dialog */}
      <TaskDialog open={isTaskDialogOpen} onOpenChange={setIsTaskDialogOpen} onAddTask={handleAddTask} />

      {/* Todo Dialog */}
      <TodoDialog open={isTodoDialogOpen} onOpenChange={setIsTodoDialogOpen} onAddTodo={handleAddTodo} />
    </div>
  )
}

