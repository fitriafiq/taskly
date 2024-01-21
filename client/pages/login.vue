<template>
    <NuxtLayout name="auth">
        <h2 class="font-bold tracking-tight text-gray-900">Welcome to <span
                class="text-amber-400">Taskly</span></h2>
        <p class="mt-2 text-sm leading-6 text-gray-500">
            Taskly is a task management app that helps you stay organized and track your progress. Please log in to get
            started on your journey to enhanced productivity.
        </p>
        <form @submit.prevent="handleLogin" class="space-y-6 mt-10">
            <div class="relative">
                <div>
                    <label class="sr-only">Email</label>
                    <input v-model="form.email" type="email" autocomplete="email" required
                        class="relative block w-full rounded-md ring-1 ring-inset ring-gray-300 py-1.5 text-gray-900 text-center placeholder:text-gray-400 placeholder:px-3 sm:text-sm sm:leading-6"
                        placeholder="Email">
                </div>
                <div class="mt-3">
                    <label class="sr-only">Password</label>
                    <input v-model="form.password" type="password" autocomplete="current-password" required
                        class="relative block w-full rounded-md ring-1 ring-inset ring-gray-300 py-1.5 text-gray-900 text-center placeholder:text-gray-400 placeholder:px-3 sm:text-sm sm:leading-6"
                        placeholder="Password">
                </div>
                <p v-if="form.error !== ''" class="text-sm text-center mt-1 text-red-500">{{ form.error }}</p>
            </div>
            <div class="flex flex-col md:flex-row items-center justify-between gap-3 md:gap-0">
                <div class="flex items-center">
                    <input v-model="form.remember" id="remember-me" name="remember-me" type="checkbox"
                        class="border-2 border-gray-300">
                    <label for="remember-me" class="ml-3 block text-sm leading-6 text-gray-900 cursor-pointer">Remember me</label>
                </div>

                <div class="text-sm leading-6">
                    <NuxtLink to="/password/forgot" class="font-semibold text-gray-900  hover:text-amber-400 duration-200">
                        Forgot
                        password?</NuxtLink>
                </div>
            </div>
            <div class="flex justify-center">
                <button type="submit"
                    class="rounded-md w-full bg-amber-400 px-3 py-2 text-sm font-semibold drop-shadow-md text-white shadow-sm hover:bg-amber-400/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber-300">LOG
                    IN</button>
            </div>
            <div class="text-sm leading-6 text-black">
                <p>
                    Not a member?
                    <NuxtLink to="/register"
                        class="font-semibold text-gray-900 cursor-pointer hover:text-amber-400 duration-200">
                        Sign up for
                        free!</NuxtLink>
                </p>
                <p class="mt-2">
                    Account still not verified?
                    <NuxtLink to="/verify/resend"
                        class="font-semibold text-gray-900 cursor-pointer hover:text-amber-400 duration-200">
                        Verify now!</NuxtLink>
                </p>
            </div>
        </form>
    </NuxtLayout>
</template>

<script lang="ts" setup>
import { useAuthStore } from '@/stores/useAuthStore'
import { useNotificationStore } from '@/stores/useNotificationStore'


// ============== COMPILER MACRO ===============

definePageMeta({
    middleware: 'auth',
    layout: false
})


// ========== STATES & CONFIGURATIONS ==========

const authStore = useAuthStore()
const notificationStore = useNotificationStore()

const form = ref({
    email: 'test@example.com',
    password: 'password',
    remember: false,
    error: ''
})


// ================== METHODS ==================

const handleLogin = async () => {
    form.value.error = ''

    const { error } = await authStore.login(form.value)
    if (!error.value) {
        const { data } = await authStore.fetchUser()

        if (data.value) {
            notificationStore.openAuthNotification('login')
            navigateTo('/')
        }

    } else {
        if (error.value.data?.errors?.email.includes('These credentials do not match our records.')) {
            form.value.error = 'The email or password entered is incorrect.'
        } else if (error.value.data?.errors?.email) {
            form.value.error = 'You must verify your email address before logging in.'
        }

    }
}
</script>