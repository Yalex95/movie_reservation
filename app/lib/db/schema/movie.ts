import { relations } from "drizzle-orm";
import { int, sqliteTable, text } from "drizzle-orm/sqlite-core";

import { cast } from "./cast";
import { category } from "./category";
import { movie_format } from "./format";
import { genere } from "./genere";
import { language } from "./language";

export const movie = sqliteTable("movie", {
  id: int().primaryKey({ autoIncrement: true }),
  title: text().notNull().unique(),
  description: text(),
  duration: text(),
  poster_image: text(),
  language_id: int().notNull().references(() => language.id),
  genere_id: int().notNull().references(() => genere.id),
  category_id: int().notNull().references(() => category.id),
  format_id: int().notNull().references(() => movie_format.id),
});
export const movieRelations = relations(movie, ({ many }) => ({
  cast: many(cast),
}));
