"use client";
import {
  AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent,
  AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Search, Map, FileText, GraduationCap, ArrowRight } from "lucide-react";
import Link from "next/link";
import { ScrollReveal } from "./ScrollReveal";

const steps = [
  { number: 1, icon: Search, title: "Enter Your Topic", description: "Simply type in what you want to learn about, from programming to philosophy.", color: "#3b82f6" },
  { number: 2, icon: Map, title: "AI Generates Roadmap", description: "The AI analyzes the topic and creates a structured, chapter-wise roadmap tailored to you.", color: "#a855f7" },
  { number: 3, icon: FileText, title: "AI Generates Content", description: "The AI analyzes the roadmap and creates detailed content for each chapter.", color: "#f97316" },
  { number: 4, icon: GraduationCap, title: "Start Learning", description: "Begin your learning journey through interactive chapters, exercises, and assessments.", color: "#10b981" },
];

const HowItWorks = () => {
  return (
    <section id="how-it-works" className="relative w-screen py-20 md:py-32 overflow-hidden bg-background">
      <div className="container relative z-10 px-4 md:px-6 mx-auto">
        <ScrollReveal direction="up">
          <div className="flex flex-col items-center justify-center text-center mb-16">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-border text-foreground text-sm font-light mb-4">
              <Map className="h-3.5 w-3.5" /> How It Works
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-light tracking-tight mb-4 text-foreground">
              Your Learning Journey{" "}
              <span className="text-blue-500">Simplified</span>
            </h2>
            <p className="max-w-2xl text-muted-foreground text-lg font-light">
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
                    <div className="hidden md:block absolute top-10 left-[60%] w-full h-0.5 bg-border" />
                  )}
                  <div className="flex flex-col items-center text-center p-6 rounded-2xl bg-background border border-border hover:border-border/60 transition-all duration-300 hover:-translate-y-2 h-full group">
                    <div className="relative w-16 h-16 rounded-2xl border border-border p-0.5 mb-4 transition-all duration-300 group-hover:border-border/60" style={{ borderColor: `${step.color}20` }}>
                      <div className="w-full h-full rounded-2xl bg-background flex items-center justify-center">
                        <step.icon className="h-7 w-7 transition-colors" style={{ color: step.color }} />
                      </div>
                      <div className="absolute -top-2 -right-2 w-6 h-6 rounded-full flex items-center justify-center text-white text-xs font-light shadow-lg" style={{ backgroundColor: step.color }}>
                        {step.number}
                      </div>
                    </div>
                    <h3 className="text-lg font-light mb-2 text-foreground">{step.title}</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed font-light">{step.description}</p>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>

        <ScrollReveal direction="up" delay={400}>
          <div className="max-w-2xl mx-auto">
            <div className="relative rounded-2xl border border-border bg-background backdrop-blur-sm p-8 overflow-hidden">
              <div className="relative space-y-6">
                <div className="space-y-2">
                  <h3 className="text-2xl font-light text-foreground">Try it now</h3>
                  <p className="text-muted-foreground font-light">Enter a topic you'd like to learn about and see how InnoVision works.</p>
                </div>
                <div className="flex flex-col sm:flex-row gap-3">
                  <div className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <input
                      className="w-full h-12 rounded-full border border-border bg-background pl-10 pr-4 text-sm text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 transition-all font-light"
                      placeholder="e.g., Machine Learning, Web Development..."
                    />
                  </div>
                  <AlertDialog>
                    <AlertDialogTrigger className="h-12 px-6 rounded-full bg-blue-500 hover:bg-blue-600 text-white font-light flex items-center justify-center gap-2 transition-all hover:scale-105">
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
