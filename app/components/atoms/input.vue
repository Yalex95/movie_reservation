<script lang="ts" setup>
const props = defineProps<{
  placeholder: string;
  wrapperClass: string;
  modelValue: string | undefined;
  type: "text" | "email" | "password" | "number" | "tel" | "url" | "search";
}>();
defineEmits<{
  "update:modelValue": [value: string];
}>();
</script>

<template>
  <label class="input" :class="wrapperClass">
    <slot name="icon" />
    <input
      :type
      :placeholder
      :value="props.modelValue"
      @input="$emit('update:modelValue', ($event.target as HTMLInputElement).value)"
    >
  </label>
</template>
