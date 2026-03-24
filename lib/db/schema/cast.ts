import { relations } from "drizzle-orm";
import {
  integer,
  pgTable,text,
} from "drizzle-orm/pg-core";

import { actor } from "./actor";
import { movie } from "./movie";

export const cast = pgTable("cast", {
  id: integer("id").primaryKey().generatedAlwaysAsIdentity(),
  actor_id: integer("actor_id").notNull().references(() => actor.id, { onDelete: "cascade" }),
  movie_id: integer("movie_id").notNull().references(() => movie.id, { onDelete: "cascade" }),
  character_name: text("character_name").notNull(),
  roleOrder: text("role_order").notNull(),

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
