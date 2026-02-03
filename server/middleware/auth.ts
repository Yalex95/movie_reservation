import type { UserWithId } from "~~/lib/auth";

import { auth } from "~~/lib/auth";

export default defineEventHandler(async (event) => {
  const session = await auth.api.getSession({
    headers: event.headers,
  });
  // attach session data to context
  event.context.user = session?.user as unknown as UserWithId;

  if (event.path.startsWith("/sign-in") || event.path.startsWith("/sign-up")) {
    if (session?.user.role === "admin") {
      await sendRedirect(event, "/dashboard", 302);
    }
    else if (session?.user.role === "regular") {
      await sendRedirect(event, "/", 302);// change to profile
    }
  }

  if (event.path.startsWith("/auth/callback")) {
    if (session?.user.role === "admin") {
      await sendRedirect(event, "/dashboard", 302);
    }
    else if (session?.user.role === "regular") {
      await sendRedirect(event, "/", 302);// change to profile
    }
  }
});
