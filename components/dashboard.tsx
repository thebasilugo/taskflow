"use client"

import { useState, useEffect, useCallback } from "react"
import Link from "next/link"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import {
  PlusCircle,
  ListChecks,
  CheckSquare,
  BarChart3,
  Github,
  Linkedin,
  Clock,
  Calendar,
  Search,
  Bell,
  User,
  Settings,
  LogOut,
  CheckCircle2,
  XCircle,
  Filter,
  SortAsc,
  SortDesc,
  Layers,
  Home,
} from "lucide-react"
import type { Task, Todo } from "@/lib/types"
import { v4 as uuidv4 } from "uuid"
import { useLocalStorage } from "@/hooks/use-local-storage"
import { ModeToggle } from "@/components/theme-toggle"
import TaskList from "@/components/task-list"
import TodoList from "@/components/todo-list"
import TaskDialog from "@/components/task-dialog"
import TodoDialog from "@/components/todo-dialog"
import Analytics from "@/components/analytics"

export default function Dashboard() {
  // State for tasks and todos
  const [tasks, setTasks] = useLocalStorage<Task[]>("tasks", [])
  const [todos, setTodos] = useLocalStorage<Todo[]>("todos", [])

  // Dialog states
  const [isTaskDialogOpen, setIsTaskDialogOpen] = useState(false)
  const [isTodoDialogOpen, setIsTodoDialogOpen] = useState(false)
  const [editingTask, setEditingTask] = useState<Task | null>(null)
  const [editingTodo, setEditingTodo] = useState<Todo | null>(null)

  // UI states
  const [activeTab, setActiveTab] = useState("tasks")
  const [mounted, setMounted] = useState(false)
  const [showNotifications, setShowNotifications] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")

  useEffect(() => {
    setMounted(true)
  }, [])

  // Filter tasks and todos based on search query
  const filteredTasks = tasks.filter((task) => {
    if (!searchQuery) return true
    const query = searchQuery.toLowerCase()
    return (
      task.title.toLowerCase().includes(query) || (task.description && task.description.toLowerCase().includes(query))
    )
  })

  const filteredTodos = todos.filter((todo) => {
    if (!searchQuery) return true
    const query = searchQuery.toLowerCase()
    return (
      todo.title.toLowerCase().includes(query) || (todo.description && todo.description.toLowerCase().includes(query))
    )
  })

  // Task handlers
  const handleAddTask = useCallback(
    (task: Task) => {
      if (editingTask) {
        setTasks((prev) => prev.map((t) => (t.id === task.id ? task : t)))
        setEditingTask(null)
      } else {
        const newTask = {
          ...task,
          id: uuidv4(),
          createdAt: new Date().toISOString(),
        }
        setTasks((prev) => [...prev, newTask])
      }
      setIsTaskDialogOpen(false)
    },
    [editingTask, setTasks],
  )

  const handleEditTask = useCallback((task: Task) => {
    setEditingTask(task)
    setIsTaskDialogOpen(true)
  }, [])

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
      if (editingTodo) {
        setTodos((prev) => prev.map((t) => (t.id === todo.id ? todo : t)))
        setEditingTodo(null)
      } else {
        const newTodo = {
          ...todo,
          id: uuidv4(),
          createdAt: new Date().toISOString(),
        }
        setTodos((prev) => [...prev, newTodo])
      }
      setIsTodoDialogOpen(false)
    },
    [editingTodo, setTodos],
  )

  const handleEditTodo = useCallback((todo: Todo) => {
    setEditingTodo(todo)
    setIsTodoDialogOpen(true)
  }, [])

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
    <div className="min-h-screen flex flex-col bg-background">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-background/80 backdrop-blur-md border-b">
        <div className="container mx-auto px-4 py-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Link href="/" className="flex items-center gap-2">
                <div className="h-8 w-8 rounded-lg bg-primary flex items-center justify-center">
                  <ListChecks className="h-5 w-5 text-primary-foreground" />
                </div>
                <span className="font-bold text-xl hidden sm:inline-block">TaskFlow</span>
              </Link>

              <Link
                href="/"
                className="text-sm text-muted-foreground hover:text-foreground transition-colors flex items-center gap-1"
              >
                <Home className="h-4 w-4" />
                <span className="hidden sm:inline-block">Home</span>
              </Link>
            </div>

            <div className="flex-1 max-w-md mx-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <input
                  type="text"
                  placeholder="Search tasks and to-dos..."
                  className="w-full rounded-full bg-muted px-10 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                {searchQuery && (
                  <button
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                    onClick={() => setSearchQuery("")}
                  >
                    <XCircle className="h-4 w-4" />
                  </button>
                )}
              </div>
            </div>

            <div className="flex items-center gap-2">
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="relative"
                      onClick={() => setShowNotifications(!showNotifications)}
                    >
                      <Bell className="h-5 w-5" />
                      <span className="absolute -top-1 -right-1 h-4 w-4 rounded-full bg-primary text-[10px] text-primary-foreground flex items-center justify-center">
                        3
                      </span>
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>Notifications</TooltipContent>
                </Tooltip>
              </TooltipProvider>

              <ModeToggle />

              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon" className="rounded-full">
                    <Avatar className="h-8 w-8">
                      <AvatarImage src="/placeholder.svg?height=32&width=32" alt="User" />
                      <AvatarFallback>BU</AvatarFallback>
                    </Avatar>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56">
                  <div className="flex items-center justify-start gap-2 p-2">
                    <div className="flex flex-col space-y-1 leading-none">
                      <p className="font-medium">Basil Ugo</p>
                      <p className="text-xs text-muted-foreground">thebasilugo@example.com</p>
                    </div>
                  </div>
                  <DropdownMenuItem className="cursor-pointer">
                    <User className="mr-2 h-4 w-4" />
                    <span>Profile</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem className="cursor-pointer">
                    <Settings className="mr-2 h-4 w-4" />
                    <span>Settings</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem className="cursor-pointer text-red-600">
                    <LogOut className="mr-2 h-4 w-4" />
                    <span>Log out</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </div>
      </header>

      {/* Notifications Panel */}
      {showNotifications && (
        <div className="absolute right-4 top-16 z-50 w-80 bg-card border rounded-lg shadow-lg p-4">
          <div className="flex justify-between items-center mb-2">
            <h3 className="font-semibold">Notifications</h3>
            <Button variant="ghost" size="sm" className="text-xs">
              Mark all as read
            </Button>
          </div>
          <div className="space-y-2">
            <div className="p-2 rounded-md bg-primary/5 border border-primary/10">
              <div className="flex gap-2">
                <div className="h-8 w-8 rounded-full bg-primary/20 flex items-center justify-center shrink-0">
                  <CheckCircle2 className="h-4 w-4 text-primary" />
                </div>
                <div>
                  <p className="text-sm font-medium">Task completed</p>
                  <p className="text-xs text-muted-foreground">You completed "Research competitors"</p>
                  <p className="text-xs text-muted-foreground mt-1">2 hours ago</p>
                </div>
              </div>
            </div>
            <div className="p-2 rounded-md bg-muted">
              <div className="flex gap-2">
                <div className="h-8 w-8 rounded-full bg-blue-500/20 flex items-center justify-center shrink-0">
                  <Clock className="h-4 w-4 text-blue-500" />
                </div>
                <div>
                  <p className="text-sm font-medium">Reminder</p>
                  <p className="text-xs text-muted-foreground">Team meeting in 30 minutes</p>
                  <p className="text-xs text-muted-foreground mt-1">1 day ago</p>
                </div>
              </div>
            </div>
            <div className="p-2 rounded-md bg-muted">
              <div className="flex gap-2">
                <div className="h-8 w-8 rounded-full bg-amber-500/20 flex items-center justify-center shrink-0">
                  <Calendar className="h-4 w-4 text-amber-500" />
                </div>
                <div>
                  <p className="text-sm font-medium">Due date approaching</p>
                  <p className="text-xs text-muted-foreground">"Complete project proposal" due tomorrow</p>
                  <p className="text-xs text-muted-foreground mt-1">2 days ago</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Main Content */}
      <main className="flex-1 container mx-auto px-4 py-6">
        <div className="mb-6">
          <h1 className="text-3xl font-bold mb-2">Dashboard</h1>
          <p className="text-muted-foreground">Manage your tasks and to-dos efficiently</p>
        </div>

        <div className="mb-6">
          <Card className="bg-gradient-to-r from-primary/10 to-purple-500/10 border-none">
            <CardContent className="p-6">
              <div className="flex flex-col md:flex-row justify-between gap-4">
                <div>
                  <h2 className="text-2xl font-bold mb-2">Welcome back, Basil!</h2>
                  <p className="text-muted-foreground mb-4">
                    You have {tasks.length} tasks and {todos.length} to-dos. {todos.filter((t) => t.completed).length}{" "}
                    to-dos completed.
                  </p>
                  <div className="flex gap-2">
                    <Button
                      onClick={() => {
                        setEditingTask(null)
                        setIsTaskDialogOpen(true)
                      }}
                      className="gap-2"
                    >
                      <PlusCircle className="h-4 w-4" />
                      New Task
                    </Button>
                    <Button
                      variant="outline"
                      onClick={() => {
                        setEditingTodo(null)
                        setIsTodoDialogOpen(true)
                      }}
                      className="gap-2"
                    >
                      <PlusCircle className="h-4 w-4" />
                      New To-Do
                    </Button>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="text-center">
                    <div className="text-3xl font-bold">{tasks.filter((t) => t.status === "completed").length}</div>
                    <div className="text-sm text-muted-foreground">Tasks Completed</div>
                  </div>
                  <div className="h-12 w-px bg-border"></div>
                  <div className="text-center">
                    <div className="text-3xl font-bold">{todos.filter((t) => t.completed).length}</div>
                    <div className="text-sm text-muted-foreground">To-Dos Completed</div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <TabsList className="bg-muted/50">
              <TabsTrigger
                value="tasks"
                className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
              >
                <ListChecks className="h-4 w-4 mr-2" />
                Tasks
              </TabsTrigger>
              <TabsTrigger
                value="todos"
                className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
              >
                <CheckSquare className="h-4 w-4 mr-2" />
                To-Dos
              </TabsTrigger>
              <TabsTrigger
                value="analytics"
                className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
              >
                <BarChart3 className="h-4 w-4 mr-2" />
                Analytics
              </TabsTrigger>
            </TabsList>

            <div className="flex gap-2">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" size="sm" className="h-9 gap-1">
                    <Filter className="h-4 w-4" />
                    <span className="hidden sm:inline-block">Filter</span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem>
                    <CheckCircle2 className="mr-2 h-4 w-4 text-green-500" />
                    <span>Completed</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <Clock className="mr-2 h-4 w-4 text-amber-500" />
                    <span>In Progress</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <XCircle className="mr-2 h-4 w-4 text-blue-500" />
                    <span>Pending</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <Layers className="mr-2 h-4 w-4" />
                    <span>All</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>

              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" size="sm" className="h-9 gap-1">
                    <SortAsc className="h-4 w-4" />
                    <span className="hidden sm:inline-block">Sort</span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem>
                    <SortAsc className="mr-2 h-4 w-4" />
                    <span>Newest First</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <SortDesc className="mr-2 h-4 w-4" />
                    <span>Oldest First</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <SortAsc className="mr-2 h-4 w-4" />
                    <span>Priority (High-Low)</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <SortDesc className="mr-2 h-4 w-4" />
                    <span>Priority (Low-High)</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>

          <TabsContent value="tasks" className="space-y-6 mt-6">
            <TaskList
              tasks={filteredTasks}
              onUpdateTask={handleUpdateTask}
              onDeleteTask={handleDeleteTask}
              onEditTask={handleEditTask}
            />
          </TabsContent>

          <TabsContent value="todos" className="space-y-6 mt-6">
            <TodoList
              todos={filteredTodos}
              onUpdateTodo={handleUpdateTodo}
              onDeleteTodo={handleDeleteTodo}
              onEditTodo={handleEditTodo}
            />
          </TabsContent>

          <TabsContent value="analytics" className="space-y-6 mt-6">
            <Analytics tasks={tasks} todos={todos} />
          </TabsContent>
        </Tabs>
      </main>

      {/* Footer */}
      <footer className="py-6 border-t bg-muted/30">
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
      <TaskDialog
        open={isTaskDialogOpen}
        onOpenChange={setIsTaskDialogOpen}
        onAddTask={handleAddTask}
        initialData={editingTask}
      />

      {/* Todo Dialog */}
      <TodoDialog
        open={isTodoDialogOpen}
        onOpenChange={setIsTodoDialogOpen}
        onAddTodo={handleAddTodo}
        initialData={editingTodo}
      />
    </div>
  )
}
