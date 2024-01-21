<template>
    <div
        class="bg-gray-50 dark:bg-zinc-800 rounded-md border border-gray-200 dark:border-zinc-700 p-1 flex justify-center absolute bottom-3 left-1/2 -translate-x-1/2 w-[calc(100%-32px)] sm:w-max">
        <button @click="props.editor.chain().toggleBold().run()"
            :class="{ 'border border-gray-500 dark:border-zinc-500 bg-white dark:bg-zinc-700': editor && editor.isActive('bold') }"
            class="rounded-md text-gray-900 dark:text-gray-50 hover:bg-white dark:hover:bg-zinc-700 hover:border hover:border-gray-500 dark:border-zinc-500 h-7 w-7 flex justify-center items-center">
            <Icon name="mdi:format-bold" />
        </button>
        <button @click="props.editor.chain().toggleItalic().run()"
            :class="{ 'border border-gray-500 dark:border-zinc-500 bg-white dark:bg-zinc-700': editor && editor.isActive('italic') }"
            class="rounded-md text-gray-900 dark:text-gray-50 hover:bg-white dark:hover:bg-zinc-700 hover:border hover:border-gray-500 dark:border-zinc-500 h-7 w-7 flex justify-center items-center">
            <Icon name="mdi:format-italic" />
        </button>
        <button @click="props.editor.chain().toggleUnderline().run()"
            :class="{ 'border border-gray-500 dark:border-zinc-500 bg-white dark:bg-zinc-700': editor && editor.isActive('underline') }"
            class="rounded-md text-gray-900 dark:text-gray-50 hover:bg-white dark:hover:bg-zinc-700 hover:border hover:border-gray-500 dark:border-zinc-500 h-7 w-7 flex justify-center items-center">
            <Icon name="mdi:format-underline" />
        </button>
        <button @click="props.editor.chain().toggleStrike().run()"
            :class="{ 'border border-gray-500 dark:border-zinc-500 bg-white dark:bg-zinc-700': editor && editor.isActive('strike') }"
            class="rounded-md text-gray-900 dark:text-gray-50 hover:bg-white dark:hover:bg-zinc-700 hover:border hover:border-gray-500 dark:border-zinc-500 h-7 w-7 flex justify-center items-center">
            <Icon name="mdi:format-strikethrough-variant" />
        </button>
        <button @click="props.editor.chain().toggleHighlight({ color: '#fbbf24' }).run()"
            :class="{ 'border border-gray-500 dark:border-zinc-500 bg-white dark:bg-zinc-700': editor && editor.isActive('highlight', { color: '#fbbf24' }) }"
            class="rounded-md text-gray-900 dark:text-gray-50 hover:bg-white dark:hover:bg-zinc-700 hover:border hover:border-gray-500 dark:border-zinc-500 h-7 w-7 flex justify-center items-center">
            <Icon name="mdi:format-color-highlight" />
        </button>
        <button @click="props.editor.chain().toggleHeading({ level: 1 }).run()"
            :class="{ 'border border-gray-500 dark:border-zinc-500 bg-white dark:bg-zinc-700': editor && editor.isActive('heading', { level: 1 }) }"
            class="rounded-md text-gray-900 dark:text-gray-50 hover:bg-white dark:hover:bg-zinc-700 hover:border hover:border-gray-500 dark:border-zinc-500 h-7 w-7 flex justify-center items-center">
            <Icon name="mdi:format-header-1" />
        </button>
        <button @click="props.editor.chain().toggleHeading({ level: 2 }).run()"
            :class="{ 'border border-gray-500 dark:border-zinc-500 bg-white dark:bg-zinc-700': editor && editor.isActive('heading', { level: 2 }) }"
            class="rounded-md text-gray-900 dark:text-gray-50 hover:bg-white dark:hover:bg-zinc-700 hover:border hover:border-gray-500 dark:border-zinc-500 h-7 w-7 flex justify-center items-center">
            <Icon name="mdi:format-header-2" />
        </button>
        <button @click="props.editor.chain().toggleBulletList().run()"
            :class="{ 'border border-gray-500 dark:border-zinc-500 bg-white dark:bg-zinc-700': editor && editor.isActive('bulletList') }"
            class="rounded-md text-gray-900 dark:text-gray-50 hover:bg-white dark:hover:bg-zinc-700 hover:border hover:border-gray-500 dark:border-zinc-500 h-7 w-7 flex justify-center items-center">
            <Icon name="mdi:format-list-bulleted" />
        </button>
        <button @click="props.editor.chain().toggleOrderedList().run()"
            :class="{ 'border border-gray-500 dark:border-zinc-500 bg-white dark:bg-zinc-700': editor && editor.isActive('orderedList') }"
            class="rounded-md text-gray-900 dark:text-gray-50 hover:bg-white dark:hover:bg-zinc-700 hover:border hover:border-gray-500 dark:border-zinc-500 h-7 w-7 flex justify-center items-center">
            <Icon name="mdi:format-list-numbered" />
        </button>
        <button @click="props.editor.chain().toggleTaskList().run()"
            :class="{ 'border border-gray-500 dark:border-zinc-500 bg-white dark:bg-zinc-700': editor && editor.isActive('taskList') }"
            class="rounded-md text-gray-900 dark:text-gray-50 hover:bg-white dark:hover:bg-zinc-700 hover:border hover:border-gray-500 dark:border-zinc-500 h-7 w-7 flex justify-center items-center">
            <Icon name="mdi:format-list-checkbox" />
        </button>
        <button @click="props.editor.chain().toggleCodeBlock().run()"
            :class="{ 'border border-gray-500 dark:border-zinc-500 bg-white dark:bg-zinc-700': editor && editor.isActive('codeBlock') }"
            class="rounded-md text-gray-900 dark:text-gray-50 hover:bg-white dark:hover:bg-zinc-700 hover:border hover:border-gray-500 dark:border-zinc-500 h-7 w-7 flex justify-center items-center">
            <Icon name="mdi:application-brackets-outline" />
        </button>
        <button @click="props.editor.chain().toggleBlockquote().run()"
            :class="{ 'border border-gray-500 dark:border-zinc-500 bg-white dark:bg-zinc-700': editor && editor.isActive('blockquote') }"
            class="rounded-md text-gray-900 dark:text-gray-50 hover:bg-white dark:hover:bg-zinc-700 hover:border hover:border-gray-500 dark:border-zinc-500 h-7 w-7 flex justify-center items-center">
            <Icon name="mdi:format-quote-open" />
        </button>
        <button @click="props.editor.chain().setHorizontalRule().run()"
            class="rounded-md text-gray-900 dark:text-gray-50 hover:bg-white dark:hover:bg-zinc-700 hover:border hover:border-gray-500 dark:border-zinc-500 h-7 w-7 flex justify-center items-center">
            <Icon name="tabler:separator" />
        </button>
    </div>
</template>

<script setup lang="ts">
// =============== PROPS & EMITS ===============

const props = defineProps(['editor'])
</script>

<style>
.ProseMirror {
    height: 100%;
    line-height: 1;
    font-size: .875rem;
}

.ProseMirror-focused {
    outline: none;
}

.ProseMirror ul {
    padding: 0 1rem;
    list-style-type: disc;
}

.ProseMirror ul[data-type="taskList"] {
    padding: 0;
    list-style-type: none;
}

.ProseMirror ul[data-type=taskList] li {
    align-items: center;
    display: flex;
}

.ProseMirror ul[data-type=taskList] li>label {
    flex: 0 0 auto;
    margin-right: 0.5rem;
    -webkit-user-select: none;
    -moz-user-select: none;
    user-select: none;
    display: flex;
    align-items: center;
    justify-content: center;
}

.ProseMirror ol {
    padding: 0 1rem;
    list-style-type: decimal;
}

.ProseMirror>*+* {
    margin-top: 0.75em;
}

.ProseMirror pre {
    background: #0D0D0D;
    color: #FFF;
    font-family: 'JetBrainsMono', monospace;
    padding: 0.75rem 1rem;
    border-radius: 0.5rem;
}

.ProseMirror pre code {
    color: inherit;
    padding: 0;
    background: none;
    font-size: 0.8rem;
}

.ProseMirror blockquote {
    display: block;
    margin-block-start: 1em;
    margin-block-end: 1em;
    margin-inline-start: 40px;
    margin-inline-end: 40px;
    border-left: 2px solid rgba(251, 191, 36, 0.5);
    padding-left: 1rem;
}
</style>