import { apiClient } from './api'

export function getUsers() {
  return apiClient.get('/users')
}

export function updateUserRole(id, role) {
  return apiClient.patch(`/users/${id}/role`, { role })
}

export function deleteUser(id) {
  return apiClient.delete(`/users/${id}`)
}

