import { relations } from "drizzle-orm";
import { int, sqliteTable } from "drizzle-orm/sqlite-core";

import { reservations } from "./reservations";
import { seat } from "./seat";
import { showtime } from "./showtime";

export const seat_reservation = sqliteTable("seat_reservation", {
  id: int().primaryKey({ autoIncrement: true }),
  reservation_id: int().notNull().references(() => reservations.id, { onDelete: "cascade" }),
  seat_id: int().notNull().references(() => seat.id),
  showtime_id: int().notNull().references(() => showtime.id),
  price_paid: int(),
});

export const seatReservationRelation = relations(seat_reservation, ({ one }) => ({
  reservation: one(reservations, {
    fields: [seat_reservation.reservation_id],
    references: [reservations.id],
  }),
  seats: one(seat, {
    fields: [seat_reservation.seat_id],
    references: [seat.id],
  }),
  showtime: one(showtime, {
    fields: [seat_reservation.showtime_id],
    references: [showtime.id],
  }),
}));
