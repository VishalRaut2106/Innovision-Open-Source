"use client";
import { ArrowRight, Sparkles, Rocket } from "lucide-react";
import { Button } from "../ui/button";
import Link from "next/link";
import { ScrollReveal } from "./ScrollReveal";
import MagneticButton from "./MagneticButton";

const CTA = () => {
  return (
    <section className="relative w-screen py-20 md:py-32 overflow-hidden bg-background">
      <div className="container relative z-10 mx-auto px-4 md:px-6">
        <div className="flex flex-col items-center justify-center text-center max-w-3xl mx-auto">
          {/* Badge */}
          <ScrollReveal direction="up">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-border text-foreground text-sm font-light mb-8">
              <Rocket className="h-4 w-4" />
              <span>Start Your Journey Today</span>
            </div>
          </ScrollReveal>

          {/* Heading */}
          <ScrollReveal direction="up" delay={100}>
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-light tracking-tight text-foreground mb-6">
              Ready to Transform Your{" "}
              <span className="relative inline-block text-blue-500">
                Learning?
              </span>
            </h2>
          </ScrollReveal>

          {/* Subtitle */}
          <ScrollReveal direction="up" delay={200}>
            <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mb-10 leading-relaxed font-light">
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
                    className="h-14 px-8 text-base font-light gap-2 bg-blue-500 hover:bg-blue-600 text-white rounded-full transition-all duration-300 hover:scale-105"
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
                    className="h-14 px-8 text-base font-light bg-transparent border border-border text-foreground hover:bg-muted rounded-full transition-all duration-300 hover:scale-105"
                  >
                    See Demo
                  </Button>
                </Link>
              </MagneticButton>
            </div>
          </ScrollReveal>

          {/* Trust indicators */}
          <ScrollReveal direction="up" delay={400}>
            <div className="flex flex-wrap items-center justify-center gap-8 text-muted-foreground text-sm font-light">
              <div className="flex items-center gap-2">
                <svg className="h-5 w-5 text-blue-500" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span>Free to start</span>
              </div>
              <div className="flex items-center gap-2">
                <svg className="h-5 w-5 text-blue-500" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span>No credit card required</span>
              </div>
              <div className="flex items-center gap-2">
                <svg className="h-5 w-5 text-blue-500" fill="currentColor" viewBox="0 0 20 20">
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
