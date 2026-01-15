export function extractPackageId(url: string): string | null {
    const match = url.match(/\/details\?id=([a-zA-Z0-9._]+)/)
    return match?.[1] || null
}
