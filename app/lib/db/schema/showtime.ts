import { int, sqliteTable } from "drizzle-orm/sqlite-core";

import { cinema_room } from "./cinema-room";
import { movie } from "./movie";

export const showtime = sqliteTable("showtime", {
  id: int().primaryKey({ autoIncrement: true }),
  movie_id: int().notNull().references(() => movie.id),
  cinema_room_id: int().notNull().references(() => cinema_room.id),
  start_datetime: int().notNull(),
});
