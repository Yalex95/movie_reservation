<script lang="ts" setup>
import { authClient } from "~/lib/auth-client";

const session = ref();
onMounted(async () => {
  session.value = await authClient.getSession();
});
// const authStore = useAuthStore();
const route = useRoute();
const auth = useAuthStore();
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
        <li>
          <NuxtLink to="/">
            Movies
          </NuxtLink>
        </li>
      </ul>
    </div>
    <div class="navbar-end">
      <NuxtLink
        v-if="!session?.data?.user"
        class="btn "
        :to="route.path.includes('sign-up') ? '/sign-in' : '/sign-up'"
      >
        {{ route.path.includes('sign-up') ? 'Login' : 'Sign up' }}
      </NuxtLink>
      <button
        v-else
        class="btn"
        @click="auth.signOut()"
      >
        Sign out
      </button>
    </div>
  </div>
</template>
