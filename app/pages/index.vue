<script lang="ts" setup>
import type { Movie } from "~~/lib/db/schema";

definePageMeta({
  layout: "default",
});
const movieList = ref<Movie[]>();
async function getMovies() {
  const response = await $fetch<Movie[]>("/api/movies");
  movieList.value = response;
}
getMovies();
const movies = computed(() => movieList.value ?? []);
</script>

<template>
  <OrganismsMovie :movies="movies" />
</template>
