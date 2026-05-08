import { motion } from "motion/react";
import { Link } from "react-router-dom";
import { services } from "../data/services";
import { ArrowRight, Code, Palette, Smartphone, Target, Zap } from "lucide-react";

export default function Services() {
  const categories = Array.from(new Set(services.map((service) => service.category)));

  const getCategoryIcon = (category: string) => {
    if (category.includes("Ads")) return <Target size={20} />;
    if (category.includes("IT")) return <Code size={20} />;
    if (category.includes("Graphic")) return <Palette size={20} />;
    if (category.includes("Industries")) return <Smartphone size={20} />;
    return <Zap size={20} />;
  };

  return (
    <div className="bg-white pb-12">
      <section className="relative overflow-hidden px-4 pb-10 pt-28 md:px-6 md:pb-14 md:pt-32">
        <div className="absolute inset-0 -z-10 bg-[linear-gradient(180deg,#ffffff_0%,#f8fafc_58%,#ffffff_100%)]" />
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_50%_30%,rgba(211,16,39,0.1),transparent_34%)]" />
        <div className="absolute inset-0 -z-10 opacity-[0.16] [background-image:linear-gradient(to_right,rgba(15,23,42,0.08)_1px,transparent_1px),linear-gradient(to_bottom,rgba(15,23,42,0.08)_1px,transparent_1px)] [background-size:72px_72px]" />
        <motion.div
          animate={{ scale: [1, 1.08, 1], opacity: [0.55, 0.9, 0.55], x: [0, 24, 0] }}
          transition={{ duration: 11, repeat: Infinity, ease: "easeInOut" }}
          className="absolute left-1/2 top-14 -z-10 h-64 w-[46rem] -translate-x-1/2 rounded-full bg-brand-accent blur-[90px]"
        />
        <motion.div
          animate={{ rotate: [0, 360] }}
          transition={{ duration: 32, repeat: Infinity, ease: "linear" }}
          className="absolute left-1/2 top-[48%] -z-10 h-[36rem] w-[36rem] -translate-x-1/2 -translate-y-1/2 rounded-full border border-brand-primary/10"
        />

        <motion.span
          animate={{ y: [0, -16, 0], opacity: [0.2, 0.65, 0.2], scale: [1, 1.3, 1] }}
          transition={{ duration: 5.8, repeat: Infinity, ease: "easeInOut" }}
          className="absolute left-[12%] top-[30%] -z-10 h-2 w-2 rounded-full bg-brand-primary/25 blur-[1px]"
        />
        <motion.span
          animate={{ y: [0, -18, 0], opacity: [0.18, 0.6, 0.18], scale: [1, 1.35, 1] }}
          transition={{ duration: 6.3, delay: 0.8, repeat: Infinity, ease: "easeInOut" }}
          className="absolute right-[14%] top-[36%] -z-10 h-2.5 w-2.5 rounded-full bg-brand-primary/25 blur-[1px]"
        />

        <div className="mx-auto max-w-5xl text-center">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-4 inline-flex items-center gap-2 rounded-full border border-brand-border bg-white px-4 py-2 text-[11px] font-bold uppercase tracking-[0.18em] text-brand-primary shadow-sm"
          >
            <Zap size={14} /> Our Services
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 22 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.05 }}
            className="mx-auto mb-4 max-w-5xl text-4xl font-display font-bold leading-[1.04] text-brand-text-primary md:text-7xl"
          >
            Digital solutions built to <span className="text-brand-primary">grow your business</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="mx-auto max-w-3xl text-base leading-relaxed text-brand-text-secondary md:text-lg"
          >
            From visibility to conversions, Socialbizz brings strategy, creative, technology, and performance marketing into one clear growth system.
          </motion.p>
        </div>
      </section>

      <section className="px-4 md:px-6">
        <div className="mx-auto max-w-7xl space-y-10 md:space-y-14">
          {categories.map((category, categoryIndex) => (
            <motion.div
              key={category}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: categoryIndex * 0.06 }}
            >
              <div className="mb-5 flex items-end justify-between gap-5">
                <div className="flex items-center gap-4">
                  <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-brand-accent text-brand-primary shadow-soft">
                    {getCategoryIcon(category)}
                  </div>
                  <div>
                    <div className="text-[10px] font-bold uppercase tracking-[0.18em] text-brand-primary">Expertise</div>
                    <h2 className="text-2xl font-display font-bold text-brand-text-primary md:text-4xl">{category}</h2>
                  </div>
                </div>
                <div className="hidden h-px flex-1 bg-gradient-to-r from-brand-border to-transparent md:block" />
              </div>

              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {services
                  .filter((service) => service.category === category)
                  .map((service, index) => (
                    <Link key={service.slug} to={`/services/${service.slug}`} className="group block h-full">
                      <motion.article
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: index * 0.05 }}
                        whileHover={{ y: -8 }}
                        className="relative h-full overflow-hidden rounded-2xl border border-brand-border bg-white shadow-soft transition duration-500 hover:border-brand-accent hover:shadow-soft-lg"
                      >
                        <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-transparent via-brand-primary/60 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
                        <motion.div
                          animate={{ x: ["-120%", "140%"] }}
                          transition={{ duration: 4.2, delay: index * 0.18, repeat: Infinity, ease: "easeInOut" }}
                          className="absolute inset-y-0 z-20 w-24 -skew-x-12 bg-gradient-to-r from-transparent via-brand-accent/70 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                        />
                        <div className="relative h-40 overflow-hidden md:h-44">
                          <img
                            src={service.image || `https://picsum.photos/seed/${service.slug}/900/650`}
                            alt={service.title}
                            className="h-full w-full object-cover transition duration-700 group-hover:scale-105"
                            referrerPolicy="no-referrer"
                            loading="lazy"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-black/10 to-transparent" />
                          <div className="absolute left-4 top-4 flex h-11 w-11 items-center justify-center rounded-xl border border-white/20 bg-white/15 text-white backdrop-blur-md">
                            {service.icon}
                          </div>
                        </div>
                        <div className="p-5 md:p-6">
                          <h3 className="mb-3 text-xl font-display font-bold leading-tight text-brand-text-primary transition group-hover:text-brand-primary md:text-2xl">
                            {service.title}
                          </h3>
                          <p className="mb-5 text-sm leading-relaxed text-brand-text-secondary">{service.shortDesc}</p>
                          <div className="inline-flex items-center gap-2 text-sm font-bold text-brand-primary transition group-hover:gap-3">
                            View service <ArrowRight size={16} />
                          </div>
                        </div>
                      </motion.article>
                    </Link>
                  ))}
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      <section className="px-4 py-12 md:px-6 md:py-16">
        <div className="mx-auto max-w-5xl overflow-hidden rounded-2xl border border-brand-border bg-brand-section p-8 text-center shadow-soft-lg md:p-12">
          <h2 className="mb-4 text-3xl font-display font-bold leading-tight text-brand-text-primary md:text-5xl">
            Need the right service mix?
          </h2>
          <p className="mx-auto mb-7 max-w-2xl text-sm leading-relaxed text-brand-text-secondary md:text-lg">
            Tell us your goal. We will help you choose the right strategy across SEO, ads, social media, design, and technology.
          </p>
          <Link to="/contact" className="inline-flex items-center justify-center gap-2 rounded-xl bg-brand-primary px-6 py-3 text-sm font-bold text-white transition hover:bg-brand-primary-hover md:text-base">
            Get Free Strategy Call <ArrowRight size={16} />
          </Link>
        </div>
      </section>
    </div>
  );
}
