import { describe, expect, it } from 'vitest'
import { stripCommandOutputControlSequences } from './commandOutputText'

describe('command output text formatting', () => {
  it('removes ANSI SGR control sequences from command output', () => {
    expect(stripCommandOutputControlSequences('\u001B[2mnode scripts/dev.cjs --host 127.0.0.1\u001B[22m')).toBe('node scripts/dev.cjs --host 127.0.0.1')
  })

  it('removes replacement-character ANSI remnants from command output', () => {
    expect(stripCommandOutputControlSequences('�[2mnode scripts/dev.cjs --host 127.0.0.1�[22m')).toBe('node scripts/dev.cjs --host 127.0.0.1')
  })

  it('keeps normal command output text unchanged', () => {
    expect(stripCommandOutputControlSequences('done\nno control sequences here')).toBe('done\nno control sequences here')
  })
})
