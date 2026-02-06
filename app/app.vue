<script  lang="ts" setup>
const authStore = useAuthStore();
await authStore.init();
</script>

<template>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>
