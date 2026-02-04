<script setup lang="ts">
import { toTypedSchema } from "@vee-validate/zod";
import { updateProfileSchema } from "~~/lib/db/schema";

definePageMeta({
  layout: "authenticated",
});
const authStore = useAuthStore();
const { handleSubmit, errors } = useForm({
  validationSchema: toTypedSchema(updateProfileSchema),
  initialValues: {
    name: authStore.user?.name || "",
    email: authStore.user?.email || "",
    phone: authStore.user?.phone || "",
    // dob: authStore.user?.dob || "",
  },
});

const loading = ref(false);

const onSubmit = handleSubmit(async (values) => {
  console.log(values);
});
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
          <div class="avatar">
            <div class=" w-48 rounded-full ">
              <img src="https://img.daisyui.com/images/profile/demo/spiderperson@192.webp">
            </div>
          </div>
          <div class="flex justify-center flex-col">
            <h2 class="text-2xl font-semibold mt-4">
              Peter Parker
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
      <div id="personal-info" class="container  p-8 bg-base-100 rounded-lg border border-gray-700">
        <h2 class="text-2xl font-semibold mt-4">
          Personal Information
        </h2>

        <form>
          <!-- form here -->
        </form>
      </div>
      <div id="security-info" class="container  p-8 bg-base-100 rounded-lg border border-gray-700">
        <h2 class="text-2xl font-semibold mt-4">
          Security & Password
        </h2>
        <p class="text-gray-500">
          Protect your account with a strong password
        </p>
        <form
          class="grid grid-cols-2 gap-6"
          @submit.prevent="onSubmit"
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
          <AppFormField
            :error="errors.phone"
            label="Phone Number"
            name="phone"
            :disabled="loading"
          />
          <AppFormField
            :error="errors.dob"
            label="Date of Birth"
            name="dob"
            :disabled="loading"
          />

          <button
            class="btn btn-info text-white w-fit"
            :disabled="loading"
          >
            Save Profile Changes
            <span v-if="loading" class="loading loading-spinner loading-xs" />
          </button>
        </form>
      </div>
    </div>
  </div>
</template>
