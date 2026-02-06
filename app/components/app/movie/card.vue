<script setup lang="ts">
const props = defineProps<{ movie: object }>();
</script>

<template>
  <div class="card bg-base-100  shadow-sm">
    <div class="relative w-full h-96 rounded-t-md">
      <div class="flex w-full justify-between z-1 top-0 left-0 p-2 absolute">
        <div class="badge badge-primary ">
          
        </div>
        <div class="badge badge-neutral text-yellow-300">
          <Icon name="heroicons:star-16-solid" />
          {{ movie.rate }}
        </div>
      </div>
      <img
        :src="movie.poster"
        class="h-full w-full object-top rounded-t-md"
        alt="Shoes"
      >
    </div>
    <div class="card-body">
      <h2 class="card-title">
        {{ movie.name }}
      </h2>
      <div class="flex justify-between items-center">
        <ul>
          <li v-for="(genere, index) in movie.generes" :key="index">
            {{ genere }}
          </li>
        </ul>
        <div class="inline-flex items-center gap-2">
          <Icon name="heroicons:clock-solid" />
          <p>{{ movie.duration }}</p>
        </div>
      </div>
    </div>
  </div>
</template>
