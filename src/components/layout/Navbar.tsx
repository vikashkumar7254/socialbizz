import { motion, AnimatePresence } from "motion/react";
import { Menu, X, MessageCircle, ChevronDown, Phone } from "lucide-react";
import { useState, useEffect, useRef } from "react";
import { Link, useLocation } from "react-router-dom";
import { megaMenuData } from "../../data/services";

const brandLogo = "/Social%20Bizz%20Logo-01.png";
const navbarMenus = megaMenuData.filter((menu) => menu.title !== "Industries");

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeMenu, setActiveMenu] = useState<string | null>(null);
  const location = useLocation();
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setActiveMenu(null);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    setActiveMenu(null);
    setIsOpen(false);
  }, [location]);

  const navLinks = [
    { name: "About", href: "/about" },
  ];

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? "py-2" : "py-2 md:py-3"}`}>
      <div className="max-w-7xl mx-auto px-3 sm:px-4 md:px-6" ref={menuRef}>
        <div className={`flex items-center justify-between bg-white/90 backdrop-blur-xl px-3 sm:px-4 md:px-5 py-2 rounded-xl md:rounded-2xl transition-all duration-300 border ${scrolled ? "shadow-soft-lg border-brand-border" : "shadow-soft border-brand-border/60"}`}>
          <Link to="/" className="flex items-center gap-2">
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="flex items-center gap-2 md:gap-3"
            >
              <img
                src={brandLogo}
                alt="SocialBizz"
                className="block h-9 w-auto max-w-[150px] object-contain sm:h-10 md:h-12 md:max-w-[220px]"
              />
            </motion.div>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden lg:flex items-center gap-5 xl:gap-6">
            {navbarMenus.map((menu) => (
              <div 
                key={menu.title}
                className="relative group"
                onMouseEnter={() => setActiveMenu(menu.title)}
              >
                <button 
                  className={`flex items-center gap-1 rounded-full px-2.5 py-2 text-sm font-semibold transition-colors ${activeMenu === menu.title ? "bg-brand-accent text-brand-primary" : "text-brand-text-secondary hover:bg-brand-section hover:text-brand-primary"}`}
                >
                  {menu.title}
                  <ChevronDown size={14} className={`transition-transform duration-300 ${activeMenu === menu.title ? "rotate-180" : ""}`} />
                </button>

                <AnimatePresence>
                  {activeMenu === menu.title && (
                    <motion.div
                      initial={{ opacity: 0, y: 10, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 10, scale: 0.95 }}
                      transition={{ duration: 0.2 }}
                      className="absolute top-full left-1/2 -translate-x-1/2 pt-4 w-[600px] xl:w-[800px]"
                    >
                      <div className="bg-white rounded-2xl shadow-soft-xl border border-brand-border p-8 grid grid-cols-12 gap-8">
                        {menu.categories ? (
                          menu.categories.map((cat) => (
                            <div key={cat.name} className="col-span-4">
                              <h5 className="text-[10px] uppercase tracking-widest text-brand-text-secondary font-bold mb-4 opacity-50">{cat.name}</h5>
                              <div className="space-y-4">
                                {cat.items.map((item) => (
                                  <Link 
                                    key={item.slug} 
                                    to={`/services/${item.slug}`}
                                    className="group/item flex items-start gap-3 p-2 -m-2 rounded-xl hover:bg-brand-section transition-all"
                                  >
                                    <div className="p-2 bg-brand-accent rounded-lg text-brand-primary group-hover/item:scale-110 transition-transform">
                                      {item.icon}
                                    </div>
                                    <div>
                                      <div className="text-xs font-bold text-brand-text-primary group-hover/item:text-brand-primary transition-colors">{item.title}</div>
                                      <div className="text-[10px] text-brand-text-secondary line-clamp-1">{item.shortDesc}</div>
                                    </div>
                                  </Link>
                                ))}
                              </div>
                            </div>
                          ))
                        ) : (
                          <div className="col-span-12 grid grid-cols-2 gap-6">
                            {menu.items?.map((item) => (
                              <Link 
                                key={item.slug} 
                                to={`/services/${item.slug}`}
                                className="group/item flex items-start gap-4 p-3 rounded-xl hover:bg-brand-section transition-all border border-transparent hover:border-brand-accent"
                              >
                                <div className="p-3 bg-brand-accent rounded-xl text-brand-primary group-hover/item:scale-110 transition-transform">
                                  {item.icon}
                                </div>
                                <div>
                                  <div className="text-sm font-bold text-brand-text-primary group-hover/item:text-brand-primary transition-colors">{item.title}</div>
                                  <div className="text-xs text-brand-text-secondary mt-1">{item.shortDesc}</div>
                                </div>
                              </Link>
                            ))}
                          </div>
                        )}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}

            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.href}
                className={`rounded-full px-2.5 py-2 text-sm font-semibold transition-colors ${location.pathname === link.href ? "bg-brand-accent text-brand-primary" : "text-brand-text-secondary hover:bg-brand-section hover:text-brand-primary"}`}
              >
                {link.name}
              </Link>
            ))}
          </div>

          {/* Mobile Toggle */}
          <button className="lg:hidden text-brand-text-primary p-2 rounded-full hover:bg-brand-section transition-colors" onClick={() => setIsOpen(!isOpen)} aria-label="Toggle menu">
            {isOpen ? <X /> : <Menu />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden absolute top-[72px] left-3 right-3 sm:left-4 sm:right-4 bg-white/95 backdrop-blur-xl p-4 rounded-2xl flex flex-col gap-1 z-50 shadow-soft-lg border border-brand-border overflow-hidden"
          >
            {navbarMenus.map((menu) => (
              <div key={menu.title} className="space-y-1">
                <button 
                  onClick={() => setActiveMenu(activeMenu === menu.title ? null : menu.title)}
                  className="w-full flex items-center justify-between text-base font-bold text-brand-text-primary p-2"
                >
                  {menu.title}
                  <ChevronDown size={16} className={`transition-transform ${activeMenu === menu.title ? "rotate-180" : ""}`} />
                </button>
                
                <AnimatePresence>
                  {activeMenu === menu.title && (
                    <motion.div 
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      className="pl-4 space-y-3 overflow-hidden"
                    >
                      {menu.categories ? (
                        menu.categories.map(cat => (
                          <div key={cat.name} className="space-y-1">
                            <div className="text-[8px] uppercase tracking-widest text-brand-primary font-bold opacity-70">{cat.name}</div>
                            <div className="grid grid-cols-1 gap-1">
                              {cat.items.map(item => (
                                <Link key={item.slug} to={`/services/${item.slug}`} className="text-sm text-brand-text-secondary p-1.5 hover:text-brand-primary">{item.title}</Link>
                              ))}
                            </div>
                          </div>
                        ))
                      ) : (
                        <div className="grid grid-cols-1 gap-1">
                          {menu.items?.map(item => (
                            <Link key={item.slug} to={`/services/${item.slug}`} className="text-sm text-brand-text-secondary p-1.5 hover:text-brand-primary">{item.title}</Link>
                          ))}
                        </div>
                      )}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}

            {navLinks.map((link) => (
              <Link key={link.name} to={link.href} className="text-base font-bold text-brand-text-primary p-2">{link.name}</Link>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating Action Buttons (Left Side) */}
      <div className="fixed bottom-6 left-6 z-50 flex flex-col gap-3">
        <motion.a
          href="https://wa.me/918901509290"
          target="_blank"
          rel="noreferrer"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          whileHover={{ scale: 1.1 }}
          className="w-12 h-12 bg-[#25D366] text-white rounded-full flex items-center justify-center shadow-lg transition-transform"
        >
          <MessageCircle size={24} fill="currentColor" />
        </motion.a>
        <motion.a
          href="tel:+918901509290"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          whileHover={{ scale: 1.1 }}
          className="w-12 h-12 bg-brand-primary text-white rounded-full flex items-center justify-center shadow-lg transition-transform"
        >
          <Phone size={22} fill="currentColor" />
        </motion.a>
      </div>
    </nav>
  );
}
