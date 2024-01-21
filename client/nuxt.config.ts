require('dotenv').config();

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    nitro: {
        routeRules: {
            "/backend/**": {
                proxy: "https://api-taskly.fitriafiq.com/**"
            }
        }
    },
    modules: [
        '@nuxtjs/tailwindcss',
        'nuxt-icon',
        '@pinia/nuxt',
        '@vite-pwa/nuxt'
    ],
    pwa: {
        manifest: {
            name: 'Taksly',
            short_name: 'Taskly',
            description: 'Taskly is a task management app that helps you stay organized and track your progress.',
            theme_color: '#fbbf24',
            icons: [
                {
                    src: '/icons/icon_x48.png',
                    sizes: '48x48',
                    type: 'image/png',
                    purpose: 'any maskable'
                },
                {
                    src: '/icons/icon_x72.png',
                    sizes: '72x72',
                    type: 'image/png',
                    purpose: 'any maskable'
                },
                {
                    src: '/icons/icon_x96.png',
                    sizes: '96x96',
                    type: 'image/png',
                    purpose: 'any maskable'
                },
                {
                    src: '/icons/icon_x128.png',
                    sizes: '128x128',
                    type: 'image/png',
                    purpose: 'any maskable'
                },
                {
                    src: '/icons/icon_x192.png',
                    sizes: '192x192',
                    type: 'image/png',
                    purpose: 'any maskable'
                },
                {
                    src: '/icons/icon_x384.png',
                    sizes: '384x384',
                    type: 'image/png',
                    purpose: 'any maskable'
                },
                {
                    src: '/icons/icon_x512.png',
                    sizes: '512x512',
                    type: 'image/png',
                    purpose: 'any maskable'
                },
            ],
        },
        workbox: {
            navigateFallback: null
        },
        devOptions: {
            enabled: true,
            type: 'module'
        },
    },
    app: {
        head: {
            title: 'Taskly',
            meta: [
                {
                    name: 'description',
                    content: 'Taskly is a task management app that helps you stay organized and track your progress.'
                },
                {
                    hid: 'robots',
                    name: 'robots',
                    content: 'noindex'
                },
            ]
        }
    },
    runtimeConfig: {
        public: {
            API_URL: process.env.API_URL,
            STORAGE: process.env.STORAGE,
        },

    },
})
