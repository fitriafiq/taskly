<template>
    <form @submit.prevent="addTask" class="relative my-3 rounded-md shadow-sm">
        <div class="relative mt-2 rounded-md shadow-sm">
            <div class="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3 z-10">
                <span class="text-gray-500 sm:text-sm">
                    <Icon name="mdi:plus" />
                </span>
            </div>
            <div class="flex relative">
                <input v-model="newTask" type="text"
                    :disabled="taskStore.currentTab !== 'other' || collectionStore.getCollections(taskStore.folder.id)?.length === 0"
                    :class="(taskStore.currentTab === 'other' && taskStore.collection.id === 0 && collectionStore.getCollections(taskStore.folder.id)?.length !== 0) ? 'rounded-s-md' : 'rounded-md'"
                    class="block w-full border-0 py-1.5 pl-8 pr-10 text-gray-900 dark:text-gray-50 disabled:bg-gray-50 dark:disabled:bg-zinc-700 bg-white dark:bg-zinc-700/40 dark:focus:bg-zinc-800 dark:disabled:opacity-60 focus:outline focus:outline-1 outline-amber-400 ring-1 ring-inset ring-gray-300 dark:ring-zinc-500 placeholder:text-gray-300 dark:placeholder:text-gray-400 sm:text-sm sm:leading-6"
                    :placeholder='taskStore.currentTab !== "other" ? "Go to a collection to add new tasks." : (collectionStore.getCollections(taskStore.folder.id)?.length === 0 ? "Create a new collection to add task." : `Add task to "${toCollection.name}" , press Enter to save.`)' />
                <div v-if="taskStore.currentTab === 'other' && taskStore.collection.id === 0 && collectionStore.getCollections(taskStore.folder.id)?.length !== 0"
                    class="inset-y-0 right-0 flex">
                    <button type="button" @click="dropdownTask = !dropdownTask"
                        class="dropdownTask items-center rounded-r-md bg-white dark:bg-zinc-700/40 dark:focus:bg-zinc-800 px-2 py-1 text-gray-400 ring-1 ring-inset ring-gray-300 dark:ring-zinc-500 hover:bg-gray-50 focus:z-10">
                        <Icon name="mdi:chevron-down" size="20" />
                    </button>
                    <Transition enter-active-class="transition ease-out duration-100"
                        enter-from-class="transform opacity-0 scale-95" enter-to-class="transform opacity-100 scale-100"
                        leave-active-class="transition ease-in duration-75"
                        leave-from-class="transform opacity-100 scale-100" leave-to-class="transform opacity-0 scale-95">
                        <div v-if="dropdownTask"
                            class="absolute divide-y divide-gray-100 right-0 z-10 mt-10 w-full origin-top-right rounded-md bg-white dark:bg-zinc-800 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none border border-gray-300 dark:border-zinc-700">
                            <ul>
                                <li v-for="(collection, index) in collectionStore.getCollections(taskStore.folder.id)"
                                    @click="setCollection(collection.id, collection.name)"
                                    :class="[index === 0 ? 'rounded-t-md' : '', index === (collectionStore.getCollections(taskStore.folder.id)!.length - 1) ? 'rounded-b-md' : '']"
                                    class="flex items-center justify-between text-gray-900 dark:text-gray-50 hover:bg-gray-50 dark:hover:bg-zinc-700 px-3 py-2 text-sm cursor-pointer">
                                    <div class="flex items-center gap-x-2 overflow-hidden">
                                        <div :style="{
                                            color: collection.color || 'inherit',
                                            backgroundColor: collection.color + '1a'
                                        }" class="flex rounded-full p-[3px]">
                                            <Icon name="ph:circle-fill" size="10" />
                                        </div>
                                        <span class="whitespace-nowrap overflow-hidden text-ellipsis pe-3">{{
                                            collection.name
                                        }}</span>
                                    </div>
                                    <Icon name="mdi:check" class="text-amber-400"
                                        v-if="collection.id === toCollection.id" />
                                </li>
                            </ul>
                        </div>
                    </Transition>
                </div>
            </div>
        </div>
    </form>
</template>

<script setup lang="ts">
import { useTaskStore } from '@/stores/useTaskStore'
import { useCollectionStore } from '@/stores/useCollectionStore'
import { useNotificationStore } from '@/stores/useNotificationStore'


// ========== STATES & CONFIGURATIONS ==========

const taskStore = useTaskStore()
const collectionStore = useCollectionStore()
const notificationStore = useNotificationStore()

const newTask = ref('')
const dropdownTask = ref(false)

const toCollection = ref({
    id: 0,
    name: ''
})


// ================= WATCHERS ==================

watchEffect(() => {
    if (taskStore.folder.current && taskStore.folder.id !== 0) {
        const collections = collectionStore.getCollections(taskStore.folder.id)
        if (collections && collections?.length > 0) {
            toCollection.value.id = collections[0].id
            toCollection.value.name = collections[0].name
        }
    }
})

watch(() => taskStore.collection.id, () => {
    toCollection.value.id = taskStore.collection.id
    toCollection.value.name = taskStore.collection.name
})


// ================== METHODS ==================

const setCollection = (id: number, name: string) => {
    dropdownTask.value = !dropdownTask.value
    toCollection.value.id = id
    toCollection.value.name = name
}

const addTask = async () => {
    const { data, error } = await taskStore.addTask(newTask.value, toCollection.value.id)

    if (data.value) {
        const notification = ref({
            title: 'New Task Added',
            description: `${newTask.value} has been added to ${toCollection.value.name}.`
        })

        notificationStore.setNotification(notification.value)
        newTask.value = ''
    } else if (error) {
        console.error('Error creating task:', error)
    }
}

const closeDropdownOnClickOutside = (event: MouseEvent) => {
    if (dropdownTask.value) {
        const target = event.target as HTMLElement
        if (!target.closest('.dropdownTask')) {
            dropdownTask.value = false
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