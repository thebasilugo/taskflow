"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { useTheme } from "next-themes"
import { ModeToggle } from "@/components/theme-toggle"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import {
  ListChecks,
  Search,
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
} from "lucide-react"

export default function LandingPage() {
  const { resolvedTheme } = useTheme()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  return (
    <div className="min-h-screen flex flex-col">
      {/* Navigation */}
      <header className="sticky top-0 z-50 bg-background py-4 shadow-sm">
        <div className="container mx-auto px-4 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <ListChecks className="h-6 w-6 text-primary" />
            <span className="font-poppins font-bold text-xl">TaskFlow</span>
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
              FAQ
            </Link>
            <div className="flex items-center gap-2">
              <ModeToggle />
              <Link href="/dashboard">
                <Button>Get Started</Button>
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
        <section className="py-20 md:py-32 bg-gradient-to-b from-background to-muted/50">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Manage Tasks & To-Dos with <span className="text-primary">TaskFlow</span>
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground mb-10 max-w-3xl mx-auto">
              A comprehensive productivity application that combines task management, to-do lists, and productivity
              analytics in one seamless experience.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/dashboard">
                <Button size="lg" className="gap-2">
                  Get Started <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
              <Link href="/preview">
                <Button size="lg" variant="outline">
                  See Preview
                </Button>
              </Link>
            </div>
          </div>
        </section>

        {/* Features Overview */}
        <section className="py-20 bg-background">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Powerful Features</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                TaskFlow combines the best features of task management and to-do applications to provide a comprehensive
                productivity solution.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
              <Card className="shadow-sm">
                <CardContent className="pt-6">
                  <div className="flex flex-col items-center text-center">
                    <div className="bg-primary/10 p-3 rounded-full h-16 w-16 flex items-center justify-center mb-4">
                      <ListChecks className="h-8 w-8 text-primary" />
                    </div>
                    <h3 className="text-xl font-semibold mb-2">Task & To-Do Management</h3>
                    <p className="text-muted-foreground">
                      Create, organize, and track tasks and to-dos with priorities and recurrence patterns.
                    </p>
                    <Link href="/features" className="mt-4 text-primary hover:underline text-sm">
                      Learn more
                    </Link>
                  </div>
                </CardContent>
              </Card>

              <Card className="shadow-sm">
                <CardContent className="pt-6">
                  <div className="flex flex-col items-center text-center">
                    <div className="bg-primary/10 p-3 rounded-full h-16 w-16 flex items-center justify-center mb-4">
                      <Timer className="h-8 w-8 text-primary" />
                    </div>
                    <h3 className="text-xl font-semibold mb-2">Pomodoro Timer</h3>
                    <p className="text-muted-foreground">
                      Boost productivity with integrated focus timers for each task.
                    </p>
                    <Link href="/features" className="mt-4 text-primary hover:underline text-sm">
                      Learn more
                    </Link>
                  </div>
                </CardContent>
              </Card>

              <Card className="shadow-sm">
                <CardContent className="pt-6">
                  <div className="flex flex-col items-center text-center">
                    <div className="bg-primary/10 p-3 rounded-full h-16 w-16 flex items-center justify-center mb-4">
                      <BarChart3 className="h-8 w-8 text-primary" />
                    </div>
                    <h3 className="text-xl font-semibold mb-2">Productivity Analytics</h3>
                    <p className="text-muted-foreground">
                      Track your progress with detailed statistics and visual charts.
                    </p>
                    <Link href="/features" className="mt-4 text-primary hover:underline text-sm">
                      Learn more
                    </Link>
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="text-center mt-12">
              <Link href="/features">
                <Button variant="outline">View All Features</Button>
              </Link>
            </div>
          </div>
        </section>

        {/* Benefits Overview */}
        <section className="py-20 bg-muted/30">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Why Use TaskFlow?</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                TaskFlow helps you stay organized, focused, and productive.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
              <div className="flex gap-4">
                <div className="bg-primary/10 p-3 rounded-full h-12 w-12 flex items-center justify-center shrink-0">
                  <Clock className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">Save Time</h3>
                  <p className="text-muted-foreground">
                    Manage all your tasks and to-dos in one place, eliminating the need for multiple apps.
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="bg-primary/10 p-3 rounded-full h-12 w-12 flex items-center justify-center shrink-0">
                  <PieChart className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">Increase Productivity</h3>
                  <p className="text-muted-foreground">
                    The integrated Pomodoro timer helps you stay focused during work sessions.
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="bg-primary/10 p-3 rounded-full h-12 w-12 flex items-center justify-center shrink-0">
                  <Repeat className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">Never Miss a Task</h3>
                  <p className="text-muted-foreground">
                    Set up recurring to-dos for regular tasks and ensure nothing falls through the cracks.
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="bg-primary/10 p-3 rounded-full h-12 w-12 flex items-center justify-center shrink-0">
                  <Search className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">Find Anything Quickly</h3>
                  <p className="text-muted-foreground">
                    Powerful search functionality lets you quickly find any task or to-do item.
                  </p>
                </div>
              </div>
            </div>

            <div className="text-center mt-12">
              <Link href="/benefits">
                <Button variant="outline">Learn More About Benefits</Button>
              </Link>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-primary text-primary-foreground">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to Boost Your Productivity?</h2>
            <p className="text-xl mb-10 max-w-2xl mx-auto opacity-90">
              Start managing your tasks and to-dos more efficiently with TaskFlow.
            </p>
            <Link href="/dashboard">
              <Button size="lg" variant="secondary" className="gap-2">
                Get Started Now <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="py-12 bg-background">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center gap-2 mb-6 md:mb-0">
              <ListChecks className="h-6 w-6 text-primary" />
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
                FAQ
              </Link>
            </div>
          </div>

          <div className="mt-8 pt-8 border-t">
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

