"use client";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Quote, Star, Users } from "lucide-react";
import { ScrollReveal } from "./ScrollReveal";

const testimonials = [
  {
    name: "Shree Vishnu",
    role: "Student",
    initials: "SV",
    content: "InnoVision helped me learn React in half the time it would have taken with traditional courses. The chapter-wise approach made complex concepts easy to understand.",
    rating: 5,
    gradient: "from-blue-500 to-cyan-500",
  },
  {
    name: "Karthik AN",
    role: "Student",
    initials: "KA",
    content: "I needed to quickly learn about SEO strategies for my new role. InnoVision created a perfect course that covered everything I needed to know.",
    rating: 5,
    gradient: "from-purple-500 to-pink-500",
  },
  {
    name: "Amrutha Varshini",
    role: "Student",
    initials: "AV",
    content: "As a student, I use InnoVision to supplement my university courses. It breaks down difficult subjects into manageable chapters that are easy to follow.",
    rating: 5,
    gradient: "from-orange-500 to-red-500",
  },
];

const Testimonials = () => {
  return (
    <section className="relative w-screen py-20 md:py-32 overflow-hidden">
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 right-1/4 w-[400px] h-[400px] bg-pink-500/10 rounded-full blur-[120px]" />
        <div className="absolute bottom-1/4 left-1/4 w-[400px] h-[400px] bg-purple-500/10 rounded-full blur-[120px]" />
      </div>

      <div className="container relative z-10 px-4 md:px-6 mx-auto">
        <ScrollReveal direction="up">
          <div className="flex flex-col items-center justify-center text-center mb-16">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-pink-500/10 text-pink-600 dark:text-pink-400 text-sm font-medium mb-4">
              <Users className="h-3.5 w-3.5" /> Testimonials
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight mb-4">
              What Our Users{" "}
              <span className="bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent">Say</span>
            </h2>
            <p className="max-w-2xl text-muted-foreground text-lg">
              Join thousands of satisfied learners who have transformed their knowledge with InnoVision.
            </p>
          </div>
        </ScrollReveal>

        <div className="mx-auto grid max-w-5xl grid-cols-1 gap-6 md:grid-cols-3">
          {testimonials.map((testimonial, index) => (
            <ScrollReveal key={testimonial.name} delay={index * 150} direction="up">
              <Card className="group relative overflow-hidden border-border/50 bg-card/50 backdrop-blur-sm transition-all duration-300 hover:shadow-xl hover:shadow-primary/5 hover:-translate-y-2 h-full">
                <div className="absolute top-4 right-4 opacity-10 group-hover:opacity-20 transition-opacity">
                  <Quote className="h-12 w-12" />
                </div>
                <CardHeader className="pb-2">
                  <div className="flex items-center gap-4">
                    <div className={`p-0.5 rounded-full bg-gradient-to-br ${testimonial.gradient}`}>
                      <div className="h-12 w-12 rounded-full bg-background flex items-center justify-center font-bold text-lg">
                        {testimonial.initials}
                      </div>
                    </div>
                    <div>
                      <p className="font-semibold">{testimonial.name}</p>
                      <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex gap-1">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="h-4 w-4 fill-yellow-500 text-yellow-500" />
                    ))}
                  </div>
                  <p className="text-muted-foreground leading-relaxed">"{testimonial.content}"</p>
                </CardContent>
              </Card>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
