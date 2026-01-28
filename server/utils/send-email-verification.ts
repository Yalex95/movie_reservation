import type { User } from "better-auth";

import { Resend } from "resend";

import env from "../../app/lib/env";

const resend = new Resend(env.RESEND_API_KEY);

export async function sendUserVerificationEmail(user: User, url: string) {
  console.warn(user);
  try {
    await resend.emails.send({
      from: "Acme <onboarding@resend.dev>", // change to env. on prod
      to: user.email,
      subject: "Email Verification",

      html: `<strong>It works!</strong><p>Please click the followig <a href='${url}' target='_blank>link</a> to verify your email </p>`, // use an email template
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
