"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { useTheme } from "next-themes"
import { ModeToggle } from "@/components/theme-toggle"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  CheckCircle2,
  ListChecks,
  BarChart3,
  ArrowRight,
  Menu,
  X,
  Timer,
  PieChart,
  Repeat,
  Clock,
  Github,
  Linkedin,
  CheckCheck,
  Calendar,
  Sparkles,
  Zap,
  MousePointerClick,
  ArrowUpRight,
} from "lucide-react"

export default function LandingPage() {
  const { resolvedTheme } = useTheme()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [mounted, setMounted] = useState(false)
  const [activeTab, setActiveTab] = useState("tasks")

  useEffect(() => {
    setMounted(true)
  }, [])

  return (
    <div className="min-h-screen flex flex-col">
      {/* Navigation */}
      <header className="sticky top-0 z-50 bg-background/80 backdrop-blur-md py-4 border-b">
        <div className="container mx-auto px-4 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <div className="h-8 w-8 rounded-lg bg-primary flex items-center justify-center">
              <ListChecks className="h-5 w-5 text-primary-foreground" />
            </div>
            <span className="font-bold text-xl">TaskFlow</span>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-6">
            <Link href="/features" className="text-sm font-medium hover:text-primary transition-colors">
              Features
            </Link>
            <Link href="/benefits" className="text-sm font-medium hover:text-primary transition-colors">
              Benefits
            </Link>
            <Link href="/preview" className="text-sm font-medium hover:text-primary transition-colors">
              Preview
            </Link>
            <Link href="/faq" className="text-sm font-medium hover:text-primary transition-colors">
              FAQs
            </Link>
            <div className="flex items-center gap-2">
              <ModeToggle />
              <Link href="/dashboard">
                <Button className="relative group">
                  <span className="relative z-10">Get Started</span>
                  <span className="absolute inset-0 bg-white/20 rounded-md scale-0 transition-transform group-hover:scale-100"></span>
                </Button>
              </Link>
            </div>
          </nav>

          {/* Mobile Menu Button */}
          <div className="flex items-center gap-2 md:hidden">
            <ModeToggle />
            <Button variant="ghost" size="icon" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
              {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <div className="md:hidden border-t">
            <div className="container mx-auto px-4 py-3 flex flex-col gap-4">
              <Link
                href="/features"
                className="text-sm font-medium py-2 hover:text-primary transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                Features
              </Link>
              <Link
                href="/benefits"
                className="text-sm font-medium py-2 hover:text-primary transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                Benefits
              </Link>
              <Link
                href="/preview"
                className="text-sm font-medium py-2 hover:text-primary transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                Preview
              </Link>
              <Link
                href="/faq"
                className="text-sm font-medium py-2 hover:text-primary transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                FAQ
              </Link>
              <Link href="/dashboard" onClick={() => setMobileMenuOpen(false)}>
                <Button className="w-full">Get Started</Button>
              </Link>
            </div>
          </div>
        )}
      </header>

      <main className="flex-1">
        {/* Hero Section */}
        <section className="py-20 md:py-32 relative overflow-hidden">
          <div className="absolute inset-0 dot-pattern opacity-30"></div>
          <div className="container mx-auto px-4 relative z-10">
            <div className="max-w-4xl mx-auto text-center">
              <div className="inline-block mb-4 px-4 py-1 rounded-full bg-primary/10 text-primary font-medium text-sm">
                Productivity Reimagined
              </div>
              <h1 className="heading-1 mb-6 tracking-tight">
                Manage Tasks & To-Dos with <span className="text-primary">TaskFlow</span>
              </h1>
              <p className="body-large text-muted-foreground mb-10 max-w-3xl mx-auto">
                A comprehensive productivity application that combines task management, to-do lists, and productivity
                analytics in one seamless experience.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/dashboard">
                  <Button size="lg" className="gap-2 shadow-lg shadow-primary/20">
                    Get Started <ArrowRight className="h-4 w-4" />
                  </Button>
                </Link>
                <Link href="/preview">
                  <Button size="lg" variant="outline" className="gap-2">
                    See Preview <ArrowUpRight className="h-4 w-4" />
                  </Button>
                </Link>
              </div>
            </div>

            {/* App Preview */}
            <div className="mt-16 max-w-5xl mx-auto">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-purple-500/20 rounded-xl blur-3xl"></div>
                <div className="relative bg-card border rounded-xl shadow-2xl overflow-hidden">
                  <div className="p-2 border-b bg-muted/50">
                    <div className="flex gap-1.5">
                      <div className="w-3 h-3 rounded-full bg-red-500"></div>
                      <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                      <div className="w-3 h-3 rounded-full bg-green-500"></div>
                    </div>
                  </div>
                  <div className="p-4">
                    <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
                      <TabsList className="grid w-full grid-cols-3 mb-8">
                        <TabsTrigger value="tasks" className="text-sm">
                          Tasks
                        </TabsTrigger>
                        <TabsTrigger value="todos" className="text-sm">
                          To-Dos
                        </TabsTrigger>
                        <TabsTrigger value="analytics" className="text-sm">
                          Analytics
                        </TabsTrigger>
                      </TabsList>
                      <TabsContent value="tasks" className="mt-0">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div className="task-card">
                            <div className="task-card-header">
                              <h3 className="task-card-title">Complete project proposal</h3>
                              <span className="px-2 py-1 text-xs rounded-full priority-high">High</span>
                            </div>
                            <p className="task-card-description">Finalize the proposal document and send for review</p>
                            <div className="mb-3">
                              <div className="flex justify-between text-xs mb-1">
                                <span>Progress</span>
                                <span>75%</span>
                              </div>
                              <div className="progress-bar">
                                <div className="progress-bar-fill bg-primary" style={{ width: "75%" }}></div>
                              </div>
                            </div>
                            <div className="task-card-footer">
                              <div className="flex gap-1">
                                <span className="px-2 py-1 text-xs rounded-full status-in-progress">In Progress</span>
                              </div>
                              <span className="text-xs text-muted-foreground flex items-center">
                                <Clock className="h-3 w-3 mr-1" />2 days ago
                              </span>
                            </div>
                          </div>

                          <div className="task-card">
                            <div className="task-card-header">
                              <h3 className="task-card-title">Research competitors</h3>
                              <span className="px-2 py-1 text-xs rounded-full priority-medium">Medium</span>
                            </div>
                            <p className="task-card-description">Analyze top 5 competitors in the market</p>
                            <div className="mb-3">
                              <div className="flex justify-between text-xs mb-1">
                                <span>Progress</span>
                                <span>30%</span>
                              </div>
                              <div className="progress-bar">
                                <div className="progress-bar-fill bg-primary" style={{ width: "30%" }}></div>
                              </div>
                            </div>
                            <div className="task-card-footer">
                              <div className="flex gap-1">
                                <span className="px-2 py-1 text-xs rounded-full status-in-progress">In Progress</span>
                              </div>
                              <span className="text-xs text-muted-foreground flex items-center">
                                <Clock className="h-3 w-3 mr-1" />1 day ago
                              </span>
                            </div>
                          </div>
                        </div>
                      </TabsContent>
                      <TabsContent value="todos" className="mt-0">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div className="task-card">
                            <div className="flex items-start gap-2">
                              <div className="checkbox-container mt-1">
                                <div className="h-4 w-4 rounded border border-primary"></div>
                              </div>
                              <div>
                                <h3 className="font-semibold text-lg">Daily team standup</h3>
                                <p className="text-sm text-muted-foreground">
                                  9:30 AM meeting with the development team
                                </p>
                                <div className="flex items-center gap-2 mt-2">
                                  <span className="px-2 py-1 text-xs rounded-full priority-medium">Medium</span>
                                  <span className="text-xs text-muted-foreground flex items-center">
                                    <Repeat className="h-3 w-3 mr-1" /> Daily
                                  </span>
                                </div>
                              </div>
                            </div>
                          </div>

                          <div className="task-card">
                            <div className="flex items-start gap-2">
                              <div className="checkbox-container mt-1 checkbox-checked">
                                <div className="h-4 w-4 rounded border border-primary bg-primary"></div>
                                <div className="checkbox-checkmark text-primary-foreground">
                                  <CheckCheck className="h-3 w-3" />
                                </div>
                              </div>
                              <div>
                                <h3 className="font-semibold text-lg line-through text-muted-foreground">
                                  Send weekly report
                                </h3>
                                <p className="text-sm text-muted-foreground line-through">
                                  Compile and send the weekly progress report
                                </p>
                                <div className="flex items-center gap-2 mt-2">
                                  <span className="px-2 py-1 text-xs rounded-full priority-high">High</span>
                                  <span className="text-xs text-muted-foreground flex items-center">
                                    <Repeat className="h-3 w-3 mr-1" /> Weekly
                                  </span>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </TabsContent>
                      <TabsContent value="analytics" className="mt-0">
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
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
                              <h3 className="text-sm font-medium">Completion Rate</h3>
                              <PieChart className="h-4 w-4 text-muted-foreground" />
                            </div>
                            <div className="text-2xl font-bold">45.5%</div>
                            <p className="text-xs text-muted-foreground">5 of 11 items completed</p>
                          </div>
                        </div>
                        <div className="border rounded-lg p-4 shadow-sm">
                          <h3 className="font-medium mb-2">Tasks by Status</h3>
                          <div className="space-y-2">
                            <div>
                              <div className="flex justify-between mb-1 text-xs">
                                <span>Completed</span>
                                <span>2 tasks</span>
                              </div>
                              <div className="h-2 w-full bg-muted rounded-full overflow-hidden">
                                <div className="h-full bg-green-500" style={{ width: "40%" }}></div>
                              </div>
                            </div>
                            <div>
                              <div className="flex justify-between mb-1 text-xs">
                                <span>In Progress</span>
                                <span>1 task</span>
                              </div>
                              <div className="h-2 w-full bg-muted rounded-full overflow-hidden">
                                <div className="h-full bg-yellow-500" style={{ width: "20%" }}></div>
                              </div>
                            </div>
                            <div>
                              <div className="flex justify-between mb-1 text-xs">
                                <span>Pending</span>
                                <span>2 tasks</span>
                              </div>
                              <div className="h-2 w-full bg-muted rounded-full overflow-hidden">
                                <div className="h-full bg-blue-500" style={{ width: "40%" }}></div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </TabsContent>
                    </Tabs>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Features Overview */}
        <section className="py-20 bg-muted/30">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <div className="inline-block mb-4 px-4 py-1 rounded-full bg-primary/10 text-primary font-medium text-sm">
                Powerful Features
              </div>
              <h2 className="heading-2 mb-4">Everything You Need to Stay Productive</h2>
              <p className="body-large text-muted-foreground max-w-2xl mx-auto">
                TaskFlow combines the best features of task management and to-do applications to provide a comprehensive
                productivity solution.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
              <Card className="card-hover border-none shadow-lg shadow-primary/5">
                <CardContent className="pt-6">
                  <div className="flex flex-col items-center text-center">
                    <div className="bg-primary/10 p-3 rounded-xl h-16 w-16 flex items-center justify-center mb-4">
                      <ListChecks className="h-8 w-8 text-primary" />
                    </div>
                    <h3 className="text-xl font-semibold mb-2">Task & To-Do Management</h3>
                    <p className="text-muted-foreground">
                      Create, organize, and track tasks and to-dos with priorities and recurrence patterns.
                    </p>
                    <Link
                      href="/features"
                      className="mt-4 text-primary hover:underline text-sm group flex items-center"
                    >
                      Learn more <ArrowRight className="h-3 w-3 ml-1 transition-transform group-hover:translate-x-1" />
                    </Link>
                  </div>
                </CardContent>
              </Card>

              <Card className="card-hover border-none shadow-lg shadow-primary/5">
                <CardContent className="pt-6">
                  <div className="flex flex-col items-center text-center">
                    <div className="bg-primary/10 p-3 rounded-xl h-16 w-16 flex items-center justify-center mb-4">
                      <Timer className="h-8 w-8 text-primary" />
                    </div>
                    <h3 className="text-xl font-semibold mb-2">Pomodoro Timer</h3>
                    <p className="text-muted-foreground">
                      Boost productivity with integrated focus timers for each task.
                    </p>
                    <Link
                      href="/features"
                      className="mt-4 text-primary hover:underline text-sm group flex items-center"
                    >
                      Learn more <ArrowRight className="h-3 w-3 ml-1 transition-transform group-hover:translate-x-1" />
                    </Link>
                  </div>
                </CardContent>
              </Card>

              <Card className="card-hover border-none shadow-lg shadow-primary/5">
                <CardContent className="pt-6">
                  <div className="flex flex-col items-center text-center">
                    <div className="bg-primary/10 p-3 rounded-xl h-16 w-16 flex items-center justify-center mb-4">
                      <BarChart3 className="h-8 w-8 text-primary" />
                    </div>
                    <h3 className="text-xl font-semibold mb-2">Productivity Analytics</h3>
                    <p className="text-muted-foreground">
                      Track your progress with detailed statistics and visual charts.
                    </p>
                    <Link
                      href="/features"
                      className="mt-4 text-primary hover:underline text-sm group flex items-center"
                    >
                      Learn more <ArrowRight className="h-3 w-3 ml-1 transition-transform group-hover:translate-x-1" />
                    </Link>
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="text-center mt-12">
              <Link href="/features">
                <Button variant="outline" className="gap-2">
                  View All Features <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
            </div>
          </div>
        </section>

        {/* Benefits Overview */}
        <section className="py-20 bg-background">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <div className="inline-block mb-4 px-4 py-1 rounded-full bg-primary/10 text-primary font-medium text-sm">
                Why TaskFlow
              </div>
              <h2 className="heading-2 mb-4">Boost Your Productivity</h2>
              <p className="body-large text-muted-foreground max-w-2xl mx-auto">
                TaskFlow helps you stay organized, focused, and productive.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 max-w-5xl mx-auto">
              <div className="flex gap-6">
                <div className="bg-primary/10 p-3 rounded-xl h-14 w-14 flex items-center justify-center shrink-0">
                  <Zap className="h-7 w-7 text-primary" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">Save Time</h3>
                  <p className="text-muted-foreground">
                    Manage all your tasks and to-dos in one place, eliminating the need for multiple apps and reducing
                    context switching.
                  </p>
                </div>
              </div>

              <div className="flex gap-6">
                <div className="bg-primary/10 p-3 rounded-xl h-14 w-14 flex items-center justify-center shrink-0">
                  <Sparkles className="h-7 w-7 text-primary" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">Increase Productivity</h3>
                  <p className="text-muted-foreground">
                    The integrated Pomodoro timer helps you stay focused during work sessions, boosting your efficiency.
                  </p>
                </div>
              </div>

              <div className="flex gap-6">
                <div className="bg-primary/10 p-3 rounded-xl h-14 w-14 flex items-center justify-center shrink-0">
                  <Calendar className="h-7 w-7 text-primary" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">Never Miss a Task</h3>
                  <p className="text-muted-foreground">
                    Set up recurring to-dos for regular tasks and ensure nothing falls through the cracks with our
                    intelligent reminder system.
                  </p>
                </div>
              </div>

              <div className="flex gap-6">
                <div className="bg-primary/10 p-3 rounded-xl h-14 w-14 flex items-center justify-center shrink-0">
                  <MousePointerClick className="h-7 w-7 text-primary" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">Find Anything Quickly</h3>
                  <p className="text-muted-foreground">
                    Powerful search functionality lets you quickly find any task or to-do item when you need it most.
                  </p>
                </div>
              </div>
            </div>

            <div className="text-center mt-12">
              <Link href="/benefits">
                <Button variant="outline" className="gap-2">
                  Learn More About Benefits <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
            </div>
          </div>
        </section>

        {/* Testimonials */}
        <section className="py-20 bg-muted/30">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <div className="inline-block mb-4 px-4 py-1 rounded-full bg-primary/10 text-primary font-medium text-sm">
                User Stories
              </div>
              <h2 className="heading-2 mb-4">What Our Users Say</h2>
              <p className="body-large text-muted-foreground max-w-2xl mx-auto">
                Discover how TaskFlow has transformed productivity for people just like you.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
              <Card className="card-hover border-none shadow-lg shadow-primary/5">
                <CardContent className="pt-6">
                  <div className="flex flex-col">
                    <div className="flex items-center mb-4">
                      <div className="h-10 w-10 rounded-full bg-primary/20 flex items-center justify-center mr-3">
                        <span className="font-semibold text-primary">JD</span>
                      </div>
                      <div>
                        <h4 className="font-semibold">Jane Doe</h4>
                        <p className="text-sm text-muted-foreground">Product Manager</p>
                      </div>
                    </div>
                    <p className="text-muted-foreground mb-4">
                      "TaskFlow has completely transformed how I manage my team's projects. The visual progress tracking
                      and analytics give me insights I never had before."
                    </p>
                    <div className="flex text-amber-500">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                        className="w-5 h-5"
                      >
                        <path
                          fillRule="evenodd"
                          d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z"
                          clipRule="evenodd"
                        />
                      </svg>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                        className="w-5 h-5"
                      >
                        <path
                          fillRule="evenodd"
                          d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z"
                          clipRule="evenodd"
                        />
                      </svg>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                        className="w-5 h-5"
                      >
                        <path
                          fillRule="evenodd"
                          d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z"
                          clipRule="evenodd"
                        />
                      </svg>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                        className="w-5 h-5"
                      >
                        <path
                          fillRule="evenodd"
                          d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z"
                          clipRule="evenodd"
                        />
                      </svg>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                        className="w-5 h-5"
                      >
                        <path
                          fillRule="evenodd"
                          d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="card-hover border-none shadow-lg shadow-primary/5">
                <CardContent className="pt-6">
                  <div className="flex flex-col">
                    <div className="flex items-center mb-4">
                      <div className="h-10 w-10 rounded-full bg-primary/20 flex items-center justify-center mr-3">
                        <span className="font-semibold text-primary">JS</span>
                      </div>
                      <div>
                        <h4 className="font-semibold">John Smith</h4>
                        <p className="text-sm text-muted-foreground">Freelance Developer</p>
                      </div>
                    </div>
                    <p className="text-muted-foreground mb-4">
                      "The Pomodoro timer integration is a game-changer. I've increased my billable hours by 30% while
                      actually working less time overall. Highly recommended!"
                    </p>
                    <div className="flex text-amber-500">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                        className="w-5 h-5"
                      >
                        <path
                          fillRule="evenodd"
                          d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z"
                          clipRule="evenodd"
                        />
                      </svg>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                        className="w-5 h-5"
                      >
                        <path
                          fillRule="evenodd"
                          d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z"
                          clipRule="evenodd"
                        />
                      </svg>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                        className="w-5 h-5"
                      >
                        <path
                          fillRule="evenodd"
                          d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z"
                          clipRule="evenodd"
                        />
                      </svg>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                        className="w-5 h-5"
                      >
                        <path
                          fillRule="evenodd"
                          d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z"
                          clipRule="evenodd"
                        />
                      </svg>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                        className="w-5 h-5"
                      >
                        <path
                          fillRule="evenodd"
                          d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="card-hover border-none shadow-lg shadow-primary/5">
                <CardContent className="pt-6">
                  <div className="flex flex-col">
                    <div className="flex items-center mb-4">
                      <div className="h-10 w-10 rounded-full bg-primary/20 flex items-center justify-center mr-3">
                        <span className="font-semibold text-primary">AL</span>
                      </div>
                      <div>
                        <h4 className="font-semibold">Amy Lee</h4>
                        <p className="text-sm text-muted-foreground">Marketing Director</p>
                      </div>
                    </div>
                    <p className="text-muted-foreground mb-4">
                      "I've tried dozens of productivity apps, but TaskFlow is the only one that stuck. The recurring
                      to-dos feature alone has saved me countless hours of planning time."
                    </p>
                    <div className="flex text-amber-500">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                        className="w-5 h-5"
                      >
                        <path
                          fillRule="evenodd"
                          d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z"
                          clipRule="evenodd"
                        />
                      </svg>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                        className="w-5 h-5"
                      >
                        <path
                          fillRule="evenodd"
                          d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z"
                          clipRule="evenodd"
                        />
                      </svg>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                        className="w-5 h-5"
                      >
                        <path
                          fillRule="evenodd"
                          d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z"
                          clipRule="evenodd"
                        />
                      </svg>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                        className="w-5 h-5"
                      >
                        <path
                          fillRule="evenodd"
                          d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z"
                          clipRule="evenodd"
                        />
                      </svg>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                        className="w-5 h-5"
                      >
                        <path
                          fillRule="evenodd"
                          d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="py-16 bg-primary text-primary-foreground">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
              <div>
                <div className="text-4xl font-bold mb-2">42%</div>
                <p className="text-primary-foreground/80">Reduction in missed deadlines</p>
              </div>
              <div>
                <div className="text-4xl font-bold mb-2">37%</div>
                <p className="text-primary-foreground/80">Increase in completed tasks</p>
              </div>
              <div>
                <div className="text-4xl font-bold mb-2">28%</div>
                <p className="text-primary-foreground/80">Less time spent on task management</p>
              </div>
              <div>
                <div className="text-4xl font-bold mb-2">89%</div>
                <p className="text-primary-foreground/80">User satisfaction rate</p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-background relative overflow-hidden">
          <div className="absolute inset-0 dot-pattern opacity-30"></div>
          <div className="container mx-auto px-4 relative z-10">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="heading-2 mb-6">Ready to Boost Your Productivity?</h2>
              <p className="body-large text-muted-foreground mb-10 max-w-2xl mx-auto">
                Start managing your tasks and to-dos more efficiently with TaskFlow. It's free to use and takes less
                than a minute to get started.
              </p>
              <Link href="/dashboard">
                <Button size="lg" className="gap-2 shadow-lg shadow-primary/20">
                  Get Started Now <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="py-12 bg-muted/30 border-t">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center mb-8">
            <div className="flex items-center gap-2 mb-6 md:mb-0">
              <div className="h-8 w-8 rounded-lg bg-primary flex items-center justify-center">
                <ListChecks className="h-5 w-5 text-primary-foreground" />
              </div>
              <span className="font-bold text-xl">TaskFlow</span>
            </div>
            <div className="flex flex-col md:flex-row gap-6 md:gap-12">
              <Link href="/features" className="text-sm hover:text-primary transition-colors">
                Features
              </Link>
              <Link href="/benefits" className="text-sm hover:text-primary transition-colors">
                Benefits
              </Link>
              <Link href="/preview" className="text-sm hover:text-primary transition-colors">
                Preview
              </Link>
              <Link href="/faq" className="text-sm hover:text-primary transition-colors">
                FAQs
              </Link>
            </div>
          </div>

          <div className="pt-8 border-t">
            <div className="flex flex-col md:flex-row justify-between items-center">
              <p className="text-sm text-muted-foreground mb-4 md:mb-0">
                © {new Date().getFullYear()} TaskFlow. All rights reserved.
              </p>

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

            <p className="text-center text-xs text-muted-foreground mt-6">
              Built with Next.js, Tailwind CSS, and shadcn/ui components.
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}
