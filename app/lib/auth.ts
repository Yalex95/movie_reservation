import { sendUserVerificationEmail } from "~~/server/utils/send-email-verification";
import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";

import db from "./db/index"; // your drizzle instance

export const auth = betterAuth({
  database: drizzleAdapter(db, {
    provider: "sqlite",
  }),

  emailAndPassword: {
    enabled: true,
    requireEmailVerification: true,
    async sendResetPassword(url) {
      console.warn("Reset password url:", url);
    },
  },
  emailVerification: {
    sendVerificationEmail: async ({ user, url }) => {
      sendUserVerificationEmail(user, url);
    },
    sendOnSignIn: true,
  },

});
