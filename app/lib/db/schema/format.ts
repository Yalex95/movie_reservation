import { int, sqliteTable, text } from "drizzle-orm/sqlite-core";

export const movie_format = sqliteTable("format", {
  id: int().primaryKey({ autoIncrement: true }),
  format: text(),
});
