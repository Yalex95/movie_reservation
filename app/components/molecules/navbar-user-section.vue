<script lang="ts" setup>
import type { AppUser } from "~~/lib/types";

import UserInfoDisplay from "./user-info-display.vue";

const props = defineProps<{
  user: AppUser | null | undefined;
}>();
</script>

<template>
  <div class="flex gap-4 border-l-2 border-gray-300 ps-6">
    <UserInfoDisplay
      :user="props.user"
      name-size="sm"
      role-size="sm"
    />
    <!-- TODO: add dropdown -->
    <AtomsDropdown :user type="avatar" />
  </div>
</template>
