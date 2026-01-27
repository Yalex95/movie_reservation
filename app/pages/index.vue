<script lang="ts" setup>
import { authClient } from "~/lib/auth-client";

const authStore = useAuthStore();

const isSidebarOpen = ref(true);
const sidebarStore = useSidebarStore();
const route = useRoute();
effect(() => {
  if (route.path === "/") {
    sidebarStore.sidebarItems = [{
      id: "link-dashboard",
      label: "Browse Movies",
      href: "/",
      icon: "material-symbols-light:grid-on-sharp",
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
});

function toggleSidebar() {
  isSidebarOpen.value = !isSidebarOpen.value;
  localStorage.setItem("isSidebarOpen", isSidebarOpen.value.toString());
}
</script>

<template>
  <div class="flex-1 flex min-h-0">
    <div class="bg-base-100 transition-all duration-300 shrink-0" :class="{ 'w-64': isSidebarOpen, 'w-16': !isSidebarOpen }">
      <div
        class="flex hover:cursor-pointer hover:bg-base-200 p-2"
        :class="{ 'justify-center': !isSidebarOpen, 'justify-end': isSidebarOpen }"
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
          v-if="authStore.user"
          :show-label="isSidebarOpen"
          label="Sign Out"
          icon="tabler:logout"
          href="/sign-out"
          @on-click="authClient.signOut"
        />
        <SidebarButton 
          v-if="!authStore.user"
          :show-label="isSidebarOpen"
          label="Login"
          icon="tabler:login"
          href="/sign-in"
        />
      </div>
    </div>
    <AppMovie />
  </div>
</template>
