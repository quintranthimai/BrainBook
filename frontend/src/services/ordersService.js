import { apiClient } from './api'

function buildQuery(params = {}) {
  const searchParams = new URLSearchParams()
  for (const [key, value] of Object.entries(params)) {
    if (value === undefined || value === null || value === '') continue
    searchParams.set(key, String(value))
  }
  const query = searchParams.toString()
  return query ? `?${query}` : ''
}

export function getOrders(params) {
  return apiClient.get(`/orders${buildQuery(params)}`, { requireAuth: true })
}

export function getOrderDetail(orderNumber, email) {
  return apiClient.get(`/orders/lookup${buildQuery({ orderNumber, email })}`)
}

export function updateOrderStatus(orderNumber, status) {
  return apiClient.patch(
    `/orders/${encodeURIComponent(orderNumber)}/status`,
    { status },
    { requireAuth: true },
  )
}

export function updatePaymentStatus(orderNumber, status) {
  return apiClient.patch(
    `/orders/${encodeURIComponent(orderNumber)}/payment-status`,
    { status },
    { requireAuth: true },
  )
}

export function createOrder(data) {
  return apiClient.post('/orders', data)
}

