import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import React, { useState } from "react";
import { Link, Navigate, useParams } from "react-router-dom";
import { ArrowRight, BarChart3, CheckCircle2, Minus, Plus, Sparkles, Target, Zap } from "lucide-react";
import { services } from "../data/services";
import HeroBackground from "../components/HeroBackground";

const categoryImages: Record<string, string> = {
  "Branding & Lead Generation": "https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&q=80&w=1000&h=760",
  "Ads & Lead Generation": "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=1000&h=760",
  "Online Reputation": "https://images.unsplash.com/photo-1521791136064-7986c2959213?auto=format&fit=crop&q=80&w=1000&h=760",
  "IT Services": "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&q=80&w=1000&h=760",
  "Graphics Services": "https://images.unsplash.com/photo-1626785774573-4b799315345d?auto=format&fit=crop&q=80&w=1000&h=760",
  "Industries": "https://images.unsplash.com/photo-1556761175-b413da4baf72?auto=format&fit=crop&q=80&w=1000&h=760",
};

export default function ServiceDetail() {
  const { slug } = useParams();
  const service = services.find((item) => item.slug === slug);
  const [formStatus, setFormStatus] = useState<"idle" | "submitting" | "success">("idle");
  const [activeFaq, setActiveFaq] = useState<number | null>(null);
  const shouldReduceMotion = useReducedMotion();

  if (!service) {
    return <Navigate to="/services" replace />;
  }

  const relatedServices = services
    .filter((item) => item.category === service.category && item.slug !== service.slug)
    .slice(0, 3);
  const serviceImage = service.image || categoryImages[service.category] || `https://picsum.photos/seed/${service.slug}/1000/760`;
  const serviceStats = service.stats?.length
    ? service.stats
    : [
        { label: "Strategy", value: "Custom" },
        { label: "Support", value: "End-to-end" },
      ];
  const serviceSubServices = service.subServices?.length
    ? service.subServices
    : service.features.map((feature) => ({
        title: feature,
        desc: `Focused execution for ${feature.toLowerCase()} as part of your ${service.title} plan.`,
      }));
  const serviceProcess = service.process?.length
    ? service.process
    : [
        { title: "Discovery", desc: `We understand your business goals, audience, current setup, and the role ${service.title} should play in growth.` },
        { title: "Strategy", desc: "We turn the findings into a clear roadmap with priorities, timelines, and success metrics." },
        { title: "Execution", desc: "Our team handles implementation with consistent quality, transparent updates, and practical decision-making." },
        { title: "Optimization", desc: "We review performance, improve weak points, and keep the work aligned with measurable outcomes." },
      ];
  const serviceFaqs = service.faqs?.length
    ? service.faqs
    : [
        { question: `Is ${service.title} right for my business?`, answer: `Yes, if your goal matches the outcomes listed on this page. We review your current stage first and recommend only the work that is useful for your business.` },
        { question: "How soon can we start?", answer: "Most projects can begin after a short discovery call, goal confirmation, and access handover for the required platforms or brand assets." },
        { question: "Will I get updates after work starts?", answer: "Yes. We keep communication clear with progress updates, next steps, and performance signals that matter for your project." },
      ];

  const outcomeCards = [
    {
      icon: <Target size={22} />,
      title: "Sharper Strategy",
      desc: `We align ${service.title} with your audience, offer, funnel, and business goals.`,
    },
    {
      icon: <Zap size={22} />,
      title: "Cleaner Execution",
      desc: "We handle the moving parts with clear priorities, fast delivery, and consistent quality.",
    },
    {
      icon: <BarChart3 size={22} />,
      title: "Better Decisions",
      desc: "We track the right signals so every improvement is guided by performance, not guesswork.",
    },
  ];

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setFormStatus("submitting");

    const formData = new FormData(event.currentTarget);
    const data = {
      name: formData.get("name"),
      email: formData.get("email"),
      phone: formData.get("phone"),
      service: `${service.title} - Goal: ${formData.get("goal")}`,
      message: formData.get("message"),
      source: `Service Detail Page: ${service.title}`,
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
      console.error("Error submitting inquiry:", error);
      setFormStatus("idle");
      alert("Network error. Please check your connection.");
    }
  };

  return (
    <div className="bg-white pb-16">
      <section className="relative isolate flex min-h-screen items-center overflow-hidden bg-white px-4 pb-14 pt-28 md:px-6 md:pb-20 md:pt-32">
        <HeroBackground disabled={Boolean(shouldReduceMotion)} />

        <div className="relative z-10 mx-auto w-full max-w-7xl">
          <div className="grid gap-10 lg:grid-cols-12 lg:items-center">
            <div className="lg:col-span-6">
              <motion.div
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                className="mb-5 inline-flex items-center gap-2 rounded-full border border-brand-border bg-white px-4 py-2 text-[11px] font-bold uppercase tracking-[0.18em] text-brand-primary shadow-sm"
              >
                <Sparkles size={14} /> {service.category}
              </motion.div>
              <motion.h1
                initial={{ opacity: 0, y: 22 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.05 }}
                className="mb-5 text-4xl font-display font-bold leading-[1.04] text-brand-text-primary md:text-7xl"
              >
                {service.title}
              </motion.h1>
              <motion.p
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="mb-8 max-w-2xl text-base leading-relaxed text-brand-text-secondary md:text-xl"
              >
                {service.longDesc || service.shortDesc}
              </motion.p>
              <motion.div
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.15 }}
                className="flex flex-col gap-3 sm:flex-row"
              >
                <a href="#contact" className="inline-flex items-center justify-center gap-2 rounded-xl bg-brand-primary px-6 py-3 text-sm font-bold text-white shadow-soft transition hover:bg-brand-primary-hover md:text-base">
                  Start Your Project <ArrowRight size={16} />
                </a>
                <a href="#details" className="inline-flex items-center justify-center gap-2 rounded-xl border border-brand-border bg-white px-6 py-3 text-sm font-bold text-brand-text-primary shadow-sm transition hover:bg-brand-section md:text-base">
                  View Details
                </a>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="mt-7 grid max-w-lg grid-cols-2 gap-3"
              >
                {serviceStats.slice(0, 2).map((stat) => (
                  <div key={stat.label} className="rounded-2xl border border-brand-border bg-white/80 p-4 shadow-sm">
                    <div className="text-xl font-display font-black text-brand-primary md:text-2xl">{stat.value}</div>
                    <div className="mt-1 text-[10px] font-bold uppercase tracking-[0.16em] text-brand-text-secondary">{stat.label}</div>
                  </div>
                ))}
              </motion.div>
            </div>

            <motion.div
              initial={{ opacity: 0, scale: 0.94, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ delay: 0.1, duration: 0.7 }}
              className="relative lg:col-span-6"
            >
              <motion.div
                animate={{ scale: [1, 1.08, 1], opacity: [0.45, 0.75, 0.45] }}
                transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
                className="absolute -inset-6 -z-10 rounded-full bg-brand-accent blur-[80px]"
              />
              <div className="relative overflow-hidden rounded-2xl border border-brand-border bg-white shadow-soft-lg">
                <motion.div
                  animate={{ x: ["-120%", "140%"] }}
                  transition={{ duration: 4.8, repeat: Infinity, ease: "easeInOut" }}
                  className="absolute inset-y-0 z-10 w-28 -skew-x-12 bg-gradient-to-r from-transparent via-white/30 to-transparent"
                />
                <img
                  src={serviceImage}
                  alt={service.title}
                  className="aspect-[4/3] w-full object-cover"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-transparent to-transparent" />
                <div className="absolute bottom-5 left-5 right-5 rounded-2xl border border-white/15 bg-white/15 p-4 text-white backdrop-blur-md">
                  <div className="mb-1 text-[10px] font-bold uppercase tracking-[0.18em] text-white/70">Service Focus</div>
                  <div className="text-lg font-display font-bold">{service.shortDesc}</div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <section id="details" className="px-4 py-14 md:px-6 md:py-20">
        <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <div className="sticky top-28">
              <div className="mb-3 text-xs font-bold uppercase tracking-[0.18em] text-brand-primary">Service Breakdown</div>
              <h2 className="mb-5 text-3xl font-display font-bold leading-tight text-brand-text-primary md:text-5xl">
                What this service helps you achieve
              </h2>
              <p className="text-base leading-relaxed text-brand-text-secondary md:text-lg">
                We keep every action connected to business outcomes: stronger visibility, better customer trust, cleaner digital experience, and measurable growth.
              </p>
            </div>
          </div>

          <div className="grid gap-5 md:grid-cols-2 lg:col-span-7">
            <div className="rounded-2xl border border-brand-border bg-white p-6 shadow-soft">
              <Target className="mb-5 text-brand-primary" size={30} />
              <h3 className="mb-4 text-2xl font-display font-bold text-brand-text-primary">Key Features</h3>
              <div className="space-y-3">
                {service.features.map((feature) => (
                  <div key={feature} className="flex items-start gap-3 text-sm font-semibold text-brand-text-primary">
                    <CheckCircle2 className="mt-0.5 shrink-0 text-brand-primary" size={17} />
                    {feature}
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-2xl border border-brand-border bg-brand-section p-6 shadow-soft">
              <BarChart3 className="mb-5 text-brand-primary" size={30} />
              <h3 className="mb-4 text-2xl font-display font-bold text-brand-text-primary">Business Benefits</h3>
              <div className="space-y-3">
                {service.benefits.map((benefit) => (
                  <div key={benefit} className="flex items-start gap-3 text-sm font-semibold text-brand-text-primary">
                    <CheckCircle2 className="mt-0.5 shrink-0 text-brand-primary" size={17} />
                    {benefit}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-brand-section px-4 py-14 md:px-6 md:py-20">
        <div className="mx-auto max-w-7xl">
          <div className="mb-9 max-w-3xl">
            <div className="mb-3 text-xs font-bold uppercase tracking-[0.18em] text-brand-primary">What We Cover</div>
            <h2 className="text-3xl font-display font-bold leading-tight text-brand-text-primary md:text-5xl">
              Focused services inside {service.title}
            </h2>
          </div>

          <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-4">
            {serviceSubServices.slice(0, 4).map((item, index) => (
              <motion.article
                key={item.title}
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.06 }}
                whileHover={{ y: -6 }}
                className="group relative overflow-hidden rounded-2xl border border-brand-border bg-white p-6 shadow-soft transition hover:border-brand-accent hover:shadow-soft-lg"
              >
                <div className="absolute right-0 top-0 h-24 w-24 rounded-bl-full bg-brand-primary/[0.04] transition group-hover:bg-brand-primary/[0.08]" />
                <div className="relative z-10">
                  <div className="mb-5 text-4xl font-display font-black text-brand-primary/[0.12]">0{index + 1}</div>
                  <h3 className="mb-3 text-xl font-display font-bold text-brand-text-primary group-hover:text-brand-primary">{item.title}</h3>
                  <p className="text-sm leading-relaxed text-brand-text-secondary">{item.desc}</p>
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      <section className="px-4 py-14 md:px-6 md:py-20">
        <div className="mx-auto max-w-7xl">
          <div className="mb-9 grid gap-5 md:grid-cols-2 md:items-end">
            <div>
              <div className="mb-3 text-xs font-bold uppercase tracking-[0.18em] text-brand-primary">Expected Outcomes</div>
              <h2 className="text-3xl font-display font-bold leading-tight text-brand-text-primary md:text-5xl">
                Built for performance, not just activity
              </h2>
            </div>
            <p className="text-base leading-relaxed text-brand-text-secondary md:text-lg">
              We make every service practical, trackable, and connected to digital growth. The goal is simple: better visibility, stronger trust, and more qualified action from your audience.
            </p>
          </div>

          <div className="grid gap-5 md:grid-cols-3">
            {outcomeCards.map((item, index) => (
              <motion.article
                key={item.title}
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.07 }}
                className="rounded-2xl border border-brand-border bg-white p-6 shadow-soft"
              >
                <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-xl bg-brand-accent text-brand-primary">{item.icon}</div>
                <h3 className="mb-3 text-xl font-display font-bold text-brand-text-primary">{item.title}</h3>
                <p className="text-sm leading-relaxed text-brand-text-secondary">{item.desc}</p>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      <section className="relative overflow-hidden bg-brand-section px-4 py-14 md:px-6 md:py-20">
        <div className="absolute inset-0 opacity-[0.16] [background-image:linear-gradient(to_right,rgba(15,23,42,0.08)_1px,transparent_1px),linear-gradient(to_bottom,rgba(15,23,42,0.08)_1px,transparent_1px)] [background-size:72px_72px]" />
        <motion.div
          animate={{ scale: [1, 1.08, 1], opacity: [0.45, 0.7, 0.45] }}
          transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
          className="absolute left-1/2 top-0 h-72 w-[42rem] -translate-x-1/2 rounded-full bg-white blur-[80px]"
        />
        <div className="relative mx-auto max-w-7xl">
          <div className="mb-10 max-w-3xl md:mb-14">
            <div className="mb-3 text-xs font-bold uppercase tracking-[0.2em] text-brand-primary">Our Approach</div>
            <h2 className="text-3xl font-display font-bold leading-tight text-brand-text-primary md:text-5xl">
              A clear framework for confident execution
            </h2>
          </div>
          <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-4">
            {serviceProcess.map((step, index) => (
              <motion.div
                key={step.title}
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.07 }}
                whileHover={{ y: -6 }}
                className="relative overflow-hidden rounded-2xl border border-brand-border bg-white p-6 shadow-soft transition hover:border-brand-accent hover:shadow-soft-lg"
              >
                <div className="absolute right-0 top-0 h-24 w-24 rounded-bl-full bg-brand-primary/[0.04]" />
                <div className="relative z-10">
                  <div className="mb-6 text-5xl font-display font-black text-brand-primary/[0.12]">0{index + 1}</div>
                  <h3 className="mb-3 text-xl font-display font-bold text-brand-text-primary">{step.title}</h3>
                  <p className="text-sm leading-relaxed text-brand-text-secondary">{step.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="px-4 py-14 md:px-6 md:py-20">
        <div className="mx-auto max-w-3xl">
          <div className="mb-9 text-center">
            <div className="mb-3 text-xs font-bold uppercase tracking-[0.18em] text-brand-primary">FAQ</div>
            <h2 className="text-3xl font-display font-bold leading-tight text-brand-text-primary md:text-5xl">Questions clients ask</h2>
          </div>
          <div className="space-y-4">
            {serviceFaqs.map((faq, index) => (
              <div key={faq.question} className={`overflow-hidden rounded-2xl border transition ${activeFaq === index ? "border-brand-accent bg-brand-section shadow-soft" : "border-brand-border bg-white"}`}>
                <button onClick={() => setActiveFaq(activeFaq === index ? null : index)} className="flex w-full items-center justify-between gap-4 p-5 text-left font-bold text-brand-text-primary">
                  {faq.question}
                  <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-white text-brand-primary shadow-sm">
                    {activeFaq === index ? <Minus size={17} /> : <Plus size={17} />}
                  </span>
                </button>
                <AnimatePresence>
                  {activeFaq === index && (
                    <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }}>
                      <div className="border-t border-brand-border px-5 py-4 text-sm leading-relaxed text-brand-text-secondary">{faq.answer}</div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="contact" className="px-4 py-14 md:px-6 md:py-20">
        <div className="mx-auto grid max-w-6xl gap-6 overflow-hidden rounded-2xl border border-brand-border bg-white p-6 shadow-soft-lg md:grid-cols-2 md:p-10">
          <div className="flex flex-col justify-center">
            <div className="mb-3 text-xs font-bold uppercase tracking-[0.18em] text-brand-primary">Start Smart</div>
            <h2 className="mb-4 text-3xl font-display font-bold leading-tight text-brand-text-primary md:text-5xl">
              Want to discuss {service.title}?
            </h2>
            <p className="mb-6 text-base leading-relaxed text-brand-text-secondary">
              Share your goal. We will review the best next steps and suggest a practical plan for your business.
            </p>
            <div className="space-y-3">
              {["Clear recommendations", "No-obligation consultation", "Practical growth roadmap"].map((item) => (
                <div key={item} className="flex items-center gap-3 font-semibold text-brand-text-primary">
                  <CheckCircle2 className="text-brand-primary" size={18} />
                  {item}
                </div>
              ))}
            </div>
          </div>

          {formStatus === "success" ? (
            <motion.div initial={{ opacity: 0, scale: 0.96 }} animate={{ opacity: 1, scale: 1 }} className="rounded-2xl bg-brand-section p-8 text-center">
              <CheckCircle2 className="mx-auto mb-4 text-green-600" size={48} />
              <h3 className="mb-2 text-2xl font-display font-bold text-brand-text-primary">Request sent</h3>
              <p className="text-brand-text-secondary">We will contact you shortly.</p>
              <button onClick={() => setFormStatus("idle")} className="mt-6 font-bold text-brand-primary">Send another request</button>
            </motion.div>
          ) : (
            <form onSubmit={handleSubmit} className="rounded-2xl border border-brand-border bg-brand-section p-5 shadow-soft md:p-6">
              <div className="mb-4">
                <label className="mb-1 block text-[10px] font-bold uppercase tracking-widest text-brand-text-primary">Full Name</label>
                <input required name="name" className="w-full rounded-xl border border-brand-border bg-white px-4 py-3 text-sm outline-none transition focus:border-brand-primary" placeholder="Your name" />
              </div>
              <div className="mb-4">
                <label className="mb-1 block text-[10px] font-bold uppercase tracking-widest text-brand-text-primary">Email Address</label>
                <input required name="email" type="email" className="w-full rounded-xl border border-brand-border bg-white px-4 py-3 text-sm outline-none transition focus:border-brand-primary" placeholder="you@example.com" />
              </div>
              <div className="mb-4">
                <label className="mb-1 block text-[10px] font-bold uppercase tracking-widest text-brand-text-primary">Phone Number</label>
                <input required name="phone" type="tel" className="w-full rounded-xl border border-brand-border bg-white px-4 py-3 text-sm outline-none transition focus:border-brand-primary" placeholder="+91 00000 00000" />
              </div>
              <div className="mb-5">
                <label className="mb-1 block text-[10px] font-bold uppercase tracking-widest text-brand-text-primary">Primary Goal</label>
                <select name="goal" className="w-full rounded-xl border border-brand-border bg-white px-4 py-3 text-sm outline-none transition focus:border-brand-primary">
                  <option>Increase leads</option>
                  <option>Improve visibility</option>
                  <option>Build brand trust</option>
                  <option>Scale sales</option>
                </select>
              </div>
              <div className="mb-5">
                <label className="mb-1 block text-[10px] font-bold uppercase tracking-widest text-brand-text-primary">Project Details</label>
                <textarea name="message" rows={3} className="w-full resize-none rounded-xl border border-brand-border bg-white px-4 py-3 text-sm outline-none transition focus:border-brand-primary" placeholder="Tell us what you want to improve..." />
              </div>
              <button disabled={formStatus === "submitting"} className="flex w-full items-center justify-center gap-2 rounded-xl bg-brand-primary py-4 text-sm font-bold text-white transition hover:bg-brand-primary-hover disabled:opacity-70">
                {formStatus === "submitting" ? "Sending..." : <>Book Strategy Call <ArrowRight size={17} /></>}
              </button>
            </form>
          )}
        </div>
      </section>

      {relatedServices.length > 0 && (
        <section className="bg-white px-4 py-14 md:px-6 md:py-20">
          <div className="mx-auto max-w-7xl">
            <div className="mb-8 flex items-end justify-between gap-5">
              <div>
                <div className="mb-3 text-xs font-bold uppercase tracking-[0.18em] text-brand-primary">Related Services</div>
                <h2 className="text-3xl font-display font-bold text-brand-text-primary md:text-5xl">Explore more solutions</h2>
              </div>
            </div>
            <div className="grid gap-5 md:grid-cols-3">
              {relatedServices.map((item) => (
                <Link key={item.slug} to={`/services/${item.slug}`} className="group rounded-2xl border border-brand-border bg-white p-6 shadow-soft transition hover:-translate-y-1 hover:border-brand-accent hover:shadow-soft-lg">
                  <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-xl bg-brand-accent text-brand-primary transition group-hover:bg-brand-primary group-hover:text-white">{item.icon}</div>
                  <h3 className="mb-2 text-xl font-display font-bold text-brand-text-primary group-hover:text-brand-primary">{item.title}</h3>
                  <p className="mb-5 text-sm leading-relaxed text-brand-text-secondary">{item.shortDesc}</p>
                  <div className="inline-flex items-center gap-2 text-sm font-bold text-brand-primary">Learn more <ArrowRight size={16} /></div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}
    </div>
  );
}
