<script setup lang="ts">
import { UpdateProfile } from "~~/lib/db/schema";

defineProps<{
  initialValues?: UpdateProfile;
  onSubmit: (password: UpdateProfile) => Promise<any>;
  submitLabel: string;
}>();
</script>

<template>
  <UserBaseForm
    v-slot="{ errors, loading }"

    :initial-values="initialValues || {
      name: '',
      email: '',
      phone: '',
      image: '',
    }"
    :schema="UpdateProfile"
    :on-submit="onSubmit"
    :submit-label="submitLabel"
  >
    <AppFormField
      :error="errors.name"
      label="Full Name"
      name="name"
      :disabled="loading"
    />
    <AppFormField
      :error="errors.email"
      label="Email Address"
      name="email"
      :disabled="true"
    />
    <AppFormField
      :error="errors.phone"
      label="Phone Number"
      name="phone"
      :disabled="loading"
    />
  </UserBaseForm>
</template>
