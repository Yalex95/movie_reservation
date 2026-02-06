<script lang="ts" setup>
defineProps<{ legend: string; placeHolder: string; options: Array<any>; isOptional: boolean }>();
// TODO: emit onchage func
</script>

<template>
  <fieldset class="fieldset">
    <legend class="fieldset-legend">
      {{ legend }}
    </legend>
    <select class="select">
      <option disabled selected>
        {{ placeHolder }}
      </option>
      <option v-for="(option, index) in options" :key="index">
        {{ option }}
      </option>
    </select>
    <span v-if="isOptional" class="label">Optional</span>
  </fieldset>
</template>
