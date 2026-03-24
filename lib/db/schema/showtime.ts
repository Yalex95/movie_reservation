import { relations } from "drizzle-orm";
import {
  integer,
  pgTable,
  timestamp,
} from "drizzle-orm/pg-core";

import { cinema_room } from "./cinema-room";
import { movie } from "./movie";
import { pricing } from "./pricing";
import { reservations } from "./reservations";

export const showtime = pgTable("showtime", {
  id: integer("id").primaryKey().generatedAlwaysAsIdentity(),
  movie_id: integer("movie_id").notNull().references(() => movie.id),
  cinema_room_id: integer("cinema_room_id").notNull().references(() => cinema_room.id),
  start_datetime: timestamp("start_datetime", {
    withTimezone: true,
    mode: "string",
  }).notNull(),
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
