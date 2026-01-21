<script lang="ts" setup>
const props = defineProps<{ error?: string; label: string; type?: "text" | "textarea" | "number" | "password"; name: string; disabled?: boolean }>();
</script>

<template>
  <fieldset class="fieldset">
    <legend class="fieldset-legend">
      {{ props.label }}
    </legend>
    <Field
      :as=" type === 'number' || 'password' ? 'input' : type || 'input' "
      :name="props.name"
      :type="type || 'text'"
      placeholder="Type here"
      class=" w-full"
      :class="{
        'input-error': props.error,
        'input': !type || type === 'text' || type === 'number' || type === 'password',
        'textarea': type === 'textarea',
      }"
      :disabled="props.disabled"
    />
    <p v-if="props.error" class="label text-error">
      {{ props.error }}
    </p>
  </fieldset>
</template>
