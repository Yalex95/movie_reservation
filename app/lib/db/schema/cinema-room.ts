import { int, integer, sqliteTable, text } from "drizzle-orm/sqlite-core";

export const cinema_room = sqliteTable("cinema_room", {
  id: int().primaryKey({ autoIncrement: true }),
  name: text(),
  capacity: int(),
  room_type: text(),
  is_vip: integer({ mode: "boolean" }).default(false).notNull(),
});
