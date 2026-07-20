// 'use client';
// import React from 'react';
// import { Sparkles, Twitter, Facebook, Linkedin, MessageSquare, FileText } from 'lucide-react';
// import { BlogPost } from '../../../types';

// interface SocialDistributorProps {
//   latestPost: BlogPost | null;
// }

// export function SocialDistributor({ latestPost }: SocialDistributorProps) {
//   if (!latestPost) return null;

//   const postUrl = typeof window !== 'undefined' ? `${window.location.origin}/blog/${latestPost.slug}` : '';
//   const message = `Check out our latest journal entry: "${latestPost.title}" on Kariflow!`;

//   return (
//     <div className="bg-white rounded-[32px] md:rounded-[40px] border border-slate-100 shadow-2xl shadow-slate-200/50 p-6 md:p-8 mb-8 md:mb-12 relative overflow-hidden group">
//       <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-50 rounded-full -mr-16 -mt-16 blur-3xl group-hover:bg-emerald-100 transition-colors"></div>
      
//       <div className="relative z-10">
//         <div className="flex items-center space-x-3 mb-6">
//           <div className="w-10 h-10 rounded-2xl bg-emerald-50 flex items-center justify-center text-emerald-600">
//             <Sparkles size={20} />
//           </div>
//           <div>
//             <h2 className="text-lg md:text-xl font-black text-slate-900">Social Distribution</h2>
//             <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-0.5">Quick Share latest post</p>
//           </div>
//         </div>

//         <div className="flex flex-col xl:flex-row xl:items-center justify-between gap-6">
//           <div className="flex items-center space-x-4">
//             <div className="w-12 h-12 md:w-16 md:h-16 rounded-xl md:rounded-2xl overflow-hidden shadow-lg shadow-slate-200 shrink-0 bg-slate-50">
//               {latestPost.image ? (
//                 <img src={latestPost.image} alt={latestPost.title} className="w-full h-full object-cover" />
//               ) : (
//                 <div className="w-full h-full flex items-center justify-center text-slate-300">
//                   <FileText size={20} />
//                 </div>
//               )}
//             </div>
//             <div>
//                 <h3 className="text-sm font-bold text-slate-900 line-clamp-1">{latestPost.title}</h3>
//                 <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">{latestPost.category}</p>
//             </div>
//           </div>
//           <div className="flex items-center gap-3">
//               {[
//                   { name: 'X', icon: Twitter, color: 'bg-slate-900', intent: `https://twitter.com/intent/tweet?text=${encodeURIComponent(message)}&url=${encodeURIComponent(postUrl)}` },
//                   { name: 'Facebook', icon: Facebook, color: 'bg-blue-600', intent: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(postUrl)}` },
//                   { name: 'LinkedIn', icon: Linkedin, color: 'bg-blue-700', intent: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(postUrl)}` },
//                   { name: 'WhatsApp', icon: MessageSquare, color: 'bg-emerald-600', intent: `https://api.whatsapp.com/send?text=${encodeURIComponent(message + ' ' + postUrl)}` }
//               ].map(chan => (
//                   <a key={chan.name} href={chan.intent} target="_blank" rel="noopener noreferrer" className={`w-10 h-10 flex items-center justify-center rounded-xl text-white ${chan.color} hover:opacity-90 transition-opacity`}>
//                       <chan.icon size={18} />
//                   </a>
//               ))}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }
