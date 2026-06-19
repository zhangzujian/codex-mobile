import { describe, expect, it } from 'vitest'
import {
  DEFAULT_TERMINAL_FONT_FAMILY,
  buildTerminalFontFamily,
  normalizeTerminalFontPreference,
} from './terminalFonts'

describe('terminal font family', () => {
  it('prefers Meslo and common Nerd Font families before plain monospace fallbacks', () => {
    expect(DEFAULT_TERMINAL_FONT_FAMILY).toContain('"MesloLGS NF"')
    expect(DEFAULT_TERMINAL_FONT_FAMILY).toContain('"MesloLGS Nerd Font"')
    expect(DEFAULT_TERMINAL_FONT_FAMILY).toContain('"Symbols Nerd Font"')
    expect(DEFAULT_TERMINAL_FONT_FAMILY.indexOf('"MesloLGS NF"')).toBeLessThan(
      DEFAULT_TERMINAL_FONT_FAMILY.indexOf('Menlo'),
    )
  })

  it('prepends a user browser font preference before the default fallback stack', () => {
    const fontFamily = buildTerminalFontFamily('Maple Mono NF')

    expect(fontFamily.startsWith('"Maple Mono NF", "MesloLGS NF"')).toBe(true)
  })

  it('normalizes blank or unsafe terminal font preferences', () => {
    expect(normalizeTerminalFontPreference('  JetBrainsMono Nerd Font Mono  ')).toBe('JetBrainsMono Nerd Font Mono')
    expect(normalizeTerminalFontPreference('')).toBe('')
    expect(normalizeTerminalFontPreference('bad;font')).toBe('')
    expect(normalizeTerminalFontPreference('bad{font')).toBe('')
  })
})
