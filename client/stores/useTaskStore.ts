import { defineStore } from 'pinia'
import { useApiFetch } from '@/composables/useApiFetch'
import { useSettingStore } from '@/stores/useSettingStore'
import { useFolderStore } from '@/stores/useFolderStore'

type Task = {
    id: number
    collection_id: number
    name: string
    content: string
    status: number
    order: number
    due_date: Date
    folder_id: number
}

type List = {
    id: number
    name: string
    color?: string
    updated: boolean
    current?: boolean
    folder_id?: number
}

type Info = {
    id: number
    name: string
    content: string
    status: number
    due_date: Date | null
    collection_id: number
    folder_id: number
}

export const useTaskStore = defineStore('task', () => {
    // ========== STATES & CONFIGURATIONS ==========

    const settingStore = useSettingStore()
    const folderStore = useFolderStore()

    const tasks = ref<Task[] | null>(null)
    const currentTab = ref('all')

    const collection = ref<List>({
        id: 0,
        name: '',
        color: '#dedede',
        updated: false
    })

    const folder = ref<List>({
        id: 0,
        name: 'All',
        updated: false,
        current: true
    })

    const info = ref<Info>({
        id: 0,
        name: '',
        content: '',
        status: 0,
        due_date: null,
        collection_id: 0,
        folder_id: 0
    })


    // ================== METHODS ==================

    const changeTab = (newTab: string) => {
        currentTab.value = newTab

        if (newTab !== 'other') {
            collection.value.id = 0
            collection.value.name = ''
            collection.value.color = '#dedede'
            collection.value.updated = false
            folder.value.id = 0
            folder.value.name = ''
            folder.value.updated = false
            folder.value.current = false
        }

        settingStore.closeSettings()
    }

    const dateTasks = (newTab: string) => {
        const currentDate = new Date();
        const currentYear = currentDate.getFullYear();
        const currentMonth = currentDate.getMonth();
        const currentDay = currentDate.getDate();

        return tasks.value?.filter(task => {
            const dueDate = new Date(task.due_date)
            const dueYear = dueDate.getFullYear()
            const dueMonth = dueDate.getMonth()
            const dueDay = dueDate.getDate()

            if (newTab === 'today') {
                return (
                    currentYear === dueYear &&
                    currentMonth === dueMonth &&
                    currentDay === dueDay
                )
            } else {
                return task.due_date !== null && !(
                    currentYear === dueYear &&
                    currentMonth === dueMonth &&
                    currentDay === dueDay
                )
            }
        })
    }

    const setCollection = (newCollection: List) => {
        collection.value.id = newCollection.id
        collection.value.name = newCollection.name
        collection.value.color = newCollection.color
        collection.value.updated = true
        folder.value.id = newCollection.folder_id ? newCollection.folder_id : 0
        folder.value.name = folder.value.id !== 0 ? folderStore.getFolder(folder.value.id)!.name : ''
        folder.value.current = false
        currentTab.value = 'other'
        settingStore.closeSettings()
    }

    const setFolder = (newFolder: List) => {
        folder.value.id = newFolder.id
        folder.value.name = newFolder.name
        folder.value.updated = true
        folder.value.current = true
        collection.value.id = 0
        collection.value.name = ''
        collection.value.color = '#dedede'
        collection.value.updated = false
        currentTab.value = 'other'
        settingStore.closeSettings()
    }

    const setInfo = (newInfo: Task) => {
        info.value.id = newInfo.id
        info.value.name = newInfo.name
        info.value.content = newInfo.content
        info.value.status = newInfo.status
        info.value.due_date = newInfo.due_date
        info.value.collection_id = newInfo.collection_id
        info.value.folder_id = newInfo.folder_id
        settingStore.closeSettings()
    }

    const getTask = (id: number) => {
        return tasks.value?.find(task => task.id === id)
    }

    const getTasks = () => {
        const filteredTasks = ref(folder.value.current
            ? tasks.value?.filter(task => task.folder_id === folder.value.id)
            : collection.value.updated
                ? tasks.value?.filter(task => task.collection_id === collection.value.id)
                : null
        );

        if (filteredTasks.value) {
            filteredTasks.value.sort((a: any, b: any) => {
                if (a.collection_order === b.collection_order) {
                    if (a!.color === b.color) {
                        return a.order - b.order;
                    }
                    return a.color.localeCompare(b.color);
                }
                return a.collection_order - b.collection_order;
            })
        }

        return filteredTasks.value
    }

    const fetchTasks = async () => {
        const apiFetch = await useApiFetch('/api/tasks')
        tasks.value = apiFetch.data.value as Task[]

        if (tasks.value) {
            tasks.value.sort((a: any, b: any) => {
                if (a.collection_order === b.collection_order) {
                    if (a!.color === b.color) {
                        return a.order - b.order;
                    }
                    return a.color.localeCompare(b.color);
                }
                return a.collection_order - b.collection_order;
            })
        }

        return apiFetch
    }

    const addTask = async (newTask: string, collectionID: number) => {
        const apiFetch = await useApiFetch('/api/tasks', {
            method: 'POST',
            body: {
                collection_id: collectionID,
                name: newTask
            },
        })

        await fetchTasks()

        return apiFetch
    }

    const updateTask = async (task: Task) => {
        const apiFetch = await useApiFetch('/api/tasks/' + task.id, {
            method: 'PUT',
            body: {
                id: task.id,
                name: task.name,
                due_date: task.due_date,
                content: task.content,
                status: task.status
            },
        })

        info.value.name = task.name
        info.value.content = task.content
        info.value.due_date = task.due_date
        info.value.status = task.status

        await fetchTasks()

        return apiFetch
    }

    const removeTask = async (id: number) => {
        const apiFetch = await useApiFetch('/api/tasks/' + id, {
            method: 'DELETE'
        })

        await fetchTasks()
        info.value.id = 0
        info.value.name = ''
        info.value.content = ''
        info.value.status = 0
        info.value.due_date = null
        info.value.collection_id = 0

        return apiFetch
    }

    const duplicateTask = async (newTask: Task) => {
        const apiFetch = await useApiFetch('/api/tasks/duplicate', {
            method: 'POST',
            body: {
                collection_id: newTask.collection_id,
                name: newTask.name + ' Copied',
                content: newTask.content,
                status: newTask.status,
                due_date: newTask.due_date,
                order: newTask.order,
            },
        })

        await fetchTasks()

        return apiFetch
    }

    const reorderTask = async (newTask: Task[]) => {
        let count = 1
        newTask.forEach(element => {
            element.order = count++
            tasks.value?.forEach(task => {
                if (task.id === element.id) {
                    task.order = element.order
                }
            })
        })

        await useApiFetch('/api/tasks/reorder', {
            method: 'POST',
            body: { tasks: tasks.value }
        })
    }

    const moveTask = async (task: number, collection: number) => {
        const apiFetch = await useApiFetch('/api/tasks/move', {
            method: 'POST',
            body: {
                task,
                collection,
            },
        })

        if (apiFetch.data.value) {
            info.value.collection_id = collection
        }

        await fetchTasks()

        return apiFetch
    }

    return {
        currentTab,
        info,
        tasks,
        collection,
        folder,
        moveTask,
        getTask,
        duplicateTask,
        dateTasks,
        changeTab,
        setInfo,
        setCollection,
        setFolder,
        getTasks,
        fetchTasks,
        addTask,
        reorderTask,
        updateTask,
        removeTask
    }
})