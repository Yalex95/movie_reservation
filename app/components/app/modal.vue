<script lang="ts" setup>
const props = defineProps<{
  id: string;
}>();
</script>

<template>
  <dialog :id class="modal">
    <div class="modal-box">
      <form method="dialog">
        <button class="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
          ✕
        </button>
      </form>
     <slot />
    </div>
  </dialog>
</template>
