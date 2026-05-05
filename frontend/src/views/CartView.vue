<template>
  <div class="cart-page mt-5 py-5">
    <div class="container">
      <div class="text-center mb-5">
        <h2 class="display-6 fw-bold text-primary">Your Cart</h2>
        <p class="text-dark">Review your items before proceeding to checkout.</p>
      </div>

      <div v-if="loading" class="text-center py-5">Loading...</div>
      <div v-else-if="error" class="alert alert-danger" role="alert">{{ error }}</div>
      <div v-else>

      <div class="table-responsive mb-5">
        <table
          class="table align-middle text-center table-hover border-bottom"
          style="table-layout: fixed; width: 100%"
        >
          <thead class="bg-light">
            <tr>
              <th scope="col" class="py-3 text-start ps-4" style="width: 40%">Product Name</th>
              <th scope="col" class="py-3" style="width: 15%">Price</th>
              <th scope="col" class="py-3" style="width: 20%">Quantity</th>
              <th scope="col" class="py-3" style="width: 15%">Total</th>
              <th scope="col" class="py-3" style="width: 10%">Remove</th>
            </tr>
          </thead>
          <tbody class="border-top-0">
            <tr v-for="(item, index) in cartItems" :key="item.id">
              <td class="text-start ps-4 py-4">
                <div class="d-flex align-items-center">
                  <img
                    :src="item.image"
                    :alt="item.name"
                    width="70"
                    class="rounded-2 border shadow-sm me-3"
                  />
                  <div>
                    <h6 class="mb-1 fw-bold text-dark text-truncate">{{ item.name }}</h6>
                    <small class="text-primary">Author: {{ item.author }}</small>
                  </div>
                </div>
              </td>

              <td class="fw-medium text-dark">${{ item.price.toFixed(2) }}</td>

              <td>
                <div class="d-flex justify-content-center">
                  <div class="d-flex border rounded-3 overflow-hidden quantity-wrapper">
                    <button
                      class="btn rounded-0 p-0 d-flex justify-content-center align-items-center btn-qty"
                      @click="decrease(item)"
                      type="button"
                    >
                      -
                    </button>
                    <input
                      type="text"
                      class="form-control border-0 text-center rounded-0 fw-bold p-0 qty-input"
                      v-model="item.quantity"
                      readonly
                    />
                    <button
                      class="btn rounded-0 p-0 d-flex justify-content-center align-items-center btn-qty"
                      @click="increase(item)"
                      type="button"
                    >
                      +
                    </button>
                  </div>
                </div>
              </td>

              <td class="fw-bold text-dark">${{ (item.price * item.quantity).toFixed(2) }}</td>

              <td>
                <button
                  @click="removeItem(item.id)"
                  class="btn btn-remove rounded-circle d-inline-flex justify-content-center align-items-center p-0"
                  style="width: 40px; height: 40px"
                  title="Remove Item"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    fill="currentColor"
                    class="bi bi-trash trash-icon"
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
              </td>
            </tr>

            <tr v-if="cartItems.length === 0">
              <td colspan="5" class="text-center py-5">
                <h5 class="text-secondary mb-3">Your cart is currently empty.</h5>
                <RouterLink to="/" class="btn btn-dark rounded-pill px-4"
                  >Continue Shopping</RouterLink
                >
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <div class="row g-5" v-if="cartItems.length > 0">
        <div class="col-lg-6">
          <h5 class="fw-bold text-dark mb-3">Coupon Code</h5>
          <p class="text-primary mb-3">Enter your coupon code if you have one.</p>
          <div class="input-group mb-3" style="max-width: 400px">
            <input
              type="text"
              class="form-control p-3 border-secondary-subtle"
              placeholder="Coupon Code"
              aria-label="Coupon Code"
            />
            <button class="btn btn-apply px-4 fw-bold" type="button">Apply Coupon</button>
          </div>
        </div>

        <div class="col-lg-5 offset-lg-1">
          <div
            class="card border-0 rounded-4 shadow-sm"
            style="background-color: #fcfcfc; border: 1px solid #eee !important"
          >
            <div class="card-body p-4 p-lg-5">
              <h4 class="fw-bold mb-4 text-dark border-bottom pb-3">Cart Total</h4>

              <div class="d-flex justify-content-between mb-3">
                <span class="text-primary">Subtotal</span>
                <span class="fw-medium text-dark">${{ cartSubtotal.toFixed(2) }}</span>
              </div>

              <div class="d-flex justify-content-between mb-4 pb-4 border-bottom">
                <span class="text-primary">Shipping</span>
                <span class="text-end">
                  <span class="fw-medium text-dark d-block">Flat rate: $5.00</span>
                  <small class="text-primary">Shipping to Vietnam.</small>
                </span>
              </div>

              <div class="d-flex justify-content-between mb-5 align-items-center">
                <span class="fs-5 fw-bold text-dark">Total</span>
                <span class="fs-3 fw-bold" style="color: #f07c82"
                  >${{ (cartSubtotal + 5).toFixed(2) }}</span
                >
              </div>

              <RouterLink to="/checkout" class="btn btn-checkout w-100 rounded-3 fw-bold fs-5 p-3">
                PROCEED CHECKOUT
              </RouterLink>
            </div>
          </div>
        </div>
      </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed, onMounted, ref } from 'vue'
import { apiDelete, apiGet, apiPatch } from '@/lib/api'

const cartItems = ref([])
const loading = ref(false)
const error = ref('')
const subtotal = ref(0)

const loadCart = async () => {
  loading.value = true
  error.value = ''
  try {
    const data = await apiGet('/cart', { includeSession: true })
    cartItems.value = data.items ?? []
    subtotal.value = data.subtotal ?? 0
  } catch (e) {
    error.value = e instanceof Error ? e.message : 'Failed to load cart'
  } finally {
    loading.value = false
  }
}

const patchQty = async (bookId, quantity) => {
  await apiPatch(`/cart/items/${bookId}`, { body: { quantity }, includeSession: true })
  await loadCart()
}

const increase = async (item) => patchQty(item.id, item.quantity + 1)
const decrease = async (item) => {
  if (item.quantity > 1) await patchQty(item.id, item.quantity - 1)
}

const removeItem = async (bookId) => {
  await apiDelete(`/cart/items/${bookId}`, { includeSession: true })
  await loadCart()
}

const cartSubtotal = computed(() => subtotal.value)

onMounted(loadCart)
</script>

<style scoped>
/* CSS cho bộ đếm số lượng (Lấy từ trang chi tiết sản phẩm) */
.quantity-wrapper {
  height: 40px;
  width: 110px;
  border-color: #f07c82 !important;
}
.qty-input {
  width: 40px;
  background-color: #ffffff !important;
  color: #000000 !important;
  box-shadow: none !important;
  cursor: default;
}
.btn-qty {
  width: 35px;
  background-color: #f07c82 !important;
  color: #ffffff !important;
  font-size: 1.2rem;
  font-weight: bold;
  box-shadow: none !important;
  line-height: 1;
  transition: all 0.2s ease;
}
.btn-qty:hover {
  background-color: #222222 !important;
  color: #ffffff !important;
}

/* Nút xóa sản phẩm (Thùng rác) */
.btn-remove {
  background-color: #fefefe;
  border: 1px solid #dee2e6;
  color: #dc3545 !important; /* Ép màu đỏ cho icon */
  transition: all 0.3s ease;
}

/* Khi đưa chuột vào nút */
.btn-remove:hover {
  background-color: #dc3545 !important; /* Nền chuyển đỏ */
  border-color: #dc3545 !important;
  color: #ffffff !important; /* Thùng rác chuyển thành màu trắng */
  transform: translateY(-2px); /* Hơi nảy lên một chút */
  box-shadow: 0 4px 8px rgba(220, 53, 69, 0.2);
}

/* Nút Apply Coupon */
.btn-apply {
  background-color: #f07c82 !important;
  color: #fff !important;
  border: none;
  transition: all 0.3s ease;
}
.btn-apply:hover {
  background-color: #222222 !important;
}

/* Nút Proceed Checkout */
.btn-checkout {
  background-color: #f07c82 !important;
  color: #fff !important;
  border: none;
  transition: all 0.3s ease;
}
.btn-checkout:hover {
  background-color: #222222 !important;
  color: #fff !important;
}

/* Định dạng bảng */
.table th {
  text-transform: uppercase;
  font-size: 0.85rem;
  letter-spacing: 0.5px;
  color: #666;
}
</style>
