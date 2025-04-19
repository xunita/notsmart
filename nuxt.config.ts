// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  runtimeConfig: {
    public: {
      ASSISTANT_ENDPOINT: process.env.ASSISTANT_ENDPOINT,
    },
  },
  compatibilityDate: "2024-11-01",
  devtools: { enabled: false },
  ssr: false,
  app: {
    head: {
      title: "NotSmartTodos", //
      htmlAttrs: {
        lang: "en",
      },
      link: [{ rel: "icon", type: "image/x-icon", href: "/favicon.ico" }],
    },
  },
  css: ["~/assets/css/nst.css"],
  ui: {
    colorMode: false,
  },
  modules: [
    "@nuxt/eslint",
    "@nuxt/fonts",
    "@nuxt/icon",
    "@nuxt/image",
    "@nuxt/test-utils",
    "@nuxt/ui",
    "@vueuse/motion/nuxt",
  ],
  image: {
    quality: 60,
    format: ["avif", "webp", "jpeg", "jpg", "png", "svg"],
    screens: {
      xs: 320,
      sm: 640,
      md: 768,
      lg: 1024,
      xl: 1280,
      xxl: 1536,
      "2xl": 1536,
    },
  },
});
