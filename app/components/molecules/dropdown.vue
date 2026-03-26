<script lang="ts" setup>
import type { AppUser } from "~~/lib/types";

const props = defineProps<{
  icon?: string;
  type: "avatar" | "button";
  user: AppUser | null | undefined;
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
// TODO:move this component to molecules
const Open = ref(false);

function toggleDropdown() {
  Open.value = !Open.value;
}
</script>

<template>
  <div class="relative">
    <component
      :is="componentTag"
      v-bind="componentAttrs"
      @click="toggleDropdown"
    >
      <span v-if="$slots.icon">
        <slot name="icon" />
      </span>
    </component>
    <ul
      class="absolute bg-base-100 rounded-box z-1 w-52 p-2 shadow-lg flex flex-col
       right-0"
      :class="{ hidden: !Open }"
    >
      <slot name="list" />
    </ul>
  </div>
</template>
