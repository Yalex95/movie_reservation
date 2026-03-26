<script lang="ts" setup>
import type { AppUser } from "~~/lib/types";

import { onClickOutside } from "@vueuse/core";

import UserInfoDisplay from "./user-info-display.vue";

const props = defineProps<{
  user: AppUser | null | undefined;
}>();
const dropDown = ref(null);
function handleSignOut() {
  console.log("signout");
}
onClickOutside(dropDown, () => {
  Open.value = false;
});
</script>

<template>
  <div ref="dropDown" class="flex gap-4 border-l-2 border-gray-300 ps-6">
    <UserInfoDisplay
      :user="props.user"
      name-size="sm"
      role-size="sm"
    />
    <MoleculesDropdown :user type="avatar">
      <template #list>
        <li>
          <AtomsButton
            class=""
            variant="link"
            size="md"
            to="/profile"
          >
            Profile
          </AtomsButton>
        </li>
        <li>
          <AtomsButton
            class="w-full"
            variant="ghost"
            size="md"
            @click="handleSignOut"
          >
            LogOut
          </AtomsButton>
        </li>
      </template>
    </MoleculesDropdown>
  </div>
</template>
