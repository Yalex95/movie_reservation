import { relations } from "drizzle-orm";
import { int, sqliteTable, text } from "drizzle-orm/sqlite-core";

import { actor } from "./actor";
import { movie } from "./movie";

export const cast = sqliteTable("cast", {
  id: int().primaryKey({ autoIncrement: true }),
  actor_id: int().notNull().references(() => actor.id, { onDelete: "cascade" }),
  movie_id: int().notNull().references(() => movie.id, { onDelete: "cascade" }),
  character_name: text().notNull(),
  roleOrder: text(),

});

export const castRelations = relations(cast, ({ one }) => ({
  movie: one(movie, {
    fields: [cast.movie_id],
    references: [movie.id],
  }),
  actor: one(actor, {
    fields: [cast.actor_id],
    references: [actor.id],
  }),
}));
