<template>
  <div class="checkout-page mt-5 py-5">
    <div class="container">
      <div class="text-center mb-5">
        <h2 class="display-6 fw-bold text-primary">Checkout</h2>
        <p class="text-dark">Please fill in your details to complete your order.</p>
      </div>

      <div v-if="loading" class="text-center py-5">
        <div class="spinner-border text-primary" role="status"></div>
      </div>
      <div v-else-if="error" class="alert alert-danger" role="alert">{{ error }}</div>
      <div v-else>
        <form @submit.prevent="placeOrder">
          <div class="row g-5">
            <div class="col-lg-7">
              <h4 class="fw-bold mb-4 text-primary border-bottom pb-2">Billing Details</h4>

              <div class="row">
                <div class="col-md-6 mb-3">
                  <label class="form-label fw-medium text-primary">First Name <span class="text-danger">*</span></label>
                  <input v-model="form.customerFirstName" type="text" class="form-control p-3 rounded-3 custom-input" required />
                </div>
                <div class="col-md-6 mb-3">
                  <label class="form-label fw-medium text-primary">Last Name <span class="text-danger">*</span></label>
                  <input v-model="form.customerLastName" type="text" class="form-control p-3 rounded-3 custom-input" required />
                </div>
              </div>

              <div class="row">
                <div class="col-md-6 mb-3">
                  <label class="form-label fw-medium text-primary">Email Address <span class="text-danger">*</span></label>
                  <input v-model="form.customerEmail" type="email" class="form-control p-3 rounded-3 custom-input" required />
                </div>
                <div class="col-md-6 mb-3">
                  <label class="form-label fw-medium text-primary">Phone Number <span class="text-danger">*</span></label>
                  <input v-model="form.customerPhone" type="tel" class="form-control p-3 rounded-3 custom-input" required />
                </div>
              </div>

              <div class="row mb-3">
                <div class="col-md-6 mb-3">
                  <label class="form-label fw-medium text-primary">Country <span class="text-danger">*</span></label>
                  <select v-model="form.countryCode" class="form-select p-3 rounded-3 custom-input" required>
                    <option value="" disabled>Select a country...</option>
                    <option value="VN">Vietnam</option>
                    <option value="US">United States</option>
                  </select>
                </div>
                <div class="col-md-6 mb-3">
                  <label class="form-label fw-medium text-primary">Town / City <span class="text-danger">*</span></label>
                  <input v-model="form.city" type="text" class="form-control p-3 rounded-3 custom-input" required />
                </div>
              </div>

              <div class="mb-3">
                <label class="form-label fw-medium text-primary">Street Address <span class="text-danger">*</span></label>
                <input v-model="form.addressLine1" type="text" class="form-control p-3 rounded-3 custom-input mb-2" placeholder="House number and street name" required />
                <input v-model="form.addressLine2" type="text" class="form-control p-3 rounded-3 custom-input" placeholder="Apartment, suite, unit, etc. (optional)" />
              </div>

              <div class="mb-5">
                <label class="form-label fw-medium text-primary">Order Notes (optional)</label>
                <textarea v-model="form.orderNotes" class="form-control p-3 rounded-3 custom-input" rows="4" placeholder="Notes about your order."></textarea>
              </div>

              <h4 class="fw-bold mb-4 text-primary border-bottom pb-2">Payment Method</h4>
              <div class="payment-methods bg-light p-4 rounded-3 border">
                <div class="form-check mb-3 p-3 rounded-3">
                  <input v-model="form.paymentMethod" class="form-check-input custom-radio" type="radio" name="paymentMethod" id="cod" value="COD" />
                  <label class="form-check-label fw-bold text-dark fs-5" for="cod">Cash on Delivery (COD)</label>
                </div>
                <div class="form-check p-3 rounded-3">
                  <input v-model="form.paymentMethod" class="form-check-input custom-radio" type="radio" name="paymentMethod" id="paypal" value="PAYPAL" />
                  <label class="form-check-label fw-bold text-dark fs-5" for="paypal">PayPal / Credit Card</label>
                </div>
              </div>
            </div>

            <div class="col-lg-5">
              <div class="order-summary card border-0 rounded-4 shadow-sm" style="background-color: #fcfcfc; border: 1px solid #eee !important">
                <div class="card-body p-4 p-lg-5">
                  <h4 class="fw-bold mb-4 text-primary border-bottom pb-3">Your Order</h4>

                  <div v-for="item in cart.items" :key="item.id" class="d-flex justify-content-between align-items-center mb-3">
                    <div class="d-flex align-items-center">
                      <img :src="item.image" alt="Book" width="50" class="rounded-2 border" />
                      <div class="ms-3">
                        <h6 class="mb-0 fw-bold text-dark">{{ item.name }}</h6>
                        <small class="text-primary">Qty: {{ item.quantity }}</small>
                      </div>
                    </div>
                    <span class="fw-medium text-dark">${{ (item.price * item.quantity).toFixed(2) }}</span>
                  </div>

                  <!-- Coupon Section -->
                  <div class="coupon-section mt-4 mb-4">
                    <label class="form-label small fw-bold text-primary text-uppercase">Have a coupon?</label>
                    <div class="input-group">
                      <input v-model="couponInput" type="text" class="form-control" placeholder="Enter code" :disabled="appliedCoupon" />
                      <button v-if="!appliedCoupon" @click="applyCoupon" class="btn btn-outline-primary" type="button" :disabled="validatingCoupon">
                        {{ validatingCoupon ? '...' : 'Apply' }}
                      </button>
                      <button v-else @click="removeCoupon" class="btn btn-outline-danger" type="button">Remove</button>
                    </div>
                    <small v-if="appliedCoupon" class="text-success fw-bold mt-1 d-block">
                      Coupon "{{ appliedCoupon.code }}" applied!
                    </small>
                  </div>

                  <div class="border-top border-bottom py-3 mb-4">
                    <div class="d-flex justify-content-between mb-2">
                      <span class="text-primary">Subtotal</span>
                      <span class="fw-medium text-dark">${{ cartSubtotal.toFixed(2) }}</span>
                    </div>
                    <div v-if="discountAmount > 0" class="d-flex justify-content-between mb-2 text-success fw-bold">
                      <span>Discount</span>
                      <span>-${{ discountAmount.toFixed(2) }}</span>
                    </div>
                    <div class="d-flex justify-content-between">
                      <span class="text-primary">Shipping</span>
                      <span class="fw-medium text-dark">${{ shippingAmount.toFixed(2) }}</span>
                    </div>
                  </div>

                  <div class="d-flex justify-content-between mb-5 align-items-end">
                    <span class="fs-5 fw-bold text-primary">Total</span>
                    <span class="fs-3 fw-bold" style="color: #f07c82 !important">${{ cartTotal.toFixed(2) }}</span>
                  </div>

                  <button type="submit" class="btn btn-place-order w-100 rounded-3 fw-bold fs-5" :disabled="isProcessing">
                    <span v-if="!isProcessing">Place Order</span>
                    <span v-else>Processing...</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed, onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'
import { apiGet, apiPost, apiDelete } from '@/lib/api'
import { toast } from 'vue3-toastify'

const router = useRouter()
const isProcessing = ref(false)
const loading = ref(false)
const error = ref('')

const cart = ref({ items: [], subtotal: 0 })
const couponInput = ref('')
const validatingCoupon = ref(false)
const appliedCoupon = ref(null)

const shippingAmount = computed(() => 5)
const cartSubtotal = computed(() => cart.value?.subtotal ?? 0)

const discountAmount = computed(() => {
  if (!appliedCoupon.value) return 0
  const sub = cartSubtotal.value
  if (appliedCoupon.value.type === 'PERCENT') {
    return (sub * Number(appliedCoupon.value.value)) / 100
  }
  return Math.min(sub, Number(appliedCoupon.value.value))
})

const cartTotal = computed(() => {
  return Math.max(0, cartSubtotal.value - discountAmount.value + shippingAmount.value)
})

const form = ref({
  paymentMethod: 'COD',
  customerFirstName: '',
  customerLastName: '',
  customerEmail: '',
  customerPhone: '',
  countryCode: 'VN',
  city: '',
  addressLine1: '',
  addressLine2: '',
  orderNotes: '',
})

const loadCart = async () => {
  loading.value = true
  try {
    cart.value = await apiGet('/cart', { includeSession: true })
  } catch (e) {
    error.value = 'Failed to load cart'
  } finally {
    loading.value = false
  }
}

const applyCoupon = async () => {
  if (!couponInput.value) return
  validatingCoupon.value = true
  try {
    const res = await apiGet(`/coupons/validate?code=${couponInput.value}&subtotal=${cartSubtotal.value}`)
    appliedCoupon.value = res
    toast.success('Coupon applied!')
  } catch (e) {
    toast.error(e.message || 'Invalid coupon')
  } finally {
    validatingCoupon.value = false
  }
}

const removeCoupon = () => {
  appliedCoupon.value = null
  couponInput.value = ''
}

const placeOrder = async () => {
  if (isProcessing.value) return
  isProcessing.value = true

  try {
    const items = (cart.value.items ?? []).map((i) => ({ bookId: i.id, quantity: i.quantity }))
    if (!items.length) throw new Error('Cart is empty!')

    const payload = {
      ...form.value,
      items,
      shippingAmount: shippingAmount.value,
      shippingLabel: 'Standard Shipping',
      couponCode: appliedCoupon.value?.code || undefined,
    }

    const orderResponse = await apiPost('/orders', { body: payload })
    const orderNumber = orderResponse.orderNumber

    // Clear cart
    for (const item of items) {
      await apiDelete(`/cart/items/${item.bookId}`)
    }

    router.push(`/success?ref=${orderNumber}`)
  } catch (e) {
    toast.error(e.message || 'Failed to place order')
  } finally {
    isProcessing.value = false
  }
}

onMounted(loadCart)
</script>

<style scoped>
.custom-input:focus {
  border-color: #f07c82;
  box-shadow: 0 0 0 0.25rem rgba(240, 124, 130, 0.25);
}
.custom-radio:checked {
  background-color: #f07c82;
  border-color: #f07c82;
}
.btn-place-order {
  height: 55px;
  background-color: #f07c82 !important;
  color: #fff !important;
  border: none !important;
}
.btn-place-order:hover:not(:disabled) {
  background-color: #222222 !important;
}
</style>
