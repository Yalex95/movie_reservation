<script setup lang="ts">
withDefaults(
  defineProps<{
    size?: "w-48" | "w-10";
    avatar: string | null | undefined;
    placeHolder?: string;
    name?: string;
    nameClass?: string;
  }>(),
  {
    size: "w-48",
    name: "User Avatar",
    nameClass: "text-4xl font-bold",
  },
);

const attrs = useAttrs();
</script>

<template>
  <div
    class="avatar"
    :class="[{ 'avatar-placeholder': !avatar }]"
    v-bind="attrs"
  >
    <div
      class="  rounded-full "
      :class="[size, { 'bg-neutral text-neutral-content': !avatar }]"
    >
      <img
        v-if="avatar"
        :alt="name"
        :src="avatar"
      >
      <span v-else :class="[nameClass]">{{ name.charAt(0)?.toUpperCase() }}</span>
    </div>
  </div>
</template>
