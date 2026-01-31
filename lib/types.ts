import type { RouteLocationRaw } from "vue-router";

export type navItems = {
  id: string;
  label: string;
  icon: string;
  href?: string;// ? is optional
  to?: RouteLocationRaw;
};

