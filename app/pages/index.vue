<script setup lang="ts">
import type { FetchError } from "ofetch";

import { toTypedSchema } from "@vee-validate/zod";

import { authClient } from "~/lib/auth-client";
import { registerSchema } from "~/lib/db/schema";

const loading = ref(false);
const session = authClient.useSession();

const { handleSubmit, errors, setErrors } = useForm({
  validationSchema: toTypedSchema(registerSchema),
  initialValues: {
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  },
});
const submitError = ref("");
const onSubmit = handleSubmit(async (values) => {
  loading.value = true;
  try {
    submitError.value = "";
    // fetch
    await authClient.signUp.email({
      email: values.email,
      password: values.password,
      name: values.name,
    });
  }
  catch (e) {
    const error = e as FetchError;
    if (error.data?.data) {
      setErrors(error.data?.data);
    }
    submitError.value = error.data?.statusMessage || error.statusMessage || "An unknown error occured.";
  }
  loading.value = false;
});
</script>

<template>
  <div class="container max-w-md mx-auto p-4">
    <form class="flex flex-col gap-2" @submit.prevent="onSubmit">
      <AppFormField
        :error="errors.name"
        label="Name"
        name="name"
        :disabled="loading"
      />
      <AppFormField
        :error="errors.email"
        label="email"
        name="email"
        :disabled="loading"
      />
      <AppFormField
        :error="errors.password"
        label="password"
        name="password"
        type="password"
        :disabled="loading"
      />
      <AppFormField
        :error="errors.confirmPassword"
        label="confirmPassword"
        name="confirmPassword"
        :disabled="loading"
      />
      <button
        type="submit"
        class="btn btn-primary"
        :disabled="loading"
      >
        Add
        <span v-if="loading" class="loading loading-spinner loading-xs" />
        <Icon
          v-else
          name="tabler:circle-plus-filled"
          size="24"
        />
      </button>
    </form>
    <div>
      <pre>{{ session.data }}</pre>
      <button v-if="session.data" @click="authClient.signOut()">
        Sign out
      </button>
    </div>
  </div>
</template>
