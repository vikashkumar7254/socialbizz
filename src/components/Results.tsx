import { motion, useInView } from "motion/react";
import { useRef, useState, useEffect } from "react";

function Counter({ value, suffix = "" }: { value: number; suffix?: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  useEffect(() => {
    if (isInView) {
      let start = 0;
      const end = value;
      const duration = 2000;
      const increment = end / (duration / 16);
      
      const timer = setInterval(() => {
        start += increment;
        if (start >= end) {
          setCount(end);
          clearInterval(timer);
        } else {
          setCount(Math.floor(start));
        }
      }, 16);
      return () => clearInterval(timer);
    }
  }, [isInView, value]);

  return <span ref={ref}>{count}{suffix}</span>;
}

export default function Results() {
  const metrics = [
    { label: "Average ROI", value: 3, suffix: "X" },
    { label: "Revenue Growth", value: 200, suffix: "%" },
    { label: "Happy Clients", value: 100, suffix: "+" },
    { label: "Campaigns Run", value: 500, suffix: "+" },
  ];

  return (
    <section className="premium-section py-8 md:py-10 px-4 md:px-6 relative overflow-hidden bg-white">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-brand-accent blur-[120px] -z-10" />
      
      <div className="max-w-7xl mx-auto">
        <div className="bg-white p-4 md:p-6 rounded-[1.5rem] md:rounded-[2rem] border border-brand-border relative overflow-hidden shadow-soft premium-card">
          <div className="absolute top-0 right-0 w-64 h-64 bg-brand-accent blur-[80px] -z-10" />
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 text-center">
            {metrics.map((metric, i) => (
              <motion.div
                key={metric.label}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
              >
                <div className="text-xl sm:text-2xl md:text-4xl font-display font-black mb-0.5 md:mb-1 text-brand-primary">
                  <Counter value={metric.value} suffix={metric.suffix} />
                </div>
                <div className="text-brand-text-secondary font-bold uppercase tracking-widest text-[8px] md:text-[10px]">
                  {metric.label}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
