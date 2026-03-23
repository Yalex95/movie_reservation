import { relations } from "drizzle-orm";
import {
  integer,
  pgTable,
  text,
} from "drizzle-orm/pg-core";

import { movie_genres } from "./movie";

export const genere = pgTable("genere", {
  id: integer("id").primaryKey().generatedAlwaysAsIdentity(),
  genere: text("genere"),
});
export const genereRelations = relations(genere, ({ many }) => ({
  movies: many(movie_genres),
}));
