import { relations } from "drizzle-orm";
import {
  integer,
  pgTable,
  text,
} from "drizzle-orm/pg-core";

import { user } from "./auth";
import { seat_reservation } from "./seat-reservation";
import { showtime } from "./showtime";

export const reservations = pgTable("reservations", {
  id: integer("id").primaryKey().generatedAlwaysAsIdentity(),
  user_id: text("user_id").notNull().references(() => user.id),
  showtime_id: integer("showtime_id").notNull().references(() => showtime.id),
  status: text("status"),
  createdAt: integer("created_at").notNull().$default(() => Date.now()),
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
