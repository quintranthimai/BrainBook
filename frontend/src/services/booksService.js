import { apiClient, getAccessToken } from './api'
import { API_BASE_URL } from '@/lib/api'

function buildQuery(params = {}) {
  const searchParams = new URLSearchParams()

  for (const [key, value] of Object.entries(params)) {
    if (value === undefined || value === null || value === '') continue
    searchParams.set(key, String(value))
  }

  const query = searchParams.toString()
  return query ? `?${query}` : ''
}

export function getBooks(params) {
  return apiClient.get(`/books${buildQuery(params)}`)
}

export function getBookBySlug(slug) {
  return apiClient.get(`/books/slug/${encodeURIComponent(slug)}`)
}

export function getBookById(id) {
  return apiClient.get(`/books/${id}`)
}

export function createBook(data) {
  return apiClient.post('/books', data)
}

export function updateBook(id, data) {
  return apiClient.patch(`/books/${id}`, data)
}

export function deleteBook(id) {
  return apiClient.delete(`/books/${id}`)
}

export async function uploadImage(file) {
  const formData = new FormData()
  formData.append('image', file)

  const token = getAccessToken()
  const headers = new Headers()
  if (token) {
    headers.set('Authorization', `Bearer ${token}`)
  }

  const res = await fetch(`${API_BASE_URL}/upload`, {
    method: 'POST',
    headers,
    body: formData,
  })

  const contentType = res.headers.get('content-type') || ''
  const isJson = contentType.includes('application/json')

  const data = await (async () => {
    try {
      return isJson ? await res.json() : await res.text()
    } catch {
      return null
    }
  })()

  if (!res.ok) {
    const message =
      (data && typeof data === 'object' && (data.message || data.error)) ||
      (typeof data === 'string' && data) ||
      'Upload ảnh thất bại'
    throw new Error(Array.isArray(message) ? message.join('\n') : message)
  }

  return data
}
