import { relations } from "drizzle-orm";
import {
  integer,
  pgTable,
  text,
} from "drizzle-orm/pg-core";

import { movie_languages } from "./movie";

export const language = pgTable("language", {
  id: integer("id").primaryKey().generatedAlwaysAsIdentity(),
  language: text("language"),
});
export const languageRelations = relations(language, ({ many }) => ({
  movies: many(movie_languages),
}));
