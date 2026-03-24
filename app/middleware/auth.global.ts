import { authClient } from "~~/lib/auth-client";

export default defineNuxtRouteMiddleware(async () => {
  const { data: session } = await authClient.useSession(useFetch);
  console.error("SESSION", session.value);
});
