import { apiClient } from './api'

export function getCategories() {
  return apiClient.get('/categories')
}

export function getCategoryById(id) {
  return apiClient.get(`/categories/${id}`)
}

export function createCategory(data) {
  return apiClient.post('/categories', data)
}

export function updateCategory(id, data) {
  return apiClient.patch(`/categories/${id}`, data)
}

export function deleteCategory(id) {
  return apiClient.delete(`/categories/${id}`)
}

