import { adminClient } from "better-auth/client/plugins";
import { createAuthClient } from "better-auth/vue";
// make sure to import from better-auth/vue
export const authClient = createAuthClient({
  // you can pass client configuration here
  baseURL: "http://localhost:3000",
  plugins: [
    adminClient(),
  ],
});
