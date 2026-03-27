import { relations } from "drizzle-orm";
import {
  boolean,
  integer,
  pgTable,
  text,
} from "drizzle-orm/pg-core";

import { cast } from "./cast";
import { genere } from "./genere";
import { language } from "./language";
import { projection_format } from "./projection-format";
import { showtime } from "./showtime";

export const movie = pgTable("movie", {
  id: integer("id").primaryKey().generatedAlwaysAsIdentity(),
  title: text("title").notNull().unique(),
  description: text("description"),
  duration: text("duration"),
  poster_image: text("poster_image"),
  trailer_url: text("trailer_url"),
  content_rating: text("content_rating", {
    enum: ["AA", "A", "B15", "C", "D"],
  }).default("AA"),
  release_status: text("release_status", {
    enum: ["now_showing", "coming_soon", "archived"],
  }).default("coming_soon"),
  release_date: text("realease_date"), // Fecha oficial de estreno
  start_showing_date: text("start_showing_date"), // Cuando empieza en cartelera
  end_showing_date: text("end_showing_date"), // Cuando sale de cartelera
  is_featured: boolean().default(false), // Película destacada
  is_now_showing: boolean().default(false), // esta en cartelera
});
/**
 * PIVOT TABLES
 */

// movie generes
export const movie_genres = pgTable("movie_genres", {
  id: integer("id").primaryKey().generatedAlwaysAsIdentity(),
  movieId: integer("movie_id").references(() => movie.id),
  genreId: integer("genre_id").references(() => genere.id),
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
export const movie_languages = pgTable("movie_languages", {
  id: integer("id").primaryKey().generatedAlwaysAsIdentity(),
  movieId: integer("movie_id").references(() => movie.id),
  languageId: integer("language_id").references(() => language.id),
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
export const movie_projection_formats = pgTable("movie_projection_formats", {
  id: integer("id").primaryKey().generatedAlwaysAsIdentity(),
  movieId: integer("movie_id").references(() => movie.id),
  formatId: integer("format_id").references(() => projection_format.id),
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

export type Movie = typeof movie.$inferSelect;
