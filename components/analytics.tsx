"use client"

import { useMemo, useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { type Task, type Todo, TaskStatus, RecurrencePattern } from "@/lib/types"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { CheckCircle2, Clock, XCircle, BarChart3, PieChart, TrendingUp } from "lucide-react"

interface AnalyticsProps {
  tasks: Task[]
  todos: Todo[]
}

export default function Analytics({ tasks, todos }: AnalyticsProps) {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  const taskStats = useMemo(() => {
    const completed = tasks.filter((task) => task.status === TaskStatus.Completed).length
    const inProgress = tasks.filter((task) => task.status === TaskStatus.InProgress).length
    const pending = tasks.filter((task) => task.status === TaskStatus.Pending).length
    const total = tasks.length

    const completionRate = total > 0 ? (completed / total) * 100 : 0
    const avgProgress = tasks.length > 0 ? tasks.reduce((sum, task) => sum + task.progress, 0) / tasks.length : 0

    // Group by priority
    const byPriority = {
      high: tasks.filter((task) => task.priority === 3).length,
      medium: tasks.filter((task) => task.priority === 2).length,
      low: tasks.filter((task) => task.priority === 1).length,
    }

    return {
      completed,
      inProgress,
      pending,
      total,
      completionRate,
      avgProgress,
      byPriority,
    }
  }, [tasks])

  const todoStats = useMemo(() => {
    const completed = todos.filter((todo) => todo.completed).length
    const pending = todos.filter((todo) => !todo.completed).length
    const total = todos.length

    const completionRate = total > 0 ? (completed / total) * 100 : 0

    // Group by recurrence
    const byRecurrence = {
      daily: todos.filter((todo) => todo.recurrence === RecurrencePattern.Daily).length,
      weekly: todos.filter((todo) => todo.recurrence === RecurrencePattern.Weekly).length,
      monthly: todos.filter((todo) => todo.recurrence === RecurrencePattern.Monthly).length,
      oneTime: todos.filter((todo) => todo.recurrence === null).length,
    }

    // Group by priority
    const byPriority = {
      high: todos.filter((todo) => todo.priority === 3).length,
      medium: todos.filter((todo) => todo.priority === 2).length,
      low: todos.filter((todo) => todo.priority === 1).length,
    }

    return {
      completed,
      pending,
      total,
      completionRate,
      byRecurrence,
      byPriority,
    }
  }, [todos])

  const overallStats = useMemo(() => {
    const totalItems = tasks.length + todos.length
    const completedItems = taskStats.completed + todoStats.completed
    const completionRate = totalItems > 0 ? (completedItems / totalItems) * 100 : 0

    return {
      totalItems,
      completedItems,
      completionRate,
    }
  }, [tasks.length, todos.length, taskStats.completed, todoStats.completed])

  if (!mounted) {
    return (
      <div className="flex justify-center py-12">
        <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-primary"></div>
      </div>
    )
  }

  return (
    <div>
      <h2 className="text-2xl font-bold mb-6">Productivity Analytics</h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Total Items</CardTitle>
            <BarChart3 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{overallStats.totalItems}</div>
            <p className="text-xs text-muted-foreground">
              {tasks.length} tasks, {todos.length} to-dos
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Completed Items</CardTitle>
            <CheckCircle2 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{overallStats.completedItems}</div>
            <p className="text-xs text-muted-foreground">
              {taskStats.completed} tasks, {todoStats.completed} to-dos
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Overall Completion Rate</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{overallStats.completionRate.toFixed(1)}%</div>
            <p className="text-xs text-muted-foreground">
              {overallStats.completedItems} of {overallStats.totalItems} items completed
            </p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="tasks">
        <TabsList>
          <TabsTrigger value="tasks" className="flex items-center gap-2">
            <Clock className="h-4 w-4" />
            Tasks Analytics
          </TabsTrigger>
          <TabsTrigger value="todos" className="flex items-center gap-2">
            <CheckCircle2 className="h-4 w-4" />
            To-Dos Analytics
          </TabsTrigger>
        </TabsList>

        <TabsContent value="tasks" className="mt-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium">Completion Rate</CardTitle>
                <PieChart className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{taskStats.completionRate.toFixed(1)}%</div>
                <p className="text-xs text-muted-foreground">
                  {taskStats.completed} of {taskStats.total} tasks completed
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium">Completed</CardTitle>
                <CheckCircle2 className="h-4 w-4 text-green-500" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{taskStats.completed}</div>
                <p className="text-xs text-muted-foreground">
                  {taskStats.total > 0 ? ((taskStats.completed / taskStats.total) * 100).toFixed(1) : 0}% of all tasks
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium">In Progress</CardTitle>
                <Clock className="h-4 w-4 text-yellow-500" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{taskStats.inProgress}</div>
                <p className="text-xs text-muted-foreground">
                  {taskStats.total > 0 ? ((taskStats.inProgress / taskStats.total) * 100).toFixed(1) : 0}% of all tasks
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium">Pending</CardTitle>
                <XCircle className="h-4 w-4 text-blue-500" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{taskStats.pending}</div>
                <p className="text-xs text-muted-foreground">
                  {taskStats.total > 0 ? ((taskStats.pending / taskStats.total) * 100).toFixed(1) : 0}% of all tasks
                </p>
              </CardContent>
            </Card>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card>
              <CardHeader>
                <CardTitle>Average Progress</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold mb-2">{taskStats.avgProgress.toFixed(1)}%</div>
                <div className="h-4 w-full bg-muted rounded-full overflow-hidden">
                  <div className="h-full bg-primary" style={{ width: `${taskStats.avgProgress}%` }}></div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Tasks by Priority</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between mb-1 text-sm">
                      <span>High Priority</span>
                      <span>{taskStats.byPriority.high} tasks</span>
                    </div>
                    <div className="h-2 w-full bg-muted rounded-full overflow-hidden">
                      <div
                        className="h-full bg-red-500"
                        style={{
                          width: `${taskStats.total > 0 ? (taskStats.byPriority.high / taskStats.total) * 100 : 0}%`,
                        }}
                      ></div>
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between mb-1 text-sm">
                      <span>Medium Priority</span>
                      <span>{taskStats.byPriority.medium} tasks</span>
                    </div>
                    <div className="h-2 w-full bg-muted rounded-full overflow-hidden">
                      <div
                        className="h-full bg-yellow-500"
                        style={{
                          width: `${taskStats.total > 0 ? (taskStats.byPriority.medium / taskStats.total) * 100 : 0}%`,
                        }}
                      ></div>
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between mb-1 text-sm">
                      <span>Low Priority</span>
                      <span>{taskStats.byPriority.low} tasks</span>
                    </div>
                    <div className="h-2 w-full bg-muted rounded-full overflow-hidden">
                      <div
                        className="h-full bg-blue-500"
                        style={{
                          width: `${taskStats.total > 0 ? (taskStats.byPriority.low / taskStats.total) * 100 : 0}%`,
                        }}
                      ></div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="todos" className="mt-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium">Completion Rate</CardTitle>
                <PieChart className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{todoStats.completionRate.toFixed(1)}%</div>
                <p className="text-xs text-muted-foreground">
                  {todoStats.completed} of {todoStats.total} to-dos completed
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium">Completed</CardTitle>
                <CheckCircle2 className="h-4 w-4 text-green-500" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{todoStats.completed}</div>
                <p className="text-xs text-muted-foreground">
                  {todoStats.total > 0 ? ((todoStats.completed / todoStats.total) * 100).toFixed(1) : 0}% of all to-dos
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium">Pending</CardTitle>
                <XCircle className="h-4 w-4 text-blue-500" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{todoStats.pending}</div>
                <p className="text-xs text-muted-foreground">
                  {todoStats.total > 0 ? ((todoStats.pending / todoStats.total) * 100).toFixed(1) : 0}% of all to-dos
                </p>
              </CardContent>
            </Card>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card>
              <CardHeader>
                <CardTitle>To-Dos by Recurrence</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between mb-1 text-sm">
                      <span>Daily</span>
                      <span>{todoStats.byRecurrence.daily} to-dos</span>
                    </div>
                    <div className="h-2 w-full bg-muted rounded-full overflow-hidden">
                      <div
                        className="h-full bg-green-500"
                        style={{
                          width: `${todoStats.total > 0 ? (todoStats.byRecurrence.daily / todoStats.total) * 100 : 0}%`,
                        }}
                      ></div>
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between mb-1 text-sm">
                      <span>Weekly</span>
                      <span>{todoStats.byRecurrence.weekly} to-dos</span>
                    </div>
                    <div className="h-2 w-full bg-muted rounded-full overflow-hidden">
                      <div
                        className="h-full bg-purple-500"
                        style={{
                          width: `${todoStats.total > 0 ? (todoStats.byRecurrence.weekly / todoStats.total) * 100 : 0}%`,
                        }}
                      ></div>
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between mb-1 text-sm">
                      <span>Monthly</span>
                      <span>{todoStats.byRecurrence.monthly} to-dos</span>
                    </div>
                    <div className="h-2 w-full bg-muted rounded-full overflow-hidden">
                      <div
                        className="h-full bg-orange-500"
                        style={{
                          width: `${todoStats.total > 0 ? (todoStats.byRecurrence.monthly / todoStats.total) * 100 : 0}%`,
                        }}
                      ></div>
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between mb-1 text-sm">
                      <span>One-time</span>
                      <span>{todoStats.byRecurrence.oneTime} to-dos</span>
                    </div>
                    <div className="h-2 w-full bg-muted rounded-full overflow-hidden">
                      <div
                        className="h-full bg-gray-500"
                        style={{
                          width: `${todoStats.total > 0 ? (todoStats.byRecurrence.oneTime / todoStats.total) * 100 : 0}%`,
                        }}
                      ></div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>To-Dos by Priority</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between mb-1 text-sm">
                      <span>High Priority</span>
                      <span>{todoStats.byPriority.high} to-dos</span>
                    </div>
                    <div className="h-2 w-full bg-muted rounded-full overflow-hidden">
                      <div
                        className="h-full bg-red-500"
                        style={{
                          width: `${todoStats.total > 0 ? (todoStats.byPriority.high / todoStats.total) * 100 : 0}%`,
                        }}
                      ></div>
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between mb-1 text-sm">
                      <span>Medium Priority</span>
                      <span>{todoStats.byPriority.medium} to-dos</span>
                    </div>
                    <div className="h-2 w-full bg-muted rounded-full overflow-hidden">
                      <div
                        className="h-full bg-yellow-500"
                        style={{
                          width: `${todoStats.total > 0 ? (todoStats.byPriority.medium / todoStats.total) * 100 : 0}%`,
                        }}
                      ></div>
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between mb-1 text-sm">
                      <span>Low Priority</span>
                      <span>{todoStats.byPriority.low} to-dos</span>
                    </div>
                    <div className="h-2 w-full bg-muted rounded-full overflow-hidden">
                      <div
                        className="h-full bg-blue-500"
                        style={{
                          width: `${todoStats.total > 0 ? (todoStats.byPriority.low / todoStats.total) * 100 : 0}%`,
                        }}
                      ></div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}

