import { relations } from "drizzle-orm";
import { int, sqliteTable, text } from "drizzle-orm/sqlite-core";

import { showtime } from "./showtime";

export const pricing = sqliteTable("pricing", {
  id: int().primaryKey({ autoIncrement: true }),
  showtime_id: int().notNull().references(() => showtime.id),
  price: int(),
  currency: text(),
  base_price: int(),
});

export const pricingReservation = relations(pricing, ({ one }) => ({
  showtime: one(showtime, {
    fields: [pricing.showtime_id],
    references: [showtime.id],
  }),
}));
