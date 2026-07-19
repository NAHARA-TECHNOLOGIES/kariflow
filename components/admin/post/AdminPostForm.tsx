// "use client";

// import Link from "next/link";
// import { ArrowLeft } from "lucide-react";
// import { useParams } from "next/navigation";

// import BlogForm from "@/components/BlogForm";

// export default function AdminPostForm() {
//     const params = useParams();

//     const id = params?.id as string | undefined;

//     return (
//         <div className="min-h-screen bg-slate-50 py-10">

//             <div className="mx-auto max-w-7xl px-6">

//                 <Link
//                     href="/admin/blogs"
//                     className="mb-8 flex items-center gap-2"
//                 >
//                     <ArrowLeft size={18} />

//                     Back
//                 </Link>

//                 <div className="mb-8">

//                     <h1 className="text-4xl font-bold">

//                         {id
//                             ? "Edit Blog"
//                             : "Create Blog"}

//                     </h1>

//                 </div>

//                 <BlogForm
//                     blogId={id}
//                 />

//             </div>

//         </div>
//     );
// }