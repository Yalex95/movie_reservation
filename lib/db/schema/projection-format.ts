import { relations } from "drizzle-orm";
import {
  integer,
  pgTable,
  text,
} from "drizzle-orm/pg-core";

import { movie_projection_formats } from "./movie";

export const  projection_format = pgTable("format", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  format: text(),
});
export const projectionFormatRelations = relations( projection_format, ({ many }) => ({
  movies: many(movie_projection_formats),
}));
