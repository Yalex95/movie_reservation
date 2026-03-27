<script setup lang="ts">
import type { Movie } from "~~/lib/db/schema";

defineProps<{
  movies: Array<Movie>;
}>();
</script>

<template>
  <div class="container mx-auto py-10 px-6  flex-col flex flex-1 min-h-0 overflow-auto ">
    <MoleculesFilter />
    <MoleculesGrid  v-if="movies?.length > 0" :movies />
  </div>
</template>
