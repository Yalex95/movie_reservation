<script lang="ts" setup>
import type { FetchError } from "ofetch";

import { toTypedSchema } from "@vee-validate/zod";

import { authClient } from "~/lib/auth-client";
import { loginSchema } from "~/lib/db/schema";

const loading = ref(false);
// const session = authClient.useSession();

const { handleSubmit, errors, setErrors } = useForm({
  validationSchema: toTypedSchema(loginSchema),
  initialValues: {
    email: "",
    password: "",
  },
});
const submitError = ref("");
const onSubmit = handleSubmit(async (values) => {
  loading.value = true;
  try {
    submitError.value = "";

    const form = {
      email: values.email,
      password: values.password,
    };
    const { data, error } = await authClient.signIn.email(form);
    console.warn(data, error);
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
  <div class=" sign-in w-full md:p-4 px-4 py-10 flex flex-col items-center justify-center overflow-auto">
    <div class="container flex flex-col   md:w-1/4 bg-base-100 md:p-6 p-4 border rounded-md border-gray-900 gap-6">
      <div>
        <div class="p-3  rounded-md bg-blue-500 w-fit mx-auto mb-3">
          <Icon name="iconoir:cinema-old" class="text-white w-10 h-10 m-auto" />
        </div>
        <h1 class="text-center text-3xl font-semibold mb-2">
          Cinema
        </h1>
        <p class="text-center text-gray-400 text-base">
          Welcome back, please login to your account
        </p>
      </div>
      <form class="flex flex-col gap-4" @submit.prevent="onSubmit">
        <AppFormField
          :error="errors.email"
          label="Email Address"
          name="email"
          :disabled="loading"
        />
        <AppFormField
          :error="errors.password"
          label="Password"
          name="password"
          type="password"
          :disabled="loading"
        />
        <div class="flex gap-4 justify-between items-center">
          <AppCheckBox
            checkbox-class="checkbox-info border-gray-100 checkbox-sm"
          >
            <template #label>
              <label class="fieldset-legend">
                Remember me
              </label>
            </template>
          </AppCheckBox>
          <NuxtLink to="/" class="text-sm text-blue-500 font-semibold">
            Forgot password
          </NuxtLink>
        </div>
        <button
          class="btn btn-info text-white"
          :disabled="loading"
        >
          Login
          <span v-if="loading" class="loading loading-spinner loading-xs" />
          <icon
            v-else
            name="material-symbols:login"
            class="w-10 h-10"
          />
        </button>
      </form>
      <hr>
      <p class="text-xs text-center">Don't have an account yet? <NuxtLink to="/sign-up" class="font-semibold underline underline-offset-2">Create an account</NuxtLink></p>
    </div>
  </div>
</template>

<style scoped>
.sign-in {
  background:
    linear-gradient(rgb(1 69 107 / 68%), rgb(0 0 0 / 81%)),
    url(./assets/cinema_vip.jpg) center / cover no-repeat;
}
</style>
