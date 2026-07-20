// "use client";

// import ImageUploader from "@/components/admin/post/ImageUploadSection";
// import ContentEditor from "@/components/admin/post/PostFormEditor";
// import PublishSidebar from "@/components/admin/post/MetaSidebarSection";
// import { useBlogForm } from "@/app/admin/blogs/hooks/useBlogForm";

// interface Props {
//   blogId?: string;
// }

// export default function BlogForm({
//   blogId,
// }: Props) {
//   const {
//     form,
//     updateField,
//     categories,
//     tags,
//     loading,
//     saving,
//     uploading,
//     uploadImage,
//     submit,
//   } = useBlogForm(blogId);

//   if (loading) {
//     return (
//       <div className="flex h-96 items-center justify-center">
//         Loading...
//       </div>
//     );
//   }

//   return (
//     <div className="grid gap-8 lg:grid-cols-3">

//       {/* LEFT */}

//       <div className="space-y-6 lg:col-span-2">

//         <div className="rounded-xl bg-white p-6 shadow">

//           <h2 className="mb-5 text-xl font-semibold">
//             Blog Information
//           </h2>

//           <div className="space-y-5">

//             <input
//               value={form.title}
//               onChange={(e) =>
//                 updateField(
//                   "title",
//                   e.target.value
//                 )
//               }
//               placeholder="Blog title"
//               className="w-full rounded-lg border p-3"
//             />

//             <input
//               value={form.author}
//               onChange={(e) =>
//                 updateField(
//                   "author",
//                   e.target.value
//                 )
//               }
//               placeholder="Author"
//               className="w-full rounded-lg border p-3"
//             />

//             <textarea
//               rows={4}
//               value={form.excerpt}
//               onChange={(e) =>
//                 updateField(
//                   "excerpt",
//                   e.target.value
//                 )
//               }
//               placeholder="Excerpt..."
//               className="w-full rounded-lg border p-3"
//             />

//           </div>

//         </div>

//         <ContentEditor
//           value={form.content}
//           onChange={(value) =>
//             updateField(
//               "content",
//               value
//             )
//           }
//         />

//       </div>

//       {/* RIGHT */}

//       <div className="space-y-6">

//         <ImageUploader
//           image={form.image}
//           uploading={uploading}
//           onUpload={uploadImage}
//           onRemove={() =>
//             updateField("image", "")
//           }
//         />

//         <PublishSidebar
//           form={form}
//           categories={categories}
//           tags={tags}
//           updateField={updateField}
//         />

//         <button
//           onClick={submit}
//           disabled={saving}
//           className="w-full rounded-xl bg-black py-4 font-semibold text-white hover:bg-gray-900 disabled:opacity-50"
//         >
//           {saving
//             ? "Saving..."
//             : blogId
//             ? "Update Blog"
//             : "Publish Blog"}
//         </button>

//       </div>

//     </div>
//   );
// }