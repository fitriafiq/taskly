import { defineStore } from 'pinia'

export const useModalStore = defineStore('modal', () => {
    // ========== STATES & CONFIGURATIONS ==========

    const modalCollection = ref(false)
    const modalFolder = ref(false)
    const modalRemove = ref(false)
    const modalMove = ref(false)


    // ================== METHODS ==================

    const toggleModalCollection = () => {
        modalCollection.value = !modalCollection.value
    }

    const toggleModalFolder = () => {
        modalFolder.value = !modalFolder.value
    }

    const toggleModalRemove = () => {
        modalRemove.value = !modalRemove.value
    }

    const toggleModalMove = () => {
        modalMove.value = !modalMove.value
    }


    // ================== RETURN ===================

    return {
        modalCollection,
        modalFolder,
        modalRemove,
        modalMove,
        toggleModalCollection,
        toggleModalFolder,
        toggleModalRemove,
        toggleModalMove
    }
})