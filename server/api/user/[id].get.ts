import { getUser } from "~~/lib/db/queries/user";

import defineAuthorizedEventHandler from "~/utils/define-authorized-event-handler";

export default defineAuthorizedEventHandler(["admin"], async (event) => {
  const id = getRouterParam(event, 'id')

  if (!id) {
    throw createError({
      statusCode: 404,
      statusMessage: "User is required",
    });
  }
  const user = await getUser(id);
  if (!user) {
    throw createError({
      statusCode: 404,
      statusMessage: "User not found",
    });
  }
  return user;
});
