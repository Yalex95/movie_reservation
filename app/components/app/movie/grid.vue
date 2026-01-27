<script lang="ts" setup>
import type { selectMovie } from "~/lib/db/schema";

defineProps<{ movies: Array<selectMovie> }>();
</script>

<template>
  <div class="grid 2xl:grid-cols-4 xl:grid-cols-4 lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-1 gap-6 mt-5">
    <AppMovieCard
      v-for="(movie, index) in movies"
      :key="index"
      :movie="movie"
    />
  </div>
</template>
