import { relations } from "drizzle-orm";
import { int, sqliteTable, text } from "drizzle-orm/sqlite-core";

import { movie_languages } from "./movie";

export const language = sqliteTable("language", {
  id: int().primaryKey({ autoIncrement: true }),
  language: text(),
});
export const languageRelations = relations(language, ({ many }) => ({
  movies: many(movie_languages),
}));
