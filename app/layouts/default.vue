<script  lang="ts" setup>
const authStore = useAuthStore();
await authStore.init();
</script>

<template>
  <div class="flex h-screen flex-col ">
    <AppNavbar :is-logged="false" />
    <main class="flex-1 flex min-h-0 bg-base-200">
      <slot />
    </main>
  </div>
</template>
