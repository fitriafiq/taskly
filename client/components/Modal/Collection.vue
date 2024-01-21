<template>
    <div @click.capture="dropdownFolder = false" class="relative z-50">
        <div class="fixed inset-0 bg-gray-500/75 dark:bg-zinc-700/75 transition-opacity"></div>
        <div class="fixed inset-0 z-10 overflow-y-auto flex min-h-full justify-center p-4 text-center items-center">
            <form @submit.prevent="!extraStore.editCollection ? addCollection() : updateCollection()"
                class="relative transform rounded-lg bg-white dark:bg-zinc-800 text-left shadow-xl transition-all sm:my-8 w-full sm:max-w-md px-4 pb-4 pt-5 sm:p-6 sm:pb-4 border border-gray-300 dark:border-zinc-700">
                <h2
                    class="text-base font-semibold leading-7 text-gray-900 dark:text-gray-50 border-b border-gray-900/10 dark:border-zinc-700 pb-6">
                    {{
                        !extraStore.editCollection ? 'Add New Collection' : 'Edit ' + extraStore.editCollectionName }}</h2>
                <div
                    class="border-b border-gray-900/10 dark:border-zinc-700 py-6 grid grid-cols-1 gap-x-6 gap-y-3 sm:grid-cols-6">
                    <div class="col-span-full">
                        <input v-model="collection.name" type="text" placeholder="Name" required
                            class="block w-full rounded-md border-0 px-3 py-1.5 bg-white dark:bg-zinc-700/40 dark:focus:bg-zinc-800 text-gray-900 dark:text-gray-50 shadow-sm ring-1 ring-inset ring-gray-300 dark:ring-zinc-500 focus:outline focus:outline-1 outline-amber-400 placeholder:text-gray-400 sm:text-sm sm:leading-6">
                    </div>
                    <div class="sm:col-span-full flex mt-4">
                        <label
                            class="basis-1/4 flex items-center text-sm font-medium leading-6 text-gray-900 dark:text-gray-50">Color</label>
                        <input v-model="collection.color" class="color-picker basis-12 border-0" type="color">
                    </div>
                    <div class="sm:col-span-full flex">
                        <label
                            class="w-1/4 flex items-center text-sm font-medium leading-6 text-gray-900 dark:text-gray-50">Folder</label>
                        <div class="w-3/4 flex relative text-start rounded-md shadow-sm">
                            <input type="button" v-model="collectionFolderText"
                                @click.prevent="dropdownFolder = !dropdownFolder"
                                class="relative w-full whitespace-nowrap focus:outline focus:outline-1 outline-amber-400 overflow-hidden text-ellipsis items-center text-start rounded-l-md bg-white dark:bg-zinc-700/40 dark:focus:bg-zinc-800 px-3 py-1 text-sm text-gray-900 dark:text-gray-50 ring-1 ring-inset ring-gray-300 dark:ring-zinc-500 focus:z-10 cursor-pointer">
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
                                    class="absolute divide-y divide-gray-100 dark:divide-zinc-700 right-0 z-10 mt-9 w-full origin-top-right rounded-md bg-white dark:bg-zinc-800 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none border border-gray-300 dark:border-zinc-700">
                                    <ul>
                                        <li v-for="(item, index) in folderStore.folders"
                                            @click="folderSelect(item.id, item.name)"
                                            :class="index === 0 ? 'rounded-t-md' : ''"
                                            class="text-gray-900 dark:text-gray-50 overflow-hidden hover:bg-gray-50 dark:hover:bg-zinc-700 px-3 py-2 text-sm cursor-pointer flex items-center justify-between">
                                            <span class="whitespace-nowrap overflow-hidden text-ellipsis pe-3">{{ item.name
                                            }}</span>
                                            <div class="flex items-center">
                                                <Icon name="mdi:check" class="text-amber-400"
                                                    v-if="item.id === collection.folder_id" />
                                            </div>
                                        </li>
                                    </ul>
                                    <div @click="modalStore.toggleModalFolder"
                                        class="text-gray-900 dark:text-gray-50 hover:bg-gray-50 dark:hover:bg-zinc-700 rounded-b-md px-3 py-2 text-sm cursor-pointer">
                                        <Icon name="mdi:plus" size="15" class="me-2" />New Folder
                                    </div>
                                </div>
                            </Transition>
                        </div>
                    </div>
                </div>
                <div class="mt-6 flex items-center justify-end gap-x-6">
                    <button
                        @click.prevent="!extraStore.editCollection ? modalStore.toggleModalCollection() : extraStore.closeEditCollection()"
                        class="text-sm font-semibold text-gray-900 dark:text-gray-50">Cancel</button>
                    <button type="submit"
                        class="rounded-md bg-amber-400 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-amber-400/80">Save</button>
                </div>
            </form>
        </div>
    </div>
</template>

<script setup lang="ts">
import { useCollectionStore } from '@/stores/useCollectionStore'
import { useFolderStore } from '@/stores/useFolderStore'
import { useExtraStore } from '@/stores/useExtraStore'
import { useModalStore } from '@/stores/useModalStore'
import { useNotificationStore } from '@/stores/useNotificationStore'


// ========== STATES & CONFIGURATIONS ==========

const modalStore = useModalStore()
const notificationStore = useNotificationStore()
const collectionStore = useCollectionStore()
const folderStore = useFolderStore()
const extraStore = useExtraStore()

const dropdownFolder = ref(false)
const collectionFolderText = ref(extraStore.addCollectionName)

const collection = ref({
    name: '',
    color: '#dedede',
    folder_id: folderStore.getInbox(),
})


// ================= WATCHERS ==================

watch(() => folderStore.folders, () => {
    collection.value.folder_id = folderStore.getInbox()
})

watch(() => extraStore.addCollectionName, () => {
    collectionFolderText.value = extraStore.addCollectionName
    collection.value.folder_id = extraStore.addCollectionID
})

watch(() => extraStore.editCollection, () => {
    if (extraStore.editCollection) {
        collection.value.name = extraStore.editCollectionName
        collection.value.color = extraStore.editCollectionColor
        collection.value.folder_id = extraStore.editCollectionFolderID
        collectionFolderText.value = folderStore.getFolder(extraStore.editCollectionFolderID)!.name
    }
})


// ================== METHODS ==================

const folderSelect = (val: number, title: string) => {
    collection.value.folder_id = val
    collectionFolderText.value = title
    dropdownFolder.value = false
}

const addCollection = async () => {
    const { data, error } = await collectionStore.addCollection(collection.value)

    if (data.value) {
        const notification = ref({
            title: 'New Collection Added',
            description: `${collection.value.name} has been added to ${folderStore.getFolder(collection.value.folder_id)?.name}.`
        })

        notificationStore.setNotification(notification.value)
        collection.value.name = ''
        collection.value.color = '#dedede'
        collection.value.folder_id = folderStore.getInbox()
        collectionFolderText.value = 'Inbox'
        modalStore.toggleModalCollection()
    } else if (error) {
        console.error('Error creating collection:', error)
    }
}

const updateCollection = async () => {
    const { data, error } = await collectionStore.updateCollection(extraStore.editCollectionID, collection.value)

    if (data.value) {
        const notification = ref({
            title: 'Collection Edited',
            description: `${collection.value.name} has been edited.`
        })

        notificationStore.setNotification(notification.value)
        collection.value.name = ''
        collection.value.color = '#dedede'
        collection.value.folder_id = folderStore.getInbox()
        collectionFolderText.value = 'Inbox'
        extraStore.closeEditCollection()
    } else if (error) {
        console.error('Error editing folder:', error)
    }
}
</script>
