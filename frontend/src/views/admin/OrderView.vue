<template>
  <main id="content" class="content py-10">
    <div class="container-fluid">
      <div class="row">
        <div class="col-12">
          <div
            class="d-flex flex-column flex-md-row justify-content-between align-items-md-center mb-4 gap-3"
          >
            <div>
              <h1 class="fs-3 mb-1 fw-bold text-primary">Đơn hàng</h1>
            </div>
            <div class="d-flex gap-2">
              <button type="button" class="btn btn-outline-secondary">
                <i class="ti ti-file-export"></i> Xuất
              </button>
              <button type="button" class="btn btn-primary">
                <i class="ti ti-plus"></i> Thêm đơn hàng
              </button>
            </div>
          </div>
        </div>
      </div>

      <div class="row">
        <div class="col-12">
          <ul class="nav nav-tabs mb-3">
            <li class="nav-item">
              <a
                class="nav-link"
                :class="{ active: activeTab === 'all' }"
                href="#"
                @click.prevent="setTab('all')"
                >Tất cả</a
              >
            </li>
            <li class="nav-item">
              <a
                class="nav-link"
                :class="{ active: activeTab === 'pending_payment' }"
                href="#"
                @click.prevent="setTab('pending_payment')"
                >Chờ thanh toán</a
              >
            </li>
            <li class="nav-item">
              <a
                class="nav-link"
                :class="{ active: activeTab === 'incomplete' }"
                href="#"
                @click.prevent="setTab('incomplete')"
                >Chưa hoàn tất</a
              >
            </li>
            <li class="nav-item">
              <a
                class="nav-link"
                :class="{ active: activeTab === 'completed' }"
                href="#"
                @click.prevent="setTab('completed')"
                >Hoàn tất</a
              >
            </li>
            <li class="nav-item">
              <a
                class="nav-link"
                :class="{ active: activeTab === 'refunded' }"
                href="#"
                @click.prevent="setTab('refunded')"
                >Hoàn tiền</a
              >
            </li>
            <li class="nav-item">
              <a
                class="nav-link"
                :class="{ active: activeTab === 'failed' }"
                href="#"
                @click.prevent="setTab('failed')"
                >Thất bại</a
              >
            </li>
          </ul>

          <div class="row g-2 mb-3 align-items-center">
            <div class="col-12 col-md-4 col-lg-3">
              <div class="input-group">
                <span class="input-group-text bg-white">
                  <i class="ti ti-search"></i>
                </span>
                <input
                  v-model="searchText"
                  type="text"
                  class="form-control"
                  placeholder="Tìm kiếm đơn hàng..."
                />
              </div>
            </div>

            <div class="col-12 col-md">
              <div class="d-flex gap-2 justify-content-md-end flex-wrap">
                <div class="dropdown">
                  <button
                    class="btn btn-outline-secondary dropdown-toggle"
                    type="button"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                  >
                    {{ selectedPaymentMethodLabel }}
                  </button>
                  <ul class="dropdown-menu">
                    <li>
                      <a class="dropdown-item" href="#" @click.prevent="setPaymentMethod('')"
                        >Tất cả</a
                      >
                    </li>
                    <li>
                      <a class="dropdown-item" href="#" @click.prevent="setPaymentMethod('COD')"
                        >Thanh toán khi nhận hàng (COD)</a
                      >
                    </li>
                    <li>
                      <a
                        class="dropdown-item"
                        href="#"
                        @click.prevent="setPaymentMethod('BANK_TRANSFER')"
                        >Chuyển khoản ngân hàng</a
                      >
                    </li>
                    <li>
                      <a class="dropdown-item" href="#" @click.prevent="setPaymentMethod('PAYPAL')"
                        >PayPal / Thẻ tín dụng</a
                      >
                    </li>
                  </ul>
                </div>

                <div class="dropdown">
                  <button
                    class="btn btn-outline-secondary dropdown-toggle"
                    type="button"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                  >
                    Bộ lọc khác
                  </button>
                  <ul class="dropdown-menu">
                    <li><a class="dropdown-item" href="#">Quốc gia</a></li>
                    <li><a class="dropdown-item" href="#">Tỉnh / Thành phố</a></li>
                    <li><a class="dropdown-item" href="#">Ngày</a></li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          <div class="card table-responsive">
            <div v-if="loading" class="text-center p-4">
              <div class="spinner-border text-primary" role="status">
                <span class="visually-hidden">Loading...</span>
              </div>
            </div>
            <table v-else class="table mb-0 text-nowrap table-hover">
              <thead class="table-light border-light">
                <tr>
                  <th>
                    <div class="form-check mb-0">
                      <input class="form-check-input" type="checkbox" aria-label="Chọn tất cả" />
                    </div>
                  </th>
                  <th>Đơn hàng</th>
                  <th>Tổng tiền</th>
                  <th>Trạng thái thanh toán</th>
                  <th>Trạng thái đơn hàng</th>
                  <th>Ngày</th>
                  <th>Thao tác</th>
                </tr>
              </thead>
              <tbody>
                <tr v-if="orders.length === 0">
                  <td colspan="7" class="text-center py-4 text-muted">Chưa có đơn hàng nào.</td>
                </tr>
                <tr
                  v-for="order in orders"
                  :key="order.id"
                  class="align-middle"
                  :class="{ 'opacity-50 bg-light': order.status === 'CANCELLED' }"
                >
                  <td>
                    <div class="form-check mb-0">
                      <input
                        class="form-check-input"
                        type="checkbox"
                        :aria-label="`Chọn đơn hàng ${order.orderNumber}`"
                      />
                    </div>
                  </td>
                  <td>
                    <RouterLink
                      :to="`/admin/orders/${order.orderNumber}`"
                      class="link-primary text-decoration-none fw-bold"
                    >
                      {{ order.orderNumber }}
                    </RouterLink>
                  </td>
                  <td class="fw-semibold">${{ order.total }}</td>
                  <td>
                    <span
                      class="badge"
                      :class="{
                        'text-bg-success': order.paymentStatus === 'CAPTURED',
                        'text-bg-warning': order.paymentStatus === 'PENDING',
                        'text-bg-danger':
                          order.paymentStatus === 'FAILED' ||
                          order.paymentStatus === 'REFUNDED' ||
                          order.paymentStatus === 'PARTIALLY_REFUNDED',
                        'text-bg-secondary': ![
                          'CAPTURED',
                          'AUTHORIZED',
                          'PENDING',
                          'FAILED',
                          'REFUNDED',
                          'PARTIALLY_REFUNDED',
                        ].includes(order.paymentStatus),
                      }"
                    >
                      {{ getPaymentStatusText(order.paymentStatus) }}
                    </span>
                  </td>
                  <td>
                    <span
                      class="badge"
                      :class="{
                        'text-bg-success': order.status === 'DELIVERED',
                        'text-bg-info': order.status === 'PROCESSING' || order.status === 'SHIPPED',
                        'text-bg-warning': order.status === 'PENDING',
                        'text-bg-danger': order.status === 'CANCELLED',
                        'text-bg-secondary': ![
                          'DELIVERED',
                          'PROCESSING',
                          'SHIPPED',
                          'PENDING',
                          'PAID',
                          'CANCELLED',
                        ].includes(order.status),
                      }"
                    >
                      {{ getOrderStatusText(order.status) }}
                    </span>
                  </td>
                  <td>{{ formatDate(order.createdAt) }}</td>
                  <td>
                    <RouterLink
                      :to="`/admin/orders/${order.orderNumber}`"
                      class="text-secondary"
                      title="Sửa đơn hàng"
                    >
                      <i class="ti ti-edit fs-5"></i>
                    </RouterLink>
                    <a
                      href="#"
                      class="link-danger ms-3"
                      title="Hủy đơn hàng"
                      @click.prevent="cancelOrder(order)"
                      :class="{ 'pe-none text-muted': order.status === 'CANCELLED' }"
                    >
                      <i class="ti ti-trash fs-5"></i>
                    </a>
                  </td>
                </tr>
              </tbody>
              <tfoot>
                <tr>
                  <td class="border-bottom-0" colspan="2">Tổng số: {{ orders.length }} đơn hàng</td>
                  <td colspan="5" class="border-bottom-0">
                    <nav aria-label="Điều hướng trang" class="d-flex justify-content-end">
                      <ul class="pagination mb-0">
                        <li class="page-item disabled">
                          <a class="page-link" href="#" tabindex="-1">Trước</a>
                        </li>
                        <li class="page-item active"><a class="page-link" href="#">1</a></li>
                        <li class="page-item disabled"><a class="page-link" href="#">Sau</a></li>
                      </ul>
                    </nav>
                  </td>
                </tr>
              </tfoot>
            </table>
          </div>
        </div>
      </div>
    </div>
  </main>
</template>

<script setup>
defineOptions({ name: 'OrderView' })

import { computed, onMounted, ref, watch } from 'vue'
import { RouterLink } from 'vue-router'
import { getOrders, updateOrderStatus } from '@/services/ordersService'
import { toast } from 'vue3-toastify'

const orders = ref([])
const allOrders = ref([])
const loading = ref(false)

const activeTab = ref('all')
const searchText = ref('')
const selectedPaymentMethod = ref('')

const selectedPaymentMethodLabel = computed(() => {
  const map = {
    '': 'Phương thức thanh toán',
    COD: 'Thanh toán khi nhận hàng (COD)',
    BANK_TRANSFER: 'Chuyển khoản ngân hàng',
    PAYPAL: 'PayPal / Thẻ tín dụng',
  }
  return map[selectedPaymentMethod.value] || 'Phương thức thanh toán'
})

function setTab(tab) {
  activeTab.value = tab
}

function setPaymentMethod(method) {
  selectedPaymentMethod.value = method
}

const filteredOrders = computed(() => {
  const tab = activeTab.value
  const base = allOrders.value

  if (tab === 'pending_payment') {
    return base.filter((o) => o.paymentStatus === 'PENDING')
  }
  if (tab === 'completed') {
    return base.filter((o) => o.status === 'DELIVERED')
  }
  if (tab === 'refunded') {
    return base.filter(
      (o) => o.paymentStatus === 'REFUNDED' || o.paymentStatus === 'PARTIALLY_REFUNDED',
    )
  }
  if (tab === 'failed') {
    return base.filter((o) => o.paymentStatus === 'FAILED' || o.status === 'CANCELLED')
  }
  if (tab === 'incomplete') {
    return base.filter((o) => !['DELIVERED', 'CANCELLED'].includes(o.status))
  }
  return base
})

const loadOrders = async () => {
  loading.value = true
  try {
    const data = await getOrders({
      q: searchText.value || undefined,
      paymentMethod: selectedPaymentMethod.value || undefined,
    })

    const rows = data?.data || data || []
    allOrders.value = Array.isArray(rows) ? rows : []
    orders.value = filteredOrders.value
  } catch (error) {
    console.error('Failed to load orders', error)
    toast.error('Lỗi khi tải danh sách đơn hàng')
  } finally {
    loading.value = false
  }
}

// HÀM MỚI: XỬ LÝ HỦY ĐƠN HÀNG (DELETE LOGIC)
const cancelOrder = async (order) => {
  if (order.status === 'CANCELLED') return

  if (
    confirm(
      `Bạn có chắc chắn muốn HỦY đơn hàng ${order.orderNumber} không? Hành động này không thể xóa khỏi CSDL mà sẽ chuyển trạng thái thành Đã Hủy.`,
    )
  ) {
    try {
      // Sử dụng service updateOrderStatus đã import
      await updateOrderStatus(order.orderNumber, 'CANCELLED')
      toast.success(`Đã hủy đơn hàng ${order.orderNumber}`)

      // Update local state để UI phản hồi ngay lập tức
      order.status = 'CANCELLED'
    } catch (error) {
      console.error(error)
      toast.error('Hủy đơn hàng thất bại!')
    }
  }
}

const formatDate = (dateString) => {
  if (!dateString) return ''
  const date = new Date(dateString)
  return new Intl.DateTimeFormat('vi-VN', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
  }).format(date)
}

const getPaymentStatusText = (status) => {
  const map = {
    CAPTURED: 'Hoàn tất',
    AUTHORIZED: 'Đã xác thực',
    PENDING: 'Chờ xử lý',
    FAILED: 'Thất bại',
    REFUNDED: 'Hoàn tiền',
    PARTIALLY_REFUNDED: 'Hoàn tiền một phần',
    UNKNOWN: 'Không rõ',
  }
  return map[status] || status
}

const getOrderStatusText = (status) => {
  const map = {
    PENDING: 'Chờ xác nhận',
    PAID: 'Đã thanh toán',
    PROCESSING: 'Đang xử lý',
    SHIPPED: 'Đang giao',
    DELIVERED: 'Đã giao',
    CANCELLED: 'Đã hủy',
    FAILED: 'Thất bại',
  }
  return map[status] || status
}

let searchTimer
watch([searchText, selectedPaymentMethod, activeTab], () => {
  clearTimeout(searchTimer)
  searchTimer = setTimeout(() => {
    loadOrders()
  }, 250)
})

onMounted(() => {
  loadOrders()
})

watch(filteredOrders, (next) => {
  orders.value = next
})
</script>
