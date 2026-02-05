<script lang="ts" setup>
const props = withDefaults(
  defineProps<{
    show?: boolean;
    label: string | object;
    alertType?: "info" | "success" | "warning" | "error";
  }>(),
  {
    show: false,
    alertType: "info",
  },
);
const icon = computed(() => {
  if (props.alertType === "info")
    return "ri:information-2-line";
  if (props.alertType === "success")
    return "material-symbols-light:check-circle";
  if (props.alertType === "warning")
    return "ic:baseline-warning";
  if (props.alertType === "error")
    return "ix:error-filled";
  return "";
});
const alertClass = computed(() => ({
  "alert-info": props.alertType === "info",
  "alert-success": props.alertType === "success",
  "alert-warning": props.alertType === "warning",
  "alert-error": props.alertType === "error",
}));
</script>

<template>
  <div v-if="show" class="toast">
    <div class="alert " :class="[alertClass]">
      <Icon :name="icon" size="24" />
      <span>{{ label }}.</span>
    </div>
  </div>
</template>
