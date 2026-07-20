import { resend } from "@/libs/resend";
import WaitlistWelcome from "@/components/email/WaitlistWelcome";
import TeamNotification from "@/components/email/TeamNotification";

const FROM_EMAIL = "Kariflow <noreply@kariflow.com>";
const TEAM_EMAIL = process.env.TEAM_EMAIL!;

export async function sendWaitlistWelcomeEmail({
  fullName,
  email,
}: {
  fullName: string;
  email: string;
}) {
  const response = await resend.emails.send({
    from: FROM_EMAIL,
    to: email,
    subject: "🎉 Welcome to the Kariflow Waitlist",
    react: <WaitlistWelcome fullName={fullName} />,
  });

  console.log("✅ Welcome Email Response:", response);

  return response;
}

export async function sendWaitlistTeamNotification({
  fullName,
  email,
  businessType,
  country,
  state,
}: {
  fullName: string;
  email: string;
  businessType: string;
  country: string;
  state: string;
}) {
  const response = await resend.emails.send({
    from: FROM_EMAIL,
    to: TEAM_EMAIL,
    subject: "🚀 New Waitlist Signup",
    react: (
      <TeamNotification
        fullName={fullName}
        email={email}
        businessType={businessType}
        country={country}
        state={state}
      />
    ),
  });

  console.log("✅ Team Email Response:", response);

  return response;
}