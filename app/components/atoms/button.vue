<script lang="ts" setup>
const props = withDefaults(
  defineProps<{
    as?: "nuxt-link" | "button" | "a";
    to?: string;
    href?: string;
    type?: "button" | "submit" | "reset";
    loading?: boolean;
    variant: "primary" | "secondary" | "ghost" | "neutral" | "link";
    size: "sm" | "md" | "lg" | "xl";
  }>(),
  {
    loading: false,
    as: "button",
    type: "button",
  },
);

// emit
const emit = defineEmits<{
  (e: "click", event: MouseEvent): void;
}>();
// uso de computed para obtener los attr del componente
const isLink = computed(() => !!props.to);
const isAnchor = computed(() => !!props.href);

const componentTag = computed(() => {
  if (isLink.value)
    return resolveComponent("NuxtLink");
  if (isAnchor.value)
    return "a";
  return "button";
});

const componentAttrs = computed(() => {
  if (isLink.value)
    return { to: props.to };
  if (isAnchor.value) {
    return {
      href: props.href,
      target: "_self",
      rel: "noopener noreferrer",
    };
  }
  return {
    type: props.type,
    disabled: props.loading,
  };
});
// computed styles
const baseStyle = "inline-flex items-center justify-center font-medium transition focus:outline-none rounded-sm";

const variantStyles = {
  primary: "btn-info text-base-content",
  secondary: "btn-secondary",
  neutral: "btn-neutral",
  ghost: "btn-ghost bg-base-200",
  link: "link link-hover",
};
const sizeStyles = {
  sm: "px-3 py-1.5 text-sm",
  md: "px-3 py-1.5 md:px-4 md:py-2 text-sm",
  lg: "px-3 py-1.5 md:px-5 md:py-3 text-sm md:text-base",
  xl: "px-3 py-1.5 md:px-8 md:py-4 text-sm md:text-xl ",
};

const classes = computed(() => [
  baseStyle,
  (!isLink.value && !isAnchor.value) && "btn",
  variantStyles[props.variant],
  sizeStyles[props.size],
  (props.loading) && "opacity-50 cursor-not-allowed",
]);
</script>

<template>
  <component
    :is="componentTag"
    v-bind="componentAttrs"
    :class="classes"
    @click="(e:MouseEvent) => !props.loading && emit('click', e)"
  >
    <span v-if="$slots.left" class="mr-2 flex">
      <slot name="left" />
    </span>
    <slot />
    <span v-if="$slots.right" class="ml-2 flex">
      <slot name="right" />
    </span>
  </component>
</template>
