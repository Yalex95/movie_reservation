import { relations } from "drizzle-orm";
import { int, sqliteTable,unique } from "drizzle-orm/sqlite-core";

import { permission } from "./permission";
import { role } from "./role";

export const role_permissions = sqliteTable("role_permissions", {
  id: int().primaryKey({ autoIncrement: true }),
  permission_id: int().notNull().references(() => permission.id, {
    onDelete: "cascade",
  }),
  role_id: int().notNull().references(() => role.id, { onDelete: "cascade" }),
}, table => ({
  uniqueRolePermission: unique("unique_role_permission").on(
    table.role_id,
    table.permission_id,
  ),
}));

export const rolePermissionsRelations = relations(role_permissions, ({ one }) => ({
  role: one(role, {
    fields: [role_permissions.role_id],
    references: [role.id],
  }),
  permission: one(permission, {
    fields: [role_permissions.permission_id],
    references: [permission.id],
  }),

}));
