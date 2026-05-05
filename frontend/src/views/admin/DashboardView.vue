<template>
  <main id="content" class="content py-10">
    <div class="container-fluid">
      <div class="row">
        <div class="col-12">
          <div class="mb-6">
            <h1 class="fs-3 mb-1 fw-bold text-primary">Bảng điều khiển</h1>
          </div>
        </div>
      </div>

      <!-- Hàng 1: Thống kê Sản phẩm & Danh mục -->
      <div class="row g-3 mb-3">
        <div class="col-lg-3 col-12">
          <div class="card p-4 bg-primary bg-opacity-10 border border-primary border-opacity-25 rounded-2">
            <div class="d-flex gap-3">
              <div class="icon-shape icon-md bg-primary text-white rounded-2">
                <i class="ti ti-report-analytics fs-4"></i>
              </div>
              <div>
                <h2 class="mb-3 fs-6">Tổng sản phẩm</h2>
                <h3 class="fw-bold mb-0">{{ totalBooks }}</h3>
                <p class="text-primary mb-0 small">Cập nhật từ API</p>
              </div>
            </div>
          </div>
        </div>
        <div class="col-lg-3 col-12">
          <div class="card p-4 bg-success bg-opacity-10 border border-success border-opacity-25 rounded-2">
            <div class="d-flex gap-3">
              <div class="icon-shape icon-md bg-success text-white rounded-2">
                <i class="ti ti-repeat fs-4"></i>
              </div>
              <div>
                <h2 class="mb-3 fs-6">Tổng danh mục</h2>
                <h3 class="fw-bold mb-0">{{ totalCategories }}</h3>
                <p class="text-success mb-0 small">Cập nhật từ API</p>
              </div>
            </div>
          </div>
        </div>
        <div class="col-lg-3 col-12">
          <div class="card p-4 bg-info bg-opacity-10 border border-info border-opacity-25 rounded-2">
            <div class="d-flex gap-3">
              <div class="icon-shape icon-md bg-info text-white rounded-2">
                <i class="ti ti-currency-dollar fs-4"></i>
              </div>
              <div>
                <h2 class="mb-3 fs-6">Sắp hết hàng</h2>
                <h3 class="fw-bold mb-0">{{ lowStockCount }}</h3>
                <p class="text-info mb-0 small">Ngưỡng: ≤ {{ lowStockThreshold }}</p>
              </div>
            </div>
          </div>
        </div>
        <div class="col-lg-3 col-12">
          <div class="card p-4 bg-warning bg-opacity-10 border border-warning border-opacity-25 rounded-2">
            <div class="d-flex gap-3">
              <div class="icon-shape icon-md bg-warning text-white rounded-2">
                <i class="ti ti-notes fs-4"></i>
              </div>
              <div>
                <h2 class="mb-3 fs-6">Hết hàng</h2>
                <h3 class="fw-bold mb-0">{{ outOfStockCount }}</h3>
                <p class="text-warning mb-0 small">Cập nhật từ API</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Hàng 2: Thống kê Doanh thu, Đơn hàng, Khách hàng -->
      <div class="row g-3 mb-3">
        <div class="col-lg-4 col-12">
          <div class="card">
            <div class="card-body p-4">
              <div class="d-flex justify-content-between border-bottom pb-5 mb-3">
                <div>
                  <h3 class="fw-bold h4">{{ totalOrders }}</h3>
                  <span>Tổng đơn hàng</span>
                </div>
                <div>
                  <i class="ti ti-shopping-cart fs-1 text-primary"></i>
                </div>
              </div>
              <div class="d-flex justify-content-between align-items-center small">
                <div class="text-muted">Đã tải từ API</div>
                <div><RouterLink to="/admin/orders" class="link-primary text-decoration-underline">Xem</RouterLink></div>
              </div>
            </div>
          </div>
        </div>
        <div class="col-lg-4 col-12">
          <div class="card">
            <div class="card-body p-4">
              <div class="d-flex justify-content-between border-bottom pb-5 mb-3">
                <div>
                  <h3 class="fw-bold h4">${{ formatMoney(totalRevenue) }}</h3>
                  <span>Tổng doanh thu</span>
                </div>
                <div>
                  <i class="ti ti-cash-banknote fs-1 text-success"></i>
                </div>
              </div>
              <div class="d-flex justify-content-between align-items-center small">
                <div class="text-muted">Doanh thu đơn hàng hợp lệ</div>
                <div><RouterLink to="/admin/orders" class="link-primary text-decoration-underline">Xem</RouterLink></div>
              </div>
            </div>
          </div>
        </div>
        <div class="col-lg-4 col-12">
          <div class="card">
            <div class="card-body p-4">
              <div class="d-flex justify-content-between border-bottom pb-5 mb-3">
                <div>
                  <h3 class="fw-bold h4">{{ totalCustomers }}</h3>
                  <span>Tổng khách hàng</span>
                </div>
                <div>
                  <i class="ti ti-users fs-1 text-warning"></i>
                </div>
              </div>
              <div class="d-flex justify-content-between align-items-center small">
                <div class="text-muted">Số tài khoản hệ thống</div>
                <div><RouterLink to="/admin/users" class="link-primary text-decoration-underline">Xem</RouterLink></div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Hàng 3: Biểu đồ -->
      <div class="row g-3 mb-3">
        <div class="col-12 col-lg-7">
          <div class="card h-100">
            <div class="card-header d-flex justify-content-between align-items-center bg-transparent px-4 py-3">
              <h3 class="h5 mb-0">Doanh thu & Số đơn hàng theo tháng</h3>
            </div>
            <div class="card-body p-4">
              <div id="salesPurchaseChart" ref="salesPurchaseChartEl"></div>
            </div>
          </div>
        </div>

        <div class="col-12 col-lg-5">
          <div class="card h-100">
            <div class="card-header d-flex justify-content-between align-items-center bg-transparent px-4 py-3">
              <h3 class="h5 mb-0">Tỷ lệ Người dùng</h3>
            </div>
            <div class="card-body p-4 d-flex flex-column justify-content-center">
              <div id="customerChart" ref="customerChartEl"></div>
              <div class="row text-center mt-4 pt-4 border-top">
                <div class="col-6 border-end">
                  <h3 class="fw-bold mb-2">{{ totalCustomers }}</h3>
                  <small class="text-secondary">Khách hàng (Customer)</small>
                </div>
                <div class="col-6">
                  <h3 class="fw-bold mb-2">{{ totalAdmins }}</h3>
                  <small class="text-secondary">Quản trị (Admin)</small>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Hàng 4: Danh sách -->
      <div class="row g-3">
        <!-- CARD 1 — Top Selling Products -->
        <div class="col-lg-4">
          <div class="card h-100">
            <div class="card-header bg-white d-flex justify-content-between align-items-center px-4 py-3">
              <h4 class="mb-0 h5">Sản phẩm nổi bật</h4>
            </div>

            <ul class="list-group list-group-flush">
              <li v-if="loading" class="list-group-item py-4 text-center text-muted">Đang tải dữ liệu...</li>
              <li v-else-if="error" class="list-group-item py-4 text-center text-danger">{{ error }}</li>
              <li v-else-if="topBooks.length === 0" class="list-group-item py-4 text-center text-muted">Chưa có sản phẩm.</li>

              <li v-else v-for="book in topBooks" :key="book.id" class="list-group-item d-flex align-items-center gap-3">
                <img :src="book.imageUrl || '/admin-assets/assets/images/product-1.png'" class="rounded" width="48" />
                <div class="flex-grow-1">
                  <p class="mb-1 fw-medium text-truncate" style="max-width: 180px;">{{ book.title || book.name }}</p>
                  <div class="d-flex align-items-center gap-2 text-muted">
                    <small class="fw-semibold text-danger">${{ formatMoney(book.price) }}</small>
                    <small>•</small>
                    <small v-if="getStock(book) !== null">Còn {{ getStock(book) }}</small>
                  </div>
                </div>
                <span class="badge border" :class="stockBadgeClass(book)">{{ stockBadgeText(book) }}</span>
              </li>
            </ul>
          </div>
        </div>

        <!-- CARD 2 — Low Stock Products -->
        <div class="col-lg-4">
          <div class="card h-100">
            <div class="card-header bg-white d-flex justify-content-between align-items-center px-4 py-3">
              <div class="d-flex align-items-center">
                <h4 class="mb-0 h5">Sắp hết hàng</h4>
              </div>
            </div>

            <ul class="list-group list-group-flush">
              <li v-if="loading" class="list-group-item py-4 text-center text-muted">Đang tải dữ liệu...</li>
              <li v-else-if="error" class="list-group-item py-4 text-center text-danger">{{ error }}</li>
              <li v-else-if="lowStockBooks.length === 0" class="list-group-item py-4 text-center text-muted">Không có sản phẩm sắp hết hàng.</li>

              <li v-else v-for="book in lowStockBooks" :key="book.id" class="list-group-item d-flex align-items-center gap-3">
                <img :src="book.imageUrl || '/admin-assets/assets/images/product-1.png'" class="rounded" width="48" />
                <div class="flex-grow-1">
                  <p class="mb-1 fw-medium text-truncate" style="max-width: 150px;">{{ book.title || book.name }}</p>
                  <small class="text-muted">{{ book.sku || 'N/A' }}</small>
                </div>
                <div class="d-flex flex-column gap-0 align-items-center">
                  <span class="fw-bold text-danger">{{ getStock(book) ?? '-' }}</span>
                  <small class="text-muted" style="font-size: 0.7rem;">Tồn kho</small>
                </div>
              </li>
            </ul>
          </div>
        </div>

        <!-- CARD 3 — Recent Sales -->
        <div class="col-lg-4">
          <div class="card h-100">
            <div class="card-header bg-white d-flex justify-content-between align-items-center px-4 py-3">
              <h4 class="mb-0 h5">Đơn hàng mới nhất</h4>
            </div>

            <div class="list-group list-group-flush">
              <div v-if="loading" class="list-group-item py-4 text-center text-muted">Đang tải dữ liệu...</div>
              <div v-else-if="error" class="list-group-item py-4 text-center text-danger">{{ error }}</div>
              <div v-else-if="recentOrders.length === 0" class="list-group-item py-4 text-center text-muted">Chưa có đơn hàng.</div>

              <div v-else v-for="order in recentOrders" :key="order.orderNumber" class="list-group-item d-flex align-items-center gap-3">
                <div class="rounded-circle bg-primary-subtle text-primary d-flex align-items-center justify-content-center" style="width: 48px; height: 48px">
                  <i class="ti ti-receipt fs-5"></i>
                </div>
                <div class="flex-grow-1">
                  <p class="mb-1 fw-bold text-primary">{{ order.orderNumber }}</p>
                  <div class="d-flex align-items-center gap-2 text-muted">
                    <small class="fw-semibold">{{ order.paymentMethod === 'BANK_TRANSFER' ? 'Chuyển khoản' : (order.paymentMethod === 'COD' ? 'COD' : order.paymentMethod) }}</small>
                    <small>•</small>
                    <small class="fw-bold text-dark">${{ formatMoney(order.total) }}</small>
                  </div>
                </div>
                <span class="badge" :class="getOrderStatusClass(order.status)">{{ getOrderStatusText(order.status) }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </main>
</template>

<script setup>
import { computed, onMounted, onUnmounted, ref, watch } from 'vue'
import ApexCharts from 'apexcharts'

// Import đủ 4 API cần thiết
import { getBooks } from '@/services/booksService'
import { getCategories } from '@/services/categoryService'
import { getOrders } from '@/services/ordersService'
import { getUsers } from '@/services/userService'

const salesPurchaseChartEl = ref(null)
const customerChartEl = ref(null)

const loading = ref(false)
const error = ref('')

const books = ref([])
const categories = ref([])
const orders = ref([])
const users = ref([])

const lowStockThreshold = 10

function extractList(response) {
  const list = response?.data?.items || response?.data || response?.items || response?.results || response
  return Array.isArray(list) ? list : []
}

function getStock(book) {
  const candidates = [book?.stock, book?.quantity, book?.stockQuantity, book?.inventory?.stock]
  const value = candidates.find((v) => v !== undefined && v !== null && v !== '')
  if (value === undefined) return null
  const numberValue = Number(value)
  return Number.isFinite(numberValue) ? numberValue : null
}

function stockBadgeText(book) {
  const stock = getStock(book)
  if (stock === null) return '—'
  if (stock <= 0) return 'Hết'
  if (stock <= lowStockThreshold) return 'Sắp hết'
  return 'Tốt'
}

function stockBadgeClass(book) {
  const stock = getStock(book)
  if (stock === null) return 'bg-secondary-subtle text-secondary border-secondary'
  if (stock <= 0) return 'bg-danger-subtle text-danger border-danger'
  if (stock <= lowStockThreshold) return 'bg-warning-subtle text-warning border-warning'
  return 'bg-success-subtle text-success border-success'
}

function formatMoney(value) {
  const numberValue = Number(value)
  if (!Number.isFinite(numberValue)) return '0.00'
  return numberValue.toFixed(2)
}

// Tính toán các dữ liệu tổng
const totalBooks = computed(() => books.value.length)
const totalCategories = computed(() => categories.value.length)
const totalOrders = computed(() => orders.value.length)

// Tính tổng doanh thu (Bỏ qua các đơn đã Hủy)
const totalRevenue = computed(() => {
  return orders.value
    .filter(o => o.status !== 'CANCELLED')
    .reduce((sum, order) => sum + Number(order.total || 0), 0)
})

const totalCustomers = computed(() => users.value.filter((u) => u.role === 'CUSTOMER' || !u.role).length)
const totalAdmins = computed(() => users.value.filter((u) => u.role === 'ADMIN').length)

// Xử lý danh sách cho các Card
const lowStockBooks = computed(() => {
  return books.value
    .filter((b) => {
      const stock = getStock(b)
      return stock !== null && stock > 0 && stock <= lowStockThreshold
    })
    .slice(0, 5)
})

const outOfStockCount = computed(() => books.value.filter((b) => getStock(b) === 0).length)
const lowStockCount = computed(() => books.value.filter((b) => {
  const stock = getStock(b)
  return stock !== null && stock > 0 && stock <= lowStockThreshold
}).length)

const topBooks = computed(() => [...books.value].slice(0, 5)) // Có thể sort theo reviewCount/rating nếu Backend hỗ trợ

// Sắp xếp đơn hàng mới nhất
const recentOrders = computed(() => {
  return [...orders.value]
    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
    .slice(0, 5)
})

// Xử lý dữ liệu Biểu đồ Cột (Doanh thu theo tháng)
function buildMonthlySeries(orderRows) {
  const now = new Date()
  const keys = []

  for (let i = 5; i >= 0; i -= 1) {
    const date = new Date(now.getFullYear(), now.getMonth() - i, 1)
    keys.push(`${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`)
  }

  const buckets = new Map(keys.map((key) => [key, { revenue: 0, orders: 0 }]))

  for (const order of orderRows) {
    if (order.status === 'CANCELLED') continue; // Không tính đơn hủy vào doanh thu

    const date = new Date(order.createdAt)
    if (Number.isNaN(date.getTime())) continue

    const monthKey = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`
    if (buckets.has(monthKey)) {
      const bucket = buckets.get(monthKey)
      bucket.revenue += Number(order.total || 0)
      bucket.orders += 1
    }
  }

  const getMonthLabel = (key) => {
    const [year, month] = key.split('-')
    return `Tháng ${month}/${year.slice(2)}`
  }

  return {
    categories: keys.map(getMonthLabel),
    revenue: keys.map((key) => Number(buckets.get(key)?.revenue || 0)),
    orders: keys.map((key) => Number(buckets.get(key)?.orders || 0)),
  }
}

let salesPurchaseChartInstance = null
let customerChartInstance = null

const renderSalesPurchaseChart = () => {
  if (!salesPurchaseChartEl.value) return
  salesPurchaseChartInstance?.destroy()

  const monthlySeries = buildMonthlySeries(orders.value)

  const options = {
    series: [
      { name: 'Doanh thu', data: monthlySeries.revenue },
      { name: 'Số đơn hàng', data: monthlySeries.orders },
    ],
    colors: ['#007867', '#FFD666'],
    chart: {
      type: 'bar',
      height: 350,
      width: '100%',
      toolbar: { show: false },
    },
    grid: { show: true, borderColor: '#e2e8f0' },
    plotOptions: {
      bar: { columnWidth: '50%', borderRadius: 3, borderRadiusApplication: 'end' },
    },
    dataLabels: { enabled: false },
    xaxis: {
      categories: monthlySeries.categories,
      axisBorder: { show: false },
      axisTicks: { show: false },
    },
    yaxis: [
      {
        title: { text: 'Doanh thu ($)' },
        labels: { formatter: (val) => `$${val.toLocaleString()}` }
      },
      {
        opposite: true,
        title: { text: 'Số đơn hàng' },
        labels: { formatter: (val) => Math.round(val) }
      }
    ]
  }

  salesPurchaseChartInstance = new ApexCharts(salesPurchaseChartEl.value, options)
  salesPurchaseChartInstance.render()
}

// Hàm 1: Dịch trạng thái sang tiếng Việt
function getOrderStatusText(status) {
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

// Hàm 2: Cấp màu sắc tương ứng cho từng trạng thái
function getOrderStatusClass(status) {
  const map = {
    PENDING: 'bg-warning text-dark',
    PAID: 'bg-info text-dark',
    PROCESSING: 'bg-primary',
    SHIPPED: 'bg-primary',
    DELIVERED: 'bg-success',
    CANCELLED: 'bg-danger',
    FAILED: 'bg-danger',
  }
  return map[status] || 'bg-secondary'
}

const renderCustomerChart = () => {
  if (!customerChartEl.value) return
  customerChartInstance?.destroy()

  // Xử lý lỗi nếu không có dữ liệu để tránh crash chart
  const cusCount = totalCustomers.value || 1
  const adCount = totalAdmins.value || 0

  const options = {
    series: [cusCount, adCount],
    chart: { height: 250, type: 'donut' },
    labels: ['Khách hàng', 'Quản trị viên'],
    colors: ['#007867', '#FFAC82'],
    plotOptions: {
      pie: {
        donut: {
          size: '70%',
          labels: {
            show: true,
            name: { show: true },
            value: { show: true, formatter: (val) => val + " User" },
            total: {
              show: true,
              label: 'Tổng số',
              formatter: () => `${totalCustomers.value + totalAdmins.value}`
            }
          }
        }
      }
    },
    dataLabels: { enabled: false },
    legend: { show: false }
  }

  customerChartInstance = new ApexCharts(customerChartEl.value, options)
  customerChartInstance.render()
}

// Gọi 4 API đồng thời
async function loadDashboardData() {
  loading.value = true
  error.value = ''
  try {
    const [booksRes, categoriesRes, ordersRes, usersRes] = await Promise.all([
      getBooks({ limit: 48 }), // SỬA 1000 THÀNH 48 Ở ĐÂY
      getCategories(),
      getOrders({ limit: 48 }), // SỬA 1000 THÀNH 48 Ở ĐÂY
      getUsers()
    ])

    books.value = extractList(booksRes)
    categories.value = extractList(categoriesRes)
    orders.value = extractList(ordersRes)
    users.value = extractList(usersRes)

    // Render lại chart ngay khi có data
    renderSalesPurchaseChart()
    renderCustomerChart()
  } catch (exception) {
    error.value = exception instanceof Error ? exception.message : 'Không tải được dữ liệu dashboard'
  } finally {
    loading.value = false
  }
}

onMounted(() => {
  loadDashboardData()
})

onUnmounted(() => {
  salesPurchaseChartInstance?.destroy()
  customerChartInstance?.destroy()
  salesPurchaseChartInstance = null
  customerChartInstance = null
})
</script>
