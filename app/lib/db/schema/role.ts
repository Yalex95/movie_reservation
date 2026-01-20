import { relations } from "drizzle-orm";
import { int, sqliteTable, text } from "drizzle-orm/sqlite-core";

import { user } from "./auth";
import { role_permissions } from "./role-permissions";

export const role = sqliteTable("role", {
  id: int().primaryKey({ autoIncrement: true }),
  role: text(),
});

export const roleRelations = relations(role, ({ many }) => ({
  user: many(user),
  role_permissions: many(role_permissions),
}));
