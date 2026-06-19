import { readFileSync, readdirSync, statSync } from 'node:fs'
import { join, relative } from 'node:path'
import { describe, expect, it } from 'vitest'

const repoRoot = join(__dirname, '..', '..')

function readSource(path: string): string {
  return readFileSync(join(repoRoot, path), 'utf8')
}

function walkSourceFiles(dir: string, files: string[] = []): string[] {
  for (const name of readdirSync(dir)) {
    if (name === 'node_modules' || name === '.git' || name === 'dist' || name === 'dist-cli') continue
    const path = join(dir, name)
    const stat = statSync(path)
    if (stat.isDirectory()) {
      walkSourceFiles(path, files)
    } else if (/\.(ts|vue)$/u.test(name) && !/\.test\.ts$/u.test(name)) {
      files.push(path)
    }
  }
  return files
}

function extractZhCNKeys(): Set<string> {
  const source = readSource('src/composables/useUiLanguage.ts')
  const match = source.match(/const zhCN: Record<string, string> = (\{[\s\S]*?\n\})\n\nconst LANGUAGE_LABELS/u)
  if (!match) throw new Error('Could not find zhCN translation table')
  const zhCN = Function(`return (${match[1]})`)() as Record<string, string>
  return new Set(Object.keys(zhCN))
}

function unquote(raw: string): string {
  return Function(`return ${raw}`)() as string
}

describe('UI language translations', () => {
  it('has Simplified Chinese entries for every literal t() key', () => {
    const zhCNKeys = extractZhCNKeys()
    const tKeys = new Set<string>()
    const files = walkSourceFiles(join(repoRoot, 'src'))

    for (const file of files) {
      const source = readFileSync(file, 'utf8')
      const matcher = /\bt\(\s*(["'`])((?:\\.|(?!\1)[\s\S])*?)\1/gu
      let match: RegExpExecArray | null
      while ((match = matcher.exec(source))) {
        tKeys.add(unquote(`${match[1]}${match[2]}${match[1]}`))
      }
    }

    const missing = [...tKeys].filter((key) => !zhCNKeys.has(key)).sort((a, b) => a.localeCompare(b))
    expect(missing).toEqual([])
  })

  it('does not leave known high-visibility frontend copy hardcoded in English', () => {
    const hardcodedSnippets: Array<{ file: string; snippet: string }> = [
      { file: 'src/components/content/DirectoryHub.vue', snippet: '<h2 class="directory-title">Skills & Apps</h2>' },
      { file: 'src/components/content/DirectoryHub.vue', snippet: 'placeholder="Search plugins..."' },
      { file: 'src/components/content/DirectoryHub.vue', snippet: '>Plugin APIs unavailable in this Codex CLI. Update Codex CLI to use plugin catalog features.<' },
      { file: 'src/components/content/AutomationsPanel.vue', snippet: 'title="Create a new automation"' },
      { file: 'src/components/content/AutomationsPanel.vue', snippet: '>No automations yet<' },
      { file: 'src/components/content/HeaderGitBranchDropdown.vue', snippet: '>Review Worktree Changes<' },
      { file: 'src/components/content/HeaderGitBranchDropdown.vue', snippet: 'placeholder="Search commits..."' },
      { file: 'src/components/content/ThreadPendingRequestPanel.vue', snippet: "return 'Awaiting approval'" },
      { file: 'src/components/content/ThreadConversation.vue', snippet: '>No messages in this thread yet.<' },
      { file: 'src/composables/useGithubSkillsSync.ts', snippet: "options.showToast('GitHub login successful')" },
      { file: 'src/components/content/ReviewPane.vue', snippet: '>Changed files<' },
      { file: 'src/components/content/ThreadConversation.vue', snippet: '>Changed files<' },
      { file: 'src/components/content/ThreadConversation.vue', snippet: "|| '(no output)'" },
      { file: 'src/components/content/ThreadConversation.vue', snippet: "|| '(command)'" },
      { file: 'src/components/content/ThreadConversation.vue', snippet: "count === 1 ? '1 command'" },
      { file: 'src/components/content/ThreadConversation.vue', snippet: "return `${countLabel} · latest:" },
      { file: 'src/components/content/ThreadConversation.vue', snippet: "? 'Done'" },
      { file: 'src/components/content/ThreadConversation.vue', snippet: ": '✗ Failed'" },
      { file: 'src/components/content/ThreadConversation.vue', snippet: 'aria-label="Fork thread from this response"' },
      { file: 'src/components/content/ThreadConversation.vue', snippet: '>Fork<' },
      { file: 'src/components/content/ThreadConversation.vue', snippet: "? 'Response copied'" },
      { file: 'src/components/content/ThreadConversation.vue', snippet: ": 'Copy response'" },
      { file: 'src/components/content/ThreadConversation.vue', snippet: "? 'Copied'" },
      { file: 'src/components/content/ThreadConversation.vue', snippet: ": 'Copy'" },
    ]
    const hardcodedPatterns: Array<{ file: string; pattern: RegExp; label: string }> = [
      { file: 'src/components/sidebar/SidebarThreadTree.vue', pattern: />\s*Browse files\s*</u, label: 'Browse files text node' },
      { file: 'src/components/sidebar/SidebarThreadTree.vue', pattern: />\s*Copy path\s*</u, label: 'Copy path text node' },
      { file: 'src/components/sidebar/SidebarThreadTree.vue', pattern: />\s*Show more\s*</u, label: 'Show more text node' },
      { file: 'src/components/sidebar/SidebarThreadTree.vue', pattern: />\s*Show less\s*</u, label: 'Show less text node' },
    ]

    const remaining = hardcodedSnippets.filter(({ file, snippet }) => readSource(file).includes(snippet))
    const remainingPatterns = hardcodedPatterns.filter(({ file, pattern }) => pattern.test(readSource(file)))
    expect(
      [
        ...remaining.map(({ file, snippet }) => `${relative(repoRoot, join(repoRoot, file))}: ${snippet}`),
        ...remainingPatterns.map(({ file, label }) => `${relative(repoRoot, join(repoRoot, file))}: ${label}`),
      ],
    ).toEqual([])
  })
})
