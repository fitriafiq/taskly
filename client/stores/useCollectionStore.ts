import { defineStore } from 'pinia'
import { useApiFetch } from '@/composables/useApiFetch'
import { useMergerStore } from '@/stores/useMergerStore'
import { useTaskStore } from '@/stores/useTaskStore'

type Collection = {
    id: number
    user_id: number
    folder_id: number | null
    name: string
    color: string
    order: number
    created_at: Date
    updated_at: Date
}

type Info = {
    name: string
    color: string
    folder_id: number | null
}

export const useCollectionStore = defineStore('collection', () => {
    // ========== STATES & CONFIGURATIONS ==========

    const mergerStore = useMergerStore()
    const taskStore = useTaskStore()

    const collections = ref<Collection[] | null>(null)


    // ================== METHODS ==================

    const getCollections = (id: number) => {
        return collections.value?.filter((collection) => collection.folder_id === id)
    }

    const getCollection = (id: number) => {
        return collections.value?.find((collection) => collection.id === id)
    }

    const fetchCollections = async () => {
        const { data, error } = await useApiFetch('/api/collections')
        collections.value = data.value as Collection[]
        //console.log(data, error)
    }

    const addCollection = async (collection: Info) => {
        const apiFetch = await useApiFetch('/api/collections', {
            method: 'POST',
            body: collection,
        })

        await fetchCollections()
        mergerStore.mergeFolderCollection()

        return apiFetch
    }

    const updateCollection = async (id: number, collection: Info) => {
        const apiFetch = await useApiFetch('/api/collections/' + id, {
            method: 'PUT',
            body: collection,
        })

        await fetchCollections()
        mergerStore.mergeFolderCollection()
        await taskStore.fetchTasks()

        return apiFetch
    }

    const removeCollection = async (id: number) => {
        const apiFetch = await useApiFetch('/api/collections/' + id, {
            method: 'DELETE'
        })

        await fetchCollections()
        mergerStore.mergeFolderCollection()
        await taskStore.fetchTasks()

        return apiFetch
    }

    const duplicateCollection = async (newCollection: Collection) => {
        const apiFetch = await useApiFetch('/api/collections/duplicate', {
            method: 'POST',
            body: {
                id: newCollection.id,
                name: newCollection.name + ' Copied',
                color: newCollection.color,
                folder_id: newCollection.folder_id
            },
        })

        await fetchCollections()
        mergerStore.mergeFolderCollection()
        await taskStore.fetchTasks()

        return apiFetch
    }

    const reorderCollection = async (newCollection: Collection[]) => {
        let count = 1
        newCollection.forEach(element => element.order = count++)

        collections.value = newCollection

        const apiFetch = await useApiFetch('/api/collections/reorder', {
            method: 'POST',
            body: { collections: collections.value },
        });

        //await fetchCollections()
        return apiFetch
    }


    // ================== RETURN ===================

    return {
        collections,
        getCollection,
        getCollections,
        duplicateCollection,
        fetchCollections,
        addCollection,
        reorderCollection,
        updateCollection,
        removeCollection
    }
})