import { readFileSync } from 'node:fs'
import { resolve } from 'node:path'
import { describe, expect, it } from 'vitest'

const source = readFileSync(resolve(__dirname, 'HeaderGitBranchDropdown.vue'), 'utf8')

describe('HeaderGitBranchDropdown localization', () => {
  it('formats commit file status badges through UI translations', () => {
    expect(source).toContain('formatCommitFileStatus(file)')
    expect(source).not.toContain('{{ file.label }}')
  })
})
