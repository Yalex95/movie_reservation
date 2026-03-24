import { findUsers } from "~~/lib/db/queries/user";

import defineAuthorizedEventHandler from "~/utils/define-authorized-event-handler";

export default defineAuthorizedEventHandler(["admin"], async (event) => {
  const query = getQuery(event);
  const users = await findUsers(query);
  return users;
});
