<template>
  <main class="py-5">
    <div class="container">
      <div class="row">
        <div class="col-12 mb-4">
          <h3 class="text-primary fw-bold">My Wishlist</h3>
          <p class="text-primary">Books you've saved for later.</p>
        </div>
      </div>

      <div v-if="loading" class="text-center py-5">
        <div class="spinner-border text-primary" role="status"></div>
      </div>

      <div v-else-if="items.length === 0" class="text-center py-5">
        <div class="mb-4">
          <i class="ti ti-heart-off fs-1 text-muted"></i>
        </div>
        <h3>Your wishlist is empty</h3>
        <p class="text-muted">Explore our shop and save your favorite books!</p>
        <RouterLink to="/shop" class="btn btn-primary px-4 py-2 mt-2">Go to Shop</RouterLink>
      </div>

      <div v-else class="row g-4">
        <div v-for="item in items" :key="item.id" class="col-md-6 col-lg-4">
          <div class="card h-100 shadow-sm border-0 position-relative">
            <button
              @click="removeFromWishlist(item.bookId)"
              class="btn wishlist-remove-btn position-absolute top-0 end-0 m-2 rounded-circle shadow-sm"
              style="z-index: 10"
              title="Remove from wishlist"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="18"
                height="18"
                fill="currentColor"
                class="bi bi-trash d-block"
                viewBox="0 0 16 16"
              >
                <path
                  d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z"
                />
                <path
                  fill-rule="evenodd"
                  d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"
                />
              </svg>
            </button>
            <div class="row g-0 h-100">
              <div class="col-4 bg-light d-flex align-items-center justify-content-center p-3">
                <img
                  :src="item.book.imageUrl"
                  class="img-fluid rounded shadow-sm"
                  alt="book cover"
                  style="max-height: 120px; object-fit: contain"
                />
              </div>
              <div class="col-8">
                <div class="card-body d-flex flex-column h-100">
                  <h6 class="card-title fw-bold mb-1">
                    <RouterLink
                      :to="`/product/${item.book.slug}`"
                      class="text-decoration-none hover-primary d-block text-truncate"
                      style="max-width: 100%"
                    >
                      {{ item.book.title }}
                    </RouterLink>
                  </h6>
                  <p class="text-primary fw-bold mb-2">${{ item.book.price }}</p>
                  <p class="small text-muted mb-3">
                    <span :class="item.book.stock > 0 ? 'text-success' : 'text-danger'">
                      {{ item.book.stock > 0 ? 'In Stock' : 'Out of Stock' }}
                    </span>
                  </p>
                  <div class="mt-auto">
                    <button
                      @click="addToCart(item.book)"
                      class="btn btn-sm btn-primary w-100 rounded-pill"
                      :disabled="item.book.stock <= 0"
                    >
                      Add to Cart
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </main>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { apiGet, apiPost } from '@/lib/api'
import { toast } from 'vue3-toastify'

const items = ref([])
const loading = ref(false)
const router = useRouter()

const fetchWishlist = async () => {
  loading.value = true
  try {
    items.value = await apiGet('/wishlist')
  } catch {
    toast.error('Failed to load wishlist')
  } finally {
    loading.value = false
  }
}

const removeFromWishlist = async (bookId) => {
  try {
    await apiPost(`/wishlist/remove/${bookId}`)
    items.value = items.value.filter((i) => i.bookId !== bookId)
    toast.info('Removed from wishlist')
  } catch {
    toast.error('Failed to remove item')
  }
}

const addToCart = async (book) => {
  try {
    await apiPost('/cart/items', {
      body: { bookId: book.id, quantity: 1 },
    })
    toast.success('Added to cart!')
    router.push('/cart')
  } catch {
    toast.error('Failed to add to cart')
  }
}

onMounted(fetchWishlist)
</script>

<style scoped>
.wishlist-remove-btn {
  width: 40px;
  height: 40px;
  min-width: 40px;
  min-height: 40px;
  padding: 0;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  background-color: #ffffff !important;
  border: 1px solid #dee2e6 !important;
  color: #dc3545 !important;
  transition: all 0.2s ease;
}

.wishlist-remove-btn:hover {
  background-color: #dc3545 !important;
  border-color: #dc3545 !important;
  color: #ffffff !important;
  transform: translateY(-1px);
  box-shadow: 0 4px 10px rgba(220, 53, 69, 0.2);
}
</style>
