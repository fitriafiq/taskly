<template>
    <li>
        <div class="flex items-center font-semibold justify-between mb-2">
            <div class="text-xs leading-6 text-gray-400">Collections</div>
            <button @touchend="extraStore.openAddCollection(folderStore.getInbox(), 'Inbox')"
                @click="extraStore.openAddCollection(folderStore.getInbox(), 'Inbox')"
                class="border border-gray-300 dark:border-zinc-500 p-1 h-7 w-7 flex items-center justify-center bg-white dark:bg-zinc-700 text-gray-900 dark:text-gray-50 rounded-md cursor-pointer duration-200">
                <Icon name="mdi:plus" />
            </button>
        </div>
        <NestedDraggable class="-mx-2" :tasks="mergerStore.mergedData" />
    </li>
</template>

<script setup lang="ts">
import { useFolderStore } from '@/stores/useFolderStore'
import { useMergerStore } from '@/stores/useMergerStore'
import { useExtraStore } from '@/stores/useExtraStore'


// ========== STATES & CONFIGURATIONS ==========

const extraStore = useExtraStore()
const folderStore = useFolderStore()
const mergerStore = useMergerStore()

const modalCollection = ref(false)


// ================= WATCHERS ==================

watch(() => extraStore.addCollection, () => {
    modalCollection.value = true
    extraStore.closeAddCollection()
})


// ============== LIFECYCLE HOOKS ==============

onMounted(async () => {
    await mergerStore.mergeFolderCollection()
})
</script>
