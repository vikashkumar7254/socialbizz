import React from "react";
import { TrendingUp, Users, Target, BarChart3 } from "lucide-react";

export interface CaseStudy {
  slug: string;
  title: string;
  clientName: string;
  category: string;
  tagline: string;
  description: string;
  problem: string;
  solution: string;
  results: {
    label: string;
    value: string;
    icon: React.ReactNode;
  }[];
  image: string;
  mockupImage: string;
}

export const caseStudies: CaseStudy[] = [
  {
    slug: "dental-care-plus",
    title: "Dental Care Plus",
    clientName: "Dental Care Plus",
    category: "Healthcare",
    tagline: "Revolutionizing Patient Acquisition in the Digital Age",
    description: "Improved ROI and patient acquisition through targeted local SEO and performance ads.",
    problem: "Dental Care Plus was struggling with a high cost-per-acquisition and low visibility in local search results.",
    solution: "We implemented a hyper-local SEO strategy combined with high-converting Google Search Ads targeting specific dental procedures.",
    results: [
      { label: "ROI Increase", value: "300%", icon: React.createElement(TrendingUp, { size: 20 }) },
      { label: "Patient Growth", value: "150%", icon: React.createElement(Users, { size: 20 }) },
      { label: "Lower CPA", value: "45%", icon: React.createElement(Target, { size: 20 }) }
    ],
    image: "https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?auto=format&fit=crop&q=80&w=800&h=600",
    mockupImage: "https://images.unsplash.com/photo-1629909613654-28e377c37b09?auto=format&fit=crop&q=80&w=1200&h=800"
  },
  {
    slug: "ecommerce-growth",
    title: "E-commerce Growth",
    clientName: "Luxe Fashion Hub",
    category: "E-commerce",
    tagline: "Scaling a Boutique Brand to Global Markets",
    description: "Boosted online sales and brand recognition through social media advertising and influencer partnerships.",
    problem: "Luxe Fashion Hub had a great product but lacked the digital reach to scale beyond their local region.",
    solution: "We launched a multi-channel social media ad campaign on Instagram and Facebook, paired with a strategic influencer marketing program.",
    results: [
      { label: "Revenue Growth", value: "200%", icon: React.createElement(BarChart3, { size: 20 }) },
      { label: "Ad Spend ROI", value: "5.5X", icon: React.createElement(TrendingUp, { size: 20 }) },
      { label: "New Customers", value: "12K+", icon: React.createElement(Users, { size: 20 }) }
    ],
    image: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&q=80&w=800&h=600",
    mockupImage: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&q=80&w=1200&h=800"
  },
  {
    slug: "real-estate-leads",
    title: "Real Estate Leads",
    clientName: "Skyline Properties",
    category: "Real Estate",
    tagline: "Dominating the Luxury Property Market",
    description: "Generated high-quality leads for luxury apartments through targeted LinkedIn and Google Ads.",
    problem: "Skyline Properties was getting plenty of inquiries, but most were not qualified for their luxury price point.",
    solution: "We implemented a strict lead qualification funnel using LinkedIn lead gen forms and high-intent Google Search keywords.",
    results: [
      { label: "Qualified Leads", value: "450+", icon: React.createElement(Users, { size: 20 }) },
      { label: "Conversion Rate", value: "12%", icon: React.createElement(Target, { size: 20 }) },
      { label: "Sales Value", value: "$15M+", icon: React.createElement(BarChart3, { size: 20 }) }
    ],
    image: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&q=80&w=800&h=600",
    mockupImage: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&q=80&w=1200&h=800"
  },
  {
    slug: "fintech-revolution",
    title: "Fintech Revolution",
    clientName: "SecurePay Global",
    category: "Fintech",
    tagline: "Securing the Future of Digital Payments",
    description: "Increased user trust and transaction volume through strategic brand positioning and security-focused marketing.",
    problem: "SecurePay was struggling with user trust in a crowded market, leading to low conversion rates.",
    solution: "We created a trust-centric marketing campaign highlighting their advanced encryption and 24/7 fraud monitoring.",
    results: [
      { label: "User Trust", value: "95%", icon: React.createElement(Target, { size: 20 }) },
      { label: "Transactions", value: "300%", icon: React.createElement(TrendingUp, { size: 20 }) },
      { label: "Market Share", value: "+15%", icon: React.createElement(BarChart3, { size: 20 }) }
    ],
    image: "https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&q=80&w=800&h=600",
    mockupImage: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=1200&h=800"
  },
  {
    slug: "fitness-app-scaling",
    title: "Fitness App Scaling",
    clientName: "FitLife Pro",
    category: "Fitness",
    tagline: "Building a Global Community of Athletes",
    description: "Scaled app downloads and subscription retention through community-driven social media campaigns.",
    problem: "FitLife Pro had high initial downloads but poor long-term retention and low subscription conversion.",
    solution: "We implemented a community-focused content strategy and a referral program that incentivized long-term engagement.",
    results: [
      { label: "Retention", value: "+45%", icon: React.createElement(TrendingUp, { size: 20 }) },
      { label: "Downloads", value: "100K+", icon: React.createElement(Users, { size: 20 }) },
      { label: "Revenue", value: "2.5X", icon: React.createElement(BarChart3, { size: 20 }) }
    ],
    image: "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?auto=format&fit=crop&q=80&w=800&h=600",
    mockupImage: "https://images.unsplash.com/photo-1510017803434-a899398421b3?auto=format&fit=crop&q=80&w=1200&h=800"
  },
  {
    slug: "hospitality-booking",
    title: "Hospitality Booking",
    clientName: "Grand Vista Resorts",
    category: "Hospitality",
    tagline: "Maximizing Direct Bookings and Guest Loyalty",
    description: "Reduced reliance on third-party booking sites and increased direct revenue through targeted search and social ads.",
    problem: "Grand Vista was paying excessive commissions to OTAs, significantly eating into their profit margins.",
    solution: "We optimized their direct booking engine and launched a 'Book Direct' campaign with exclusive perks.",
    results: [
      { label: "Direct Bookings", value: "120%", icon: React.createElement(TrendingUp, { size: 20 }) },
      { label: "CPA Reduced", value: "30%", icon: React.createElement(Target, { size: 20 }) },
      { label: "Profit Margin", value: "+20%", icon: React.createElement(BarChart3, { size: 20 }) }
    ],
    image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&q=80&w=800&h=600",
    mockupImage: "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?auto=format&fit=crop&q=80&w=1200&h=800"
  },
  {
    slug: "saas-scaling",
    title: "SaaS Scaling",
    clientName: "CloudFlow Systems",
    category: "Technology",
    tagline: "From Startup to Industry Leader",
    description: "Reduced churn and increased MRR through content marketing and automated email sequences.",
    problem: "CloudFlow had a great product but high churn rates and slow user onboarding were hindering growth.",
    solution: "We redesigned their onboarding email sequence and created a comprehensive knowledge base.",
    results: [
      { label: "MRR Growth", value: "180%", icon: React.createElement(BarChart3, { size: 20 }) },
      { label: "Churn Reduced", value: "35%", icon: React.createElement(TrendingUp, { size: 20 }) },
      { label: "User Base", value: "50K+", icon: React.createElement(Users, { size: 20 }) }
    ],
    image: "https://images.unsplash.com/photo-1551434678-e076c223a692?auto=format&fit=crop&q=80&w=800&h=600",
    mockupImage: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=1200&h=800"
  },
  {
    slug: "edu-tech-success",
    title: "EduTech Success",
    clientName: "Bright Minds Academy",
    category: "Education",
    tagline: "Digital Transformation for Modern Learning",
    description: "Increased student enrollment and platform engagement through content marketing and SEO.",
    problem: "Bright Minds Academy was losing potential students to competitors with better search visibility.",
    solution: "We developed a comprehensive content strategy focusing on high-intent educational keywords.",
    results: [
      { label: "Enrollment Up", value: "85%", icon: React.createElement(Users, { size: 20 }) },
      { label: "Organic Traffic", value: "400%", icon: React.createElement(TrendingUp, { size: 20 }) },
      { label: "Engagement", value: "60%", icon: React.createElement(Target, { size: 20 }) }
    ],
    image: "https://images.unsplash.com/photo-1501504905252-473c47e087f8?auto=format&fit=crop&q=80&w=800&h=600",
    mockupImage: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&q=80&w=1200&h=800"
  },
  {
    slug: "automotive-growth",
    title: "Automotive Growth",
    clientName: "AutoGear Solutions",
    category: "Automotive",
    tagline: "Driving Sales in a Competitive Market",
    description: "Increased service bookings and vehicle sales through targeted local ads and social media engagement.",
    problem: "AutoGear was struggling to attract new customers to their service center despite having competitive pricing.",
    solution: "We launched a geo-targeted ad campaign offering a free diagnostic check, which successfully drove foot traffic.",
    results: [
      { label: "Service Leads", value: "500+", icon: React.createElement(Users, { size: 20 }) },
      { label: "Booking Rate", value: "25%", icon: React.createElement(Target, { size: 20 }) },
      { label: "Revenue Up", value: "40%", icon: React.createElement(BarChart3, { size: 20 }) }
    ],
    image: "https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?auto=format&fit=crop&q=80&w=800&h=600",
    mockupImage: "https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&q=80&w=1200&h=800"
  },
  {
    slug: "pet-care-growth",
    title: "Pet Care Growth",
    clientName: "HappyPaws Co.",
    category: "Pet Care",
    tagline: "Scaling a Premium Pet Supply Brand",
    description: "Increased online sales and customer loyalty through targeted social media campaigns and community building.",
    problem: "HappyPaws had a loyal local following but was struggling to compete with big-box retailers in the digital space.",
    solution: "We launched a 'Pet of the Month' social media campaign and optimized their e-commerce funnel for repeat purchases.",
    results: [
      { label: "Sales Growth", value: "150%", icon: React.createElement(TrendingUp, { size: 20 }) },
      { label: "Repeat Customers", value: "60%", icon: React.createElement(Users, { size: 20 }) },
      { label: "Social Reach", value: "500K+", icon: React.createElement(Target, { size: 20 }) }
    ],
    image: "https://images.unsplash.com/photo-1516734212186-a967f81ad0d7?auto=format&fit=crop&q=80&w=800&h=600",
    mockupImage: "https://images.unsplash.com/photo-1583511655857-d19b40a7a54e?auto=format&fit=crop&q=80&w=1200&h=800"
  }
];
