"use client"

import { useState, useCallback, memo, useEffect } from "react"
import { type Task, TaskStatus } from "@/lib/types"
import { Card, CardContent } from "@/components/ui/card"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import { MoreVertical, Edit, Trash2, Clock, CheckCircle2, XCircle, PlayCircle, PauseCircle } from "lucide-react"
import TaskDialog from "@/components/task-dialog"
import PomodoroTimer from "@/components/pomodoro-timer"
import { formatDistanceToNow } from "date-fns"

interface TaskListProps {
  tasks: Task[]
  onUpdateTask: (task: Task) => void
  onDeleteTask: (taskId: string) => void
}

// Memoize individual task card for better performance
const TaskCard = memo(
  ({
    task,
    activeTaskId,
    setActiveTaskId,
    onUpdateTask,
    onDeleteTask,
    onEditTask,
  }: {
    task: Task
    activeTaskId: string | null
    setActiveTaskId: (id: string | null) => void
    onUpdateTask: (task: Task) => void
    onDeleteTask: (taskId: string) => void
    onEditTask: (task: Task) => void
  }) => {
    const handleStatusChange = (status: TaskStatus) => {
      onUpdateTask({ ...task, status })
    }

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

    return (
      <Card className="overflow-hidden shadow-sm transition-all hover:shadow-md">
        <CardContent className="p-0">
          <div className="p-4">
            <div className="flex justify-between items-start mb-2">
              <h3 className="font-semibold text-lg line-clamp-1">{task.title}</h3>
              <div className="flex items-center">
                <Badge className={`mr-2 ${getPriorityColor(task.priority)}`}>{getPriorityLabel(task.priority)}</Badge>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon" className="-mr-2">
                      <MoreVertical className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem onClick={() => onEditTask(task)}>
                      <Edit className="mr-2 h-4 w-4" />
                      Edit
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => onDeleteTask(task.id)} className="text-red-600">
                      <Trash2 className="mr-2 h-4 w-4" />
                      Delete
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>

            <p className="text-muted-foreground text-sm mb-3 line-clamp-2">{task.description}</p>

            <div className="flex items-center text-xs text-muted-foreground mb-3">
              <Clock className="h-3 w-3 mr-1" />
              <span>Created {formatDistanceToNow(new Date(task.createdAt))} ago</span>
            </div>

            {task.status !== TaskStatus.Completed && (
              <div className="mb-3">
                <div className="flex justify-between text-xs mb-1">
                  <span>Progress</span>
                  <span>{task.progress}%</span>
                </div>
                <Progress value={task.progress} className="h-2" />
              </div>
            )}

            <div className="flex justify-between items-center">
              <div className="flex gap-1">
                <Button
                  variant="outline"
                  size="sm"
                  className={task.status === TaskStatus.Pending ? "bg-primary text-primary-foreground" : ""}
                  onClick={() => handleStatusChange(TaskStatus.Pending)}
                >
                  <XCircle className="h-4 w-4 mr-1" />
                  Pending
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  className={task.status === TaskStatus.InProgress ? "bg-primary text-primary-foreground" : ""}
                  onClick={() => handleStatusChange(TaskStatus.InProgress)}
                >
                  <Clock className="h-4 w-4 mr-1" />
                  In Progress
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  className={task.status === TaskStatus.Completed ? "bg-primary text-primary-foreground" : ""}
                  onClick={() => handleStatusChange(TaskStatus.Completed)}
                >
                  <CheckCircle2 className="h-4 w-4 mr-1" />
                  Done
                </Button>
              </div>

              {task.status !== TaskStatus.Completed && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setActiveTaskId(activeTaskId === task.id ? null : task.id)}
                >
                  {activeTaskId === task.id ? <PauseCircle className="h-4 w-4" /> : <PlayCircle className="h-4 w-4" />}
                </Button>
              )}
            </div>

            {activeTaskId === task.id && (
              <div className="mt-3 border-t pt-3">
                <PomodoroTimer
                  onComplete={() => {
                    setActiveTaskId(null)
                    // Optionally update task progress
                    const newProgress = Math.min(task.progress + 25, 100)
                    onUpdateTask({
                      ...task,
                      progress: newProgress,
                      status: newProgress === 100 ? TaskStatus.Completed : task.status,
                    })
                  }}
                />
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    )
  },
)

TaskCard.displayName = "TaskCard"

export default function TaskList({ tasks, onUpdateTask, onDeleteTask }: TaskListProps) {
  const [editingTask, setEditingTask] = useState<Task | null>(null)
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [activeTaskId, setActiveTaskId] = useState<string | null>(null)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  const completedTasks = tasks.filter((task) => task.status === TaskStatus.Completed)
  const inProgressTasks = tasks.filter((task) => task.status === TaskStatus.InProgress)
  const pendingTasks = tasks.filter((task) => task.status === TaskStatus.Pending)

  const handleEditTask = useCallback((task: Task) => {
    setEditingTask(task)
    setIsDialogOpen(true)
  }, [])

  const handleUpdateTask = useCallback(
    (updatedTask: Task) => {
      onUpdateTask(updatedTask)
      setIsDialogOpen(false)
      setEditingTask(null)
    },
    [onUpdateTask],
  )

  const renderTaskList = useCallback(
    (taskList: Task[]) => {
      if (taskList.length === 0) {
        return <div className="text-center py-8 text-muted-foreground">No tasks found</div>
      }

      return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {taskList.map((task) => (
            <TaskCard
              key={task.id}
              task={task}
              activeTaskId={activeTaskId}
              setActiveTaskId={setActiveTaskId}
              onUpdateTask={onUpdateTask}
              onDeleteTask={onDeleteTask}
              onEditTask={handleEditTask}
            />
          ))}
        </div>
      )
    },
    [activeTaskId, onUpdateTask, onDeleteTask, handleEditTask],
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
        <h2 className="text-2xl font-bold">Tasks</h2>
        <div className="flex flex-wrap items-center gap-2">
          <Badge variant="outline">Total: {tasks.length}</Badge>
          <Badge variant="outline" className="bg-green-500/10">
            Completed: {completedTasks.length}
          </Badge>
          <Badge variant="outline" className="bg-yellow-500/10">
            In Progress: {inProgressTasks.length}
          </Badge>
          <Badge variant="outline" className="bg-blue-500/10">
            Pending: {pendingTasks.length}
          </Badge>
        </div>
      </div>

      <Tabs defaultValue="all">
        <TabsList className="mb-4">
          <TabsTrigger value="all">All</TabsTrigger>
          <TabsTrigger value="pending">Pending</TabsTrigger>
          <TabsTrigger value="in-progress">In Progress</TabsTrigger>
          <TabsTrigger value="completed">Completed</TabsTrigger>
        </TabsList>
        <TabsContent value="all" className="mt-4">
          {renderTaskList(tasks)}
        </TabsContent>
        <TabsContent value="pending" className="mt-4">
          {renderTaskList(pendingTasks)}
        </TabsContent>
        <TabsContent value="in-progress" className="mt-4">
          {renderTaskList(inProgressTasks)}
        </TabsContent>
        <TabsContent value="completed" className="mt-4">
          {renderTaskList(completedTasks)}
        </TabsContent>
      </Tabs>

      {editingTask && (
        <TaskDialog
          open={isDialogOpen}
          onOpenChange={setIsDialogOpen}
          onAddTask={handleUpdateTask}
          initialData={editingTask}
        />
      )}
    </div>
  )
}

