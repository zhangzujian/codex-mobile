import { readdirSync, readFileSync, statSync } from 'node:fs'
import path from 'node:path'
import { describe, expect, it } from 'vitest'

const rootDir = path.resolve(__dirname, '../../..')

function listFiles(dir: string, predicate: (file: string) => boolean): string[] {
  const entries = readdirSync(dir, { withFileTypes: true })
  return entries.flatMap((entry) => {
    const fullPath = path.join(dir, entry.name)
    if (entry.isDirectory()) return listFiles(fullPath, predicate)
    return predicate(fullPath) ? [fullPath] : []
  })
}

describe('Tabler icon migration', () => {
  it('uses the official @tabler/icons-vue package instead of local SVG wrappers', () => {
    const packageJson = JSON.parse(readFileSync(path.join(rootDir, 'package.json'), 'utf8'))
    expect(packageJson.dependencies).toHaveProperty('@tabler/icons-vue')

    const localIconDir = path.join(rootDir, 'src/components/icons')
    const localIconWrappers = readdirSync(localIconDir).filter((file) => (
      /^IconTabler.*\.vue$/u.test(file)
    ))
    expect(localIconWrappers).toEqual([])

    const sourceFiles = listFiles(path.join(rootDir, 'src'), (file) => (
      /\.(ts|vue)$/u.test(file) && !/\.test\.ts$/u.test(file)
    ))
    const localIconImports = sourceFiles.filter((file) => (
      readFileSync(file, 'utf8').includes('/icons/IconTabler') ||
      readFileSync(file, 'utf8').includes('../icons/IconTabler') ||
      readFileSync(file, 'utf8').includes('./components/icons/IconTabler')
    ))
    expect(localIconImports).toEqual([])
  })

  it('does not keep inline SVG icons in app Vue components', () => {
    const vueFiles = listFiles(path.join(rootDir, 'src/components'), (file) => (
      file.endsWith('.vue') && statSync(file).isFile()
    ))
    const inlineSvgFiles = vueFiles.filter((file) => readFileSync(file, 'utf8').includes('<svg'))
    expect(inlineSvgFiles).toEqual([])
  })
})
