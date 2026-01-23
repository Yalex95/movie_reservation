<script lang="ts" setup>
const options = ["trending", "category"];
</script>

<template>
  <div class="flex gap-3 items-center justify-between">
    <InputSearch />
    <InputSelect
      :options="options"
      legend="short by"
      place-holder="Select an option"
      :is-optional="false"
    />
  </div>
</template>
