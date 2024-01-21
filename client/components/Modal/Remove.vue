<template>
    <div class="relative z-50">
        <div class="fixed inset-0 bg-gray-500/75 dark:bg-zinc-700/75 bg-opacity-75 transition-opacity"></div>
        <div
            class="fixed inset-0 z-10 overflow-y-auto flex min-h-full justify-center p-4 text-center items-center">
            <form @submit.prevent="remove"
                class="relative transform rounded-lg bg-white dark:bg-zinc-800 text-left shadow-xl transition-all sm:my-8 w-full sm:max-w-md px-4 pb-4 pt-5 sm:p-6 sm:pb-4 border border-gray-300 dark:border-zinc-700">
                <h2 class="text-base font-semibold leading-7 text-gray-900 dark:text-gray-50 border-b border-gray-900/10 dark:border-zinc-700 pb-6">{{
                    extraStore.removeType === 'F' ? 'Ungroup ' + extraStore.removeName : 'Delete ' + extraStore.removeName
                }}
                </h2>
                <div class="border-b border-gray-900/10 dark:border-zinc-700 text-gray-900 dark:text-gray-50 py-6 grid grid-cols-1 gap-x-6 gap-y-3 sm:grid-cols-6">
                    <div class="col-span-full">
                        <p>{{ extraStore.removeType === 'F' ? `By ungrouping this folder, all collections inside will be
                            moved to the Inbox.` : (extraStore.removeType === 'C' ? `Deleting a collection cannot be undo.`
                            : `Deleting a task cannot be undo.`) }} </p>
                    </div>
                </div>

                <div class="mt-6 flex items-center justify-end gap-x-6">
                    <button @click.prevent="extraStore.closeRemove"
                        class="text-sm font-semibold text-gray-900 dark:text-gray-50">Cancel</button>
                    <button type="submit"
                        class="rounded-md bg-amber-400 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-amber-400/80">{{
                            extraStore.removeType === 'F' ? 'Ungroup' : 'Delete' }}</button>
                </div>
            </form>
        </div>
    </div>
</template>

<script setup lang="ts">
import { useFolderStore } from '@/stores/useFolderStore'
import { useCollectionStore } from '@/stores/useCollectionStore'
import { useTaskStore } from '@/stores/useTaskStore'
import { useExtraStore } from '@/stores/useExtraStore'
import { useNotificationStore } from '@/stores/useNotificationStore'


// ========== STATES & CONFIGURATIONS ==========

const extraStore = useExtraStore()
const notificationStore = useNotificationStore()
const folderStore = useFolderStore()
const collectionStore = useCollectionStore()
const taskStore = useTaskStore()


// ================== METHODS ==================

const remove = async () => {
    const removed = ref({
        name: extraStore.removeType === 'F' ? folderStore.getFolder(extraStore.removeID)?.name : collectionStore.getCollection(extraStore.removeID)?.name,
        action: extraStore.removeType === 'F' ? 'ungroup' : 'removed'
    })
    const { data, error } = extraStore.removeType === 'F' ? await folderStore.removeFolder(extraStore.removeID) : (extraStore.removeType === 'C' ? await collectionStore.removeCollection(extraStore.removeID) : await taskStore.removeTask(extraStore.removeID))

    if (data.value) {
        const notification = ref({
            title: `${extraStore.removeType === 'F' ? 'Folder' : 'Collection'} ${removed.value.action.charAt(0).toUpperCase() + removed.value.action.slice(1)}`,
            description: `${removed.value.name} has been ${removed.value.action}.`
        })

        notificationStore.setNotification(notification.value)
        extraStore.closeRemove()
    } else if (error) {
        console.error('Error removing item:', error)
    }
}
</script>