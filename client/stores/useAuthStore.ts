import { defineStore } from 'pinia'
import { useApiFetch } from '@/composables/useApiFetch'

type User = {
    id: number
    first_name: string
    last_name: string
    email: string
    avatar: string
    setting_all: number
    setting_today: number
    setting_upcoming: number
    setting_completed: number
    setting_theme: number
}

type Credentials = {
    email: string
    password: string
    remember: boolean
}

type RegistrationInfo = {
    first_name: string
    last_name: string
    email: string
    password: string
    password_confirmation: string
}

type Reset = {
    token: string
    email: string
    password: string
    password_confirmation: string
}

export const useAuthStore = defineStore('auth', () => {
    // ========== STATES & CONFIGURATIONS ==========
    
    const user = ref<User | null>(null)
    const config = useRuntimeConfig()


    // ================== METHODS ==================

    const isLoggedIn = computed(() => !!user.value)

    const logout = async () => {
        await useApiFetch('/logout', {
            method: 'POST'
        })

        user.value = null
        navigateTo('/login')
    }

    const fetchUser = async () => {
        const apiFetch = await useApiFetch('/api/user')

        if (apiFetch.data.value) {
            user.value = apiFetch.data.value as User
            user.value.avatar = user.value.avatar !== null ? config.public.STORAGE + user.value.avatar : '/img/default.png'
            console.log(user.value)
        }

        return apiFetch
    }

    const login = async (credentials: Credentials) => {
        await useApiFetch('/sanctum/csrf-cookie')

        const apiFetch = await useApiFetch('/login', {
            method: 'POST',
            body: credentials
        })

        return apiFetch
    }

    const register = async (info: RegistrationInfo) => {
        await useApiFetch('/sanctum/csrf-cookie')

        const apiFetch = await useApiFetch('/register', {
            method: 'POST',
            body: info
        })

        return apiFetch
    }

    const resetPassword = async (info: Reset) => {
        await useApiFetch('/sanctum/csrf-cookie')

        const apiFetch = await useApiFetch('/reset-password', {
            method: 'POST',
            body: info
        })

        return apiFetch
    }

    const forgotPassword = async (info: string) => {
        await useApiFetch('/sanctum/csrf-cookie')

        const apiFetch = await useApiFetch('/forgot-password', {
            method: 'POST',
            body: {
                email: info
            }
        })

        return apiFetch
    }

    const resendVerify = async (id: string) => {
        await useApiFetch('/sanctum/csrf-cookie')

        const apiFetch = await useApiFetch('/email/verification-notification/' + id, {
            method: 'POST',
        })

        return apiFetch
    }

    const routeCheck = (route: any) => {
        const allowedRoutes = ['login', 'register', 'forgot-password'];

        return !allowedRoutes.includes(route.name);
    }
    

    // ================== RETURN ===================

    return {
        user,
        isLoggedIn,
        login,
        fetchUser,
        logout,
        register,
        routeCheck,
        forgotPassword,
        resetPassword,
        resendVerify
    }
})