import { defineStore } from 'pinia'
import { useFolderStore } from '@/stores/useFolderStore'
import { useCollectionStore } from '@/stores/useCollectionStore'
import { useTaskStore } from '@/stores/useTaskStore'

type MergedFolderCollection = {
    id: number
    user_id: number
    name: string
    order: number
    created_at: Date
    updated_at: Date
    type: string
    collection: Collection[]
}

type Folder = {
    id: number
    user_id: number
    name: string
    order: number
    created_at: Date
    updated_at: Date
}

type Collection = {
    id: number
    user_id: number
    folder_id: number | null
    name: string
    color: string
    order: number
    type?: string
    created_at: Date
    updated_at: Date
}

export const useMergerStore = defineStore('merger', () => {
    // ========== STATES & CONFIGURATIONS ==========

    const folderStore = useFolderStore()
    const collectionStore = useCollectionStore()
    const taskStore = useTaskStore()

    const mergedData: Ref<MergedFolderCollection[] | null> = ref(null);


    // ================== METHODS ==================

    const mergeFolderCollection = async () => {
        await folderStore.fetchFolders()
        await collectionStore.fetchCollections()

        const folders = ref(folderStore.folders as Folder[])
        const collections = ref(collectionStore.collections as Collection[])

        const mergedCollections = ref(collections.value.map((collection) => ({
            ...collection,
            type: 'C',
        })))

        mergedData.value = folders.value.map((folder) => ({
            ...folder,
            type: 'F',
            collection: mergedCollections.value.filter((collection) => collection.folder_id === folder.id),
        }))
    }

    const onChange = () => {
        if (mergedData.value) {

            mergedData.value.forEach(element => {
                element.collection.forEach(item => {
                    item.folder_id = element.id
                })
            })

            const newCollections = mergedData.value.flatMap((folder) => folder.collection).map(({ type, ...collection }) => collection);
            const newFolders = mergedData.value.map(({ collection, type, ...folder }) => folder)

            collectionStore.reorderCollection(newCollections)
            folderStore.reorderFolder(newFolders)

            taskStore.fetchTasks()
        }
    }


    // ================== RETURN ===================

    return {
        mergedData,
        mergeFolderCollection,
        onChange
    }
})