<script lang="ts" setup>
const authStore = useAuthStore();

const sidebarStore = useSidebarStore();
const defaultNavigation = [
  {
    id: "link-dashboard",
    label: "Browse Movies",
    href: "/",
    icon: "material-symbols-light:grid-on-sharp",
  },

];
effect(() => {
  if (authStore.user) {
    if (authStore.user?.role === "admin") {
      sidebarStore.sidebarItems = [...defaultNavigation, {
        id: "link-dashboard",
        label: "Dashboard",
        href: "/dashboard",
        icon: "stash:save-ribbon-solid",
      }, {
        id: "link-movies",
        label: "Movies",
        href: "/",
        icon: "stash:save-ribbon-solid",

      }, {
        id: "link-location-ad",
        label: "My Bookings",
        href: "/",
        icon: "majesticons:ticket",
      }, {
        id: "link-location-ad",
        label: "Watchlist",
        href: "/",
        icon: "stash:save-ribbon-solid",
      }];
    }
    else { // regular user
      sidebarStore.sidebarItems = [...defaultNavigation, {
        id: "link-home",
        label: "Home",
        href: "/",
        icon: "stash:save-ribbon-solid",
      }, {
        id: "link-bookings",
        label: "My Bookings",
        href: "/bookings",
        icon: "stash:save-ribbon-solid",
      }];
    }
  }
  else {
    sidebarStore.sidebarItems = [...defaultNavigation];
  }
});
</script>

<template>
  <div class="flex h-screen flex-col ">
    <OrganismsNavbar />
    <main class="flex-1 flex min-h-0 bg-base-200">
      <div class="flex-1 flex min-h-0 ">
        <OrganismsSidebar>
          <template #sidebarButtons="{ isSidebarOpen }">
            <SidebarButton
              v-for="item in sidebarStore.sidebarItems"
              :key="item.id"
              :show-label="isSidebarOpen"
              :label="item.label"
              :icon="item.icon"
              :href="item.href"
              :to="item.to"
            />

            <div class="divider" />
            <SidebarButton
              v-if="!authStore?.user"
              :show-label="isSidebarOpen"
              label="Login"
              icon="tabler:login"
              href="/auth/sign-in"
            />
            <SidebarButton
              v-else
              :show-label="isSidebarOpen"
              label="Sign Out"
              icon="tabler:logout"
              @click="authStore.signOut()"
            />
          </template>
        </OrganismsSidebar>
        <slot />
      </div>
    </main>
  </div>
</template>
