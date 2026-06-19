<template>
  <div v-if="messages.length > 0" class="queued-messages">
    <div class="queued-messages-inner">
    <div
      v-for="msg in messages"
      :key="msg.id"
      class="queued-row"
      :class="{
        'is-dragging': draggedMessageId === msg.id,
        'is-drop-target': dropTargetMessageId === msg.id && draggedMessageId !== msg.id,
      }"
      draggable="true"
      @dragstart="onDragStart($event, msg.id)"
      @dragover.prevent="onDragOver(msg.id)"
      @dragleave="onDragLeave(msg.id)"
      @drop.prevent="onDrop(msg.id)"
      @dragend="resetDragState"
    >
      <button
        class="queued-row-drag"
        type="button"
        :aria-label="t('Drag to reorder queued message')"
        :title="t('Drag to reorder queued message')"
      >
        <IconGripVertical />
      </button>
      <IconMessage class="queued-row-icon" />
      <span class="queued-row-text">{{ getMessagePreview(msg) }}</span>
      <div class="queued-row-actions">
        <button class="queued-row-edit" type="button" :title="t('Edit queued message')" @click="$emit('edit', msg.id)">{{ t('Edit') }}</button>
        <button class="queued-row-steer" type="button" :title="t('Send now without interrupting work')" @click="$emit('steer', msg.id)">{{ t('Steer') }}</button>
        <button class="queued-row-delete" type="button" :aria-label="t('Delete queued message')" :title="t('Delete queued message')" @click="$emit('delete', msg.id)">
          <IconTrash />
        </button>
      </div>
    </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { IconGripVertical, IconMessage, IconTrash } from '@tabler/icons-vue'
import { useUiLanguage } from '../../composables/useUiLanguage'

type QueuedMessageRow = {
  id: string
  text: string
  imageUrls?: string[]
  skills?: Array<{ name: string; path: string }>
  fileAttachments?: Array<{ label: string; path: string; fsPath: string }>
}

defineProps<{
  messages: QueuedMessageRow[]
}>()

const emit = defineEmits<{
  edit: [messageId: string]
  steer: [messageId: string]
  delete: [messageId: string]
  reorder: [payload: { draggedId: string; targetId: string }]
}>()

const { t } = useUiLanguage()
const draggedMessageId = ref('')
const dropTargetMessageId = ref('')

function onDragStart(event: DragEvent, messageId: string): void {
  draggedMessageId.value = messageId
  dropTargetMessageId.value = ''
  event.dataTransfer?.setData('text/plain', messageId)
  if (event.dataTransfer) {
    event.dataTransfer.effectAllowed = 'move'
  }
}

function onDragOver(messageId: string): void {
  if (!draggedMessageId.value || draggedMessageId.value === messageId) return
  dropTargetMessageId.value = messageId
}

function onDragLeave(messageId: string): void {
  if (dropTargetMessageId.value === messageId) {
    dropTargetMessageId.value = ''
  }
}

function onDrop(targetId: string): void {
  const draggedId = draggedMessageId.value
  resetDragState()
  if (!draggedId || draggedId === targetId) return
  emit('reorder', { draggedId, targetId })
}

function resetDragState(): void {
  draggedMessageId.value = ''
  dropTargetMessageId.value = ''
}

function getMessagePreview(message: QueuedMessageRow): string {
  const text = message.text.trim()
  if (text) return text

  const parts: string[] = []
  const imageCount = message.imageUrls?.length ?? 0
  const fileCount = message.fileAttachments?.length ?? 0
  const skillCount = message.skills?.length ?? 0

  if (imageCount > 0) parts.push(`${imageCount} ${t(imageCount === 1 ? 'image' : 'images')}`)
  if (fileCount > 0) parts.push(`${fileCount} ${t(fileCount === 1 ? 'file' : 'files')}`)
  if (skillCount > 0) parts.push(`${skillCount} ${t(skillCount === 1 ? 'skill' : 'skills')}`)

  return parts.join(', ') || t('(empty queued message)')
}
</script>

<style scoped>
@reference "tailwindcss";

.queued-messages {
  @apply w-full max-w-[min(var(--chat-column-max,45rem),100%)] mx-auto;
}

.queued-messages-inner {
  @apply flex max-h-[30dvh] flex-col gap-px overflow-y-auto rounded-t-2xl border-x border-t border-zinc-300 bg-zinc-50/80 px-3 py-1.5;
}

.queued-row {
  @apply flex min-w-0 items-center gap-2 rounded-lg py-1 text-sm transition;
}

.queued-row.is-dragging {
  @apply opacity-50;
}

.queued-row.is-drop-target {
  @apply bg-zinc-200/70;
}

.queued-row-drag {
  @apply inline-flex h-6 w-6 shrink-0 cursor-grab items-center justify-center rounded-md border-0 bg-transparent text-zinc-400 transition hover:bg-zinc-200 hover:text-zinc-700 active:cursor-grabbing;
}

.queued-row-icon {
  @apply h-4 w-4 shrink-0 text-zinc-400;
}

.queued-row-text {
  @apply min-w-0 flex-1 truncate text-zinc-700;
}

.queued-row-actions {
  @apply flex shrink-0 items-center gap-1;
}

.queued-row-steer {
  @apply rounded-md border border-zinc-300 bg-white px-2 py-0.5 text-xs font-medium text-zinc-700 transition hover:bg-zinc-100;
}

.queued-row-edit {
  @apply rounded-md border border-zinc-300 bg-white px-2 py-0.5 text-xs font-medium text-zinc-700 transition hover:bg-zinc-100;
}

.queued-row-delete {
  @apply inline-flex h-6 w-6 items-center justify-center rounded-md border-0 bg-transparent text-zinc-400 transition hover:bg-zinc-200 hover:text-zinc-700;
}
</style>
