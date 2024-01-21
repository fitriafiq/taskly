<template>
    <NuxtLayout name="auth">
        <p class="text-amber-400 font-semibold">{{
            props.error.statusCode }}</p>
        <div class="my-5">
            <h1 class="mb-2 text-gray-500">
                Page not found
            </h1>
            <p>Sorry, we couldn't find the page you're looking for.</p>
        </div>
        <div class="flex justify-center">
            <NuxtLink to="/login"
                class="rounded-md w-full text-center cursor-pointer bg-amber-400 px-3 py-2 mt-6 text-sm font-semibold drop-shadow-md text-white shadow-sm hover:bg-amber-400/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber-300">
                BACK TO HOME</NuxtLink>
        </div>
    </NuxtLayout>
</template>

<script lang="ts" setup>
// ============== COMPILER MACRO ===============

definePageMeta({
    layout: false
})


// =============== PROPS & EMITS ===============

const props = defineProps(['error'])
</script>