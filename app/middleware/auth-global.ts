import { authClient } from "~/lib/auth-client";

export default defineNuxtRouteMiddleware(async () => {
  // const { data: session } = await authClient.getSession();
  // if (!session?.session) {
  //   if (to.path === "/dashboard") {
  //     return navigateTo("/");
  //   }
  // }
});
