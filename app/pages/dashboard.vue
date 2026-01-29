<script setup lang="ts">
import type { FetchError } from "ofetch";

import { toTypedSchema } from "@vee-validate/zod";

import { authClient } from "~/lib/auth-client";

const loading = ref(false);
const session = authClient.useSession();

async function onSubmit() {
  try {
    const { data: newUser, error } = await authClient.admin.createUser({
      email: "user@example.com", // required
      password: "yerisDev#123", // required
      name: "James Smith", // required
      role: "admin",
      // data: { customField: "customValue" },
    });
    console.warn(newUser, error);
  }
  catch (e) {
    const error = e as FetchError;
    console.error("Error creating user:", error);
  }
}
</script>

<template>
  <div>
    <form
      v-if="!session.data"
      class="grid grid-cols-1 gap-6"
      @submit.prevent="onSubmit"
    >
      <!-- chechbox -->
      <div class="grid grid-cols-1 md:grid-cols-4 gap-6">
        <button
          class="btn btn-info text-white"
          :disabled="loading"
        >
          Register Account
        </button>
      </div>
    </form>
  </div>
</template>
