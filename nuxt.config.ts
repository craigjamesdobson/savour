// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: [
    "@nuxtjs/tailwindcss",
    "nuxt-icon",
    "@nuxtjs/google-fonts",
    "@pinia/nuxt",
    "@nuxtjs/supabase",
    "@vite-pwa/nuxt",
    "@nuxt/image",
    "nuxt-primevue",
  ],
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
    "./node_modules/primevue/**/*.{vue,js,ts,jsx,tsx}"
],
  pwa: {
    manifest: {
      name: "Savour",
      short_name: "Savour",
      description: "Savour Recipe Manager",
      icons: [
        {
          src: "icons/icon-48x48.png",
          sizes: "48x48",
          type: "image/png",
        },
        {
          src: "icons/icon-72x72.png",
          sizes: "72x72",
          type: "image/png",
        },
        {
          src: "icons/icon-96x96.png",
          sizes: "96x96",
          type: "image/png",
        },
        {
          src: "icons/icon-128x128.png",
          sizes: "128x128",
          type: "image/png",
        },
        {
          src: "icons/icon-144x144.png",
          sizes: "144x144",
          type: "image/png",
        },
        {
          src: "icons/icon-192x192.png",
          sizes: "192x192",
          type: "image/png",
        },
        {
          src: "icons/icon-512x512.png",
          sizes: "512x512",
          type: "image/png",
        },
      ],
    },
    workbox: {
      navigateFallback: "/",
    },
    devOptions: {
      enabled: false,
      type: "module",
    },
  },
  devtools: { enabled: true },
  build: {
    rollupOptions: {
      external: "NonExistingPath",
    },
  },
  primevue: {
    cssLayerOrder: "tailwind-base, primevue, tailwind-utilities",
    importPT: { as: 'Tailwind', from: 'primevue/passthrough/tailwind' },
    options: {
      ripple: true,
      inputStyle: 'filled'
    },
    components: {
      exclude: ["Chart"],
    },
  },
  css: [
    "primevue/resources/themes/lara-light-blue/theme.css",
    "primeicons/primeicons.css",
  ],
  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
      cssnano:
        process.env.NODE_ENV === "production"
          ? { preset: ["default", { discardComments: { removeAll: true } }] }
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
    propsDestructure: true,
  }
});
