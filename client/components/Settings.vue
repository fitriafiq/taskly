<template>
    <div class="space-y-12 mt-16 px-8 py-10">
        <div
            class="grid grid-cols-1 gap-x-8 gap-y-10 border-b border-gray-900/10 dark:border-zinc-700 pb-12 md:grid-cols-3">
            <div>
                <h2 class="text-base font-semibold leading-7 text-gray-900 dark:text-gray-50">Account Information</h2>
                <p class="mt-1 text-sm leading-6 text-gray-600 dark:text-gray-300">Manage your avatar, name, and view your
                    associated email
                    address. Personalize your account information with ease.</p>
            </div>
            <form @submit.prevent="updateAccount"
                class="grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6 md:col-span-2 bg-gray-50/10 dark:bg-zinc-800 shadow-sm ring-1 ring-gray-900/5 sm:rounded-xl px-4 py-6 sm:p-8">
                <div class="col-span-full flex items-center gap-x-8">
                    <img :src="account.avatar" alt="Selected Image"
                        class="h-24 w-24 flex-none rounded-full border border-gray-200 dark:border-zinc-700 object-cover" />
                    <div>
                        <input type="file" accept=".jpg, .jpeg, .png" @change="handleImageChange" ref="fileInput"
                            name="avatar_file" class="hidden" />
                        <button type="button" @click="openFileInput"
                            class="rounded-md bg-amber-400 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-amber-400/80">Change
                            avatar</button>
                        <p class="mt-2 text-xs leading-5 text-gray-400">JPG, JPEG or PNG. 1MB max.</p>
                    </div>
                </div>
                <div class="sm:col-span-3">
                    <label for="first-name"
                        class="block text-sm font-medium leading-6 text-gray-900 dark:text-gray-50">First name</label>
                    <div class="mt-2">
                        <input v-model="account.first_name" type="text" name="first_name" id="first-name" required
                            class="block w-full rounded-md bg-white dark:bg-zinc-700/40 dark:focus:bg-zinc-800 border-0 px-3 py-1.5 text-gray-900 dark:text-gray-50 shadow-sm ring-1 ring-inset ring-gray-300 dark:ring-zinc-500 focus:outline focus:outline-1 outline-amber-400 sm:text-sm sm:leading-6" />
                    </div>
                </div>
                <div class="sm:col-span-3">
                    <label for="last-name" class="block text-sm font-medium leading-6 text-gray-900 dark:text-gray-50">Last
                        name</label>
                    <div class="mt-2">
                        <input v-model="account.last_name" type="text" name="last_name" id="last-name" required
                            class="block w-full rounded-md bg-white dark:bg-zinc-700/40 dark:focus:bg-zinc-800 border-0 px-3 py-1.5 text-gray-900 dark:text-gray-50 shadow-sm ring-1 ring-inset ring-gray-300 dark:ring-zinc-500 focus:outline focus:outline-1 outline-amber-400 sm:text-sm sm:leading-6" />
                    </div>
                </div>
                <div class="col-span-full">
                    <label for="email" class="block text-sm font-medium leading-6 text-gray-900 dark:text-gray-50">Email
                        address</label>
                    <div class="mt-2">
                        <input v-model="account.email" type="email" name="email" id="email" readonly
                            class="block w-full rounded-md bg-white dark:bg-zinc-700/40 dark:focus:bg-zinc-800 border-0 px-3 py-1.5 text-gray-900 dark:text-gray-50 shadow-sm ring-1 ring-inset ring-gray-300 dark:ring-zinc-500 focus:outline focus:outline-1 outline-amber-400 sm:text-sm sm:leading-6" />
                    </div>
                </div>
                <div class="col-span-full flex items-center justify-end gap-x-6">
                    <button type="submit"
                        class="rounded-md bg-amber-400 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-amber-400/80">Save</button>
                </div>
            </form>
        </div>

        <div
            class="grid grid-cols-1 gap-x-8 gap-y-10 border-b border-gray-900/10 dark:border-zinc-700 pb-12 md:grid-cols-3">
            <div>
                <h2 class="text-base font-semibold leading-7 text-gray-900 dark:text-gray-50">Change Password</h2>
                <p class="mt-1 text-sm leading-6 text-gray-600 dark:text-gray-300">Enhance your account security by updating
                    your password.
                    Keep your data safe with a new, strong password of your choice.</p>
            </div>

            <form @submit.prevent="updatePassword"
                class="grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6 md:col-span-2  bg-gray-50/10 dark:bg-zinc-800 shadow-sm ring-1 ring-gray-900/5 sm:rounded-xl px-4 py-6 sm:p-8">
                <div class="col-span-full">
                    <label for="current-password"
                        class="block text-sm font-medium leading-6 text-gray-900 dark:text-gray-50">Current
                        password</label>
                    <div class="mt-2">
                        <input v-model="password.current_password" type="password" name="current-password" required
                            id="current-password"
                            class="block w-full rounded-md bg-white dark:bg-zinc-700/40 dark:focus:bg-zinc-800 border-0 px-3 py-1.5 text-gray-900 dark:text-gray-50 shadow-sm ring-1 ring-inset ring-gray-300 dark:ring-zinc-500 focus:outline focus:outline-1 outline-amber-400 sm:text-sm sm:leading-6" />
                        <p v-if="password.current_password_error" class="text-sm mt-1 text-red-500">{{
                            password.current_password_error }}</p>
                    </div>
                </div>

                <div class="sm:col-span-full">
                    <label for="new-password"
                        class="block text-sm font-medium leading-6 text-gray-900 dark:text-gray-50">New
                        password</label>
                    <div class="mt-2">
                        <input v-model="password.new_password" type="password" name="new-password" id="new-password"
                            required
                            class="block w-full rounded-md bg-white dark:bg-zinc-700/40 dark:focus:bg-zinc-800 border-0 px-3 py-1.5 text-gray-900 dark:text-gray-50 shadow-sm ring-1 ring-inset ring-gray-300 dark:ring-zinc-500 focus:outline focus:outline-1 outline-amber-400 sm:text-sm sm:leading-6" />
                        <p v-if="password.new_password_error" class="text-sm mt-1 text-red-500">{{
                            password.new_password_error }}</p>
                    </div>
                </div>

                <div class="sm:col-span-full">
                    <label for="confirm-password"
                        class="block text-sm font-medium leading-6 text-gray-900 dark:text-gray-50">Confirm new
                        password</label>
                    <div class="mt-2">
                        <input v-model="password.new_password_confirmation" type="password" name="confirm-password" required
                            id="confirm-password"
                            class="block w-full rounded-md bg-white dark:bg-zinc-700/40 dark:focus:bg-zinc-800 border-0 px-3 py-1.5 text-gray-900 dark:text-gray-50 shadow-sm ring-1 ring-inset ring-gray-300 dark:ring-zinc-500 focus:outline focus:outline-1 outline-amber-400 sm:text-sm sm:leading-6" />
                        <p v-if="password.new_password_confirmation_error" class="text-sm mt-1 text-red-500">{{
                            password.new_password_confirmation_error }}</p>
                    </div>
                </div>
                <div class="col-span-full flex items-center justify-end gap-x-6">
                    <button type="submit"
                        class="rounded-md bg-amber-400 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-amber-400/80">Save</button>
                </div>
            </form>
        </div>

        <div class="grid grid-cols-1 gap-x-8 gap-y-10 md:grid-cols-3">
            <div>
                <h2 class="text-base font-semibold leading-7 text-gray-900 dark:text-gray-50">User Preferences</h2>
                <p class="mt-1 text-sm leading-6 text-gray-600 dark:text-gray-300">Craft your unique experience. Decide
                    what's shown and switch
                    between light and dark themes to suit your tastes.</p>
            </div>
            <form @submit.prevent="updatePreference"
                class="space-y-10 md:col-span-2 bg-gray-50/10 dark:bg-zinc-800 shadow-sm ring-1 ring-gray-900/5 sm:rounded-xl px-4 py-6 sm:p-8">
                <fieldset class="mt-2 grid grid-cols-3 lg:grid-cols-4">
                    <h2 class="col-span-3 lg:col-span-1 mb-3 lg:mb-0 text-sm font-medium leading-6 text-gray-900 dark:text-gray-50 flex items-center gap-x-2">
                        <Icon name="ph:browsers" size="25" class="text-gray-400" /> All
                    </h2>
                    <label v-for="option in preferenceOptions"
                        :class="[option.value === 1 ? 'border-r-0 rounded-s-md' : (option.value === 2 ? 'border-l-0 rounded-e-md' : ''), preference.setting_all === option.value ? 'bg-amber-400 text-white' : 'bg-white dark:bg-zinc-700/40 text-gray-900 dark:text-gray-50']"
                        class="flex items-center border justify-center p-2 text-sm font-semibold cursor-pointer dark:border-zinc-500 focus:outline-none">
                        <input v-model="preference.setting_all" type="radio" name="setting-all" :value="option.value"
                            class="sr-only">
                        <span>{{ option.name }}</span>
                    </label>
                </fieldset>
                <fieldset class="mt-2 grid grid-cols-3 lg:grid-cols-4">
                    <h2 class="col-span-3 lg:col-span-1 mb-3 lg:mb-0 text-sm font-medium leading-6 text-gray-900 dark:text-gray-50 flex items-center gap-x-2">
                        <Icon name="ph:calendar-blank" size="25" class="text-gray-400" /> Today
                    </h2>
                    <label v-for="option in preferenceOptions"
                        :class="[option.value === 1 ? 'border-r-0 rounded-s-md' : (option.value === 2 ? 'border-l-0 rounded-e-md' : ''), preference.setting_today === option.value ? 'bg-amber-400 text-white' : 'bg-white dark:bg-zinc-700/40 text-gray-900 dark:text-gray-50']"
                        class="flex items-center border justify-center p-2 text-sm font-semibold cursor-pointer dark:border-zinc-500 focus:outline-none">
                        <input v-model="preference.setting_today" type="radio" name="setting-today" :value="option.value"
                            class="sr-only">
                        <span>{{ option.name }}</span>
                    </label>
                </fieldset>
                <fieldset class="mt-2 grid grid-cols-3 lg:grid-cols-4">
                    <h2 class="col-span-3 lg:col-span-1 mb-3 lg:mb-0 text-sm font-medium leading-6 text-gray-900 dark:text-gray-50 flex items-center gap-x-2">
                        <Icon name="ph:calendar-plus" size="25" class="text-gray-400" /> Upcoming
                    </h2>
                    <label v-for="option in preferenceOptions"
                        :class="[option.value === 1 ? 'border-r-0 rounded-s-md' : (option.value === 2 ? 'border-l-0 rounded-e-md' : ''), preference.setting_upcoming === option.value ? 'bg-amber-400 text-white' : 'bg-white dark:bg-zinc-700/40 text-gray-900 dark:text-gray-50']"
                        class="flex items-center border justify-center p-2 text-sm font-semibold cursor-pointer dark:border-zinc-500 focus:outline-none">
                        <input v-model="preference.setting_upcoming" type="radio" name="setting-upcoming"
                            :value="option.value" class="sr-only">
                        <span>{{ option.name }}</span>
                    </label>
                </fieldset>
                <fieldset class="mt-2 grid grid-cols-3 lg:grid-cols-4">
                    <h2 class="col-span-3 lg:col-span-1 mb-3 lg:mb-0 text-sm font-medium leading-6 text-gray-900 dark:text-gray-50 flex items-center gap-x-2">
                        <Icon name="ph:check-square" size="25" class="text-gray-400" /> Completed
                    </h2>
                    <label v-for="option in preferenceOptions"
                        :class="[option.value === 1 ? 'border-r-0 rounded-s-md' : (option.value === 2 ? 'border-l-0 rounded-e-md' : ''), preference.setting_completed === option.value ? 'bg-amber-400 text-white' : 'bg-white dark:bg-zinc-700/40 text-gray-900 dark:text-gray-50']"
                        class="flex items-center border justify-center p-2 text-sm font-semibold cursor-pointer dark:border-zinc-500 focus:outline-none">
                        <input v-model="preference.setting_completed" type="radio" name="setting-completed"
                            :value="option.value" class="sr-only">
                        <span>{{ option.name }}</span>
                    </label>
                </fieldset>
                <fieldset class="mt-2 grid grid-cols-3 lg:grid-cols-4">
                    <h2 class="col-span-3 lg:col-span-1 mb-3 lg:mb-0 text-sm font-medium leading-6 text-gray-900 dark:text-gray-50 flex items-center gap-x-2">
                        <Icon name="ph:paint-brush" size="25" class="text-gray-400" /> Theme
                    </h2>
                    <label v-for="option in preferenceOptions"
                        :class="[option.value === 1 ? 'border-r-0 rounded-s-md' : (option.value === 2 ? 'border-l-0 rounded-e-md' : ''), preference.setting_theme === option.value ? 'bg-amber-400 text-white' : 'bg-white dark:bg-zinc-700/40 text-gray-900 dark:text-gray-50']"
                        class="flex items-center border justify-center p-2 text-sm font-semibold cursor-pointer dark:border-zinc-500 focus:outline-none">
                        <input v-model="preference.setting_theme" type="radio" name="setting-all" :value="option.value"
                            class="sr-only">
                        <span>{{ option.theme }}</span>
                    </label>
                </fieldset>
                <div class="col-span-full flex items-center justify-end gap-x-6">
                    <button type="submit"
                        class="rounded-md bg-amber-400 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-amber-400/80">Save</button>
                </div>
            </form>
        </div>
    </div>
</template>

<script setup lang="ts">
import { useSettingStore } from '@/stores/useSettingStore'
import { useAuthStore } from '@/stores/useAuthStore'
import { useNotificationStore } from '@/stores/useNotificationStore'


// ========== STATES & CONFIGURATIONS ==========

const settingStore = useSettingStore()
const authStore = useAuthStore()
const notificationStore = useNotificationStore()

const fileInput = ref<HTMLInputElement | null>(null)

const account = ref({
    avatar: authStore.user?.avatar ? authStore.user.avatar : '',
    avatar_file: null as File | null,
    first_name: authStore.user?.first_name ? authStore.user.first_name : '',
    last_name: authStore.user?.last_name ? authStore.user.last_name : '',
    email: authStore.user?.email ? authStore.user.email : '',
})

const password = ref({
    current_password: '',
    new_password: '',
    new_password_confirmation: '',
    current_password_error: '',
    new_password_error: '',
    new_password_confirmation_error: ''
})

const preference = ref({
    setting_all: authStore?.user?.setting_all !== undefined ? authStore.user.setting_all : 1,
    setting_today: authStore.user?.setting_today !== undefined ? authStore.user.setting_today : 1,
    setting_upcoming: authStore.user?.setting_upcoming !== undefined ? authStore.user.setting_upcoming : 1,
    setting_completed: authStore.user?.setting_completed  !== undefined? authStore.user.setting_completed : 1,
    setting_theme: authStore.user?.setting_theme !== undefined ? authStore.user.setting_theme : 2,
})

const preferenceOptions = ref([
    {
        name: 'Show',
        value: 1,
        theme: 'Light'
    },
    {
        name: 'Hide',
        value: 0,
        theme: 'Dark'
    },
    {
        name: 'Auto',
        value: 2,
        theme: 'Auto'
    }
])


// ================== METHODS ==================

const openFileInput = () => {
    fileInput.value?.click()
}

const handleImageChange = (event: Event) => {
    const input = event.target as HTMLInputElement
    const file = input.files?.[0]

    if (file) {
        account.value.avatar_file = file
        account.value.avatar = URL.createObjectURL(file);
    }
};

const updateAccount = async () => {
    const { data, error } = await settingStore.updateAccount(account.value)

    if (data.value) {
        const notification = ref({
            title: 'Account Information Updated',
            description: 'Your account information has been updated.'
        })

        notificationStore.setNotification(notification.value)
    } else if (error) {
        console.error('Error updating preference:', error)
    }
}

const updatePassword = async () => {
    password.value.current_password_error = ''
    password.value.new_password_error = ''
    password.value.new_password_confirmation_error = ''

    const { data, error } = await settingStore.updatePassword(password.value)

    if (data.value) {
        const notification = ref({
            title: 'Password Updated',
            description: 'Your password has been updated.'
        })

        notificationStore.setNotification(notification.value)
        password.value.current_password = ''
        password.value.new_password = ''
        password.value.new_password_confirmation = ''
    } else if (error) {
        error.value?.data?.errors?.current_password ? password.value.current_password_error = error.value.data.errors.current_password : ''
        error.value?.data?.errors?.new_password.includes('The new password field must be at least 8 characters.') ? password.value.new_password_error = 'The new password field must be at least 8 characters.' : ''
        error.value?.data?.errors?.new_password.includes('The new password field confirmation does not match.') ? password.value.new_password_confirmation_error = 'Password confirmation does not match the new password.' : ''

        if (!error.value?.data?.errors) {
            console.error('Error updating password:', error)
        }
    }
}

const updatePreference = async () => {
    const { data, error } = await settingStore.updatePreference(preference.value)

    if (data.value) {
        const notification = ref({
            title: 'User Preferences Updated',
            description: 'Your preferences has been updated.'
        })

        notificationStore.setNotification(notification.value)
    } else if (error) {
        console.error('Error updating preference:', error)
    }
}
</script>