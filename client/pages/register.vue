<template>
    <NuxtLayout name="auth">
        <template v-if="!verify">
            <h2 class="font-bold tracking-tight text-gray-900">Get Started with <span
                    class="text-amber-400">Taskly</span></h2>
            <p class="mt-2 text-sm leading-6 text-gray-500">
                Create a free account or <NuxtLink to="/login"
                    class="font-semibold text-gray-900 cursor-pointer hover:text-amber-400 duration-200">log in</NuxtLink>.
            </p>
        </template>
        <template v-else>
            <h2 class="font-bold tracking-tight text-gray-900">Verify Your <span
                    class="text-amber-400">Taskly</span> Account Now</h2>
            <p class="mt-2 text-sm leading-6 text-gray-500">
                Thank you for registering with Taskly. Your account is almost ready. We've sent an email for account verification. Once verified, you can log in and boost your productivity with our extensive features.
            </p>
            <div class="flex justify-center">
                <NuxtLink to="/login"
                    class="rounded-md w-full text-center cursor-pointer bg-amber-400 px-3 py-2 mt-6 text-sm font-semibold drop-shadow-md text-white shadow-sm hover:bg-amber-400/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber-300">
                    LOGIN</NuxtLink>
            </div>
        </template>
        <form v-if="!verify" @submit.prevent="handleRegister" class="space-y-6 mt-10">
            <div class="relative">
                <div class="mt-3">
                    <label class="sr-only">First name</label>
                    <input v-model="form.first_name" type="text" required
                        class="relative block w-full rounded-md ring-1 ring-inset ring-gray-300 py-1.5 text-gray-900 text-center placeholder:text-gray-400 placeholder:px-3 sm:text-sm sm:leading-6"
                        placeholder="First name">
                </div>
                <div class="mt-3">
                    <label class="sr-only">Last name</label>
                    <input v-model="form.last_name" type="text" required
                        class="relative block w-full rounded-md ring-1 ring-inset ring-gray-300 py-1.5 text-gray-900 text-center placeholder:text-gray-400 placeholder:px-3 sm:text-sm sm:leading-6"
                        placeholder="Last name">
                </div>
                <div class="mt-3">
                    <label class="sr-only">Email</label>
                    <input v-model="form.email" type="email" required
                        class="relative block w-full rounded-md ring-1 ring-inset ring-gray-300 py-1.5 text-gray-900 text-center placeholder:text-gray-400 placeholder:px-3 sm:text-sm sm:leading-6"
                        placeholder="Email address">
                </div>
                <p v-if="form.email_error" class="text-sm text-center mt-1 text-red-500">{{ form.email_error }}</p>
                <div class="mt-3">
                    <label class="sr-only">Password</label>
                    <input v-model="form.password" type="password" required
                        class="relative block w-full rounded-md ring-1 ring-inset ring-gray-300 py-1.5 text-gray-900 text-center placeholder:text-gray-400 placeholder:px-3 sm:text-sm sm:leading-6"
                        placeholder="Password">
                </div>
                <p v-if="form.password_error" class="text-sm text-center mt-1 text-red-500">{{ form.password_error }}</p>

                <div class="mt-3">
                    <label class="sr-only">Confirm Password</label>
                    <input v-model="form.password_confirmation" type="password" required
                        class="relative block w-full rounded-md ring-1 ring-inset ring-gray-300 py-1.5 text-gray-900 text-center placeholder:text-gray-400 placeholder:px-3 sm:text-sm sm:leading-6"
                        placeholder="Confirm Password">
                </div>
                <p v-if="form.password_confirmation_error" class="text-sm text-center mt-1 text-red-500">{{
                    form.password_confirmation_error
                }}</p>

            </div>
            <p class="mt-2 text-xs leading-5 text-gray-500">This site is protected by reCAPTCHA and the Google <a
                    class="font-semibold text-gray-900 cursor-pointer hover:text-amber-400 duration-200"
                    href="https://policies.google.com/privacy" target="_blank">Privacy Policy</a> and <a
                    class="font-semibold text-gray-900 cursor-pointer hover:text-amber-400 duration-200"
                    href="https://policies.google.com/privacy" target="_blank">Terms of Service</a> apply.</p>
            <div class="flex justify-center">
                <button type="submit"
                    class="rounded-md w-full bg-amber-400 px-3 py-2 text-sm font-semibold drop-shadow-md text-white shadow-sm hover:bg-amber-400/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber-300">SIGN
                    UP</button>
            </div>
        </form>
    </NuxtLayout>
</template>

<script lang="ts" setup>
import { useAuthStore } from '@/stores/useAuthStore'


// ============== COMPILER MACRO ===============

definePageMeta({
    middleware: 'auth',
    layout: false
})

// ========== STATES & CONFIGURATIONS ==========

const authStore = useAuthStore()

const verify = ref(false)

const form = ref({
    first_name: '',
    last_name: '',
    email: '',
    password: '',
    password_confirmation: '',
    email_error: '',
    password_error: '',
    password_confirmation_error: ''
})


// ================== METHODS ==================

const handleRegister = async () => {
    form.value.email_error = ''
    form.value.password_error = ''
    form.value.password_confirmation_error = ''

    const { error } = await authStore.register(form.value)

    if (!error.value) {
        verify.value = true
    } else {
        form.value.email_error = error.value.data?.errors?.email ? error.value.data.errors.email.join(' ') : ''
        form.value.password_confirmation_error = error.value.data?.errors?.password?.includes('The password field confirmation does not match.') ? 'The password field confirmation does not match.' : ''
        form.value.password_error = error.value.data?.errors?.password?.includes('The password field must be at least 8 characters.') ? 'The password field must be at least 8 characters.' : ''
    }
}
</script>