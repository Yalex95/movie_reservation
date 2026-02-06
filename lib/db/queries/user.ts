import { and, eq } from "drizzle-orm";

import db from "..";
import { user } from "../schema";

type userFilterParams = {
  banned?: boolean;// cambiar en como esta cinfigurado en better auth
  name?: string;
  role?: "regular" | "admin";// agregar mas roles
};
export async function findUsers(params: userFilterParams) {
  const filters = [];
  if (params.banned) {
    filters.push(eq(user.banned, params.banned));
  }
  if (params.name) {
    filters.push(eq(user.name, params.name));
  }
  if (params.role) {
    filters.push(eq(user.role, params.role));
  }
  return db.query.user.findMany({
    where: filters.length ? and(...filters) : undefined,
  });
}
