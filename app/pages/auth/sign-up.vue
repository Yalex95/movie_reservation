<script setup lang="ts">
import type { FetchError } from "ofetch";

import { toTypedSchema } from "@vee-validate/zod";
import { authClient } from "~~/lib/auth-client";
import { RegisterUser } from "~~/lib/db/schema";
const loading = ref(false);
const session = authClient.useSession();

const { handleSubmit, errors, setErrors } = useForm({
  validationSchema: toTypedSchema(RegisterUser),
  initialValues: {
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    acceptedTerms: false,
  },
  // validateOnMount: false

});

const submitError = ref("");
const onSubmit = handleSubmit(async (values) => {
  loading.value = true;
  try {
    submitError.value = "";
    // fetch
    const form = {
      email: values.email,
      password: values.password,
      name: values.name,
      confirmPassword: values.confirmPassword,
      acceptedTerms: values.acceptedTerms,
    };
    const { error } = await authClient.signUp.email(form);
    if (error) {
      throw createError({
        statusCode: 400,
        statusMessage: error.message,

      });
    }
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
  <div class="sign-up w-full  md:p-4 px-4 py-10 flex flex-col items-center justify-center overflow-auto ">
    <div class="container flex flex-col gap-10 md:w-8/12">
      <div class="flex flex-col md:gap-0 gap-4">
        <h1 class="text-3xl font-bold">
          Join the Cinema Experience
        </h1>
        <div class="flex justify-between flex-col md:flex-row md:gap-0 gap-4">
          <div class="md:w-2/3 w-full">
            <p>Create your account to manage bookings, save your favorite movies and earn exlisive rewards.</p>
          </div>
          <NuxtLink
            to="/auth/sign-in"
            class="btn md:flex hidden"
          >
            <Icon name="heroicons:arrow-left" />
            Back to login
          </NuxtLink>
        </div>
      </div>
      <div class="border rounded-md border-gray-600 bg-base-100 md:p-10 p-4 ">
        <form
          v-if="!session.data"
          class="grid grid-cols-1 gap-6"
          @submit.prevent="onSubmit"
        >
          <div

            class="grid md:grid-cols-2 grid-cols-1 gap-x-6 gap-y-2"
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
              :disabled="loading"
            />
            <AppUiFormPassword
              :error="errors.password"
              label="Password"
              name="password"
              :disabled="loading"
            />
            <AppUiFormPassword
              :error="errors.confirmPassword"
              label="Confirm Password"
              name="confirmPassword"
              :disabled="loading"
            />
          </div>
          <AppCheckBox
            name="acceptedTerms"
            checkbox-class="checkbox-info border-gray-100 checkbox-sm"
            :disabled="loading"
          >
            <template #label>
              <label class="fieldset-legend">
                I agree to the <NuxtLink to="/" class="text-blue-500">
                  Terms of service
                </NuxtLink> and <NuxtLink to="/" class="text-blue-500">
                  Privacy Policy
                </NuxtLink>, including receipt od promotianal movie updatre
              </label>
            </template>
          </AppCheckBox>
          <!-- chechbox -->
          <div class="grid grid-cols-1 md:grid-cols-4 gap-6">
            <button
              class="btn btn-info text-white"
              :disabled="loading"
            >
              Register Account
              <span v-if="loading" class="loading loading-spinner loading-xs" />
            </button>
            <p class="text-sm md:text-start text-center text-gray-300 md:col-span-3 my-auto">
              Already have an account? <NuxtLink class="font-semibold text-blue-500" to="/auth/sign-in">
                Login here
              </NuxtLink>
            </p>
          </div>
        </form>
      </div>
      <div class="mt-4 ">
        <p class="text-center">
          2026 CinemaSystem Management Portal. All rights reserved
        </p>
        <ul class="inline-flex gap-4 items-center justify-center w-full">
          <li>
            <NuxtLink to="/" />
          </li>
          <li>
            <NuxtLink to="/">
              Policy
            </NuxtLink>
          </li>
          <li>
            <NuxtLink to="/">
              Privacy
            </NuxtLink>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<style lang="css" scoped>
.sign-up {
  background:
    linear-gradient(rgb(1 69 107 / 68%), rgb(0 0 0 / 81%)),
    url(/assets/cinema_vip.jpg) center / cover no-repeat;
}
</style>
