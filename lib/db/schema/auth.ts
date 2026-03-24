import { relations } from "drizzle-orm";
import {
  boolean,
  index,
  pgTable,
  text,
  timestamp,
} from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import z from "zod";

import { reservations } from "./reservations";

export const user = pgTable("user", {
  id: text("id").primaryKey(),
  name: text("name").notNull(),
  email: text("email").notNull().unique(),
  emailVerified: boolean("email_verified").default(false).notNull(),
  image: text("image"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at")
    .defaultNow()
    .$onUpdate(() => /* @__PURE__ */ new Date())
    .notNull(),
  role: text("role"),
  banned: boolean("banned").default(false),
  banReason: text("ban_reason"),
  banExpires: timestamp("ban_expires"),
  phone: text("phone"),
  is_active: boolean("is_active"),
  acceptedTerms: boolean("accepted_terms").notNull().default(false),
  acceptedTermsAt: timestamp("accepted_terms_at"),
});
// add DOB
export const session = pgTable(
  "session",
  {
    id: text("id").primaryKey(),
    expiresAt: timestamp("expires_at").notNull(),
    token: text("token").notNull().unique(),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at")
      .$onUpdate(() => /* @__PURE__ */ new Date())
      .notNull(),
    ipAddress: text("ip_address"),
    userAgent: text("user_agent"),
    userId: text("user_id")
      .notNull()
      .references(() => user.id, { onDelete: "cascade" }),
    impersonatedBy: text("impersonated_by"),
  },
  table => [index("session_userId_idx").on(table.userId)],
);

export const account = pgTable(
  "account",
  {
    id: text("id").primaryKey(),
    accountId: text("account_id").notNull(),
    providerId: text("provider_id").notNull(),
    userId: text("user_id")
      .notNull()
      .references(() => user.id, { onDelete: "cascade" }),
    accessToken: text("access_token"),
    refreshToken: text("refresh_token"),
    idToken: text("id_token"),
    accessTokenExpiresAt: timestamp("access_token_expires_at"),
    refreshTokenExpiresAt: timestamp("refresh_token_expires_at"),
    scope: text("scope"),
    password: text("password"),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at")
      .$onUpdate(() => /* @__PURE__ */ new Date())
      .notNull(),
  },
  table => [index("account_userId_idx").on(table.userId)],
);

export const verification = pgTable(
  "verification",
  {
    id: text("id").primaryKey(),
    identifier: text("identifier").notNull(),
    value: text("value").notNull(),
    expiresAt: timestamp("expires_at").notNull(),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at")
      .defaultNow()
      .$onUpdate(() => /* @__PURE__ */ new Date())
      .notNull(),
  },
  table => [index("verification_identifier_idx").on(table.identifier)],
);

export const userRelations = relations(user, ({ many }) => ({
  sessions: many(session),
  accounts: many(account),
  reservations: many(reservations),

}));

export const sessionRelations = relations(session, ({ one }) => ({
  user: one(user, {
    fields: [session.userId],
    references: [user.id],
  }),
}));

export const accountRelations = relations(account, ({ one }) => ({
  user: one(user, {
    fields: [account.userId],
    references: [user.id],
  }),
}));

// validation scheme to insert an user
export const InsertUser = createInsertSchema(user, {
  name: field =>
    field.min(1, "Name is required").max(100, "Name cannot have more than 100 char"),

  email: field =>
    field
      .min(1, "Email is required")
      .max(255, "Email cannot have more than 255 char")
      .pipe(
        z.email({
          message: "Invalid email",
        }),
      ),
}).omit({
  id: true,
  emailVerified: true,
  image: true,
  is_active: true,
  createdAt: true,
  updatedAt: true,
});

// schema for account
export const insertAccoutSchema = z.object({
  password: z.string().min(8, "Password must have at least 8 char").max(100, "password cannot have more than 100 char").regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/, "La contraseña debe contener al menos una mayúscula, una minúscula y un número"),
  acceptedTerms: z.boolean().refine(val => val === true, {
    message: "You must accept the terms and conditions",
  }),
});

// merge accout and user
export const RegisterUser = InsertUser.extend(insertAccoutSchema.shape).extend({ confirmPassword: z.string() }).refine(data => data.password === data.confirmPassword, {
  message: "Las contraseñas no coinciden",
  path: ["confirmPassword"],
});
// Esquema para login
export const LoginUser = z.object({
  email: z.string().min(1, "El email es requerido").pipe(
    z.email({
      message: "Invalid email",
    }),
  ),
  password: z.string().min(1, "La contraseña es requerida"),
});
// Esquema para actualizar perfil
export const UpdateProfile = z.object({
  name: z.string().max(100, "Name cannot have more than 100 char").optional(),
  email: z.string().pipe(
    z.email({
      message: "Invalid email",
    }),
  ).optional(),
  phone: z.string().max(20, "Phone number cannot have more than 10 numbers").regex(/^(\+\d{1,2}\s)?\(?\d{3}\)?[\s.-]\d{3}[\s.-]\d{4}$/, "password should match 123-456-7890").optional(),
  image: z.string().max(255, "Image URL cannot have more than 255 char").optional(),

});
// Esquema para actualizar contrasena
export const UpdatePassword = z.object({
  currentPassword: z.string().min(1, "La contraseña actual es requerida"),
  password: z.string().min(8, "Password must have at least 8 char").max(100, "password cannot have more than 100 char").regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/, "La nueva contraseña debe contener al menos una mayúscula,<br> una minúscula y un número"),
  confirmNewPassword: z.string(),
}).refine(data => data.password === data.confirmNewPassword, {
  message: "Las nuevas contraseñas no coinciden",
  path: ["confirmNewPassword"],
});
// Tipos
export type InsertUser = z.infer<typeof InsertUser>;
export type RegisterData = z.infer<typeof RegisterUser>;
export type LoginData = z.infer<typeof LoginUser>;
export type UpdateProfile = z.infer<typeof UpdateProfile>;
export type UpdatePassword = z.infer<typeof UpdatePassword>;
