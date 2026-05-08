import { motion } from "motion/react";

const brands = [
  { name: "Zomato", logo: "https://logo.clearbit.com/zomato.com?size=200" },
  { name: "Razorpay", logo: "https://logo.clearbit.com/razorpay.com?size=200" },
  { name: "Cred", logo: "https://logo.clearbit.com/cred.club?size=200" },
  { name: "Swiggy", logo: "https://logo.clearbit.com/swiggy.com?size=200" },
  { name: "Nykaa", logo: "https://logo.clearbit.com/nykaa.com?size=200" },
  { name: "Lenskart", logo: "https://logo.clearbit.com/lenskart.com?size=200" },
  { name: "Boat", logo: "https://logo.clearbit.com/boat-lifestyle.com?size=200" },
  { name: "Mamaearth", logo: "https://logo.clearbit.com/mamaearth.in?size=200" },
  { name: "Delhivery", logo: "https://logo.clearbit.com/delhivery.com?size=200" },
  { name: "MaxHealth", logo: "https://logo.clearbit.com/maxhealthcare.in?size=200" },
  { name: "DLF", logo: "https://logo.clearbit.com/dlf.in?size=200" },
  { name: "PolicyBazaar", logo: "https://logo.clearbit.com/policybazaar.com?size=200" },
];

export default function BrandScroller() {
  // Duplicate the brands array to create a seamless loop
  const duplicatedBrands = [...brands, ...brands, ...brands];

  return (
    <section className="py-24 md:py-48 bg-[#010101] overflow-hidden relative isolate">
      {/* Cinematic Background */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full bg-[radial-gradient(circle_at_50%_50%,rgba(211,16,39,0.12),transparent_60%)]" />
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:80px_80px]" />
        <div className="absolute inset-0 bg-gradient-to-b from-[#010101] via-transparent to-[#010101]" />
      </div>

      <div className="max-w-7xl mx-auto px-6 mb-24 md:mb-40 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="inline-flex items-center gap-4 px-8 py-3 rounded-full bg-white/5 border border-white/10 backdrop-blur-3xl text-brand-primary text-xs md:text-sm font-bold uppercase tracking-[0.5em] mb-12 shadow-[0_0_40px_rgba(211,16,39,0.2)]"
        >
          <span className="relative flex h-3 w-3">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-brand-primary opacity-75"></span>
            <span className="relative inline-flex rounded-full h-3 w-3 bg-brand-primary"></span>
          </span>
          The Elite Circle
        </motion.div>
        
        <motion.h2 
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          className="text-6xl md:text-[10rem] font-display font-bold text-white tracking-tighter leading-[0.8] mb-12"
        >
          Partnering with <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-primary via-[#ff4d4d] to-brand-primary bg-[size:200%_auto] animate-gradient-x">Visionaries</span>
        </motion.h2>
        
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3, duration: 1 }}
          className="text-white/60 max-w-4xl mx-auto text-xl md:text-3xl font-medium tracking-tight leading-relaxed"
        >
          We architect growth for the brands that are redefining the Indian economy. From seed-stage disruptors to public market giants.
        </motion.p>
      </div>

      <div className="relative flex overflow-hidden py-20">
        {/* Ultra-Deep Gradient Masks */}
        <div className="absolute left-0 top-0 bottom-0 w-40 md:w-[600px] bg-gradient-to-r from-[#010101] via-[#010101]/95 to-transparent z-20" />
        <div className="absolute right-0 top-0 bottom-0 w-40 md:w-[600px] bg-gradient-to-l from-[#010101] via-[#010101]/95 to-transparent z-20" />

        <motion.div 
          className="flex whitespace-nowrap gap-16 md:gap-32"
          animate={{ x: ["0%", "-33.33%"] }}
          transition={{
            x: {
              repeat: Infinity,
              repeatType: "loop",
              duration: 60,
              ease: "linear",
            },
          }}
        >
          {duplicatedBrands.map((brand, i) => (
            <div 
              key={i} 
              className="flex items-center gap-12 px-16 py-10 bg-white/[0.02] backdrop-blur-[100px] rounded-[4rem] border border-white/10 shadow-[0_40px_100px_rgba(0,0,0,0.8)] hover:bg-white/[0.08] hover:border-brand-primary/60 transition-all duration-1000 group cursor-pointer"
            >
              <div className="w-24 h-24 md:w-32 md:h-32 rounded-[2rem] bg-white flex items-center justify-center p-6 shadow-[0_0_50px_rgba(255,255,255,0.1)] group-hover:scale-110 group-hover:rotate-6 transition-all duration-1000 ease-[cubic-bezier(0.34,1.56,0.64,1)]">
                <img 
                  src={brand.logo} 
                  alt={brand.name} 
                  className="w-full h-full object-contain filter contrast-125 brightness-105"
                  onError={(e) => {
                    e.currentTarget.style.display = 'none';
                    const span = document.createElement('span');
                    span.className = "text-brand-primary font-bold text-4xl";
                    span.innerText = brand.name[0];
                    e.currentTarget.parentElement!.appendChild(span);
                  }}
                  referrerPolicy="no-referrer"
                />
              </div>
              <div className="flex flex-col gap-2">
                <span className="text-4xl md:text-7xl font-display font-bold text-white/80 group-hover:text-white transition-all duration-700 tracking-tighter">
                  {brand.name}
                </span>
                <div className="flex items-center gap-4 opacity-0 group-hover:opacity-100 transition-all duration-1000 translate-y-6 group-hover:translate-y-0">
                  <div className="w-2 h-2 bg-brand-primary rounded-full shadow-[0_0_20px_rgba(211,16,39,1)]" />
                  <span className="text-xs md:text-sm text-brand-primary font-bold uppercase tracking-[0.4em]">Strategic Growth Partner</span>
                </div>
              </div>
            </div>
          ))}
        </motion.div>
      </div>

      {/* Bottom Trust Indicators */}
      <div className="max-w-7xl mx-auto px-6 mt-32 md:mt-56">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-16 md:gap-24 border-t border-white/10 pt-32">
          {[
            { label: "Brands Scaled", value: "150+" },
            { label: "Total Ad Spend", value: "₹50Cr+" },
            { label: "Growth Delivered", value: "3.5x" },
            { label: "Client Satisfaction", value: "99%" },
          ].map((stat, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 1 }}
              className="text-center md:text-left group"
            >
              <div className="text-6xl md:text-9xl font-display font-bold text-white mb-4 tracking-tighter group-hover:text-brand-primary transition-all duration-700">{stat.value}</div>
              <div className="text-xs md:text-sm text-brand-primary font-bold uppercase tracking-[0.5em] opacity-40 group-hover:opacity-100 transition-all duration-700">{stat.label}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
