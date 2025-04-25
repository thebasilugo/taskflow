import type { Metadata } from "next"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Clock, PieChart, BarChart3, Repeat, ListChecks, Search, ArrowLeft, ArrowRight } from "lucide-react"

export const metadata: Metadata = {
  title: "TaskFlow | Benefits",
  description: "Discover the benefits of using TaskFlow for your productivity",
}

export default function BenefitsPage() {
  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-12">
        <div className="mb-12">
          <Link href="/">
            <Button variant="ghost" className="gap-2 pl-0 mb-4">
              <ArrowLeft className="h-4 w-4" /> Back to Home
            </Button>
          </Link>
          <h1 className="text-4xl font-bold mb-4">Why Use TaskFlow?</h1>
          <p className="text-xl text-muted-foreground max-w-3xl">
            TaskFlow helps you stay organized, focused, and productive with its comprehensive feature set.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 max-w-5xl mx-auto mb-16">
          <div className="flex flex-col gap-12">
            <div className="flex gap-6">
              <div className="bg-primary/10 p-4 rounded-full h-16 w-16 flex items-center justify-center shrink-0">
                <Clock className="h-8 w-8 text-primary" />
              </div>
              <div>
                <h3 className="text-2xl font-semibold mb-3">Save Time</h3>
                <p className="text-muted-foreground">
                  Manage all your tasks and to-dos in one place, eliminating the need for multiple apps and reducing
                  context switching. TaskFlow's unified interface helps you focus on what matters most.
                </p>
              </div>
            </div>

            <div className="flex gap-6">
              <div className="bg-primary/10 p-4 rounded-full h-16 w-16 flex items-center justify-center shrink-0">
                <PieChart className="h-8 w-8 text-primary" />
              </div>
              <div>
                <h3 className="text-2xl font-semibold mb-3">Increase Productivity</h3>
                <p className="text-muted-foreground">
                  The integrated Pomodoro timer helps you stay focused and productive during work sessions. By breaking
                  work into focused intervals, you can maintain high levels of concentration and accomplish more in less
                  time.
                </p>
              </div>
            </div>

            <div className="flex gap-6">
              <div className="bg-primary/10 p-4 rounded-full h-16 w-16 flex items-center justify-center shrink-0">
                <BarChart3 className="h-8 w-8 text-primary" />
              </div>
              <div>
                <h3 className="text-2xl font-semibold mb-3">Track Progress</h3>
                <p className="text-muted-foreground">
                  Visualize your productivity with detailed analytics and track your progress over time. TaskFlow's
                  analytics dashboard provides insights into your work patterns, helping you identify areas for
                  improvement and celebrate your achievements.
                </p>
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-12">
            <div className="flex gap-6">
              <div className="bg-primary/10 p-4 rounded-full h-16 w-16 flex items-center justify-center shrink-0">
                <Repeat className="h-8 w-8 text-primary" />
              </div>
              <div>
                <h3 className="text-2xl font-semibold mb-3">Never Miss a Task</h3>
                <p className="text-muted-foreground">
                  Set up recurring to-dos for regular tasks and ensure nothing falls through the cracks. TaskFlow's
                  recurrence patterns help you maintain consistency with daily, weekly, and monthly tasks without the
                  need to recreate them.
                </p>
              </div>
            </div>

            <div className="flex gap-6">
              <div className="bg-primary/10 p-4 rounded-full h-16 w-16 flex items-center justify-center shrink-0">
                <ListChecks className="h-8 w-8 text-primary" />
              </div>
              <div>
                <h3 className="text-2xl font-semibold mb-3">Stay Organized</h3>
                <p className="text-muted-foreground">
                  Prioritize tasks and to-dos to focus on what matters most and keep your workflow organized. TaskFlow's
                  priority system helps you identify high-impact activities and ensures you're always working on the
                  most important tasks first.
                </p>
              </div>
            </div>

            <div className="flex gap-6">
              <div className="bg-primary/10 p-4 rounded-full h-16 w-16 flex items-center justify-center shrink-0">
                <Search className="h-8 w-8 text-primary" />
              </div>
              <div>
                <h3 className="text-2xl font-semibold mb-3">Find Anything Quickly</h3>
                <p className="text-muted-foreground">
                  Powerful search functionality lets you quickly find any task or to-do item when you need it. No more
                  wasting time scrolling through lists or trying to remember where you put something—TaskFlow's search
                  feature brings it to you instantly.
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-muted p-8 rounded-lg max-w-3xl mx-auto">
          <h2 className="text-2xl font-bold mb-4 text-center">Real Productivity Benefits</h2>
          <p className="text-center mb-6">
            TaskFlow users report significant improvements in their productivity and work satisfaction:
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 text-center">
            <div>
              <p className="text-4xl font-bold text-primary mb-2">42%</p>
              <p className="text-sm text-muted-foreground">Reduction in missed deadlines</p>
            </div>
            <div>
              <p className="text-4xl font-bold text-primary mb-2">37%</p>
              <p className="text-sm text-muted-foreground">Increase in completed tasks</p>
            </div>
            <div>
              <p className="text-4xl font-bold text-primary mb-2">28%</p>
              <p className="text-sm text-muted-foreground">Less time spent on task management</p>
            </div>
          </div>
        </div>

        <div className="text-center mt-12">
          <Link href="/dashboard">
            <Button size="lg" className="gap-2">
              Experience the Benefits <ArrowRight className="h-4 w-4" />
            </Button>
          </Link>
        </div>
      </div>
    </div>
  )
}

