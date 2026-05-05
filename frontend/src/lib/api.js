import { apiClient, getSessionId as getSessId } from '@/services/api'

export const API_BASE_URL = import.meta.env.VITE_API_BASE_URL ?? 'http://localhost:3000/api'

export function getSessionId() {
  return getSessId()
}

export function getToken() {
  return localStorage.getItem('access_token')
}

export async function apiRequest(path, { method = 'GET', params, headers, body, includeSession = true } = {}) {
  let finalPath = path
  if (params && Object.keys(params).length > 0) {
    const searchParams = new URLSearchParams()
    Object.entries(params).forEach(([key, value]) => {
      if (value !== undefined && value !== null && value !== '') {
        searchParams.append(key, value)
      }
    })
    const queryString = searchParams.toString()
    if (queryString) {
      finalPath += (finalPath.includes('?') ? '&' : '?') + queryString
    }
  }

  const options = { headers }
  
  if (includeSession && !path.startsWith('/cart')) {
    options.headers = { ...headers, 'x-session-id': getSessionId() }
  }

  switch (method.toUpperCase()) {
    case 'GET': return apiClient.get(finalPath, options)
    case 'POST': return apiClient.post(finalPath, body, options)
    case 'PATCH': return apiClient.patch(finalPath, body, options)
    case 'DELETE': return apiClient.delete(finalPath, options)
    case 'PUT': 
      return apiClient.post(finalPath, body, { ...options, method: 'PUT' })
    default: return apiClient.get(finalPath, options)
  }
}

export const apiGet = (path, opts) => apiRequest(path, { ...opts, method: 'GET' })
export const apiPost = (path, opts) => apiRequest(path, { ...opts, method: 'POST' })
export const apiPatch = (path, opts) => apiRequest(path, { ...opts, method: 'PATCH' })
export const apiDelete = (path, opts) => apiRequest(path, { ...opts, method: 'DELETE' })
