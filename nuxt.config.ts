// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: [
    "@nuxtjs/tailwindcss",
    "nuxt-icon",
    "@nuxtjs/google-fonts",
    "@pinia/nuxt",
    "@nuxtjs/supabase",
  ],
  devtools: { enabled: true },
  build: {
    transpile: ["primevue"],
  },
  googleFonts: {
    families: {
      Inter: [400, 700],
    },
  },
  vue: {
    defineModel: true,
    propsDestructure: true
  }
});
