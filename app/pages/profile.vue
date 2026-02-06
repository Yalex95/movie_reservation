<script setup lang="ts">
import type { UpdatePassword, UpdateProfile } from "~~/lib/db/schema";

import { authClient } from "~~/lib/auth-client";
//TODO: update photo,remove photo, delete user btn
definePageMeta({
  layout: "authenticated",
});
const authStore = useAuthStore();
const initialValues = computed(() => ({
  email: authStore.user?.email ?? "",
  name: authStore.user?.name ?? "",
  phone: authStore.user?.phone ?? "",
}));
async function onUpdateUser(values: UpdateProfile) {
  const props = getModifiedProps(values, initialValues.value);
  if (Object.keys(props).length === 0) {
    throw createError({
      statusCode: 404,
      statusMessage: "Nothing to change",
    });
  };
  const result = await authClient.updateUser(props);
  if (result?.error) {
    throw createError({
      statusCode: 400,
      statusMessage: result.error.message,
      data: {
        currentPassword: result.error.message,
      },
    });
  }

  authStore.updateUser(props);

  return result;
}
async function onUpdatePassword(values: UpdatePassword) {
  const result = await authClient.changePassword({
    newPassword: values.password, // required yerisDev12#
    currentPassword: values.currentPassword, // required
    revokeOtherSessions: true,
  });
  if (result?.error) {
    throw createError({
      statusCode: 400,
      statusMessage: result.error.message || "Current password is incorrect",
      data: {
        currentPassword: result.error.message,
      },
    });
  }

  return result;
}
</script>

<template>
  <div class="flex-1 flex min-h-0">
    <div class="container mx-auto py-10 px-6 gap-10 flex-col flex flex-1 min-h-0 overflow-auto ">
      <div>
        <h1 class="text-3xl font-bold mb-2">
          User Profile
        </h1>
        <p>Manage your personal information and security settings.</p>
      </div>
      <div class="container flex justify-between p-8 bg-base-100 rounded-lg border border-gray-700">
        <div class="flex gap-10">
          <AppAvatar
            :avatar="authStore?.user?.image"
            :place-holder="authStore?.user?.name?.charAt(0)?.toUpperCase()"
            :name="authStore?.user?.name"
          />
          <div class="flex justify-center flex-col">
            <h2 class="text-2xl font-semibold mt-4">
              {{ authStore.user?.name }}
            </h2>
            <p class="text-gray-500">
              Update your photo for your profile
            </p>
          </div>
        </div>
        <div class="flex items-center gap-3">
          <button class="btn btn-active btn-primary">
            Update photo
          </button>
          <button class="btn btn-active">
            Remove photo
          </button>
        </div>
      </div>
      <!-- profile and password -->
      <div class="grid grid-cols-2 gap-5">
        <div id="personal-info" class="container  p-8 bg-base-100 rounded-lg border border-gray-700">
          <h2 class="text-2xl font-semibold mt-4">
            Personal Information
          </h2>
          <p class="text-gray-500">
            Update your personal information
          </p>
          <UserForm
            :initial-values="initialValues"
            :on-submit="onUpdateUser"
            submit-label="Update profile"
          />
        </div>
        <div id="security-info" class="container  p-8 bg-base-100 rounded-lg border border-gray-700">
          <h2 class="text-2xl font-semibold mt-4">
            Security & Password
          </h2>
          <p class="text-gray-500">
            Protect your account with a strong password
          </p>

          <NewPasswordForm
            :on-submit="onUpdatePassword"
            submit-label="Update Password"
          />
        </div>
      </div>
    </div>
  </div>
</template>
