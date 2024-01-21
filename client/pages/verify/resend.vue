<template>
    <NuxtLayout name="auth">
        <template v-if="!resend">
            <h2 class="font-bold tracking-tight text-gray-900">Verify your <span
                    class="text-amber-400">Taskly</span> Account
            </h2>
            <p class="mt-2 text-sm leading-6 text-gray-500">
                If your email hasn't been verified yet, don't worry! You can easily request a new email verification. We'll
                promptly send you a fresh link so you can complete the verification
                process.
            </p>
            <form @submit.prevent="handleResend" class="space-y-6 mt-10">
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
                        class="rounded-md w-full bg-amber-400 px-3 py-2 text-sm font-semibold drop-shadow-md text-white shadow-sm hover:bg-amber-400/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber-300">
                        VERIFY EMAIL</button>
                </div>
            </form>
        </template>
        <template v-else>
            <h2 class="font-bold tracking-tight text-gray-900">New Email Verification Sent</h2>
            <p class="mt-2 text-sm leading-6 text-gray-500">
                You're just a step away from accessing your Taskly account! We've sent a fresh email verification link
                to your inbox. Please check your email and click the link to complete the verification process.
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

const authStore = useAuthStore()

const resend = ref(false)

const form = ref({
    email: '',
    error: ''
})


// ================== METHODS ==================

const handleResend = async () => {
    form.value.error = ''
    const { data, error } = await authStore.resendVerify(form.value.email)

    if (data.value) {
        form.value.email = ''
        resend.value = true
    } else if (error.value) {
        form.value.error = error.value.data?.errors?.email
    }
}
</script>