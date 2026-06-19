const ANSI_ESCAPE_PATTERN = /\u001B\[[0-?]*[ -/]*[@-~]/g
const REPLACEMENT_ANSI_PATTERN = /\uFFFD\[[0-?]*[ -/]*[@-~]/g

export function stripCommandOutputControlSequences(output: string): string {
  return output
    .replace(ANSI_ESCAPE_PATTERN, '')
    .replace(REPLACEMENT_ANSI_PATTERN, '')
}
