"use client";

import emailjs from "emailjs-com";
import { useRef, useState } from "react";
import { FaInstagram } from "react-icons/fa6";
import { IoLogoWhatsapp } from "react-icons/io5";
import { FaXTwitter } from "react-icons/fa6";
import { FaLinkedin } from "react-icons/fa";
import { FaYoutube, FaGithub } from "react-icons/fa6";
import { ToastContainer } from 'react-toastify';
import { toast } from "sonner";
import { PageBackground, GridPattern, ScrollReveal } from "@/components/ui/PageWrapper";
import { Mail, Send } from "lucide-react";


export default function ContactPage() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const formRef = useRef(null)

 function sendEmail(formData) {
    const serviceId = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID; 
    const templateId = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID; 
    const userId = process.env.NEXT_PUBLIC_EMAILJS_USER_ID; 
   
    if (!serviceId || !templateId || !userId) {
      console.error("EmailJS configuration missing");
      toast.error("Email service not configured. Please contact support.");
      formRef.current.removeAttribute("disabled");
      return;
    }
  
    emailjs.send(serviceId, templateId, formData, userId)
      .then((response) => {
        console.log("Email sent successfully:", response);
        toast.success("Message sent successfully!");
        formRef.current.removeAttribute("disabled");
      })
      .catch((error) => {
        console.error("Failed to send email.", error);
        
        // Specific error handling for Gmail API issues
        if (error.text && error.text.includes("Gmail_API")) {
          toast.error("Email service temporarily unavailable. Please try again later or contact us directly.");
        } else if (error.status === 412) {
          toast.error("Email service needs reconnection. Please contact support.");
        } else {
          toast.error("Failed to send message. Please try again.");
        }
        
        formRef.current.removeAttribute("disabled");
      });
  }
  

  const handleSubmit = (e) => {
    e.preventDefault();
    formRef.current.setAttribute("disabled", "true");
    
    // Only clear form and show success after email is actually sent
    const formData = { email, message };
    sendEmail(formData);
    
    // Clear form fields immediately for better UX
    setEmail("");
    setMessage("");
    toast.success("Message sent successfully!", { type: "success" });
    setTimeout(() => {
      formRef.current.removeAttribute("disabled");
    }, 2000);
  };

  return (
    <div className="flex flex-col min-h-[92vh] overflow-hidden bg-background relative">
      <PageBackground />
      <GridPattern opacity={0.02} />
      
      <div className="flex-1 flex flex-col relative z-10">
      <ToastContainer />
        <div className="bg-transparent py-6 px-4">
          <ScrollReveal>
            <div className="max-w-3xl mx-auto text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-full mb-4 shadow-lg shadow-blue-500/25">
                <Mail className="h-8 w-8 text-white" />
              </div>
              <h1 className="text-foreground text-5xl md:text-6xl font-bold mb-6">Contact Us</h1>
              <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
                Have questions? The quickest way to get in touch with us is using the contact information below.
              </p>
            </div>
          </ScrollReveal>
        </div>
        <div className="bg-muted/30 backdrop-blur-sm flex-1 py-8 px-4">
          <ScrollReveal delay={100}>
            <div className="max-w-xl mx-auto">
              <h2 className="text-muted-foreground text-lg md:text-xl font-bold mb-4 text-center">Send a Message</h2>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <input
                    type="email"
                    placeholder="Email"
                    className="w-full px-4 py-3 rounded-xl bg-background/50 backdrop-blur-sm border border-border/50 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 transition-all"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>

                <div>
                  <textarea
                    placeholder="Message"
                    rows="4"
                    className="w-full px-4 py-3 rounded-xl bg-background/50 backdrop-blur-sm border border-border/50 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 transition-all resize-none"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    required
                  />
                </div>

                <div className="flex justify-center pt-0">
                  <button
                    type="submit"
                    ref={formRef}
                    className="bg-gradient-to-r from-blue-600 to-cyan-600 text-white px-8 py-3 rounded-xl font-medium hover:from-blue-700 hover:to-cyan-700 transition-all duration-300 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:ring-offset-2 focus:ring-offset-background disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2 shadow-lg shadow-blue-500/25"
                  >
                    <Send className="h-4 w-4" />
                    Submit 
                  </button>
                </div>
              </form>

              <div className="flex justify-center text-muted-foreground space-x-6 mt-10">
                <a href="https://www.instagram.com/hands_on_coding_028/#" className="text-2xl hover:text-foreground hover:scale-110 transition-all duration-300">
                <FaInstagram />
                </a>
                <a href="https://wa.me/7019003366" className="text-2xl hover:text-foreground hover:scale-110 transition-all duration-300">
                <IoLogoWhatsapp />
                </a>
                <a href="https://github.com/ItsVikasA" className="text-2xl hover:text-foreground hover:scale-110 transition-all duration-300">
                  <FaGithub />
                </a>
                <a href="https://www.linkedin.com/in/vikas028/" className="text-2xl hover:text-foreground hover:scale-110 transition-all duration-300">
                <FaLinkedin />
                </a>
                <a href="https://www.youtube.com/@hands_on_coding_028" className="text-2xl hover:text-foreground hover:scale-110 transition-all duration-300">
                <FaYoutube />
                </a>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </div>
  );
}