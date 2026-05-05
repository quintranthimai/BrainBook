import { apiClient } from './api'

export function getBookReviews(bookId) {
  return apiClient.get(`/reviews/book/${bookId}`)
}

export function createReview(bookId, data) {
  return apiClient.post(`/reviews/${bookId}`, data)
}

export function deleteReview(id) {
  return apiClient.delete(`/reviews/${id}`)
}
