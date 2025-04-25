import type { Metadata } from "next"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { CheckCircle2, BarChart3, ArrowLeft, PieChart, Repeat } from "lucide-react"

export const metadata: Metadata = {
  title: "TaskFlow | Preview",
  description: "See TaskFlow in action with interactive previews",
}

export default function PreviewPage() {
  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-12">
        <div className="mb-12">
          <Link href="/">
            <Button variant="ghost" className="gap-2 pl-0 mb-4">
              <ArrowLeft className="h-4 w-4" /> Back to Home
            </Button>
          </Link>
          <h1 className="text-4xl font-bold mb-4">See TaskFlow in Action</h1>
          <p className="text-xl text-muted-foreground max-w-3xl">
            Take a look at the intuitive interface and powerful features of TaskFlow.
          </p>
        </div>

        <div className="max-w-5xl mx-auto">
          <Tabs defaultValue="tasks" className="w-full">
            <TabsList className="grid w-full grid-cols-3 mb-8">
              <TabsTrigger value="tasks" className="text-sm md:text-base">
                Task Management
              </TabsTrigger>
              <TabsTrigger value="todos" className="text-sm md:text-base">
                To-Do Lists
              </TabsTrigger>
              <TabsTrigger value="analytics" className="text-sm md:text-base">
                Analytics
              </TabsTrigger>
            </TabsList>
            <TabsContent value="tasks">
              <div className="border rounded-lg overflow-hidden shadow-sm">
                <div className="p-4 border-b bg-muted/50">
                  <div className="flex justify-between items-center">
                    <h3 className="font-semibold">Task Management</h3>
                    <div className="flex gap-2">
                      <div className="w-3 h-3 rounded-full bg-red-500"></div>
                      <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                      <div className="w-3 h-3 rounded-full bg-green-500"></div>
                    </div>
                  </div>
                </div>
                <div className="aspect-video bg-muted/20 flex items-center justify-center">
                  <div className="w-full max-w-3xl p-6">
                    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-2">
                      <h2 className="text-2xl font-bold">Tasks</h2>
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="text-xs px-2 py-1 rounded-full bg-muted">Total: 5</span>
                        <span className="text-xs px-2 py-1 rounded-full bg-green-500/10">Completed: 2</span>
                        <span className="text-xs px-2 py-1 rounded-full bg-yellow-500/10">In Progress: 1</span>
                        <span className="text-xs px-2 py-1 rounded-full bg-blue-500/10">Pending: 2</span>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="border rounded-lg p-4 shadow-sm">
                        <div className="flex justify-between items-start mb-2">
                          <h3 className="font-semibold">Complete project proposal</h3>
                          <span className="px-2 py-1 text-xs rounded-full bg-red-500/80 text-white">High</span>
                        </div>
                        <p className="text-sm text-muted-foreground mb-3">
                          Finalize the proposal document and send for review
                        </p>
                        <div className="mb-3">
                          <div className="flex justify-between text-xs mb-1">
                            <span>Progress</span>
                            <span>75%</span>
                          </div>
                          <div className="h-2 w-full bg-muted rounded-full overflow-hidden">
                            <div className="h-full bg-primary" style={{ width: "75%" }}></div>
                          </div>
                        </div>
                      </div>

                      <div className="border rounded-lg p-4 shadow-sm">
                        <div className="flex justify-between items-start mb-2">
                          <h3 className="font-semibold">Research competitors</h3>
                          <span className="px-2 py-1 text-xs rounded-full bg-yellow-500/80 text-white">Medium</span>
                        </div>
                        <p className="text-sm text-muted-foreground mb-3">Analyze top 5 competitors in the market</p>
                        <div className="mb-3">
                          <div className="flex justify-between text-xs mb-1">
                            <span>Progress</span>
                            <span>30%</span>
                          </div>
                          <div className="h-2 w-full bg-muted rounded-full overflow-hidden">
                            <div className="h-full bg-primary" style={{ width: "30%" }}></div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-8">
                <h3 className="text-xl font-semibold mb-4">Key Task Management Features</h3>
                <ul className="space-y-3">
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-5 w-5 text-green-500 shrink-0 mt-0.5" />
                    <div>
                      <span className="font-medium">Progress Tracking</span>
                      <p className="text-sm text-muted-foreground">
                        Visual progress bars show you exactly how far along each task is
                      </p>
                    </div>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-5 w-5 text-green-500 shrink-0 mt-0.5" />
                    <div>
                      <span className="font-medium">Status Management</span>
                      <p className="text-sm text-muted-foreground">
                        Easily change task status between Pending, In Progress, and Completed
                      </p>
                    </div>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-5 w-5 text-green-500 shrink-0 mt-0.5" />
                    <div>
                      <span className="font-medium">Priority Levels</span>
                      <p className="text-sm text-muted-foreground">Assign Low, Medium, or High priority to each task</p>
                    </div>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-5 w-5 text-green-500 shrink-0 mt-0.5" />
                    <div>
                      <span className="font-medium">Pomodoro Timer Integration</span>
                      <p className="text-sm text-muted-foreground">
                        Start a focused work session directly from any task
                      </p>
                    </div>
                  </li>
                </ul>
              </div>
            </TabsContent>
            <TabsContent value="todos">
              <div className="border rounded-lg overflow-hidden shadow-sm">
                <div className="p-4 border-b bg-muted/50">
                  <div className="flex justify-between items-center">
                    <h3 className="font-semibold">To-Do Lists</h3>
                    <div className="flex gap-2">
                      <div className="w-3 h-3 rounded-full bg-red-500"></div>
                      <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                      <div className="w-3 h-3 rounded-full bg-green-500"></div>
                    </div>
                  </div>
                </div>
                <div className="aspect-video bg-muted/20 flex items-center justify-center">
                  <div className="w-full max-w-3xl p-6">
                    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-2">
                      <h2 className="text-2xl font-bold">To-Dos</h2>
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="text-xs px-2 py-1 rounded-full bg-muted">Total: 6</span>
                        <span className="text-xs px-2 py-1 rounded-full bg-green-500/10">Completed: 3</span>
                        <span className="text-xs px-2 py-1 rounded-full bg-blue-500/10">Pending: 3</span>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="border rounded-lg p-4 shadow-sm">
                        <div className="flex items-start gap-2">
                          <input type="checkbox" className="mt-1" />
                          <div>
                            <h3 className="font-semibold">Daily team standup</h3>
                            <p className="text-sm text-muted-foreground">9:30 AM meeting with the development team</p>
                            <div className="flex items-center gap-2 mt-2">
                              <span className="px-2 py-1 text-xs rounded-full bg-yellow-500/80 text-white">Medium</span>
                              <span className="text-xs text-muted-foreground flex items-center">
                                <Repeat className="h-3 w-3 mr-1" /> Daily
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="border rounded-lg p-4 shadow-sm">
                        <div className="flex items-start gap-2">
                          <input type="checkbox" className="mt-1" checked readOnly />
                          <div>
                            <h3 className="font-semibold line-through text-muted-foreground">Send weekly report</h3>
                            <p className="text-sm text-muted-foreground line-through">
                              Compile and send the weekly progress report
                            </p>
                            <div className="flex items-center gap-2 mt-2">
                              <span className="px-2 py-1 text-xs rounded-full bg-red-500/80 text-white">High</span>
                              <span className="text-xs text-muted-foreground flex items-center">
                                <Repeat className="h-3 w-3 mr-1" /> Weekly
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-8">
                <h3 className="text-xl font-semibold mb-4">Key To-Do List Features</h3>
                <ul className="space-y-3">
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-5 w-5 text-green-500 shrink-0 mt-0.5" />
                    <div>
                      <span className="font-medium">Recurring To-Dos</span>
                      <p className="text-sm text-muted-foreground">Set up daily, weekly, or monthly recurring items</p>
                    </div>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-5 w-5 text-green-500 shrink-0 mt-0.5" />
                    <div>
                      <span className="font-medium">One-Click Completion</span>
                      <p className="text-sm text-muted-foreground">Mark items as complete with a single click</p>
                    </div>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-5 w-5 text-green-500 shrink-0 mt-0.5" />
                    <div>
                      <span className="font-medium">Priority Levels</span>
                      <p className="text-sm text-muted-foreground">
                        Assign Low, Medium, or High priority to each to-do
                      </p>
                    </div>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-5 w-5 text-green-500 shrink-0 mt-0.5" />
                    <div>
                      <span className="font-medium">Filtered Views</span>
                      <p className="text-sm text-muted-foreground">View to-dos by status or recurrence pattern</p>
                    </div>
                  </li>
                </ul>
              </div>
            </TabsContent>
            <TabsContent value="analytics">
              <div className="border rounded-lg overflow-hidden shadow-sm">
                <div className="p-4 border-b bg-muted/50">
                  <div className="flex justify-between items-center">
                    <h3 className="font-semibold">Analytics Dashboard</h3>
                    <div className="flex gap-2">
                      <div className="w-3 h-3 rounded-full bg-red-500"></div>
                      <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                      <div className="w-3 h-3 rounded-full bg-green-500"></div>
                    </div>
                  </div>
                </div>
                <div className="aspect-video bg-muted/20 flex items-center justify-center">
                  <div className="w-full max-w-3xl p-6">
                    <h2 className="text-2xl font-bold mb-6">Productivity Analytics</h2>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                      <div className="border rounded-lg p-4 shadow-sm">
                        <div className="flex flex-row items-center justify-between pb-2">
                          <h3 className="text-sm font-medium">Total Items</h3>
                          <BarChart3 className="h-4 w-4 text-muted-foreground" />
                        </div>
                        <div className="text-2xl font-bold">11</div>
                        <p className="text-xs text-muted-foreground">5 tasks, 6 to-dos</p>
                      </div>

                      <div className="border rounded-lg p-4 shadow-sm">
                        <div className="flex flex-row items-center justify-between pb-2">
                          <h3 className="text-sm font-medium">Completed Items</h3>
                          <CheckCircle2 className="h-4 w-4 text-muted-foreground" />
                        </div>
                        <div className="text-2xl font-bold">5</div>
                        <p className="text-xs text-muted-foreground">2 tasks, 3 to-dos</p>
                      </div>

                      <div className="border rounded-lg p-4 shadow-sm">
                        <div className="flex flex-row items-center justify-between pb-2">
                          <h3 className="text-sm font-medium">Overall Completion Rate</h3>
                          <PieChart className="h-4 w-4 text-muted-foreground" />
                        </div>
                        <div className="text-2xl font-bold">45.5%</div>
                        <p className="text-xs text-muted-foreground">5 of 11 items completed</p>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="border rounded-lg p-4 shadow-sm">
                        <h3 className="font-medium mb-4">Tasks by Status</h3>
                        <div className="space-y-4">
                          <div>
                            <div className="flex justify-between mb-1 text-sm">
                              <span>Completed</span>
                              <span>2 tasks</span>
                            </div>
                            <div className="h-2 w-full bg-muted rounded-full overflow-hidden">
                              <div className="h-full bg-green-500" style={{ width: "40%" }}></div>
                            </div>
                          </div>

                          <div>
                            <div className="flex justify-between mb-1 text-sm">
                              <span>In Progress</span>
                              <span>1 task</span>
                            </div>
                            <div className="h-2 w-full bg-muted rounded-full overflow-hidden">
                              <div className="h-full bg-yellow-500" style={{ width: "20%" }}></div>
                            </div>
                          </div>

                          <div>
                            <div className="flex justify-between mb-1 text-sm">
                              <span>Pending</span>
                              <span>2 tasks</span>
                            </div>
                            <div className="h-2 w-full bg-muted rounded-full overflow-hidden">
                              <div className="h-full bg-blue-500" style={{ width: "40%" }}></div>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="border rounded-lg p-4 shadow-sm">
                        <h3 className="font-medium mb-4">To-Dos by Recurrence</h3>
                        <div className="space-y-4">
                          <div>
                            <div className="flex justify-between mb-1 text-sm">
                              <span>Daily</span>
                              <span>2 to-dos</span>
                            </div>
                            <div className="h-2 w-full bg-muted rounded-full overflow-hidden">
                              <div className="h-full bg-green-500" style={{ width: "33%" }}></div>
                            </div>
                          </div>

                          <div>
                            <div className="flex justify-between mb-1 text-sm">
                              <span>Weekly</span>
                              <span>3 to-dos</span>
                            </div>
                            <div className="h-2 w-full bg-muted rounded-full overflow-hidden">
                              <div className="h-full bg-purple-500" style={{ width: "50%" }}></div>
                            </div>
                          </div>

                          <div>
                            <div className="flex justify-between mb-1 text-sm">
                              <span>One-time</span>
                              <span>1 to-do</span>
                            </div>
                            <div className="h-2 w-full bg-muted rounded-full overflow-hidden">
                              <div className="h-full bg-gray-500" style={{ width: "17%" }}></div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-8">
                <h3 className="text-xl font-semibold mb-4">Key Analytics Features</h3>
                <ul className="space-y-3">
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-5 w-5 text-green-500 shrink-0 mt-0.5" />
                    <div>
                      <span className="font-medium">Completion Rates</span>
                      <p className="text-sm text-muted-foreground">
                        Track your overall productivity with completion percentages
                      </p>
                    </div>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-5 w-5 text-green-500 shrink-0 mt-0.5" />
                    <div>
                      <span className="font-medium">Status Breakdown</span>
                      <p className="text-sm text-muted-foreground">
                        See the distribution of tasks by status and to-dos by recurrence
                      </p>
                    </div>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-5 w-5 text-green-500 shrink-0 mt-0.5" />
                    <div>
                      <span className="font-medium">Visual Charts</span>
                      <p className="text-sm text-muted-foreground">
                        Intuitive visual representations of your productivity data
                      </p>
                    </div>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-5 w-5 text-green-500 shrink-0 mt-0.5" />
                    <div>
                      <span className="font-medium">Trend Analysis</span>
                      <p className="text-sm text-muted-foreground">Track your productivity patterns over time</p>
                    </div>
                  </li>
                </ul>
              </div>
            </TabsContent>
          </Tabs>
        </div>

        <div className="text-center mt-12">
          <Link href="/dashboard">
            <Button size="lg" className="gap-2">
              Try TaskFlow Now
            </Button>
          </Link>
        </div>
      </div>
    </div>
  )
}

