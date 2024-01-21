<template>
    <!-- =============== DESKTOP =============== -->

    <div class="lg:flex flex-col w-64 h-screen hidden overflow-x-hidden fixed">
        <div
            class="flex grow flex-col gap-y-5 border-r border-gray-200 dark:border-zinc-700 bg-gray-50/10 dark:bg-zinc-900 px-6 pb-4">
            <nav class="flex flex-1 flex-col pt-4">
                <ul role="list" class="flex flex-1 flex-col gap-y-7">
                    <li
                        v-if="authStore?.user?.setting_all !== 0 && authStore?.user?.setting_today !== 0 && authStore?.user?.setting_upcoming !== 0">
                        <ul role="list" class="-mx-2 space-y-1">
                            <li v-if="authStore?.user?.setting_all === 1 || (authStore?.user?.setting_all === 2 && allTasks !== 0)"
                                @touchend="taskStore.changeTab('all')" @click="taskStore.changeTab('all')"
                                :class="taskStore.currentTab === 'all' ? 'bg-gray-100 dark:bg-zinc-700' : ''"
                                class="flex items-center justify-between rounded-md hover:bg-gray-100 dark:hover:bg-zinc-700 cursor-pointer">
                                <span
                                    class="flex gap-x-2 rounded-md p-2 text-sm leading-6 text-gray-900 dark:text-gray-50 font-semibold">
                                    <Icon name="ph:browsers" size="25" class="text-gray-400" />
                                    All
                                </span>
                                <span v-if="allTasks !== 0"
                                    class="font-semibold text-xs border border-gray-300 dark:border-zinc-500 rounded-md text-gray-900 dark:text-gray-50 bg-white dark:bg-zinc-700 px-2 py-0.5 me-2">{{
                                        allTasks
                                    }}</span>
                            </li>
                            <li v-if="authStore?.user?.setting_today === 1 || (authStore?.user?.setting_today === 2 && todayTasks !== 0)"
                                @touchend="taskStore.changeTab('today')" @click="taskStore.changeTab('today')"
                                :class="taskStore.currentTab === 'today' ? 'bg-gray-100 dark:bg-zinc-700' : ''"
                                class="flex items-center justify-between rounded-md hover:bg-gray-100 dark:hover:bg-zinc-700 cursor-pointer">
                                <span
                                    class="flex gap-x-2 rounded-md p-2 text-sm leading-6 text-gray-900 dark:text-gray-50 font-semibold">
                                    <Icon name="ph:calendar-blank" size="25" class="text-gray-400" />
                                    Today
                                </span>
                                <span v-if="todayTasks !== 0"
                                    class="font-semibold text-xs border border-gray-300 dark:border-zinc-500 rounded-md text-gray-900 dark:text-gray-50 bg-white dark:bg-zinc-700 px-2 py-0.5 me-2">{{
                                        todayTasks }}</span>
                            </li>
                            <li v-if="authStore?.user?.setting_upcoming === 1 || (authStore?.user?.setting_upcoming === 2 && upcomingTasks !== 0)"
                                @touchend="taskStore.changeTab('upcoming')" @click="taskStore.changeTab('upcoming')"
                                :class="taskStore.currentTab === 'upcoming' ? 'bg-gray-100 dark:bg-zinc-700' : ''"
                                class="flex items-center justify-between rounded-md hover:bg-gray-100 dark:hover:bg-zinc-700 cursor-pointer">
                                <span
                                    class="flex gap-x-2 rounded-md p-2 text-sm leading-6 text-gray-900 dark:text-gray-50 font-semibold">
                                    <Icon name="ph:calendar-plus" size="25" class="text-gray-400" />
                                    Upcoming
                                </span>
                                <span v-if="upcomingTasks !== 0"
                                    class="font-semibold text-xs border border-gray-300 dark:border-zinc-500 rounded-md text-gray-900 dark:text-gray-50 bg-white dark:bg-zinc-700 px-2 py-0.5 me-2">{{
                                        upcomingTasks }}</span>
                            </li>
                        </ul>
                    </li>
                    <Collections />
                </ul>
            </nav>
        </div>
    </div>

    <!-- =========== MOBILE / TABLET =========== -->

    <Transition enter-active-class="transition ease-in-out duration-300 transform" enter-from-class="-translate-x-full"
        enter-to-class="translate-x-0" leave-active-class="transition ease-in-out duration-300 transform"
        leave-from-class="translate-x-0" leave-to-class="-translate-x-full">
        <div v-if="settingStore.sidebar" class="flex-col w-full h-screen fixed z-30 mt-16 pt-0.5">
            <div class="flex h-full overflow-y-auto grow flex-col bg-[#fefeff] dark:bg-zinc-900 px-6 pb-4">
                <nav class="flex flex-1 flex-col pt-4">
                    <ul role="list" class="flex flex-1 flex-col gap-y-7">
                        <li
                            v-if="authStore?.user?.setting_all !== 0 && authStore?.user?.setting_today !== 0 && authStore?.user?.setting_upcoming !== 0">
                            <ul role="list" class="-mx-2 space-y-1">
                                <li v-if="authStore?.user?.setting_all === 1 || (authStore?.user?.setting_all === 2 && allTasks !== 0)"
                                    @click="[taskStore.changeTab('all'), settingStore.sidebar ? settingStore.closeSidebar() : '']"
                                    :class="taskStore.currentTab === 'all' ? 'bg-gray-100 dark:bg-zinc-700' : ''"
                                    class="flex items-center justify-between rounded-md hover:bg-gray-100 dark:hover:bg-zinc-700 cursor-pointer">
                                    <span
                                        class="flex gap-x-2 rounded-md p-2 text-sm leading-6 text-gray-900 dark:text-gray-50 font-semibold">
                                        <Icon name="ph:browsers" size="25" class="text-gray-400" />
                                        All
                                    </span>
                                    <span v-if="allTasks !== 0"
                                        class="font-semibold text-xs border border-gray-300 dark:border-zinc-500 rounded-md text-gray-900 dark:text-gray-50 bg-white dark:bg-zinc-700 px-2 py-0.5 me-2">{{
                                            allTasks
                                        }}</span>
                                </li>
                                <li v-if="authStore?.user?.setting_today === 1 || (authStore?.user?.setting_today === 2 && todayTasks !== 0)"
                                    @click="[taskStore.changeTab('today'), settingStore.sidebar ? settingStore.closeSidebar() : '']"
                                    :class="taskStore.currentTab === 'today' ? 'bg-gray-100 dark:bg-zinc-700' : ''"
                                    class="flex items-center justify-between rounded-md hover:bg-gray-100 dark:hover:bg-zinc-700 cursor-pointer">
                                    <span
                                        class="flex gap-x-2 rounded-md p-2 text-sm leading-6 text-gray-900 dark:text-gray-50 font-semibold">
                                        <Icon name="ph:calendar-blank" size="25" class="text-gray-400" />
                                        Today
                                    </span>
                                    <span v-if="todayTasks !== 0"
                                        class="font-semibold text-xs border border-gray-300 dark:border-zinc-500 rounded-md text-gray-900 dark:text-gray-50 bg-white dark:bg-zinc-700 px-2 py-0.5 me-2">{{
                                            todayTasks }}</span>
                                </li>
                                <li v-if="authStore?.user?.setting_upcoming === 1 || (authStore?.user?.setting_upcoming === 2 && upcomingTasks !== 0)"
                                    @click="[taskStore.changeTab('upcoming'), settingStore.sidebar ? settingStore.closeSidebar() : '']"
                                    :class="taskStore.currentTab === 'upcoming' ? 'bg-gray-100 dark:bg-zinc-700' : ''"
                                    class="flex items-center justify-between rounded-md hover:bg-gray-100 dark:hover:bg-zinc-700 cursor-pointer">
                                    <span
                                        class="flex gap-x-2 rounded-md p-2 text-sm leading-6 text-gray-900 dark:text-gray-50 font-semibold">
                                        <Icon name="ph:calendar-plus" size="25" class="text-gray-400" />
                                        Upcoming
                                    </span>
                                    <span v-if="upcomingTasks !== 0"
                                        class="font-semibold text-xs border border-gray-300 dark:border-zinc-500 rounded-md text-gray-900 dark:text-gray-50 bg-white dark:bg-zinc-700 px-2 py-0.5 me-2">{{
                                            upcomingTasks }}</span>
                                </li>
                            </ul>
                        </li>
                        <Collections />
                    </ul>
                </nav>
            </div>
        </div>
    </Transition>

    <Transition enter-active-class="transition ease-out duration-300" enter-from-class="opacity-0"
        enter-to-class="opacity-100" leave-active-class="transition ease-in duration-200" leave-from-class="opacity-100"
        leave-to-class="opacity-0">
        <ModalCollection v-show="modalStore.modalCollection" @closeModal="modalStore.toggleModalCollection" />
    </Transition>
    <Transition enter-active-class="transition ease-out duration-300" enter-from-class="opacity-0"
        enter-to-class="opacity-100" leave-active-class="transition ease-in duration-200" leave-from-class="opacity-100"
        leave-to-class="opacity-0">
        <ModalFolder v-show="modalStore.modalFolder" @closeModal="modalStore.toggleModalFolder" />
    </Transition>
    <Transition enter-active-class="transition ease-out duration-300" enter-from-class="opacity-0"
        enter-to-class="opacity-100" leave-active-class="transition ease-in duration-200" leave-from-class="opacity-100"
        leave-to-class="opacity-0">
        <ModalRemove v-show="modalStore.modalRemove" @closeModal="modalStore.toggleModalRemove" />
    </Transition>
    <Transition enter-active-class="transition ease-out duration-300" enter-from-class="opacity-0"
        enter-to-class="opacity-100" leave-active-class="transition ease-in duration-200" leave-from-class="opacity-100"
        leave-to-class="opacity-0">
        <ModalMove v-show="modalStore.modalMove" @closeModal="modalStore.toggleModalMove" />
    </Transition>
</template>

<script setup>
import { useModalStore } from '@/stores/useModalStore'
import { useTaskStore } from '@/stores/useTaskStore'
import { useAuthStore } from '@/stores/useAuthStore'
import { useSettingStore } from '@/stores/useSettingStore'
import { useFolderStore } from '@/stores/useFolderStore'


// ========== STATES & CONFIGURATIONS ==========

const modalStore = useModalStore()
const taskStore = useTaskStore()
const authStore = useAuthStore()
const settingStore = useSettingStore()
const folderStore = useFolderStore()

const allTasks = ref(0)
const todayTasks = ref(0)
const upcomingTasks = ref(0)


// ================= WATCHERS ==================

watch(() => taskStore.tasks, () => {
    getTotal()
})


// ================== METHODS ==================

const getTotal = () => {
    allTasks.value = taskStore.tasks?.filter(task => task.status === 0).length
    todayTasks.value = taskStore.dateTasks('today')?.filter(task => task.status === 0).length
    upcomingTasks.value = taskStore.dateTasks('upcoming')?.filter(task => task.status === 0).length
}


// ============== LIFECYCLE HOOKS ==============

onMounted(() => {
    taskStore.changeTab('all')
    getTotal()
})

onBeforeMount(async () => {
    await folderStore.fetchFolders()
})
</script>