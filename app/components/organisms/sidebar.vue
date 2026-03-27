<script lang="ts" setup>
const isSidebarOpen = ref(false);

function toggleSidebar() {
  isSidebarOpen.value = !isSidebarOpen.value;
  localStorage.setItem("isSidebarOpen", isSidebarOpen.value.toString());
}
</script>

<template>
  <div class="hidden md:block bg-base-100 transition-all duration-300 shrink-0" :class="{ 'w-64': isSidebarOpen, 'w-16': !isSidebarOpen }">
    <div
      class="flex hover:cursor-pointer hover:bg-base-200 p-2"
      :class="{ 'justify-center': !isSidebarOpen, 'justify-start': isSidebarOpen }"
      @click="toggleSidebar"
    >
      <Icon
        v-if="isSidebarOpen"
        name="tabler:chevron-left"
        size="32"
      />
      <Icon
        v-else
        name="tabler:chevron-right"
        size="32"
      />
    </div>
    <div class="flex flex-col ">
      <slot name="sidebarButtons" :is-sidebar-open="isSidebarOpen" />
    </div>
  </div>
</template>
