<script lang="ts" setup>
import type { Tab } from "~~/lib/types";


defineProps<{
  tabs: Array<Tab>;
  modelValue: number;
}>();
defineEmits<{
  "update:modelValue": [value: number];
}>();
</script>

<template>
  <div role="tablist" class="tabs tabs-border">
    <a
      v-for="(tab, index) in tabs"
      :key="index"
      role="tab"
      class="tab text-lg"
      :class="[{ 'tab-active font-semibold': modelValue === index }]"
      @click="$emit('update:modelValue', index)"
    >{{ tab.label }}</a>
  </div>
</template>
