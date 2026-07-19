// import { NextRequest, NextResponse } from "next/server";
// import { inquiryService } from "@/services/inquiry.service";

// export async function GET() {
//   try {
//     const inquiries = await inquiryService.getAll();

//     return NextResponse.json({
//       success: true,
//       data: inquiries,
//     });
//   } catch (error) {
//     return NextResponse.json(
//       {
//         success: false,
//         message: "Unable to fetch inquiries.",
//       },
//       {
//         status: 500,
//       }
//     );
//   }
// }

// export async function POST(req: NextRequest) {
//   try {
//     const body = await req.json();

//     const {
//       fullName,
//       email,
//       goal,
//       message,
//     } = body;

//     if (
//       !fullName ||
//       !email ||
//       !goal ||
//       !message
//     ) {
//       return NextResponse.json(
//         {
//           success: false,
//           message: "Missing required fields.",
//         },
//         {
//           status: 400,
//         }
//       );
//     }

//     const inquiry = await inquiryService.create({
//       fullName,
//       email,
//       goal,
//       message,
//     });

//     return NextResponse.json(
//       {
//         success: true,
//         message: "Inquiry submitted successfully.",
//         data: inquiry,
//       },
//       {
//         status: 201,
//       }
//     );
//   } catch (error) {
//     return NextResponse.json(
//       {
//         success: false,
//         message: "Unable to submit inquiry.",
//       },
//       {
//         status: 500,
//       }
//     );
//   }
// }


import { NextRequest, NextResponse } from "next/server";
import { ratelimit } from "@/libs/rate";

export async function POST(req: NextRequest) {
  try {
    const { fullName, email, goal, message } = await req.json();

    if (!fullName || !email || !goal || !message) {
      return NextResponse.json(
        {
          success: false,
          message: "All fields are required."
        },
        {
          status: 400
        }
      );
    }

    const ip =
req.headers.get("x-forwarded-for")
?? "anonymous";

const { success } =
await ratelimit.limit(ip);

if (!success) {

return NextResponse.json({

success:false,

message:
"Too many requests. Please try again later."

},

{
status:429
});

}

    const response = await fetch(
      process.env.GOOGLE_APPS_SCRIPT_URL!,
      {
        method: "POST",
        redirect: "follow",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          fullName,
          email,
          goal,
          message,
        }),
      }
    );

    const text = await response.text();

    let result;

    try {
      result = JSON.parse(text);
    } catch {
      result = {
        success: response.ok,
        message: text,
      };
    }

    if (!response.ok || result.success === false) {
      return NextResponse.json(
        {
          success: false,
          message: result.message || "Unable to save inquiry."
        },
        {
          status: 500
        }
      );
    }

    return NextResponse.json({
      success: true,
      message: "Inquiry submitted successfully."
    });

  } catch (error: any) {

    console.error("Inquiry API Error", error);

    return NextResponse.json(
      {
        success: false,
        message: error.message ?? "Unexpected server error."
      },
      {
        status: 500
      }
    );
  }
}