<template>
    <div
        class="fixed w-screen lg:w-[calc(100vw-16rem)] lg:px-8 border-b dark:border-zinc-700 bg-[#fefeff] dark:bg-zinc-900 z-40">
        <div
            class="flex h-16 items-center gap-x-4 border-gray-200 dark:border-zinc-700 px-4 shadow-sm sm:gap-x-6 sm:px-6 lg:px-0 lg:shadow-none">
            <button v-if="!settingStore.sidebar" @click="settingStore.openSidebar()" type="button"
                class="-m-2.5 p-2.5 text-gray-700 lg:hidden">
                <span class="sr-only">Open sidebar</span>
                <Icon name="mdi:menu" size="25" class="text-gray-600 dark:text-gray-50" />
            </button>
            <button v-if="settingStore.sidebar" @click="settingStore.closeSidebar()" type="button"
                class="-m-2.5 p-2.5 text-gray-700 lg:hidden">
                <span class="sr-only">Open sidebar</span>
                <Icon name="mdi:close" size="25" class="text-gray-600 dark:text-gray-50" />
            </button>
            <div class="h-6 w-px bg-gray-200 dark:bg-zinc-700 lg:hidden" aria-hidden="true"></div>
            <div class="flex w-full lg:gap-x-6">
                <div class="relative flex w-3/4 items-center overflow-hidden">

                    <!-- =============== DESKTOP =============== -->

                    <h3
                        class="hidden lg:block text-gray-900 dark:text-gray-50 whitespace-nowrap overflow-hidden text-ellipsis">
                        {{ settingStore.settings ? 'Settings' : (taskStore.currentTab === 'other' ?
                            folderStore.getFolder(taskStore.folder.id)?.name :
                            taskStore.currentTab.charAt(0).toUpperCase() + taskStore.currentTab.slice(1)) }}
                        <Icon v-if="taskStore.currentTab === 'other' && !taskStore.folder.current" class="mx-1"
                            name="ph:play-fill" size="8" />
                        {{ !taskStore.folder.current ? collectionStore.getCollection(taskStore.collection.id)?.name : '' }}
                    </h3>

                    <!-- =========== MOBILE / TABLET =========== -->

                    <h3
                        class="block lg:hidden text-gray-900 dark:text-gray-50 whitespace-nowrap overflow-hidden text-ellipsis">
                        {{ settingStore.settings ? 'Settings' : (taskStore.currentTab === 'other' ?
                            (!taskStore.folder.current ? collectionStore.getCollection(taskStore.collection.id)?.name :
                                folderStore.getFolder(taskStore.folder.id)?.name) :
                            (taskStore.currentTab.charAt(0).toUpperCase() + taskStore.currentTab.slice(1))
                        ) }}
                    </h3>
                </div>
                <div class="flex w-1/4 justify-end items-center lg:gap-x-6">
                    <div class="hidden lg:block h-6 w-px bg-gray-200 dark:bg-zinc-700" aria-hidden="true"></div>
                    <div class="relative">
                        <button @click="dropdownSettings = !dropdownSettings"
                            class="dropdownSettings -m-1.5 flex items-center p-1.5">
                            <span class="sr-only">Open user menu</span>
                            <img class="h-8 w-8 flex-none rounded-full border border-gray-200 dark:border-zinc-700 object-cover"
                                :src="authStore.user?.avatar" alt="">
                            <span class="hidden lg:flex lg:items-center">
                                <span class="ml-4 text-sm font-semibold leading-6 text-gray-900 dark:text-gray-50"
                                    aria-hidden="true">{{
                                        authStore.user?.first_name + ' ' + authStore.user?.last_name }}</span>
                                <svg class="ml-2 h-5 w-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor"
                                    aria-hidden="true">
                                    <path fill-rule="evenodd"
                                        d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z"
                                        clip-rule="evenodd" />
                                </svg>
                            </span>
                        </button>
                        <Transition enter-active-class="transition ease-out duration-100"
                            enter-from-class="transform opacity-0 scale-95" enter-to-class="transform opacity-100 scale-100"
                            leave-active-class="transition ease-in duration-75"
                            leave-from-class="transform opacity-100 scale-100"
                            leave-to-class="transform opacity-0 scale-95">
                            <div v-if="dropdownSettings"
                                class="absolute divide-y divide-gray-100 right-0 mt-2 w-max origin-top-right rounded-md bg-white dark:bg-zinc-800 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none border border-gray-300 dark:border-zinc-700">
                                <ul>
                                    <li @click="settingStore.openSettings"
                                        class="flex items-center justify-between rounded-t-md hover:bg-gray-50 dark:hover:bg-zinc-700 px-3 py-2 text-sm cursor-pointer">
                                        <div class="flex items-center gap-x-2 overflow-hidden">
                                            <span class="text-gray-900 dark:text-gray-50 cursor-pointer">Settings</span>
                                        </div>
                                    </li>
                                    <li @click="handleLogout"
                                        class="flex items-center justify-between rounded-b-md hover:bg-gray-50 dark:hover:bg-zinc-700 px-3 py-2 text-sm cursor-pointer">
                                        <div class="flex items-center gap-x-2 overflow-hidden">
                                            <span class="text-gray-900 dark:text-gray-50 cursor-pointer">Log Out</span>
                                        </div>
                                    </li>
                                </ul>
                            </div>
                        </Transition>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { useAuthStore } from '@/stores/useAuthStore'
import { useTaskStore } from '@/stores/useTaskStore'
import { useCollectionStore } from '@/stores/useCollectionStore'
import { useFolderStore } from '@/stores/useFolderStore'
import { useSettingStore } from '@/stores/useSettingStore'


// ========== STATES & CONFIGURATIONS ==========

const authStore = useAuthStore()
const taskStore = useTaskStore()
const collectionStore = useCollectionStore()
const folderStore = useFolderStore()
const settingStore = useSettingStore()

const dropdownSettings = ref(false)


// ================== METHODS ==================

const handleLogout = async () => {
    await authStore.logout()
}

const closeDropdownOnClickOutside = (event: MouseEvent) => {
    if (dropdownSettings.value) {
        const target = event.target as HTMLElement
        if (!target.closest('.dropdownSettings')) {
            dropdownSettings.value = false
        }
    }
}


// ============== LIFECYCLE HOOKS ==============

onMounted(() => {
    window.addEventListener('click', closeDropdownOnClickOutside)
})

onBeforeMount(() => {
    window.addEventListener('click', closeDropdownOnClickOutside)
})
</script>