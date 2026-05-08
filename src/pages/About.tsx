import { motion } from "motion/react";
import { ArrowUpRight, BarChart3, Target, TrendingUp } from "lucide-react";

export default function About() {
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
            className="mx-auto max-w-3xl text-base leading-relaxed text-brand-text-secondary md:text-xl"
          >
            We help ambitious brands grow with focused strategy, strong creative, and performance-led execution.
          </motion.p>

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
    </div>
  );
}
