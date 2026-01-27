<script lang="ts" setup>
const options = ["trending", "category"];
</script>

<template>
  <div class="flex flex-col ">
    <h1 class="text-3xl font-bold">
      Now Showing
    </h1>
    <div class="flex gap-3 items-center justify-between">
      <InputSearch place-holder="Search movies by title, actor or director" />
      <InputSelect
        :options="options"
        legend="short by"
        place-holder="Select an option"
        :is-optional="false"
      />
    </div>
  </div>
</template>
