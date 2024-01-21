import { useAuthStore } from "@/stores/useAuthStore"

export default defineNuxtRouteMiddleware((to, from) => {
    const authStore = useAuthStore()

    if (authStore.isLoggedIn && (to.path === '/login' || to.path === '/register' || to.path === '/forgot-password')) {
        return navigateTo('/', { replace: true })
    }
 
    if (!authStore.isLoggedIn && to.path === '/') {
        return navigateTo('/login', { replace: true })
    }
})
