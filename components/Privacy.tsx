import { prisma } from '@/libs/db';
import ReactMarkdown from 'react-markdown';
import { BRAND_NAME } from '../constants';
import { constructMetadata } from '../components/SEO';

// Next.js Cache Strategy: Cache statically for 1 hour, background revalidates on new traffic
export const revalidate = 3600;

const DEFAULT_CONTENT = `
## 1. Collection of Measurements
Kariflow collects measurements, photos, and client history that you manually input into the app. We do not use this data for anything other than providing the service to you.

## 2. Artisan Anonymity
We do not sell your client contact information. Your workshop's trade secrets and measurement techniques are your own.

## 3. Security Infrastructure
All data is stored in secure cloud servers powered by industry-leading providers. We employ end-to-end encryption to ensure your measurement books are only accessible by you and your authorized staff.

## 4. Digital Export
 You can request an export of all your workshop data at any time. Your data is yours, even if you decide to leave the Kariflow platform.
`;

async function getPrivacyPage(slug: string) {
  try {
    const document = await prisma.legalDocument.findUnique({
      where: { slug },
    });
    return document;
  } catch (error) {
    console.error('Error querying privacy document metadata from central DB:', error);
    return null;
  }
}

// 🎯 FIXED: Replaced legacy JSX markup injection with native Server Component framework hooks
export const metadata = constructMetadata({
  title: "Privacy Policy | Protecting the Artisan's Craft",
  description: `Learn how ${BRAND_NAME} protects your measurement books, client data, and workshop history with secure encryption.`,
  url: 'https://kariflow.com/privacy',
});

export default async function PrivacyPage() {
  const page = await getPrivacyPage('privacy');

  return (
    <div className="pt-32 pb-24 bg-white min-h-screen text-slate-900">
      <div className="max-w-7xl mx-auto px-6 relative">
        <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-500/5 blur-[120px] rounded-full -z-10 animate-pulse"></div>

        <div className="mt-20">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
            
            {/* Left Column: Summary Info (Sticky on Large Screens) */}
            <div className="lg:col-span-4 space-y-8 lg:sticky lg:top-32">
              <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-100 text-emerald-600 text-[10px] font-black uppercase tracking-widest">
                <span>Data Privacy Protection</span>
              </div>

              <h1 className="text-4xl md:text-5xl xl:text-6xl font-black text-slate-900 tracking-tight leading-[1.1]">
                {page?.title || 'Privacy Policy'} <span className="text-emerald-600 italic">.</span>
              </h1>

              <div className="p-6 bg-slate-50 border border-slate-100 rounded-2xl space-y-4">
                <p className="text-xs font-mono uppercase tracking-widest text-slate-400">
                  Last Revised: {page?.lastRevised || 'May 2024'}
                </p>
                <div className="h-[2px] bg-slate-200/60 w-12"></div>
                <h4 className="text-xs font-black uppercase tracking-widest text-slate-900">Our Commitments</h4>
                <ul className="space-y-3 text-xs text-slate-500 font-semibold leading-relaxed">
                  <li className="flex items-start space-x-2">
                    <span className="text-emerald-600">&bull;</span>
                    <span>Zero trading or third-party transfer of your customer measurements.</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <span className="text-emerald-600">&bull;</span>
                    <span>All designer templates and measurement books remain fully your IP.</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <span className="text-emerald-600">&bull;</span>
                    <span>Downloadable JSON/CSV format data dump at any given moment.</span>
                  </li>
                </ul>
              </div>
              
              <div className="text-[10px] text-slate-400 leading-relaxed font-black uppercase tracking-widest space-y-1">
                <p>Questions about compliance?</p>
                <a href="mailto:privacy@kariflow.app" className="text-emerald-600 hover:underline">privacy@kariflow.app</a>
              </div>
            </div>

            {/* Right Column: Scrollable Content Policy */}
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