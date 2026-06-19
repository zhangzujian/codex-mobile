import { readFileSync } from 'node:fs'
import { resolve } from 'node:path'
import { describe, expect, it } from 'vitest'

describe('SidebarThreadControls', () => {
  it('uses a message-plus icon for the start new thread action', () => {
    const source = readFileSync(resolve(__dirname, 'SidebarThreadControls.vue'), 'utf8')

    expect(source).toContain('IconTablerMessagePlus')
    expect(source).not.toContain('IconTablerFilePencil')
  })
})
