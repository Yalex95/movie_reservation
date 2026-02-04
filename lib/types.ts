import type { RouteLocationRaw } from "vue-router";

export type navItems = {
  id: string;
  label: string;
  icon: string;
  href?: string;// ? is optional
  to?: RouteLocationRaw;
};

export type AppUser = {
  id: string;
  email: string;
  name: string;
  emailVerified: boolean;
  image?: string | null;
  createdAt: Date;
  updatedAt: Date;

  // campos custom
  phone?: string | null;
  role?: string | null;
  is_active?: boolean;
};