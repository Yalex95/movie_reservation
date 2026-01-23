<script lang="ts" setup>
defineProps<{
  fieldsetClass?: string;
  legend?: string;
  legendEnabled: boolean;
  label: string;
  checkboxClass?: string;
}>();
</script>

<template>
  <fieldset class="fieldset " :class="[fieldsetClass]">
    <legend v-if="legendEnabled" class="fieldset-legend">
      {{ legend }}
    </legend>
    <label class="label">
      <input
        type="checkbox"
        class="checkbox"
        :class="[checkboxClass]"
      >
      {{ label }}
    </label>
  </fieldset>
</template>
