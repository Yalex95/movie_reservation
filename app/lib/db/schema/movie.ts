import { relations } from "drizzle-orm";
import { int, sqliteTable, text } from "drizzle-orm/sqlite-core";

import { cast } from "./cast";
import { genere } from "./genere";
import { language } from "./language";
import { projection_format } from "./projection-format";
import { showtime } from "./showtime";

export const movie = sqliteTable("movie", {
  id: int().primaryKey({ autoIncrement: true }),
  title: text().notNull().unique(),
  description: text(),
  duration: text(),
  poster_image: text(),
  trailer_url: text(),
  content_rating: text({
    enum: ["AA", "A", "B15", "C", "D"],
  }).default("AA"),
  release_status: text({
    enum: ["now_showing", "coming_soon", "archived"],
  }).default("coming_soon"),
  release_date: text(), // Fecha oficial de estreno
  start_showing_date: text(), // Cuando empieza en cartelera
  end_showing_date: text(), // Cuando sale de cartelera
  is_featured: int({ mode: "boolean" }).default(false), // Película destacada
  is_now_showing: int({ mode: "boolean" }).default(false), // esta en cartelera
});
/**
 * PIVOT TABLES
 */

// movie generes
export const movie_genres = sqliteTable("movie_genres", {
  id: int().primaryKey({ autoIncrement: true }),
  movieId: int().references(() => movie.id),
  genreId: int().references(() => genere.id),
});

export const movieGeneresRelations = relations(movie_genres, ({ one }) => ({
  movie: one(movie, {
    fields: [movie_genres.movieId],
    references: [movie.id],
  }),
  genre: one(genere, {
    fields: [movie_genres.genreId],
    references: [genere.id],
  }),
}));

// movie languages
export const movie_languages = sqliteTable("movie_languages", {
  id: int().primaryKey({ autoIncrement: true }),
  movieId: int().references(() => movie.id),
  languageId: int().references(() => language.id),
});

export const movieLanguagesRelations = relations(movie_languages, ({ one }) => ({
  movie: one(movie, {
    fields: [movie_languages.movieId],
    references: [movie.id],
  }),
  language: one(language, {
    fields: [movie_languages.languageId],
    references: [language.id],
  }),
}));

// movie formats
export const movie_projection_formats = sqliteTable("movie_projection_formats", {
  id: int().primaryKey({ autoIncrement: true }),
  movieId: int().references(() => movie.id),
  formatId: int().references(() => projection_format.id),
});
export const movieFormatRelations = relations(movie_projection_formats, ({ one }) => ({
  movie: one(movie, {
    fields: [movie_projection_formats.movieId],
    references: [movie.id],
  }),
  format: one(projection_format, {
    fields: [movie_projection_formats.formatId],
    references: [projection_format.id],
  }),
}));
// MOVIE RELATION
export const movieRelations = relations(movie, ({ many }) => ({
  actors: many(cast),
  genres: many(movie_genres),
  languages: many(movie_languages),
  projection_formats: many(movie_projection_formats),
  showtimes: many(showtime),
}));

export type selectMovie = typeof movie.$inferSelect;
