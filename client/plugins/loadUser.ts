import { useAuthStore } from "~/stores/useAuthStore"

export default defineNuxtPlugin(async (nuxtApp) => {
    const authStore = useAuthStore()

    if (!authStore.isLoggedIn) {
        const { error } = await authStore.fetchUser()
        // console.log(error.value)
    }
})
