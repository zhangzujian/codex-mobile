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

  it('uses a distinct run icon for the quick command menu', () => {
    const source = readAppSource()

    expect(source).toContain('IconPlayerPlay as IconTablerPlayerPlay')
    expect(source).toMatch(/<ComposerDropdown[\s\S]*:selected-prefix-icon="IconTablerPlayerPlay"/u)
    expect(source).not.toMatch(/<ComposerDropdown[\s\S]*:selected-prefix-icon="IconTablerTerminal"[\s\S]*@update:model-value="onSelectHeaderTerminalCommand"/u)
  })

  it('labels the quick command menu as running in the terminal', () => {
    const source = readAppSource()

    expect(source).toContain("t('Run in terminal')")
    expect(source).not.toMatch(/const terminalHeaderDropdownPlaceholder = computed\(\(\) => \([\s\S]*t\('Run\.\.\.'\)/u)
  })

  it('waits long enough for the async terminal panel before running a selected command', () => {
    const source = readAppSource()

    expect(source).toContain('TERMINAL_PANEL_WAIT_TIMEOUT_MS')
    expect(source).toContain('TERMINAL_PANEL_WAIT_INTERVAL_MS')
    expect(source).toMatch(/Date\.now\(\) \+ TERMINAL_PANEL_WAIT_TIMEOUT_MS/u)
    expect(source).not.toContain('for (let attempt = 0; attempt < 20; attempt += 1)')
  })
})
