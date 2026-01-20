import { relations } from "drizzle-orm";
import { int, sqliteTable, text } from "drizzle-orm/sqlite-core";

import { movie_projection_formats } from "./movie";

export const  projection_format = sqliteTable("format", {
  id: int().primaryKey({ autoIncrement: true }),
  format: text(),
});
export const movieFormatRelations = relations( projection_format, ({ many }) => ({
  movies: many(movie_projection_formats),
}));
