<script lang="ts" setup>
const authStore = useAuthStore();
const route = useRoute();

const redirectUser = computed(() => route.path.includes("sign-up") ? "/auth/sign-in" : "/auth/sign-up");
const buttonLabel = computed(() => route.path.includes("sign-up") ? "Login" : "Sign up");
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
      <MoleculesThemeToggle />
      <AtomsButton
        v-if="!authStore.user"
        variant="ghost"
        size="md"
        :to="redirectUser"
      >
        {{ buttonLabel }}
      </AtomsButton>
      <MoleculesNavbarUserSection v-else :user="authStore.user" />
    </div>
  </div>
</template>
