<script lang="ts" setup>
const route = useRoute();
definePageMeta({
  layout: "authenticated",
});

const { data, pending, error, refresh } = await useFetch(`/api/user/${route.params.id}`, {
  method: "GET",
});
console.log(data.value);
</script>

<template>
  <div>
    {{ data }}
  </div>
</template>
