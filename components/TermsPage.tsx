import { prisma } from '@/libs/db';
import ReactMarkdown from 'react-markdown';
import Link from 'next/link';

// Force Next.js to dynamically validate or statically cache this database look-up permanently
export const revalidate = 3600; // Cache data for 1 hour, then background revalidate automatically

const DEFAULT_CONTENT = `
## 1. The Agreement
By accessing Kariflow.com and registering your workshop, you agree to these Terms. Kariflow provides tools for fashion designers to manage measurements, orders, and workshop tasks.

## 2. Artisan Intellectual Property
Your designs, measurement patterns, and client lists belong exclusively to you. Kariflow provides the digital vault to store them, but we do not claim ownership of any creative assets uploaded to the platform.

## 3. Data Usage
You are responsible for the accuracy of your measurements. Kariflow offers the system for recording, but the final fit of any garment remains the responsibility of the tailor.

## 4. Privacy & Respect
We respect the confidential nature of the fashion industry. Your client list will never be sold or shared with competing fashion houses or third-party marketing firms.
`;

async function getLegalPage(slug: string) {
  try {
    // 🎯 FIXED: Changed incorrect reference 'db' to match your explicit import 'prisma'
    const document = await prisma.legalDocument.findUnique({
      where: { slug },
    });
    return document;
  } catch (error) {
    console.error('Error fetching legal document from DB:', error);
    return null;
  }
}

export default async function TermsPage() {
  const page = await getLegalPage('terms');

  return (
    <div className="pt-32 pb-24 bg-white min-h-screen text-slate-900">
      <div className="max-w-7xl mx-auto px-6 relative">
        <div className="absolute top-0 left-0 w-96 h-96 bg-emerald-500/5 blur-[120px] rounded-full -z-10 animate-pulse pointer-events-none"></div>

        <div className="mt-20">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
            
            {/* Left Column: Summary Info (Sticky on Large Screens) */}
            <div className="lg:col-span-4 space-y-8 lg:sticky lg:top-32">
              <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-100 text-emerald-600 text-[10px] font-black uppercase tracking-widest">
                <span>Client & Artisan Protection</span>
              </div>

              <h1 className="text-4xl md:text-5xl xl:text-6xl font-black text-slate-900 tracking-tight leading-[1.1]">
                {page?.title || 'Terms of Service'} <span className="text-emerald-600 italic">.</span>
              </h1>

              <div className="p-6 bg-slate-50 border border-slate-100 rounded-2xl space-y-4">
                <p className="text-xs font-mono uppercase tracking-widest text-slate-400">
                  Last Revised: {page?.lastRevised || 'May 2024'}
                </p>
                <div className="h-[2px] bg-slate-200/60 w-12"></div>
                <h4 className="text-xs font-black uppercase tracking-widest text-slate-900">Platform Rules</h4>
                <ul className="space-y-3 text-xs text-slate-500 font-semibold leading-relaxed">
                  <li className="flex items-start space-x-2">
                    <span className="text-emerald-600 flex-shrink-0">&bull;</span>
                    <span>Your designs and creative pattern catalogs are strictly your own intellectual property.</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <span className="text-emerald-600 flex-shrink-0">&bull;</span>
                    <span>Accuracy of measured listings resides with the recording studio or individual tailor.</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <span className="text-emerald-600 flex-shrink-0">&bull;</span>
                    {/* 🎯 FIXED: Safely handled single quotes to prevent Next build breakage */}
                    <span>Respect of boundaries ensures client records are safe from competitor scrapers.</span>
                  </li>
                </ul>
              </div>
              
              <div className="text-[10px] text-slate-400 leading-relaxed font-black uppercase tracking-widest space-y-1">
                <p>Have terms inquiries?</p>
                <a href="mailto:support@kariflow.app" className="text-emerald-600 hover:underline">support@kariflow.app</a>
              </div>
            </div>

            {/* Right Column: Scrollable Content Terms */}
            <div className="lg:col-span-8 bg-slate-50/50 p-8 sm:p-12 rounded-[2.5rem] border border-slate-100">
              <div className="prose prose-slate max-w-none text-slate-600 prose-headings:text-slate-900 prose-headings:font-black prose-strong:text-slate-900">
                <ReactMarkdown>
                  {page?.content || DEFAULT_CONTENT}
                </ReactMarkdown>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}