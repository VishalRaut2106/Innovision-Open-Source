"use client";
import { ArrowRight, Sparkles, Rocket } from "lucide-react";
import { Button } from "../ui/button";
import Link from "next/link";
import { ScrollReveal } from "./ScrollReveal";
import MagneticButton from "./MagneticButton";

const CTA = () => {
  return (
    <section className="relative w-screen py-20 md:py-32 overflow-hidden">
      {/* Gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-600 via-purple-600 to-pink-600" />

      {/* Animated background shapes */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-white/10 rounded-full blur-[100px] animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-white/10 rounded-full blur-[100px] animate-pulse" style={{ animationDelay: "1s" }} />
      </div>

      {/* Grid pattern overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.05)_1px,transparent_1px)] bg-[size:50px_50px]" />

      <div className="container relative z-10 mx-auto px-4 md:px-6">
        <div className="flex flex-col items-center justify-center text-center max-w-3xl mx-auto">
          {/* Badge */}
          <ScrollReveal direction="up">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 text-white text-sm font-medium mb-8">
              <Rocket className="h-4 w-4" />
              <span>Start Your Journey Today</span>
            </div>
          </ScrollReveal>

          {/* Heading */}
          <ScrollReveal direction="up" delay={100}>
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-white mb-6">
              Ready to Transform Your{" "}
              <span className="relative inline-block">
                Learning?
                <svg className="absolute -bottom-2 left-0 w-full" viewBox="0 0 200 12" fill="none">
                  <path d="M2 10C50 4 150 4 198 10" stroke="rgba(255,255,255,0.5)" strokeWidth="3" strokeLinecap="round" />
                </svg>
              </span>
            </h2>
          </ScrollReveal>

          {/* Subtitle */}
          <ScrollReveal direction="up" delay={200}>
            <p className="text-lg md:text-xl text-white/80 max-w-2xl mb-10 leading-relaxed">
              Join thousands of learners who are mastering new skills with AI-powered personalized courses. Start for free today.
            </p>
          </ScrollReveal>

          {/* CTA Buttons */}
          <ScrollReveal direction="up" delay={300}>
            <div className="flex flex-col sm:flex-row gap-4 mb-12">
              <MagneticButton strength={0.25}>
                <Link href="/login">
                  <Button
                    size="lg"
                    className="h-14 px-8 text-base font-semibold gap-2 bg-white text-gray-900 hover:bg-white/90 shadow-xl shadow-black/20 transition-all duration-300 hover:scale-105"
                  >
                    <Sparkles className="h-5 w-5" />
                    Get Started Free
                    <ArrowRight className="h-4 w-4" />
                  </Button>
                </Link>
              </MagneticButton>
              <MagneticButton strength={0.25}>
                <Link href="/demo">
                  <Button
                    variant="outline"
                    size="lg"
                    className="h-14 px-8 text-base font-semibold bg-transparent border-2 border-white/30 text-white hover:bg-white/10 hover:border-white/50 transition-all duration-300 hover:scale-105"
                  >
                    See Demo
                  </Button>
                </Link>
              </MagneticButton>
            </div>
          </ScrollReveal>

          {/* Trust indicators */}
          <ScrollReveal direction="up" delay={400}>
            <div className="flex flex-wrap items-center justify-center gap-8 text-white/60 text-sm">
              <div className="flex items-center gap-2">
                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span>Free to start</span>
              </div>
              <div className="flex items-center gap-2">
                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span>No credit card required</span>
              </div>
              <div className="flex items-center gap-2">
                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span>Cancel anytime</span>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
};

export default CTA;
