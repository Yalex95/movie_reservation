<script lang="ts" setup>
import type { AppUser } from "~~/lib/types";

const props = defineProps<{
  icon?: string;
  type: "avatar" | "button";
  user: AppUser | null | undefined;
}>();

const emit = defineEmits<{
  signout: [];
}>();

const componentTag = computed(() => props.type === "avatar"
  ? resolveComponent("AtomsAvatar")
  : resolveComponent("AtomsButtons"));

const componentAttrs = computed(() => {
  if (props.type === "avatar") {
    return {
      "class": "btn btn-ghost btn-circle avatar",
      "name-class": "text-sm font-bold",
      "avatar": props.user?.image,
      "name": props.user?.name,
    };
  }
  return {
    variant: "button",
    size: "md",
  };
});

const Open = ref(false);
function handleSignOut() {
  emit("signout");
}
function toggleDropdown() {
  Open.value = !Open.value;
}
</script>

<template>
  <div class="dropdown" :class="{ 'dropdown-open': Open }">
    <!-- <AtomsButton
      class="lg:hidden"
      variant="ghost"
      size="sm"
    >
      <Icon name="mdi:chevron-down" size="24" />
    </AtomsButton> -->
    <component
      :is="componentTag"
      v-bind="componentAttrs"
      @click="toggleDropdown"
    >
      <!-- <slot /> -->
    </component>
    <ul
      class="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow"
      :class="{ hidden: !Open }"
    >
      <li>
        <AtomsButton
          variant="link"
          size="md"
          to="/profile"
        >
          Profile
        </AtomsButton>
      </li>
      <li>
        <AtomsButton
          variant="ghost"
          size="md"
          @click="handleSignOut"
        >
          LogOut
        </AtomsButton>
      </li>
    </ul>
  </div>
</template>
