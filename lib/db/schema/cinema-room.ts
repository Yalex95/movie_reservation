import { relations } from "drizzle-orm";
import { int, integer, sqliteTable, text } from "drizzle-orm/sqlite-core";

import { seat } from "./seat";
import { showtime } from "./showtime";

export const cinema_room = sqliteTable("cinema_room", {
  id: int().primaryKey({ autoIncrement: true }),
  name: text(),
  capacity: int(),
  room_type: text(),
  is_vip: integer({ mode: "boolean" }).default(false).notNull(),
});

export const cinemaRoomRelations = relations(cinema_room, ({ many }) => ({
  showtime: many(showtime),
  seats: many(seat),
}));
