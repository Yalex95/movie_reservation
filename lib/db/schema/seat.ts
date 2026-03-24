import { relations } from "drizzle-orm";
import {
  integer,
  pgTable,text
} from "drizzle-orm/pg-core";

import { cinema_room } from "./cinema-room";
import { seat_reservation } from "./seat-reservation";

export const seat = pgTable("seat", {
  id: integer("id").primaryKey().generatedAlwaysAsIdentity(),
  cinema_room_id: integer("cinnema_room_id").notNull().references(() => cinema_room.id, { onDelete: "cascade" }),
  row: text("row",{
    enum: ["regular", "vip", "disabled", "couple"],
  }).default("regular"),
  seat_number: integer("seat_number"),
  seat_type: text("seat_type"),
  //TODO:
  // is_active: int({ mode: "boolean" }).default(1),
  // x_position: int(), // Para mapa de asientos
  // y_position: int(),
});

export const seatRelation = relations(seat, ({ one, many }) => ({
  cinemaRoom: one(cinema_room, {
    fields: [seat.cinema_room_id],
    references: [cinema_room.id],
  }),
  seatReservation: many(seat_reservation),
}));
