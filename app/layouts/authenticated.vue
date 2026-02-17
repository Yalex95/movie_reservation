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
  if (session.value?.data?.user?.role === "admin" && !route.path.startsWith("/profile")) { // validate user role
    sidebarStore.sidebarItems = [{
      id: "link-dashboard-overview",
      label: "Overview",
      href: "/dashboard",
      icon: "ic:sharp-grid-view",
    }, {
      id: "link-Movies",
      label: "Movies",
      href: "/movies",
      icon: "bx:bxs-movie-play",
    }, {
      id: "link-showtimes",
      label: "Showtimes",
      href: "/showtimes",
      icon: "ic:round-access-time-filled",
    }, {
      id: "link-rooms",
      label: "Rooms",
      href: "/rooms",
      icon: "ic:baseline-meeting-room",
    }, {
      id: "link-users",
      label: "Staff",
      href: "/staff",
      icon: "material-symbols:groups-2",
    }];
  }
  else if (route.path.startsWith("/profile")) {
    sidebarStore.sidebarItems = [{
      id: "link-personal-info",
      label: "Personal Info",
      href: "/profile",
      icon: "material-symbols:person-outline",
    }, {
      id: "link-security",
      label: "Security",
      href: "#security",
      icon: "ic:outline-security",
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
          <div class="flex justify-between">
            <div v-if="session?.data && isSidebarOpen" class="flex gap-2 items-center mb-5">
              <div class="bg-blue-700 rounded-md p-2 flex items-center">
                <Icon name="material-symbols-light:movie" size="36" />
              </div>
              <div>
                <p class="text-base">
                  Cinema Admin
                </p> <span class="text-sm">Management System</span>
              </div>
            </div>
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
          </div>
          <div class="flex flex-col ">
            <SidebarButton
              v-for="item in sidebarStore.sidebarItems"
              :key="`${item.id}-${route.path}`"
              :show-label="isSidebarOpen"
              :label="item.label"
              :icon="item.icon"
              :href="item.href"
              :to="item.to"
              :is-active="route.path.includes(item?.href || '')"
            />

            <div class="divider" />
            <SidebarButton
              v-if="!session?.data?.user"
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
        <slot />
      </div>
    </main>
  </div>
</template>
