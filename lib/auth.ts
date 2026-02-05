import type { User } from "better-auth";

import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { inferAdditionalFields } from "better-auth/client/plugins";
import { admin } from "better-auth/plugins";

import { sendUserVerificationEmail } from "../server/utils/send-email-verification";
import db from "./db/index";
import * as schema from "./db/schema";
import env from "./env";

export type UserWithId = Omit<User, "id"> & {
  id: number;
};
export const auth = betterAuth({
  secret: env.BETTER_AUTH_SECRET,
  baseURL: env.BETTER_AUTH_URL,
  database: drizzleAdapter(db, {
    provider: "sqlite",
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
    inferAdditionalFields({
      user: {
        phone: {
          type: "string",
          required: false,
        },
      },
    }),
  ],
});
