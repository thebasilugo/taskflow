"use client"

import { useState, useCallback, useEffect, memo } from "react"
import { type Todo, RecurrencePattern } from "@/lib/types"
import { Card, CardContent } from "@/components/ui/card"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Checkbox } from "@/components/ui/checkbox"
import { MoreVertical, Edit, Trash2, Calendar, RepeatIcon } from "lucide-react"
import TodoDialog from "@/components/todo-dialog"
import { formatDistanceToNow } from "date-fns"

interface TodoListProps {
  todos: Todo[]
  onUpdateTodo: (todo: Todo) => void
  onDeleteTodo: (todoId: string) => void
}

// Memoized TodoItem component for better performance
const TodoItem = memo(
  ({
    todo,
    onToggleComplete,
    onEditTodo,
    onDeleteTodo,
  }: {
    todo: Todo
    onToggleComplete: (todo: Todo) => void
    onEditTodo: (todo: Todo) => void
    onDeleteTodo: (todoId: string) => void
  }) => {
    const getPriorityColor = (priority: number) => {
      switch (priority) {
        case 3:
          return "bg-red-500/80 hover:bg-red-500"
        case 2:
          return "bg-yellow-500/80 hover:bg-yellow-500"
        case 1:
          return "bg-blue-500/80 hover:bg-blue-500"
        default:
          return "bg-gray-500/80 hover:bg-gray-500"
      }
    }

    const getPriorityLabel = (priority: number) => {
      switch (priority) {
        case 3:
          return "High"
        case 2:
          return "Medium"
        case 1:
          return "Low"
        default:
          return "None"
      }
    }

    const getRecurrenceLabel = (recurrence: RecurrencePattern | null) => {
      switch (recurrence) {
        case RecurrencePattern.Daily:
          return "Daily"
        case RecurrencePattern.Weekly:
          return "Weekly"
        case RecurrencePattern.Monthly:
          return "Monthly"
        default:
          return "One-time"
      }
    }

    return (
      <Card key={todo.id} className={`overflow-hidden ${todo.completed ? "bg-muted/50" : ""}`}>
        <CardContent className="p-4">
          <div className="flex justify-between items-start mb-2">
            <div className="flex items-start gap-2">
              <Checkbox
                id={`todo-${todo.id}`}
                checked={todo.completed}
                onCheckedChange={() => onToggleComplete(todo)}
                className="mt-1"
              />
              <h3
                className={`font-semibold text-lg line-clamp-1 ${
                  todo.completed ? "line-through text-muted-foreground" : ""
                }`}
              >
                {todo.title}
              </h3>
            </div>
            <div className="flex items-center">
              <Badge className={`mr-2 ${getPriorityColor(todo.priority)}`}>{getPriorityLabel(todo.priority)}</Badge>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon" className="-mr-2">
                    <MoreVertical className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem onClick={() => onEditTodo(todo)}>
                    <Edit className="mr-2 h-4 w-4" />
                    Edit
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => onDeleteTodo(todo.id)} className="text-red-600">
                    <Trash2 className="mr-2 h-4 w-4" />
                    Delete
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>

          <div className="ml-6">
            <p className={`text-sm mb-3 ${todo.completed ? "text-muted-foreground" : ""}`}>{todo.description}</p>

            <div className="flex flex-wrap gap-2 text-xs">
              <div className="flex items-center text-muted-foreground">
                <Calendar className="h-3 w-3 mr-1" />
                <span>Created {formatDistanceToNow(new Date(todo.createdAt))} ago</span>
              </div>

              {todo.recurrence !== null && (
                <div className="flex items-center text-muted-foreground">
                  <RepeatIcon className="h-3 w-3 mr-1" />
                  <span>{getRecurrenceLabel(todo.recurrence)}</span>
                </div>
              )}
            </div>
          </div>
        </CardContent>
      </Card>
    )
  },
)

TodoItem.displayName = "TodoItem"

export default function TodoList({ todos, onUpdateTodo, onDeleteTodo }: TodoListProps) {
  const [editingTodo, setEditingTodo] = useState<Todo | null>(null)
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  const completedTodos = todos.filter((todo) => todo.completed)
  const pendingTodos = todos.filter((todo) => !todo.completed)
  const dailyTodos = todos.filter((todo) => todo.recurrence === RecurrencePattern.Daily)
  const weeklyTodos = todos.filter((todo) => todo.recurrence === RecurrencePattern.Weekly)

  const handleEditTodo = useCallback((todo: Todo) => {
    setEditingTodo(todo)
    setIsDialogOpen(true)
  }, [])

  const handleUpdateTodo = useCallback(
    (updatedTodo: Todo) => {
      onUpdateTodo(updatedTodo)
      setIsDialogOpen(false)
      setEditingTodo(null)
    },
    [onUpdateTodo],
  )

  const handleToggleComplete = useCallback(
    (todo: Todo) => {
      onUpdateTodo({ ...todo, completed: !todo.completed })
    },
    [onUpdateTodo],
  )

  const renderTodoList = useCallback(
    (todoList: Todo[]) => {
      if (todoList.length === 0) {
        return <div className="text-center py-8 text-muted-foreground">No to-dos found</div>
      }

      return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {todoList.map((todo) => (
            <TodoItem
              key={todo.id}
              todo={todo}
              onToggleComplete={handleToggleComplete}
              onEditTodo={handleEditTodo}
              onDeleteTodo={onDeleteTodo}
            />
          ))}
        </div>
      )
    },
    [handleToggleComplete, handleEditTodo, onDeleteTodo],
  )

  if (!mounted) {
    return (
      <div className="flex justify-center py-12">
        <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-primary"></div>
      </div>
    )
  }

  return (
    <div>
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 gap-2">
        <h2 className="text-2xl font-bold">To-Dos</h2>
        <div className="flex flex-wrap items-center gap-2">
          <Badge variant="outline">Total: {todos.length}</Badge>
          <Badge variant="outline" className="bg-green-500/10">
            Completed: {completedTodos.length}
          </Badge>
          <Badge variant="outline" className="bg-blue-500/10">
            Pending: {pendingTodos.length}
          </Badge>
        </div>
      </div>

      <Tabs defaultValue="all">
        <TabsList className="mb-4">
          <TabsTrigger value="all">All</TabsTrigger>
          <TabsTrigger value="pending">Pending</TabsTrigger>
          <TabsTrigger value="completed">Completed</TabsTrigger>
          <TabsTrigger value="daily">Daily</TabsTrigger>
          <TabsTrigger value="weekly">Weekly</TabsTrigger>
        </TabsList>
        <TabsContent value="all" className="mt-4">
          {renderTodoList(todos)}
        </TabsContent>
        <TabsContent value="pending" className="mt-4">
          {renderTodoList(pendingTodos)}
        </TabsContent>
        <TabsContent value="completed" className="mt-4">
          {renderTodoList(completedTodos)}
        </TabsContent>
        <TabsContent value="daily" className="mt-4">
          {renderTodoList(dailyTodos)}
        </TabsContent>
        <TabsContent value="weekly" className="mt-4">
          {renderTodoList(weeklyTodos)}
        </TabsContent>
      </Tabs>

      {editingTodo && (
        <TodoDialog
          open={isDialogOpen}
          onOpenChange={setIsDialogOpen}
          onAddTodo={handleUpdateTodo}
          initialData={editingTodo}
        />
      )}
    </div>
  )
}

