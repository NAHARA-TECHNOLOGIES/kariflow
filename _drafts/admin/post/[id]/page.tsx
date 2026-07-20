// 'use client';
// import React, { useState } from 'react';
// import { ContentEditorSection } from '@/components/admin/post/PostFormEditor';
// import { ImageUploadSection } from '@/components/admin/post/ImageUploadSection';
// import { MetaSidebarSection } from '@/components/admin/post/MetaSidebarSection';

// export default function AdminPostForm({ params }: { params: { id?: string } }) {
//   const [formData, setFormData] = useState({
//     title: '', slug: '', excerpt: '', content: '', image: '', 
//     author: 'Smart Sunday', readTime: '5 min read', tags: []
//   });

//   const handleSave = async () => {
//     const res = await fetch('/api/blog/create', {
//       method: params.id ? 'PUT' : 'POST',
//       body: JSON.stringify(params.id ? { id: params.id, ...formData } : formData),
//       headers: { 'Content-Type': 'application/json' }
//     });
//     if (res.ok) alert('Article saved!');
//   };

//   return (
//     <div className="max-w-7xl mx-auto p-10 grid grid-cols-12 gap-8">
//       <div className="col-span-8">
//         <ContentEditorSection formData={formData} setFormData={setFormData} />
//       </div>
//       <div className="col-span-4 space-y-6">
//         <ImageUploadSection formData={formData} setFormData={setFormData} />
//         <MetaSidebarSection formData={formData} setFormData={setFormData} />
//         <button onClick={handleSave} className="w-full bg-emerald-600 text-white p-4 rounded-2xl font-black">
//           {params.id ? 'UPDATE' : 'PUBLISH'}
//         </button>
//       </div>
//     </div>
//   );
// }


export default function PlaceholderAdminPage() {
  return null; // Renders a blank page safely
}