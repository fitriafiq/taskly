<template>
    <NuxtLayout name="auth">
        <template v-if="!resend">
            <h2 class="font-bold tracking-tight text-gray-900">Email Verification Link Expired
            </h2>
            <p class="mt-2 text-sm leading-6 text-gray-500">
                Unfortunately, the verification link you used has expired. Simply click the button below and we'll send
                you
                a fresh link to get you started on
                your productive journey.
            </p>
            <form @submit.prevent="handleResend" class="flex justify-center">
                <button type="submit"
                    class="rounded-md w-full text-center cursor-pointer bg-amber-400 px-3 py-2 mt-6 text-sm font-semibold drop-shadow-md text-white shadow-sm hover:bg-amber-400/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber-300">
                    RESEND VERIFICATION EMAIL</button>
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
const route = useRoute()

const resend = ref(false)


// ================== METHODS ==================

const handleResend = async () => {
    const { data } = await authStore.resendVerify(route.query.id as string)

    if (data.value) {
        resend.value = true
    }
}
</script>