import { relations } from "drizzle-orm";
import {
  integer,
  pgTable,
  text,
} from "drizzle-orm/pg-core";

import { showtime } from "./showtime";

export const pricing = pgTable("pricing", {
  id: integer("id").primaryKey().generatedAlwaysAsIdentity(),
  showtime_id: integer("showtime_id").notNull().references(() => showtime.id),
  price: integer("price"),
  currency: text("currency"),
  base_price: integer("base_price"),
});

export const pricingReservation = relations(pricing, ({ one }) => ({
  showtime: one(showtime, {
    fields: [pricing.showtime_id],
    references: [showtime.id],
  }),
}));
