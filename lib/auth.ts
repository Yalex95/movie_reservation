import type { User } from "better-auth";

import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { admin } from "better-auth/plugins";

import type { Role } from "./types";

import { sendUserVerificationEmail } from "../server/utils/send-email-verification";
import {db} from "./db/index";
import * as schema from "./db/schema";
import env from "./env";

export type UserWithId = Omit<User, "id"> & {
  id: number;
  // role: Role;
};
export const auth = betterAuth({
  secret: env.BETTER_AUTH_SECRET,
  baseURL: env.BETTER_AUTH_URL,
  trustedOrigins: [env.BETTER_AUTH_URL || 'http://localhost:3000'],
  database: drizzleAdapter(db, {
    provider: "pg",
    schema: {
      user: schema.user,
      session: schema.session,
      account: schema.account,
      verification: schema.verification,
    },
  }),
  emailAndPassword: {
    enabled: true,
    requireEmailVerification: true,
  },
  emailVerification: {
    sendVerificationEmail: async ({ user, url }) => {
      void sendUserVerificationEmail(user, url);
    },
    sendOnSignIn: true,
  },
  user: {
    additionalFields: {
      phone: {
        type: "string",
        required: false,
        input: true,
        database: true,
      },

      is_active: {
        type: "boolean",
        required: false,
        default: false,
        input: false,
        database: true,
      },
    },
  },
  plugins: [
    admin({ defaultRole: "regular", adminRoles: ["admin"] }),

  ],
});
