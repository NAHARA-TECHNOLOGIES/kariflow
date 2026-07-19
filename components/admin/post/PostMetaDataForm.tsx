'use client';
import React from 'react';
import { Type, Tag } from 'lucide-react';

export function PostMetadataForm({ 
  formData, 
  handleInputChange, 
  setFormData, 
  tagInput, 
  setTagInput, 
  handleAddTag, 
  removeTag 
}: {
  formData: any;
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  setFormData: React.Dispatch<React.SetStateAction<any>>;
  tagInput: string;
  setTagInput: React.Dispatch<React.SetStateAction<string>>;
  handleAddTag: (e: React.KeyboardEvent) => void;
  removeTag: (tag: string) => void;
}) {
  return (
    <div className="bg-white rounded-[32px] md:rounded-[40px] p-6 md:p-10 border border-slate-100 shadow-xl shadow-slate-200/50">
      <div className="space-y-6">
        
        {/* Title Input */}
        <div>
          <label className="block text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-3">Title</label>
          <div className="relative group">
            <Type className="absolute left-4 top-4 text-slate-300 group-focus-within:text-emerald-500 transition-colors" size={20} />
            <input
              type="text"
              name="title"
              required
              value={formData.title}
              onChange={handleInputChange}
              placeholder="Enter a compelling title..."
              className="w-full pl-12 pr-6 py-4 bg-[#F8FAFC] border-transparent focus:bg-white focus:border-emerald-500 rounded-2xl text-base md:text-lg font-bold transition-all outline-none"
            />
          </div>
        </div>

        {/* Slug Input */}
        <div>
          <label className="block text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-3">Slug (URL Path)</label>
          <input
            type="text"
            name="slug"
            required
            value={formData.slug}
            onChange={handleInputChange}
            className="w-full px-6 py-4 bg-[#F8FAFC] border-transparent focus:bg-white focus:border-emerald-500 rounded-2xl text-xs font-bold transition-all outline-none font-mono text-emerald-600"
          />
        </div>

        {/* Excerpt Textarea */}
        <div>
          <label className="block text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-3">Excerpt</label>
          <textarea
            name="excerpt"
            required
            value={formData.excerpt}
            onChange={handleInputChange}
            rows={3}
            placeholder="A short summary of the article..."
            className="w-full px-6 py-4 bg-[#F8FAFC] border-transparent focus:bg-white focus:border-emerald-500 rounded-2xl text-sm font-medium transition-all outline-none resize-none"
          />
        </div>

        {/* Tags Section */}
        <div>
          <label className="block text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-3">Metadata Tags</label>
          <div className="space-y-4">
            <div className="flex gap-2">
              <div className="relative group flex-1">
                <Tag className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-emerald-500 transition-colors" size={18} />
                <input
                  type="text"
                  value={tagInput}
                  onChange={(e) => setTagInput(e.target.value)}
                  onKeyDown={handleAddTag}
                  placeholder="Add topic (press enter)..."
                  className="w-full pl-12 pr-6 py-4 bg-[#F8FAFC] border-transparent focus:bg-white focus:border-emerald-500 rounded-2xl text-sm font-medium transition-all outline-none"
                />
              </div>
              <button
                type="button"
                onClick={() => {
                  if (tagInput.trim()) {
                    setFormData((prev: any) => ({
                      ...prev,
                      tags: !prev.tags.includes(tagInput.trim()) ? [...prev.tags, tagInput.trim()] : prev.tags
                    }));
                    setTagInput('');
                  }
                }}
                className="px-6 bg-emerald-500 text-white rounded-2xl font-black text-sm hover:bg-emerald-600 transition-colors shadow-lg shadow-emerald-500/20"
              >
                +
              </button>
            </div>
            
            {/* Render Tags */}
            <div className="flex flex-wrap gap-2">
              {formData.tags.map((tag: string) => (
                <span 
                  key={tag} 
                  className="inline-flex items-center space-x-2 px-3 py-1.5 bg-emerald-50 text-emerald-600 rounded-xl text-[10px] font-black uppercase tracking-widest border border-emerald-100/50"
                >
                  <span>{tag}</span>
                  <button 
                    type="button" 
                    onClick={() => removeTag(tag)}
                    className="w-4 h-4 rounded-full bg-emerald-200/30 hover:bg-emerald-200 flex items-center justify-center transition-colors"
                  >
                    ×
                  </button>
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}