import type { RouteLocationRaw } from "vue-router";

export type SidebarItem = {
  id: string;
  label: string;
  icon: string;
  href?: string;// ? is optional
  to?: RouteLocationRaw;
};

export const useSidebarStore = defineStore("useSidebarStore", () => {
  const sidebarItems = ref<SidebarItem[]>([]);

  return {
    sidebarItems,
  };
});
