import { motion, AnimatePresence } from "motion/react";
import { Plus, Minus, HelpCircle, Send, User, Mail, MessageSquare, Phone } from "lucide-react";
import React, { useState } from "react";

const faqs = [
  {
    question: "Why pick Innovative Digital Marketing in Delhi?",
    answer: "Top Delhi agency since 2011, delivering SEO, PPC, SMM, and web design with 300% traffic growth. Our data-driven approach ensures that every campaign is optimized for maximum ROI."
  },
  {
    question: "What services do you offer in Delhi?",
    answer: "We offer a comprehensive suite of digital marketing services including SEO (Search Engine Optimization), PPC (Pay-Per-Click) Advertising, Social Media Marketing, Content Marketing, and Professional Web Design & Development."
  },
  {
    question: "What makes Innovative Digital Marketing the best SEO agency in Delhi?",
    answer: "Our success is built on transparency, technical expertise, and a deep understanding of the Delhi market. We don't just provide reports; we provide results that impact your bottom line."
  },
  {
    question: "Do you offer local SEO services for businesses in West Delhi?",
    answer: "Yes, we specialize in local SEO strategies tailored for businesses in West Delhi and across the NCR region. We help you dominate local search results and attract customers in your immediate vicinity."
  },
  {
    question: "SEO vs. PPC: What's the difference?",
    answer: "SEO focuses on organic (free) traffic from search engines over the long term, while PPC involves paying for ads to appear at the top of search results immediately. A balanced strategy often uses both for maximum visibility."
  }
];

export default function FAQ() {
  const [activeIndex, setActiveIndex] = useState<number | null>(0);
  const [formStatus, setFormStatus] = useState<"idle" | "submitting" | "success">("idle");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormStatus("submitting");
    setTimeout(() => setFormStatus("success"), 1500);
  };

  return (
    <section className="premium-section py-6 md:py-10 bg-brand-section/30 overflow-hidden relative isolate">
      {/* Digital Background Accents */}
      <div className="absolute inset-0 -z-10 pointer-events-none">
        <div className="absolute top-0 right-0 w-96 h-96 bg-brand-accent blur-[120px]" />
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-brand-accent blur-[100px]" />
      </div>

      <div className="max-w-7xl mx-auto px-4 md:px-6">
        {/* Header */}
        <div className="text-center mb-8 md:mb-12">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex items-center justify-center gap-2 text-brand-primary font-display font-bold uppercase tracking-[0.3em] text-[10px] md:text-xs mb-4"
          >
            <HelpCircle size={14} /> ASK QUESTIONS
          </motion.div>
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-3xl md:text-5xl font-display font-bold text-brand-text-primary"
          >
            FAQ About Our <span className="text-brand-primary">SEO Services</span>
          </motion.h2>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 md:gap-12 items-start">
          {/* Left Column: FAQ List */}
          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className={`border rounded-2xl md:rounded-[2rem] transition-all duration-300 premium-card ${
                  activeIndex === index 
                    ? "bg-white border-brand-primary/20 shadow-soft-lg" 
                    : "bg-white/50 border-brand-border hover:border-brand-primary/30"
                }`}
              >
                <button
                  onClick={() => setActiveIndex(activeIndex === index ? null : index)}
                  className="w-full flex items-center justify-between p-5 md:p-7 text-left"
                >
                  <span className={`text-base md:text-lg font-display font-bold transition-colors ${
                    activeIndex === index ? "text-brand-primary" : "text-brand-text-primary"
                  }`}>
                    {faq.question}
                  </span>
                  <div className={`flex-shrink-0 ml-4 p-1.5 rounded-full transition-all duration-300 ${
                    activeIndex === index ? "bg-brand-primary text-white rotate-180" : "bg-brand-accent text-brand-primary"
                  }`}>
                    {activeIndex === index ? <Minus size={18} /> : <Plus size={18} />}
                  </div>
                </button>

                <AnimatePresence>
                  {activeIndex === index && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: "easeInOut" }}
                      className="overflow-hidden"
                    >
                      <div className="px-5 pb-5 md:px-7 md:pb-7 text-brand-text-secondary text-sm md:text-base leading-relaxed border-t border-brand-border/50 pt-4 md:pt-5">
                        {faq.answer}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </div>

          {/* Right Column: Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="bg-white p-6 md:p-10 rounded-[2rem] md:rounded-[3rem] border border-brand-border shadow-soft-xl relative overflow-hidden premium-card"
          >
            {/* Form Background Accent */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-brand-accent blur-3xl -z-10" />
            
            <div className="mb-8">
              <h3 className="text-2xl md:text-3xl font-display font-bold text-brand-text-primary mb-2">Quick Inquiry</h3>
              <p className="text-brand-text-secondary text-sm">Fill out the form below and we'll get back to you within 24 hours.</p>
            </div>

            {formStatus === "success" ? (
              <motion.div 
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center py-10"
              >
                <div className="w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Send size={32} />
                </div>
                <h4 className="text-2xl font-display font-bold text-brand-text-primary mb-2">Message Sent!</h4>
                <p className="text-brand-text-secondary">Thank you for reaching out. Our team will contact you shortly.</p>
                <button 
                  onClick={() => setFormStatus("idle")}
                  className="mt-8 text-brand-primary font-bold hover:underline"
                >
                  Send another message
                </button>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4 md:space-y-6">
                <div className="grid md:grid-cols-2 gap-4 md:gap-6">
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-brand-text-primary uppercase tracking-widest ml-1">Full Name</label>
                    <div className="relative">
                      <User className="absolute left-4 top-1/2 -translate-y-1/2 text-brand-text-secondary" size={18} />
                      <input 
                        required
                        type="text" 
                        placeholder="John Doe"
                        className="w-full bg-brand-section border border-brand-border rounded-2xl py-3.5 md:py-4 pl-12 pr-4 text-sm focus:outline-none focus:border-brand-primary transition-colors"
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-brand-text-primary uppercase tracking-widest ml-1">Email Address</label>
                    <div className="relative">
                      <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-brand-text-secondary" size={18} />
                      <input 
                        required
                        type="email" 
                        placeholder="john@example.com"
                        className="w-full bg-brand-section border border-brand-border rounded-2xl py-3.5 md:py-4 pl-12 pr-4 text-sm focus:outline-none focus:border-brand-primary transition-colors"
                      />
                    </div>
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-4 md:gap-6">
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-brand-text-primary uppercase tracking-widest ml-1">Phone Number</label>
                    <div className="relative">
                      <Phone className="absolute left-4 top-1/2 -translate-y-1/2 text-brand-text-secondary" size={18} />
                      <input 
                        required
                        type="tel" 
                        placeholder="+91 89015 09290"
                        className="w-full bg-brand-section border border-brand-border rounded-2xl py-3.5 md:py-4 pl-12 pr-4 text-sm focus:outline-none focus:border-brand-primary transition-colors"
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-brand-text-primary uppercase tracking-widest ml-1">Service Type</label>
                    <select className="w-full bg-brand-section border border-brand-border rounded-2xl py-3.5 md:py-4 px-4 text-sm focus:outline-none focus:border-brand-primary transition-colors appearance-none">
                      <option>SEO Optimization</option>
                      <option>Social Media Marketing</option>
                      <option>Performance Ads</option>
                      <option>Web Development</option>
                    </select>
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-bold text-brand-text-primary uppercase tracking-widest ml-1">Your Message</label>
                  <div className="relative">
                    <MessageSquare className="absolute left-4 top-4 text-brand-text-secondary" size={18} />
                    <textarea 
                      required
                      rows={4}
                      placeholder="Tell us about your project..."
                      className="w-full bg-brand-section border border-brand-border rounded-2xl py-3.5 md:py-4 pl-12 pr-4 text-sm focus:outline-none focus:border-brand-primary transition-colors resize-none"
                    ></textarea>
                  </div>
                </div>

                <button 
                  disabled={formStatus === "submitting"}
                  className="w-full bg-brand-primary text-white py-4 md:py-5 rounded-2xl font-bold hover:bg-brand-primary-hover transition-all shadow-soft-lg flex items-center justify-center gap-2 group disabled:opacity-70"
                >
                  {formStatus === "submitting" ? (
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  ) : (
                    <>
                      Send Message
                      <Send size={18} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                    </>
                  )}
                </button>
              </form>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
