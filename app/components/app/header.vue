<script lang="ts" setup>
withDefaults(
  defineProps<{
    header: string;
    icon: string;
    iconClass?: string;
  }>(),
  {
    iconClass: "text-blue-500",
  },
);
</script>

<template>
  <h2 class="font-semibold text-xl inline-flex items-center gap-2 capitalize w-full pb-4 pt-4">
    <Icon
      v-if="icon !== ''"
      :name="icon"
      :class="[iconClass]"
      size="28"
    />{{ header }}
  </h2>
</template>
