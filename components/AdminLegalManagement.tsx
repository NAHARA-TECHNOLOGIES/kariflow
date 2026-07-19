'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ShieldAlert, 
  FileText, 
  Save, 
  Loader2, 
  CheckCircle,
  AlertCircle,
  Eye,
  Edit3,
  Calendar
} from 'lucide-react';

interface LegalPage {
  id: string;
  title: string;
  content: string;
  lastRevised: string;
}

const LEGAL_PAGES = [
  { id: 'terms', title: 'Terms of Service' },
  { id: 'privacy', title: 'Privacy Policy' },
  { id: 'cookies', title: 'Cookie Policy' }
];

export default function AdminLegalManager() {
  const [selectedPageId, setSelectedPageId] = useState('terms');
  const [content, setContent] = useState('');
  const [title, setTitle] = useState('');
  const [lastRevised, setLastRevised] = useState('');
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [previewMode, setPreviewMode] = useState(false);

  useEffect(() => {
    const controller = new AbortController();
    setLoading(true);

    const fetchLegalData = async () => {
      try {
        const res = await fetch(`/api/legal/${selectedPageId}`, { signal: controller.signal });
        
        if (res.status === 404) {
          setContent('');
          setTitle(LEGAL_PAGES.find(p => p.id === selectedPageId)?.title || '');
          setLastRevised(new Date().toLocaleDateString('en-US', { month: 'long', year: 'numeric' }));
          return;
        }
        
        if (!res.ok) throw new Error('Network failure loading document context.');
        
        const data: LegalPage = await res.json();
        setContent(data.content);
        setTitle(data.title);
        setLastRevised(data.lastRevised);
      } catch (err: any) {
        if (err.name !== 'AbortError') {
          setError(err.message || 'Failed connecting data pipelines.');
        }
      } finally {
        setLoading(false);
      }
    };

    fetchLegalData();

    return () => controller.abort();
  }, [selectedPageId]);

  const handleSave = async () => {
    setSaving(true);
    setError(null);
    setSuccess(false);

    try {
      const response = await fetch(`/api/legal/${selectedPageId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title, content, lastRevised }),
      });

      if (!response.ok) throw new Error('Server declined database commit mutation.');

      setSuccess(true);
      setTimeout(() => setSuccess(false), 3000);
    } catch (err: any) {
      setError(err.message || 'Failed processing save cycle.');
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="bg-white rounded-[32px] md:rounded-[40px] border border-slate-100 shadow-2xl shadow-slate-200/50 p-6 md:p-10 mb-8 md:mb-12">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-10">
        <div>
          <h2 className="text-2xl font-black text-slate-900 flex items-center">
            <ShieldAlert className="mr-3 text-emerald-600" size={24} />
            Legal Document Publisher
          </h2>
          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-1">
            Manage public policy transparency
          </p>
        </div>

        <div className="flex flex-wrap gap-2">
          {LEGAL_PAGES.map((page) => (
            <button
              key={page.id}
              onClick={() => setSelectedPageId(page.id)}
              className={`px-5 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${
                selectedPageId === page.id 
                  ? 'bg-slate-900 text-white shadow-lg shadow-slate-900/10' 
                  : 'bg-slate-50 text-slate-400 hover:bg-slate-100'
              }`}
            >
              {page.title}
            </button>
          ))}
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-10">
        <div className="lg:col-span-2">
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <label className="block text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Document Content (Markdown)</label>
              <button 
                onClick={() => setPreviewMode(!previewMode)}
                className="text-[10px] font-black text-emerald-600 uppercase tracking-widest flex items-center hover:underline"
              >
                {previewMode ? <Edit3 size={14} className="mr-1.5" /> : <Eye size={14} className="mr-1.5" />}
                {previewMode ? 'Back to Editor' : 'Live Preview'}
              </button>
            </div>

            <div className="relative">
              {loading ? (
                <div className="h-[400px] bg-slate-50 rounded-3xl flex items-center justify-center">
                  <Loader2 size={32} className="text-emerald-600 animate-spin" />
                </div>
              ) : previewMode ? (
                <div className="h-[400px] bg-[#F8FAFC] rounded-3xl p-8 overflow-y-auto border border-slate-100 prose prose-slate prose-sm max-w-none">
                   <h1 className="text-slate-900 font-display font-black">{title}</h1>
                   <p className="text-slate-400 font-mono text-[10px] uppercase tracking-widest">Last Revised: {lastRevised}</p>
                   <div className="mt-8 text-slate-600 whitespace-pre-wrap font-medium">
                     {content || <span className="italic text-slate-300">No content structured inside draft canvas.</span>}
                   </div>
                </div>
              ) : (
                <textarea
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  placeholder="Insert legal document body here..."
                  className="w-full h-[400px] px-8 py-6 bg-[#F8FAFC] border border-transparent focus:bg-white focus:border-emerald-500 rounded-3xl text-sm font-medium transition-all outline-none resize-none font-mono"
                />
              )}
            </div>
          </div>
        </div>

        <aside className="space-y-8">
          <div className="bg-slate-50 rounded-3xl p-6 md:p-8 space-y-6">
            <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-widest flex items-center">
              <FileText size={16} className="mr-2 text-emerald-600" /> Meta Settings
            </h3>

            <div>
              <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">Display Title</label>
              <input 
                type="text" 
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full px-4 py-3 bg-white border border-slate-100 rounded-xl text-xs font-bold transition-all outline-none focus:border-emerald-500"
              />
            </div>

            <div>
              <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">Revision Date</label>
              <div className="relative">
                <Calendar size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-300" />
                <input 
                  type="text" 
                  value={lastRevised}
                  onChange={(e) => setLastRevised(e.target.value)}
                  placeholder="July 2026"
                  className="w-full pl-10 pr-4 py-3 bg-white border border-slate-100 rounded-xl text-xs font-bold transition-all outline-none focus:border-emerald-500"
                />
              </div>
            </div>

            <div className="pt-4">
              <button
                onClick={handleSave}
                disabled={saving || loading}
                className="w-full flex items-center justify-center space-x-3 px-8 py-4 bg-slate-900 text-white rounded-2xl font-black text-[10px] uppercase tracking-widest shadow-xl shadow-slate-900/10 hover:scale-[1.02] active:scale-95 transition-all disabled:opacity-50"
              >
                {saving ? <Loader2 size={16} className="animate-spin" /> : <Save size={16} />}
                <span>Publish Updates</span>
              </button>
            </div>

            <AnimatePresence>
              {success && (
                <motion.div 
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className="p-4 bg-emerald-50 rounded-2xl flex items-center space-x-3 text-emerald-600"
                >
                  <CheckCircle size={18} />
                  <p className="text-[10px] font-black uppercase tracking-widest">Live: Page Updated</p>
                </motion.div>
              )}
              {error && (
                <motion.div 
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className="p-4 bg-rose-50 rounded-2xl flex items-center space-x-3 text-rose-600"
                >
                  <AlertCircle size={18} />
                  <p className="text-[10px] font-black uppercase tracking-widest">{error}</p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <div className="p-6 bg-emerald-50 rounded-3xl border border-emerald-100">
             <p className="text-[10px] font-bold text-emerald-600 uppercase tracking-widest mb-3">Artisan Tip</p>
             <p className="text-[11px] text-emerald-800 font-medium leading-relaxed">
               Updating these policies takes effect immediately across all client browsers. Ensure accuracy before publishing.
             </p>
          </div>
        </aside>
      </div>
    </div>
  );
}