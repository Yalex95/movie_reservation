<script lang="ts" setup>
import { authClient } from "~~/lib/auth-client";

const session = ref();
onMounted(async () => {
  session.value = await authClient.getSession();
});
const navbarStore = useNavbarStore();
const route = useRoute();
const auth = useAuthStore();
effect(() => {
  if (session.value) {
    if (session.value?.data?.user?.role === "admin") {
      navbarStore.navbarItems = [{
        id: "link-dashboard",
        label: "Dashboard",
        to: "/dashboard",
      }];
    }
    else { // regular user
      navbarStore.navbarItems = [{
        id: "link-home",
        label: "Home",
        to: "/",
      }, {
        id: "link-bookings",
        label: "My Bookings",
        to: "/bookings",
      }];
    }
  }
});
</script>

<template>
  <div class="navbar bg-base-100 shadow-sm">
    <div class="navbar-start">
      <div class="dropdown">
        <div
          tabindex="0"
          role="button"
          class="btn btn-ghost lg:hidden"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-5 w-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          > <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M4 6h16M4 12h8m-8 6h16"
          /> </svg>
        </div>
        <ul
          tabindex="-1"
          class="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow"
        >
          <li><a>Movies</a></li>
        </ul>
      </div>
      <a class="btn btn-ghost text-xl">daisyUI</a>
    </div>
    <div class="navbar-center hidden lg:flex">
      <ul class="menu menu-horizontal px-1">
        <li v-for="item in navbarStore.navbarItems" :key="item.id">
          <NuxtLink :to="item.to">
            {{ item.label }}
          </NuxtLink>
        </li>
      </ul>
    </div>
    <div class="navbar-end">
      <AppThemeToggle />
      <NuxtLink
        v-if="!session?.data?.user"
        class="btn "
        :to="route.path.includes('sign-up') ? '/sign-in' : '/sign-up'"
      >
        {{ route.path.includes('sign-up') ? 'Login' : 'Sign up' }}
      </NuxtLink>
      <div v-else class="flex gap-4 border-l-2 border-gray-300 ps-6">
        <div class="flex flex-col justify-center items-end">
          <p class="font-semibold text-sm">{{ session?.data?.user?.name }}</p>
          <p class="uppercase text-sm text-gray-500">{{ session?.data?.user?.role }}</p>
        </div>
        <div class="dropdown dropdown-end">
          <div
            tabindex="0"
            role="button"
            class="btn btn-ghost btn-circle avatar"
            :class="{ 'avatar-placeholder': !session?.data?.user?.avatar } "
          >
            <div class="w-10 rounded-full bg-neutral text-neutral-content">
              <img
                v-if="session?.data?.user?.avatar"
                :alt="session?.data?.user?.name || 'User avatar'"
                :src="session?.data?.user?.avatar"
              >
              <span v-else>{{ session?.data?.user?.name?.charAt(0)?.toUpperCase() || 'U' }}</span>
            </div>
          </div>
          <ul
            tabindex="-1"
            class="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow"
          >
            <li>
              <NuxtLink to="/profile" class="justify-between">
                Profile
              </NuxtLink>
            </li>
            <li>
              <button class="btn btn-neutral" @click="auth.signOut()">
                Logout
              </button>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>
