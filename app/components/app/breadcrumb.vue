<script lang="ts" setup>
import type { NavItemLink } from "~~/lib/types";

defineProps<{
  breadCrumbs: Array<NavItemLink>;
}>();
const route = useRoute();
</script>

<template>
  <div class="breadcrumbs text-sm">
    <ul>
      <li v-for="breadCrumb in breadCrumbs" :key="breadCrumb.id">
        <Icon
          v-if="breadCrumb.icon"
          :name="breadCrumb.icon"
          size="24"
        />
        <NuxtLink
          :to="breadCrumb.to"
          :class="[route.path === breadCrumb.to ? 'font-semibold' : ' text-base-content/70 hover:text-base-content transition-colors']"
        >
          {{ breadCrumb.label }}
        </NuxtLink>
      </li>
    </ul>
  </div>
</template>
