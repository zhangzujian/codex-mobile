import { readFileSync } from 'node:fs'
import { resolve } from 'node:path'
import { describe, expect, it } from 'vitest'

function readAppSource(): string {
  return readFileSync(resolve(__dirname, '../../App.vue'), 'utf8')
}

describe('terminal header UX', () => {
  it('keeps terminal toggle as a direct button instead of hiding it behind the run menu', () => {
    const source = readAppSource()

    expect(source).toContain('canShowTerminalDirectToggle')
    expect(source).toMatch(/<button[\s\S]*v-if="canShowTerminalDirectToggle"[\s\S]*@click="toggleComposerTerminal"/u)
    expect(source).toMatch(/<ComposerDropdown[\s\S]*v-if="canShowTerminalQuickCommandDropdown"/u)
    expect(source).not.toContain('v-else-if="canShowTerminalQuickCommandDropdown"')
    expect(source).not.toMatch(/<ComposerDropdown\s+v-if="canShowTerminalToggle"[\s\S]*:options="terminalHeaderDropdownOptions"/u)
  })

  it('does not duplicate the terminal toggle inside the run command menu', () => {
    const source = readAppSource()
    const optionsBlock = source.match(/const terminalHeaderDropdownOptions = computed\([\s\S]*?\)\nconst contentStyle/u)?.[0] ?? ''

    expect(source).not.toContain('TOGGLE_TERMINAL_COMMAND_VALUE')
    expect(optionsBlock).not.toContain('terminalToggleLabel')
  })
})
