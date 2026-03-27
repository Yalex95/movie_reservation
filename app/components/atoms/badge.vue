<script lang="ts" setup>
defineProps<{
  variant: "outline" | "dash" | "ghost" | "neutral" | "primary";
}>();

const variantStyles = {
  outline: "badge-outline",
  dash: "badge-dash",
  ghost: "badge-ghost",
  neutral: "badge-neutral",
  primary: "badge-primary",
};
const baseStyle = "badge";
const classes = computed(() => [variantStyles, baseStyle]);
</script>

<template>
  <div :class="classes">
    <slot />
  </div>
</template>
