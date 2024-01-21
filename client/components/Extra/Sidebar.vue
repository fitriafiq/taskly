<template>
    <ul v-if="props.toggleExtra" @click="emits('closeExtra')"
        :style="`left:${props.mousePosition.x - 120}px;top:${props.mousePosition.y + 20}px`"
        class="absolute font-normal z-50 w-max rounded-md bg-white dark:bg-zinc-800 shadow-lg ring-1 ring-gray-900/5 focus:outline-none border border-gray-300 dark:border-zinc-700"
        ref="popupRef">
        <li v-if="props.collection?.type === 'F'"
            @touchend="extraStore.openAddCollection(props.collection?.id, props.collection?.name)"
            @click="extraStore.openAddCollection(props.collection?.id, props.collection?.name)"
            class="hover:bg-gray-50 dark:hover:bg-zinc-700 px-3 py-1 text-sm leading-6 text-gray-900 dark:text-gray-50 cursor-pointer">
            Add Collection</li>
        <li v-if="(folderStore.getInbox() !== props.collection?.id || props.collection?.type === 'C') && !props.task"
            @touchend="props.collection?.type === 'F' ? extraStore.openEditFolder(props.collection?.id, props.collection?.name) : extraStore.openEditCollection(props.collection?.id, props.collection?.name, props.collection?.color, props.collection?.order, props.collection?.folder_id)"
            @click="props.collection?.type === 'F' ? extraStore.openEditFolder(props.collection?.id, props.collection?.name) : extraStore.openEditCollection(props.collection?.id, props.collection?.name, props.collection?.color, props.collection?.order, props.collection?.folder_id)"
            class="hover:bg-gray-50 dark:hover:bg-zinc-700 px-3 py-1 text-sm leading-6 text-gray-900 dark:text-gray-50 cursor-pointer">
            Edit</li>
        <li v-if="props.collection?.type === 'C' || props.task"
            @touchend="props.task ? duplicateTask() : duplicateCollection()"
            @click="props.task ? duplicateTask() : duplicateCollection()"
            class="hover:bg-gray-50 dark:hover:bg-zinc-700 px-3 py-1 text-sm leading-6 text-gray-900 dark:text-gray-50 cursor-pointer">
            Duplicate</li>
        <li v-if="(folderStore.getInbox() !== props.collection?.id || props.collection?.type === 'C') && !props.task"
            @touchend="extraStore.openRemove(props.collection?.id, props.collection?.name, props.collection?.type)"
            @click="extraStore.openRemove(props.collection?.id, props.collection?.name, props.collection?.type)"
            class="hover:bg-gray-50 dark:hover:bg-zinc-700 px-3 py-1 text-sm leading-6 text-gray-900 dark:text-gray-50 cursor-pointer">
            {{ props.collection?.type
                ===
                'F' ? 'Ungroup' : 'Delete' }}</li>
        <li v-if="props.task" @touchend="extraStore.openRemove(props.task?.id, props.task?.name, 'T')" @click="extraStore.openRemove(props.task?.id, props.task?.name, 'T')"
            class="hover:bg-gray-50 dark:hover:bg-zinc-700 px-3 py-1 text-sm leading-6 text-gray-900 dark:text-gray-50 cursor-pointer">
            Delete</li>
    </ul>
</template>

<script setup lang="ts">
import { useExtraStore } from '@/stores/useExtraStore'
import { useFolderStore } from '@/stores/useFolderStore'
import { useCollectionStore } from '@/stores/useCollectionStore'
import { useTaskStore } from '@/stores/useTaskStore'
import { useNotificationStore } from '@/stores/useNotificationStore'


// ========== STATES & CONFIGURATIONS ==========

const notificationStore = useNotificationStore()
const extraStore = useExtraStore()
const folderStore = useFolderStore()
const collectionStore = useCollectionStore()
const taskStore = useTaskStore()

const popupRef = ref<HTMLElement | null>(null)


// =============== PROPS & EMITS ===============

const props = defineProps(['collection', 'task', 'toggleExtra', 'mousePosition'])
const emits = defineEmits(['closeExtra'])


// ================== METHODS ==================

const duplicateTask = async () => {
    const { data, error } = await taskStore.duplicateTask(props.task)

    if (data.value) {
        const notification = ref({
            title: 'Task Duplicated',
            description: `${props.task.name} has been duplicated.`
        })

        notificationStore.setNotification(notification.value)
    } else if (error) {
        console.error('Error duplicating task:', error)
    }
}

const duplicateCollection = async () => {
    const { data, error } = await collectionStore.duplicateCollection(props.collection)

    if (data.value) {
        const notification = ref({
            title: 'Collection Duplicated',
            description: `${props.collection.name} has been duplicated.`
        })

        notificationStore.setNotification(notification.value)
    } else if (error) {
        console.error('Error duplicating task:', error)
    }
}

const handleClickOutside = (evt: MouseEvent) => {
    if (popupRef.value && !popupRef.value.contains(evt.target as Node) && !(evt.target as Element).classList.contains(`toggleExtra-${props.collection?.type + props.collection?.id}`) && !(evt.target as Element).classList.contains(`toggleExtra-T${props.task?.id}`)) {
        if (props.toggleExtra) {
            emits('closeExtra')
        }
    }
}


// ============== LIFECYCLE HOOKS ==============

onMounted(() => {
    document.addEventListener('click', handleClickOutside);
})

onBeforeUnmount(() => {
    document.removeEventListener('click', handleClickOutside);
})
</script>
