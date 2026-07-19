// import { NextRequest, NextResponse } from "next/server";
// import { blogService } from "@/services/blog.service";

// interface Context {
//   params: Promise<{
//     slug: string;
//   }>;
// }

// export async function GET(
//   request: NextRequest,
//   { params }: Context
// ) {
//   try {
//     const { slug } = await params;

//     const blog = await blogService.getBySlug(slug);

//     if (!blog) {
//       return NextResponse.json(
//         {
//           success: false,
//           message: "Blog not found.",
//         },
//         {
//           status: 404,
//         }
//       );
//     }

//     await blogService.incrementViews(slug);

//     return NextResponse.json({
//       success: true,
//       data: blog,
//     });
//   } catch (error) {
//     console.error(error);

//     return NextResponse.json(
//       {
//         success: false,
//         message: "Unable to fetch blog.",
//       },
//       {
//         status: 500,
//       }
//     );
//   }
// }

import { NextResponse } from 'next/server';

export async function GET() {
  return NextResponse.json({ message: "Stub route active" });
}