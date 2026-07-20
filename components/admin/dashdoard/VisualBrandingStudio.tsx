'use client';
import React, { useState } from 'react';
import { Sparkles, Loader2, Mail, Clock } from 'lucide-react';
import { KariflowLogomark } from '../../BrandLogo';

interface VisualBrandingStudioProps {
  logoMode: 'crop' | 'whole';
  setLogoMode: (mode: 'crop' | 'whole') => void;
  cropType: 'vertical' | 'horizontal';
  setCropType: (type: 'vertical' | 'horizontal') => void;
  cropIndex: number;
  setCropIndex: (index: number) => void;
  theme: 'emerald' | 'modern' | 'artisanal';
  setTheme: (theme: 'emerald' | 'modern' | 'artisanal') => void;
  headerText: string;
  setHeaderText: (text: string) => void;
  subtitleText: string;
  setSubtitleText: (text: string) => void;
  introGreeting: string;
  setIntroGreeting: (greeting: string) => void;
  introBody: string;
  setIntroBody: (body: string) => void;
  footerAddress: string;
  setFooterAddress: (address: string) => void;
  twitterHandle: string;
  setTwitterHandle: (handle: string) => void;
  linkedinHandle: string;
  setLinkedinHandle: (handle: string) => void;
  instagramHandle: string;
  setInstagramHandle: (handle: string) => void;
  footerSignature: string;
  setFooterSignature: (signature: string) => void;
  includeFooter: boolean;
  setIncludeFooter: (include: boolean) => void;
  testRecipient: string;
  setTestRecipient: (recipient: string) => void;
  handleSaveLogo: () => void;
  savingLogo: boolean;
  handleSendTest: () => void;
  sendingTest: boolean;
  handleSaveTemplate: () => void;
  savingTemplate: boolean;
  htmlPreviewSrc: string;
  previewEmail: string;
}

export function VisualBrandingStudio(props: VisualBrandingStudioProps) {
    const {
        logoMode, setLogoMode, cropType, setCropType, cropIndex, setCropIndex, theme, setTheme,
        headerText, setHeaderText, subtitleText, setSubtitleText, introGreeting, setIntroGreeting,
        introBody, setIntroBody, footerAddress, setFooterAddress, twitterHandle, setTwitterHandle,
        linkedinHandle, setLinkedinHandle, instagramHandle, setInstagramHandle, footerSignature,
        setFooterSignature, includeFooter, setIncludeFooter, testRecipient, setTestRecipient,
        handleSaveLogo, savingLogo, handleSendTest, sendingTest, handleSaveTemplate, savingTemplate,
        htmlPreviewSrc, previewEmail
    } = props;

    return (
    <div className="bg-white rounded-[32px] md:rounded-[40px] border border-slate-100 shadow-2xl p-6 md:p-8">
      <div className="border-b border-slate-100 pb-5 mb-8">
        <h2 className="text-xl font-black text-slate-900 flex items-center gap-2">
          <Sparkles className="text-emerald-600 animate-pulse" size={22} />
          Visual Branding & Email Studio
        </h2>
        <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mt-1">
          Pick your brand icon variant, crop sprite segments, customize newsletter layouts and footers
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
        {/* LEFT COLUMN: Controls */}
        <div className="lg:col-span-7 space-y-8">
          
          {/* SEC 1: Brand Logo Fitting Studio */}
          <div className="bg-slate-50/50 rounded-2xl border border-slate-100 p-5 md:p-6 space-y-5">
            <h3 className="font-bold text-slate-800 text-sm md:text-base flex items-center gap-2">
               <span className="w-6 h-6 rounded-md bg-emerald-50 text-emerald-600 text-xs font-black flex items-center justify-center border border-emerald-100">1</span>
               Interactive Logo Fitting Studio
            </h3>
            
            <p className="text-xs font-semibold text-slate-500 leading-relaxed">
              Your uploaded logo sheet contains three logo designs stacked on top of each other. 
              Configure custom coordinates and focus-cropping ratios here to display exactly <strong>one</strong> logo of your choice across the headers and footers of your website.
            </p>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">Display Mode</label>
                <div className="flex bg-slate-100 p-1 rounded-xl">
                  <button 
                    onClick={() => setLogoMode('crop')}
                    className={`flex-1 py-2 rounded-lg text-xs font-bold text-center transition-all ${logoMode === 'crop' ? 'bg-white shadow-sm text-slate-900' : 'text-slate-500'}`}
                  >
                    Crop Focus
                  </button>
                  <button 
                    onClick={() => setLogoMode('whole')}
                    className={`flex-1 py-2 rounded-lg text-xs font-bold text-center transition-all ${logoMode === 'whole' ? 'bg-white shadow-sm text-slate-900' : 'text-slate-500'}`}
                  >
                    Show Whole
                  </button>
                </div>
              </div>

              <div>
                <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">Sprite Direction</label>
                <div className="flex bg-slate-100 p-1 rounded-xl">
                  <button 
                    onClick={() => setCropType('vertical')}
                    className={`flex-1 py-2 rounded-lg text-xs font-bold text-center transition-all ${cropType === 'vertical' ? 'bg-white shadow-sm text-slate-900' : 'text-slate-500'}`}
                  >
                    Vertical (Stacked)
                  </button>
                  <button 
                    onClick={() => setCropType('horizontal')}
                    className={`flex-1 py-2 rounded-lg text-xs font-bold text-center transition-all ${cropType === 'horizontal' ? 'bg-white shadow-sm text-slate-900' : 'text-slate-500'}`}
                  >
                    Horizontal
                  </button>
                </div>
              </div>
            </div>

            {logoMode === 'crop' && (
              <div>
                <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-3">
                  Crop Position Focus
                </label>
                <div className="grid grid-cols-3 gap-2 bg-slate-100 p-1.5 rounded-2xl">
                  {[0, 1, 2].map((idx) => {
                    return (
                      <button
                        key={idx}
                        onClick={() => setCropIndex(idx)}
                        className={`flex flex-col items-center p-3 rounded-xl border relative overflow-hidden transition-all bg-white ${
                          cropIndex === idx 
                            ? 'border-emerald-600 bg-emerald-50/20 shadow-md ring-2 ring-emerald-600/10' 
                            : 'border-slate-200 hover:border-slate-300'
                        }`}
                      >
                        <div className="w-12 h-12 bg-white rounded-lg border border-slate-100 relative overflow-hidden flex items-center justify-center mb-2">
                          <KariflowLogomark className="w-full h-full" />
                        </div>
                        <span className="text-[10px] font-black uppercase tracking-wider text-slate-600">
                          Logo #{idx + 1}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
              <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider italic">
                *Saved settings instantly synchronize custom headers and footers site-wide.
              </span>
              <button
                onClick={handleSaveLogo}
                disabled={savingLogo}
                className="px-6 py-2.5 bg-slate-900 hover:bg-slate-800 text-white font-black text-[10px] uppercase tracking-widest rounded-xl transition-all disabled:opacity-50 inline-flex items-center gap-2 shadow-md"
              >
                {savingLogo && <Loader2 className="animate-spin" size={10} />}
                Save Logo Crop
              </button>
            </div>
          </div>

          {/* SEC 2: Email Template Studio & Content */}
          <div className="bg-slate-50/50 rounded-2xl border border-slate-100 p-5 md:p-6 space-y-6">
            <h3 className="font-bold text-slate-800 text-sm md:text-base flex items-center gap-2">
               <span className="w-6 h-6 rounded-md bg-emerald-50 text-emerald-600 text-xs font-black flex items-center justify-center border border-emerald-100">2</span>
               Email Template Theme & Content Designer
            </h3>

            {/* Theme Selector */}
            <div>
              <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2.5">
                Layout Theme Styling Preset
              </label>
              <div className="grid grid-cols-3 gap-3">
                {[
                  { id: 'emerald', label: 'Luxe Emerald', desc: 'Dark forest headers, crisp widgets' },
                  { id: 'modern', label: 'Modern Editorial', desc: 'Sleek, grey canvas, mono borders' },
                  { id: 'artisanal', label: 'Artisanal Craft', desc: 'Warm parchments, rustic dashed margins' }
                ].map((th) => (
                  <button
                    key={th.id}
                    onClick={() => setTheme(th.id as any)}
                    className={`p-3.5 rounded-2xl border text-left transition-all relative ${
                      theme === th.id 
                        ? 'border-emerald-600 bg-white shadow-xl shadow-emerald-900/5 ring-1 ring-emerald-600/10' 
                        : 'border-slate-150 bg-white/70 hover:bg-white'
                    }`}
                  >
                    <span className="block text-xs font-bold text-slate-800 mb-1">{th.label}</span>
                    <span className="block text-[9px] text-slate-400 font-medium leading-normal">{th.desc}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Email Title & Sub */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1.5">Email Header Title</label>
                <input 
                  type="text"
                  value={headerText}
                  onChange={(e) => setHeaderText(e.target.value)}
                  className="w-full px-4 py-3 bg-white border border-slate-200 focus:border-emerald-500 rounded-xl text-xs font-bold transition-all outline-hidden text-slate-900"
                />
              </div>
              <div>
                <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1.5">Email Header Subtitle</label>
                <input 
                  type="text"
                  value={subtitleText}
                  onChange={(e) => setSubtitleText(e.target.value)}
                  className="w-full px-4 py-3 bg-white border border-slate-200 focus:border-emerald-500 rounded-xl text-xs font-bold transition-all outline-hidden text-slate-900"
                />
              </div>
            </div>

            {/* Greeting and body intro */}
            <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
              <div className="md:col-span-4">
                <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1.5">Salutation / Greeting</label>
                <input 
                  type="text"
                  value={introGreeting}
                  onChange={(e) => setIntroGreeting(e.target.value)}
                  className="w-full px-4 py-3 bg-white border border-slate-200 focus:border-emerald-500 rounded-xl text-xs font-bold transition-all outline-hidden text-slate-900"
                />
              </div>
              <div className="md:col-span-8">
                <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1.5">Content Body Preface</label>
                <input 
                  type="text"
                  value={introBody}
                  onChange={(e) => setIntroBody(e.target.value)}
                  className="w-full px-4 py-3 bg-white border border-slate-200 focus:border-emerald-500 rounded-xl text-xs font-bold transition-all outline-hidden text-slate-900"
                  placeholder="Use \${sub.categories} as a wildcard code"
                />
              </div>
            </div>

            {/* Business coordinates & Social coordinates */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Studio Address & Footer handles</label>
                <div className="flex items-center space-x-2">
                  <input 
                    type="checkbox"
                    id="includeFooterCheck"
                    checked={includeFooter}
                    onChange={(e) => setIncludeFooter(e.target.checked)}
                    className="rounded text-emerald-600 border-slate-200 focus:ring-emerald-500 h-3.5 w-3.5"
                  />
                  <label htmlFor="includeFooterCheck" className="text-[10px] text-slate-500 font-bold uppercase tracking-wider cursor-pointer">Include Footer</label>
                </div>
              </div>

              {includeFooter && (
                <div className="space-y-3 p-4 bg-white rounded-2xl border border-slate-100">
                  <div>
                    <label className="block text-[8px] font-black text-slate-400 uppercase tracking-widest mb-1">Company Physical Studio Location</label>
                    <input 
                      type="text"
                      value={footerAddress}
                      onChange={(e) => setFooterAddress(e.target.value)}
                      className="w-full px-3 py-2 bg-slate-50 border border-slate-150 focus:border-emerald-500 focus:bg-white rounded-lg text-xs font-semibold transition-all outline-hidden"
                    />
                  </div>

                  <div className="grid grid-cols-3 gap-3">
                    <div>
                      <label className="block text-[8px] font-black text-slate-400 uppercase tracking-widest mb-1">Twitter Target Link</label>
                      <input 
                        type="text"
                        value={twitterHandle}
                        onChange={(e) => setTwitterHandle(e.target.value)}
                        className="w-full px-2 py-1.5 bg-slate-50 border border-slate-150 focus:border-emerald-500 focus:bg-white rounded-lg text-xs font-medium outline-hidden"
                      />
                    </div>
                    <div>
                      <label className="block text-[8px] font-black text-slate-400 uppercase tracking-widest mb-1">LinkedIn Target Link</label>
                      <input 
                        type="text"
                        value={linkedinHandle}
                        onChange={(e) => setLinkedinHandle(e.target.value)}
                        className="w-full px-2 py-1.5 bg-slate-50 border border-slate-150 focus:border-emerald-500 focus:bg-white rounded-lg text-xs font-medium outline-hidden"
                      />
                    </div>
                    <div>
                      <label className="block text-[8px] font-black text-slate-400 uppercase tracking-widest mb-1">Instagram Target Link</label>
                      <input 
                        type="text"
                        value={instagramHandle}
                        onChange={(e) => setInstagramHandle(e.target.value)}
                        className="w-full px-2 py-1.5 bg-slate-50 border border-slate-150 focus:border-emerald-500 focus:bg-white rounded-lg text-xs font-medium outline-hidden"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-[8px] font-black text-slate-400 uppercase tracking-widest mb-1">Footer Legal Signature Notice</label>
                    <input 
                      type="text"
                      value={footerSignature}
                      onChange={(e) => setFooterSignature(e.target.value)}
                      className="w-full px-3 py-2 bg-slate-50 border border-slate-150 focus:border-emerald-500 focus:bg-white rounded-lg text-xs font-semibold transition-all outline-hidden"
                    />
                  </div>
                </div>
              )}
            </div>

            {/* Test recipient & test button */}
            <div className="pt-4 border-t border-slate-100 flex flex-col sm:flex-row items-center gap-3 justify-between">
              <div className="flex items-center space-x-2 bg-slate-100 p-1 rounded-xl w-full sm:max-w-xs">
                <span className="text-[9px] font-black text-slate-400 uppercase tracking-wider pl-2 shrink-0">Test Recipient:</span>
                <input 
                  type="email"
                  value={testRecipient}
                  onChange={(e) => setTestRecipient(e.target.value)}
                  className="w-full bg-transparent px-2 py-1.5 text-xs font-bold text-slate-800 focus:outline-hidden"
                  placeholder="admin@gmail.com"
                />
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={handleSendTest}
                  disabled={sendingTest}
                  className="px-5 py-3 bg-white border border-slate-200 text-slate-700 hover:bg-slate-50 font-black text-[10px] uppercase tracking-widest rounded-xl transition-all disabled:opacity-50 inline-flex items-center gap-2 shadow-sm"
                >
                  {sendingTest ? <Loader2 className="animate-spin" size={10} /> : <Mail size={10} />}
                  Send Test Email
                </button>

                <button
                  onClick={handleSaveTemplate}
                  disabled={savingTemplate}
                  className="px-6 py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-black text-[10px] uppercase tracking-widest rounded-xl transition-all disabled:opacity-50 inline-flex items-center gap-2 shadow-lg shadow-emerald-500/10"
                >
                  {savingTemplate && <Loader2 className="animate-spin" size={10} />}
                  Save Email Layout
                </button>
              </div>
            </div>
          </div>

        </div>

        {/* RIGHT COLUMN: Live Isolating Preview */}
        <div className="lg:col-span-5 space-y-4 lg:sticky lg:top-24 self-start">
          <label className="block text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-2 text-center lg:text-left">
            Live High-Fidelity Simulator Preview
          </label>
          
          <div className="border-4 border-slate-800 rounded-[36px] overflow-hidden shadow-2xl flex flex-col bg-slate-900 aspect-[9/16] max-h-[720px] max-w-sm mx-auto">
            {/* Phone Ear Speaker and camera notch */}
            <div className="bg-slate-800 px-4 py-2.5 flex justify-center items-center relative shrink-0">
              <div className="w-12 h-3 bg-slate-900 rounded-full animate-pulse"></div>
            </div>
            
            {/* Phone Address / Simulated Client Header */}
            <div className="bg-slate-150 px-4 py-2.5 flex items-center justify-between shrink-0 border-b border-slate-200 font-sans text-slate-600 text-[10px] font-semibold">
              <div className="flex items-center space-x-1.5 overflow-hidden text-ellipsis whitespace-nowrap pr-2">
                <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
                <span>To: <strong className="text-slate-800">{previewEmail}</strong></span>
              </div>
              <span className="text-slate-400 font-bold tracking-tight uppercase shrink-0">Inbox</span>
            </div>

            {/* Compiled HTML preview Iframe */}
            <iframe 
              title="Inbox Preview Frame" 
              srcDoc={htmlPreviewSrc} 
              className="w-full flex-1 border-none bg-white"
            />
          </div>
          
          <p className="text-[9px] text-slate-400 font-bold text-center leading-relaxed">
            The preview contains styled mock blog segments representing live posts. <br />
            An integrated, compliant <strong>Unsubscribe Completely</strong> linkage sits in the template footer.
          </p>
        </div>
      </div>
    </div>
    );
}

