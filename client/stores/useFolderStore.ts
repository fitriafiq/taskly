import { defineStore } from 'pinia'
import { useApiFetch } from '@/composables/useApiFetch'
import { useMergerStore } from '@/stores/useMergerStore'
import { useTaskStore } from '@/stores/useTaskStore'

type Folder = {
    id: number
    user_id: number
    name: string
    order: number
    created_at: Date
    updated_at: Date
}

type Info = {
    name: string
    order: number
}

export const useFolderStore = defineStore('folder', () => {
    // ========== STATES & CONFIGURATIONS ==========

    const mergerStore = useMergerStore()
    const taskStore = useTaskStore()

    const folders = ref<Folder[] | null>(null)
    

    // ================== METHODS ==================

    const getInbox = () => {
        const inboxFolder = ref(0)
        if (folders.value) {
            const inbox = folders.value.find(folder => folder.name === 'Inbox')
            inboxFolder.value = inbox!.id
        }

        return inboxFolder.value
    }

    const getFolder = (id: number) => {
        return folders.value?.find(folder => folder.id === id)
    }

    const fetchFolders = async () => {
        const { data, error } = await useApiFetch('/api/folders')
        folders.value = data.value as Folder[]
        // console.log(data, error)
    }

    const addFolder = async (folder: Info) => {
        const apiFetch = await useApiFetch('/api/folders', {
            method: 'POST',
            body: folder,
        })

        await fetchFolders()
        mergerStore.mergeFolderCollection()

        return apiFetch
    }

    const updateFolder = async (id: number, name: string) => {
        const apiFetch = await useApiFetch('/api/folders/' + id, {
            method: 'PUT',
            body: { name },
        })

        await fetchFolders()
        mergerStore.mergeFolderCollection()
        await taskStore.fetchTasks()

        return apiFetch
    }

    const removeFolder = async (id: number) => {
        const apiFetch = await useApiFetch('/api/folders/' + id, {
            method: 'DELETE'
        })

        await fetchFolders()
        mergerStore.mergeFolderCollection()
        await taskStore.fetchTasks()

        return apiFetch
    }

    const reorderFolder = async (newFolder: Folder[]) => {
        let count = 1
        newFolder.forEach(element => element.order = count++)

        folders.value = newFolder

        const apiFetch = await useApiFetch('/api/folders/reorder', {
            method: 'POST',
            body: { folders: folders.value },
        });

        taskStore.getTasks()

        //await fetchFolders()
        return apiFetch
    }


    // ================== RETURN ===================

    return {
        folders,
        fetchFolders,
        addFolder,
        reorderFolder,
        getInbox,
        updateFolder,
        removeFolder,
        getFolder
    }
})