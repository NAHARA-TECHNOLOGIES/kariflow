// 'use client';
// import React, { useState, useEffect } from 'react';
// import { Mail, Zap, Search, Loader2, Clock } from 'lucide-react';
// import { subscribeToNewsletterList } from '../../../services/firebaseService';
// import { NewsletterSubscriber } from '../../../types';

// const formatDate = (val: any) => {
//   if (!val) return new Date();
//   if (val.toDate && typeof val.toDate === 'function') return val.toDate();
//   return new Date(val);
// };

// export function NewsletterManager() {
//   const [subscribers, setSubscribers] = useState<NewsletterSubscriber[]>([]);
//   const [loading, setLoading] = useState(true);
//   const [searchQuery, setSearchQuery] = useState('');
//   const [visibleCount, setVisibleCount] = useState(10);
//   const [triggering, setTriggering] = useState(false);
//   const itemsPerPage = 10;

//   const handleTrigger = async () => {
//     setTriggering(true);
//     try {
//       const resp = await fetch('/api/admin/newsletter/trigger', { method: 'POST' });
//       const data = await resp.json();
//       if (data.success) {
//         alert("Newsletter engine run completed successfully!");
//       } else {
//         alert("Failed to run engine: " + (data.error || 'Unknown error'));
//       }
//     } catch (e) {
//       console.error(e);
//       alert("Error triggering newsletter engine.");
//     } finally {
//       setTriggering(false);
//     }
//   };

//   useEffect(() => {
//     return subscribeToNewsletterList((fetched) => {
//       setSubscribers(fetched);
//       setLoading(false);
//     });
//   }, []);

//   const filtered = subscribers.filter(s => 
//     s.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
//     s.frequency.toLowerCase().includes(searchQuery.toLowerCase()) ||
//     s.categories.some(c => c.toLowerCase().includes(searchQuery.toLowerCase()))
//   );

//   const paginated = filtered.slice(0, visibleCount);

//   return (
//     <div className="bg-white rounded-[32px] md:rounded-[40px] border border-slate-100 shadow-2xl shadow-slate-200/50 p-6 md:p-8">
//       <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-8">
//         <div>
//           <h2 className="text-xl font-black text-slate-900 flex items-center">
//             <Mail className="mr-2 text-purple-600" size={20} />
//             Newsletter Circle
//           </h2>
//           <div className="flex items-center space-x-2 mt-1">
//             <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
//               {subscribers.length} ACTIVE SUBSCRIBERS
//             </p>
//             <span className="w-1 h-1 rounded-full bg-slate-200"></span>
//             <div className="flex items-center space-x-1 text-[10px] font-black text-emerald-600 uppercase tracking-widest">
//               <Zap size={10} />
//               <span>Automated Engine active</span>
//             </div>
//           </div>
//         </div>

//         <div className="flex flex-col sm:flex-row items-center gap-3">
//           <div className="hidden lg:flex items-center space-x-2 px-3 py-1 bg-slate-50 border border-slate-100 rounded-lg text-[9px] font-bold text-slate-500 uppercase tracking-widest">
//             <Clock size={10} />
//             <span>Next Run: Every 15m</span>
//           </div>
//           <button 
//             onClick={handleTrigger}
//             disabled={triggering}
//             className={`flex items-center space-x-2 px-4 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all shadow-lg min-w-[180px] justify-center ${
//               triggering 
//                 ? 'bg-slate-100 text-slate-400 cursor-not-allowed' 
//                 : 'bg-emerald-600 text-white hover:bg-emerald-700 shadow-emerald-900/10'
//             }`}
//           >
//             {triggering ? (
//               <Loader2 className="animate-spin" size={12} />
//             ) : (
//               <Zap size={12} />
//             )}
//             <span>{triggering ? 'Processing...' : 'Manual Override'}</span>
//           </button>
//           <div className="relative group max-w-sm w-full">
//             <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-purple-500 transition-colors" size={14} />
//             <input 
//               type="text"
//               placeholder="Search subscribers..."
//               value={searchQuery}
//               onChange={(e) => setSearchQuery(e.target.value)}
//               className="w-full pl-10 pr-4 py-3 bg-[#F8FAFC] border border-transparent focus:bg-white focus:border-purple-500/30 rounded-xl text-xs font-bold transition-all outline-hidden"
//             />
//           </div>
//         </div>
//       </div>

//       <div className="overflow-x-auto -mx-6 md:mx-0">
//         <div className="min-w-[600px] inline-block w-full align-middle md:px-0 px-6">
//           <table className="w-full text-left">
//             <thead>
//               <tr className="border-b border-slate-50">
//                 <th className="py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">Email</th>
//                 <th className="py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest text-center">Frequency</th>
//                 <th className="py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">Preferences</th>
//                 <th className="py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest text-right">Joined</th>
//               </tr>
//             </thead>
//             <tbody className="divide-y divide-slate-50">
//               {paginated.map((sub) => (
//                 <tr key={sub.id} className="group hover:bg-slate-50/50 transition-colors">
//                   <td className="py-5 font-bold text-slate-900 text-xs">
//                     {sub.email}
//                   </td>
//                   <td className="py-5 text-center">
//                     <span className={`px-2 py-1 rounded-lg text-[9px] font-black uppercase tracking-widest ${
//                       sub.frequency === 'daily' ? 'bg-orange-50 text-orange-600' : 'bg-blue-50 text-blue-600'
//                     }`}>
//                       {sub.frequency}
//                     </span>
//                   </td>
//                   <td className="py-5">
//                     <div className="flex flex-wrap gap-1.5">
//                       {sub.categories.length > 0 ? sub.categories.map(cat => (
//                         <span key={cat} className="px-2 py-0.5 bg-slate-50 text-slate-500 rounded-md text-[8px] font-black uppercase tracking-tight border border-slate-100">
//                           {cat}
//                         </span>
//                       )) : <span className="text-[8px] text-slate-300 italic font-medium">All Topics</span>}
//                     </div>
//                   </td>
//                   <td className="py-5 text-right text-[10px] text-slate-400 font-bold">
//                     {formatDate(sub.subscribedAt).toLocaleDateString()}
//                   </td>
//                 </tr>
//               ))}
//               {filtered.length === 0 && !loading && (
//                 <tr>
//                   <td colSpan={4} className="py-12 text-center">
//                     <p className="text-xs text-slate-400 font-bold uppercase tracking-widest">No subscribers found</p>
//                   </td>
//                 </tr>
//               )}
//             </tbody>
//           </table>
//         </div>
//       </div>

//       {/* Load More Section */}
//       {filtered.length > visibleCount && (
//         <div className="mt-8 flex justify-center pt-6 border-t border-slate-50">
//           <button 
//             onClick={() => setVisibleCount(prev => prev + itemsPerPage)}
//             className="flex items-center space-x-3 px-8 py-3 bg-slate-50 hover:bg-slate-100 text-slate-500 hover:text-slate-900 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all border border-slate-100"
//           >
//             <span>Load More Subscribers</span>
//             <div className="w-1.5 h-1.5 rounded-full bg-purple-500 animate-pulse" />
//           </button>
//         </div>
//       )}
//     </div>
//   );
// }
