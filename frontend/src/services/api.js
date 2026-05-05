const defaultBaseUrl = 'http://localhost:3000/api'

export const ACCESS_TOKEN_STORAGE_KEY = 'access_token'
export const REFRESH_TOKEN_STORAGE_KEY = 'refresh_token'
export const SESSION_ID_STORAGE_KEY = 'session_id'

export function getAccessToken() {
  return localStorage.getItem(ACCESS_TOKEN_STORAGE_KEY) || ''
}

export function setAccessToken(token) {
  if (!token) return
  localStorage.setItem(ACCESS_TOKEN_STORAGE_KEY, token)
}

export function getRefreshToken() {
  return localStorage.getItem(REFRESH_TOKEN_STORAGE_KEY) || ''
}

export function setRefreshToken(token) {
  if (!token) return
  localStorage.setItem(REFRESH_TOKEN_STORAGE_KEY, token)
}

export function clearAuth() {
  localStorage.removeItem(ACCESS_TOKEN_STORAGE_KEY)
  localStorage.removeItem(REFRESH_TOKEN_STORAGE_KEY)
}

export const clearAccessToken = clearAuth

function generateSessionId() {
  if (typeof crypto !== 'undefined' && typeof crypto.randomUUID === 'function') {
    return crypto.randomUUID()
  }
  return `sess_${Date.now()}_${Math.random().toString(16).slice(2)}`
}

export function getSessionId() {
  const existing = localStorage.getItem(SESSION_ID_STORAGE_KEY)
  if (existing) return existing
  const sessionId = generateSessionId()
  localStorage.setItem(SESSION_ID_STORAGE_KEY, sessionId)
  return sessionId
}

function getBaseUrl() {
  const baseUrl = import.meta.env.VITE_API_BASE_URL || defaultBaseUrl
  return baseUrl.replace(/\/$/, '')
}

function normalizePath(path) {
  if (!path) return '/'
  return path.startsWith('/') ? path : `/${path}`
}

let refreshingPromise = null

async function refreshTokens() {
  const refreshToken = getRefreshToken()
  if (!refreshToken) throw new Error('No refresh token')

  const res = await fetch(`${getBaseUrl()}/auth/refresh`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ refresh_token: refreshToken }),
  })

  if (!res.ok) {
    clearAuth()
    throw new Error('Refresh failed')
  }

  const data = await res.json()
  setAccessToken(data.access_token)
  setRefreshToken(data.refresh_token)
  return data.access_token
}

async function request(path, options = {}) {
  const normalizedPath = normalizePath(path)
  const headers = new Headers(options.headers || {})
  
  let token = getAccessToken()
  if (token && !headers.has('Authorization')) {
    headers.set('Authorization', `Bearer ${token}`)
  }

  if (path.startsWith('/cart') && !headers.has('x-session-id')) {
    headers.set('x-session-id', getSessionId())
  }

  if (options.body && !(options.body instanceof FormData) && !headers.has('Content-Type')) {
    headers.set('Content-Type', 'application/json')
  }

  let response = await fetch(`${getBaseUrl()}${normalizedPath}`, {
    ...options,
    headers,
  })

  if (response.status === 401 && getRefreshToken() && !options._retry) {
    if (!refreshingPromise) {
      refreshingPromise = refreshTokens().finally(() => {
        refreshingPromise = null
      })
    }

    try {
      const newToken = await refreshingPromise
      headers.set('Authorization', `Bearer ${newToken}`)
      response = await fetch(`${getBaseUrl()}${normalizedPath}`, {
        ...options,
        _retry: true,
        headers,
      })
    } catch (e) {
      // Refresh failed, let the 401 stand or redirect to login
    }
  }

  const contentType = response.headers.get('content-type') || ''
  const isJson = contentType.includes('application/json')
  const data = isJson ? await response.json() : await response.text()

  if (!response.ok) {
    const message = (data && typeof data === 'object' && (data.message || data.error)) || data || 'API Error'
    throw new Error(Array.isArray(message) ? message.join('\n') : message)
  }

  return data
}

export const apiClient = {
  get: (path, options) => request(path, { ...options, method: 'GET' }),
  post: (path, body, options) =>
    request(path, {
      ...options,
      method: 'POST',
      body: body === undefined ? undefined : (body instanceof FormData ? body : JSON.stringify(body)),
    }),
  patch: (path, body, options) =>
    request(path, {
      ...options,
      method: 'PATCH',
      body: body === undefined ? undefined : (body instanceof FormData ? body : JSON.stringify(body)),
    }),
  delete: (path, options) => request(path, { ...options, method: 'DELETE' }),
}
