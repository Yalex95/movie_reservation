import { relations } from "drizzle-orm";
import { int, sqliteTable } from "drizzle-orm/sqlite-core";

import { cinema_room } from "./cinema-room";
import { movie } from "./movie";
import { pricing } from "./pricing";
import { reservations } from "./reservations";

export const showtime = sqliteTable("showtime", {
  id: int().primaryKey({ autoIncrement: true }),
  movie_id: int().notNull().references(() => movie.id),
  cinema_room_id: int().notNull().references(() => cinema_room.id),
  start_datetime: int().notNull(),
});

export const showtimeRelation = relations(showtime, ({ one, many }) => ({
  movie: one(movie, {
    fields: [showtime.movie_id],
    references: [movie.id],
  }),
  cinemaRoom: one(cinema_room, {
    fields: [showtime.cinema_room_id],
    references: [cinema_room.id],
  }),
  reservations: many(reservations),
  pricing: many(pricing),

}));
