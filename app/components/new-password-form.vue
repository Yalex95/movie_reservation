<script setup lang="ts">
import { UpdatePassword } from "~~/lib/db/schema";

defineProps<{
  initialValues?: UpdatePassword;
  onSubmit: (password: UpdatePassword) => Promise<any>;
  submitLabel: string;
}>();
</script>

<template>
  <PasswordBaseForm
    v-slot="{ errors, loading }"

    :schema="UpdatePassword"
    :on-submit="onSubmit"
    :submit-label="submitLabel"
  >
    <AppFormField
      label="Current Password"
      name="currentPassword"
      type="text"
      placeholder="Type current password"
      :disabled="loading"
      :error="errors.currentPassword"
    />
    <AppFormField
      label="Password"
      name="password"
      type="password"
      :disabled="loading"
      :error="errors.password"
      placeholder="Type password"
    />
    <AppFormField
      :error="errors.confirmNewPassword"
      label="Confirm Password"
      name="confirmNewPassword"
      type="text"
      :disabled="loading"
      placeholder="Confirm password"
    />
  </PasswordBaseForm>
</template>
