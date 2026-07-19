// Types for Kariflow
// Removed web SDK import to prevent server-side initialization issues
type FirebaseFieldValue = any;

export interface Feature {
  id: string;
  title: string;
  description: string;
  icon: string;
}

export interface WaitlistEntry {
  id?: string;
  fullName: string;
  email: string;
  businessType: 'designer' | 'tailor' | 'brand';
  country?: string;
  state?: string;
  ip?: string;
  submittedAt: number | FirebaseFieldValue;
}

export interface DashboardStat {
  label: string;
  value: string;
  change: string;
  trend: 'up' | 'down';
}

export interface BlogPost {
  id?: string;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  date: string;
  author: string;
  category: string;
  image: string;
  readTime: string;
  tags: string[];
  views?: number;
  publishedAt?: number | FirebaseFieldValue;
  updatedAt?: number | FirebaseFieldValue;
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  createdAt: number | FirebaseFieldValue;
}

export interface CookieConsent {
  id?: string;
  preferences: {
    necessary: boolean;
    analytics: boolean;
    marketing: boolean;
  };
  userAgent: string;
  location?: {
    country?: string;
    region?: string;
    city?: string;
  };
  timestamp: number;
  anonymousId: string;
}

export interface NewsletterSubscriber {
  id?: string;
  email: string;
  frequency: 'daily' | 'weekly';
  categories: string[];
  subscribedAt: any;
  lastSentAt?: number;
  nextScheduledAt?: number;
}

export interface LegalPage {
  id: string; // 'terms' or 'privacy'
  title: string;
  content: string;
  lastRevised: string;
  updatedAt: number;
}

export interface BrandingSettings {
  logoMode: 'crop' | 'whole';
  cropType: 'horizontal' | 'vertical';
  cropIndex: 0 | 1 | 2;
  customBrandWidth?: string;
  customBrandHeight?: string;
}

export interface EmailTemplateSettings {
  theme: 'modern' | 'emerald' | 'artisanal';
  headerText: string;
  subtitleText: string;
  introGreeting: string;
  introBody: string;
  footerAddress: string;
  footerSocials: {
    twitter: string;
    linkedin: string;
    instagram: string;
  };
  footerSignature: string;
  includeFooter: boolean;
}

export interface Inquiry {
  id: string;
  fullName: string;
  email: string;
  goal: string;
  message: string;
  submittedAt: number | FirebaseFieldValue;
  status: 'unread' | 'read' | 'replied';
  replies?: {
    message: string;
    sentAt: number | FirebaseFieldValue;
    adminEmail: string;
  }[];
}
