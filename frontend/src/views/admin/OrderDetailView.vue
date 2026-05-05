<template>
  <main id="content" class="content py-10">
    <div class="container-fluid">
      <div class="row">
        <div class="col-12">
          <div class="d-flex flex-column flex-md-row justify-content-between align-items-md-center mb-4 gap-3">
            <div>
              <h1 class="fs-3 mb-1 fw-bold text-primary">Đơn hàng #{{ orderNumber }}</h1>
              <div v-if="order" class="text-secondary small">
                {{ getPaymentMethodText(order.paymentMethod) }}
                <span v-if="orderStatus === 'CANCELLED'" class="badge bg-danger ms-2">ĐÃ HỦY</span>
              </div>
            </div>

            <div class="d-flex gap-2 flex-wrap">
              <button type="button" class="btn btn-outline-secondary">
                <i class="ti ti-printer"></i> In
              </button>
              <button
                type="button"
                class="btn btn-outline-secondary"
                :disabled="loading || !order || paymentStatus === 'REFUNDED'"
                @click="handleRefund"
              >
                <i class="ti ti-rotate"></i> Hoàn tiền
              </button>
              <div class="dropdown">
                <button
                  type="button"
                  class="btn btn-outline-secondary dropdown-toggle"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                  :disabled="loading || !order"
                >
                  Thao tác khác
                </button>
                <ul class="dropdown-menu dropdown-menu-end">
                  <li><a class="dropdown-item" href="#">Nhân bản</a></li>
                  <li><a class="dropdown-item" href="#">Lưu trữ</a></li>
                  <li><hr class="dropdown-divider"></li>
                  <li>
                    <a class="dropdown-item text-danger" href="#"
                       @click.prevent="handleCancelOrder"
                       :class="{'disabled': orderStatus === 'CANCELLED'}"
                    >
                      <i class="ti ti-trash"></i> Hủy đơn hàng
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="row g-3">
        <div class="col-12 col-lg-8">
          <div v-if="loading" class="card mb-3">
            <div class="card-body p-4 text-center">
              <div class="spinner-border text-primary" role="status">
                <span class="visually-hidden">Loading...</span>
              </div>
            </div>
          </div>

          <div v-else-if="error" class="card mb-3">
            <div class="card-body p-4 text-danger">{{ error }}</div>
          </div>

          <div class="card table-responsive">
            <table class="table mb-0 text-nowrap table-hover">
              <thead class="table-light border-light">
                <tr>
                  <th>Sản phẩm</th>
                  <th class="text-end">Giá</th>
                  <th class="text-end">Số lượng</th>
                  <th class="text-end">Tổng</th>
                </tr>
              </thead>
              <tbody>
                <tr v-if="!order || order.items.length === 0">
                  <td colspan="4" class="py-4 text-center text-muted">Không có sản phẩm.</td>
                </tr>

                <tr
                  v-for="item in order?.items || []"
                  :key="`${item.title}-${item.author}-${item.unitPrice}-${item.quantity}`"
                  class="align-middle"
                >
                  <td>
                    <div class="d-flex align-items-center gap-3">
                      <img
                        :src="item.imageUrl || '/admin-assets/assets/images/product-1.png'"
                        :alt="item.title"
                        class="avatar avatar-md rounded"
                      />
                      <div>
                        <a href="#" class="link-primary text-decoration-none fw-bold"> {{ item.title }} </a>
                        <div class="text-secondary small">{{ item.author }}</div>
                      </div>
                    </div>
                  </td>
                  <td class="text-end">${{ formatMoney(item.unitPrice) }}</td>
                  <td class="text-end">{{ item.quantity }}</td>
                  <td class="text-end fw-semibold">${{ formatMoney(item.lineTotal) }}</td>
                </tr>
              </tbody>
              <tfoot>
                <tr>
                  <td class="border-bottom-0" colspan="3">
                    <span class="fw-semibold">Tạm tính sản phẩm:</span>
                  </td>
                  <td class="border-bottom-0 text-end fw-semibold">${{ formatMoney(subtotal) }}</td>
                </tr>
              </tfoot>
            </table>
          </div>

          <div class="row g-3 mt-1">
            <div class="col-12 col-md-4">
              <div class="card h-100">
                <div class="card-body p-4">
                  <h2 class="fs-5 mb-3">Thông tin thanh toán</h2>
                  <ul class="list-unstyled mb-0 small">
                    <li class="mb-2">
                      <span class="text-secondary">Tên:</span> {{ order?.customerFirstName || '-' }}
                    </li>
                    <li class="mb-2">
                      <span class="text-secondary">Họ:</span> {{ order?.customerLastName || '-' }}
                    </li>
                    <li class="mb-2">
                      <span class="text-secondary">Email:</span>
                      <a href="#" class="link-primary text-decoration-none">{{
                        order?.customerEmail || '-'
                      }}</a>
                    </li>
                    <li class="mb-2">
                      <span class="text-secondary">Số điện thoại:</span>
                      {{ order?.customerPhone || '-' }}
                    </li>
                    <li class="mb-2">
                      <span class="text-secondary">Quốc gia:</span> {{ order?.countryCode || '-' }}
                    </li>
                    <li class="mb-2">
                      <span class="text-secondary">Tỉnh / Thành phố:</span> {{ order?.city || '-' }}
                    </li>
                    <li class="mb-0">
                      <span class="text-secondary">Địa chỉ:</span>
                      {{ formatAddress(order) }}
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            <div class="col-12 col-md-4">
              <div class="card h-100">
                <div class="card-body p-4">
                  <h2 class="fs-5 mb-3">Thông tin giao hàng</h2>
                  <ul class="list-unstyled mb-0 small">
                    <li class="mb-2">
                      <span class="text-secondary">Tên:</span> {{ order?.customerFirstName || '-' }}
                    </li>
                    <li class="mb-2">
                      <span class="text-secondary">Họ:</span> {{ order?.customerLastName || '-' }}
                    </li>
                    <li class="mb-2">
                      <span class="text-secondary">Email:</span>
                      <a href="#" class="link-primary text-decoration-none">{{
                        order?.customerEmail || '-'
                      }}</a>
                    </li>
                    <li class="mb-2">
                      <span class="text-secondary">Số điện thoại:</span>
                      {{ order?.customerPhone || '-' }}
                    </li>
                    <li class="mb-2">
                      <span class="text-secondary">Quốc gia:</span> {{ order?.countryCode || '-' }}
                    </li>
                    <li class="mb-2">
                      <span class="text-secondary">Tỉnh / Thành phố:</span> {{ order?.city || '-' }}
                    </li>
                    <li class="mb-0">
                      <span class="text-secondary">Địa chỉ:</span>
                      {{ formatAddress(order) }}
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            <div class="col-12 col-md-4">
              <div class="card h-100">
                <div class="card-body p-4">
                  <h2 class="fs-5 mb-3">Thông tin khác</h2>
                  <ul class="list-unstyled mb-0 small">
                    <li class="mb-2">
                      <span class="text-secondary">Ghi chú đơn hàng:</span>
                      <br/>
                      {{ order?.orderNotes || 'Không có ghi chú' }}
                    </li>
                    <li class="mb-0">
                      <span class="text-secondary">Phương thức:</span>
                      <br/>
                      <span class="badge bg-light text-dark border mt-1">
                        {{ order ? getPaymentMethodText(order.paymentMethod) : '-' }}
                      </span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="col-12 col-lg-4">
          <div class="card mb-3">
            <div class="card-body p-4">
              <h2 class="fs-5 mb-3">Tóm tắt</h2>
              <div class="d-flex justify-content-between mb-2 small">
                <span class="text-secondary">Tạm tính sản phẩm:</span>
                <span class="fw-semibold">${{ formatMoney(subtotal) }}</span>
              </div>
              <div class="d-flex justify-content-between mb-2 small">
                <span class="text-secondary">Giảm giá:</span>
                <span class="text-danger fw-semibold">-${{ formatMoney(discount) }}</span>
              </div>
              <div class="d-flex justify-content-between mb-2 small">
                <span class="text-secondary">Thuế:</span>
                <span class="fw-semibold">${{ formatMoney(tax) }}</span>
              </div>
              <div class="d-flex justify-content-between mb-2 small">
                <span class="text-secondary">Phí vận chuyển:</span>
                <span class="fw-semibold">${{ formatMoney(shippingAmount) }}</span>
              </div>
              <hr class="my-3" />
              <div class="d-flex justify-content-between align-items-center">
                <span class="fw-semibold">Tổng cộng:</span>
                <span class="fs-4 fw-bold text-primary">${{ formatMoney(total) }}</span>
              </div>
            </div>
          </div>

          <div class="card">
            <div class="card-body p-4">
              <h2 class="fs-5 mb-3">Trạng thái đơn hàng</h2>

              <div class="mb-3">
                <label class="form-label small text-secondary">Trạng thái thanh toán</label>
                <select
                  class="form-select"
                  v-model="paymentStatus"
                  :disabled="!order || loading || orderStatus === 'CANCELLED'"
                  @change="persistPaymentStatus"
                >
                  <option value="PENDING">Chờ xử lý</option>
                  <option value="AUTHORIZED">Đã xác thực</option>
                  <option value="CAPTURED">Hoàn tất (Đã thu tiền)</option>
                  <option value="FAILED">Thất bại</option>
                  <option value="REFUNDED">Đã hoàn tiền</option>
                  <option value="PARTIALLY_REFUNDED">Hoàn tiền một phần</option>
                </select>
              </div>

              <div>
                <label class="form-label small text-secondary">Trạng thái giao hàng</label>
                <select
                  class="form-select"
                  v-model="orderStatus"
                  :disabled="!order || loading || orderStatus === 'CANCELLED'"
                  @change="persistOrderStatus"
                >
                  <option value="PENDING">Chờ xác nhận</option>
                  <option value="PAID">Đã thanh toán</option>
                  <option value="PROCESSING">Đang chuẩn bị hàng</option>
                  <option value="SHIPPED">Đang giao hàng (Shipped)</option>
                  <option value="DELIVERED">Đã giao thành công</option>
                  <option value="CANCELLED">Đã hủy</option>
                </select>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </main>
</template>

<script setup>
import { computed, onMounted, ref } from 'vue'
import { useRoute } from 'vue-router'
import { toast } from 'vue3-toastify'
import { getOrderDetail, updateOrderStatus, updatePaymentStatus } from '@/services/ordersService'

defineOptions({ name: 'OrderDetailView' })

const route = useRoute()
const orderNumber = computed(() => String(route.params.id ?? ''))

const order = ref(null)
const loading = ref(false)
const error = ref('')

const paymentStatus = ref('PENDING')
const orderStatus = ref('PENDING')

const subtotal = computed(() => Number(order.value?.subtotal ?? 0))
const shippingAmount = computed(() => Number(order.value?.shippingAmount ?? 0))
const total = computed(() => Number(order.value?.total ?? 0))
const tax = computed(() => 0)
const discount = computed(() => {
  const raw = subtotal.value + shippingAmount.value - total.value
  return raw > 0 ? raw : 0
})

function formatMoney(value) {
  const number = Number(value ?? 0)
  return number.toFixed(2)
}

function formatAddress(o) {
  if (!o) return '-'
  const parts = [o.addressLine1, o.addressLine2].filter(Boolean)
  return parts.join(', ')
}

function getPaymentMethodText(method) {
  const map = {
    COD: 'Thanh toán khi nhận hàng (COD)',
    BANK_TRANSFER: 'Chuyển khoản ngân hàng',
    PAYPAL: 'PayPal / Thẻ tín dụng',
  }
  return map[method] || method || '-'
}

async function load() {
  if (!orderNumber.value) return
  loading.value = true
  error.value = ''

  try {
    const data = await getOrderDetail(orderNumber.value)
    order.value = data
    const latestPayment = Array.isArray(data?.payments) ? data.payments[0] : null
    paymentStatus.value = latestPayment?.status || 'PENDING'
    orderStatus.value = data?.status || 'PENDING'
  } catch (exception) {
    error.value = exception instanceof Error ? exception.message : 'Không tải được đơn hàng'
    order.value = null
  } finally {
    loading.value = false
  }
}

async function persistOrderStatus() {
  if (!orderNumber.value) return
  try {
    await updateOrderStatus(orderNumber.value, orderStatus.value)
    toast.success('Đã cập nhật trạng thái đơn hàng')
  } catch (exception) {
    toast.error(exception instanceof Error ? exception.message : 'Cập nhật thất bại')
  }
}

async function persistPaymentStatus() {
  if (!orderNumber.value) return
  try {
    await updatePaymentStatus(orderNumber.value, paymentStatus.value)
    toast.success('Đã cập nhật trạng thái thanh toán')
  } catch (exception) {
    toast.error(exception instanceof Error ? exception.message : 'Cập nhật thất bại')
  }
}

// HÀM MỚI: Xử lý khi Admin ấn nút Hủy đơn trên Dropdown
async function handleCancelOrder() {
  if (confirm(`Hủy vĩnh viễn đơn hàng #${orderNumber.value}? Hành động này sẽ khóa đơn hàng.`)) {
    try {
      orderStatus.value = 'CANCELLED'
      await persistOrderStatus()
    } catch (e) {
      // Revert if failed
      orderStatus.value = order.value?.status || 'PENDING'
    }
  }
}

async function handleRefund() {
  if (confirm(`Xác nhận Hoàn tiền cho đơn hàng #${orderNumber.value}?`)) {
    paymentStatus.value = 'REFUNDED'
    await persistPaymentStatus()
  }
}

onMounted(load)
</script>
