<script lang="ts" setup>
const authStore = useAuthStore();
const route = useRoute();
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
        <li><a>Movies</a></li>
      </ul>
    </div>
    <div class="navbar-end">
      <NuxtLink v-if="!authStore.loading && authStore.user" class="btn">
        Sign out
      </NuxtLink>
      <NuxtLink
        v-else-if="!route.path.includes('sign-up')"
        class="btn "
        to="/sign-up"
      >
        Sign up
      </NuxtLink>
      <NuxtLink v-if="route.path.includes('sign-up')" class="btn ">
        Login
      </NuxtLink>
    </div>
  </div>
</template>
