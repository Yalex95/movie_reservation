<script lang="ts" setup>
defineProps<{
  fieldsetClass?: string;

  checkboxClass?: string;
}>();
</script>

<template>
  <fieldset class="fieldset " :class="[fieldsetClass]">
    <slot name="legend" />
    <label class="label">
      <input
        type="checkbox"
        class="checkbox"
        :class="[checkboxClass]"
      >
      <slot name="label" />
    </label>
  </fieldset>
</template>
