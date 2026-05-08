import { motion } from "motion/react";
import React, { useState } from "react";
import { ArrowRight, ArrowUpRight, BarChart3, CheckCircle2, Send, Target, TrendingUp } from "lucide-react";

export default function About() {
  const [formStatus, setFormStatus] = useState<"idle" | "submitting" | "success">("idle");

  const particles = [
    { className: "left-[10%] top-[24%] h-2 w-2", delay: 0, duration: 5.5 },
    { className: "right-[14%] top-[30%] h-2.5 w-2.5", delay: 0.8, duration: 6.2 },
    { className: "left-[22%] bottom-[18%] h-1.5 w-1.5", delay: 1.4, duration: 5.8 },
    { className: "right-[24%] bottom-[22%] h-2 w-2", delay: 2, duration: 6.5 },
    { className: "left-1/2 top-[18%] h-1.5 w-1.5", delay: 1.1, duration: 5.2 },
  ];

  const sections = [
    {
      icon: <Target size={24} />,
      label: "Our Mission",
      title: "Turn digital presence into measurable business growth.",
      desc: "We help brands attract the right audience, generate qualified leads, and convert attention into revenue. Every strategy is built around performance, clarity, and ROI.",
    },
    {
      icon: <TrendingUp size={24} />,
      label: "Our Vision",
      title: "Build brands that lead their market online.",
      desc: "Socialbizz exists to make digital growth simpler, smarter, and more profitable. We want every client to scale with confidence, backed by data, creative thinking, and consistent execution.",
    },
    {
      icon: <BarChart3 size={24} />,
      label: "What We Do",
      title: "We create growth systems across SEO, ads, social media, and websites.",
      desc: "From visibility to conversions, we connect every digital touchpoint. We plan campaigns, create high-performing content, optimize funnels, and track what truly moves the business forward.",
    },
  ];

  const proofPoints = [
    "Growth strategy before execution",
    "Clear reporting and practical next steps",
    "Marketing, creative, and web support in one team",
  ];

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setFormStatus("submitting");

    const formData = new FormData(event.currentTarget);
    const data = {
      name: formData.get("name"),
      email: formData.get("email"),
      phone: formData.get("phone"),
      service: formData.get("service"),
      message: formData.get("message"),
      source: "About Page Inquiry Form",
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
        setFormStatus("idle");
        alert("Something went wrong. Please try again.");
      }
    } catch (error) {
      console.error("Error submitting about page inquiry:", error);
      setFormStatus("idle");
      alert("Network error. Please check your connection.");
    }
  };

  return (
    <div className="bg-white pb-16">
      <section className="relative overflow-hidden px-4 pb-14 pt-28 md:px-6 md:pb-24 md:pt-36">
        <div className="absolute inset-0 -z-10 bg-[linear-gradient(180deg,#ffffff_0%,#f8fafc_58%,#ffffff_100%)]" />
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_50%_34%,rgba(211,16,39,0.09),transparent_34%)]" />
        <div className="absolute inset-0 -z-10 opacity-[0.18] [background-image:linear-gradient(to_right,rgba(15,23,42,0.08)_1px,transparent_1px),linear-gradient(to_bottom,rgba(15,23,42,0.08)_1px,transparent_1px)] [background-size:72px_72px]" />
        <motion.div
          animate={{ scale: [1, 1.08, 1], opacity: [0.7, 1, 0.7], x: [0, 18, 0] }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
          className="absolute left-1/2 top-16 -z-10 h-72 w-[46rem] -translate-x-1/2 rounded-full bg-brand-accent blur-[90px]"
        />
        <motion.div
          animate={{ rotate: [0, 360] }}
          transition={{ duration: 28, repeat: Infinity, ease: "linear" }}
          className="absolute left-1/2 top-[48%] -z-10 h-[34rem] w-[34rem] -translate-x-1/2 -translate-y-1/2 rounded-full border border-brand-primary/10"
        />
        <motion.div
          animate={{ rotate: [360, 0] }}
          transition={{ duration: 22, repeat: Infinity, ease: "linear" }}
          className="absolute left-1/2 top-[48%] -z-10 h-[24rem] w-[24rem] -translate-x-1/2 -translate-y-1/2 rounded-full border border-brand-primary/10 border-dashed"
        />
        {particles.map((particle, index) => (
          <motion.span
            key={index}
            animate={{ y: [0, -18, 0], opacity: [0.2, 0.7, 0.2], scale: [1, 1.35, 1] }}
            transition={{
              duration: particle.duration,
              delay: particle.delay,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className={`absolute -z-10 rounded-full bg-brand-primary/25 blur-[1px] ${particle.className}`}
          />
        ))}

        <div className="mx-auto max-w-6xl text-center">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-4 inline-flex items-center gap-2 rounded-full border border-brand-border bg-white px-4 py-2 text-[11px] font-bold uppercase tracking-[0.18em] text-brand-primary shadow-sm"
          >
            About Socialbizz
            <ArrowUpRight size={14} />
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 22 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.05 }}
            className="mx-auto mb-5 max-w-5xl text-4xl font-display font-bold leading-[1.04] text-brand-text-primary md:text-7xl"
          >
            A digital marketing agency built for <span className="text-brand-primary">growth, ROI, and digital success</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="mx-auto mb-8 max-w-3xl text-base leading-relaxed text-brand-text-secondary md:text-xl"
          >
            We help ambitious brands grow with focused strategy, strong creative, and performance-led execution.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15 }}
            className="flex flex-col items-center justify-center gap-3 sm:flex-row"
          >
            <a href="#about-inquiry" className="inline-flex items-center justify-center gap-2 rounded-xl bg-brand-primary px-6 py-3 text-sm font-bold text-white shadow-soft transition hover:bg-brand-primary-hover md:text-base">
              Discuss Your Growth <ArrowRight size={16} />
            </a>
            <a href="https://wa.me/918901509290" target="_blank" rel="noreferrer" className="inline-flex items-center justify-center gap-2 rounded-xl border border-brand-border bg-white px-6 py-3 text-sm font-bold text-brand-text-primary shadow-sm transition hover:bg-brand-section md:text-base">
              WhatsApp Us
            </a>
          </motion.div>
        </div>
      </section>

      <section className="relative px-4 md:px-6">
        <div className="absolute inset-x-0 top-1/2 -z-10 h-px bg-gradient-to-r from-transparent via-brand-border to-transparent" />
        <div className="mx-auto grid max-w-7xl gap-5 md:grid-cols-3">
          {sections.map((item, index) => (
            <motion.article
              key={item.label}
              initial={{ opacity: 0, y: 22 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.08 }}
              whileHover={{ y: -8 }}
              className="group relative overflow-hidden rounded-2xl border border-brand-border bg-white/90 p-6 shadow-soft backdrop-blur transition duration-500 hover:border-brand-accent hover:shadow-soft-lg md:p-8"
            >
              <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-transparent via-brand-primary/55 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
              <motion.div
                animate={{ x: ["-120%", "140%"] }}
                transition={{
                  duration: 3.8,
                  delay: index * 0.45,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="absolute inset-y-0 w-24 -skew-x-12 bg-gradient-to-r from-transparent via-brand-accent/80 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100"
              />
              <motion.div
                animate={{ scale: [1, 1.18, 1], opacity: [0.05, 0.14, 0.05] }}
                transition={{
                  duration: 5.5,
                  delay: index * 0.5,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="absolute -right-10 -top-10 h-28 w-28 rounded-full bg-brand-primary"
              />
              <div className="relative z-10">
                <div className="mb-7 flex items-center justify-between gap-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-brand-accent text-brand-primary transition group-hover:bg-brand-primary group-hover:text-white">
                    {item.icon}
                  </div>
                  <span className="text-5xl font-display font-black text-brand-primary/[0.06]">0{index + 1}</span>
                </div>
                <div className="mb-3 text-xs font-bold uppercase tracking-[0.18em] text-brand-primary">{item.label}</div>
                <h2 className="mb-4 text-2xl font-display font-bold leading-tight text-brand-text-primary md:text-3xl">
                  {item.title}
                </h2>
                <p className="text-sm leading-relaxed text-brand-text-secondary md:text-base">{item.desc}</p>
              </div>
            </motion.article>
          ))}
        </div>
      </section>

      <section id="about-inquiry" className="px-4 py-14 md:px-6 md:py-20">
        <div className="mx-auto grid max-w-6xl gap-6 overflow-hidden rounded-2xl border border-brand-border bg-brand-section p-6 shadow-soft-lg md:grid-cols-2 md:p-10">
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="flex flex-col justify-center"
          >
            <div className="mb-3 text-xs font-bold uppercase tracking-[0.18em] text-brand-primary">Work With Socialbizz</div>
            <h2 className="mb-4 text-3xl font-display font-bold leading-tight text-brand-text-primary md:text-5xl">
              Like our approach? Tell us what you want to grow.
            </h2>
            <p className="mb-7 text-base leading-relaxed text-brand-text-secondary md:text-lg">
              Share your business goal and our team will suggest the right mix of strategy, marketing, and digital execution.
            </p>
            <div className="space-y-3">
              {proofPoints.map((item) => (
                <div key={item} className="flex items-center gap-3 text-sm font-semibold text-brand-text-primary md:text-base">
                  <CheckCircle2 className="shrink-0 text-brand-primary" size={18} />
                  {item}
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="rounded-2xl border border-brand-border bg-white p-5 shadow-soft md:p-6"
          >
            {formStatus === "success" ? (
              <motion.div initial={{ opacity: 0, scale: 0.96 }} animate={{ opacity: 1, scale: 1 }} className="flex min-h-[430px] flex-col items-center justify-center text-center">
                <div className="mb-5 flex h-16 w-16 items-center justify-center rounded-full bg-green-100 text-green-600">
                  <CheckCircle2 size={34} />
                </div>
                <h3 className="mb-2 text-2xl font-display font-bold text-brand-text-primary">Inquiry sent</h3>
                <p className="max-w-sm text-brand-text-secondary">Thanks for reaching out. Our team will contact you shortly.</p>
                <button onClick={() => setFormStatus("idle")} className="mt-6 font-bold text-brand-primary">
                  Send another inquiry
                </button>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="mb-1 block text-[10px] font-bold uppercase tracking-widest text-brand-text-secondary">Full Name</label>
                  <input required name="name" className="w-full rounded-xl border border-brand-border bg-brand-section/40 px-4 py-3 text-sm outline-none transition focus:border-brand-primary focus:ring-4 focus:ring-brand-accent" placeholder="Your name" />
                </div>
                <div className="grid gap-4 md:grid-cols-2">
                  <div>
                    <label className="mb-1 block text-[10px] font-bold uppercase tracking-widest text-brand-text-secondary">Email</label>
                    <input required name="email" type="email" className="w-full rounded-xl border border-brand-border bg-brand-section/40 px-4 py-3 text-sm outline-none transition focus:border-brand-primary focus:ring-4 focus:ring-brand-accent" placeholder="you@example.com" />
                  </div>
                  <div>
                    <label className="mb-1 block text-[10px] font-bold uppercase tracking-widest text-brand-text-secondary">Phone</label>
                    <input required name="phone" type="tel" className="w-full rounded-xl border border-brand-border bg-brand-section/40 px-4 py-3 text-sm outline-none transition focus:border-brand-primary focus:ring-4 focus:ring-brand-accent" placeholder="+91 00000 00000" />
                  </div>
                </div>
                <div>
                  <label className="mb-1 block text-[10px] font-bold uppercase tracking-widest text-brand-text-secondary">Interested In</label>
                  <select required name="service" className="w-full rounded-xl border border-brand-border bg-brand-section/40 px-4 py-3 text-sm outline-none transition focus:border-brand-primary focus:ring-4 focus:ring-brand-accent">
                    <option value="">Select a service</option>
                    <option>SEO and organic growth</option>
                    <option>Google and Meta ads</option>
                    <option>Social media marketing</option>
                    <option>Website or app development</option>
                    <option>Branding and creative support</option>
                    <option>Complete digital growth plan</option>
                  </select>
                </div>
                <div>
                  <label className="mb-1 block text-[10px] font-bold uppercase tracking-widest text-brand-text-secondary">Business Goal</label>
                  <textarea required name="message" rows={4} className="w-full resize-none rounded-xl border border-brand-border bg-brand-section/40 px-4 py-3 text-sm outline-none transition focus:border-brand-primary focus:ring-4 focus:ring-brand-accent" placeholder="Tell us about your business and what you want to improve..." />
                </div>
                <button disabled={formStatus === "submitting"} className="flex w-full items-center justify-center gap-2 rounded-xl bg-brand-primary py-4 text-sm font-bold text-white transition hover:bg-brand-primary-hover disabled:opacity-70">
                  {formStatus === "submitting" ? "Sending..." : "Send Inquiry"}
                  <Send size={17} />
                </button>
              </form>
            )}
          </motion.div>
        </div>
      </section>
    </div>
  );
}
