import { relations } from "drizzle-orm";
import { int, sqliteTable, text } from "drizzle-orm/sqlite-core";

import { role_permissions } from "./role-permissions";

export const permission = sqliteTable("permission", {
  id: int().primaryKey({ autoIncrement: true }),
  name: text().notNull().unique(),//"create_movie", "delete_user"
  module: text()
});

export const permissionRelation = relations(permission, ({ many }) => ({
  role_permissions: many(role_permissions),
}));
