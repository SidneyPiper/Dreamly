// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: false },
  modules: [
    '@sidebase/nuxt-auth',
    '@nuxtjs/tailwindcss',
    '@nuxtjs/google-fonts'
  ],
  runtimeConfig: {
    githubClientId: '',
    githubClientSecret: ''
  },
  app: {
    head: {
      viewport: 'width=device-width, initial-scale=1.0, interactive-widget=resizes-visual'
    }
  },
  googleFonts: {
    families: {
      Inter: true
    }
  }
})
