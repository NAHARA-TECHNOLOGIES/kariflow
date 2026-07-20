// "use client";

// import Image from "next/image";
// import { Camera, Loader2, Trash2 } from "lucide-react";

// interface Props {
//   image?: string;
//   uploading: boolean;
//   onUpload: (file: File) => Promise<void>;
//   onRemove: () => void;
// }

// export default function ImageUploader({
//   image,
//   uploading,
//   onUpload,
//   onRemove,
// }: Props) {
//   async function handleChange(
//     e: React.ChangeEvent<HTMLInputElement>
//   ) {
//     const file = e.target.files?.[0];

//     if (!file) return;

//     await onUpload(file);
//   }

//   return (
//     <div className="rounded-xl border bg-white p-6 shadow-sm">
//       <h3 className="mb-4 text-lg font-semibold">
//         Featured Image
//       </h3>

//       {image ? (
//         <div className="space-y-4">
//           <div className="relative h-60 overflow-hidden rounded-lg border">
//             <Image
//               src={image}
//               alt="Blog Cover"
//               fill
//               className="object-cover"
//             />
//           </div>

//           <button
//             type="button"
//             onClick={onRemove}
//             className="flex w-full items-center justify-center gap-2 rounded-lg border border-red-300 py-3 text-red-600 transition hover:bg-red-50"
//           >
//             <Trash2 size={18} />
//             Remove Image
//           </button>
//         </div>
//       ) : (
//         <label className="flex h-60 cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed transition hover:border-black">
//           {uploading ? (
//             <>
//               <Loader2
//                 size={40}
//                 className="animate-spin"
//               />
//               <span className="mt-3 text-sm">
//                 Uploading...
//               </span>
//             </>
//           ) : (
//             <>
//               <Camera size={42} />
//               <span className="mt-3 font-medium">
//                 Click to upload image
//               </span>

//               <span className="mt-1 text-xs text-gray-500">
//                 JPG, PNG, WEBP
//               </span>
//             </>
//           )}

//           <input
//             hidden
//             type="file"
//             accept="image/*"
//             onChange={handleChange}
//           />
//         </label>
//       )}
//     </div>
//   );
// }