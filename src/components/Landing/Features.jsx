"use client";
import { useState } from "react";
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  BookOpen, Brain, Compass, Layers, Sparkles, Zap, Target, Trophy,
  Clock, Globe, Shield, CheckCircle, Gamepad2, Moon, Bell, Bookmark,
  Code, Download, BarChart3, Users, GraduationCap, PlaySquare, FileText,
  Flame, Medal, Crown, Copy, Quote, Calendar, Wifi, Video, Briefcase,
  Network, ChevronDown, ChevronUp,
} from "lucide-react";
import { ScrollReveal, StaggerReveal } from "./ScrollReveal";

const courseFeatures = [
  { icon: Sparkles, title: "AI Course Generation", description: "Generate comprehensive courses on any topic in seconds using Google Gemini AI.", color: "text-blue-500", bgColor: "bg-blue-500/10" },
  { icon: PlaySquare, title: "YouTube Courses", description: "Transform any YouTube video into a structured learning course automatically.", color: "text-red-500", bgColor: "bg-red-500/10" },
  { icon: Code, title: "Instructor Studio", description: "WYSIWYG editor with AI assistance, templates, and resource management.", color: "text-cyan-500", bgColor: "bg-cyan-500/10" },
  { icon: FileText, title: "Content Ingestion", description: "Import PDFs, textbooks, and documents to generate AI-powered courses.", color: "text-orange-500", bgColor: "bg-orange-500/10" },
  { icon: GraduationCap, title: "Curriculum Browser", description: "Pre-built curriculum from LKG to Class 12, CBSE & State Boards.", color: "text-green-500", bgColor: "bg-green-500/10" },
  { icon: Layers, title: "Engineering Courses", description: "Specialized courses for all engineering branches and semesters.", color: "text-purple-500", bgColor: "bg-purple-500/10" },
];

const gamificationFeatures = [
  { icon: Zap, title: "XP Points System", description: "Earn XP for lessons, quizzes, courses. Level up as you learn.", color: "text-yellow-500", bgColor: "bg-yellow-500/10" },
  { icon: Flame, title: "Learning Streaks", description: "Maintain daily streaks with fire animations. Build study habits.", color: "text-orange-500", bgColor: "bg-orange-500/10" },
  { icon: Medal, title: "8+ Badges", description: "First Steps, Dedicated, Perfectionist, Speed Demon, Night Owl & more.", color: "text-amber-500", bgColor: "bg-amber-500/10" },
  { icon: Trophy, title: "Leaderboards", description: "Compete worldwide with Daily, Weekly, and All-Time rankings.", color: "text-emerald-500", bgColor: "bg-emerald-500/10" },
  { icon: Target, title: "Daily Quests", description: "Complete daily challenges for bonus XP rewards.", color: "text-pink-500", bgColor: "bg-pink-500/10" },
  { icon: Gamepad2, title: "XP Combo Multiplier", description: "Chain correct answers for bonus XP multipliers!", color: "text-violet-500", bgColor: "bg-violet-500/10" },
];

const learningFeatures = [
  { icon: Brain, title: "Interactive Quizzes", description: "MCQ, Fill-in-the-blanks, Match the Following for each chapter.", color: "text-purple-500", bgColor: "bg-purple-500/10" },
  { icon: Clock, title: "Reading Time", description: "Estimated reading time for each chapter (200 wpm).", color: "text-blue-500", bgColor: "bg-blue-500/10" },
  { icon: Copy, title: "Code Copy Button", description: "One-click copy for all code blocks with success animation.", color: "text-slate-500", bgColor: "bg-slate-500/10" },
  { icon: Bookmark, title: "Bookmark System", description: "Save favorite chapters for quick access in your profile.", color: "text-rose-500", bgColor: "bg-rose-500/10" },
  { icon: Globe, title: "100+ Languages", description: "Learn in your preferred language with real-time AI translation.", color: "text-teal-500", bgColor: "bg-teal-500/10" },
  { icon: Compass, title: "AI Roadmaps", description: "Step-by-step learning paths organized into 8-12 chapters.", color: "text-indigo-500", bgColor: "bg-indigo-500/10" },
];

const premiumFeatures = [
  { icon: BarChart3, title: "Analytics Dashboard", description: "Track performance metrics, XP graphs, and learning insights.", color: "text-blue-500", bgColor: "bg-blue-500/10" },
  { icon: Calendar, title: "Activity Heatmap", description: "GitHub-style activity heatmap showing your learning consistency.", color: "text-green-500", bgColor: "bg-green-500/10" },
  { icon: Brain, title: "AI Personalization", description: "Smart recommendations using reinforcement learning algorithms.", color: "text-purple-500", bgColor: "bg-purple-500/10" },
  { icon: Wifi, title: "Offline Learning", description: "Download courses for offline access. Learn anywhere, anytime.", color: "text-orange-500", bgColor: "bg-orange-500/10" },
  { icon: Network, title: "LMS Integration", description: "Connect with Moodle and Canvas for grade syncing.", color: "text-red-500", bgColor: "bg-red-500/10" },
  { icon: Briefcase, title: "Project-Based Learning", description: "Build real-world projects with mentor guidance and reviews.", color: "text-teal-500", bgColor: "bg-teal-500/10" },
  { icon: Video, title: "Multimodal Content", description: "Generate audio scripts and video storyboards for courses.", color: "text-pink-500", bgColor: "bg-pink-500/10" },
  { icon: FileText, title: "Research Platform", description: "Export anonymized datasets for educational research.", color: "text-cyan-500", bgColor: "bg-cyan-500/10" },
];

const uxFeatures = [
  { icon: Moon, title: "Night Mode", description: "Blue light filter for comfortable late-night studying.", color: "text-indigo-500", bgColor: "bg-indigo-500/10" },
  { icon: Bell, title: "Study Reminders", description: "Browser push notifications for scheduled study times.", color: "text-yellow-500", bgColor: "bg-yellow-500/10" },
  { icon: Quote, title: "Motivational Quotes", description: "Rotating inspirational quotes on your dashboard.", color: "text-pink-500", bgColor: "bg-pink-500/10" },
  { icon: Users, title: "Profile Dashboard", description: "Overview, Progress, Courses, Compete, Activity, and Settings.", color: "text-blue-500", bgColor: "bg-blue-500/10" },
];

const FeatureCard = ({ feature, premium, index = 0 }) => (
  <ScrollReveal delay={index * 100} direction="up">
    <Card className="group relative overflow-hidden border-border/50 bg-card/50 backdrop-blur-sm transition-all duration-300 hover:shadow-xl hover:shadow-primary/5 hover:-translate-y-2 h-full">
      {premium && (
        <div className="absolute top-3 right-3">
          <span className="px-2 py-0.5 rounded-full bg-yellow-500/20 text-yellow-600 dark:text-yellow-400 text-xs font-medium flex items-center gap-1">
            <Crown className="h-3 w-3" /> Premium
          </span>
        </div>
      )}
      <div className="absolute inset-0 bg-gradient-to-r from-blue-500/0 via-blue-500/0 to-purple-500/0 group-hover:from-blue-500/10 group-hover:via-transparent group-hover:to-purple-500/10 transition-all duration-500" />
      <CardHeader className="relative">
        <div className={`w-12 h-12 rounded-xl ${feature.bgColor} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
          <feature.icon className={`h-6 w-6 ${feature.color}`} />
        </div>
        <CardTitle className={`text-lg font-semibold mb-2 ${premium ? 'pr-16' : ''}`}>{feature.title}</CardTitle>
        <CardDescription className="text-muted-foreground leading-relaxed text-sm">{feature.description}</CardDescription>
      </CardHeader>
    </Card>
  </ScrollReveal>
);

const FeatureSection = ({ icon: Icon, iconColor, title, features, columns = 3, badge }) => (
  <div className="mb-20">
    <ScrollReveal direction="up">
      <div className="flex items-center justify-center gap-2 mb-8">
        <Icon className={`h-5 w-5 ${iconColor}`} />
        <h3 className="text-xl font-semibold">{title}</h3>
        {badge && (
          <span className="px-2 py-0.5 rounded-full bg-yellow-500/20 text-yellow-600 dark:text-yellow-400 text-xs font-medium">
            {badge}
          </span>
        )}
      </div>
    </ScrollReveal>
    <div className={`grid grid-cols-1 md:grid-cols-2 ${columns === 4 ? 'lg:grid-cols-4' : 'lg:grid-cols-3'} gap-6 max-w-6xl mx-auto`}>
      {features.map((feature, index) => (
        <FeatureCard key={feature.title} feature={feature} premium={badge === "7-Day Free Trial"} index={index} />
      ))}
    </div>
  </div>
);

const Features = () => {
  const [showAllPremium, setShowAllPremium] = useState(false);

  return (
    <section id="features" className="relative w-screen py-20 md:py-32 bg-gradient-to-b from-background via-muted/30 to-background">
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-0 left-1/4 w-[300px] h-[300px] bg-blue-500/5 rounded-full blur-[100px]" />
        <div className="absolute bottom-0 right-1/4 w-[300px] h-[300px] bg-purple-500/5 rounded-full blur-[100px]" />
      </div>

      <div className="container relative z-10 px-4 md:px-6 mx-auto">
        <ScrollReveal direction="up">
          <div className="flex flex-col items-center justify-center text-center mb-16">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
              <Zap className="h-3.5 w-3.5" /> 50+ Features
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight mb-4">
              Everything You Need to{" "}
              <span className="bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">Learn Effectively</span>
            </h2>
            <p className="max-w-2xl text-muted-foreground text-lg">
              Our platform combines cutting-edge AI with proven learning methodologies and gamification to create the most engaging learning experience.
            </p>
          </div>
        </ScrollReveal>

        <FeatureSection icon={Sparkles} iconColor="text-blue-500" title="AI-Powered Course Generation" features={courseFeatures} />
        <FeatureSection icon={Gamepad2} iconColor="text-yellow-500" title="Gamification & Rewards" features={gamificationFeatures} />
        <FeatureSection icon={BookOpen} iconColor="text-purple-500" title="Enhanced Learning Experience" features={learningFeatures} />

        <div className="mb-20">
          <FeatureSection icon={Crown} iconColor="text-yellow-500" title="Premium Features" features={showAllPremium ? premiumFeatures : premiumFeatures.slice(0, 4)} columns={4} badge="7-Day Free Trial" />
          {premiumFeatures.length > 4 && (
            <div className="flex justify-center mt-6">
              <Button variant="outline" onClick={() => setShowAllPremium(!showAllPremium)} className="gap-2 transition-all duration-300 hover:scale-105">
                {showAllPremium ? <>Show Less <ChevronUp className="h-4 w-4" /></> : <>Show All Premium Features <ChevronDown className="h-4 w-4" /></>}
              </Button>
            </div>
          )}
        </div>

        <FeatureSection icon={Users} iconColor="text-green-500" title="User Experience" features={uxFeatures} columns={4} />

        <StaggerReveal className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4 max-w-5xl mx-auto" staggerDelay={100}>
          {[
            { icon: Shield, label: "Secure", desc: "Data Protected" },
            { icon: CheckCircle, label: "PWA Support", desc: "Install as App" },
            { icon: Globe, label: "Multi-language", desc: "100+ Languages" },
            { icon: Download, label: "Offline Mode", desc: "Learn Anywhere" },
            { icon: Code, label: "Code Editor", desc: "Built-in IDE" },
            { icon: Crown, label: "PRO Badge", desc: "Premium Users" },
          ].map((item) => (
            <div key={item.label} className="text-center p-4 rounded-xl bg-card/50 border border-border/50 hover:border-primary/20 transition-all duration-300 hover:scale-105 cursor-default">
              <div className="w-10 h-10 rounded-full bg-muted flex items-center justify-center mx-auto mb-3">
                <item.icon className="h-5 w-5 text-muted-foreground" />
              </div>
              <p className="font-medium text-sm">{item.label}</p>
              <p className="text-xs text-muted-foreground">{item.desc}</p>
            </div>
          ))}
        </StaggerReveal>
      </div>
    </section>
  );
};

export default Features;
