export interface Testimonial {
  id: number;
  name: string;
  role: string;
  content: string;
  rating: number;
  avatar: string;
}

export const testimonials: Testimonial[] = [
  { 
    id: 1,
    name: "Rahul Sharma", 
    role: "CEO, TechFlow", 
    content: "Socialbizz transformed our online presence. Our ROI increased by 300% in just 6 months! Their team is truly exceptional.", 
    rating: 5,
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=150&h=150"
  },
  { 
    id: 2,
    name: "Priya Patel", 
    role: "Marketing Head, LuxeStay", 
    content: "The best performance marketing agency we've worked with. Highly professional and data-driven approach to every campaign.", 
    rating: 5,
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=150&h=150"
  },
  { 
    id: 3,
    name: "Ankit Verma", 
    role: "Founder, FitLife", 
    content: "Their SEO strategy is top-notch. We're now ranking #1 for all our major keywords, driving consistent organic growth.", 
    rating: 5,
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=150&h=150"
  },
  { 
    id: 4,
    name: "Sneha Gupta", 
    role: "Director, EduSpark", 
    content: "Creative, responsive, and growth-oriented. They truly care about our business success and it shows in the results.", 
    rating: 5,
    avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=150&h=150"
  },
  { 
    id: 5,
    name: "Vikram Singh", 
    role: "Owner, AutoGear", 
    content: "Amazing web development team. Our new site is fast, modern, and converting like crazy. Highly recommend Socialbizz!", 
    rating: 5,
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=150&h=150"
  },
];
