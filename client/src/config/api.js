const LOCAL_HOSTS = new Set(['localhost', '127.0.0.1'])

export function getApiBaseUrl() {
  const envUrl = import.meta.env.VITE_API_URL?.trim()

  if (envUrl) {
    return envUrl.replace(/\/+$/, '')
  }

  if (typeof window === 'undefined') {
    return ''
  }

  if (LOCAL_HOSTS.has(window.location.hostname)) {
    return 'http://localhost:5000'
  }

  // In production, prefer the current origin so same-domain deployments
  // on Render or another host keep working without a localhost fallback.
  return window.location.origin.replace(/\/+$/, '')
}
