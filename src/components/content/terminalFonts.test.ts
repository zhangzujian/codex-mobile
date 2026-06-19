import { describe, expect, it } from 'vitest'
import { TERMINAL_FONT_FAMILY } from './terminalFonts'

describe('terminal font family', () => {
  it('prefers Meslo and common Nerd Font families before plain monospace fallbacks', () => {
    expect(TERMINAL_FONT_FAMILY).toContain('"MesloLGS NF"')
    expect(TERMINAL_FONT_FAMILY).toContain('"MesloLGS Nerd Font"')
    expect(TERMINAL_FONT_FAMILY).toContain('"Symbols Nerd Font"')
    expect(TERMINAL_FONT_FAMILY.indexOf('"MesloLGS NF"')).toBeLessThan(
      TERMINAL_FONT_FAMILY.indexOf('Menlo'),
    )
  })
})
