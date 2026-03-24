import { relations } from "drizzle-orm";
import {
  integer,
  pgTable,
} from "drizzle-orm/pg-core";

import { reservations } from "./reservations";
import { seat } from "./seat";
import { showtime } from "./showtime";

export const seat_reservation = pgTable("seat_reservation", {
  id: integer("id").primaryKey().generatedAlwaysAsIdentity(),
  reservation_id: integer("reservation_id").notNull().references(() => reservations.id, { onDelete: "cascade" }),
  seat_id: integer("seat_id").notNull().references(() => seat.id),
  showtime_id: integer("showtime_id").notNull().references(() => showtime.id),
  price_paid: integer("price_paid"),
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
