<template>
    <VitePwaManifest />
    <div class="flex" :class="settingStore.settings ? 'h-full' : 'h-screen overflow-hidden'">
        <Notification />
        <TheSidebar v-if="authStore.routeCheck(route)" />
        <div class="flex w-full flex-col lg:ms-64">
            <TheHeader v-if="authStore.routeCheck(route)" />
            <slot />
        </div>
    </div>
</template>

<script lang="ts" setup>
import { useAuthStore } from '@/stores/useAuthStore'
import { useSettingStore } from '@/stores/useSettingStore'


// ========== STATES & CONFIGURATIONS ==========

const authStore = useAuthStore()
const settingStore = useSettingStore()
const route = useRoute()


// ============== LIFECYCLE HOOKS ==============

onMounted(() => {
    settingStore.setTheme(authStore.user?.setting_theme ? authStore.user.setting_theme : 2)
})

onBeforeMount(() => {
    settingStore.setTheme(authStore.user?.setting_theme ? authStore.user.setting_theme : 2)
})


// ================ COMPOSABLES ================

useHead({
    meta: [
        { name: 'theme-color', content: '#fbbf24' }
    ],
    script: [
        {
            children: `
            if (!('theme' in localStorage)) {
                if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
                    localStorage.setItem('theme', 'dark')
                    document.documentElement.classList.add('dark')
                } else {
                    localStorage.setItem('theme', 'light')
                    document.documentElement.classList.remove('dark')
                }
            } else {
                if (localStorage.theme == 'dark') {
                    document.documentElement.classList.add('dark')
                } else {
                    document.documentElement.classList.remove('dark')
                   
                }
            }
            `
        }
    ]
})
</script>