import { 
  Scissors, 
  BookOpen, 
  ClipboardList, 
  MapPin, 
  Users, 
  TrendingUp, 
  ShieldCheck,
  Zap,
  Globe
} from 'lucide-react';

export const BRAND_NAME = "Kariflow";
export const BRAND_TAGLINE = "The Digital Engine for Local Artisans & Global Fashion Houses";
export const BRAND_DESCRIPTION = "Kariflow is the all-in-one operating system for modern fashion designers. Digitized measurements, task tracking, and order management to scale your workshop with precision.";
export const CONTACT_EMAIL = "hello@kariflow.com";
export const CONTACT_PHONE = "+234 (0) 907878181 KARIFLOW";
export const OFFICE_LOCATION = "Lagos, Nigeria";
export const SOCIAL_LINKS = {
  twitter: "https://twitter.com/kariflow",
  linkedin: "https://linkedin.com/company/kariflow",
  instagram: "https://instagram.com/kariflow"
};

export const FEATURES = [
  {
    id: 'measurements',
    title: 'Digital Measurement Book',
    description: 'Capture every curve with precision. Log sizes once, access them anywhere. Never lose a client profile again.',
    icon: Scissors,
  },
  {
    id: 'tracking',
    title: 'Visual Task Tracking',
    description: 'See every stitch in real-time. Manage your team of tailors with clear deadlines and status updates.',
    icon: ClipboardList,
  },
  {
    id: 'orders',
    title: 'Order Lifecycle Engine',
    description: 'From fabric collection to final delivery. Keep your clients informed with automated status notifications.',
    icon: Zap,
  },
  {
    id: 'crm',
    title: 'Artisan CRM',
    description: 'Build deep relationships. Store fabric preferences, style history, and anniversary alerts for every client.',
    icon: Users,
  },
  {
    id: 'inventory',
    title: 'Fabric & Inventory',
    description: 'Keep track of every yard. Never over-order or run out of essential lace, buttons, or thread again.',
    icon: BookOpen,
  },
  {
    id: 'scaling',
    title: 'Global Scale',
    description: 'Ready to export? Manage international orders with built-in sizing converters and currency logic.',
    icon: Globe,
  },
  {
    id: 'locations',
    title: 'Studio Location Sync',
    description: 'Keep every workshop and showroom location connected so your entire team is on the same route.',
    icon: MapPin,
  },
  {
    id: 'growth',
    title: 'Performance Insights',
    description: 'Track orders, inventory, and workflow efficiency in one dashboard to grow your atelier smarter.',
    icon: TrendingUp,
  },
  {
    id: 'security',
    title: 'Secure Access Control',
    description: 'Protect your client and workshop data with role-based permissions built for fashion studios.',
    icon: ShieldCheck,
  },
];

export const NAV_LINKS = [
  
  { label: 'Our Mission', href: '#mission' },
  { label: 'Success Stories', href: '#testimonials' },
  { label: 'Artisan Pricing', href: '/pricing' },
  { label: 'The Journal', href: '/blog' },
];

export const FAQS = [
  {
    question: 'Can I use Kariflow offline in my shop?',
    answer: 'Yes! Kariflow is built for erratic connectivity. Your data syncs automatically the moment you reconnect to the grid.',
  },
  {
    question: 'How do I add my team of tailors?',
    answer: 'Managing a team is easy. You can add staff with specific permissions so they only see the tasks assigned to their workstation.',
  },
  {
    question: 'Is my client data secure?',
    answer: 'Absolutely. We use industry-standard encryption to ensure that your measurement books and client details are private and protected.',
  },
];
