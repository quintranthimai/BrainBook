<template>
  <div class="success-page mt-5 py-5">
    <div class="container">

      <div class="row justify-content-center">
        <div class="col-12 col-md-10 col-lg-9 col-xl-8 text-center">

          <div v-if="loading" class="py-5 my-5">
            <div class="spinner-border text-primary" role="status"></div>
            <p class="mt-3 text-muted">Retrieving your order details...</p>
          </div>

          <div v-else-if="error" class="card border-0 shadow-sm rounded-4 p-5 text-center">
            <div class="text-danger mb-3">
              <svg xmlns="http://www.w3.org/2000/svg" width="60" height="60" fill="currentColor" class="bi bi-exclamation-triangle-fill" viewBox="0 0 16 16">
                <path d="M8.982 1.566a1.13 1.13 0 0 0-1.96 0L.165 13.233c-.457.778.091 1.767.98 1.767h13.713c.889 0 1.438-.99.98-1.767L8.982 1.566zM8 5c.535 0 .954.462.9.995l-.35 3.507a.552.552 0 0 1-1.1 0L7.1 5.995A.905.905 0 0 1 8 5zm.002 6a1 1 0 1 1 0 2 1 1 0 0 1 0-2z"/>
              </svg>
            </div>
            <h4 class="fw-bold mb-3">Oops!</h4>
            <p class="text-dark">{{ error }}</p>
            <RouterLink to="/shop" class="btn btn-dark rounded-pill px-4 mt-3">Return to Shop</RouterLink>
          </div>

          <div v-else class="card border-0 shadow-sm rounded-4 p-4 p-md-5" style="background-color: #fcfcfc">

            <div class="mb-4">
              <svg v-if="order.paymentMethod === 'COD'" xmlns="http://www.w3.org/2000/svg" width="80" height="80" fill="#28a745" class="bi bi-check-circle-fill" viewBox="0 0 16 16">
                <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zm-3.97-3.03a.75.75 0 0 0-1.08.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-.01-1.05z"/>
              </svg>
              <svg v-else xmlns="http://www.w3.org/2000/svg" width="80" height="80" fill="#f07c82" class="bi bi-info-circle-fill" viewBox="0 0 16 16">
                <path d="M8 16A8 8 0 1 0 8 0a8 8 0 0 0 0 16zm.93-9.412-1 4.705c-.07.34.029.533.304.533.194 0 .487-.07.686-.246l-.088.416c-.287.346-.92.598-1.465.598-.703 0-1.002-.422-.808-1.319l.738-3.468c.064-.293.006-.399-.287-.47l-.451-.081.082-.381 2.29-.287zM8 5.5a1 1 0 1 1 0-2 1 1 0 0 1 0 2z"/>
              </svg>
            </div>

            <h3 class="fw-bold mb-4" :class="order.paymentMethod === 'COD' ? 'text-success' : 'text-primary'">
              {{ order.paymentMethod === 'COD' ? 'Order Placed Successfully!' : 'Action Required' }}
            </h3>

            <p class="fs-5 text-dark mb-1">
              Hello: <strong>{{ order.customerFirstName }} {{ order.customerLastName }}</strong>
            </p>
            <p class="fs-5 text-dark mb-1">
              Order ID: <strong style="color: #f07c82">{{ order.orderNumber }}</strong>
            </p>
            <p class="fs-5 text-dark mb-4">
              Total Amount: <strong>${{ order.total.toFixed(2) }}</strong>
            </p>

            <div v-if="order.paymentMethod === 'COD'">
              <p class="text-primary mb-4 bg-light p-3 rounded-3 border">
                Thank you for shopping at BrainBook.<br />
                Your order has been received and you will pay in cash upon delivery.
              </p>
            </div>

            <div v-else-if="order.paymentMethod === 'BANK_TRANSFER'" class="text-start bg-light p-4 rounded-4 mb-4 border shadow-sm">
              <h5 class="mb-4 text-danger fw-bold text-center">Please scan the QR code to pay</h5>

              <div class="row align-items-center justify-content-center gx-lg-5 gy-4">

                <div class="col-12 col-lg-5 text-center">
                  <img :src="`https://img.vietqr.io/image/vietcombank-1023456789-compact2.png?amount=${Math.round(order.total * 25400)}&addInfo=${order.orderNumber}&accountName=BRAINBOOK STORE`"
                       alt="QR Code Thanh Toán"
                       class="img-fluid rounded-4 shadow border p-2 bg-white"
                       style="max-width: 250px;">
                </div>

                <div class="col-12 col-lg-7">
                  <div class="bg-white p-3 p-md-4 rounded-4 shadow-sm border">
                    <ul class="list-unstyled mb-0 text-dark">

                      <li class="d-flex justify-content-between align-items-start border-bottom pb-2 mb-2 gap-3">
                        <span class="fw-medium text-primary text-nowrap">Bank:</span>
                        <strong class="text-end text-break">Vietcombank</strong>
                      </li>

                      <li class="d-flex justify-content-between align-items-start border-bottom pb-2 mb-2 gap-3">
                        <span class="fw-medium text-primary text-nowrap">Account Name:</span>
                        <strong class="text-end text-break">BRAINBOOK STORE</strong>
                      </li>

                      <li class="d-flex justify-content-between align-items-start border-bottom pb-2 mb-2 gap-3">
                        <span class="fw-medium text-primary text-nowrap">Account No:</span>
                        <strong class="fs-5 text-primary text-end text-break">1023456789</strong>
                      </li>

                      <li class="d-flex justify-content-between align-items-start border-bottom pb-2 mb-2 gap-3">
                        <span class="fw-medium text-primary text-nowrap">Amount:</span>
                        <strong class="fs-5 text-danger text-end text-break">
                          {{ new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(order.total * 25400) }}
                        </strong>
                      </li>

                      <li class="mt-3 text-center text-lg-start">
                        <span class="fw-medium text-primary d-block mb-2">Transfer Message (Important):</span>
                        <strong class="bg-primary px-4 py-2 rounded-3 d-inline-block fs-5 text-white border shadow-sm">{{ order.orderNumber }}</strong>
                      </li>

                    </ul>
                  </div>
                </div>
              </div>

              <div class="alert alert-info mt-4 mb-0 text-center" role="alert">
                <small>
                  <i class="bi bi-info-circle-fill me-1"></i>
                  The QR code already includes the exact amount and transfer message. Just scan and confirm!
                </small>
              </div>
            </div>

            <div v-else-if="order.paymentMethod === 'PAYPAL'" class="mb-4 bg-light p-4 rounded-3 border">
              <p class="text-dark mb-3">Please click the button below to pay securely via PayPal.</p>
              <button @click="payWithPaypal" class="btn btn-lg rounded-pill px-5 text-white w-100 fw-bold shadow-sm" style="background-color: #0070ba">
                Pay with PayPal
              </button>
            </div>

            <hr class="mb-4 mx-auto" style="border-color: #ddd; width: 80%" />

            <div class="text-dark mb-4">
              <p class="mb-1">Support Phone: <strong>(+84) 123 456 789</strong></p>
              <p class="mb-0">Support Email: <strong>hello@brainbook.com</strong></p>
            </div>

            <div>
              <RouterLink to="/" class="btn rounded-pill px-4 py-2 text-white fw-bold btn-home" style="background-color: #f07c82; font-size: 1.05rem">
                Return to Homepage
                <span v-if="order.paymentMethod === 'COD'">({{ countdown }}s)</span>
              </RouterLink>
            </div>

          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { apiGet } from '@/lib/api'

const router = useRouter()
const route = useRoute()

const order = ref(null)
const loading = ref(true)
const error = ref('')

const countdown = ref(15)
let timer = null

onMounted(async () => {
  // Lấy mã đơn hàng từ thanh URL (vd: /success?ref=ORD-123456)
  const orderNumber = route.query.ref

  if (!orderNumber) {
    error.value = 'Order reference not found in URL.'
    loading.value = false
    return
  }

  try {
    // Gọi API Backend để lấy chi tiết đơn hàng
    order.value = await apiGet('/orders/lookup', {
      params: { orderNumber },
    })

    // Chỉ tự động đếm ngược & chuyển trang nếu là đơn COD
    // Đối với Bank/Paypal, người dùng cần thời gian thao tác nên không đếm ngược
    if (order.value.paymentMethod === 'COD') {
      startCountdown()
    }
  } catch (err) {
    console.error('Error loading order:', err)
    error.value = 'Unable to retrieve order details. The order may not exist or has been deleted.'
  } finally {
    loading.value = false
  }
})

const startCountdown = () => {
  timer = setInterval(() => {
    countdown.value--
    if (countdown.value <= 0) {
      clearInterval(timer)
      router.push('/')
    }
  }, 1000)
}

const payWithPaypal = () => {
  alert('Redirecting to PayPal Gateway...')
  // Trong thực tế, bạn sẽ dùng order.value.checkoutUrl (do backend trả về) để chuyển hướng
  // window.location.href = 'https://paypal.com/checkout?token=...';
}

onUnmounted(() => {
  if (timer) clearInterval(timer)
})
</script>

<style scoped>
.btn-home {
  transition: all 0.3s ease;
  box-shadow: 0 4px 6px rgba(240, 124, 130, 0.3);
}

.btn-home:hover {
  background-color: #222222 !important;
  box-shadow: 0 6px 12px rgba(34, 34, 34, 0.3);
  color: white !important;
}
</style>
