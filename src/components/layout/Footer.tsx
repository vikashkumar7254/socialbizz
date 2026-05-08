import { Mail, MapPin, Phone, Instagram, Twitter, Linkedin, Facebook, Send, Youtube, Globe, MessageCircle } from "lucide-react";
import { Link } from "react-router-dom";

const logoMark = "/Social%20Bizz%20Logo-06.png";
const brandLogo = "/Social%20Bizz%20Logo-01.png";

export default function Footer() {
  return (
    <footer className="bg-white text-brand-text-primary overflow-hidden relative border-t border-brand-border">
      {/* Newsletter Section */}
      <div className="border-b border-brand-border py-6 md:py-8 bg-brand-section">
        <div className="max-w-7xl mx-auto px-4 md:px-6">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-6 md:gap-8">
            <div className="max-w-xl text-center lg:text-left">
              <h3 className="text-xl md:text-2xl font-display font-bold mb-1 text-brand-text-primary">
                Subscribe to Our Newsletter
              </h3>
              <p className="text-brand-text-secondary text-xs md:text-sm">
                Stay updated with the latest digital marketing trends, tips, and exclusive offers.
              </p>
            </div>
            <form className="w-full max-w-md flex flex-col sm:flex-row gap-0 shadow-sm rounded-lg overflow-hidden border border-brand-border" onSubmit={(e) => e.preventDefault()}>
              <div className="flex-1 relative">
                <div className="absolute left-3 top-1/2 -translate-y-1/2 w-8 h-8 flex items-center justify-center">
                  <Mail className="text-brand-text-secondary opacity-40" size={16} />
                </div>
                <input 
                  type="email" 
                  placeholder="Enter your email address" 
                  className="w-full bg-white border-none px-10 py-2.5 text-xs md:text-sm text-brand-text-primary focus:outline-none transition-all"
                  required
                />
              </div>
              <button className="bg-brand-primary text-white px-6 py-2.5 font-bold hover:bg-brand-primary-hover transition-all flex items-center justify-center gap-2 group text-xs md:text-sm shrink-0">
                Subscribe
                <Send size={14} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
              </button>
            </form>
          </div>
        </div>
      </div>

      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-4 md:px-6 py-8 md:py-12">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-x-6 gap-y-10 md:gap-10">
          {/* Company Info */}
          <div className="space-y-6">
            <Link to="/" className="flex items-center gap-3">
              <img
                src={logoMark}
                alt="SocialBizz logo"
                className="h-11 w-11 object-contain shrink-0"
              />
              <img
                src={brandLogo}
                alt="SocialBizz Technologies"
                className="h-10 w-auto max-w-[170px] object-contain"
              />
            </Link>
            
            <div className="space-y-3">
              <div className="flex gap-3 items-start group">
                <div className="w-9 h-9 rounded-lg bg-brand-accent flex items-center justify-center shrink-0 border border-brand-border group-hover:bg-brand-primary group-hover:text-white transition-colors">
                  <MapPin className="text-brand-primary group-hover:text-white" size={14} />
                </div>
                <p className="text-brand-text-secondary text-xs leading-relaxed pt-1">
                  Office 17, 81, Block A, Sector 4, Noida, UP 201301
                </p>
              </div>
              <div className="flex gap-3 items-start group">
                <div className="w-9 h-9 rounded-lg bg-brand-accent flex items-center justify-center shrink-0 border border-brand-border group-hover:bg-brand-primary group-hover:text-white transition-colors">
                  <Mail className="text-brand-primary group-hover:text-white" size={14} />
                </div>
                <a href="mailto:socialbizz.in@gmail.com" className="text-brand-text-secondary text-xs hover:text-brand-primary transition-colors pt-2">
                  socialbizz.in@gmail.com
                </a>
              </div>
              <div className="flex gap-3 items-start group">
                <div className="w-9 h-9 rounded-lg bg-brand-accent flex items-center justify-center shrink-0 border border-brand-border group-hover:bg-brand-primary group-hover:text-white transition-colors">
                  <Phone className="text-brand-primary group-hover:text-white" size={14} />
                </div>
                <a href="tel:+918901509290" className="text-brand-text-secondary text-xs hover:text-brand-primary transition-colors pt-2">
                  +91 89015 09290
                </a>
              </div>
            </div>

            <div className="flex flex-wrap gap-2">
              {[Facebook, Twitter, Instagram, Linkedin, Globe, Youtube].map((Icon, i) => (
                <a key={i} href="#" className="w-8 h-8 rounded-lg bg-white flex items-center justify-center text-brand-text-secondary hover:text-white hover:bg-brand-primary border border-brand-border hover:border-brand-primary transition-all duration-300 shadow-sm">
                  <Icon size={12} />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-6">
            <div className="relative">
              <h4 className="font-display font-bold text-xs tracking-widest text-brand-text-primary uppercase">
                Quick Links
              </h4>
              <div className="absolute -bottom-2 left-0 w-8 h-0.5 bg-brand-primary"></div>
            </div>
            <ul className="space-y-2.5 text-brand-text-secondary text-xs pt-2">
              <li><Link to="/" className="hover:text-brand-primary transition-colors">Home</Link></li>
              <li><Link to="/about" className="hover:text-brand-primary transition-colors">About Us</Link></li>
              <li><Link to="/contact" className="hover:text-brand-primary transition-colors">Contact Us</Link></li>
              <li><Link to="/blogs" className="hover:text-brand-primary transition-colors">Blogs</Link></li>
              <li><Link to="/careers" className="hover:text-brand-primary transition-colors">Career Positions</Link></li>
            </ul>
          </div>

          {/* Services 1 */}
          <div className="space-y-6">
            <div className="relative">
              <h4 className="font-display font-bold text-xs tracking-widest text-brand-text-primary uppercase">
                Digital Marketing Services
              </h4>
              <div className="absolute -bottom-2 left-0 w-8 h-0.5 bg-brand-primary"></div>
            </div>
            <ul className="space-y-2.5 text-brand-text-secondary text-xs pt-2">
              <li><Link to="/services/seo" className="hover:text-brand-primary transition-colors">SEO</Link></li>
              <li><Link to="/services/smo" className="hover:text-brand-primary transition-colors">SMO</Link></li>
              <li><Link to="/services/local-seo" className="hover:text-brand-primary transition-colors">Local SEO</Link></li>
              <li><Link to="/services/content-marketing" className="hover:text-brand-primary transition-colors">Content Marketing</Link></li>
            </ul>
          </div>

          {/* Services 2 */}
          <div className="space-y-6">
            <div className="relative">
              <h4 className="font-display font-bold text-xs tracking-widest text-brand-text-primary uppercase">
                Ads and Lead Generation
              </h4>
              <div className="absolute -bottom-2 left-0 w-8 h-0.5 bg-brand-primary"></div>
            </div>
            <ul className="space-y-2.5 text-brand-text-secondary text-xs pt-2">
              <li><Link to="/services/re-engagement" className="hover:text-brand-primary transition-colors">User Re-engagement</Link></li>
              <li><Link to="/services/google-ads" className="hover:text-brand-primary transition-colors">Google Ads (PPC)</Link></li>
              <li><Link to="/services/youtube-ads" className="hover:text-brand-primary transition-colors">YouTube Ads</Link></li>
              <li><Link to="/services/facebook-ads" className="hover:text-brand-primary transition-colors">Facebook and Instagram Ads</Link></li>
            </ul>
          </div>
        </div>

        {/* Second Row of Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-x-6 gap-y-10 md:gap-12 mt-10 md:mt-16">
          <div className="space-y-6">
            <div className="relative">
              <h4 className="font-display font-bold text-xs tracking-widest text-brand-text-primary uppercase">
                Online Reputation Management
              </h4>
              <div className="absolute -bottom-2 left-0 w-8 h-0.5 bg-brand-primary"></div>
            </div>
            <ul className="space-y-2.5 text-brand-text-secondary text-xs pt-2">
              <li><Link to="/services/orm" className="hover:text-brand-primary transition-colors">Online Reputation Management</Link></li>
              <li><Link to="/services/influencer-marketing" className="hover:text-brand-primary transition-colors">Influencer Marketing</Link></li>
              <li><Link to="/services/reviews-management" className="hover:text-brand-primary transition-colors">Reviews Management</Link></li>
              <li><Link to="/services/pr-marketing" className="hover:text-brand-primary transition-colors">PR Marketing</Link></li>
            </ul>
          </div>

          <div className="space-y-6">
            <div className="relative">
              <h4 className="font-display font-bold text-xs tracking-widest text-brand-text-primary uppercase">
                Our IT Services
              </h4>
              <div className="absolute -bottom-2 left-0 w-8 h-0.5 bg-brand-primary"></div>
            </div>
            <ul className="space-y-2.5 text-brand-text-secondary text-xs pt-2">
              <li><Link to="/services/web-design" className="hover:text-brand-primary transition-colors">Web Design</Link></li>
              <li><Link to="/services/web-development" className="hover:text-brand-primary transition-colors">Web Development</Link></li>
              <li><Link to="/services/software-development" className="hover:text-brand-primary transition-colors">Software Development</Link></li>
              <li><Link to="/services/app-development" className="hover:text-brand-primary transition-colors">App Development</Link></li>
            </ul>
          </div>

          <div className="space-y-6">
            <div className="relative">
              <h4 className="font-display font-bold text-xs tracking-widest text-brand-text-primary uppercase">
                Graphic Solutions
              </h4>
              <div className="absolute -bottom-2 left-0 w-8 h-0.5 bg-brand-primary"></div>
            </div>
            <ul className="space-y-2.5 text-brand-text-secondary text-xs pt-2">
              <li><Link to="/services/graphic-design" className="hover:text-brand-primary transition-colors">Graphics Services</Link></li>
              <li><Link to="/services/video-editing" className="hover:text-brand-primary transition-colors">Video Editing</Link></li>
            </ul>
          </div>

          <div className="space-y-6">
            <div className="relative">
              <h4 className="font-display font-bold text-xs tracking-widest text-brand-text-primary uppercase">
                Industries We Serve
              </h4>
              <div className="absolute -bottom-2 left-0 w-8 h-0.5 bg-brand-primary"></div>
            </div>
            <ul className="space-y-2.5 text-brand-text-secondary text-xs pt-2">
              <li><Link to="/industries" className="hover:text-brand-primary transition-colors">Industries</Link></li>
              <li><Link to="/industries/healthcare" className="hover:text-brand-primary transition-colors">Healthcare</Link></li>
              <li><Link to="/industries/education" className="hover:text-brand-primary transition-colors">Education</Link></li>
              <li><Link to="/industries/ecommerce" className="hover:text-brand-primary transition-colors">E-commerce</Link></li>
            </ul>
          </div>
        </div>

      {/* Bottom Bar */}
        <div className="mt-10 pt-6 border-t border-brand-border flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="text-brand-text-secondary text-[11px]">
            © 2026 Socialbizz.in. All rights reserved.
          </div>
          <div className="flex flex-wrap justify-center gap-6 text-brand-text-secondary text-[10px] font-bold uppercase tracking-widest">
            <Link to="/privacy-policy" className="hover:text-brand-primary transition-colors">Privacy Policy</Link>
            <Link to="/terms-of-service" className="hover:text-brand-primary transition-colors">Terms of Service</Link>
            <Link to="/refund-policy" className="hover:text-brand-primary transition-colors">Refund Policy</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
