const APPLE_PLATFORM_PATTERN = /mac|iphone|ipad|ipod/i

export function isAppleKeyboardPlatform(platform?: string): boolean {
  const resolvedPlatform = platform ?? (typeof navigator === 'undefined' ? '' : navigator.platform)
  return APPLE_PLATFORM_PATTERN.test(resolvedPlatform)
}

export function getModifierEnterShortcutLabel(platform?: string): string {
  return isAppleKeyboardPlatform(platform) ? '⌘ + Enter' : 'Ctrl + Enter'
}

export function getRequireModifierEnterLabel(platform?: string): string {
  return `Require ${getModifierEnterShortcutLabel(platform)} to send`
}

export function getSendWithEnterPreferenceHelp(platform?: string): string {
  return `When enabled, press Enter to send. When disabled, use ${getModifierEnterShortcutLabel(platform)} to send.`
}
