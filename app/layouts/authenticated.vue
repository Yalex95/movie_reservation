<script lang="ts" setup>
import { authClient } from "~~/lib/auth-client";

const authStore = useAuthStore();

const isSidebarOpen = ref(true);
const sidebarStore = useSidebarStore();
const route = useRoute();
const session = ref();

onMounted(async () => {
  session.value = await authClient.getSession();
});
effect(() => {
  if (route.path === "/dashboard") { // validate user role
    sidebarStore.sidebarItems = [{
      id: "link-dashboard-overview",
      label: "Overview",
      href: "/dashboard",
      icon: "material-symbols-light:grid-on-sharp",
    }, {
      id: "link-Movies",
      label: "Movies",
      href: "/movies",
      icon: "majesticons:ticket",
    }, {
      id: "link-showtimes",
      label: "Watchlist",
      href: "/watchlist",
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
  <div class="flex h-screen flex-col ">
    <AppNavbar />
    <main class="flex-1 flex min-h-0 bg-base-200">
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
              v-if="!session?.data?.user"
              :show-label="isSidebarOpen"
              label="Login"
              icon="tabler:login"
              href="/sign-in"
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
        <slot />
      </div>
    </main>
  </div>
</template>
