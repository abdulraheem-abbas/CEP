const rawBaseUrl = import.meta.env.VITE_API_BASE_URL || ''
const baseUrl = rawBaseUrl.replace(/\/$/, '')

export function apiUrl(path) {
  return `${baseUrl}${path}`
}
