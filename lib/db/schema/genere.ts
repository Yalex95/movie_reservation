import { relations } from "drizzle-orm";
import { int, sqliteTable, text } from "drizzle-orm/sqlite-core";

import { movie_genres } from "./movie";

export const genere = sqliteTable("genere", {
  id: int().primaryKey({ autoIncrement: true }),
  genere: text(),
});
export const genereRelations = relations(genere, ({ many }) => ({
  movies: many(movie_genres),
}));
