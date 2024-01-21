<template>
    <draggable tag="ul" class="relative space-y-1 mt-1" @end="mergerStore.onChange" v-bind="dragOptions" :list="props.tasks"
        :move="checkMove" :group="{ name: 'g1' }" item-key="name">
        <template #item="{ element }">
            <li :class="element.type === 'F' ? 'type-folder' : 'type-collection ps-6'">

                <!-- =============== DESKTOP =============== -->

                <div @click="[element.type === 'F' ? taskStore.setFolder(element) : taskStore.setCollection(element), toggleFolder($event)]"
                    :class="taskStore.currentTab === 'other' && (element.type === 'F' && taskStore.folder.id === element.id && taskStore.folder.current) || (element.type === 'C' && taskStore.collection.id === element.id) ? 'bg-gray-100 dark:bg-zinc-700' : ''"
                    class="hidden lg:flex group gap-x-3 items-center relative cursor-pointer text-gray-900 dark:text-gray-50 hover:bg-gray-100 dark:hover:bg-zinc-700 rounded-md text-sm leading-6 font-semibold p-2">
                    <div class="flex items-center gap-x-2 overflow-hidden">
                        <div class="flex items-center" :class="element.type === 'C' ? 'rounded-full p-[3px]' : ''" :style="element.type === 'C' ? {
                            color: element.color || 'inherit',
                            backgroundColor: element.color + '33'
                        } : ''">
                            <Icon :name="element.type === 'F' ? 'ph:folder' : 'ph:circle-fill'"
                                :size="element.type === 'F' ? '25' : '10'"
                                :class="element.type === 'F' ? 'text-gray-400' : ''" />
                        </div>
                        <span class="whitespace-nowrap overflow-hidden text-ellipsis">{{ element.name }}</span>
                    </div>
                    <div class="flex ms-auto items-center">
                        <Icon @click.stop="handleIconClick($event, element.type + element.id)"
                            :class="element.type === 'F' ? `ms-auto toggleExtra-${element.type + element.id}` : `toggleExtra-${element.type + element.id}`"
                            class="text-gray-400 opacity-0 group-hover:opacity-100 hover:text-gray-900 dark:hover:text-gray-50"
                            name="ph:dots-three-vertical" size="20" />
                    </div>
                </div>

                <!-- =========== MOBILE / TABLET =========== -->

                <div @touchstart="handleTouchStart($event, element.type + element.id)" @touchmove="isDragging = true"
                    @touchend="handleTouchEnd(element)"
                    @click="[element.type === 'F' ? taskStore.setFolder(element) : taskStore.setCollection(element), settingStore.closeSidebar()]"
                    :class="taskStore.currentTab === 'other' && (element.type === 'F' && taskStore.folder.id === element.id && taskStore.folder.current) || (element.type === 'C' && taskStore.collection.id === element.id) ? 'bg-gray-100 dark:bg-zinc-700' : ''"
                    class="flex lg:hidden group gap-x-3 items-center relative cursor-pointer text-gray-900 dark:text-gray-50 hover:bg-gray-100 dark:hover:bg-zinc-700 rounded-md text-sm leading-6 font-semibold p-2">
                    <div class="flex items-center gap-x-2 overflow-hidden">
                        <div class="flex items-center" :class="element.type === 'C' ? 'rounded-full p-[3px]' : ''" :style="element.type === 'C' ? {
                            color: element.color || 'inherit',
                            backgroundColor: element.color + '33'
                        } : ''">
                            <Icon :name="element.type === 'F' ? 'ph:folder' : 'ph:circle-fill'"
                                :size="element.type === 'F' ? '25' : '10'"
                                :class="element.type === 'F' ? 'text-gray-400' : ''" />
                        </div>
                        <span class="whitespace-nowrap overflow-hidden text-ellipsis">{{ element.name }}</span>
                    </div>
                    <div class="flex ms-auto items-center gap-x-3">
                        <div v-if="element.type === 'F'" @touchstart.stop="isDragging = false"
                            @touchmove.stop="isDragging = true" @touchend.stop="toggleFolder" @click.stop="toggleFolder"
                            class="toggler px-2 transition-transform duration-300">
                            <Icon name="mdi:chevron-down" class="text-gray-400" />
                        </div>
                    </div>
                </div>

                <NestedDraggable class="collection max-h-0 overflow-hidden mt-1 transition-all ease-in duration-300"
                    :tasks="element.collection" v-if="!element.folder_id" />
                <Teleport to="body">
                    <ExtraSidebar :collection="element" :toggleExtra="extraStore.toggleExtra.get(element.type + element.id)"
                        :mousePosition="mousePosition" @closeExtra="extraStore.toggleExtra.clear()" />
                </Teleport>
            </li>
        </template>
    </draggable>
</template>

<script setup lang="ts">
import { useMergerStore } from '@/stores/useMergerStore'
import { useTaskStore } from '@/stores/useTaskStore'
import { useSettingStore } from '@/stores/useSettingStore'
import { useExtraStore } from '@/stores/useExtraStore'
import draggable from "vuedraggable"


// ========== STATES & CONFIGURATIONS ==========

const taskStore = useTaskStore()
const mergerStore = useMergerStore()
const settingStore = useSettingStore()
const extraStore = useExtraStore()

const mousePosition = ref({ x: 0, y: 0 })
const isDragging = ref(false)
const touchStartTimer = ref(null)
const longTouch = ref(false)

const dragOptions = {
    animation: 200,
    group: "description",
    disabled: false,
    ghostClass: "ghost"
}


// =============== PROPS & EMITS ===============

const props = defineProps(['tasks'])


// ================= WATCHERS ==================

watch(() => mergerStore.mergedData, () => {
    updateHeight()
})


// ================== METHODS ==================

const handleTouchStart = (evt: TouchEvent, id: string) => {
    isDragging.value = false
    longTouch.value = false
    touchStartTimer.value = setTimeout(() => {
        longTouch.value = true
        extraStore.setToggleExtra(id)
        mousePosition.value = { x: evt.touches[0].clientX + 35, y: evt.touches[0].clientY }
    }, 500)
}

const handleTouchEnd = (element) => {
    clearTimeout(touchStartTimer)
    if (!isDragging.value && !longTouch.value) {
        extraStore.clearToggleExtra()
        element.type === 'F' ? taskStore.setFolder(element) : taskStore.setCollection(element)
        settingStore.closeSidebar()
    }
}

const handleIconClick = (evt: MouseEvent, id: string) => {
    extraStore.setToggleExtra(id)
    mousePosition.value = { x: evt.clientX, y: evt.clientY }
}

const toggleFolder = (evt: any) => {
    // evt.stopPropagation()
    if (!isDragging.value) {
        const folderContent = evt.currentTarget.closest('li').querySelector('.collection')
        if (folderContent) {
            folderContent.classList.toggle('open')
            folderContent.style.maxHeight = folderContent.classList.contains('open') ? folderContent.scrollHeight + 'px' : ''
        }

        if (evt.currentTarget.classList.contains('toggler')) {
            if (folderContent.classList.contains('open')) {
                evt.currentTarget.classList.add('-rotate-180')
            } else {
                evt.currentTarget.classList.remove('-rotate-180')
            }
        }
    }
}

const updateHeight = () => {
    const folderContent = document.querySelectorAll('.open')
    folderContent.forEach(element => {
        element.setAttribute('style', 'max-height:' + (element.scrollHeight + 40) + 'px')
    })
}

const checkMove = (evt: any) => {
    if (evt.draggedContext.element.type == 'F' && evt.to.parentElement.classList == 'type-folder') {
        return false
    } else if (evt.draggedContext.element.type == 'C' && evt.to.parentElement.classList == '') {
        return false
    }
    updateHeight()
    return true
}
</script>
