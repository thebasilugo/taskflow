import type { Metadata } from "next"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { ArrowLeft, ArrowRight } from "lucide-react"

export const metadata: Metadata = {
  title: "TaskFlow | FAQ",
  description: "Frequently asked questions about TaskFlow",
}

export default function FaqPage() {
  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-12">
        <div className="mb-12">
          <Link href="/">
            <Button variant="ghost" className="gap-2 pl-0 mb-4">
              <ArrowLeft className="h-4 w-4" /> Back to Home
            </Button>
          </Link>
          <h1 className="text-4xl font-bold mb-4">Frequently Asked Questions</h1>
          <p className="text-xl text-muted-foreground max-w-3xl">Find answers to common questions about TaskFlow.</p>
        </div>

        <div className="max-w-3xl mx-auto">
          <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="item-1">
              <AccordionTrigger>Is TaskFlow free to use?</AccordionTrigger>
              <AccordionContent>
                Yes, TaskFlow is completely free to use. We believe in providing powerful productivity tools accessible
                to everyone. There are no hidden fees or premium features locked behind a paywall.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-2">
              <AccordionTrigger>Does TaskFlow work on mobile devices?</AccordionTrigger>
              <AccordionContent>
                Yes, TaskFlow is fully responsive and works on all devices including smartphones, tablets, and desktop
                computers. The interface automatically adapts to your screen size to provide the best possible
                experience.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-3">
              <AccordionTrigger>Is my data saved securely?</AccordionTrigger>
              <AccordionContent>
                TaskFlow stores your data locally in your browser's storage. Your data never leaves your device,
                ensuring complete privacy. This means you don't need to worry about server breaches or unauthorized
                access to your task information.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-4">
              <AccordionTrigger>Can I export my tasks and to-dos?</AccordionTrigger>
              <AccordionContent>
                Currently, TaskFlow doesn't support exporting data, but we're working on adding this feature in a future
                update. This will allow you to back up your data or transfer it between devices.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-5">
              <AccordionTrigger>How does the Pomodoro timer work?</AccordionTrigger>
              <AccordionContent>
                The Pomodoro timer helps you work in focused intervals. Start the timer when working on a task, and it
                will help track your progress and improve productivity. You can customize the duration of each work
                session from 5 to 60 minutes. When the timer completes, your task progress is automatically updated.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-6">
              <AccordionTrigger>Will I lose my data if I clear my browser cache?</AccordionTrigger>
              <AccordionContent>
                Yes, since TaskFlow uses local storage, clearing your browser cache or storage will remove your saved
                tasks and to-dos. We recommend taking screenshots or notes of important information before clearing your
                browser data.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-7">
              <AccordionTrigger>Can I use TaskFlow offline?</AccordionTrigger>
              <AccordionContent>
                Yes, once loaded, TaskFlow works offline as it stores all data locally in your browser. You can continue
                to add, edit, and manage your tasks without an internet connection. However, you'll need to be online
                initially to load the application.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-8">
              <AccordionTrigger>How do recurring to-dos work?</AccordionTrigger>
              <AccordionContent>
                Recurring to-dos allow you to create items that repeat on a regular schedule. You can set a to-do to
                recur daily, weekly, or monthly. When you mark a recurring to-do as complete, it remains in your list
                for the next occurrence. This is perfect for regular tasks like team meetings, reports, or routine
                activities.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-9">
              <AccordionTrigger>Is there a limit to how many tasks I can create?</AccordionTrigger>
              <AccordionContent>
                There's no hard limit on the number of tasks or to-dos you can create in TaskFlow. However, since the
                data is stored in your browser's local storage, there are practical limits based on your browser's
                storage allocation. Most modern browsers provide enough storage for thousands of tasks.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-10">
              <AccordionTrigger>How can I provide feedback or report issues?</AccordionTrigger>
              <AccordionContent>
                We value your feedback! While TaskFlow doesn't currently have a built-in feedback system, you can report
                issues or suggest improvements through our GitHub repository. We're constantly working to improve the
                application based on user feedback.
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>

        <div className="text-center mt-12">
          <p className="text-muted-foreground mb-4">Ready to boost your productivity?</p>
          <Link href="/dashboard">
            <Button size="lg" className="gap-2">
              Get Started with TaskFlow <ArrowRight className="h-4 w-4" />
            </Button>
          </Link>
        </div>
      </div>
    </div>
  )
}

