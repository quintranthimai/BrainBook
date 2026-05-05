import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { useAuthStore } from './auth'
import { toast } from 'vue3-toastify'
import { apiGet, apiPost } from '@/lib/api'

export const useCartStore = defineStore('cart', () => {
  const items = ref([])
  const auth = useAuthStore()

  const totalItems = computed(() => {
    return items.value.reduce((sum, item) => sum + item.quantity, 0)
  })

  const totalPrice = computed(() => {
    return items.value.reduce((sum, item) => sum + item.quantity * item.price, 0)
  })

  async function fetchCart() {
    if (!auth.isLoggedIn) {
      items.value = []
      return
    }
    try {
      const data = await apiGet('/cart', {
        headers: { Authorization: `Bearer ${auth.token}` },
      })
      items.value = data?.items || []
    } catch (err) {
      console.error('Failed to fetch cart', err)
    }
  }

  async function addToCart(bookId, quantity = 1) {
    if (!auth.isLoggedIn) {
      toast.error('Vui lòng đăng nhập để thêm vào giỏ hàng!')
      // Optionally trigger the login modal opening here
      const modal = new window.bootstrap.Modal(document.getElementById('exampleModal'))
      modal.show()
      return
    }

    try {
      await apiPost('/cart/items', {
        headers: { Authorization: `Bearer ${auth.token}` },
        body: { bookId, quantity },
      })

      toast.success('Đã thêm sản phẩm vào giỏ hàng!')
      await fetchCart() // Refresh cart from server
    } catch (err) {
      toast.error(err.message)
    }
  }

  // Fetch cart initially if logged in
  if (auth.isLoggedIn) {
    fetchCart()
  }

  return { items, totalItems, totalPrice, fetchCart, addToCart }
})
