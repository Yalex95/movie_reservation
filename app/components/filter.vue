<script lang="ts" setup>
import type { ButtonItem } from "~~/lib/types";

const props = withDefaults(defineProps<{
  btnGroup: Array<ButtonItem>;
  searchPlaceholder?: string;
  buttonClass: string;
  activeValues?: string[];
  modelValue: string;
}>(), {
  searchPlaceholder: "Search",
});
const emit = defineEmits<{
  "btnClick": [value: string ];
  "update:modelValue": [value: string];
}>();
</script>

<template>
  <div class=" rounded-md border border-base-content/5 grid gap-6 p-4 bg-base-100">
    <InputSearch
      :placeholder="searchPlaceholder"
      wrapper-class=" w-full"
      :model-value="modelValue"
      @update:model-value="emit('update:modelValue', $event)"
    />
    <div class="flex justify-between">
      <div class="inline-flex gap-4">
        <button
          v-for="(button, index) in btnGroup"
          :key="index"
          class="btn capitalize"
          :class="[buttonClass, { 'bg-base-100': activeValues?.includes(button.value) }]"
          @click="emit('btnClick', button.value)"
        >
          {{ button.label }}
        </button>
      </div>
      <div class="inline-flex gap-4">
        <button class="btn btn-ghost">
          More filters
        </button>
        <button class="btn btn-ghost">
          <Icon name="material-symbols:download" size="24" />Export CSV
        </button>
      </div>
    </div>
  </div>
</template>
