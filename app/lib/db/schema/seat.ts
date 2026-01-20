import { relations } from "drizzle-orm";
import { int, sqliteTable, text } from "drizzle-orm/sqlite-core";

import { cinema_room } from "./cinema-room";
import { seat_reservation } from "./seat-reservation";

export const seat = sqliteTable("seat", {
  id: int().primaryKey({ autoIncrement: true }),
  cinema_room_id: int().notNull().references(() => cinema_room.id, { onDelete: "cascade" }),
  row: text({
    enum: ["regular", "vip", "disabled", "couple"],
  }).default("regular"),
  seat_number: int(),
  seat_type: text(),
  // is_active: int({ mode: "boolean" }).default(1),
  // x_position: int(), // Para mapa de asientos
  // y_position: int(),
});

export const searRelation = relations(seat, ({ one, many }) => ({
  cinemaRoom: one(cinema_room, {
    fields: [seat.cinema_room_id],
    references: [cinema_room.id],
  }),
  seatReservation: many(seat_reservation),
}));
