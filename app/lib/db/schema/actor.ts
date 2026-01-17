
import { int, sqliteTable, text } from "drizzle-orm/sqlite-core";


export const actor = sqliteTable("actor", {
  id: int().primaryKey({ autoIncrement: true }),
  name: text(),
  image: text(),
});
