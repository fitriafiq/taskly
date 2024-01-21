<template>
    <NuxtLayout name="auth">
        <template v-if="!reset">
            <h2 class="mt-8 text-2xl font-bold leading-9 tracking-tight text-gray-900">Reset your Password</h2>
            <p class="mt-2 text-sm leading-6 text-gray-500">
                Lost your password? No worries. Enter your email to reset it and regain access. If you remember your
                password,
                you
                can also <NuxtLink to="/login" class="font-semibold text-gray-900  hover:text-amber-400 duration-200">log in
                </NuxtLink> directly.
            </p>

            <form @submit.prevent="handleForgotPassword" class="space-y-6 mt-10">
                <div class="relative">
                    <div class="mt-3">
                        <label class="sr-only">Email</label>
                        <input v-model="form.email" type="email" required
                            class="relative block w-full rounded-md ring-1 ring-inset ring-gray-300 py-1.5 text-gray-900 text-center placeholder:text-gray-400 placeholder:px-3 sm:text-sm sm:leading-6"
                            placeholder="Email">
                    </div>
                    <p v-if="form.error" class="text-sm text-center mt-1 text-red-500">{{ form.error }}</p>
                </div>

                <div class="flex justify-center">
                    <button type="submit"
                        class="rounded-md w-full bg-amber-400 px-3 py-2 text-sm font-semibold drop-shadow-md text-white shadow-sm hover:bg-amber-400/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber-300">RESET
                        PASSWORD</button>
                </div>
            </form>
        </template>
        <template v-else>
            <h2 class="mt-8 text-2xl font-bold leading-9 tracking-tight text-gray-900">Password Reset Request Sent</h2>
            <p class="mt-2 text-sm leading-6 text-gray-500">
                We've received your request to reset your password. Please check your email for further instructions on how to reset your password.
            </p>
        </template>
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

const auth = useAuthStore()

const reset = ref(false)

const form = ref({
    email: '',
    error: ''
})


// ================== METHODS ==================

const handleForgotPassword = async () => {
    form.value.error = ''
    const { data, error } = await auth.forgotPassword(form.value.email)

    if (data.value) {
        reset.value = true
    } else if (error.value) {
        form.value.error = 'Email does not exist'
    }
}
</script>