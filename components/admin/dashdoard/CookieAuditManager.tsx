// 'use client';

// import React, { useState, useEffect, useMemo, useRef } from 'react';
// import { motion } from 'framer-motion';
// import { 
//   ArrowLeft, 
//   Save, 
//   Image as ImageIcon, 
//   Clock, 
//   Tag, 
//   Loader2,
//   Eye,
//   Type,
//   Upload,
//   Calendar,
//   Plus,
//   X,
//   Bold,
//   Italic,
//   Underline,
//   Heading2,
//   Heading3,
//   Quote,
//   Link as LinkIcon,
//   FileText,
//   PenTool
// } from 'lucide-react';
// import { useRouter, useParams } from 'next/navigation';
// import Link from 'next/link';
// import { auth, storage, db } from '../lib/firebase';
// import { ref, uploadBytes, getDownloadURL, uploadBytesResumable } from 'firebase/storage';
// import { collection, query, getDocs } from 'firebase/firestore';
// import { onAuthStateChanged } from 'firebase/auth';
// import { 
//   checkIfAdmin, 
//   createBlogPost, 
//   updateBlogPost, 
//   getBlogPostBySlug,
//   subscribeToCategories
// } from '../services/firebaseService';
// import { BlogPost, Category } from '../types';

// /**
//  * Sub-component for the featured image upload and preview
//  */
// function ImageUploadSection({ 
//   formData, 
//   uploading, 
//   uploadProgress,
//   handleImageUpload, 
//   handleInputChange,
//   removeImage
// }: { 
//   formData: any; 
//   uploading: boolean; 
//   uploadProgress: number;
//   handleImageUpload: (e: React.ChangeEvent<HTMLInputElement>) => void;
//   handleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
//   removeImage: () => void;
// }) {
//   return (
//     <div className="bg-white rounded-[32px] md:rounded-[40px] p-6 md:p-8 border border-slate-100 shadow-xl shadow-slate-200/50">
//       <h3 className="text-xs md:text-sm font-black text-slate-900 uppercase tracking-widest mb-6 md:mb-8 flex items-center">
//         <ImageIcon size={18} className="mr-2 text-emerald-600" /> Featured Image
//       </h3>
      
//       <div className="space-y-6">
//         <div className="relative group">
//           <input
//             type="file"
//             accept="image/*,video/mp4,video/webm,video/quicktime,video/x-matroska"
//             onChange={handleImageUpload}
//             className="hidden"
//             id="image-upload"
//             disabled={uploading}
//           />
//           <div
//             onClick={() => !uploading && document.getElementById('image-upload')?.click()}
//             className={`flex flex-col items-center justify-center w-full aspect-video rounded-2xl border-2 border-dashed transition-all cursor-pointer overflow-hidden ${
//               uploading 
//                 ? 'bg-slate-50 border-slate-200' 
//                 : 'bg-slate-50 border-slate-200 hover:bg-emerald-50 hover:border-emerald-200'
//             }`}
//           >
//             {uploading ? (
//               <div className="flex flex-col items-center w-full px-8">
//                 <Loader2 size={32} className="text-emerald-600 animate-spin mb-4" />
//                 <div className="w-full h-2 bg-slate-200 rounded-full overflow-hidden mb-2">
//                   <div 
//                     className="h-full bg-emerald-500 transition-all duration-300" 
//                     style={{ width: `${uploadProgress}%` }}
//                   />
//                 </div>
//                 <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">
//                   Uploading {uploadProgress}%
//                 </p>
//               </div>
//             ) : formData.image ? (
//               <div className="relative w-full h-full">
//                 {formData.image.match(/\.(mp4|webm|ogg|mov)(\?|$)|video/i) ? (
//                   <video 
//                     src={formData.image} 
//                     className="w-full h-full object-cover rounded-xl"
//                     controls
//                     playsInline
//                     muted
//                   />
//                 ) : (
//                   <img 
//                     src={formData.image} 
//                     alt="Preview" 
//                     className="w-full h-full object-cover rounded-xl"
//                     referrerPolicy="no-referrer"
//                   />
//                 )}
//                 <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center pointer-events-none">
//                   <p className="text-white text-[10px] font-black uppercase tracking-widest">Change Media</p>
//                 </div>
//                 <button
//                   type="button"
//                   onClick={(e) => {
//                     e.stopPropagation();
//                     removeImage();
//                   }}
//                   className="absolute top-4 right-4 p-2 bg-rose-600 hover:bg-rose-700 text-white rounded-full shadow-lg transition-all transform hover:scale-110 z-10"
//                   title="Remove media"
//                 >
//                   <X size={16} />
//                 </button>
//               </div>
//             ) : (
//               <div className="flex flex-col items-center">
//                 <Upload size={32} className="text-slate-300 mb-2" />
//                 <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Select Image or Video</p>
//               </div>
//             )}
//           </div>
//         </div>
        
//         <div>
//           <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2">Or Use Image URL</label>
//           <input
//             type="url"
//             name="image"
//             value={formData.image}
//             onChange={handleInputChange}
//             placeholder="https://images.unsplash.com/..."
//             className="w-full px-4 py-3 bg-[#F8FAFC] border-transparent focus:bg-white focus:border-emerald-500 rounded-xl text-xs font-medium transition-all outline-hidden"
//           />
//         </div>
//       </div>
//     </div>
//   );
// }

// /**
//  * Sub-component for article meta settings
//  */
// function MetaSidebarSection({ formData, handleInputChange, setFormData, categories }: { 
//   formData: any; 
//   handleInputChange: (e: any) => void;
//   setFormData: React.Dispatch<React.SetStateAction<any>>;
//   categories: Category[];
// }) {
//   return (
//     <div className="bg-white rounded-[32px] md:rounded-[40px] p-6 md:p-8 border border-slate-100 shadow-xl shadow-slate-200/50">
//       <h3 className="text-xs md:text-sm font-black text-slate-900 uppercase tracking-widest mb-6 md:mb-8 flex items-center">
//         <Clock size={18} className="mr-2 text-emerald-600" /> Article Settings
//       </h3>
      
//       <div className="space-y-6">
//         <div>
//           <label className="block text-[10px] md:text-xs font-black text-slate-400 uppercase tracking-widest mb-2">Author</label>
//           <select
//             name="author"
//             value={formData.author}
//             onChange={handleInputChange}
//             className="w-full px-4 py-3 bg-[#F8FAFC] border-transparent focus:bg-white focus:border-emerald-500 rounded-xl text-xs font-bold transition-all outline-hidden cursor-pointer"
//           >
//             <option>Smart Sunday</option>
//             <option>Ebelechukwu Doris</option>
//             <option>Ngotta Clinton</option>
//           </select>
//         </div>

//         <div>
//            <label className="block text-[10px] md:text-xs font-black text-slate-400 uppercase tracking-widest mb-2">Category</label>
//            <select
//              name="category"
//              value={formData.category}
//              onChange={handleInputChange}
//              className="w-full px-4 py-3 bg-[#F8FAFC] border-transparent focus:bg-white focus:border-emerald-500 rounded-xl text-xs font-bold transition-all outline-hidden appearance-none cursor-pointer"
//            >
//              <option value="">Uncategorized</option>
//              {categories.map(cat => (
//                <option key={cat.id} value={cat.name}>{cat.name}</option>
//              ))}
//            </select>
//         </div>

//         <div>
//           <label className="block text-[10px] md:text-xs font-black text-slate-400 uppercase tracking-widest mb-2">Read Time</label>
//           <div className="relative">
//             <Clock size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-300" />
//             <input
//               type="text"
//               name="readTime"
//               value={formData.readTime}
//               onChange={handleInputChange}
//               className="w-full pl-10 pr-4 py-3 bg-[#F8FAFC] border-transparent focus:bg-white focus:border-emerald-500 rounded-xl text-xs font-medium transition-all outline-hidden"
//             />
//           </div>
//         </div>

//         <div>
//           <label className="block text-[10px] md:text-xs font-black text-slate-400 uppercase tracking-widest mb-2">Published Date</label>
//           <div className="relative">
//             <Calendar size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-300" />
//             <input
//               type="date"
//               name="date"
//               value={formData.date ? new Date(formData.date).toISOString().split('T')[0] : ''}
//               onChange={(e) => {
//                 const date = new Date(e.target.value);
//                 const formatted = date.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });
//                 setFormData(prev => ({ ...prev, date: formatted }));
//               }}
//               className="w-full pl-10 pr-4 py-3 bg-[#F8FAFC] border-transparent focus:bg-white focus:border-emerald-500 rounded-xl text-xs font-medium transition-all outline-hidden"
//             />
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default function AdminPostForm() {
//   const params = useParams();
//   const id = params?.id as string | undefined;
//   const router = useRouter();
//   const [loading, setLoading] = useState(true);
//   const [saving, setSaving] = useState(false);
//   const [uploading, setUploading] = useState(false);
//   const [uploadProgress, setUploadProgress] = useState(0);
//   const [isAdmin, setIsAdmin] = useState(() => {
//     if (typeof window !== 'undefined') {
//       return localStorage.getItem('kariflow_admin_status') === 'true';
//     }
//     return false;
//   });
  
//   const [formData, setFormData] = useState<Omit<BlogPost, 'id'>>({
//     title: '',
//     slug: '',
//     excerpt: '',
//     content: '',
//     date: new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }),
//     author: 'Smart Sunday',
//     category: '',
//     image: 'https://images.unsplash.com/photo-1558769132-cb1aea458c5e?auto=format&fit=crop&q=80&w=1200',
//     readTime: '5 min read',
//     tags: []
//   });

//   const [categories, setCategories] = useState<Category[]>([]);
//   const [tagInput, setTagInput] = useState('');

//   useEffect(() => {
//     const unsubCategories = subscribeToCategories(setCategories);

//     const unsubscribeAuth = onAuthStateChanged(auth, async (user) => {
//       if (user) {
//         const adminStatus = await checkIfAdmin(user.uid, user.email);
//         setIsAdmin(adminStatus);
//         localStorage.setItem('kariflow_admin_status', adminStatus ? 'true' : 'false');
//         if (adminStatus && id) {
//           fetchPost(id);
//         } else {
//           setLoading(false);
//         }
//       } else {
//         localStorage.removeItem('kariflow_admin_status');
//         router.push('/admin');
//       }
//     });

//     return () => {
//       unsubCategories();
//       unsubscribeAuth();
//     };
//   }, [id, router]);

//   const [editorMode, setEditorMode] = useState<'write' | 'preview'>('write');
//   const [editorUploading, setEditorUploading] = useState(false);
//   const textareaRef = useRef<HTMLTextAreaElement>(null);

//   const insertMarkup = (before: string, after: string) => {
//     const textarea = textareaRef.current;
//     if (!textarea) return;

//     const start = textarea.selectionStart;
//     const end = textarea.selectionEnd;
//     const value = textarea.value;
//     const selectedText = value.substring(start, end);

//     const replacement = before + (selectedText || '') + after;
//     const newContent = value.substring(0, start) + replacement + value.substring(end);

//     setFormData(prev => ({ ...prev, content: newContent }));

//     setTimeout(() => {
//       textarea.focus();
//       const newCursorPos = start + before.length + (selectedText ? selectedText.length : 0);
//       textarea.setSelectionRange(newCursorPos, newCursorPos);
//     }, 0);
//   };

//   const handleLinkPrompt = () => {
//     const url = prompt('Enter the link URL (e.g. https://kariflow.com):');
//     if (!url) return;
//     insertMarkup(`<a href="${url}" target="_blank" class="text-emerald-600 underline hover:text-emerald-700 transition">`, '</a>');
//   };

//   const handleEditorImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
//     const file = e.target.files?.[0];
//     if (!file) return;

//     if (!auth.currentUser) {
//       alert('Please sign in to upload images.');
//       return;
//     }

//     if (file.size > 2 * 1024 * 1024) {
//       alert('File too large: Keep content images under 2MB.');
//       return;
//     }

//     setEditorUploading(true);
//     try {
//       const fileExt = file.name.split('.').pop() || 'jpg';
//       const fileName = `content-${Date.now()}-${Math.random().toString(36).substring(2, 9)}.${fileExt}`;
//       const storageRef = ref(storage, `content-images/${fileName}`);
      
//       const snapshot = await uploadBytes(storageRef, file);
//       const url = await getDownloadURL(snapshot.ref);
      
//       const imgHtml = `<img src="${url}" alt="${file.name.split('.')[0]}" class="rounded-3xl shadow-lg my-6 w-full object-cover max-h-[450px]" referrerPolicy="no-referrer" />`;
//       insertMarkup(imgHtml, '');
//     } catch (error: any) {
//       console.error('Editor image upload failed:', error);
//       alert('Failed to upload image: ' + error.message);
//     } finally {
//       setEditorUploading(false);
//     }
//   };

//   const wordCount = useMemo(() => {
//     if (!formData.content) return 0;
//     const cleanText = formData.content.replace(/<[^>]*>/g, ' ');
//     return cleanText.trim().split(/\s+/).filter(Boolean).length;
//   }, [formData.content]);

//   const charCount = useMemo(() => {
//     if (!formData.content) return 0;
//     return formData.content.length;
//   }, [formData.content]);

//   const fetchPost = async (postId: string) => {
//     try {
//       const { doc: firestoreDoc, getDoc } = await import('firebase/firestore');
//       const docRef = firestoreDoc(db, 'blogPosts', postId);
//       const docSnap = await getDoc(docRef);
      
//       if (docSnap.exists()) {
//         const data = docSnap.data() as BlogPost;
//         setFormData(data);
//       } else {
//         console.warn('Post not found:', postId);
//       }
//     } catch (error) {
//       console.error('Fetch post error:', error);
//     }
//     setLoading(false);
//   };

//   const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
//     const { name, value } = e.target;
//     setFormData(prev => ({
//       ...prev,
//       [name]: value,
//       // Auto-generate slug from title
//       ...(name === 'title' && !id ? { slug: value.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '') } : {})
//     }));
//   };

//   const handleAddTag = (e: React.KeyboardEvent) => {
//     if (e.key === 'Enter' && tagInput.trim()) {
//       e.preventDefault();
//       if (!formData.tags.includes(tagInput.trim())) {
//         setFormData(prev => ({
//           ...prev,
//           tags: [...prev.tags, tagInput.trim()]
//         }));
//       }
//       setTagInput('');
//     }
//   };

//   const removeTag = (tagToRemove: string) => {
//     setFormData(prev => ({
//       ...prev,
//       tags: prev.tags.filter(t => t !== tagToRemove)
//     }));
//   };

//   const removeImage = () => {
//     setFormData(prev => ({ ...prev, image: '' }));
//   };

//   const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
//     const file = e.target.files?.[0];
//     if (!file) return;

//     // Log for debugging
//     console.log('[Media Upload] File selected:', {
//       name: file.name,
//       type: file.type,
//       size: `${(file.size / 1024 / 1024).toFixed(2)} MB`
//     });

//     // Check storage availability
//     if (!storage) {
//       console.error('[Media Upload] Storage service MISSING');
//       alert('Storage service not available. Please check your configuration.');
//       return;
//     }

//     // Check auth
//     if (!auth.currentUser) {
//       console.warn('[Media Upload] User not signed in');
//       alert('Authentication required: Please sign in again.');
//       return;
//     }

//     // Check admin status before starting upload to save bandwidth and clarify errors
//     if (!isAdmin) {
//       console.warn('[Media Upload] Not an admin, aborting');
//       alert('Permission Denied: You must be an administrator to upload media.');
//       return;
//     }

//     const allowedTypes = ['image/jpeg', 'image/png', 'image/webp', 'image/gif', 'video/mp4', 'video/webm', 'video/quicktime', 'video/x-matroska'];
//     const isVideo = file.type.startsWith('video/');
    
//     if (!allowedTypes.includes(file.type) && !isVideo) {
//       console.warn('[Media Upload] Invalid type:', file.type);
//       alert('Invalid file type: Please upload an image or video.');
//       return;
//     }

//     // Check file size (limit to 100MB for media)
//     const MAX_SIZE = 100 * 1024 * 1024;
//     if (file.size > MAX_SIZE) {
//       console.warn('[Media Upload] File too large:', file.size);
//       alert(`File too large: ${Math.round(file.size / (1024 * 1024))}MB exceeds the 100MB limit.`);
//       return;
//     }

//     setUploading(true);
//     setUploadProgress(5); // Show immediate progress to indicate activity
    
//     try {
//       const fileExt = file.name.split('.').pop() || (isVideo ? 'mp4' : 'jpg');
//       const fileName = `blog-${Date.now()}-${Math.random().toString(36).substring(2, 9)}.${fileExt}`;
//       const storageRef = ref(storage, `blog-images/${fileName}`);
      
//       console.log(`[Media Upload] Starting: blog-images/${fileName} | Size: ${(file.size / 1024 / 1024).toFixed(2)} MB`);

//       const uploadTask = uploadBytesResumable(storageRef, file);

//       // Timeout safety: if stuck for 3 minutes, stop and alert
//       const uploadTimeout = setTimeout(() => {
//         if (uploading) {
//           uploadTask.cancel();
//           setUploading(false);
//           setUploadProgress(0);
//           console.error('[Media Upload] Upload timed out after 180s');
//           alert('Upload timed out. Try a smaller file or check your internet connection.');
//         }
//       }, 180000);

//       uploadTask.on('state_changed', 
//         (snapshot) => {
//           const progress = Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
//           setUploadProgress(Math.max(5, isNaN(progress) ? 0 : progress)); // Keep it at least 5% once started
//           console.log(`[Media Upload] Status: ${snapshot.state} | Progress: ${progress}%`);
//         },
//         (error) => {
//           clearTimeout(uploadTimeout);
//           console.error('[Media Upload] Task Error:', error);
          
//           let msg = `Upload failed: ${error.code} - ${error.message}`;
//           if (error.code === 'storage/unauthorized') {
//             msg = 'Permission Denied: Your admin session might have expired or storage rules are too strict. We have updated the rules, please try again.';
//           }
//           alert(msg);
//           setUploading(false);
//           setUploadProgress(0);
//         },
//         async () => {
//           clearTimeout(uploadTimeout);
//           try {
//             console.log('[Media Upload] Success, retrieving URL...');
//             const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
//             setFormData(prev => ({ ...prev, image: downloadURL }));
//             setUploadProgress(100);
            
//             setTimeout(() => {
//               setUploading(false);
//               setUploadProgress(0);
//             }, 800);
//           } catch (err: any) {
//             console.error('[Media Upload] URL retrieval failed:', err);
//             alert('Upload succeeded but could not generate public URL.');
//             setUploading(false);
//             setUploadProgress(0);
//           }
//         }
//       );
//     } catch (error: any) {
//       console.error('[Media Upload] Critical Initialization Error:', error);
//       alert(`Upload could not be started: ${error.message}`);
//       setUploading(false);
//       setUploadProgress(0);
//     }
//   };

//   const handleSubmit = async (e: React.FormEvent) => {
//     if (e) e.preventDefault();
    
//     if (!isAdmin) {
//       alert('Access Denied: Admin privileges required to publish stories.');
//       return;
//     }
    
//     if (uploading) {
//       alert('Please wait for the media upload to complete before saving.');
//       return;
//     }

//     if (!formData.title.trim()) {
//       alert('Please enter a title for your story.');
//       return;
//     }

//     setSaving(true);
//     console.log('[Post Submit] Starting submission...', { id, isEdit: !!id });
    
//     try {
//       const submissionData = {
//         ...formData,
//       };

//       if (id) {
//         await updateBlogPost(id, submissionData);
//         console.log('[Post Submit] Successfully updated post:', id);
//       } else {
//         const newId = await createBlogPost(submissionData);
//         console.log('[Post Submit] Successfully created post:', newId);
//       }

//       // Automatically trigger newsletter engine in background
//       try {
//         await fetch('/api/admin/newsletter/trigger', { method: 'POST' });
//         console.log('[Post Submit] Newsletter engine triggered');
//       } catch (newsletterErr) {
//         console.warn('[Post Submit] Newsletter trigger failed (non-critical):', newsletterErr);
//       }

//       router.push('/admin');
//     } catch (error: any) {
//       console.error('[Post Submit] Failed:', error);
//       alert(`Save failed: ${error.message || 'Unknown error'}`);
//     } finally {
//       setSaving(false);
//     }
//   };

//   // Removed redundant page-level loading state as requested,
//   // button-level loaders handle the feedback.

//   return (
//     <div className="pt-24 md:pt-32 pb-24 min-h-screen bg-[#F8FAFC]">
//       <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
//         <Link 
//           href="/admin" 
//           className="inline-flex items-center text-slate-400 hover:text-emerald-600 font-bold text-xs md:text-sm mb-8 md:mb-12 transition-colors group"
//         >
//           <ArrowLeft size={16} className="mr-2 group-hover:-translate-x-1 transition-transform" />
//           Back to Dashboard
//         </Link>

//         <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-8 md:mb-12">
//           <h1 className="text-3xl md:text-4xl font-black text-slate-900 tracking-tight">
//             {id ? 'Edit Story' : 'New Story'}
//           </h1>
          
//           <button
//             onClick={handleSubmit}
//             disabled={saving}
//             className="flex items-center justify-center space-x-3 px-8 py-4 bg-slate-900 text-white rounded-2xl font-black text-[10px] uppercase tracking-widest shadow-2xl shadow-slate-900/20 hover:scale-105 active:scale-95 transition-all disabled:opacity-50 disabled:scale-100"
//           >
//             {saving ? <Loader2 size={18} className="animate-spin" /> : <Save size={18} strokeWidth={3} />}
//             <span>{id ? 'Update Article' : 'Publish Article'}</span>
//           </button>
//         </div>

//         <div className="grid lg:grid-cols-3 gap-8 md:gap-10">
//           <div className="lg:col-span-2">
//             <form className="space-y-6 md:space-y-8" onSubmit={handleSubmit}>
//               <div className="bg-white rounded-[32px] md:rounded-[40px] p-6 md:p-10 border border-slate-100 shadow-xl shadow-slate-200/50">
//                 <div className="space-y-6">
//                   <div>
//                     <label className="block text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-3">Title</label>
//                     <div className="relative group">
//                       <Type className="absolute left-4 top-4 text-slate-300 group-focus-within:text-emerald-500 transition-colors" size={20} />
//                       <input
//                         type="text"
//                         name="title"
//                         required
//                         value={formData.title}
//                         onChange={handleInputChange}
//                         placeholder="Enter a compelling title..."
//                         className="w-full pl-12 pr-6 py-4 bg-[#F8FAFC] border-transparent focus:bg-white focus:border-emerald-500 rounded-2xl text-base md:text-lg font-bold transition-all outline-hidden"
//                       />
//                     </div>
//                   </div>

//                   <div className="grid md:grid-cols-2 gap-6">
//                     <div>
//                       <label className="block text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-3">Slug (URL Path)</label>
//                       <input
//                         type="text"
//                         name="slug"
//                         required
//                         value={formData.slug}
//                         onChange={handleInputChange}
//                         className="w-full px-6 py-4 bg-[#F8FAFC] border-transparent focus:bg-white focus:border-emerald-500 rounded-2xl text-xs font-bold transition-all outline-hidden font-mono text-emerald-600"
//                       />
//                     </div>
//                   </div>

//                   <div>
//                     <label className="block text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-3">Excerpt</label>
//                     <textarea
//                       name="excerpt"
//                       required
//                       value={formData.excerpt}
//                       onChange={handleInputChange}
//                       rows={3}
//                       placeholder="A short summary of the article..."
//                       className="w-full px-6 py-4 bg-[#F8FAFC] border-transparent focus:bg-white focus:border-emerald-500 rounded-2xl text-sm font-medium transition-all outline-hidden resize-none"
//                     />
//                   </div>

//                   <div>
//                     <label className="block text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-3">Metadata Tags</label>
//                     <div className="space-y-4">
//                       <div className="flex gap-2">
//                         <div className="relative group flex-1">
//                           <Tag className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-emerald-500 transition-colors" size={18} />
//                           <input
//                             type="text"
//                             value={tagInput}
//                             onChange={(e) => setTagInput(e.target.value)}
//                             onKeyDown={handleAddTag}
//                             placeholder="Add topic (press enter or click +)..."
//                             className="w-full pl-12 pr-6 py-4 bg-[#F8FAFC] border-transparent focus:bg-white focus:border-emerald-500 rounded-2xl text-sm font-medium transition-all outline-hidden"
//                           />
//                         </div>
//                         <button
//                           type="button"
//                           onClick={() => {
//                             if (tagInput.trim()) {
//                               if (!formData.tags.includes(tagInput.trim())) {
//                                 setFormData(prev => ({
//                                   ...prev,
//                                   tags: [...prev.tags, tagInput.trim()]
//                                 }));
//                               }
//                               setTagInput('');
//                             }
//                           }}
//                           className="px-6 bg-emerald-500 text-white rounded-2xl font-black text-sm hover:bg-emerald-600 transition-colors shadow-lg shadow-emerald-500/20"
//                         >
//                           +
//                         </button>
//                       </div>
//                       <div className="flex flex-wrap gap-2">
//                         {formData.tags.map(tag => (
//                           <span 
//                             key={tag} 
//                             className="inline-flex items-center space-x-2 px-3 py-1.5 bg-emerald-50 text-emerald-600 rounded-xl text-[10px] font-black uppercase tracking-widest border border-emerald-100/50"
//                           >
//                             <span>{tag}</span>
//                             <button 
//                               type="button" 
//                               onClick={() => removeTag(tag)}
//                               className="w-4 h-4 rounded-full bg-emerald-200/30 hover:bg-emerald-200 flex items-center justify-center transition-colors"
//                             >
//                               ×
//                             </button>
//                           </span>
//                         ))}
//                       </div>
//                     </div>
//                   </div>

//                   <div>
//                     <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-3">
//                       <label className="block text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Article Content</label>
//                       <div className="flex items-center space-x-1.5 bg-slate-100 p-1.5 rounded-full self-start">
//                         <button
//                           type="button"
//                           onClick={() => setEditorMode('write')}
//                           className={`flex items-center space-x-1.5 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest transition-all ${
//                             editorMode === 'write' ? 'bg-white text-emerald-600 shadow-sm' : 'text-slate-500 hover:text-slate-900'
//                           }`}
//                         >
//                           <PenTool size={11} /> <span>Compose</span>
//                         </button>
//                         <button
//                           type="button"
//                           onClick={() => setEditorMode('preview')}
//                           className={`flex items-center space-x-1.5 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest transition-all ${
//                             editorMode === 'preview' ? 'bg-white text-emerald-600 shadow-sm' : 'text-slate-500 hover:text-slate-900'
//                           }`}
//                         >
//                           <Eye size={11} /> <span>Preview</span>
//                         </button>
//                       </div>
//                     </div>

//                     {editorMode === 'write' ? (
//                       <div className="flex flex-col bg-[#F8FAFC] border border-slate-100 focus-within:bg-white focus-within:border-emerald-500 rounded-3xl transition-all shadow-xl shadow-slate-100/50 overflow-hidden">
//                         {/* Editor Toolbar */}
//                         <div className="flex flex-wrap items-center gap-1 bg-slate-50/80 backdrop-blur-xs border-b border-slate-100 p-2 text-slate-500">
//                           <button
//                             type="button"
//                             onClick={() => insertMarkup('<strong>', '</strong>')}
//                             title="Bold"
//                             className="p-2 hover:bg-slate-200/50 hover:text-slate-900 rounded-xl transition"
//                           >
//                             <Bold size={15} />
//                           </button>
//                           <button
//                             type="button"
//                             onClick={() => insertMarkup('<em>', '</em>')}
//                             title="Italic"
//                             className="p-2 hover:bg-slate-200/50 hover:text-slate-900 rounded-xl transition"
//                           >
//                             <Italic size={15} />
//                           </button>
//                           <button
//                             type="button"
//                             onClick={() => insertMarkup('<u>', '</u>')}
//                             title="Underline"
//                             className="p-2 hover:bg-slate-200/50 hover:text-slate-900 rounded-xl transition"
//                           >
//                             <Underline size={15} />
//                           </button>
                          
//                           <div className="w-px h-5 bg-slate-200 mx-1" />

//                           <button
//                             type="button"
//                             onClick={() => insertMarkup('<h2>', '</h2>')}
//                             title="Heading 2"
//                             className="px-2 py-1.5 hover:bg-slate-200/50 hover:text-slate-900 rounded-xl transition text-[11px] font-black font-mono"
//                           >
//                             H2
//                           </button>
//                           <button
//                             type="button"
//                             onClick={() => insertMarkup('<h3>', '</h3>')}
//                             title="Heading 3"
//                             className="px-2 py-1.5 hover:bg-slate-200/50 hover:text-slate-900 rounded-xl transition text-[11px] font-black font-mono"
//                           >
//                             H3
//                           </button>
                          
//                           <div className="w-px h-5 bg-slate-200 mx-1" />

//                           <button
//                             type="button"
//                             onClick={() => insertMarkup('<blockquote>', '</blockquote>')}
//                             title="Blockquote"
//                             className="p-2 hover:bg-slate-200/50 hover:text-slate-900 rounded-xl transition"
//                           >
//                             <Quote size={15} />
//                           </button>
//                           <button
//                             type="button"
//                             onClick={() => insertMarkup('<ul>\n  <li>', '</li>\n</ul>')}
//                             title="Bullet List"
//                             className="p-2 hover:bg-slate-200/50 hover:text-slate-900 rounded-xl transition"
//                           >
//                             <PenTool size={15} />
//                           </button>
//                           <button
//                             type="button"
//                             onClick={handleLinkPrompt}
//                             title="Hyperlink"
//                             className="p-2 hover:bg-slate-200/50 hover:text-slate-900 rounded-xl transition"
//                           >
//                             <LinkIcon size={15} />
//                           </button>
                          
//                           <div className="w-px h-5 bg-slate-200 mx-1" />

//                           <label className="relative p-2 hover:bg-slate-200/50 hover:text-slate-900 rounded-xl transition cursor-pointer">
//                             <ImageIcon size={15} />
//                             <input
//                               type="file"
//                               accept="image/*"
//                               onChange={handleEditorImageUpload}
//                               className="absolute inset-0 opacity-0 cursor-pointer w-full h-full"
//                               disabled={editorUploading}
//                             />
//                           </label>

//                           <button
//                             type="button"
//                             onClick={() => insertMarkup('<hr class="my-8 border-slate-100" />\n', '')}
//                             title="Horizontal Divider"
//                             className="px-2 py-1 hover:bg-slate-200/50 hover:text-slate-900 rounded-xl transition text-[9px] font-black tracking-wider"
//                           >
//                             DIVIDER
//                           </button>

//                           {editorUploading && (
//                             <div className="ml-auto flex items-center space-x-1.5 px-3 text-emerald-600 text-[10px] font-black uppercase tracking-widest animate-pulse">
//                               <Loader2 size={12} className="animate-spin" />
//                               <span>Uploading Image...</span>
//                             </div>
//                           )}
//                         </div>

//                         {/* TextArea field */}
//                         <textarea
//                           placeholder="Compose your article body in clean text/HTML formatting. Take advantage of formatting controls to structure headings, images, and blockquotes..."
//                           ref={textareaRef}
//                           value={formData.content}
//                           onChange={(e) => setFormData(prev => ({ ...prev, content: e.target.value }))}
//                           className="w-full min-h-[450px] p-6 bg-transparent outline-hidden font-mono text-[13px] leading-relaxed text-slate-800 placeholder-slate-400 focus:ring-0 select-text resize-y"
//                         />

//                         {/* Stats status information banner */}
//                         <div className="flex justify-between items-center bg-slate-50 border-t border-slate-100/60 px-6 py-2.5 text-[9px] font-black text-slate-400 tracking-wider uppercase">
//                           <div className="flex space-x-4">
//                             <span>Words: <strong className="text-slate-700 font-extrabold">{wordCount}</strong></span>
//                             <span>Characters: <strong className="text-slate-700 font-extrabold">{charCount}</strong></span>
//                           </div>
//                           <span>Clean HTML Engine</span>
//                         </div>
//                       </div>
//                     ) : (
//                       /* Pristine dynamic rendered preview page */
//                       <div className="w-full min-h-[500px] border border-slate-150/50 bg-white rounded-3xl p-8 shadow-xl shadow-slate-100/25 overflow-y-auto max-h-[600px]">
//                         {formData.content ? (
//                           <article 
//                             className="prose prose-lg prose-slate max-w-none prose-headings:font-black prose-headings:text-slate-900 prose-p:font-medium prose-p:text-slate-600 prose-blockquote:border-emerald-500 prose-blockquote:bg-emerald-50/50 prose-blockquote:rounded-2xl prose-blockquote:p-6 italic prose-img:rounded-3xl"
//                             dangerouslySetInnerHTML={{ __html: formData.content }}
//                           />
//                         ) : (
//                           <div className="flex flex-col items-center justify-center h-[350px] text-slate-300">
//                             <PenTool size={48} className="stroke-[1] mb-3 ease-in-out duration-300 animate-pulse text-slate-300" />
//                             <p className="text-[10px] uppercase font-black tracking-widest">Nothing to display yet. Write some storytelling first!</p>
//                           </div>
//                         )}
//                       </div>
//                     )}
//                   </div>
//                 </div>
//               </div>
//             </form>
//           </div>

//           <aside className="space-y-8">
//             <ImageUploadSection 
//               formData={formData} 
//               uploading={uploading} 
//               uploadProgress={uploadProgress}
//               handleImageUpload={handleImageUpload} 
//               handleInputChange={handleInputChange} 
//               removeImage={removeImage}
//             />

//             <MetaSidebarSection 
//               formData={formData} 
//               handleInputChange={handleInputChange} 
//               setFormData={setFormData}
//               categories={categories}
//             />

//             <div className="bg-slate-900 rounded-[32px] md:rounded-[40px] p-6 md:p-8 text-white">
//               <h3 className="text-[10px] md:text-sm font-black uppercase tracking-[0.2em] mb-6 flex items-center">
//                 <Eye size={18} className="mr-2 text-emerald-400" /> Control System
//               </h3>
//               <ul className="space-y-4 text-[10px] md:text-xs font-medium text-slate-400 leading-relaxed">
//                 <li className="flex items-start">
//                   <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 shrink-0 mr-3 mt-1.5 shadow-[0_0_10px_rgba(16,185,129,0.5)]"></div>
//                   Subheadings (H3) improve SEO and user retention.
//                 </li>
//                 <li className="flex items-start">
//                   <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 shrink-0 mr-3 mt-1.5 shadow-[0_0_10px_rgba(16,185,129,0.5)]"></div>
//                   Keep original images high resolution for retinal displays.
//                 </li>
//               </ul>
//             </div>
//           </aside>
//         </div>
//       </div>
//     </div>
//   );
// }
