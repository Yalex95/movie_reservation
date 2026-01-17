import { int, sqliteTable, text } from "drizzle-orm/sqlite-core";

import { user } from "./auth";
import { showtime } from "./showtime";

export const reservations = sqliteTable("reservations", {
  id: int().primaryKey({ autoIncrement: true }),
  user_id: int().notNull().references(() => user.id),
  showtime_id:int().notNull().references(() =>showtime.id),
  status: text(),
  createdAt: int().notNull().$default(()=>Date.now())
});
