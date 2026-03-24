<script lang="ts" setup>
withDefaults(
  defineProps<{
    error?: string;
    label: string;
    name: string;
    disabled?: boolean;
    placeholder?: string;
  }>(),
  {
    placeholder: "Type your password",
  },
);
const showPassword = ref(false);
</script>

<template>
  <fieldset class="fieldset">
    <legend class="fieldset-legend">
      {{ label }}
    </legend>

    <div class="relative">
      <Field
        as="input"
        :name
        :type="showPassword ? 'text' : 'password'"
        :placeholder
        class="w-full input pr-10"
        :class="[
          { 'input-error': error },
        ]"
        :disabled
      />
      <button
        type="button"
        class="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500"
        :aria-label="showPassword ? 'Hide password' : 'Show password'"
        :disabled
        @click="showPassword = !showPassword"
      >
        <Icon
          v-if="!showPassword"
          name="mdi:eye-outline"
          size="16"
        />
        <Icon
          v-else
          name="mdi:eye-off-outline"
          size="16"
        />
      </button>
    </div>
    <p
      v-if="error"
      class="label text-error"
      v-html="error"
    />
  </fieldset>
</template>
