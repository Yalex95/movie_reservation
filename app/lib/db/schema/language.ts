import { int, sqliteTable, text } from "drizzle-orm/sqlite-core";

export const language = sqliteTable("language", {
  id: int().primaryKey({ autoIncrement: true }),
  language: text(),
});
