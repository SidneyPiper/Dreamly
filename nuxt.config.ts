// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    css: ['./assets/css/transitions.css'],
    devtools: {enabled: false},
    sourcemap: true,
    modules: [
        '@sidebase/nuxt-auth',
        '@nuxtjs/tailwindcss',
        '@nuxtjs/google-fonts',
        '@pinia/nuxt',
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
            Inter: [300, 400, 500, 600, 700]
        }
    },
    experimental: {
        typedPages: true
    }
})
