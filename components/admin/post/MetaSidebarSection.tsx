// "use client";

// import type {
//   BlogPayload,
//   Category,
//   Tag,
// } from "@/app/admin/types/blog";

// interface Props {
//   form: BlogPayload;

//   categories: Category[];

//   tags: Tag[];

//   updateField: <
//     K extends keyof BlogPayload
//   >(
//     key: K,
//     value: BlogPayload[K]
//   ) => void;
// }

// export default function PublishSidebar({
//   form,
//   categories,
//   tags,
//   updateField,
// }: Props) {
//   function toggleTag(name: string) {
//     if (form.tags.includes(name)) {
//       updateField(
//         "tags",
//         form.tags.filter((t) => t !== name)
//       );
//     } else {
//       updateField(
//         "tags",
//         [...form.tags, name]
//       );
//     }
//   }

//   return (
//     <div className="space-y-6">

//       {/* Publish */}

//       <div className="rounded-xl bg-white p-6 shadow">

//         <h2 className="mb-5 text-lg font-semibold">
//           Publish
//         </h2>

//         <div className="space-y-4">

//           <label className="flex items-center justify-between">

//             <span>Published</span>

//             <input
//               type="checkbox"
//               checked={form.published}
//               onChange={(e) =>
//                 updateField(
//                   "published",
//                   e.target.checked
//                 )
//               }
//             />

//           </label>

//           <label className="flex items-center justify-between">

//             <span>Featured</span>

//             <input
//               type="checkbox"
//               checked={form.featured}
//               onChange={(e) =>
//                 updateField(
//                   "featured",
//                   e.target.checked
//                 )
//               }
//             />

//           </label>

//         </div>

//       </div>

//       {/* Category */}

//       <div className="rounded-xl bg-white p-6 shadow">

//         <h2 className="mb-5 text-lg font-semibold">
//           Category
//         </h2>

//         <select
//           value={form.categoryId}
//           onChange={(e) =>
//             updateField(
//               "categoryId",
//               e.target.value
//             )
//           }
//           className="w-full rounded-lg border p-3"
//         >

//           <option value="">
//             Select Category
//           </option>

//           {categories.map((category) => (

//             <option
//               key={category.id}
//               value={category.id}
//             >
//               {category.name}
//             </option>

//           ))}

//         </select>

//       </div>

//       {/* Tags */}

//       <div className="rounded-xl bg-white p-6 shadow">

//         <h2 className="mb-5 text-lg font-semibold">
//           Tags
//         </h2>

//         <div className="flex flex-wrap gap-2">

//           {tags.map((tag) => {

//             const active =
//               form.tags.includes(tag.name);

//             return (

//               <button
//                 key={tag.id}
//                 type="button"
//                 onClick={() =>
//                   toggleTag(tag.name)
//                 }
//                 className={`rounded-full px-4 py-2 text-sm transition ${
//                   active
//                     ? "bg-black text-white"
//                     : "border"
//                 }`}
//               >

//                 {tag.name}

//               </button>

//             );

//           })}

//         </div>

//       </div>

//       {/* SEO */}

//       <div className="rounded-xl bg-white p-6 shadow">

//         <h2 className="mb-5 text-lg font-semibold">
//           SEO
//         </h2>

//         <div className="space-y-4">

//           <input
//             type="text"
//             value={form.seoTitle}
//             onChange={(e) =>
//               updateField(
//                 "seoTitle",
//                 e.target.value
//               )
//             }
//             placeholder="SEO Title"
//             className="w-full rounded-lg border p-3"
//           />

//           <textarea
//             rows={4}
//             value={form.seoDescription}
//             onChange={(e) =>
//               updateField(
//                 "seoDescription",
//                 e.target.value
//               )
//             }
//             placeholder="SEO Description"
//             className="w-full rounded-lg border p-3"
//           />

//         </div>

//       </div>

//     </div>
//   );
// }