<script lang="ts" setup>
const authStore = useAuthStore();

const isSidebarOpen = ref(false);
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

function toggleSidebar() {
  isSidebarOpen.value = !isSidebarOpen.value;
  localStorage.setItem("isSidebarOpen", isSidebarOpen.value.toString());
}
</script>

<template>
  <div class="flex-1 flex min-h-0 ">
    <div class="hidden md:block bg-base-100 transition-all duration-300 shrink-0" :class="{ 'w-64': isSidebarOpen, 'w-16': !isSidebarOpen }">
      <div
        class="flex hover:cursor-pointer hover:bg-base-200 p-2"
        :class="{ 'justify-center': !isSidebarOpen, 'justify-start': isSidebarOpen }"
        @click="toggleSidebar"
      >
        <Icon
          v-if="isSidebarOpen"
          name="tabler:chevron-left"
          size="32"
        />
        <Icon
          v-else
          name="tabler:chevron-right"
          size="32"
        />
      </div>
      <div class="flex flex-col ">
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
      </div>
    </div>
    <AppMovie />
  </div>
</template>
