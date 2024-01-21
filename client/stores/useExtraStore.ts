import { defineStore } from 'pinia'
import { useModalStore } from '@/stores/useModalStore'

export const useExtraStore = defineStore('extra', () => {
    // ========== STATES & CONFIGURATIONS ==========

    const modalStore = useModalStore()

    const toggleExtra = ref(new Map<string, boolean>());

    const addCollection = ref(false)
    const editFolder = ref(false)
    const remove = ref(false)
    const editCollection = ref(false)
    const moveTask = ref(false)

    const addCollectionName = ref('Inbox')
    const addCollectionID = ref(0)

    const editFolderName = ref('')
    const editFolderID = ref(0)

    const removeName = ref('')
    const removeID = ref(0)
    const removeType = ref('')

    const editCollectionName = ref('')
    const editCollectionID = ref(0)
    const editCollectionColor = ref('')
    const editCollectionFolderID = ref(0)

    const moveTaskID = ref(0)
    const moveTaskCollectionID = ref(0)
    const moveTaskFolderID = ref(0)


    // ================== METHODS ==================

    const setToggleExtra = (id: string) => {
        toggleExtra.value.clear()
        toggleExtra.value.set(id, true)
    }

    const clearToggleExtra = () => {
        toggleExtra.value.clear()
    }

    const openAddCollection = (id: number, name: string) => {
        addCollection.value = true
        addCollectionID.value = id
        addCollectionName.value = name
        modalStore.toggleModalCollection()
    }

    const closeAddCollection = () => {
        addCollection.value = false
        modalStore.toggleModalCollection()
    }

    const openEditFolder = (id: number, name: string) => {
        editFolder.value = true
        editFolderID.value = id
        editFolderName.value = name
        modalStore.toggleModalFolder()
    }

    const closeEditFolder = () => {
        setTimeout(() => {
            editFolder.value = false
        }, 1000)
        modalStore.toggleModalFolder()
    }

    const openRemove = (id: number, name: string, type: string) => {
        remove.value = true
        removeID.value = id
        removeName.value = name
        removeType.value = type
        modalStore.toggleModalRemove()
    }

    const closeRemove = () => {
        setTimeout(() => {
            remove.value = false
        }, 1000)
        modalStore.toggleModalRemove()
    }

    const openEditCollection = (id: number, name: string, color: string, order: number, folder_id: number) => {
        editCollection.value = true
        editCollectionName.value = name
        editCollectionID.value = id
        editCollectionColor.value = color
        editCollectionFolderID.value = folder_id
        modalStore.toggleModalCollection()
    }

    const closeEditCollection = () => {
        setTimeout(() => {
            editCollection.value = false
        }, 1000)
        modalStore.toggleModalCollection()
    }

    const openMoveTask = (task_id: number, collection_id: number, folder_id: number) => {
        moveTask.value = true
        moveTaskID.value = task_id
        moveTaskCollectionID.value = collection_id
        moveTaskFolderID.value = folder_id
        modalStore.toggleModalMove()
    }

    const closeMoveTask = () => {
        moveTask.value = false
        modalStore.toggleModalMove()
    }


    // ================== RETURN ===================

    return {
        toggleExtra,
        addCollection,
        editFolder,
        addCollectionName,
        addCollectionID,
        editFolderName,
        editFolderID,
        remove,
        removeName,
        removeID,
        removeType,
        editCollection,
        editCollectionName,
        editCollectionID,
        editCollectionColor,
        editCollectionFolderID,
        moveTaskID,
        moveTaskCollectionID,
        moveTaskFolderID,
        setToggleExtra,
        clearToggleExtra,
        openAddCollection,
        closeAddCollection,
        openEditFolder,
        closeEditFolder,
        openRemove,
        closeRemove,
        openEditCollection,
        closeEditCollection,
        openMoveTask,
        closeMoveTask
    }
})