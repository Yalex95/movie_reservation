<script lang="ts" setup>
const props = defineProps<{
  variant: "dropdown" | "default";
}>();

const variantStyles = {
  dropdown: "menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow hidden",
  default: "",
};
const listStyle = computed(() => [
  variantStyles[props.variant],
  "list-none p-2",
]);
</script>

<template>
  <ul :class="listStyle">
    <slot />
  </ul>
</template>
