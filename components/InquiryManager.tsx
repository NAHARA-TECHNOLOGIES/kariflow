"use client";

/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  MessageSquare, 
  Clock, 
  Mail, 
  User, 
  Target,
  ChevronRight,
  Loader2,
  Reply,
  Send,
  Search
} from 'lucide-react';

interface ReplyLog {
  message: string;
  adminEmail: string;
  sentAt: string | Date;
}

interface Inquiry {
  id: string;
  fullName: string;
  email: string;
  goal: string;
  message: string;
  status: 'unread' | 'read' | 'replied';
  submittedAt: string | Date;
  replies?: ReplyLog[];
}

export default function InquiryManager() {
  const [inquiries, setInquiries] = useState<Inquiry[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<'all' | 'pending' | 'unread' | 'replied'>('pending');
  const [searchQuery, setSearchQuery] = useState('');
  const [replyingTo, setReplyingTo] = useState<string | null>(null);
  const [replyMessage, setReplyMessage] = useState('');
  const [expandedInquiries, setExpandedInquiries] = useState<string[]>([]);
  const [visibleCount, setVisibleCount] = useState(6);
  
  const lastTotalCountRef = useRef<number | null>(null);
  const itemsPerPage = 6;

  async function fetchAllInquiries() {
    try {
      const response = await fetch('/api/admin/inquiries');
      if (response.ok) {
        const data = await response.json();
        setInquiries(data);
      }
    } catch (err) {
      console.error('Failed to resolve inquiries stream lookup:', err);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchAllInquiries();
  }, []);

  // Audio Notification Engine
  useEffect(() => {
    if (lastTotalCountRef.current !== null && inquiries.length > lastTotalCountRef.current) {
      const audio = new Audio('https://assets.mixkit.co/active_storage/sfx/2869/2869-preview.mp3');
      audio.volume = 0.5;
      audio.play().catch(() => console.log('Audio playback context suspended by browser rules'));
    }
    lastTotalCountRef.current = inquiries.length;
  }, [inquiries.length]);

  const filteredInquiries = inquiries.filter(i => {
    const matchesSearch = 
      i.fullName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      i.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      i.message.toLowerCase().includes(searchQuery.toLowerCase());

    if (!matchesSearch) return false;
    if (filter === 'pending') return i.status !== 'replied';
    if (filter === 'unread') return i.status === 'unread';
    if (filter === 'replied') return i.status === 'replied';
    return true;
  });

  const paginatedInquiries = filteredInquiries.slice(0, visibleCount);
  const unreadCount = inquiries.filter(i => i.status === 'unread').length;

  const toggleExpand = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setExpandedInquiries(prev => 
      prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]
    );
  };

  const markAsRead = async (inquiryId: string) => {
    try {
      const response = await fetch('/api/admin/inquiries/status', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id: inquiryId, status: 'read' })
      });
      if (response.ok) {
        setInquiries(prev => prev.map(item => item.id === inquiryId ? { ...item, status: 'read' } : item));
      }
    } catch (err) {
      console.error('Failed updating status state signature:', err);
    }
  };

  const handleReplyLogSubmission = async (inquiryId: string, customerEmail: string) => {
    if (!replyMessage.trim()) return;
    try {
      const response = await fetch('/api/admin/inquiries/reply', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          inquiryId,
          message: replyMessage,
          adminEmail: 'admin@kariflow.app' 
        })
      });

      if (response.ok) {
        // 🎯 FIXED: Open native window mailto handler safely without disrupting concurrent state flow
        window.location.href = `mailto:${customerEmail}?subject=Regarding your inquiry to Kariflow&body=${encodeURIComponent(replyMessage)}`;
        setReplyingTo(null);
        setReplyMessage('');
        await fetchAllInquiries(); 
      }
    } catch (err) {
      console.error('Failed logging action sequence update state:', err);
    }
  };

  return (
    <div className="bg-white rounded-[32px] md:rounded-[40px] border border-slate-100 shadow-2xl shadow-slate-200/50 p-6 md:p-10 mb-8 md:mb-12">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-10">
        <div className="flex items-start space-x-4">
          <div className="w-12 h-12 bg-emerald-50 rounded-2xl flex items-center justify-center text-emerald-600 shrink-0">
             <MessageSquare className="w-6 h-6" />
          </div>
          <div>
            <div className="flex items-center space-x-3">
              <h2 className="text-2xl font-black text-slate-900 leading-none">Inquiries</h2>
              {unreadCount > 0 && (
                <span className="bg-rose-600 text-white text-[10px] font-black px-2 py-0.5 rounded-full animate-pulse flex items-center">
                  <span className="w-1 h-1 bg-white rounded-full mr-1.5 animate-ping" />
                  {unreadCount} NEW
                </span>
              )}
            </div>
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-2 block">
              Managing artisan requests ({inquiries.length} Total)
            </p>
          </div>
        </div>

        <div className="flex flex-col space-y-4 w-full md:w-auto">
          <div className="relative w-full md:w-80">
             <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 w-4 h-4" />
             <input 
               type="text" 
               placeholder="Search by name, email, or message..."
               value={searchQuery}
               onChange={(e) => setSearchQuery(e.target.value)}
               className="w-full pl-11 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-2xl text-xs font-medium focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition-all"
             />
          </div>

          <div className="flex bg-slate-50 p-1.5 rounded-2xl border border-slate-100 self-end overflow-x-auto max-w-full">
            {(['all', 'pending', 'unread', 'replied'] as const).map((type) => (
              <button
                key={type}
                type="button"
                onClick={() => { setFilter(type); setVisibleCount(6); }}
                className={`px-4 py-2 rounded-xl text-[10px] font-bold uppercase tracking-widest transition-all whitespace-nowrap focus:outline-none ${
                  filter === type 
                    ? 'bg-white text-slate-900 shadow-sm border border-slate-200' 
                    : 'text-slate-400 hover:text-slate-600'
                }`}
              >
                {type}
              </button>
            ))}
          </div>
        </div>
      </div>

      {loading ? (
        <div className="h-64 flex items-center justify-center">
          <Loader2 className="w-8 h-8 text-emerald-600 animate-spin" />
        </div>
      ) : filteredInquiries.length === 0 ? (
        <div className="bg-slate-50 rounded-3xl p-12 text-center border-2 border-dashed border-slate-200">
          <p className="text-slate-400 font-bold uppercase tracking-widest text-[10px]">No {filter !== 'all' ? filter : ''} inquiries found.</p>
        </div>
      ) : (
        <div className="grid lg:grid-cols-2 gap-6 items-start">
          <AnimatePresence mode="popLayout">
            {paginatedInquiries.map((inquiry) => {
              const isExpanded = expandedInquiries.includes(inquiry.id);
              const repliesExpanded = expandedInquiries.includes(inquiry.id + '-replies');
              return (
                <motion.div
                  key={inquiry.id}
                  layout="position"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  // 🎯 FIXED: Removed active state mutators from onMouseEnter to prevent looping layout recalculation glitches
                  onClick={() => inquiry.status === 'unread' && markAsRead(inquiry.id)}
                  className={`bg-slate-50 rounded-3xl p-6 border transition-all flex flex-col justify-between group ${
                    inquiry.status === 'unread' 
                      ? 'border-rose-200 ring-4 ring-rose-50 shadow-xl bg-white scale-[1.01]' 
                      : inquiry.status === 'replied' 
                        ? 'border-slate-100 opacity-90'
                        : 'border-slate-100'
                  }`}
                >
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                         <div className={`w-2.5 h-2.5 rounded-full ${
                           inquiry.status === 'unread' ? 'bg-rose-600 animate-pulse' : 
                           inquiry.status === 'replied' ? 'bg-emerald-500' : 'bg-slate-300'
                         }`} />
                         <span className={`text-[10px] font-black uppercase tracking-widest ${
                           inquiry.status === 'unread' ? 'text-rose-600' : 'text-slate-400'
                         }`}>
                           {inquiry.status}
                         </span>
                      </div>
                      <div className="flex items-center space-x-2 text-[10px] text-slate-400 font-black uppercase tracking-widest">
                        <Clock className="w-3 h-3" />
                        <span>{new Date(inquiry.submittedAt).toLocaleDateString()}</span>
                      </div>
                    </div>

                    <div className="space-y-1">
                      <div className="flex items-center space-x-2">
                         <User className="text-slate-400 w-3.5 h-3.5" />
                         <h3 className="font-black text-slate-900 text-base">{inquiry.fullName}</h3>
                      </div>
                      <div className="flex items-center space-x-2">
                         <Mail className="text-emerald-500 w-3 h-3" />
                         <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mt-0.5">{inquiry.email}</p>
                      </div>
                    </div>

                    <div className="bg-emerald-50 rounded-xl p-3 flex items-center space-x-3">
                      <Target className="text-emerald-600 w-3.5 h-3.5" />
                      <p className="text-[10px] font-black text-emerald-700 uppercase tracking-widest leading-none">
                        {inquiry.goal}
                      </p>
                    </div>

                    <div className="bg-white rounded-2xl p-4 border border-slate-100 min-h-[80px] relative">
                      <p className={`text-sm text-slate-600 font-medium leading-relaxed italic ${!isExpanded ? 'line-clamp-3' : ''}`}>
                        &ldquo;{inquiry.message}&rdquo;
                      </p>
                      {inquiry.message.length > 120 && (
                        <button 
                          type="button"
                          onClick={(e) => toggleExpand(inquiry.id, e)}
                          className="mt-2 text-[8px] font-black uppercase tracking-widest text-emerald-600 hover:text-emerald-700 block focus:outline-none"
                        >
                          {isExpanded ? 'Show Less' : 'Read Full Message'}
                        </button>
                      )}
                    </div>

                    {inquiry.replies && inquiry.replies.length > 0 && (
                      <div className="space-y-3 pt-2">
                        <div className="flex items-center justify-between">
                          <p className="text-[8px] font-black text-slate-400 uppercase tracking-widest">Internal Response Log</p>
                          {inquiry.replies.length > 1 && (
                            <button 
                              type="button"
                              onClick={(e) => toggleExpand(inquiry.id + '-replies', e)}
                              className="text-[8px] font-black text-emerald-600 uppercase tracking-widest focus:outline-none"
                            >
                              {repliesExpanded ? 'Collapse' : `View ${inquiry.replies.length} Replies`}
                            </button>
                          )}
                        </div>
                        <div className="space-y-2 overflow-hidden">
                          {inquiry.replies.slice(0, repliesExpanded ? undefined : 1).map((reply, idx) => (
                            <motion.div 
                              // 🎯 FIXED: Established key metrics templates for the response arrays
                              key={`reply-log-${inquiry.id}-${idx}`} 
                              initial={{ opacity: 0, height: 0 }}
                              animate={{ opacity: 1, height: 'auto' }}
                              className="bg-slate-900 text-slate-200 p-3 rounded-xl text-[10px] space-y-1 relative"
                            >
                               <p className={`font-medium italic leading-relaxed ${!isExpanded && !repliesExpanded ? 'line-clamp-2' : ''}`}>&ldquo;{reply.message}&rdquo;</p>
                               <div className="flex justify-between items-center opacity-50 text-[8px] pt-1 border-t border-slate-800">
                                 <span>By {reply.adminEmail}</span>
                                 <span>{new Date(reply.sentAt).toLocaleString()}</span>
                               </div>
                            </motion.div>
                          ))}
                        </div>
                      </div>
                    )}

                    {replyingTo === inquiry.id ? (
                      <motion.div 
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="mt-4 space-y-3"
                      >
                         <textarea 
                           autoFocus
                           value={replyMessage}
                           onChange={(e) => setReplyMessage(e.target.value)}
                           placeholder="Type a log summary or paste email message contents..."
                           className="w-full p-4 rounded-xl border-2 border-emerald-100 bg-white text-sm outline-none focus:border-emerald-500 transition-all font-medium shadow-inner"
                           rows={4}
                         />
                         <div className="flex space-x-2">
                           <button 
                             type="button"
                             onClick={() => handleReplyLogSubmission(inquiry.id, inquiry.email)}
                             className="flex-1 py-3 bg-emerald-600 text-white rounded-xl text-[10px] font-black uppercase tracking-widest flex items-center justify-center space-x-2 hover:bg-emerald-700 hover:scale-[1.02] shadow-lg shadow-emerald-900/10 transition-all active:scale-95 focus:outline-none"
                           >
                             <Send className="w-3.5 h-3.5" />
                             <span>Send Email & Log</span>
                           </button>
                           <button 
                             type="button"
                             onClick={() => setReplyingTo(null)}
                             className="px-4 py-3 bg-slate-200 text-slate-600 rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-slate-300 transition-colors focus:outline-none"
                           >
                             Cancel
                           </button>
                         </div>
                      </motion.div>
                    ) : (
                      <div className="pt-4 flex space-x-3 border-t border-slate-200/50">
                         <button 
                           type="button"
                           onClick={() => setReplyingTo(inquiry.id)}
                           className="flex-1 py-3 bg-slate-900 text-white rounded-xl text-[10px] font-black uppercase tracking-widest flex items-center justify-center space-x-2 group hover:scale-[1.02] active:scale-95 transition-all shadow-xl shadow-slate-900/10 focus:outline-none"
                         >
                           <Reply className="w-3.5 h-3.5 group-hover:-translate-x-1 transition-transform" />
                           <span>Reply To Message</span>
                         </button>
                      </div>
                    )}
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>
      )}

      {filteredInquiries.length > visibleCount && (
        <div className="mt-12 flex flex-col items-center space-y-4">
          <div className="flex items-center space-x-2">
            <div className="h-1 w-32 bg-slate-100 rounded-full overflow-hidden">
               <div 
                 className="h-full bg-emerald-500 transition-all duration-500" 
                 style={{ width: `${(visibleCount / filteredInquiries.length) * 100}%` }}
               />
            </div>
            <span className="text-[8px] font-black text-slate-400 uppercase tracking-[0.2em]">
              {Math.min(visibleCount, filteredInquiries.length)} / {filteredInquiries.length}
            </span>
          </div>

          <button 
            type="button"
            onClick={() => setVisibleCount(prev => prev + itemsPerPage)}
            className="group flex flex-col items-center space-y-2 py-6 px-12 bg-slate-50 hover:bg-white hover:shadow-2xl hover:shadow-slate-200/50 rounded-[40px] border border-transparent hover:border-slate-100 transition-all active:scale-95 focus:outline-none"
          >
            <span className="text-[10px] font-black text-slate-400 group-hover:text-slate-900 uppercase tracking-[0.3em] transition-colors">
              Load More Inquiries
            </span>
            <ChevronRight className="w-5 h-5 text-slate-300 group-hover:text-emerald-500 group-hover:rotate-90 transition-all" />
          </button>
        </div>
      )}
    </div>
  );
}