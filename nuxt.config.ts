// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    css: ['./assets/css/transitions.css'],

    devtools: {
        enabled: true,

        timeline: {
            enabled: true
        }
    },

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
            viewport: 'width=device-width, initial-scale=1, interactive-widget=resizes-visual',
            link: [
                {rel: 'apple-touch-icon', sizes: '120x120', href: '/apple-touch-icon.png'},
                {rel: 'icon', type: 'image/png', sizes: '32x32', href: '/favicon-32x32.png'},
                {rel: 'icon', type: 'image/png', sizes: '16x16', href: '/favicon-16x16.png'},
                {rel: 'manifest', href: '/site.webmanifest'},
                {rel: 'mask-icon', href: '/safari-pinned-tab.svg', color: '#5bbad5'},
            ],
            meta: [
                {name: 'msapplication-TileColor', content: '#da532c'},
                {name: 'theme-color', content: '#ffffff'}
            ]
        }
    },

    auth: {
        isEnabled: true,
        baseURL: process.env.AUTH_ORIGIN,
        provider: {
            type: 'authjs'
        },
    },

    googleFonts: {
        families: {
            Inter: [300, 400, 500, 600, 700]
        }
    },

    experimental: {
        typedPages: true
    },

    compatibilityDate: '2024-07-17'
})