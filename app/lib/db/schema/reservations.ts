import { relations } from "drizzle-orm";
import { int, sqliteTable, text } from "drizzle-orm/sqlite-core";

import { user } from "./auth";
import { seat_reservation } from "./seat-reservation";
import { showtime } from "./showtime";

export const reservations = sqliteTable("reservations", {
  id: int().primaryKey({ autoIncrement: true }),
  user_id: int().notNull().references(() => user.id),
  showtime_id: int().notNull().references(() => showtime.id),
  status: text(),
  createdAt: int().notNull().$default(() => Date.now()),
});

export const reservationsRelation = relations(reservations, ({ one, many }) => ({
  showtime: one(showtime, {
    fields: [reservations.showtime_id],
    references: [showtime.id],
  }),
  seats_reservation: many(seat_reservation),
  user: one(user, {
    fields: [reservations.user_id],
    references: [user.id],
  }),

}));
