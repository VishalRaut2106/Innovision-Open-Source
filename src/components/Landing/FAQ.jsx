"use client";
import { useState } from "react";
import { HelpCircle, Plus, Minus } from "lucide-react";
import { ScrollReveal } from "./ScrollReveal";

const faqs = [
  {
    question: "How does InnoVision generate personalized courses?",
    answer: "InnoVision uses advanced AI to analyze your topic of interest and creates a structured, chapter-by-chapter course tailored to your learning needs. Our algorithm considers the complexity of the subject, logical progression of concepts, and includes interactive elements to enhance understanding."
  },
  {
    question: "What topics can I learn with InnoVision?",
    answer: "You can learn virtually any topic with InnoVision. From technical subjects like programming, data science, and engineering to humanities, arts, business skills, and more. If you can describe it, our AI can create a structured learning path for it."
  },
  {
    question: "How long does it take to generate a course?",
    answer: "Course generation typically takes just a few seconds. The AI analyzes your topic, creates a comprehensive roadmap, and then generates detailed chapter content ready for you to start learning immediately."
  },
  {
    question: "Can I track my learning progress?",
    answer: "Yes, InnoVision provides detailed progress tracking. You can monitor which chapters you've completed, view your performance on exercises and assessments, and see statistics about your learning journey."
  },
  {
    question: "Do I need to create an account to use InnoVision?",
    answer: "Yes, you'll need to create a free account to generate and access courses. This allows us to save your progress, provide personalized recommendations, and ensure you can return to your learning materials anytime."
  },
  {
    question: "How does InnoVision ensure the quality of course content?",
    answer: "Our AI is trained on high-quality educational materials and continuously improved based on user feedback. We also implement regular quality checks and updates to ensure accuracy and effectiveness of the generated content."
  }
];

const FAQItem = ({ question, answer, isOpen, onClick }) => (
  <div className={`rounded-2xl border border-border/50 bg-card/50 backdrop-blur-sm overflow-hidden transition-all duration-300 ${isOpen ? 'shadow-lg shadow-primary/5 border-primary/20' : 'hover:border-primary/20'}`}>
    <button onClick={onClick} className="flex w-full items-center justify-between p-5 text-left group">
      <span className="font-medium pr-4 group-hover:text-primary transition-colors">{question}</span>
      <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300 ${isOpen ? 'bg-primary text-primary-foreground' : 'bg-muted group-hover:bg-primary/10'}`}>
        {isOpen ? <Minus className="h-4 w-4" /> : <Plus className="h-4 w-4" />}
      </div>
    </button>
    <div className={`overflow-hidden transition-all duration-300 ${isOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}`}>
      <div className="px-5 pb-5 text-muted-foreground leading-relaxed">{answer}</div>
    </div>
  </div>
);

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState(null);

  return (
    <section id="faq" className="relative w-screen py-20 md:py-32 bg-gradient-to-b from-muted/50 via-background to-muted/50">
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-0 w-[300px] h-[300px] bg-cyan-500/5 rounded-full blur-[100px]" />
        <div className="absolute bottom-1/4 right-0 w-[300px] h-[300px] bg-blue-500/5 rounded-full blur-[100px]" />
      </div>

      <div className="container relative z-10 px-4 mx-auto md:px-6">
        <ScrollReveal direction="up">
          <div className="flex flex-col items-center justify-center text-center mb-16">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 text-sm font-medium mb-4">
              <HelpCircle className="h-3.5 w-3.5" /> FAQ
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight mb-4">
              Frequently Asked{" "}
              <span className="bg-gradient-to-r from-cyan-600 to-blue-600 bg-clip-text text-transparent">Questions</span>
            </h2>
            <p className="max-w-2xl text-muted-foreground text-lg">
              Find answers to common questions about InnoVision's AI-powered learning platform.
            </p>
          </div>
        </ScrollReveal>

        <div className="mx-auto max-w-3xl space-y-4">
          {faqs.map((faq, index) => (
            <ScrollReveal key={index} delay={index * 100} direction="up">
              <FAQItem
                question={faq.question}
                answer={faq.answer}
                isOpen={openIndex === index}
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
              />
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FAQ;
