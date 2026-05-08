import React from "react";
import { motion } from "motion/react";

const platforms = [
  {
    name: "Google",
    logo: "https://www.vectorlogo.zone/logos/google/google-icon.svg",
  },
  {
    name: "Twitter",
    logo: "https://www.vectorlogo.zone/logos/twitter/twitter-tile.svg",
  },
  {
    name: "Youtube",
    logo: "https://www.vectorlogo.zone/logos/youtube/youtube-icon.svg",
  },
  {
    name: "Linkedin",
    logo: "https://www.vectorlogo.zone/logos/linkedin/linkedin-icon.svg",
  },
  {
    name: "Instagram",
    logo: "https://www.vectorlogo.zone/logos/instagram/instagram-icon.svg",
  },
  {
    name: "Whatsapp",
    logo: "https://www.vectorlogo.zone/logos/whatsapp/whatsapp-tile.svg",
  },
  {
    name: "Facebook",
    logo: "https://www.vectorlogo.zone/logos/facebook/facebook-tile.svg",
  },
  {
    name: "GitHub",
    logo: "https://www.vectorlogo.zone/logos/github/github-icon.svg",
  },
  {
    name: "TikTok",
    logo: "https://www.vectorlogo.zone/logos/tiktok/tiktok-icon.svg",
  },
  {
    name: "Snapchat",
    logo: "https://www.vectorlogo.zone/logos/snapchat/snapchat-icon.svg",
  },
  {
    name: "Pinterest",
    logo: "https://www.vectorlogo.zone/logos/pinterest/pinterest-icon.svg",
  },
  {
    name: "Reddit",
    logo: "https://www.vectorlogo.zone/logos/reddit/reddit-icon.svg",
  },
  {
    name: "Telegram",
    logo: "https://www.vectorlogo.zone/logos/telegram/telegram-icon.svg",
  },
  {
    name: "Discord",
    logo: "https://www.vectorlogo.zone/logos/discordapp/discordapp-icon.svg",
  },
  {
    name: "Quora",
    logo: "https://www.vectorlogo.zone/logos/quora/quora-icon.svg",
  },
  {
    name: "Twitch",
    logo: "https://www.vectorlogo.zone/logos/twitch/twitch-icon.svg",
  }
];

const PlatformScroller: React.FC = () => {
  return (
    <section className="premium-section py-8 md:py-10 bg-brand-section overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 mb-6 md:mb-8 text-center">
        <div className="inline-flex items-center px-3 py-1 rounded-full bg-brand-accent text-brand-primary text-[9px] font-bold uppercase tracking-widest mb-3 border border-brand-border">
          Online Channels We Worked On
        </div>
        <h2 className="text-xl md:text-2xl font-display font-bold text-brand-text-primary leading-tight">
          Top Platforms Where We <span className="text-brand-primary">Promote</span> Your Business
        </h2>
      </div>

      <div className="relative flex overflow-x-hidden">
        <motion.div
          animate={{ x: ["0%", "-50%"] }}
          transition={{
            duration: 60,
            ease: "linear",
            repeat: Infinity,
          }}
          className="flex whitespace-nowrap gap-8 md:gap-14 items-center py-4"
        >
          {[...platforms, ...platforms].map((platform, index) => (
            <div
              key={index}
              className="flex flex-col items-center gap-3 group"
            >
              <div className="w-12 h-12 md:w-16 md:h-16 bg-white rounded-xl md:rounded-2xl shadow-soft flex items-center justify-center p-3 md:p-4 group-hover:shadow-soft-lg transition-all duration-500 group-hover:-translate-y-1.5 border border-brand-border premium-card">
                <img
                  src={platform.logo}
                  alt={platform.name}
                  className="w-full h-full object-contain transition-all duration-500"
                  referrerPolicy="no-referrer"
                  loading="lazy"
                  decoding="async"
                />
              </div>
              <span className="text-[10px] md:text-xs font-bold text-brand-text-primary group-hover:text-brand-primary transition-colors">
                {platform.name}
              </span>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default PlatformScroller;
