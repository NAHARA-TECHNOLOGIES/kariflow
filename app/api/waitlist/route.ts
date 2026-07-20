// import { NextRequest, NextResponse } from "next/server";
// import { waitlistService } from "@/services/waitlist.service";

// export async function POST(req: NextRequest) {
//   try {
//     const body = await req.json();

//     const {
//       fullName,
//       email,
//       businessType,
//       country,
//       state,
//       frequency,
//       categories,
//     } = body;

//     // Basic validation
//     if (
//       !fullName ||
//       !email ||
//       !businessType ||
//       !country ||
//       !state
//     ) {
//       return NextResponse.json(
//         {
//           success: false,
//           message: "Please fill in all required fields.",
//         },
//         { status: 400 }
//       );
//     }

//     const subscriber = await waitlistService.subscribe({
//       fullName,
//       email,
//       businessType,
//       country,
//       state,
//       frequency,
//       categories,
//       ipAddress:
//         req.headers.get("x-forwarded-for") ??
//         req.headers.get("x-real-ip") ??
//         undefined,
//     });

//     return NextResponse.json(
//       {
//         success: true,
//         message: "Successfully joined the waitlist.",
//         data: subscriber,
//       },
//       {
//         status: 201,
//       }
//     );
//   } catch (error) {
//     console.error(error);

//     return NextResponse.json(
//       {
//         success: false,
//         message:
//           error instanceof Error
//             ? error.message
//             : "Internal Server Error",
//       },
//       {
//         status: 500,
//       }
//     );
//   }
// }

// export async function GET() {
//   try {
//     const subscribers = await waitlistService.getAll();

//     return NextResponse.json({
//       success: true,
//       data: subscribers,
//     });
//   } catch (error) {
//     console.error(error);

//     return NextResponse.json(
//       {
//         success: false,
//         message: "Failed to fetch subscribers.",
//       },
//       {
//         status: 500,
//       }
//     );
//   }
// }


import { NextRequest, NextResponse } from "next/server";
import {
  sendWaitlistWelcomeEmail,
  sendWaitlistTeamNotification,
} from "@/libs/mail";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    const {
      fullName,
      email,
      businessType,
      country,
      state,
    } = body;

    if (
      !fullName ||
      !email ||
      !businessType ||
      !country ||
      !state
    ) {
      return NextResponse.json(
        {
          success: false,
          message: "Please complete all required fields.",
        },
        {
          status: 400,
        }
      );
    }

    console.log("🚀 New waitlist submission:", {
      fullName,
      email,
      businessType,
      country,
      state,
    });

    // Save to Google Sheets
    const googleResponse = await fetch(
      process.env.GOOGLE_APPS_SCRIPT_URL!,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          type: "waitlist",
          fullName,
          email,
          businessType,
          country,
          state,
        }),
      }
    );

    const googleResult = await googleResponse.json();

    console.log("📄 Google Apps Script:", googleResult);

    if (!googleResponse.ok || googleResult.success === false) {
      return NextResponse.json(
        {
          success: false,
          message:
            googleResult.message ??
            "Unable to join waitlist.",
        },
        {
          status: 500,
        }
      );
    }

    // Send welcome email
    try {
      console.log("📧 Sending welcome email...");

      const welcome = await sendWaitlistWelcomeEmail({
        fullName,
        email,
      });

      console.log("✅ Welcome Email Result:", welcome);
    } catch (error) {
      console.error(
        "❌ Welcome Email Failed:",
        error
      );
    }

    // Send internal notification
    try {
      console.log("📧 Sending team notification...");

      const notification =
        await sendWaitlistTeamNotification({
          fullName,
          email,
          businessType,
          country,
          state,
        });

      console.log(
        "✅ Team Notification Result:",
        notification
      );
    } catch (error) {
      console.error(
        "❌ Team Notification Failed:",
        error
      );
    }

    return NextResponse.json({
      success: true,
      message: "Successfully joined the waitlist.",
    });
  } catch (error) {
    console.error(
      "❌ Waitlist API Error:",
      error
    );

    return NextResponse.json(
      {
        success: false,
        message:
          "Something went wrong. Please try again.",
      },
      {
        status: 500,
      }
    );
  }
}