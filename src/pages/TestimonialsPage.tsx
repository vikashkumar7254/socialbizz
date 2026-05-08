import { motion } from "motion/react";
import { Phone, Send, CheckCircle2, Play, ArrowRight, Star, Quote, ChevronLeft, ChevronRight, Facebook, Instagram, Twitter, Linkedin, Youtube } from "lucide-react";
import React, { useState } from "react";
import { testimonials as textTestimonials } from "../data/testimonials";

const socialLinks = [
  { icon: <Facebook size={18} />, href: "#", color: "bg-[#1877F2]" },
  { icon: <Instagram size={18} />, href: "#", color: "bg-[#E4405F]" },
  { icon: <Twitter size={18} />, href: "#", color: "bg-[#1DA1F2]" },
  { icon: <Linkedin size={18} />, href: "#", color: "bg-[#0A66C2]" },
  { icon: <Youtube size={18} />, href: "#", color: "bg-[#FF0000]" },
];

const videoTestimonials = [
  {
    id: 1,
    thumbnail: "https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&q=80&w=400&h=600",
    name: "Dr. Vikram",
    role: "Healthcare Specialist",
  },
  {
    id: 2,
    thumbnail: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=400&h=600",
    name: "Mrs. Kapoor",
    role: "Business Owner",
  },
  {
    id: 3,
    thumbnail: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&q=80&w=400&h=600",
    name: "Dr. Ananya",
    role: "Medical Professional",
  },
  {
    id: 4,
    thumbnail: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=400&h=600",
    name: "Mr. Singhania",
    role: "Startup Founder",
  },
  {
    id: 5,
    thumbnail: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=400&h=600",
    name: "Dr. Sameer",
    role: "Orthopedic Surgeon",
  },
  {
    id: 6,
    thumbnail: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=400&h=600",
    name: "Ms. Ritu",
    role: "Fashion Designer",
  },
  {
    id: 7,
    thumbnail: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=400&h=600",
    name: "Mr. Khanna",
    role: "Real Estate Mogul",
  },
  {
    id: 8,
    thumbnail: "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?auto=format&fit=crop&q=80&w=400&h=600",
    name: "Dr. Neha",
    role: "Pediatrician",
  },
];

export default function TestimonialsPage() {
  const [formStatus, setFormStatus] = useState<"idle" | "submitting" | "success">("idle");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormStatus("submitting");
    
    const formData = new FormData(e.currentTarget as HTMLFormElement);
    const data = {
      name: formData.get("name"),
      email: formData.get("email"),
      phone: formData.get("phone"),
      service: formData.get("service"),
      source: "Testimonials Page Form"
    };

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        setFormStatus("success");
      } else {
        console.error("Failed to submit inquiry");
        setFormStatus("idle");
        alert("Something went wrong. Please try again.");
      }
    } catch (error) {
      console.error("Error submitting inquiry:", error);
      setFormStatus("idle");
      alert("Network error. Please check your connection.");
    }
  };

  return (
    <div className="bg-white relative">
      {/* Floating Social Sidebar */}
      <div className="fixed right-0 top-1/2 -translate-y-1/2 z-50 hidden md:flex flex-col gap-2 pr-4">
        {socialLinks.map((link, i) => (
          <motion.a
            key={i}
            href={link.href}
            initial={{ x: 50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.5 + i * 0.1 }}
            whileHover={{ x: -5 }}
            className={`${link.color} text-white p-3 rounded-full shadow-lg transition-all`}
          >
            {link.icon}
          </motion.a>
        ))}
      </div>

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 md:pt-48 md:pb-32 bg-[#0F172A] overflow-hidden">
        {/* Background Accents */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-brand-accent/20 rounded-full blur-[120px]" />
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-brand-accent/10 rounded-full blur-[100px]" />
          
          {/* Dot Pattern */}
          <div className="absolute top-20 right-20 grid grid-cols-4 gap-4 opacity-20">
            {[...Array(16)].map((_, i) => (
              <div key={i} className="w-1.5 h-1.5 bg-white rounded-full" />
            ))}
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 md:px-6 relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left Content */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h1 className="text-4xl md:text-7xl font-display font-bold text-white mb-6 leading-tight">
                Testimonials
              </h1>
              <p className="text-lg md:text-xl text-white/70 mb-10 max-w-xl leading-relaxed">
                Hear what our clients have to say about their journey with us—real experiences, real success, and lasting partnerships built on trust and results..
              </p>
              
              <a 
                href="tel:+918901509290"
                className="inline-flex items-center gap-4 bg-white px-8 py-4 rounded-full text-[#0F172A] font-bold text-lg hover:bg-white/90 transition-all shadow-xl group"
              >
                <div className="w-10 h-10 rounded-full bg-[#0F172A]/5 flex items-center justify-center">
                  <Phone size={20} className="text-[#0F172A]" />
                </div>
                +91 89015 09290
              </a>
            </motion.div>

            {/* Right Form */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="bg-white rounded-[2.5rem] p-8 md:p-12 shadow-2xl relative"
            >
              <h2 className="text-2xl md:text-3xl font-display font-bold text-[#0F172A] mb-8">
                Request A Quote
              </h2>
              
              {formStatus === "success" ? (
                <div className="py-12 text-center">
                  <div className="w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-6">
                    <CheckCircle2 size={40} />
                  </div>
                  <h3 className="text-2xl font-display font-bold text-[#0F172A] mb-2">Message Sent!</h3>
                  <p className="text-slate-500">We'll get back to you within 24 hours.</p>
                  <button 
                    onClick={() => setFormStatus("idle")}
                    className="mt-8 text-brand-primary font-bold hover:underline"
                  >
                    Send another message
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  <input 
                    required
                    name="name"
                    type="text" 
                    placeholder="Enter Your Name" 
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-6 py-4 text-slate-900 focus:outline-none focus:border-brand-primary focus:ring-4 focus:ring-brand-accent transition-all"
                  />
                  <input 
                    required
                    name="email"
                    type="email" 
                    placeholder="Enter Your Email Id" 
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-6 py-4 text-slate-900 focus:outline-none focus:border-brand-primary focus:ring-4 focus:ring-brand-accent transition-all"
                  />
                  <input 
                    required
                    name="phone"
                    type="tel" 
                    placeholder="Enter Your Mobile No." 
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-6 py-4 text-slate-900 focus:outline-none focus:border-brand-primary focus:ring-4 focus:ring-brand-accent transition-all"
                  />
                  <select 
                    required
                    name="service"
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-6 py-4 text-slate-500 focus:outline-none focus:border-brand-primary focus:ring-4 focus:ring-brand-accent transition-all appearance-none"
                  >
                    <option value="">Select Services *</option>
                    <option value="seo">SEO Optimization</option>
                    <option value="ads">Google & Meta Ads</option>
                    <option value="social">Social Media Marketing</option>
                    <option value="web">Web Development</option>
                  </select>

                  <button 
                    disabled={formStatus === "submitting"}
                    className="w-full bg-brand-primary text-white py-5 rounded-xl font-bold text-lg hover:bg-brand-primary-hover transition-all shadow-xl flex items-center justify-center gap-3 disabled:opacity-70 group"
                  >
                    <Send size={20} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                    {formStatus === "submitting" ? "Sending..." : "Send Message !"}
                  </button>
                </form>
              )}
            </motion.div>
          </div>
        </div>
      </section>

      {/* Contact Banner */}
      <section className="bg-[#0F172A] py-8 border-t border-white/5">
        <div className="max-w-7xl mx-auto px-4 md:px-6 flex flex-col md:flex-row items-center justify-center gap-6 md:gap-12">
          <h3 className="text-white font-display font-bold text-xl md:text-2xl text-center md:text-left">
            NEED HELP? CONTACT WITH OUR MARKETING EXPERT!
          </h3>
          <a 
            href="tel:+918901509290"
            className="flex items-center gap-3 bg-white px-6 py-3 rounded-full text-[#0F172A] font-bold hover:bg-white/90 transition-all shadow-lg"
          >
            <Phone size={18} />
            +91 89015 09290
          </a>
        </div>
      </section>

      {/* Video Testimonials Grid */}
      <section className="py-20 md:py-32 bg-white">
        <div className="max-w-7xl mx-auto px-4 md:px-6">
          <div className="text-center mb-16 md:mb-24">
            <div className="inline-flex items-center gap-2 text-brand-primary font-bold uppercase tracking-[0.3em] text-[10px] md:text-xs mb-4">
              <ArrowRight size={14} /> OUR CLIENT
            </div>
            <h2 className="text-3xl md:text-6xl font-display font-bold text-[#0F172A]">
              Hear What Our <span className="text-brand-primary">Clients Say</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
            {videoTestimonials.map((item, i) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="group relative aspect-[3/4] rounded-[2rem] overflow-hidden shadow-soft-lg border border-brand-border cursor-pointer"
              >
                <img 
                  src={item.thumbnail} 
                  alt={item.name}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  referrerPolicy="no-referrer"
                />
                
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-500" />
                
                <div className="absolute inset-0 flex items-center justify-center">
                  <motion.div 
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    className="w-16 h-16 md:w-20 md:h-20 bg-brand-primary rounded-full flex items-center justify-center text-white shadow-2xl relative z-10"
                  >
                    <Play size={32} fill="currentColor" className="ml-1" />
                    <div className="absolute inset-0 bg-brand-primary rounded-full animate-ping opacity-20" />
                  </motion.div>
                </div>

                <div className="absolute bottom-8 left-8 right-8 text-white">
                  <div className="font-display font-bold text-xl md:text-2xl mb-1">{item.name}</div>
                  <div className="text-xs md:text-sm text-white/70 font-medium uppercase tracking-widest">{item.role}</div>
                </div>

                <div className="absolute top-6 left-6 w-10 h-10 bg-white/10 backdrop-blur-md rounded-xl flex items-center justify-center border border-white/20">
                  <div className="text-white font-display font-black text-[10px]">SB</div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Text Reviews Section */}
      <section className="py-20 md:py-32 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 md:px-6">
          <div className="flex flex-col md:flex-row justify-between items-end mb-12 md:mb-16 gap-6">
            <div>
              <div className="flex items-center gap-2 text-brand-primary font-bold uppercase tracking-widest text-xs md:text-sm mb-4">
                <ArrowRight size={16} /> CLIENTS TESTIMONIAL
              </div>
              <h2 className="text-3xl md:text-5xl font-display font-bold text-[#0F172A]">
                Our Client Review
              </h2>
            </div>
            <div className="flex gap-4">
              <button className="w-12 h-12 rounded-full border border-slate-200 flex items-center justify-center text-slate-400 hover:bg-white hover:text-brand-primary hover:border-brand-primary transition-all shadow-sm">
                <ChevronLeft size={24} />
              </button>
              <button className="w-12 h-12 rounded-full border border-slate-200 flex items-center justify-center text-slate-400 hover:bg-white hover:text-brand-primary hover:border-brand-primary transition-all shadow-sm">
                <ChevronRight size={24} />
              </button>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {textTestimonials.slice(0, 2).map((testimonial) => (
              <motion.div
                key={testimonial.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="bg-white p-8 md:p-12 rounded-[2.5rem] shadow-soft border border-slate-100 relative group"
              >
                <div className="absolute top-8 right-8 text-slate-100 group-hover:text-brand-primary/10 transition-colors">
                  <Quote size={80} fill="currentColor" />
                </div>
                
                <div className="flex items-center gap-1 mb-6">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} size={18} className="fill-brand-primary text-brand-primary" />
                  ))}
                </div>

                <p className="text-lg text-slate-600 leading-relaxed mb-10 relative z-10">
                  "{testimonial.content}"
                </p>

                <div className="flex items-center gap-4">
                  <img 
                    src={testimonial.avatar} 
                    alt={testimonial.name}
                    className="w-16 h-16 rounded-2xl object-cover border-2 border-slate-50"
                  />
                  <div>
                    <h4 className="font-display font-bold text-xl text-[#0F172A]">{testimonial.name}</h4>
                    <p className="text-slate-400 text-sm font-medium uppercase tracking-widest">{testimonial.role}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
