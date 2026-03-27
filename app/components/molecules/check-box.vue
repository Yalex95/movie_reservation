<script lang="ts" setup>
const props = defineProps<{
  fieldsetClass?: string;
  name: string;
  disabled?: boolean;
  checkboxClass?: string;
}>();



const { value, errorMessage, meta } = useField<boolean>(props.name);
</script>

<template>
  <fieldset class="fieldset " :class="[fieldsetClass]">
    <slot name="legend" />
    <label class="label">
      <input
        v-model="value"
        :disabled="disabled"
        :name="name"
        type="checkbox"
        class="checkbox"
        :class="[checkboxClass]"
      >
      <slot name="label" />
    </label>
    <p
      v-if="meta.touched && errorMessage"
      class="label text-error"
      v-html="errorMessage"
    />
  </fieldset>
</template>
