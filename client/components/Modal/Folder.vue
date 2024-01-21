<template>
    <div class="relative z-50">
        <div class="fixed inset-0 bg-gray-500/75 dark:bg-zinc-700/75 transition-opacity"></div>
        <div
            class="fixed inset-0 z-10 overflow-y-auto flex min-h-full justify-center p-4 text-center items-center">
            <form @submit.prevent="!extraStore.editFolder ? addFolder() : updateFolder()"
                class="relative transform rounded-lg bg-white dark:bg-zinc-800 text-left shadow-xl transition-all sm:my-8 w-full sm:max-w-md px-4 pb-4 pt-5 sm:p-6 sm:pb-4 border border-gray-300 dark:border-zinc-700">
                <h2 class="text-base font-semibold leading-7 text-gray-900 dark:text-gray-50 border-b border-gray-900/10 dark:border-zinc-700 pb-6">{{
                    !extraStore.editFolder ? 'Add New Folder' : 'Edit ' + extraStore.editFolderName }}</h2>
                <div class="border-b border-gray-900/10 dark:border-zinc-700 py-6 grid grid-cols-1 gap-x-6 gap-y-3 sm:grid-cols-6">
                    <div class="col-span-full">
                        <input v-model="folder.name" type="text" placeholder="Name" required
                            class="block w-full rounded-md border-0 px-3 py-1.5 bg-white dark:bg-zinc-700/40 dark:focus:bg-zinc-800 text-gray-900 dark:text-gray-50 shadow-sm ring-1 ring-inset ring-gray-300 dark:ring-zinc-500 placeholder:text-gray-400 focus:outline focus:outline-1 outline-amber-400 sm:text-sm sm:leading-6">
                    </div>
                </div>

                <div class="mt-6 flex items-center justify-end gap-x-6">
                    <button
                        @click.prevent="!extraStore.editFolder ? modalStore.toggleModalFolder() : extraStore.closeEditFolder()"
                        class="text-sm font-semibold text-gray-900 dark:text-gray-50">Cancel</button>
                    <button type="submit"
                        class="rounded-md bg-amber-400 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-amber-400/80">Save</button>
                </div>
            </form>
        </div>
    </div>
</template>

<script setup lang="ts">
import { useFolderStore } from '@/stores/useFolderStore'
import { useModalStore } from '@/stores/useModalStore'
import { useExtraStore } from '@/stores/useExtraStore'
import { useNotificationStore } from '@/stores/useNotificationStore'


// ========== STATES & CONFIGURATIONS ==========

const modalStore = useModalStore()
const extraStore = useExtraStore()
const notificationStore = useNotificationStore()
const folderStore = useFolderStore()

const folder = ref({
    name: '',
    order: 1
})


// ================= WATCHERS ==================

watch(() => extraStore.editFolder, () => {
    folder.value.name = extraStore.editFolder ? extraStore.editFolderName : ''
})


// ================== METHODS ==================

const addFolder = async () => {
    const { data, error } = await folderStore.addFolder(folder.value)

    if (data.value) {
        const notification = ref({
            title: 'New Folder Created',
            description: `${folder.value.name} has been created.`
        })

        notificationStore.setNotification(notification.value)
        folder.value.name = ''
        modalStore.toggleModalFolder()
    } else if (error) {
        console.error('Error creating folder:', error)
    }
}

const updateFolder = async () => {
    const { data, error } = await folderStore.updateFolder(extraStore.editFolderID, folder.value.name)

    if (data.value) {
        const notification = ref({
            title: 'Folder Edited',
            description: `${folder.value.name} has been edited.`
        })

        notificationStore.setNotification(notification.value)
        extraStore.closeEditFolder()
    } else if (error) {
        console.error('Error editing folder:', error)
    }
}
</script>
