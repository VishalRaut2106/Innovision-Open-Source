"use client";
import {
  AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent,
  AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Search, Map, FileText, GraduationCap, ArrowRight } from "lucide-react";
import Link from "next/link";
import { ScrollReveal } from "./ScrollReveal";

const steps = [
  { number: 1, icon: Search, title: "Enter Your Topic", description: "Simply type in what you want to learn about, from programming to philosophy.", color: "from-blue-500 to-cyan-500" },
  { number: 2, icon: Map, title: "AI Generates Roadmap", description: "The AI analyzes the topic and creates a structured, chapter-wise roadmap tailored to you.", color: "from-purple-500 to-pink-500" },
  { number: 3, icon: FileText, title: "AI Generates Content", description: "The AI analyzes the roadmap and creates detailed content for each chapter.", color: "from-orange-500 to-red-500" },
  { number: 4, icon: GraduationCap, title: "Start Learning", description: "Begin your learning journey through interactive chapters, exercises, and assessments.", color: "from-green-500 to-emerald-500" },
];

const HowItWorks = () => {
  return (
    <section id="how-it-works" className="relative w-screen py-20 md:py-32 overflow-hidden">
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/3 right-0 w-[400px] h-[400px] bg-purple-500/10 rounded-full blur-[120px]" />
        <div className="absolute bottom-1/3 left-0 w-[400px] h-[400px] bg-blue-500/10 rounded-full blur-[120px]" />
      </div>

      <div className="container relative z-10 px-4 md:px-6 mx-auto">
        <ScrollReveal direction="up">
          <div className="flex flex-col items-center justify-center text-center mb-16">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-500/10 text-purple-600 dark:text-purple-400 text-sm font-medium mb-4">
              <Map className="h-3.5 w-3.5" /> How It Works
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight mb-4">
              Your Learning Journey{" "}
              <span className="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">Simplified</span>
            </h2>
            <p className="max-w-2xl text-muted-foreground text-lg">
              Creating your personalized learning experience is simple and fast.
            </p>
          </div>
        </ScrollReveal>

        <div className="max-w-5xl mx-auto mb-16">
          <div className="grid gap-6 md:grid-cols-4">
            {steps.map((step, index) => (
              <ScrollReveal key={step.number} delay={index * 150} direction="up">
                <div className="relative h-full">
                  {index < steps.length - 1 && (
                    <div className="hidden md:block absolute top-10 left-[60%] w-full h-0.5 bg-gradient-to-r from-border to-transparent" />
                  )}
                  <div className="flex flex-col items-center text-center p-6 rounded-2xl bg-card/50 backdrop-blur-sm border border-border/50 hover:border-primary/30 hover:shadow-lg hover:shadow-primary/5 transition-all duration-300 hover:-translate-y-2 h-full">
                    <div className={`relative w-16 h-16 rounded-2xl bg-gradient-to-br ${step.color} p-0.5 mb-4 transition-transform duration-300`}>
                      <div className="w-full h-full rounded-2xl bg-background flex items-center justify-center">
                        <step.icon className="h-7 w-7 text-foreground" />
                      </div>
                      <div className={`absolute -top-2 -right-2 w-6 h-6 rounded-full bg-gradient-to-br ${step.color} flex items-center justify-center text-white text-xs font-bold shadow-lg`}>
                        {step.number}
                      </div>
                    </div>
                    <h3 className="text-lg font-semibold mb-2">{step.title}</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">{step.description}</p>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>

        <ScrollReveal direction="up" delay={400}>
          <div className="max-w-2xl mx-auto">
            <div className="relative rounded-2xl border border-border/50 bg-card/50 backdrop-blur-sm p-8 shadow-xl overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-full blur-2xl" />
              <div className="relative space-y-6">
                <div className="space-y-2">
                  <h3 className="text-2xl font-bold">Try it now</h3>
                  <p className="text-muted-foreground">Enter a topic you'd like to learn about and see how InnoVision works.</p>
                </div>
                <div className="flex flex-col sm:flex-row gap-3">
                  <div className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <input
                      className="w-full h-12 rounded-xl border border-input bg-background pl-10 pr-4 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 transition-all"
                      placeholder="e.g., Machine Learning, Web Development..."
                    />
                  </div>
                  <AlertDialog>
                    <AlertDialogTrigger className="h-12 px-6 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white font-medium flex items-center justify-center gap-2 transition-all shadow-lg shadow-blue-500/25 hover:shadow-blue-500/40 hover:scale-105">
                      Generate Course <ArrowRight className="h-4 w-4" />
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                      <AlertDialogHeader>
                        <AlertDialogTitle>Login to continue</AlertDialogTitle>
                        <AlertDialogDescription>You must be logged in to generate the course, login to continue.</AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction><Link href="/login">Login</Link></AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                </div>
              </div>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
};

export default HowItWorks;
