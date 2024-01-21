<template>
    <NuxtLayout name="auth">
        <template v-if="!reset">
            <h2 class="font-bold tracking-tight text-gray-900">Create your New Password</h2>
            <p class="mt-2 text-sm leading-6 text-gray-500">
                You're just a few steps away from securing your Taskly account with a new password. Please enter your
                desired password below and confirm it.
            </p>
            <form @submit.prevent="handleResetPassword" class="space-y-6 mt-10">
                <div class="relative">
                    <div class="mt-3">
                        <label class="sr-only">Password</label>
                        <input v-model="form.password" type="password" required
                            class="relative block w-full rounded-md ring-1 ring-inset ring-gray-300 py-1.5 text-gray-900 text-center placeholder:text-gray-400 placeholder:px-3 sm:text-sm sm:leading-6"
                            placeholder="Password">
                    </div>
                    <p v-if="form.password_error" class="text-sm text-center mt-1 text-red-500">{{ form.password_error }}
                    </p>

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

                <div class="flex justify-center">
                    <button type="submit"
                        class="rounded-md w-full bg-amber-400 px-3 py-2 text-sm font-semibold drop-shadow-md text-white shadow-sm hover:bg-amber-400/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber-300">RESET</button>
                </div>
            </form>
        </template>
        <template v-else>
            <h2 class="font-bold tracking-tight text-gray-900">Password Changed Successfully</h2>
            <p class="mt-2 text-sm leading-6 text-gray-500">
                Great news! Your Taskly password has been changed successfully. You can now log in with your new password
                and continue your productive journey with Taskly.
            </p>
            <div class="flex justify-center">
                <NuxtLink to="/login"
                    class="rounded-md w-full text-center bg-amber-400 px-3 py-2 mt-6 text-sm font-semibold drop-shadow-md text-white shadow-sm hover:bg-amber-400/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber-300">
                    LOGIN</NuxtLink>
            </div>
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

const reset = ref(false)

const form = ref({
    password: '',
    password_confirmation: '',
    password_error: '',
    password_confirmation_error: ''
})


// ================== METHODS ==================

const handleResetPassword = async () => {
    form.value.password_error = ''
    form.value.password_confirmation_error = ''

    const { data, error } = await authStore.resetPassword({
        token: route.params.token as string,
        email: route.query.email as string,
        password: form.value.password,
        password_confirmation: form.value.password_confirmation
    })

    if (data.value) {
        form.value.password = ''
        form.value.password_confirmation = ''
        reset.value = true
    } else if (error.value) {
        form.value.password_confirmation_error = error.value.data?.errors?.password?.includes('The password field confirmation does not match.') ? 'The password field confirmation does not match.' : ''
        form.value.password_error = error.value.data?.errors?.password?.includes('The password field must be at least 8 characters.') ? 'The password field must be at least 8 characters.' : ''

        if (error.value.data?.errors?.email) {
            navigateTo('/password/forgot?expired=1')
        }
    }
}
</script>