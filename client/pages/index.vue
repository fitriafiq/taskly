<template>
    <Settings v-show="settingStore.settings" />

    <div class="w-full h-full flex mt-16 " v-show="!settingStore.settings">
        <main class="w-full lg:w-[50%] overflow-auto pb-20">
            <div class="px-4 sm:px-6 lg:px-8 py-3 relative">
                <TaskAdd />
                <TaskList />
            </div>
        </main>

        <!-- =============== DESKTOP =============== -->

        <aside
            class="lg:block hidden w-[50%] h-[calc(100vh-65px)] border-l border-gray-200 dark:border-zinc-700 py-6 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
            <template v-if="taskStore.info.id !== 0">
                <div class="flex mb-4 border-b border-gray-200 dark:border-zinc-700 pb-3 items-center">
                    <div class="flex items-center w-full">
                        <div class="flex items-center">
                            <input
                                class="text-gray-900 dark:text-gray-50 bg-white dark:bg-zinc-900 border-2 border-gray-300 dark:border-zinc-300 dark:checked:bg-zinc-900"
                                v-model="task.status" @touchend="updateTask" @change="updateTask" type="checkbox"
                                true-value="1" false-value="0">
                        </div>
                        <div class="flex items-center flex-auto">
                            <div class="hidden lg:block lg:h-6 lg:w-px lg:bg-gray-200 dark:lg:bg-zinc-700 ms-4 me-2"
                                aria-hidden="true">
                            </div>
                            <VueDatePicker @update:model-value="updateTask" :dark="settingStore.themeSetting"
                                v-model="task.due_date" :format="formatDate" placeholder="Due Date"
                                input-class-name="hover:bg-gray-50 dark:hover:bg-zinc-700 rounded-md bg-white dark:bg-zinc-900">
                                <template #input-icon>
                                    <Icon name="mdi:calendar-clock-outline" size="20" class="text-gray-400" />
                                </template>
                            </VueDatePicker>
                            <div class="hidden lg:block lg:h-6 lg:w-px lg:bg-gray-200 dark:lg:bg-zinc-700 mx-2"
                                aria-hidden="true"></div>
                        </div>
                        <div @click="extraStore.openMoveTask(taskStore.info.id, taskStore.info.collection_id, taskStore.info.folder_id)"
                            class="hover:bg-gray-50 dark:hover:bg-zinc-700 text-gray-900 dark:text-gray-50 p-1.5 rounded-md cursor-pointer flex items-center justify-between w-max overflow-hidden">
                            <div class="flex items-center gap-x-2 overflow-hidden ">
                                <Icon name="mdi:folder-move-outline" size="25" class="text-gray-400" />
                                <!-- <div :style="{
                                    color: collectionStore.getCollection(task.collection_id).color || 'inherit',
                                    backgroundColor: collectionStore.getCollection(task.collection_id).color + '1a'
                                }" class="flex rounded-full p-[3px]">
                                    <Icon name="ph:circle-fill" size="10" />
                                </div> -->
                                <span class="whitespace-nowrap overflow-hidden text-ellipsis">{{
                                    collectionStore.getCollection(task.collection_id).name }}</span>
                            </div>
                        </div>
                    </div>
                </div>
                <div
                    class="content relative overflow-y-auto h-[calc(100vh-185px)] p-2 border-b border-gray-200 dark:border-zinc-700 pb-10">
                    <textarea rows="1" ref="taskName" v-model="task.name" @input="updateHeight" @blur="updateTask"
                        class="w-full font-semibold resize-none outline-none mb-4 bg-white dark:bg-zinc-900 text-gray-900 dark:text-gray-50"></textarea>
                    <editor-content :editor="editor" class="editor text-gray-900 dark:text-gray-50" />
                </div>

                <Editor :editor="editor" />
            </template>
            <div v-if="taskStore.info.id === 0" class="h-full pb-6 flex flex-col justify-center items-center">
                <Icon name="mdi:gesture-tap" size="80" class="text-gray-400/40 mb-3" />
                <p class="text-gray-900 dark:text-gray-50">Click task to view the details</p>
            </div>
        </aside>

        <!-- =========== MOBILE / TABLET =========== -->

        <Transition enter-active-class="transition ease-in-out duration-300 transform" enter-from-class="translate-x-full"
            enter-to-class="translate-x-0" leave-active-class="transition ease-in-out duration-300 transform"
            leave-from-class="translate-x-0" leave-to-class="translate-x-full">
            <aside v-if="settingStore.editor" :style="divStyle"
                class="block lg:hidden w-full border-x border-gray-200 dark:border-zinc-700 bg-[#fefeff] dark:bg-zinc-900 pt-3 pb-6 px-4 overflow-hidden h-full fixed top-0 z-40 mt-0.5">
                <template v-if="taskStore.info.id !== 0">
                    <div class="flex border-b border-gray-200 dark:border-zinc-700 pb-2 mb-2 items-center">
                        <div class="flex items-center">
                            <button @touchend="settingStore.closeEditor()" @click="settingStore.closeEditor()" type="button"
                                class="p-1 flex justify-center items-center">
                                <span class="sr-only">Close editor</span>
                                <Icon name="mdi:chevron-left" size="20" class="text-gray-600 dark:text-gray-50" />
                            </button>
                            <div class="block h-6 w-px bg-gray-200 dark:bg-zinc-700 ms-1 me-3" aria-hidden="true">
                            </div>
                            <input
                                class="text-gray-900 dark:text-gray-50 bg-white dark:bg-zinc-900 border-2 border-gray-300 dark:border-zinc-300 dark:checked:bg-zinc-900"
                                v-model="task.status" @change="updateTask" type="checkbox" true-value="1" false-value="0">
                        </div>
                        <div class="flex items-center w-full overflow-hidden">
                            <div class="block h-6 w-px bg-gray-200 dark:bg-zinc-700 mx-3" aria-hidden="true">
                            </div>
                            <div @touchend="extraStore.openMoveTask(taskStore.info.id, taskStore.info.collection_id, taskStore.info.folder_id)"
                                @click="extraStore.openMoveTask(taskStore.info.id, taskStore.info.collection_id, taskStore.info.folder_id)"
                                class="hover:bg-gray-50 dark:hover:bg-zinc-700 text-gray-900 w-full dark:text-gray-50 p-1.5 rounded-md cursor-pointer flex items-center justify-between overflow-hidden">
                                <div class="flex items-center gap-x-2 overflow-hidden ">
                                    <Icon name="mdi:folder-move-outline" size="25" class="text-gray-400" />

                                    <span class="whitespace-nowrap overflow-hidden text-ellipsis">{{
                                        collectionStore.getCollection(task.collection_id).name }}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="flex mb-2 border-b border-gray-200 dark:border-zinc-700 pb-3 items-center">
                        <div class="flex items-center w-full">
                            <div class="flex items-center flex-auto">
                                <VueDatePicker @update:model-value="updateTask" :dark="settingStore.themeSetting"
                                    v-model="task.due_date" :format="formatDate" placeholder="Due Date"
                                    input-class-name="hover:bg-gray-50 dark:hover:bg-zinc-700 rounded-md bg-white dark:bg-zinc-900">
                                    <template #input-icon>
                                        <Icon name="mdi:calendar-clock-outline" size="20" class="text-gray-400" />
                                    </template>
                                </VueDatePicker>
                            </div>
                        </div>
                    </div>

                    <div
                        class="content relative overflow-y-auto h-[calc(100vh-180px)] sm:h-[calc(100vh-155px)] p-2 sm:border-b border-gray-200 dark:border-zinc-700 pb-4 sm:pb-8">
                        <textarea rows="1" ref="taskName" v-model="task.name" @input="updateHeight" @blur="updateTask"
                            class="w-full font-semibold resize-none outline-none mb-4 bg-white dark:bg-zinc-900 text-gray-900 dark:text-gray-50"></textarea>
                        <EditorContent :editor="editorMobile" class="editor text-gray-900 dark:text-gray-50" />
                    </div>

                    <Editor :editor="editorMobile" />
                </template>
                <div v-if="taskStore.info.id === 0" class="h-full pb-6 flex flex-col justify-center items-center">
                    <Icon name="mdi:gesture-tap" size="80" class="text-gray-400/40 mb-3" />
                    <p class="text-gray-900 dark:text-gray-50">Click task to view the details</p>
                </div>
            </aside>
        </Transition>
    </div>
</template>

<script setup>
import VueDatePicker from '@vuepic/vue-datepicker';
import '@vuepic/vue-datepicker/dist/main.css'
import { useTaskStore } from '@/stores/useTaskStore'
import { useCollectionStore } from '@/stores/useCollectionStore'
import { useExtraStore } from '@/stores/useExtraStore'
import { useSettingStore } from '@/stores/useSettingStore'
import { useAuthStore } from '@/stores/useAuthStore'
import { useNotificationStore } from '@/stores/useNotificationStore'
import { useEditor, EditorContent } from '@tiptap/vue-3'
import StarterKit from '@tiptap/starter-kit'
import Highlight from '@tiptap/extension-highlight'
import TaskItem from '@tiptap/extension-task-item'
import TaskLists from '@tiptap/extension-task-list'
import Underline from '@tiptap/extension-underline'
import Placeholder from '@tiptap/extension-placeholder'


// ============== COMPILER MACRO ===============

definePageMeta({
    middleware: ['auth']
})


// ========== STATES & CONFIGURATIONS ==========

const taskStore = useTaskStore()
const collectionStore = useCollectionStore()
const extraStore = useExtraStore()
const settingStore = useSettingStore()
const authStore = useAuthStore()
const notificationStore = useNotificationStore()

const taskName = ref(null)
const divStyle = ref({})

const task = ref({
    id: 0,
    name: '',
    status: 0,
    due_date: null,
    content: '',
    collection_id: 0
})

const editor = useEditor({
    content: task.value.content,
    extensions: [
        StarterKit.configure({
            heading: {
                levels: [1, 2],
            },
        }),
        Highlight.configure({ multicolor: true }),
        TaskLists,
        TaskItem.configure({
            nested: true,
        }),
        Underline,
        Placeholder.configure({
            placeholder: 'What needs to be done?',
        }),
    ],
    onBlur({ editor }) {
        updateTask(editor.getHTML())
    },
})

const editorMobile = useEditor({
    content: task.value.content,
    extensions: [
        StarterKit.configure({
            heading: {
                levels: [1, 2],
            },
        }),
        Highlight.configure({ multicolor: true }),
        TaskLists,
        TaskItem.configure({
            nested: true,
        }),
        Underline,
        Placeholder.configure({
            placeholder: 'What needs to be done?',
        }),
    ],
    onBlur({ editor }) {
        updateTask(editor.getHTML())
    },
})


// ================= WATCHERS ==================

watch(() => task.value.content, () => {
    editor.value?.commands.setContent(task.value.content)
    editorMobile.value?.commands.setContent(task.value.content)
})

watch(taskStore.info, () => {
    task.value.id = taskStore.info.id
    task.value.name = taskStore.info.name
    task.value.status = taskStore.info.status
    task.value.due_date = taskStore.info.due_date
    task.value.content = taskStore.info.content
    task.value.collection_id = taskStore.info.collection_id

    nextTick(() => {
        updateHeight()
    })
})


// ================== METHODS ==================

const updateHeight = () => {
    if (taskName.value !== null) {
        taskName.value.style.height = 'auto'
        taskName.value.style.height = `${taskName.value.scrollHeight}px`
    }
}

const formatDate = (date) => {
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const year = date.getFullYear();
    const hours = date.getHours().toString().padStart(2, '0');
    const minutes = date.getMinutes().toString().padStart(2, '0');

    return `${month}/${day}/${year}, ${hours}:${minutes}`;
}

const updateTask = async (content) => {
    const tempStatus = ref(taskStore.info.status)
    task.value.content = typeof content === 'string' ? content : task.value.content
    task.value.due_date = (content instanceof Date || content === null) ? content : task.value.due_date
    const { data, error } = await taskStore.updateTask(task.value)

    if (data.value) {
        if (taskStore.info.status !== tempStatus.value) {
            const notification = ref({
                title: task.status === 0 ? 'Task Undo' : 'Task Completed',
                description: task.status === 0 ? `${taskStore.getTask(task.value.id)?.name} has been unchecked.` : `${taskStore.getTask(task.value.id)?.name} has been completed.`
            })

            notificationStore.setNotification(notification.value)
        }
    } else if (error) {
        console.error('Error editing task:', error)
    }
}


// ============== LIFECYCLE HOOKS ==============

onMounted(() => {
    settingStore.setTheme(authStore.user.setting_theme)
    if (notificationStore.authNotification.show) {
        const notification = ref({
            title: 'Welcome to Taskly!',
            description: 'You have successfully logged in.'
        })

        notificationStore.setNotification(notification.value)
    }

    divStyle.value = { height: `${window.visualViewport.height}px` }

    window.visualViewport.addEventListener('resize', () => {
        divStyle.value = { height: `${window.visualViewport.height}px` }
    })
})

onBeforeMount(() => {
    settingStore.setTheme(authStore.user.setting_theme)
})
</script>

<style>
.dp__main {
    min-width: 11.5rem;
    width: 100%;
}

.dp__input_readonly {
    border: none;
}

.dp__input_icon {
    left: 6px;
}

.dp__input_icon_pad {
    padding-left: 33px;
    padding-right: 20px;
}

.dp__clear_icon {
    padding-right: 4px;
    padding-left: 4px;
}

.dp__menu {
    font-family: 'Quicksand' !important
}

.dp__action_button.dp__action_select {
    height: auto;
    --tw-shadow: 0 1px 2px 0 rgb(0 0 0 / 0.05) !important;
    --tw-shadow-colored: 0 1px 2px 0 var(--tw-shadow-color) !important;
    box-shadow: 0 0 #0000, 0 0 #0000, 0 1px 2px 0 rgb(0 0 0 / 0.05) !important;
    box-shadow: var(--tw-ring-offset-shadow, 0 0 #0000), var(--tw-ring-shadow, 0 0 #0000), var(--tw-shadow) !important;
    --tw-text-opacity: 1 !important;
    color: rgb(255 255 255 / 1) !important;
    color: rgb(255 255 255 / var(--tw-text-opacity)) !important;
    font-weight: 600 !important;
    font-size: 0.875rem !important;
    line-height: 1.25rem !important;
    padding-top: 0.5rem !important;
    padding-bottom: 0.5rem !important;
    padding-left: 0.75rem !important;
    padding-right: 0.75rem !important;
    --tw-bg-opacity: 1 !important;
    background-color: rgb(251 191 36 / 1) !important;
    background-color: rgb(251 191 36 / var(--tw-bg-opacity)) !important;
    border-radius: 0.375rem !important;
}

.dp__action_button.dp__action_cancel {
    border: 0;
    margin-right: 18px;
    line-height: 1.5rem;
    font-weight: 600;
    font-size: 0.875rem;
}

.editor p {
    line-height: normal;
}

.editor::-webkit-scrollbar,
.editorMobile::-webkit-scrollbar {
    width: 5px;
}

.editor::-webkit-scrollbar-thumb,
.editorMobile::-webkit-scrollbar-thumb {
    box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
    border-radius: 8px;
}

.editor::-webkit-scrollbar-thumb:hover,
.editorMobile::-webkit-scrollbar-thumb:hover {
    background: #dedede;
}

.editor p.is-editor-empty:first-child::before,
.editorMobile p.is-editor-empty:first-child::before {
    content: attr(data-placeholder);
    float: left;
    color: #adb5bd;
    pointer-events: none;
    height: 0;
}

.editor ul[data-type="taskList"] li {
    margin-bottom: 9px;
}

.editor ul[data-type="taskList"] li label input {
    border: 2px rgb(209 213 219) solid;
}

.dark .editor ul[data-type="taskList"] li label input {
    border: 2px rgb(212 212 216) solid;
}
</style>
