import { defineStore } from 'pinia'
import { useApiFetch } from '@/composables/useApiFetch'
import { useAuthStore } from '@/stores/useAuthStore'

type Account = {
    first_name: string
    last_name: string
    avatar: string
    avatar_file: File | null
}

type Password = {
    current_password: string
    new_password: string
    new_password_confirmation: string
}

type Preference = {
    setting_all: number
    setting_today: number
    setting_upcoming: number
    setting_completed: number
    setting_theme: number
}

export const useSettingStore = defineStore('settings', () => {
    // ========== STATES & CONFIGURATIONS ==========

    const authStore = useAuthStore()

    const settings = ref(false)
    const themeSetting = ref(false)
    const sidebar = ref(false)
    const editor = ref(false)


    // ================== METHODS ==================

    const openEditor = () => {
        editor.value = true
    }

    const closeEditor = () => {
        editor.value = false
    }

    const openSidebar = () => {
        sidebar.value = true
    }

    const closeSidebar = () => {
        sidebar.value = false
    }

    const openSettings = () => {
        settings.value = true
    }

    const closeSettings = () => {
        settings.value = false
    }

    const updateAccount = async (account: Account) => {
        const accountData = new FormData();
        accountData.append('first_name', account.first_name);
        accountData.append('last_name', account.last_name);

        if (account.avatar_file) {
            accountData.append('avatar', account.avatar_file);
        }

        const apiFetch = await useApiFetch('/api/user/account', {
            method: 'POST',
            body: accountData
        })

        if (apiFetch.data.value) {
            await authStore.fetchUser()
        }

        return apiFetch
    }

    const updatePassword = async (password: Password) => {
        const apiFetch = await useApiFetch('/api/user/password', {
            method: 'PUT',
            body: password,
        })

        return apiFetch
    }

    const updatePreference = async (preference: Preference) => {
        const apiFetch = await useApiFetch('/api/user/preference', {
            method: 'PUT',
            body: preference,
        })

        if (apiFetch.data.value) {
            setTheme(preference.setting_theme)

            if (apiFetch.data.value) {
                await authStore.fetchUser()
            }
        }

        return apiFetch
    }

    const setTheme = (theme: number) => {
        if (theme === 1) {
            localStorage.theme = 'light'
        } else if (theme === 0) {
            localStorage.theme = 'dark'
        } else {
            localStorage.removeItem('theme')
        }

        if (localStorage.theme === 'dark' || (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
            document.documentElement.classList.add('dark')
            themeSetting.value = true
        } else {
            document.documentElement.classList.remove('dark')
            themeSetting.value = false
        }
    }

    // ================== RETURN ===================

    return {
        settings,
        themeSetting,
        sidebar,
        editor,
        openEditor,
        closeEditor,
        openSidebar,
        closeSidebar,
        openSettings,
        closeSettings,
        updatePreference,
        updatePassword,
        updateAccount,
        setTheme
    }
})