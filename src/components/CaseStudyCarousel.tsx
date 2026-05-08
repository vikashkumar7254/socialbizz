import React, { useState } from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "motion/react";
import { ArrowRight, X, Send, CheckCircle2 } from "lucide-react";
import { caseStudies, CaseStudy } from "../data/caseStudies";

export default function CaseStudyCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedStudy, setSelectedStudy] = useState<CaseStudy | null>(null);
  const [formStatus, setFormStatus] = useState<"idle" | "submitting" | "success">("idle");

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % caseStudies.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + caseStudies.length) % caseStudies.length);
  };

  const handleDragEnd = (event: any, info: any) => {
    const threshold = 50;
    if (info.offset.x < -threshold) {
      nextSlide();
    } else if (info.offset.x > threshold) {
      prevSlide();
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormStatus("submitting");

    const formData = new FormData(e.currentTarget as HTMLFormElement);
    const data = {
      name: formData.get("name"),
      email: formData.get("email"),
      phone: formData.get("phone"),
      message: formData.get("message"),
      service: selectedStudy ? `Case study inquiry: ${selectedStudy.title}` : "Case study inquiry",
      source: "Case Study Carousel Form",
    };

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        const result = await response.json().catch(() => ({}));
        setFormStatus("idle");
        alert(result.error || "Something went wrong. Please try again.");
        return;
      }

      setFormStatus("success");
      setTimeout(() => {
        setFormStatus("idle");
        setSelectedStudy(null);
      }, 2000);
    } catch (error) {
      console.error("Error submitting case study inquiry:", error);
      setFormStatus("idle");
      alert("Network error. Please check your connection.");
    }
  };

  const modal = (
    <AnimatePresence>
      {selectedStudy && (
        <div className="fixed inset-0 z-[100] min-h-dvh overflow-y-auto px-3 py-4 md:p-6">
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedStudy(null)}
            className="fixed inset-0 bg-brand-bg/80 backdrop-blur-sm"
          />
          
          <div className="relative z-10 flex min-h-[calc(100dvh-2rem)] items-start justify-center md:min-h-[calc(100dvh-3rem)] md:items-center">
            <motion.div 
              initial={{ opacity: 0, scale: 0.96, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.96, y: 20 }}
              className="relative w-full max-w-4xl overflow-hidden bg-white border border-brand-border rounded-2xl md:max-h-[90dvh] md:overflow-y-auto md:rounded-[3rem] shadow-2xl grid lg:grid-cols-2"
            >
              {/* Left Side: Info */}
              <div className="p-5 md:p-12 bg-brand-section border-b lg:border-b-0 lg:border-r border-brand-border">
                <div className="mb-4 md:mb-6 pr-10 md:pr-0">
                  <span className="text-brand-primary font-bold uppercase tracking-widest text-[10px] md:text-xs">{selectedStudy.category}</span>
                  <h3 className="text-2xl md:text-3xl font-display font-bold mt-1 md:mt-2 text-brand-text-primary">{selectedStudy.title}</h3>
                </div>
                
                <div className="space-y-4 md:space-y-6">
                  <div>
                    <h4 className="text-brand-primary font-bold text-xs md:text-sm mb-1 md:mb-2 uppercase tracking-widest">The Challenge</h4>
                    <p className="text-xs md:text-sm text-brand-text-secondary leading-relaxed">{selectedStudy.problem}</p>
                  </div>
                  <div>
                    <h4 className="text-brand-primary font-bold text-xs md:text-sm mb-1 md:mb-2 uppercase tracking-widest">Key Results</h4>
                    <div className="grid grid-cols-2 gap-3 md:gap-4 mt-3 md:mt-4">
                      {selectedStudy.results.map((res, i) => (
                        <div key={i} className="bg-white p-3 md:p-4 rounded-xl md:rounded-2xl border border-brand-border shadow-soft">
                          <div className="text-lg md:text-xl font-black text-brand-primary">{res.value}</div>
                          <div className="text-[8px] md:text-[10px] text-brand-text-secondary uppercase font-bold">{res.label}</div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Side: Form */}
              <div className="p-5 pb-6 md:p-12 relative">
                <button 
                  onClick={() => setSelectedStudy(null)}
                  className="absolute top-3 right-3 md:top-6 md:right-6 p-2 text-brand-text-secondary hover:text-brand-primary transition-colors"
                  aria-label="Close case study form"
                >
                  <X className="size-5 md:size-6" />
                </button>

                <div className="mb-5 md:mb-8 pr-10 md:pr-0">
                  <h4 className="text-lg md:text-xl font-bold text-brand-text-primary">Get Similar Results</h4>
                  <p className="text-xs md:text-sm text-brand-text-secondary mt-1">Fill out the form to start your success story.</p>
                </div>

                {formStatus === "success" ? (
                  <motion.div 
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="text-center py-8 md:py-12"
                  >
                    <div className="w-12 h-12 md:w-16 md:h-16 bg-green-500/10 text-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
                      <CheckCircle2 className="size-6 md:size-8" />
                    </div>
                    <h5 className="text-lg md:text-xl font-bold text-brand-text-primary">Request Sent!</h5>
                    <p className="text-xs md:text-sm text-brand-text-secondary">We'll contact you shortly.</p>
                  </motion.div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-3 md:space-y-4">
                    <div className="space-y-1">
                      <label className="text-[10px] md:text-xs font-bold text-brand-text-primary ml-1">Full Name</label>
                      <input 
                        required
                        name="name"
                        type="text" 
                        placeholder="John Doe"
                        className="w-full bg-white border border-brand-border rounded-lg md:rounded-xl px-4 md:px-5 py-2.5 md:py-3 text-xs md:text-sm focus:outline-none focus:border-brand-primary transition-all text-brand-text-primary"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-[10px] md:text-xs font-bold text-brand-text-primary ml-1">Email Address</label>
                      <input 
                        required
                        name="email"
                        type="email" 
                        placeholder="john@example.com"
                        className="w-full bg-white border border-brand-border rounded-lg md:rounded-xl px-4 md:px-5 py-2.5 md:py-3 text-xs md:text-sm focus:outline-none focus:border-brand-primary transition-all text-brand-text-primary"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-[10px] md:text-xs font-bold text-brand-text-primary ml-1">Phone Number</label>
                      <input 
                        required
                        name="phone"
                        type="tel" 
                        placeholder="+91 89015 09290"
                        className="w-full bg-white border border-brand-border rounded-lg md:rounded-xl px-4 md:px-5 py-2.5 md:py-3 text-xs md:text-sm focus:outline-none focus:border-brand-primary transition-all text-brand-text-primary"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-[10px] md:text-xs font-bold text-brand-text-primary ml-1">Message (Optional)</label>
                      <textarea 
                        name="message"
                        rows={2}
                        placeholder="Tell us about your project..."
                        className="w-full bg-white border border-brand-border rounded-lg md:rounded-xl px-4 md:px-5 py-2.5 md:py-3 text-xs md:text-sm focus:outline-none focus:border-brand-primary transition-all resize-none text-brand-text-primary"
                      />
                    </div>
                    <button 
                      disabled={formStatus === "submitting"}
                      className="w-full min-h-12 bg-brand-primary text-white py-3 md:py-4 rounded-lg md:rounded-xl font-bold text-xs md:text-sm hover:bg-brand-primary-hover transition-all shadow-lg flex items-center justify-center gap-2 disabled:opacity-70 mt-2 md:mt-4"
                    >
                      {formStatus === "submitting" ? (
                        <div className="w-4 h-4 md:w-5 md:h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      ) : (
                        <>
                          Send Request <Send className="size-3.5 md:size-4" />
                        </>
                      )}
                    </button>
                  </form>
                )}
              </div>
            </motion.div>
          </div>
        </div>
      )}
    </AnimatePresence>
  );

  return (
    <section className="premium-section py-8 md:py-12 px-4 md:px-6 bg-white text-brand-text-primary overflow-hidden relative">
      {/* Background Glows */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-brand-accent blur-[120px] rounded-full -z-10" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-brand-accent blur-[120px] rounded-full -z-10" />

      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-6 md:mb-10">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-brand-primary font-display font-bold uppercase tracking-[0.3em] text-[10px] md:text-sm mb-2 md:mb-3"
          >
            Success Stories
          </motion.h2>
          <motion.h3 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-3xl md:text-5xl font-display font-bold mb-4 text-brand-text-primary"
          >
            Real Results for <span className="text-brand-primary">Real Clients</span>
          </motion.h3>
        </div>

        <div className="relative h-[410px] md:h-[540px] flex items-center justify-center">
          <div className="relative w-full max-w-5xl h-full flex items-center justify-center">
            <AnimatePresence mode="popLayout">
              {caseStudies.map((study, index) => {
                const position = (index - currentIndex + caseStudies.length) % caseStudies.length;
                const isCenter = position === 0;
                const isLeft = position === caseStudies.length - 1;
                const isRight = position === 1;

                if (!isCenter && !isLeft && !isRight) return null;

                return (
                  <motion.div
                    key={study.slug}
                    drag="x"
                    dragConstraints={{ left: 0, right: 0 }}
                    onDragEnd={handleDragEnd}
                    initial={{ opacity: 0, scale: 0.8, x: isLeft ? -200 : isRight ? 200 : 0 }}
                    animate={{
                      opacity: isCenter ? 1 : 0.4,
                      scale: isCenter ? 1 : 0.8,
                      x: isCenter ? 0 : isLeft ? -280 : 280,
                      zIndex: isCenter ? 20 : 10,
                      filter: isCenter ? "blur(0px)" : "blur(4px)",
                    }}
                    exit={{ opacity: 0, scale: 0.8 }}
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                    className="absolute w-[280px] md:w-[420px] h-[360px] md:h-[500px]"
                  >
                    <div className="relative w-full h-full rounded-[2rem] md:rounded-[2.5rem] overflow-hidden border border-white/10 shadow-2xl group premium-card">
                      {/* Image Background */}
                      <img 
                        src={study.image} 
                        alt={study.title} 
                        className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                        referrerPolicy="no-referrer"
                        loading="lazy"
                        decoding="async"
                      />
                      
                      {/* Dark Overlay */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent" />

                      {/* Content */}
                      <div className="absolute inset-0 p-6 md:p-12 flex flex-col justify-end">
                        <div className="mb-3 md:mb-4">
                          <span className="px-2.5 py-1 bg-brand-accent/50 border border-brand-border rounded-full text-[8px] md:text-[10px] font-bold uppercase tracking-widest text-brand-primary backdrop-blur-md">
                            {study.category}
                          </span>
                        </div>
                        <h4 className="text-xl md:text-3xl font-display font-bold mb-2 md:mb-3 group-hover:text-brand-primary transition-colors">
                          {study.title}
                        </h4>
                        <p className="text-xs md:text-sm text-gray-300 mb-6 md:mb-8 line-clamp-2 opacity-80 group-hover:opacity-100 transition-opacity">
                          {study.description}
                        </p>
                        
                        <button 
                          onClick={() => setSelectedStudy(study)}
                          className="inline-flex items-center justify-center gap-2 bg-brand-primary px-5 md:px-6 py-2.5 md:py-3 rounded-xl font-bold text-xs md:text-sm text-white hover:bg-brand-primary-hover transition-all shadow-[0_0_20px_rgba(245,49,99,0.3)] group-hover:shadow-[0_0_30px_rgba(245,49,99,0.5)]"
                        >
                          Explore Case Study <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                        </button>
                      </div>

                      {/* Glassmorphism Glow on Hover */}
                      <div className="absolute inset-0 border-2 border-brand-primary/0 group-hover:border-brand-primary/30 rounded-[2rem] md:rounded-[2.5rem] transition-all duration-500 pointer-events-none" />
                    </div>
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </div>

        </div>

        {/* Indicators */}
        <div className="flex justify-center gap-2 md:gap-3 mt-5 md:mt-8">
          {caseStudies.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrentIndex(i)}
              className={`h-1 rounded-full transition-all duration-500 ${currentIndex === i ? "w-8 md:w-12 bg-brand-primary" : "w-2 md:w-3 bg-brand-border"}`}
            />
          ))}
        </div>
      </div>

      {createPortal(modal, document.body)}
    </section>
  );
}
