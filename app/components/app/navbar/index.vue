<script lang="ts" setup>
const authStore = useAuthStore();
const route = useRoute();
</script>

<template>
  <div class="navbar bg-base-100 shadow-sm">
    <div class="navbar-start">
      <AtomsButton
        variant="link"
        size="xl"
        to="/"
      >
        Movie System
      </AtomsButton>
    </div>

    <div class="navbar-end">
      <AtomsThemeToggle />
      <AtomsButton
        v-if="!authStore.user"
        variant="ghost"
        size="md"
        :to="route.path.includes('sign-up') ? '/auth/sign-in' : '/auth/sign-up'"
      >
        {{ route.path.includes('sign-up') ? 'Login' : 'Sign up' }}
      </AtomsButton>
      <MoleculesNavbarUserSection :user="authStore.user" />
    </div>
  </div>
</template>
