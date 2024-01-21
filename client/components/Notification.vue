<template>
    <div aria-live="assertive"
        class="pointer-events-none fixed inset-0 flex px-4 py-6 items-start sm:p-6 z-50">
        <div class="flex w-full flex-col items-center">
            <Transition enter-active-class="transform ease-out duration-300 transition"
                enter-from-class="translate-y-[-100%] opacity-0" enter-to-class="translate-y-0 opacity-100"
                leave-active-class="transition ease-in duration-100" leave-from-class="opacity-100"
                leave-to-class="opacity-0">
                <div v-if="notificationStore.showNotification"
                    class="pointer-events-auto w-full max-w-sm overflow-hidden flex items-start p-3 rounded-lg bg-white dark:bg-zinc-800 shadow-lg ring-1 ring-black ring-opacity-5  border border-gray-300 dark:border-zinc-700">
                    <div class="flex-shrink-0 mt-0.5">
                        <img src="/img/logo6.png" alt="logo" class="w-5">
                    </div>
                    <div class="ml-3 w-0 flex-1">
                        <p class="text-sm font-medium my-auto text-gray-900 dark:text-gray-50">{{ notificationStore.notification.title }}</p>
                        <p class="mt-1 text-sm text-gray-600 dark:text-gray-300">{{ notificationStore.notification.description }}</p>
                    </div>
                    <div class="ml-4 flex flex-shrink-0">
                        <button type="button" @click="notificationStore.closeNotification"
                            class="inline-flex rounded-md text-gray-400 hover:text-gray-500">
                            <span class="sr-only">Close</span>
                            <Icon name="mdi:close" />
                        </button>
                    </div>
                </div>
            </Transition>
        </div>
    </div>
</template>

<script setup lang="ts">
import { useNotificationStore } from '@/stores/useNotificationStore'


// ========== STATES & CONFIGURATIONS ==========

const notificationStore = useNotificationStore()
</script>