<script lang="ts" setup>
const options = ["trending", "category"];

const route = useRoute();
const search = ref(route.query.search?.toString() || "");
watchDebounced(
  search,
  (value) => {
    router.push({
      query: {
        ...route.query,
        search: value || undefined,
      },
    });
  },
  { debounce: 500 },
);
</script>

<template>
  <div class="flex flex-col gap-4">
    <h1 class="text-3xl font-bold">
      Now Showing
    </h1>
    <div class="flex gap-3 items-center justify-between">
      <!-- <InputSearch place-holder="Search movies by title, actor or director" /> -->
      <!-- <InputSelect
        :options="options"
        legend="short by"
        place-holder="Select an option"
        :is-optional="false"
      /> -->
      <AtomsInput
        :model-value="search"
        :options="options"
        placeholder="Search movie"
        type="search"
        wrapper-class=""
      >
        <template #icon>
          <Icon name="ic:outline-search" />
        </template>
      </AtomsInput>
      <AtomsSelect
        :options="options"
        legend="short by"
        place-holder="Select an option"
        :is-optional="false"
      />
    </div>
  </div>
</template>
