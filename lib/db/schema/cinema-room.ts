import { relations } from "drizzle-orm";
import {
  boolean,
  integer,
  pgTable,
  text,
} from "drizzle-orm/pg-core";

import { seat } from "./seat";
import { showtime } from "./showtime";

export const cinema_room = pgTable("cinema_room", {
  id: integer("id").primaryKey().generatedAlwaysAsIdentity(),
  name: text("name"),
  capacity: integer("capacity"),
  room_type: text("room_type"),
  is_vip: boolean("banned").default(false),
});

export const cinemaRoomRelations = relations(cinema_room, ({ many }) => ({
  showtime: many(showtime),
  seats: many(seat),
}));
