<script lang="ts" setup>
defineProps<{
  title: string | null;
  generes: [];
  duration: string | null;
}>();
</script>

<template>
  <div class="card-body">
    <h2 class="card-title">
      {{ title }}
    </h2>
    <div class="flex justify-between items-center">
      <AtomsList variant="default">
        <li v-for="(genere, index) in generes" :key="index">
          {{ genere }}
        </li>
      </AtomsList>
      <AtomsList variant="default" class="inline-flex items-center gap-2">
        <Icon name="heroicons:clock-solid" />
        <AtomsText>{{ duration }}</AtomsText>
      </AtomsList>
    </div>
  </div>
</template>
