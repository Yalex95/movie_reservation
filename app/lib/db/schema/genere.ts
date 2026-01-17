
import { int, sqliteTable, text } from "drizzle-orm/sqlite-core";

export const genere = sqliteTable("genere",{
  id: int().primaryKey({autoIncrement:true}),
  genere: text()
})