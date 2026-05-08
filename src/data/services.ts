import { Share2, Target, Search, Code, Palette, Zap, Globe, Smartphone, Monitor, Layout, Video, HeartPulse, GraduationCap, ShoppingCart, BarChart3, Star, Users, Info, Briefcase, DollarSign } from "lucide-react";
import React from "react";

export interface Service {
  slug: string;
  title: string;
  category: string;
  shortDesc: string;
  longDesc: string;
  icon: React.ReactNode;
  image?: string;
  features: string[];
  benefits: string[];
  subServices?: { title: string; desc: string }[];
  stats?: { label: string; value: string }[];
  process?: { title: string; desc: string }[];
  faqs?: { question: string; answer: string }[];
}

export const services: Service[] = [
  // Digital Marketing - Branding & Lead Generation
  {
    slug: "seo",
    title: "SEO Optimization",
    category: "Branding & Lead Generation",
    shortDesc: "Rank higher on search engines and drive organic traffic to your business.",
    longDesc: "Be found when it matters most. Our SEO experts optimize your technical foundation and content strategy to ensure you dominate search engine results pages (SERPs) for your most valuable keywords.",
    icon: React.createElement(Search, { className: "w-6 h-6" }),
    image: "https://images.unsplash.com/photo-1571721795195-a2ca2d3370a9?auto=format&fit=crop&q=80&w=800&h=600",
    features: ["Technical SEO Audit", "Keyword Research", "On-Page Optimization", "Backlink Building"],
    benefits: ["Long-term Organic Traffic", "Lower Acquisition Costs", "Brand Authority", "Sustainable Growth"],
    subServices: [
      { title: "Local SEO", desc: "Dominate local search results for your business location." },
      { title: "On-page SEO", desc: "Optimize your website content and structure." },
      { title: "Off-page SEO", desc: "Build high-quality backlinks and authority." },
      { title: "Technical SEO", desc: "Improve site speed, mobile-friendliness, and indexing." }
    ],
    stats: [
      { label: "Organic Growth", value: "300%" },
      { label: "Success Rate", value: "95%" }
    ],
    process: [
      { title: "Audit & Analysis", desc: "We start with a deep dive into your current site performance and competitor landscape." },
      { title: "Strategy Development", desc: "Custom keyword mapping and technical roadmap tailored to your business goals." },
      { title: "Execution & Optimization", desc: "Implementing on-page changes and building high-authority backlinks." },
      { title: "Monitoring & Reporting", desc: "Continuous tracking and monthly deep-dives into your growth metrics." }
    ],
    faqs: [
      { question: "How long does SEO take to show results?", answer: "Typically, you'll start seeing significant movement within 3-6 months, though some technical fixes can show impact sooner." },
      { question: "Do you guarantee #1 rankings?", answer: "No ethical agency can guarantee #1 rankings due to search engine algorithm changes, but we guarantee best-in-class strategies that drive growth." }
    ]
  },
  {
    slug: "smo",
    title: "SMO (Social Media Optimization)",
    category: "Branding & Lead Generation",
    shortDesc: "Optimize your social profiles for maximum visibility and engagement.",
    longDesc: "Social Media Optimization is about making your brand social-ready. We optimize your profiles, content, and strategy to ensure you're getting the most out of every social platform.",
    icon: React.createElement(Share2, { className: "w-6 h-6" }),
    image: "https://images.unsplash.com/photo-1611162617474-5b21e879e113?auto=format&fit=crop&q=80&w=800&h=600",
    features: ["Profile Optimization", "Content Strategy", "Engagement Growth", "Social Listening"],
    benefits: ["Brand Visibility", "Community Growth", "Better Engagement", "Social Proof"],
    process: [
      { title: "Profile Audit", desc: "Reviewing all social touchpoints for brand consistency and optimization." },
      { title: "Audience Research", desc: "Identifying where your ideal customers hang out and what they engage with." },
      { title: "Content Calendar", desc: "Creating a consistent, high-value posting schedule." },
      { title: "Community Management", desc: "Active engagement to build a loyal following." }
    ]
  },
  {
    slug: "local-seo",
    title: "Local SEO",
    category: "Branding & Lead Generation",
    shortDesc: "Get found by customers in your local area with Google My Business optimization.",
    longDesc: "For local businesses, visibility in local search is everything. We help you dominate the 'Map Pack' and local search results to drive foot traffic and local leads.",
    icon: React.createElement(Globe, { className: "w-6 h-6" }),
    image: "https://images.unsplash.com/photo-1526628953301-3e589a6a8b74?auto=format&fit=crop&q=80&w=800&h=600",
    features: ["GMB Management", "Local Citations", "Review Management", "Local Keyword Targeting"],
    benefits: ["More Foot Traffic", "Local Brand Authority", "Higher Local Conversions", "Mobile Visibility"],
    process: [
      { title: "GMB Optimization", desc: "Claiming and fully optimizing your Google My Business profile." },
      { title: "Citation Building", desc: "Ensuring your business info is consistent across all local directories." },
      { title: "Review Strategy", desc: "Implementing systems to gather more positive local reviews." },
      { title: "Local Content", desc: "Creating content that resonates with your local community." }
    ]
  },
  {
    slug: "content-marketing",
    title: "Content Marketing",
    category: "Branding & Lead Generation",
    shortDesc: "Create valuable content that attracts, engages, and converts your audience.",
    longDesc: "Content is king, but strategy is the kingdom. We create high-quality, relevant content that speaks to your audience's pain points and positions you as an industry leader.",
    icon: React.createElement(Layout, { className: "w-6 h-6" }),
    image: "https://images.unsplash.com/photo-1499750310107-5fef28a66643?auto=format&fit=crop&q=80&w=800&h=600",
    features: ["Blog Writing", "Infographics", "Video Content", "Whitepapers & E-books"],
    benefits: ["Thought Leadership", "Lead Nurturing", "SEO Benefits", "Audience Trust"],
    process: [
      { title: "Topic Research", desc: "Identifying the questions your audience is asking." },
      { title: "Content Creation", desc: "Producing high-quality, SEO-optimized assets." },
      { title: "Distribution", desc: "Getting your content in front of the right eyes." },
      { title: "Performance Tracking", desc: "Measuring engagement and conversion rates." }
    ]
  },

  // Digital Marketing - Ads & Lead Generation
  {
    slug: "google-ads",
    title: "Google Ads (PPC)",
    category: "Ads & Lead Generation",
    shortDesc: "Get instant traffic and leads with highly targeted search and display ads.",
    longDesc: "Reach customers exactly when they are searching for your products or services. Our Google Ads experts maximize your ROI through precise targeting and continuous optimization.",
    icon: React.createElement(Target, { className: "w-6 h-6" }),
    image: "https://images.unsplash.com/photo-1533750516457-a7f992034fec?auto=format&fit=crop&q=80&w=800&h=600",
    features: ["Search Ads", "Display Network", "Shopping Ads", "Keyword Bidding"],
    benefits: ["Instant Results", "Highly Targeted", "Measurable ROI", "Scalable Growth"],
    process: [
      { title: "Keyword Research", desc: "Identifying high-intent search terms." },
      { title: "Ad Creation", desc: "Writing compelling copy and designing visual assets." },
      { title: "Campaign Launch", desc: "Setting up tracking and bidding strategies." },
      { title: "Daily Optimization", desc: "A/B testing and budget management for peak ROI." }
    ]
  },
  {
    slug: "fb-ig-ads",
    title: "Facebook & Instagram Ads",
    category: "Ads & Lead Generation",
    shortDesc: "Scale your brand with high-converting social media advertising campaigns.",
    longDesc: "Leverage the power of social data to reach your ideal customers. We create thumb-stopping ads that drive awareness, engagement, and sales on Meta platforms.",
    icon: React.createElement(Smartphone, { className: "w-6 h-6" }),
    image: "https://images.unsplash.com/photo-1611926653458-09294b3142bf?auto=format&fit=crop&q=80&w=800&h=600",
    features: ["Audience Targeting", "Creative Ad Design", "Retargeting", "Conversion Tracking"],
    benefits: ["Massive Reach", "Visual Storytelling", "Detailed Analytics", "Cost-Effective"],
    process: [
      { title: "Audience Building", desc: "Creating lookalike and interest-based segments." },
      { title: "Creative Strategy", desc: "Designing high-impact video and image ads." },
      { title: "Funnel Setup", desc: "Building retargeting sequences for warm leads." },
      { title: "Scale & Optimize", desc: "Increasing budgets on winning creatives." }
    ]
  },
  {
    slug: "youtube-ads",
    title: "YouTube Ads",
    category: "Ads & Lead Generation",
    shortDesc: "Engage your audience with powerful video ads on the world's largest video platform.",
    longDesc: "Video is the most engaging form of content. We help you create and manage YouTube ad campaigns that capture attention and drive action.",
    icon: React.createElement(Video, { className: "w-6 h-6" }),
    image: "https://images.unsplash.com/photo-1557833167-cc3a70e1ca34?auto=format&fit=crop&q=80&w=800&h=600",
    features: ["In-stream Ads", "Discovery Ads", "Video Production", "Audience Segmentation"],
    benefits: ["High Engagement", "Brand Recall", "Visual Impact", "Global Reach"],
    process: [
      { title: "Scripting & Storyboard", desc: "Crafting the narrative that hooks viewers in the first 5 seconds." },
      { title: "Video Production", desc: "High-quality filming or motion graphics creation." },
      { title: "Campaign Targeting", desc: "Setting up custom intent and affinity audiences." },
      { title: "Performance Scaling", desc: "Optimizing for view-through rate and conversions." }
    ]
  },
  {
    slug: "re-engagement",
    title: "User Re-engagement",
    category: "Ads & Lead Generation",
    shortDesc: "Bring back past visitors and convert them into loyal customers.",
    longDesc: "Most visitors don't convert on their first visit. We implement advanced remarketing strategies to stay top-of-mind and bring them back to complete their purchase.",
    icon: React.createElement(Zap, { className: "w-6 h-6" }),
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=800&h=600",
    features: ["Dynamic Remarketing", "Email Retargeting", "Abandoned Cart Recovery", "Behavioral Triggers"],
    benefits: ["Higher Conversion Rates", "Lower CPA", "Customer Loyalty", "Brand Persistence"],
    process: [
      { title: "Pixel Integration", desc: "Setting up advanced tracking to identify visitor behavior." },
      { title: "Segment Creation", desc: "Grouping visitors based on their actions (e.g., cart abandoners)." },
      { title: "Dynamic Ad Setup", desc: "Showing exactly what they looked at to entice them back." },
      { title: "Conversion Optimization", desc: "Fine-tuning the path to purchase for returning users." }
    ]
  },

  // Digital Marketing - Online Reputation
  {
    slug: "influencer-marketing",
    title: "Influencer Marketing",
    category: "Online Reputation",
    shortDesc: "Partner with industry leaders to build trust and reach new audiences.",
    longDesc: "Leverage the trust influencers have built with their followers. We connect you with the right influencers to amplify your brand message authentically.",
    icon: React.createElement(Users, { className: "w-6 h-6" }),
    image: "https://images.unsplash.com/photo-1557833167-cc3a70e1ca34?auto=format&fit=crop&q=80&w=800&h=600",
    features: ["Influencer Discovery", "Campaign Management", "Contract Negotiation", "Performance Tracking"],
    benefits: ["Instant Trust", "Niche Reach", "Authentic Content", "Social Proof"],
    process: [
      { title: "Influencer Matching", desc: "Finding creators whose audience perfectly aligns with your brand." },
      { title: "Strategy & Briefing", desc: "Defining clear goals and creative guidelines for the campaign." },
      { title: "Execution Control", desc: "Managing the rollout and ensuring brand safety." },
      { title: "ROI Measurement", desc: "Tracking sales, traffic, and engagement driven by influencers." }
    ]
  },
  {
    slug: "reviews-management",
    title: "Reviews Management",
    category: "Online Reputation",
    shortDesc: "Build and maintain a positive online reputation through active review management.",
    longDesc: "Your online reputation is your most valuable asset. We help you generate positive reviews and handle feedback professionally to build trust with potential customers.",
    icon: React.createElement(Star, { className: "w-6 h-6" }),
    image: "https://images.unsplash.com/photo-1521791136064-7986c2959213?auto=format&fit=crop&q=80&w=800&h=600",
    features: ["Review Generation", "Response Management", "Reputation Monitoring", "Sentiment Analysis"],
    benefits: ["Higher Trust", "Better Local SEO", "Customer Insights", "Crisis Management"],
    process: [
      { title: "Reputation Audit", desc: "Analyzing your current standing across all major review platforms." },
      { title: "Review Acquisition", desc: "Implementing automated systems to gather genuine customer feedback." },
      { title: "Active Monitoring", desc: "Real-time alerts for new reviews to ensure rapid response." },
      { title: "Sentiment Reporting", desc: "Monthly analysis of customer perception and areas for improvement." }
    ]
  },

  // IT Services
  {
    slug: "web-design",
    title: "Web Design",
    category: "IT Services",
    shortDesc: "Creative and user-centric web designs that captivate your audience.",
    longDesc: "First impressions matter. We design stunning, intuitive websites that reflect your brand identity and provide an exceptional user experience.",
    icon: React.createElement(Palette, { className: "w-6 h-6" }),
    image: "https://images.unsplash.com/photo-1581291518633-83b4ebd1d83e?auto=format&fit=crop&q=80&w=800&h=600",
    features: ["UI/UX Design", "Responsive Design", "Wireframing", "Prototyping"],
    benefits: ["Better User Experience", "Lower Bounce Rates", "Brand Consistency", "Higher Engagement"],
    process: [
      { title: "Discovery & UX Research", desc: "Understanding your users and their journey on your site." },
      { title: "Wireframing", desc: "Building the skeletal structure of your website for optimal flow." },
      { title: "Visual Design", desc: "Creating a stunning, brand-aligned aesthetic." },
      { title: "Interactive Prototyping", desc: "Testing the feel and flow before moving to development." }
    ]
  },
  {
    slug: "web-development",
    title: "Web Development",
    category: "IT Services",
    shortDesc: "Robust and scalable web applications built with modern technologies.",
    longDesc: "We build high-performance websites and web applications using the latest frameworks to ensure speed, security, and scalability.",
    icon: React.createElement(Code, { className: "w-6 h-6" }),
    image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&q=80&w=800&h=600",
    features: ["Full-stack Development", "E-commerce Solutions", "CMS Integration", "API Development"],
    benefits: ["Scalability", "High Performance", "Security", "Custom Functionality"],
    process: [
      { title: "Architecture Planning", desc: "Choosing the right tech stack for your specific needs." },
      { title: "Agile Development", desc: "Building in sprints with regular updates and feedback loops." },
      { title: "QA & Testing", desc: "Rigorous testing for bugs, security, and performance." },
      { title: "Deployment & Support", desc: "Launching your site and providing ongoing maintenance." }
    ]
  },
  {
    slug: "software-development",
    title: "Software Development",
    category: "IT Services",
    shortDesc: "Custom software solutions tailored to your unique business needs.",
    longDesc: "From CRM systems to enterprise resource planning, we develop custom software that streamlines your operations and drives efficiency.",
    icon: React.createElement(Monitor, { className: "w-6 h-6" }),
    features: ["Custom ERP/CRM", "Desktop Applications", "Cloud Solutions", "Legacy Migration"],
    benefits: ["Operational Efficiency", "Competitive Advantage", "Data Centralization", "Process Automation"],
  },
  {
    slug: "app-development",
    title: "App Development",
    category: "IT Services",
    shortDesc: "Native and cross-platform mobile apps that provide a seamless mobile experience.",
    longDesc: "Reach your customers on the go. We develop high-quality mobile applications for iOS and Android that are fast, reliable, and engaging.",
    icon: React.createElement(Smartphone, { className: "w-6 h-6" }),
    image: "https://images.unsplash.com/photo-1551650975-87deedd944c3?auto=format&fit=crop&q=80&w=800&h=600",
    features: ["iOS & Android Apps", "React Native / Flutter", "App Store Optimization", "Mobile Backend"],
    benefits: ["Direct Customer Channel", "Enhanced Engagement", "Offline Access", "Brand Loyalty"],
    process: [
      { title: "Mobile Strategy", desc: "Defining the core features and user journey for mobile." },
      { title: "UI/UX Design", desc: "Creating a mobile-first interface that's intuitive and fast." },
      { title: "App Development", desc: "Coding for iOS and Android using modern frameworks." },
      { title: "Store Submission", desc: "Managing the complex process of App Store and Play Store launch." }
    ]
  },

  // Graphics Services
  {
    slug: "graphic-design",
    title: "Graphic Design",
    category: "Graphics Services",
    shortDesc: "Visual communication that tells your brand story effectively.",
    longDesc: "From logos to marketing collateral, our graphic design services ensure your brand looks professional and stands out in the market.",
    icon: React.createElement(Palette, { className: "w-6 h-6" }),
    features: ["Logo Design", "Social Media Graphics", "Print Design", "Brand Identity"],
    benefits: ["Professional Look", "Brand Recognition", "Effective Communication", "Visual Appeal"],
  },
  {
    slug: "video-editing",
    title: "Video Editing",
    category: "Graphics Services",
    shortDesc: "Professional video editing that brings your stories to life.",
    longDesc: "We transform raw footage into compelling stories. Our video editing services cover everything from social media shorts to corporate presentations.",
    icon: React.createElement(Video, { className: "w-6 h-6" }),
    features: ["Color Grading", "Motion Graphics", "Sound Design", "VFX"],
    benefits: ["High Engagement", "Professional Quality", "Storytelling Impact", "Multi-platform Content"],
  },

  // Industries
  {
    slug: "healthcare",
    title: "Healthcare",
    category: "Industries",
    shortDesc: "Digital solutions for hospitals, clinics, and healthcare providers.",
    longDesc: "We help healthcare providers reach more patients and provide better service through targeted digital marketing and specialized IT solutions.",
    icon: React.createElement(HeartPulse, { className: "w-6 h-6" }),
    features: ["Patient Acquisition", "Healthcare SEO", "Telemedicine Solutions", "HIPAA Compliance"],
    benefits: ["More Patients", "Better Reputation", "Streamlined Operations", "Patient Trust"],
  },
  {
    slug: "education",
    title: "Education",
    category: "Industries",
    shortDesc: "Marketing and IT services for schools, colleges, and EdTech platforms.",
    longDesc: "Reach students and parents effectively. We provide comprehensive digital strategies for educational institutions to grow their enrollment and engagement.",
    icon: React.createElement(GraduationCap, { className: "w-6 h-6" }),
    features: ["Student Enrollment", "LMS Development", "Education SEO", "Social Media for Schools"],
    benefits: ["Higher Enrollment", "Brand Authority", "Student Engagement", "Modern Learning Experience"],
  },
  {
    slug: "ecommerce",
    title: "E-commerce",
    category: "Industries",
    shortDesc: "Scale your online store with performance marketing and robust IT solutions.",
    longDesc: "We help e-commerce brands grow their sales through data-driven marketing and high-performance online stores.",
    icon: React.createElement(ShoppingCart, { className: "w-6 h-6" }),
    features: ["Conversion Optimization", "E-commerce Ads", "Store Development", "Inventory Management"],
    benefits: ["Higher Sales", "Better ROI", "Scalable Growth", "Customer Retention"],
  }
];

export const megaMenuData = [
  {
    title: "Digital Marketing",
    categories: [
      {
        name: "Branding & Lead Generation",
        items: services.filter(s => s.category === "Branding & Lead Generation")
      },
      {
        name: "Ads & Lead Generation",
        items: services.filter(s => s.category === "Ads & Lead Generation")
      },
      {
        name: "Online Reputation",
        items: services.filter(s => s.category === "Online Reputation")
      }
    ]
  },
  {
    title: "IT Services",
    items: services.filter(s => s.category === "IT Services")
  },
  {
    title: "Graphics Services",
    items: services.filter(s => s.category === "Graphics Services")
  },
  {
    title: "Industries",
    items: services.filter(s => s.category === "Industries")
  }
];
