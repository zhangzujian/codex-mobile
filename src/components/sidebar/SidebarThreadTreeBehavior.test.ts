import { readFileSync } from 'node:fs'
import { resolve } from 'node:path'
import { describe, expect, it } from 'vitest'

const source = readFileSync(resolve(__dirname, 'SidebarThreadTree.vue'), 'utf8')

describe('SidebarThreadTree behavior contracts', () => {
  it('localizes project and thread menu trigger titles', () => {
    expect(source).not.toContain('title="project_menu"')
    expect(source).not.toContain('title="thread_menu"')
    expect(source).toContain(':title="t(\'Project menu\')"')
    expect(source).toContain(':title="t(\'Thread menu\')"')
  })

  it('shows three project threads by default before expanding a project', () => {
    expect(source).toContain('const DEFAULT_PROJECT_THREAD_LIMIT = 3')
    expect(source).toContain('rows.slice(0, DEFAULT_PROJECT_THREAD_LIMIT)')
    expect(source).toContain('projectThreads(group).length > DEFAULT_PROJECT_THREAD_LIMIT')
  })
})
