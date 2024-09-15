// https://nuxt.com/docs/api/configuration/nuxt-config

import {resolve} from 'path'

export default defineNuxtConfig({
    css: ['./assets/css/transitions.css'],

    alias: {
        'types': resolve(__dirname, './prisma/types'),
        'stores': resolve(__dirname, './stores'),
    },

    devtools: {
        enabled: false,

        timeline: {
            enabled: true
        }
    },

    sourcemap: true,

    modules: [
        '@sidebase/nuxt-auth',
        '@nuxtjs/tailwindcss',
        '@nuxtjs/google-fonts',
        '@nuxtjs/color-mode',
        '@pinia/nuxt',
        "nuxt-viewport",
    ],

    colorMode: {
        fallback: 'dark',
        classSuffix: ''
    },

    viewport: {
        breakpoints: {
            xs: 320,
            sm: 640,
            md: 768,
            lg: 1024,
            xl: 1280,
            '2xl': 1536,
        },

        defaultBreakpoints: {
            desktop: 'lg',
            mobile: 'xs',
            tablet: 'md',
        },

        fallbackBreakpoint: 'lg'
    },

    runtimeConfig: {
        githubClientId: '',
        githubClientSecret: ''
    },

    app: {
        head: {
            viewport: 'width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no',
            title: 'Dreamly',
            link: [
                {rel: 'apple-touch-icon', sizes: '120x120', href: '/apple-touch-icon.png'},
                {rel: 'icon', type: 'image/png', sizes: '32x32', href: '/favicon-32x32.png'},
                {rel: 'icon', type: 'image/png', sizes: '16x16', href: '/favicon-16x16.png'},
                {rel: 'manifest', href: '/site.webmanifest'},
                {rel: 'mask-icon', href: '/safari-pinned-tab.svg', color: '#5bbad5'},
            ],
            meta: [
                {
                    name: 'description',
                    content: 'Dreamly is a gentle companion for capturing and exploring your dreams.'
                },
                {name: 'msapplication-TileColor', content: '#da532c'},
                {name: 'theme-color', content: '#1c1917'},
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
            Inter: [300, 400, 500, 600, 700],
            'Chivo Mono': [400, 500, 600]
        }
    },

    experimental: {
        typedPages: true
    },

    compatibilityDate: '2024-07-17'
})