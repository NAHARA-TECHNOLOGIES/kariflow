// "use client";

// import { Bold, Italic, List, ListOrdered } from "lucide-react";

// interface Props {
//   value: string;
//   onChange: (value: string) => void;
// }

// export default function ContentEditor({
//   value,
//   onChange,
// }: Props) {
//   function wrap(before: string, after = before) {
//     const textarea = document.getElementById(
//       "blog-editor"
//     ) as HTMLTextAreaElement;

//     if (!textarea) return;

//     const start = textarea.selectionStart;
//     const end = textarea.selectionEnd;

//     const selected = value.substring(start, end);

//     const newText =
//       value.substring(0, start) +
//       before +
//       selected +
//       after +
//       value.substring(end);

//     onChange(newText);

//     requestAnimationFrame(() => {
//       textarea.focus();
//       textarea.selectionStart =
//         start + before.length;
//       textarea.selectionEnd =
//         end + before.length;
//     });
//   }

//   return (
//     <div className="rounded-xl bg-white shadow">

//       <div className="flex gap-2 border-b p-3">

//         <button
//           type="button"
//           onClick={() => wrap("**")}
//           className="rounded border p-2 hover:bg-gray-100"
//         >
//           <Bold size={18} />
//         </button>

//         <button
//           type="button"
//           onClick={() => wrap("*")}
//           className="rounded border p-2 hover:bg-gray-100"
//         >
//           <Italic size={18} />
//         </button>

//         <button
//           type="button"
//           onClick={() => wrap("\n- ")}
//           className="rounded border p-2 hover:bg-gray-100"
//         >
//           <List size={18} />
//         </button>

//         <button
//           type="button"
//           onClick={() => wrap("\n1. ")}
//           className="rounded border p-2 hover:bg-gray-100"
//         >
//           <ListOrdered size={18} />
//         </button>

//       </div>

//       <textarea
//         id="blog-editor"
//         value={value}
//         onChange={(e) =>
//           onChange(e.target.value)
//         }
//         rows={24}
//         placeholder="Write your article..."
//         className="min-h-[600px] w-full resize-none border-0 p-6 outline-none"
//       />

//     </div>
//   );
// }