import { readFileSync } from 'node:fs'
import { resolve } from 'node:path'
import { describe, expect, it } from 'vitest'

describe('SidebarThreadTree new thread icons', () => {
  it('uses message-plus icons for project and chats new-thread actions', () => {
    const source = readFileSync(resolve(__dirname, 'SidebarThreadTree.vue'), 'utf8')

    expect(source).toContain('IconTablerMessagePlus')
    expect(source).toContain('getNewThreadButtonAriaLabel(group.projectName)')
    expect(source).toContain("t('New chat')")
  })
})
