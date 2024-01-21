<template>
    <!-- TODO -->

    <div class="mt-7 mb-4 font-semibold relative z-[1] flex justify-between items-center">
        <h6 @click="toggleTodo()"
            class="w-fit cursor-pointer border border-gray-300 dark:border-zinc-500 rounded-md hover:bg-gray-50 text-gray-900 dark:text-gray-50 bg-white dark:bg-zinc-700 px-2 py-0.5 after:-z-10 after:content-[''] after:absolute after:w-full after:left-0 after:top-1/2 after:h-[1px] after:bg-gray-300 dark:after:bg-zinc-500">
            To-do</h6>
        <span
            class="text-xs border border-gray-300 dark:border-zinc-500 rounded-md text-gray-900 dark:text-gray-50 bg-white dark:bg-zinc-700 px-2 py-0.5">{{
                totalTodo ? totalTodo : 0 }}</span>
    </div>
    <draggable tag="ul" v-bind="dragOptions" class="flex flex-1 flex-col" @end="taskStore.reorderTask(filteredTasks)"
        :list="filteredTasks" group="todo" itemKey="id" v-if="todoAccordion">
        <template #item="{ element }">
            <li @click="[taskStore.setInfo(element), settingStore.openEditor()]"
                @touchstart="handleTouchStart($event, 'T' + element.id)" @touchmove="isDragging = true"
                @touchend="handleTouchEnd(element)" v-if="element.status === 0"
                :style="`background: linear-gradient(to right, ${element.color + '1a'}, transparent 90%);border-left-color: ${element.color}`"
                class="border-b border-l-4 cursor-pointer border-b-gray-300 dark:border-b-zinc-700">
                <div
                    class="text-gray-900 dark:text-gray-50 group overflow-hidden hover:bg-gray-50 dark:hover:bg-zinc-700 flex ps-4 pe-2 py-2 text-sm leading-6 font-medium">
                    <div class="flex items-center">
                        <input
                            class="me-3 basis-[18px] text-gray-900 dark:text-gray-50 bg-white dark:bg-zinc-900 border-2 border-gray-300 dark:border-zinc-300"
                            type="checkbox" @touchend.stop="updateTask(element)" @change="updateTask(element)" :checked="element.status" true-value="1"
                            false-value="0">
                    </div>
                    <div class="flex w-full items-center justify-between overflow-hidden">
                        <div class="whitespace-nowrap overflow-hidden text-ellipsis pe-3">
                            {{ element.name }}
                            <div v-if="taskStore.collection.id === 0" class="flex items-center gap-x-1 opacity-40">
                                <div class="flex items-center">
                                    <Icon name="ph:note" />
                                </div>
                                <span class="text-xs whitespace-nowrap overflow-hidden text-ellipsis">{{
                                    collectionStore.getCollection(element.collection_id)?.name
                                }}</span>
                            </div>
                        </div>
                        <div class="flex items-center w-1/3 justify-end">
                            <span v-if="element.due_date !== null" class="opacity-40 text-xs">{{
                                new Date(element.due_date).getFullYear() === new Date().getFullYear()
                                ? new Date(element.due_date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
                                : new Date(element.due_date).toLocaleDateString('en-US', {
                                    year: 'numeric', month: 'short', day:
                                        'numeric'
                                })
                            }}</span>
                            <Icon @click.stop="handleIconClick($event, 'T' + element.id)"
                                :class="`toggleExtra-T${element.id}`"
                                class="text-gray-400 opacity-0 lg:group-hover:opacity-100 hover:text-gray-900 dark:hover:text-gray-50"
                                name="ph:dots-three-vertical" size="20" />
                        </div>
                    </div>
                </div>
                <Teleport to="body">
                    <ExtraSidebar :task="element" :toggleExtra="extraStore.toggleExtra.get('T' + element.id)"
                        :mousePosition="mousePosition" @closeExtra="extraStore.toggleExtra.clear()" />
                </Teleport>
            </li>
        </template>
    </draggable>

    <!-- COMPLETED -->

    <div v-if="authStore.user?.setting_completed === 1 || (authStore.user?.setting_completed === 2 && taskStore.totalCompleted !== 0)"
        class="mt-7 mb-4 font-semibold relative z-[1] flex justify-between items-center">
        <h6 @click="toggleCompleted()"
            class="w-fit cursor-pointer border border-gray-300 dark:border-zinc-500 rounded-md hover:bg-gray-50 text-gray-900 dark:text-gray-50 bg-white dark:bg-zinc-700 px-2 py-0.5 after:-z-10 after:content-[''] after:absolute after:w-full after:left-0 after:top-1/2 after:h-[1px] after:bg-gray-300 dark:after:bg-zinc-500">
            Completed</h6>
        <span
            class="text-xs border border-gray-300 dark:border-zinc-500 rounded-md text-gray-900 dark:text-gray-50 bg-white dark:bg-zinc-700 px-2 py-0.5">{{
                totalCompleted ? totalCompleted : 0 }}</span>
    </div>
    <draggable
        v-if="authStore.user?.setting_completed === 1 || (authStore.user?.setting_completed === 2 && taskStore.totalCompleted !== 0)"
        tag="ul" v-bind="dragOptions" :class="{ 'hidden': !completedAccordion }" class="flex flex-1 flex-col"
        @end="taskStore.reorderTask(filteredTasks!)" :list="filteredTasks ?? []" group="completed" itemKey="id">
        <template #item="{ element }">
            <li @click="[taskStore.setInfo(element), settingStore.openEditor()]"
                @touchstart="handleTouchStart($event, 'T' + element.id)" @touchmove="isDragging = true"
                @touchend="handleTouchEnd(element)" v-if="element.status === 1"
                :style="`background: linear-gradient(to right, ${element.color + '1a'}, transparent 90%);border-left-color: ${element.color}`"
                class="border-b border-l-4 cursor-pointer border-b-gray-300 dark:border-b-zinc-700">
                <div
                    class="text-gray-900 dark:text-gray-50 group overflow-hidden hover:bg-gray-50 dark:hover:bg-zinc-700 flex ps-4 pe-2 py-2 text-sm leading-6 font-medium">
                    <div class="flex items-center">
                        <input
                            class="me-3 basis-[18px] text-gray-900 dark:text-gray-50 bg-white dark:bg-zinc-900 border-2 border-gray-300 dark:border-zinc-300 dark:checked:bg-zinc-900"
                            type="checkbox" @touchend.stop="updateTask(element)" @change="updateTask(element)" :checked="element.status" true-value="1"
                            false-value="0">
                    </div>
                    <div class="flex w-full items-center justify-between overflow-hidden">
                        <div class="whitespace-nowrap overflow-hidden text-ellipsis pe-3">
                            {{ element.name }}
                            <div v-if="taskStore.collection.id === 0" class="flex items-center gap-x-1 opacity-40">
                                <div class="flex items-center">
                                    <Icon name="ph:note" />
                                </div>
                                <span class="text-xs whitespace-nowrap overflow-hidden text-ellipsis">{{
                                    collectionStore.getCollection(element.collection_id)?.name
                                }}</span>
                            </div>
                        </div>
                        <div class="flex items-center w-1/3 justify-end">
                            <span v-if="element.due_date !== null" class="opacity-40 text-xs">{{
                                new Date(element.due_date).getFullYear() === new Date().getFullYear()
                                ? new Date(element.due_date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
                                : new Date(element.due_date).toLocaleDateString('en-US', {
                                    year: 'numeric', month: 'short', day:
                                        'numeric'
                                })
                            }}</span>
                            <Icon @click.stop="handleIconClick($event, 'T' + element.id)" :class="`toggleExtra-T${element.id}`"
                                class="text-gray-400 opacity-0 lg:group-hover:opacity-100 hover:text-gray-900 dark:hover:text-gray-50"
                                name="ph:dots-three-vertical" size="20" />
                        </div>
                    </div>
                </div>
                <Teleport to="body">
                    <ExtraSidebar :task="element" :toggleExtra="extraStore.toggleExtra.get('T' + element.id)" :mousePosition="mousePosition"
                        @closeExtra="extraStore.toggleExtra.clear()" />
                </Teleport>
            </li>
        </template>
    </draggable>
    <div v-if="pendingTasks" class="h-screen w-full px-1 sm:px-3 lg:px-5 absolute top-0 left-0 ">
        <div class="h-full w-full bg-gray-100/30 rounded-md flex items-center justify-center">
            <Icon name="eos-icons:loading" size="30" />
        </div>
    </div>
</template>

<script setup lang="ts">
import draggable from "vuedraggable"
import { useTaskStore } from '@/stores/useTaskStore'
import { useCollectionStore } from '@/stores/useCollectionStore'
import { useNotificationStore } from '@/stores/useNotificationStore'
import { useAuthStore } from '@/stores/useAuthStore'
import { useSettingStore } from '@/stores/useSettingStore'
import { useExtraStore } from '@/stores/useExtraStore'


// ========== STATES & CONFIGURATIONS ==========

const authStore = useAuthStore()
const taskStore = useTaskStore()
const notificationStore = useNotificationStore()
const collectionStore = useCollectionStore()
const settingStore = useSettingStore()
const extraStore = useExtraStore()

const filteredTasks = ref()
const pendingTasks = ref(false)
const todoAccordion = ref(true)
const completedAccordion = ref(true)
const mousePosition = ref({ x: 0, y: 0 })
const isDragging = ref(false)
let touchStartTimer
const longTouch = ref(false)

const dragOptions = {
    animation: 200,
    group: "description",
    disabled: false,
    ghostClass: "ghost"
}

const totalTodo = computed(() => filteredTasks.value?.filter((task: any) => task.status === 0).length)
const totalCompleted = computed(() => filteredTasks.value?.filter((task: any) => task.status === 1).length)


// ================= WATCHERS ==================

watch(() => taskStore.currentTab, (newTab) => {
    if (newTab === 'all') {
        filteredTasks.value = taskStore.tasks
    } else if (newTab === 'today' || newTab === 'upcoming') {
        filteredTasks.value = taskStore.dateTasks(newTab)
    }
})

watch(taskStore.folder, () => {
    filteredTasks.value = taskStore.getTasks()
})

watch(taskStore.collection, () => {
    filteredTasks.value = taskStore.getTasks()
})

watch(() => taskStore.tasks, () => {
    if (taskStore.currentTab === 'all') {
        filteredTasks.value = taskStore.tasks
    } else if (taskStore.currentTab === 'today' || taskStore.currentTab === 'upcoming') {
        filteredTasks.value = taskStore.dateTasks(taskStore.currentTab)
    } else {
        filteredTasks.value = taskStore.getTasks()
    }
})


// ================== METHODS ==================

const handleTouchStart = (evt: TouchEvent, id: string) => {
    isDragging.value = false
    longTouch.value = false
    touchStartTimer = setTimeout(() => {
        longTouch.value = true
        extraStore.setToggleExtra(id)
        mousePosition.value = { x: evt.touches[0].clientX + 35, y: evt.touches[0].clientY }
    }, 500)
}

const handleTouchEnd = (element) => {
    clearTimeout(touchStartTimer)
    if (!isDragging.value && !longTouch.value) {
        extraStore.clearToggleExtra()
        taskStore.setInfo(element)
        settingStore.openEditor()
    }
}

const fetchTasks = async () => {
    const { data, pending } = await taskStore.fetchTasks()

    if (pending.value && pendingTasks.value) {
        pendingTasks.value = pending.value
    }

    if (data.value) {
        filteredTasks.value = data.value
    }
}

const toggleTodo = () => {
    todoAccordion.value = !todoAccordion.value
}

const toggleCompleted = () => {
    completedAccordion.value = !completedAccordion.value
}

const handleIconClick = (evt: MouseEvent, id: string) => {
    if (!isDragging.value) {
        extraStore.setToggleExtra(id)
        mousePosition.value = { x: evt.clientX + 35, y: evt.clientY }
    }
}

const updateTask = async (task: any) => {
    clearTimeout(touchStartTimer)
    extraStore.clearToggleExtra()
    task.status = task.status === 1 ? 0 : 1
    const { data, error } = await taskStore.updateTask(task)

    if (data.value) {
        const notification = ref({
            title: task.status === 0 ? 'Task Undo' : 'Task Completed',
            description: task.status === 0 ? `${taskStore.getTask(task.id)?.name} has been unchecked.` : `${taskStore.getTask(task.id)?.name} has been completed.`
        })

        notificationStore.setNotification(notification.value)

        if (taskStore.info.id === task.id) {
            taskStore.info.status = task.status
        }
    } else if (error) {
        console.error('Error updating task:', error)
    }
}


// ============== LIFECYCLE HOOKS ==============

onMounted(async () => {
    await fetchTasks()
})

onBeforeMount(async () => {
    await fetchTasks()
})
</script>