import { readFileSync } from 'node:fs'
import { resolve } from 'node:path'
import { describe, expect, it } from 'vitest'

function readComponent(name: string): string {
  return readFileSync(resolve(__dirname, name), 'utf8')
}

function readAppSource(): string {
  return readFileSync(resolve(__dirname, '../../App.vue'), 'utf8')
}

describe('chat bottom UX layout', () => {
  it('renders live activity outside the scrollable message list', () => {
    const source = readComponent('ThreadConversation.vue')
    const liveOverlayListItem = /<li\s+v-if="liveOverlay"[^>]*conversation-item-overlay/u
    expect(source).not.toMatch(liveOverlayListItem)
    expect(source).toContain('conversation-bottom-tray')
    expect(source).toContain('conversation-status-bar')
    expect(source).toContain('role="status"')
  })

  it('places jump-to-latest in the bottom tray instead of as an absolute overlay', () => {
    const source = readComponent('ThreadConversation.vue')
    const jumpIndex = source.indexOf('class="jump-to-latest-button"')
    const trayIndex = source.indexOf('conversation-bottom-tray')
    expect(jumpIndex).toBeGreaterThan(trayIndex)
    expect(source).not.toContain('absolute left-1/2 bottom-4')
    expect(source).toContain('conversation-bottom-tray-spacer')
  })

  it('keeps the composer expand control outside the textarea scroll area', () => {
    const source = readComponent('ThreadComposer.vue')
    const inputWrapStart = source.indexOf('class="thread-composer-input-wrap"')
    const textareaIndex = source.indexOf('<textarea')
    const inputWrapEnd = source.indexOf('</div>', textareaIndex)
    const expandIndex = source.indexOf('class="thread-composer-expand"')

    expect(source).toContain('thread-composer-input-toolbar')
    expect(expandIndex).toBeLessThan(inputWrapStart)
    expect(expandIndex).toBeLessThan(inputWrapEnd)
    expect(source).not.toContain('absolute right-0.5 top-0.5')
  })

  it('joins queued messages directly to the composer or pending request border', () => {
    const source = readAppSource()
    const composerStackRule = source.match(/\.composer-with-queue\s*\{[\s\S]*?\n\}/u)?.[0] ?? ''
    const zeroQueueGapRule = source.match(
      /\.composer-with-queue\s*>\s*\.queued-messages\s*\+\s*\.thread-composer,[\s\S]*?\.composer-with-queue\s*>\s*\.queued-messages\s*\+\s*\.thread-pending-request\s*\{[\s\S]*?\n\}/u,
    )?.[0] ?? ''

    expect(composerStackRule).not.toContain('gap-2')
    expect(zeroQueueGapRule).toContain('.composer-with-queue > .queued-messages + .thread-composer')
    expect(zeroQueueGapRule).toContain('.composer-with-queue > .queued-messages + .thread-pending-request')
    expect(zeroQueueGapRule).toMatch(/margin-top:\s*0/u)
  })
})
