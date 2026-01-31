import { adminClient } from "better-auth/client/plugins";
import { createAuthClient } from "better-auth/vue";

export const authClient = createAuthClient({
  baseURL: "http://localhost:3000",

  credentials: "include",

  plugins: [
    adminClient(),
  ],
});

export const {
  signIn,
  signOut,
  signUp,
  useSession,
  resetPassword,
  deleteUser,
} = authClient;
