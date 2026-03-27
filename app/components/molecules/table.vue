<script lang="ts" setup>
withDefaults(
  defineProps<{
    headers: Array<string>;
    enableHeader?: boolean;
  }>(),
  {
    enableHeader: true,
  },
);
</script>

<template>
  <div class="overflow-x-auto rounded-box border border-base-content/5 bg-base-100">
    <table class="table">
      <thead v-if="enableHeader">
        <tr>
          <th
            v-for="(item, index) in headers"
            :key="index"
            class="capitalize"
          >
            {{ item }}
          </th>
        </tr>
      </thead>
      <tbody>
        <slot name="body" />
      </tbody>
      <tfoot>
        <slot name="footer" />
      </tfoot>
    </table>
  </div>
</template>
