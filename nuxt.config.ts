// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: [
    "@nuxtjs/tailwindcss",
    "nuxt-icon",
    "@nuxtjs/google-fonts",
    "@pinia/nuxt",
    "@nuxtjs/supabase",
    '@vite-pwa/nuxt',
  ],
  pwa: {
    manifest: {
      name: "Savour",
      short_name: "Savour",
      description: "Recipe manager",
      icons: [
        {
          src: "icons/icon-72x72.png",
          sizes: "72x72",
          type: "image/png",
          purpose: "maskable any"
        },
        {
          src: "icons/icon-96x96.png",
          sizes: "96x96",
          type: "image/png",
          purpose: "maskable any"
        },
        {
          src: "icons/icon-128x128.png",
          sizes: "128x128",
          type: "image/png",
          purpose: "maskable any"
        },
        {
          src: "icons/icon-144x144.png",
          sizes: "144x144",
          type: "image/png",
          purpose: "maskable any"
        },
        {
          src: "icons/icon-152x152.png",
          sizes: "152x152",
          type: "image/png",
          purpose: "maskable any"
        },
        {
          src: "icons/icon-192x192.png",
          sizes: "192x192",
          type: "image/png",
          purpose: "maskable any"
        },
        {
          src: "icons/icon-384x384.png",
          sizes: "384x384",
          type: "image/png",
          purpose: "maskable any"
        },
        {
          src: "icons/icon-512x512.png",
          sizes: "512x512",
          type: "image/png",
          purpose: "maskable any"
        }
      ]
    },
    workbox: {
      navigateFallback: "/",
    },
    devOptions: {
      enabled: true,
      type: "module",
    }
  },
  devtools: { enabled: true },
  build: {
    transpile: ["primevue"],
    rollupOptions: {
      external: 'NonExistingPath'
    }
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
