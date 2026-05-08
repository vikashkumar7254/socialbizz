import { motion, AnimatePresence } from "motion/react";
import { useState, useEffect } from "react";
import { projects, Project } from "../data/portfolio";
import { X, ExternalLink, ArrowUpRight, CheckCircle2 } from "lucide-react";

export default function Portfolio() {
  const categories = ["All", "Ads", "SEO", "Web Design"] as const;
  const [activeTab, setActiveTab] = useState<typeof categories[number]>("All");
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  const filteredProjects = activeTab === "All" 
    ? projects 
    : projects.filter(p => p.category === activeTab);

  return (
    <div className="pb-12 md:pb-20 relative isolate bg-[#fafafa]">
      {/* Premium Background Elements */}
      <div className="absolute inset-0 -z-10 pointer-events-none overflow-hidden">
        <div className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-brand-accent blur-[120px] rounded-full opacity-60" />
        <div className="absolute bottom-0 right-1/4 w-[800px] h-[800px] bg-brand-accent blur-[150px] rounded-full opacity-40" />
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:40px_40px] md:bg-[size:60px_60px]" />
      </div>

      <section className="pt-28 pb-10 md:pt-40 md:pb-16 px-6 text-center">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={isLoaded ? { opacity: 1, y: 0 } : {}}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white border border-brand-border shadow-soft text-brand-primary text-[10px] md:text-xs font-bold uppercase tracking-[0.2em] mb-8"
          >
            <span className="w-2 h-2 bg-brand-primary rounded-full animate-pulse" />
            Our Success Stories
          </motion.div>
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={isLoaded ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.1 }}
            className="text-5xl md:text-8xl font-display font-bold mb-8 text-brand-text-primary tracking-tight"
          >
            Crafting <span className="text-brand-primary">Digital Excellence</span>
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={isLoaded ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.2 }}
            className="text-lg md:text-2xl text-brand-text-secondary leading-relaxed max-w-3xl mx-auto font-medium"
          >
            Explore our curated selection of high-impact campaigns and digital transformations that have helped Delhi's leading brands scale to new heights.
          </motion.p>
        </div>
      </section>

      <section className="py-6 md:py-10 px-6">
        <div className="max-w-7xl mx-auto">
          {/* Category Filter */}
          <div className="flex justify-center mb-12 md:mb-20">
            <div className="flex gap-2 bg-white p-2 rounded-2xl shadow-soft-xl border border-brand-border overflow-x-auto max-w-full no-scrollbar">
              {categories.map((cat, i) => (
                <button
                  key={cat}
                  onClick={() => setActiveTab(cat)}
                  className={`px-8 py-3 rounded-xl text-sm font-bold transition-all duration-300 whitespace-nowrap ${
                    activeTab === cat 
                      ? "bg-brand-primary text-white shadow-brand" 
                      : "text-brand-text-secondary hover:text-brand-primary hover:bg-brand-accent"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {/* Projects Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-12">
            <AnimatePresence mode="popLayout">
              {filteredProjects.map((project, i) => (
                <motion.div
                  layout
                  key={project.id}
                  initial={{ opacity: 0, y: 40 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.5, delay: i * 0.1, ease: [0.23, 1, 0.32, 1] }}
                  onClick={() => setSelectedProject(project)}
                  className="group relative flex flex-col bg-white rounded-[2.5rem] overflow-hidden border border-brand-border shadow-soft hover:shadow-soft-xl transition-all duration-500 cursor-pointer"
                >
                  {/* Image Container */}
                  <div className="relative aspect-[4/3.2] overflow-hidden">
                    <img 
                      src={project.img} 
                      alt={project.title} 
                      className="w-full h-full object-cover transition-transform duration-1000 ease-out group-hover:scale-110"
                      referrerPolicy="no-referrer"
                      onLoad={(e) => (e.currentTarget.style.opacity = "1")}
                      style={{ opacity: 0, transition: "opacity 0.5s ease-in-out" }}
                    />
                    <div className="absolute inset-0 bg-black/5 group-hover:bg-transparent transition-colors duration-500" />
                    
                    {/* Floating Category Badge */}
                    <div className="absolute top-6 left-6 px-4 py-2 bg-white/90 backdrop-blur-md rounded-xl border border-brand-border shadow-soft z-10">
                      <div className="text-[10px] text-brand-primary font-bold uppercase tracking-widest">{project.category}</div>
                    </div>

                    {/* Hover Action Icon */}
                    <div className="absolute top-6 right-6 w-12 h-12 bg-brand-primary text-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 translate-y-4 group-hover:translate-y-0 transition-all duration-500 shadow-brand">
                      <ArrowUpRight size={24} />
                    </div>
                  </div>

                  {/* Content Container */}
                  <div className="p-8 md:p-10 flex flex-col flex-grow">
                    <div className="text-brand-primary font-bold text-xs uppercase tracking-[0.2em] mb-3">{project.client}</div>
                    <h4 className="text-2xl md:text-3xl font-display font-bold text-brand-text-primary mb-4 leading-tight group-hover:text-brand-primary transition-colors">
                      {project.title}
                    </h4>
                    <p className="text-brand-text-secondary text-sm md:text-base line-clamp-2 mb-6 font-medium leading-relaxed">
                      {project.description}
                    </p>
                    
                    <div className="mt-auto pt-6 border-t border-brand-border flex items-center justify-between">
                      <div className="flex items-center gap-2 text-brand-primary font-bold text-xs uppercase tracking-widest">
                        View Case Study
                      </div>
                      <div className="w-8 h-8 rounded-full bg-brand-accent flex items-center justify-center text-brand-text-secondary group-hover:bg-brand-primary group-hover:text-white transition-colors">
                        <ExternalLink size={14} />
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </div>
      </section>

      {/* Project Modal */}
      <AnimatePresence>
        {selectedProject && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-8">
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setSelectedProject(null)}
                className="absolute inset-0 bg-black/60 backdrop-blur-xl"
              />
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 40 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 40 }}
              transition={{ type: "spring", damping: 30, stiffness: 300 }}
              className="relative bg-white w-full max-w-6xl rounded-[3rem] md:rounded-[4rem] overflow-hidden border border-brand-border shadow-2xl flex flex-col lg:flex-row max-h-[90vh]"
            >
              {/* Close Button */}
              <button 
                onClick={() => setSelectedProject(null)}
                className="absolute top-8 right-8 p-4 bg-white/10 hover:bg-brand-primary text-brand-text-primary hover:text-white rounded-full z-[110] transition-all duration-300 shadow-soft-lg group backdrop-blur-md border border-brand-border"
              >
                <X size={24} className="group-hover:rotate-90 transition-transform" />
              </button>

              {/* Modal Image Side */}
              <div className="lg:w-1/2 relative h-[300px] lg:h-auto overflow-hidden">
                <img 
                  src={selectedProject.img} 
                  alt={selectedProject.title} 
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                
                {/* Image Info Overlay */}
                <div className="absolute bottom-10 left-10 right-10 text-white hidden md:block">
                  <div className="px-4 py-1.5 bg-brand-primary rounded-full text-[10px] font-bold uppercase tracking-widest w-fit mb-4 shadow-brand">
                    {selectedProject.category}
                  </div>
                  <h3 className="text-4xl font-display font-bold leading-tight">{selectedProject.title}</h3>
                </div>
              </div>

              {/* Modal Content Side */}
              <div className="lg:w-1/2 p-8 md:p-12 lg:p-16 overflow-y-auto bg-white custom-scrollbar">
                <div className="max-w-xl mx-auto">
                  <div className="flex items-center gap-4 mb-8">
                    <div className="w-12 h-12 bg-brand-accent rounded-2xl flex items-center justify-center text-brand-primary">
                      <CheckCircle2 size={24} />
                    </div>
                    <div>
                      <div className="text-[10px] text-brand-text-secondary font-bold uppercase tracking-widest opacity-50">Client Partner</div>
                      <div className="text-xl font-bold text-brand-text-primary">{selectedProject.client}</div>
                    </div>
                  </div>

                  <div className="space-y-10">
                    <div>
                      <h5 className="text-xs font-bold text-brand-text-primary uppercase tracking-[0.3em] mb-4 opacity-40">The Challenge</h5>
                      <p className="text-brand-text-secondary leading-relaxed text-lg font-medium">
                        {selectedProject.description}
                      </p>
                    </div>

                    <div className="relative p-10 rounded-[2.5rem] bg-brand-section border border-brand-border overflow-hidden">
                      <div className="absolute top-0 right-0 w-40 h-40 bg-brand-accent blur-3xl -z-10" />
                      <h5 className="text-xs font-bold text-brand-primary uppercase tracking-[0.3em] mb-6">Impact & Results</h5>
                      <div className="text-2xl md:text-3xl font-display font-bold text-brand-text-primary leading-snug tracking-tight">
                        {selectedProject.results}
                      </div>
                    </div>

                    <div className="flex flex-col sm:flex-row gap-4 pt-6">
                      <button className="flex-[2] bg-brand-primary text-white py-5 rounded-2xl font-bold flex items-center justify-center gap-3 hover:bg-brand-primary-hover transition-all shadow-brand group">
                        Live Project Preview <ArrowUpRight size={20} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                      </button>
                      <button 
                        onClick={() => setSelectedProject(null)}
                        className="flex-1 bg-brand-section text-brand-text-primary py-5 rounded-2xl font-bold border border-brand-border hover:bg-brand-border transition-all"
                      >
                        Close
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
