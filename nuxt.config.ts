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
    rollupOptions: {
      external: 'NonExistingPath'
    }
  },
  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
     cssnano:
       process.env.NODE_ENV === 'production'
         ? { preset: ['default', { discardComments: { removeAll: true } }] }
         : false, // disable cssnano when not in production
    },
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
