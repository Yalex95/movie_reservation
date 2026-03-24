import { relations } from "drizzle-orm";
import {
  integer,
  pgTable,
  text,
} from "drizzle-orm/pg-core";

import { cast } from "./cast";

export const actor = pgTable("actor", {
  id: integer("id").primaryKey().generatedAlwaysAsIdentity(),
  name: text("name"),
  image: text("image"),
});
export const actorRelations = relations(actor, ({ many }) => ({
  cast: many(cast),
}));
