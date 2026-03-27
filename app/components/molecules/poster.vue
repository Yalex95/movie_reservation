<script lang="ts" setup>
const props = defineProps<{
  label: string;
  rate: string;
  image: string | null;
}>();

const image = computed(() => props.image ? `/assets/movies/${props.image}` : "/assets/movies/movie_3.png");
</script>

<template>
  <div class="relative w-full h-96 rounded-t-md">
    <div class="flex w-full justify-between z-1 top-0 left-0 p-2 absolute">
      <AtomsBadge variant="primary">
        {{ label }}
      </AtomsBadge>
      <AtomsBadge variant="neutral" class=" text-yellow-300">
        <Icon name="heroicons:star-16-solid" />
        {{ rate }}
      </AtomsBadge>
    </div>
    <img
      :src="image"
      class="h-full w-full object-cover rounded-t-md"
      alt="Shoes"
    >
  </div>
</template>
