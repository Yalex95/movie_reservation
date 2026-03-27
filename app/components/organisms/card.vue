<script setup lang="ts">
import type { Movie } from "~~/lib/db/schema";

 defineProps<{ movie: Movie }>();
</script>

<template>
  <div class="card bg-base-100  shadow-sm">
    <MoleculesPoster
      label="test"
      rate="3.5"
      :image="movie?.poster_image"
    />
    <MoleculesCardBody
      :title="movie?.title"
      :generes="[]"
      :duration="movie?.duration"
    />
  </div>
</template>
