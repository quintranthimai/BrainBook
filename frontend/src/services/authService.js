import { apiClient } from './api'

export function register(payload) {
  return apiClient.post('/auth/register', payload)
}

export function login(payload) {
  return apiClient.post('/auth/login', payload)
}

export function getProfile() {
  return apiClient.get('/auth/profile', { requireAuth: true })
}
