export interface Project {
  id: number;
  title: string;
  category: "Ads" | "SEO" | "Web Design";
  img: string;
  description: string;
  results: string;
  client: string;
}

export const projects: Project[] = [
  { 
    id: 1,
    title: "Luxury Real Estate Lead Gen", 
    category: "Ads", 
    client: "DLF Premium Residency",
    img: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&q=80&w=1000&h=800",
    description: "Targeted Meta & Google Ads campaign for high-net-worth individuals in Delhi NCR. We focused on hyper-local targeting and premium ad creatives to drive high-quality leads for luxury apartment bookings.",
    results: "450+ Qualified Leads, ₹12Cr+ Pipeline Value, 4.2x ROAS.",
  },
  { 
    id: 2,
    title: "Healthcare Portal SEO", 
    category: "SEO", 
    client: "MaxHealth Diagnostics",
    img: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&q=80&w=1000&h=800",
    description: "Comprehensive SEO strategy focusing on local search terms and medical service keywords across Delhi. We optimized the site architecture and implemented a content-first approach to dominate search results.",
    results: "Ranked #1 for 45+ Keywords, 180% Organic Traffic Growth.",
  },
  { 
    id: 3,
    title: "Fashion E-commerce Platform", 
    category: "Web Design", 
    client: "Vastra Boutique",
    img: "https://images.unsplash.com/photo-1441984904996-e0b6ba687e12?auto=format&fit=crop&q=80&w=1000&h=800",
    description: "Modern, mobile-first Shopify store design with high-conversion product pages and seamless checkout. The design reflects the brand's premium identity while ensuring a fast, frictionless shopping experience.",
    results: "35% Increase in Conversion Rate, Sub-2s Load Time.",
  },
  { 
    id: 4,
    title: "Education Sector PPC", 
    category: "Ads", 
    client: "Bright Future Academy",
    img: "https://images.unsplash.com/photo-1524178232363-1fb2b075b655?auto=format&fit=crop&q=80&w=1000&h=800",
    description: "Aggressive Google Search Ads campaign for admission season targeting students in West Delhi. We used advanced bidding strategies and highly relevant ad copy to capture intent-driven traffic.",
    results: "1200+ Admissions Inquiries, 30% Lower Cost-per-Lead.",
  },
  { 
    id: 5,
    title: "Local Retail SEO", 
    category: "SEO", 
    client: "Delhi Electronics Hub",
    img: "https://images.unsplash.com/photo-1491933382434-500287f9b54b?auto=format&fit=crop&q=80&w=1000&h=800",
    description: "GMB optimization and local citation building to dominate 'electronics store near me' searches. We focused on building local authority and improving the store's digital footprint across Delhi NCR.",
    results: "Top 3 Map Pack Placement, 250% Increase in Store Visits.",
  },
  { 
    id: 6,
    title: "SaaS Corporate Website", 
    category: "Web Design", 
    client: "TechFlow Solutions",
    img: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=1000&h=800",
    description: "Professional B2B website with interactive product demos and lead capture integration. The site was built to communicate complex technical solutions through a clean, intuitive user interface.",
    results: "50% More Demo Requests, Award-winning UI/UX Design.",
  },
];
