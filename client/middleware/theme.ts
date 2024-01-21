import { useAuthStore } from '@/stores/useAuthStore'
import { useSettingStore } from '@/stores/useSettingStore'

export default defineNuxtRouteMiddleware((to, from) => {
    const authStore = useAuthStore()
    const settingStore = useSettingStore()

    settingStore.setTheme(authStore.user?.setting_theme ? authStore.user.setting_theme : 2)
    return true
})

