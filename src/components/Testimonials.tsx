import { motion, useScroll, useTransform } from "motion/react";
import { Star, Quote } from "lucide-react";
import { testimonials } from "../data/testimonials";
import { useRef } from "react";

export default function Testimonials() {
  const containerRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const y1 = useTransform(scrollYProgress, [0, 1], [0, -100]);
  const y2 = useTransform(scrollYProgress, [0, 1], [0, 100]);
  const rotate = useTransform(scrollYProgress, [0, 1], [0, 15]);

  return (
    <section 
      id="testimonials" 
      ref={containerRef}
      className="premium-section py-8 md:py-12 px-4 md:px-6 bg-brand-section overflow-hidden relative"
    >
      {/* Parallax Background Elements */}
      <motion.div 
        style={{ y: y1, rotate }}
        className="absolute top-10 left-10 w-64 h-64 bg-brand-accent blur-[100px] rounded-full -z-10"
      />
      <motion.div 
        style={{ y: y2, rotate: -rotate }}
        className="absolute bottom-10 right-10 w-80 h-80 bg-brand-accent blur-[120px] rounded-full -z-10"
      />
      
      {/* Subtle Background Image Overlay */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none -z-10">
        <img 
          src="https://images.unsplash.com/photo-1557804506-669a67965ba0?auto=format&fit=crop&q=80&w=1920" 
          alt="Background Pattern" 
          className="w-full h-full object-cover"
          referrerPolicy="no-referrer"
          loading="lazy"
          decoding="async"
        />
      </div>

      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-6 md:mb-8">
          <h2 className="text-brand-primary font-display font-bold uppercase tracking-widest text-[10px] md:text-sm mb-3 md:mb-4">Testimonials</h2>
          <h3 className="text-3xl md:text-5xl font-display font-bold">What Our Clients Say</h3>
        </div>

        <div className="flex gap-5 md:gap-6 animate-marquee hover:pause py-5 md:py-6">
          {[...testimonials, ...testimonials].map((review, i) => (
            <motion.div
              key={i}
              whileHover={{ y: i % 2 === 0 ? 10 : -10 }}
              className={`min-w-[280px] sm:min-w-[340px] md:min-w-[420px] bg-white p-6 md:p-8 rounded-[2rem] md:rounded-[2.5rem] border border-brand-border hover:border-brand-primary/30 shadow-soft hover:shadow-soft-lg transition-all duration-500 group relative overflow-hidden premium-card ${
                i % 2 === 0 ? "md:translate-y-3 md:rotate-1" : "md:-translate-y-3 md:-rotate-1"
              }`}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-brand-accent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="relative z-10">
                <div className="flex gap-1 mb-4 md:mb-6">
                  {[...Array(review.rating)].map((_, i) => (
                    <Star key={i} className="size-3.5 md:size-4 fill-brand-primary text-brand-primary group-hover:scale-110 transition-transform" />
                  ))}
                </div>
                <Quote className="size-8 md:size-10 text-brand-primary/10 mb-3 md:mb-4 group-hover:text-brand-primary/20 transition-colors" />
                <p className="text-base md:text-lg text-brand-text-primary mb-6 md:mb-8 italic leading-relaxed">
                  "{review.content}"
                </p>
                <div className="flex items-center gap-3 md:gap-4">
                  <img 
                    src={review.avatar} 
                    alt={review.name} 
                    className="w-10 h-10 md:w-12 md:h-12 rounded-xl border border-brand-border group-hover:border-brand-primary/30 transition-colors object-cover"
                    referrerPolicy="no-referrer"
                    loading="lazy"
                    decoding="async"
                  />
                  <div>
                    <div className="font-bold text-sm md:text-base text-brand-primary">{review.name}</div>
                    <div className="text-xs text-brand-text-secondary">{review.role}</div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      <style>{`
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .animate-marquee {
          display: flex;
          width: fit-content;
          animation: marquee 40s linear infinite;
        }
        .hover\\:pause:hover {
          animation-play-state: paused;
        }
      `}</style>
    </section>
  );
}
