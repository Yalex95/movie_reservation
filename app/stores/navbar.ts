export type NavbarItem = {
  id: string;
  label: string;
  to: string;
};
export const useNavbarStore = defineStore("useNavbarStore", () => {
  const navbarItems = ref<NavbarItem[]>([]);
  const loading = ref(false);
  return {
    navbarItems,
    loading,
  };
});
