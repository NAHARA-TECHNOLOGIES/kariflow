import type { BlogPost } from '@/types';

export const BLOG_POSTS: BlogPost[] = [
  {
    id: '1',
    slug: 'the-art-of-precision-measurements',
    title: 'The Art of Precision Measurements',
    excerpt: 'Why digitizing your measurement book is the first step to scaling your fashion brand.',
    content: `
      <p>Every master tailor knows that a perfect fit starts long before the scissors touch the fabric. It starts with a measurement book that records the nuances of a client\'s posture, preference, and lifestyle.</p>
      
      <h3>The Old Way vs. The Digital Way</h3>
      <p>For decades, we relied on paper journals. But paper gets lost, ink fades, and finding a client\'s profile from two years ago can take hours. At Kariflow, we digitized this intuition.</p>
      
      <p>By storing measurements in the cloud, you can access them at the cutting table, the fitting room, or even while sourcing fabric in the market.</p>
      
      <h3>Consistency is King</h3>
      <p>When you scale your team, you need your tailors to produce consistent results. Digital records ensure that every hand in your workshop is working from the same precise data set.</p>
    `,
    date: 'May 10, 2026',
    author: 'Adebayo S.',
    category: 'Craftsmanship',
    image: 'https://images.unsplash.com/photo-1558304970-abd589baebe5?auto=format&fit=crop&q=80&w=1200',
    readTime: '5 min read',
    tags: ['Tailoring', 'Efficiency', 'Scaling']
  },
  {
    id: '2',
    slug: 'managing-your-tailor-team',
    title: 'Managing Your Tailor Team',
    excerpt: 'How task tracking transforms a chaotic workshop into a high-performance fashion house.',
    content: `
      <p>Managing an atelier is like conducting an orchestra. You have cutters, sewers, and finishers, all working on different deadlines. Without a system, it's easy for orders to fall behind.</p>
      
      <h3>Visual Routing</h3>
      <p>Kariflow introduces "Visual Task Routing." You can see exactly which stage an Ankara gown is in—has it been cut? Is it being boned? Is the embroidery finished?</p>
      
      <h3>Accountability</h3>
      <p>By assigning tasks to specific workstations, you create a culture of accountability. Your team knows what is expected, and you know exactly where to focus your attention when a deadline approaches.</p>
    `,
    date: 'May 15, 2026',
    author: 'Doris M.',
    category: 'Business',
    image: 'https://images.unsplash.com/photo-1544441893-675973e31985?auto=format&fit=crop&q=80&w=1200',
    readTime: '7 min read',
    tags: ['Management', 'Operations', 'Fashion']
  },
  {
    id: '3',
    slug: 'the-future-of-global-artisanry',
    title: 'The Future of Global Artisanry',
    excerpt: 'Bridging the gap between the local workshop and the global luxury market.',
    content: `
      <p>The world is looking for authenticity. The unique styles of local artisans in Lagos, Accra, and Nairobi are more in demand than ever. But to sell globally, you need global standards.</p>
      
      <h3>Professionalism Through Data</h3>
      <p>When you send a digital invoice and a measurement confirmation to an international client, you build trust. Professionalism is what separates a "local tailor" from a "global brand."</p>
      
      <p>At Kariflow, we are building the financial and operational tools to help you take your unique vision and present it to the world with confidence.</p>
    `,
    date: 'May 20, 2026',
    author: 'Smart S.',
    category: 'Vision',
    image: 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&q=80&w=1200',
    readTime: '4 min read',
    tags: ['Growth', 'Technology', 'Africa Fashion']
  }
];
