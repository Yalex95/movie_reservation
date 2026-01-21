import type { User } from "better-auth";

import { Resend } from "resend";

import env from "~/lib/env";

const resend = new Resend(env.RESEND_API_KEY);

export async function sendUserVerificationEmail(user: User, url: string) {
  try {
    await resend.emails.send({
      from: "Acme <onboarding@resend.dev>", // change to env. on prod
      to: user.email,
      subject: "Email Verification",
      text: `Please click the followig link to verify your email ${url}`,
      html: "<strong>It works!</strong>", // use an email template
    });

    console.warn("email sent successully");
  }
  catch (error) {
    console.error("Failed to send email:", error);
    throw createError({
      statusCode: 500,
      message: "Error sending email",
    });
  }
}
