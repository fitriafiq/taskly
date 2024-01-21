import { defineStore } from 'pinia'

type Notification = {
    title: string
    description: string
}

export const useNotificationStore = defineStore('notification', () => {
    // ========== STATES & CONFIGURATIONS ==========

    const showNotification = ref(false)
    let notificationTimeout: NodeJS.Timeout | undefined;

    const authNotification = ref({
        show: false,
        action: ''
    })

    const notification = ref<Notification>({
        title: '',
        description: ''
    })


    // ================== METHODS ==================

    const setNotification = (newNotification: Notification) => {
        closeNotification()
        clearTimeout(notificationTimeout)
        setTimeout(() => {
            notification.value.title = newNotification.title
            notification.value.description = newNotification.description
            showNotification.value = true

            notificationTimeout = setTimeout(() => {
                closeNotification()
            }, 2000)
        }, 300)
    }

    const closeNotification = () => {
        notification.value.title = ''
        notification.value.description = ''
        showNotification.value = false
    }

    const openAuthNotification = (action: string) => {
        authNotification.value.show = true
        authNotification.value.action = action
    }

    const closeAuthNotification = () => {
        authNotification.value.show = false
        authNotification.value.action = ''
    }


    // ================== RETURN ===================

    return {
        notification,
        authNotification,
        showNotification,
        setNotification,
        closeNotification,
        openAuthNotification,
        closeAuthNotification
    }
})