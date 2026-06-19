const DEFAULT_TERMINAL_FONT_FAMILY_PARTS = [
  '"MesloLGS NF"',
  '"MesloLGS Nerd Font"',
  '"MesloLGS Nerd Font Mono"',
  '"Symbols Nerd Font"',
  '"Symbols Nerd Font Mono"',
  '"CaskaydiaCove Nerd Font"',
  '"CaskaydiaCove Nerd Font Mono"',
  '"FiraCode Nerd Font"',
  '"FiraCode Nerd Font Mono"',
  '"JetBrainsMono Nerd Font"',
  '"JetBrainsMono Nerd Font Mono"',
  'Menlo',
  'Monaco',
  'Consolas',
  '"Courier New"',
  'monospace',
]

const UNSAFE_FONT_PREFERENCE_PATTERN = /[;{}]/

export const DEFAULT_TERMINAL_FONT_FAMILY = DEFAULT_TERMINAL_FONT_FAMILY_PARTS.join(', ')

export function normalizeTerminalFontPreference(value: string): string {
  const trimmed = value.trim()
  if (!trimmed || UNSAFE_FONT_PREFERENCE_PATTERN.test(trimmed)) return ''
  return trimmed
}

function quoteFontFamily(value: string): string {
  if ((value.startsWith('"') && value.endsWith('"')) || (value.startsWith("'") && value.endsWith("'"))) {
    return value
  }
  return `"${value.replace(/"/g, '\\"')}"`
}

export function buildTerminalFontFamily(preferredFont: string): string {
  const normalized = normalizeTerminalFontPreference(preferredFont)
  if (!normalized) return DEFAULT_TERMINAL_FONT_FAMILY
  return [quoteFontFamily(normalized), ...DEFAULT_TERMINAL_FONT_FAMILY_PARTS].join(', ')
}
