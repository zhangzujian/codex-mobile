import { describe, expect, it } from 'vitest'
import {
  getModifierEnterShortcutLabel,
  getRequireModifierEnterLabel,
  getSendWithEnterPreferenceHelp,
} from './keyboardShortcuts'

describe('keyboard shortcut labels', () => {
  it('uses Command+Enter labels on Apple platforms', () => {
    expect(getModifierEnterShortcutLabel('MacIntel')).toBe('⌘ + Enter')
    expect(getRequireModifierEnterLabel('iPhone')).toBe('Require ⌘ + Enter to send')
    expect(getSendWithEnterPreferenceHelp('iPad')).toBe(
      'When enabled, press Enter to send. When disabled, use ⌘ + Enter to send.',
    )
  })

  it('uses Ctrl+Enter labels on non-Apple platforms', () => {
    expect(getModifierEnterShortcutLabel('Win32')).toBe('Ctrl + Enter')
    expect(getRequireModifierEnterLabel('Linux x86_64')).toBe('Require Ctrl + Enter to send')
    expect(getSendWithEnterPreferenceHelp('')).toBe(
      'When enabled, press Enter to send. When disabled, use Ctrl + Enter to send.',
    )
  })
})
