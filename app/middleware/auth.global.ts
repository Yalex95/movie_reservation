import { auth } from "~/lib/auth";
import { authClient } from "~/lib/auth-client";

export default defineNuxtRouteMiddleware((to, from) => {
  // const result = await useFetch("/api/auth/get-session");//this works
  /*
  const relativeFetch = ((url: string, opts?: any) => {
    try {
      if (url.startsWith("http"))
        url = new URL(url).pathname;
    }
    catch {}
    return useFetch(url, opts);
  }) as any;

  const result = await authClient.useSession(relativeFetch);

  const isLoggedIn = result.data.value;

  if (isLoggedIn?.user) {
    if (isLoggedIn?.user?.role === "admin") {
      if (to.path === "/" || to.path === "/sign-in" || to.path === "/sign-up" || to.path === "/auth/callback") {
        return navigateTo("/dashboard");
      }
    }
    else if (isLoggedIn?.user?.role === "user") {
      if (to.path === "/" || to.path === "/sign-in" || to.path === "/sign-up" || to.path === "/auth/callback") {
        return navigateTo("/"); // redirect to user home page if exists
      }
    }
  }
  else {
    if (to.path.startsWith("/dashboard")) {
      return navigateTo("/sign-in");
    }
  } */
  const authStore = useAuthStore();
  authStore.init();
  // ⏳ Espera a que Better Auth resuelva la sesión

  const user = authStore.user;
  console.log("Middleware user:", user);
/*
  if (!user) {
    if (to.path.startsWith("/dashboard")) {
      return navigateTo("/sign-in", { replace: true });
    }
    return;
  }

  if (user.role === "admin") {
    if (
      to.path === "/"
      || to.path === "/sign-in"
      || to.path === "/sign-up"
      || to.path === "/auth/callback"
    ) {
      return navigateTo("/dashboard", { replace: true });
    }
  }

  if (user.role === "user") {
    if (
      to.path === "/sign-in"
      || to.path === "/sign-up"
      || to.path === "/auth/callback"
    ) {
      return navigateTo("/", { replace: true });
    }
  } */
});
