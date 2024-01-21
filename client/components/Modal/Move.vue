<template>
    <div @click.capture="dropdownFolder = false; dropdownCollection = false" class="relative z-50">
        <div class="fixed inset-0 bg-gray-500/75 dark:bg-zinc-700/75 transition-opacity"></div>
        <div
            class="fixed inset-0 z-10 overflow-y-auto flex min-h-full justify-center p-4 text-center items-center">
            <form @submit.prevent="moveTask"
                class="relative transform rounded-lg bg-white dark:bg-zinc-800 text-left shadow-xl transition-all sm:my-8 w-full sm:max-w-md px-4 pb-4 pt-5 sm:p-6 sm:pb-4 border border-gray-300 dark:border-zinc-700">
                <h2
                    class="text-base font-semibold leading-7 text-gray-900 dark:text-gray-50 border-b border-gray-900/10 dark:border-zinc-700 pb-6">
                    Move {{
                        taskStore.getTask(task)?.name }}</h2>
                <div
                    class="border-b border-gray-900/10 dark:border-zinc-700 py-6 grid grid-cols-1 gap-x-6 gap-y-3 sm:grid-cols-6">
                    <div class="sm:col-span-full flex">
                        <label
                            class="w-1/4 flex items-center text-sm font-medium leading-6 text-gray-900 dark:text-gray-50">Folder</label>
                        <div class="w-3/4 flex relative text-start rounded-md shadow-sm">
                            <input type="button" v-model="folderText" @click.prevent="dropdownFolder = !dropdownFolder"
                                class="relative whitespace-nowrap overflow-hidden text-ellipsis w-full items-center text-start rounded-l-md bg-white dark:bg-zinc-700/40 dark:focus:bg-zinc-800 px-3 py-1 text-sm text-gray-900 dark:text-gray-50 ring-1 ring-inset ring-gray-300 dark:ring-zinc-500 hover:bg-gray-50 focus:z-10 cursor-pointer focus:outline focus:outline-1 outline-amber-400">
                            <button @click.prevent="dropdownFolder = !dropdownFolder"
                                class="relative items-center rounded-r-md bg-white dark:bg-zinc-700/40 dark:focus:bg-zinc-800 px-2 py-1 text-gray-400 ring-1 ring-inset ring-gray-300 dark:ring-zinc-500 hover:bg-gray-50 focus:z-10">
                                <Icon name="mdi:chevron-down" size="20" />
                            </button>
                            <Transition enter-active-class="transition ease-out duration-100"
                                enter-from-class="transform opacity-0 scale-95"
                                enter-to-class="transform opacity-100 scale-100"
                                leave-active-class="transition ease-in duration-75"
                                leave-from-class="transform opacity-100 scale-100"
                                leave-to-class="transform opacity-0 scale-95">
                                <div v-if="dropdownFolder"
                                    class="absolute divide-y divide-gray-100 right-0 z-10 mt-9 w-full origin-top-right rounded-md bg-white dark:bg-zinc-800 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none border border-gray-300 dark:border-zinc-700">
                                    <ul>
                                        <li v-for="(item, index) in folders" @click="folderSelect(item.id, item.name)"
                                        :class="[index === 0 ? 'rounded-t-md' : '', index === (folders!.length - 1) ? 'rounded-b-md' : '']"
                                            class="text-gray-900 dark:text-gray-50 overflow-hidden hover:bg-gray-50 dark:hover:bg-zinc-700 px-3 py-2 text-sm cursor-pointer flex items-center justify-between">
                                            <span class="whitespace-nowrap overflow-hidden text-ellipsis pe-3">{{ item.name
                                            }}</span>
                                            <div class="flex items-center">
                                                <Icon name="mdi:check" class="text-amber-400" v-if="item.id === folder" />
                                            </div>
                                        </li>
                                    </ul>
                                </div>
                            </Transition>
                        </div>
                    </div>
                    <div class="sm:col-span-full flex">
                        <label
                            class="w-1/4 flex items-center text-sm font-medium leading-6 text-gray-900 dark:text-gray-50">Collection</label>
                        <div class="w-3/4 flex relative text-start rounded-md shadow-sm">
                            <input type="button" v-model="collectionText"
                                @click.prevent="dropdownCollection = !dropdownCollection"
                                class="relative whitespace-nowrap overflow-hidden text-ellipsis w-full items-center text-start rounded-l-md bg-white dark:bg-zinc-700/40 dark:focus:bg-zinc-800 px-3 py-1 text-sm text-gray-900 dark:text-gray-50 ring-1 ring-inset ring-gray-300 dark:ring-zinc-500 hover:bg-gray-50 focus:z-10 cursor-pointer focus:outline focus:outline-1 outline-amber-400">
                            <button @click.prevent="dropdownCollection = !dropdownCollection"
                                class="relative items-center rounded-r-md bg-white dark:bg-zinc-700/40 dark:focus:bg-zinc-800 px-2 py-1 text-gray-400 ring-1 ring-inset ring-gray-300 dark:ring-zinc-500 hover:bg-gray-50 focus:z-10">
                                <Icon name="mdi:chevron-down" size="20" />
                            </button>
                            <Transition enter-active-class="transition ease-out duration-100"
                                enter-from-class="transform opacity-0 scale-95"
                                enter-to-class="transform opacity-100 scale-100"
                                leave-active-class="transition ease-in duration-75"
                                leave-from-class="transform opacity-100 scale-100"
                                leave-to-class="transform opacity-0 scale-95">
                                <div v-if="dropdownCollection"
                                    class="absolute divide-y divide-gray-100 right-0 z-10 mt-9 w-full origin-top-right rounded-md bg-white dark:bg-zinc-800 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none border border-gray-300 dark:border-zinc-700">
                                    <ul>
                                        <li v-for="(item, index) in collectionStore.getCollections(folder)"
                                            @click="collectionSelect(item.id, item.name)"
                                            :class="[index === 0 ? 'rounded-t-md' : '', index === (collectionStore.getCollections(folder)!.length - 1) ? 'rounded-b-md' : '']"
                                            class="flex items-center justify-between text-gray-900 dark:text-gray-50 hover:bg-gray-50 dark:hover:bg-zinc-700 px-3 py-2 text-sm cursor-pointer">
                                            <div class="flex items-center gap-x-2 overflow-hidden">
                                                <div :style="{
                                                    color: item.color || 'inherit',
                                                    backgroundColor: item.color + '1a'
                                                }" class="flex rounded-full p-[3px]">
                                                    <Icon name="ph:circle-fill" size="10" />
                                                </div>
                                                <span class="whitespace-nowrap overflow-hidden text-ellipsis pe-3">{{
                                                    item.name
                                                }}</span>
                                            </div>
                                            <Icon name="mdi:check" class="text-amber-400" v-if="item.id === collection" />
                                        </li>
                                    </ul>
                                </div>
                            </Transition>
                        </div>
                    </div>
                </div>
                <div class="mt-6 flex items-center justify-end gap-x-6">
                    <button @click.prevent="modalStore.toggleModalMove"
                        class="text-sm font-semibold text-gray-900 dark:text-gray-50">Cancel</button>
                    <button type="submit"
                        class="rounded-md bg-amber-400 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-amber-400/80">Save</button>
                </div>
            </form>
        </div>
    </div>
</template>

<script setup lang="ts">
import { useTaskStore } from '@/stores/useTaskStore'
import { useCollectionStore } from '@/stores/useCollectionStore'
import { useFolderStore } from '@/stores/useFolderStore'
import { useExtraStore } from '@/stores/useExtraStore'
import { useModalStore } from '@/stores/useModalStore'
import { useNotificationStore } from '@/stores/useNotificationStore'

// ========== STATES & CONFIGURATIONS ==========

const modalStore = useModalStore()
const folderStore = useFolderStore()
const taskStore = useTaskStore()
const collectionStore = useCollectionStore()
const notificationStore = useNotificationStore()
const extraStore = useExtraStore()

const dropdownFolder = ref(false)
const dropdownCollection = ref(false)
const task = ref(0)
const collection = ref(0)
const folder = ref(0)
const collectionText = ref('')
const folderText = ref('')


// ================= WATCHERS ==================

watch(() => extraStore.moveTaskID, () => {
    task.value = extraStore.moveTaskID
    collection.value = extraStore.moveTaskCollectionID
    folder.value = extraStore.moveTaskFolderID
    collectionText.value = collectionStore.getCollection(collection.value)!.name
    folderText.value = folderStore.getFolder(folder.value)!.name
})


// ================== METHODS ==================

const folders = computed(() => {
    const allFolders = ref(folderStore.folders)
    const allCollections = ref(collectionStore.collections)
    const collectionFolderIds = new Set(allCollections.value?.map(collection => collection.folder_id))
    const filteredFolders = allFolders.value?.filter(folder => collectionFolderIds.has(folder.id))

    return filteredFolders
})

const folderSelect = (id: number, title: string) => {
    folder.value = id
    folderText.value = title
    dropdownFolder.value = false

    const allCollections = collectionStore.getCollections(folder.value)
    collection.value = allCollections ? allCollections[0].id : 0
    collectionText.value = allCollections ? allCollections[0].name : ''
}

const collectionSelect = (id: number, title: string) => {
    collection.value = id
    collectionText.value = title
    dropdownCollection.value = false
}

const moveTask = async () => {
    const { data, error } = await taskStore.moveTask(task.value, collection.value)

    if (data.value) {
        const notification = ref({
            title: 'Task Moved',
            description: `${taskStore.getTask(task.value)?.name} has been moved.`
        })

        notificationStore.setNotification(notification.value)
        modalStore.toggleModalMove()
    } else if (error) {
        console.error('Error moving task:', error)
    }
}
</script>