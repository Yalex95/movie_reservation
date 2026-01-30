import { authClient } from "~/lib/auth-client";

export default defineNuxtRouteMiddleware(async (to) => {
  // const result = await useFetch("/api/auth/get-session");//this works
  const relativeFetch = ((url: string, opts?: any) => {
  try {
    if (url.startsWith('http')) url = new URL(url).pathname
  } catch {}
  return useFetch(url, opts)
}) as any

const { data: session } = await authClient.useSession(relativeFetch)
console.log("Global Middleware Session:", session.value);
});
