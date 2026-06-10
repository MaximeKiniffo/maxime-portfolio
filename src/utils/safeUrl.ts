type AllowedProtocol = 'http:' | 'https:' | 'mailto:'

const DEFAULT_ALLOWED_PROTOCOLS: AllowedProtocol[] = ['https:', 'http:', 'mailto:']
const EXTERNAL_ALLOWED_PROTOCOLS: AllowedProtocol[] = ['https:', 'http:']

export function safeHref(
  url: string | undefined,
  allowedProtocols: AllowedProtocol[] = DEFAULT_ALLOWED_PROTOCOLS,
): string | undefined {
  if (!url) return undefined

  try {
    const parsed = new URL(url, window.location.origin)
    if (!allowedProtocols.includes(parsed.protocol as AllowedProtocol)) return undefined
    return url
  } catch {
    return undefined
  }
}

export function safeExternalHref(url: string | undefined): string | undefined {
  return safeHref(url, EXTERNAL_ALLOWED_PROTOCOLS)
}

export function isExternalHref(url: string | undefined): boolean {
  if (!url) return false
  return /^https?:\/\//i.test(url)
}
