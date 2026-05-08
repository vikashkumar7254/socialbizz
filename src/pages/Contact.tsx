import { motion } from "motion/react";
import { Send, Phone, Mail, MapPin, MessageCircle, CheckCircle2 } from "lucide-react";
import React, { useState } from "react";

export default function Contact() {
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
      message: formData.get("message"),
      source: "Main Contact Form"
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
        console.error("Failed to submit contact form");
        setFormStatus("idle");
        alert("Something went wrong. Please try again.");
      }
    } catch (error) {
      console.error("Error submitting contact form:", error);
      setFormStatus("idle");
      alert("Network error. Please check your connection.");
    }
  };

  return (
    <div className="pb-12 md:pb-16">
      <section className="pt-28 pb-8 md:pt-36 md:pb-12 px-6 text-center">
        <div className="max-w-4xl mx-auto">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-7xl font-display font-bold mb-6 text-brand-text-primary"
          >
            Get in <span className="text-brand-primary">Touch</span>
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-lg md:text-xl text-brand-text-secondary leading-relaxed"
          >
            Ready to scale your business? Let's discuss your goals and how we can help you achieve them.
          </motion.p>
        </div>
      </section>

      <section className="py-8 md:py-12 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-10 md:gap-16">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <div className="space-y-8 md:space-y-12">
                <div className="flex gap-4 md:gap-6 items-center">
                  <div className="p-3 md:p-4 bg-brand-accent rounded-2xl text-brand-primary">
                    <Phone size={24} />
                  </div>
                  <div>
                    <div className="text-brand-text-secondary text-[10px] md:text-sm font-bold uppercase tracking-widest mb-0.5 md:mb-1">Call Us</div>
                    <div className="text-lg md:text-xl font-bold text-brand-text-primary">+91 89015 09290</div>
                  </div>
                </div>
                <div className="flex gap-4 md:gap-6 items-center">
                  <div className="p-3 md:p-4 bg-brand-accent rounded-2xl text-brand-primary">
                    <Mail size={24} />
                  </div>
                  <div>
                    <div className="text-brand-text-secondary text-[10px] md:text-sm font-bold uppercase tracking-widest mb-0.5 md:mb-1">Email Us</div>
                    <div className="text-lg md:text-xl font-bold text-brand-text-primary">socialbizz.in@gmail.com</div>
                  </div>
                </div>
                <div className="flex gap-4 md:gap-6 items-center">
                  <div className="p-3 md:p-4 bg-brand-accent rounded-2xl text-brand-primary">
                    <MapPin size={24} />
                  </div>
                  <div>
                    <div className="text-brand-text-secondary text-[10px] md:text-sm font-bold uppercase tracking-widest mb-0.5 md:mb-1">Visit Us</div>
                    <div className="text-lg md:text-xl font-bold text-brand-text-primary">Digital Hub, Mumbai, India</div>
                  </div>
                </div>
                
                <div className="pt-8 md:pt-12 border-t border-brand-border">
                  <h4 className="text-lg md:text-xl font-display font-bold mb-4 md:mb-6 text-brand-text-primary">Quick Connect</h4>
                  <a 
                    href="https://wa.me/918901509290" 
                    target="_blank" 
                    rel="noreferrer"
                    className="inline-flex items-center gap-2 md:gap-3 bg-green-500/10 text-green-600 px-5 md:px-6 py-2.5 md:py-3 rounded-xl md:rounded-2xl font-bold hover:bg-green-500/20 transition-all border border-green-500/20 text-sm md:text-base"
                  >
                    <MessageCircle size={20} /> Chat on WhatsApp
                  </a>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="bg-white p-8 md:p-12 rounded-[2.5rem] md:rounded-[3rem] border border-brand-border shadow-soft-lg relative"
            >
              {formStatus === "success" ? (
                <motion.div 
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="h-full flex flex-col items-center justify-center text-center py-12"
                >
                  <div className="w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center mb-6">
                    <CheckCircle2 size={40} />
                  </div>
                  <h3 className="text-2xl md:text-3xl font-display font-bold text-brand-text-primary mb-3">Message Sent!</h3>
                  <p className="text-brand-text-secondary max-w-xs mx-auto mb-8">
                    Thank you for reaching out. Our team will get back to you within 24 hours.
                  </p>
                  <button 
                    onClick={() => setFormStatus("idle")}
                    className="text-brand-primary font-bold hover:underline"
                  >
                    Send another message
                  </button>
                </motion.div>
              ) : (
                <form className="space-y-5 md:space-y-6" onSubmit={handleSubmit}>
                  <div className="grid md:grid-cols-2 gap-5 md:gap-6">
                    <div className="space-y-1.5 md:space-y-2">
                      <label className="text-[10px] md:text-xs font-bold text-brand-text-secondary uppercase tracking-widest ml-2">Full Name</label>
                      <input 
                        required
                        name="name"
                        type="text" 
                        placeholder="John Doe"
                        className="w-full bg-brand-section/30 border border-brand-border rounded-xl md:rounded-2xl px-4 md:px-6 py-3 md:py-4 focus:outline-none focus:border-brand-primary focus:ring-4 focus:ring-brand-accent transition-all text-sm md:text-base text-brand-text-primary"
                      />
                    </div>
                    <div className="space-y-1.5 md:space-y-2">
                      <label className="text-[10px] md:text-xs font-bold text-brand-text-secondary uppercase tracking-widest ml-2">Email Address</label>
                      <input 
                        required
                        name="email"
                        type="email" 
                        placeholder="john@example.com"
                        className="w-full bg-brand-section/30 border border-brand-border rounded-xl md:rounded-2xl px-4 md:px-6 py-3 md:py-4 focus:outline-none focus:border-brand-primary focus:ring-4 focus:ring-brand-accent transition-all text-sm md:text-base text-brand-text-primary"
                      />
                    </div>
                  </div>
                  
                  <div className="grid md:grid-cols-2 gap-5 md:gap-6">
                    <div className="space-y-1.5 md:space-y-2">
                      <label className="text-[10px] md:text-xs font-bold text-brand-text-secondary uppercase tracking-widest ml-2">Phone Number</label>
                      <input 
                        required
                        name="phone"
                        type="tel" 
                        placeholder="+91 00000 00000"
                        className="w-full bg-brand-section/30 border border-brand-border rounded-xl md:rounded-2xl px-4 md:px-6 py-3 md:py-4 focus:outline-none focus:border-brand-primary focus:ring-4 focus:ring-brand-accent transition-all text-sm md:text-base text-brand-text-primary"
                      />
                    </div>
                    <div className="space-y-1.5 md:space-y-2">
                      <label className="text-[10px] md:text-xs font-bold text-brand-text-secondary uppercase tracking-widest ml-2">Service Interested In</label>
                      <select 
                        required
                        name="service"
                        className="w-full bg-brand-section/30 border border-brand-border rounded-xl md:rounded-2xl px-4 md:px-6 py-3 md:py-4 focus:outline-none focus:border-brand-primary focus:ring-4 focus:ring-brand-accent transition-all text-sm md:text-base text-brand-text-primary appearance-none"
                      >
                        <option value="">Select a Service</option>
                        <option value="seo">SEO Optimization</option>
                        <option value="ads">Google & Meta Ads</option>
                        <option value="social">Social Media Marketing</option>
                        <option value="web">Web Development</option>
                        <option value="branding">Branding & Design</option>
                      </select>
                    </div>
                  </div>

                  <div className="space-y-1.5 md:space-y-2">
                    <label className="text-[10px] md:text-xs font-bold text-brand-text-secondary uppercase tracking-widest ml-2">Your Message</label>
                    <textarea 
                      required
                      name="message"
                      placeholder="Tell us about your project goals..."
                      rows={4}
                      className="w-full bg-brand-section/30 border border-brand-border rounded-xl md:rounded-2xl px-4 md:px-6 py-3 md:py-4 focus:outline-none focus:border-brand-primary focus:ring-4 focus:ring-brand-accent transition-all resize-none text-sm md:text-base text-brand-text-primary"
                    />
                  </div>

                  {/* reCAPTCHA Placeholder */}
                  <div className="bg-brand-section/30 border border-brand-border rounded-xl p-4 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-6 h-6 border-2 border-brand-border rounded bg-white" />
                      <span className="text-xs md:text-sm text-brand-text-secondary">I'm not a robot</span>
                    </div>
                    <img src="https://www.gstatic.com/recaptcha/api2/logo_48.png" alt="reCAPTCHA" className="h-8 opacity-40 grayscale" />
                  </div>

                  <button 
                    disabled={formStatus === "submitting"}
                    className="w-full bg-brand-primary text-white py-4 md:py-5 rounded-xl md:rounded-2xl font-bold text-base md:text-lg flex items-center justify-center gap-3 hover:bg-brand-primary-hover transition-all shadow-soft group disabled:opacity-70"
                  >
                    {formStatus === "submitting" ? "Sending..." : "Send Message"}
                    <Send size={20} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                  </button>
                </form>
              )}
            </motion.div>
          </div>
        </div>
      </section>

      {/* Map Section */}
      <section className="py-8 md:py-12 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="bg-white h-[300px] md:h-[400px] rounded-[2rem] md:rounded-[3rem] overflow-hidden border border-brand-border relative shadow-soft">
            <iframe 
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d241317.11609823277!2d72.74109995709657!3d19.08219783958221!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be7c6306644edc1%3A0x5da4ed8f8d64a77!2sMumbai%2C%20Maharashtra!5e0!3m2!1sen!2sin!4v1712745000000!5m2!1sen!2sin" 
              width="100%" 
              height="100%" 
              style={{ border: 0, filter: 'grayscale(1) contrast(1.2) opacity(0.8)' }} 
              allowFullScreen={true} 
              loading="lazy" 
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </div>
      </section>
    </div>
  );
}
