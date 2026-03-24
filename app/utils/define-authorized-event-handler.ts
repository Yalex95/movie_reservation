import type { UserWithId } from "~~/lib/auth";
import type { Role } from "~~/lib/types";
import type { H3Event, H3EventContext } from "h3";

type user = Partial<UserWithId> & {
  role: Role;
};
type AuthenticatedEvent = H3Event & {
  context: H3EventContext & {
    user: user;
  };
};

export default function defineAuthorizedEventHandler<T>(
  allowedRoles: Role[],
  handler: (event: AuthenticatedEvent) => T,
) {
  return defineEventHandler(async (event) => {
    const user = event.context.user;
    if (!user) {
      throw createError({
        statusCode: 401,
        statusMessage: "Unauthorized",
      });
    }
    if (!allowedRoles.includes(user.role)) {
      throw createError({
        statusCode: 403,
        statusMessage: "Forbidden",
      });
    }

    return handler(event as AuthenticatedEvent);
  });
}
