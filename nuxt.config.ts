// https://nuxt.com/docs/api/configuration/nuxt-config
import tailwindcss from "@tailwindcss/vite";

import "./app/lib/env";

export default defineNuxtConfig({

  compatibilityDate: "2025-07-15",
  devtools: { enabled: true },
  css: ["~/assets/css/main.css"],
  vite: {
    plugins: [
      tailwindcss(),
    ],
  },
  modules: ["@nuxt/eslint", "@nuxt/icon", "@vee-validate/nuxt", "@pinia/nuxt"],
  eslint: {
    config: {
      standalone: false,
    },
  },
});