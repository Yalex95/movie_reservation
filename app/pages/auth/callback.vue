<script setup lang="ts">
import { authClient } from "~/lib/auth-client";

const session = await authClient.getSession();
// manage this with middleware
if (session.data) {
  if (session.data?.user.role === "admin") {
    await navigateTo("/dashboard");
  }
  else {
    await navigateTo("/");
  }
}
</script>

<template>
  <div class="flex flex-col justify-center items-center w-full">
    <h1 class="text-2xl mb-6">
      Processing authentication...
    </h1>
    <span class="loading loading-dots loading-xl" />
  </div>
</template>
