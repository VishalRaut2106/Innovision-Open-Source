import Hero from "./Hero";
import Features from "./Features";
import HowItWorks from "./HowItWorks";
import Image from "next/image";
import Testimonials from "./Testimonials";
import CTA from "./CTA";
import FAQ from "./FAQ";
import Link from "next/link";
import { Github, Twitter, Linkedin, Mail } from "lucide-react";
import ParticleBackground from "./ParticleBackground";
import GradientBlob from "./GradientBlob";
import CursorFollower from "./CursorFollower";
import { MorphingDecoration } from "./MorphingSVG";

export default function Landing() {
  return (
    <div className="relative flex h-screen overflow-y-scroll flex-col scroll-smooth">
      {/* Background Effects */}
      <ParticleBackground />
      <GradientBlob />
      <CursorFollower size={16} delay={0.15} />
      
      {/* Morphing decorations */}
      <MorphingDecoration className="top-[20%] right-[5%] w-64 h-64 opacity-50" />
      <MorphingDecoration className="top-[60%] left-[5%] w-48 h-48 opacity-40" />

      <div className="relative z-[2] flex flex-col items-center">
        <Hero />
        <Features />
        <HowItWorks />
        <FAQ />
        <Testimonials />
        <CTA />

        {/* Modern Footer */}
        <footer className="w-screen border-t bg-background/80 backdrop-blur-sm">
          <div className="container mx-auto px-4 md:px-6 py-12">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              {/* Brand */}
              <div className="space-y-4">
                <div className="flex items-center gap-2 font-bold text-lg">
                  <Image
                    src="/InnoVision_LOGO-removebg-preview.png"
                    className="dark:invert"
                    alt="logo"
                    width={32}
                    height={32}
                  />
                  <span>InnoVision</span>
                </div>
                <p className="text-sm text-muted-foreground">
                  AI-powered learning platform that creates personalized courses on any topic.
                </p>
              </div>

              {/* Quick Links */}
              <div className="space-y-4">
                <h4 className="font-semibold">Quick Links</h4>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li><Link href="/features" className="hover:text-foreground transition-colors">Features</Link></li>
                  <li><Link href="/demo" className="hover:text-foreground transition-colors">Demo</Link></li>
                  <li><Link href="/premium" className="hover:text-foreground transition-colors">Premium</Link></li>
                  <li><Link href="/contact" className="hover:text-foreground transition-colors">Contact</Link></li>
                </ul>
              </div>

              {/* Legal */}
              <div className="space-y-4">
                <h4 className="font-semibold">Legal</h4>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li><Link href="/privacy" className="hover:text-foreground transition-colors">Privacy Policy</Link></li>
                  <li><Link href="/terms" className="hover:text-foreground transition-colors">Terms of Service</Link></li>
                </ul>
              </div>

              {/* Social */}
              <div className="space-y-4">
                <h4 className="font-semibold">Connect</h4>
                <div className="flex gap-4">
                  <a href="https://github.com/ItsVikasA/InnoVision" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-foreground transition-all duration-300 hover:scale-110">
                    <Github className="h-5 w-5" />
                  </a>
                  <a href="#" className="text-muted-foreground hover:text-foreground transition-all duration-300 hover:scale-110">
                    <Twitter className="h-5 w-5" />
                  </a>
                  <a href="#" className="text-muted-foreground hover:text-foreground transition-all duration-300 hover:scale-110">
                    <Linkedin className="h-5 w-5" />
                  </a>
                  <a href="mailto:contact@innovision.com" className="text-muted-foreground hover:text-foreground transition-all duration-300 hover:scale-110">
                    <Mail className="h-5 w-5" />
                  </a>
                </div>
              </div>
            </div>

            {/* Bottom bar */}
            <div className="mt-12 pt-8 border-t border-border/50 flex flex-col md:flex-row items-center justify-between gap-4">
              <p className="text-sm text-muted-foreground">© 2025 InnoVision. All rights reserved.</p>
              <p className="text-sm text-muted-foreground">Made with ❤️ for learners everywhere</p>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
}
