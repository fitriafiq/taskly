<template>
    <NuxtLayout name="auth">
        <h2 class="font-bold tracking-tight text-gray-900">Your <span
                class="text-amber-400">Taskly</span> Account is Verified</h2>
        <p class="mt-2 text-sm leading-6 text-gray-500">
            Congratulations! We're thrilled to confirm that your Taskly account is now officially verified. You can now
            log
            in and start using Taskly to supercharge your productivity.
        </p>
        <div class="flex justify-center">
            <NuxtLink to="/login"
                class="rounded-md w-full text-center cursor-pointer bg-amber-400 px-3 py-2 mt-6 text-sm font-semibold drop-shadow-md text-white shadow-sm hover:bg-amber-400/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber-300">
                LOGIN</NuxtLink>
        </div>
    </NuxtLayout>
</template>

<script lang="ts" setup>
// ============== COMPILER MACRO ===============

definePageMeta({
    middleware: 'auth',
    layout: false
})
</script>