import { motion } from "motion/react";
import { Play, ArrowRight } from "lucide-react";

const testimonials = [
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
];

export default function VideoTestimonials() {
  return (
    <section className="premium-section relative py-8 md:py-12 px-4 md:px-6 bg-white overflow-hidden isolate">
      {/* Digital Background Elements */}
      <div className="absolute inset-0 -z-10 pointer-events-none overflow-hidden">
        <div className="absolute top-0 left-1/4 w-64 h-64 bg-brand-accent blur-[100px] rounded-full" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-brand-accent blur-[120px] rounded-full" />
        
        {/* Animated Grid Lines */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#0F172A05_1px,transparent_1px),linear-gradient(to_bottom,#0F172A05_1px,transparent_1px)] bg-[size:40px_40px] md:bg-[size:60px_60px]" />
        
        {/* Floating Particles */}
        {[...Array(10)].map((_, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 100 }}
            animate={{ 
              opacity: [0, 0.3, 0],
              y: -100,
              x: (Math.random() - 0.5) * 50
            }}
            transition={{
              duration: 5 + Math.random() * 5,
              repeat: Infinity,
              ease: "linear",
              delay: Math.random() * 5
            }}
            className="absolute w-1 h-1 bg-brand-primary rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
          />
        ))}
      </div>

      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-6 md:mb-8">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex items-center justify-center gap-2 text-brand-primary font-display font-bold uppercase tracking-[0.3em] text-[10px] md:text-xs mb-4"
          >
            <ArrowRight size={14} /> OUR CLIENT
          </motion.div>
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-3xl md:text-6xl font-display font-bold text-brand-text-primary"
          >
            Hear What Our <span className="text-brand-primary">Clients Say</span>
          </motion.h2>
        </div>

        {/* Video Scrolling Container */}
        <div className="relative">
          <motion.div 
            className="flex gap-4 md:gap-6 overflow-x-auto pb-4 md:pb-6 snap-x snap-mandatory scrollbar-hide -mx-4 px-4 md:mx-0 md:px-0"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
            {testimonials.map((item, i) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="min-w-[250px] sm:min-w-[290px] md:min-w-[320px] snap-start group relative aspect-[3/4.2] rounded-[1.5rem] md:rounded-[2rem] overflow-hidden shadow-soft-lg border border-brand-border cursor-pointer premium-card"
              >
                {/* Thumbnail */}
                <img 
                  src={item.thumbnail} 
                  alt={item.name}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  referrerPolicy="no-referrer"
                  loading="lazy"
                  decoding="async"
                />
                
                {/* Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-500" />
                
                {/* Play Button */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <motion.div 
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    className="w-16 h-16 md:w-20 md:h-20 bg-brand-primary rounded-full flex items-center justify-center text-white shadow-2xl relative z-10"
                  >
                    <Play size={32} fill="currentColor" className="ml-1" />
                    
                    {/* Ripple Effect */}
                    <div className="absolute inset-0 bg-brand-primary rounded-full animate-ping opacity-20" />
                  </motion.div>
                </div>

                {/* Client Info */}
                <div className="absolute bottom-8 left-8 right-8 text-white">
                  <div className="font-display font-bold text-xl md:text-2xl mb-1">{item.name}</div>
                  <div className="text-xs md:text-sm text-white/70 font-medium uppercase tracking-widest">{item.role}</div>
                </div>

                {/* Branding Logo (Small) */}
                <div className="absolute top-6 left-6 w-10 h-10 bg-white/10 backdrop-blur-md rounded-xl flex items-center justify-center border border-white/20">
                  <div className="text-white font-display font-black text-[10px]">SB</div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
