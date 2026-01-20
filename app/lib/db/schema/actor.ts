import { relations } from "drizzle-orm";
import { int, sqliteTable, text } from "drizzle-orm/sqlite-core";

import { cast } from "./cast";

export const actor = sqliteTable("actor", {
  id: int().primaryKey({ autoIncrement: true }),
  name: text(),
  image: text(),
});
export const actorRelations = relations(actor, ({ many }) => ({
  cast: many(cast),
}));
