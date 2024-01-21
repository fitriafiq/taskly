<template>
    <VitePwaManifest />
    <div class="flex h-full overflow-hidden bg-white">
        <section class="flex min-h-screen flex-1 ">
            <div class="relative hidden w-0 flex-1 lg:block">
                <img class="absolute inset-0 h-full w-full object-cover object-left" src="/img/bg.jpg" alt="" />
            </div>
            <div class="flex flex-1 flex-col justify-center px-8 py-12 lg:flex-none lg:px-20 xl:px-24">
                <div class="mx-auto w-full max-w-sm lg:w-96 text-center md:text-start ">
                    <NuxtLink to='/login'
                        class="flex justify-center lg:block relative lg:absolute mb-8 lg:mb-0 lg:top-8 lg:left-8 lg:translate-x-0">
                        <img src="/img/logo5.png" class="h-7 hidden lg:block" />
                        <img src="/img/logo6.png" class="h-9 block lg:hidden" />
                    </NuxtLink>
                    <slot />
                </div>
            </div>
        </section>
    </div>
</template>

<script lang="ts" setup>
useHead({
    meta: [
        { name: 'theme-color', content: '#fbbf24' }
    ],
})
</script>