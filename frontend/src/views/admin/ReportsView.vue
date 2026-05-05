<template>
  <!-- MAIN CONTENT -->
  <main id="content" class="content py-10">
    <div class="container-fluid">
      <div class="row">
        <div class="col-12">
          <div class="d-flex justify-content-between align-items-center mb-4">
            <div class="">
              <h1 class="fs-3 mb-1 fw-bold text-primary">Báo cáo</h1>
            </div>
          </div>
        </div>
      </div>

      <div class="row g-3 mb-3">
        <!-- Stat cards -->
        <div class="col-12 col-sm-6 col-md-3">
          <div class="card h-100">
            <div class="card-body p-4">
              <h6 class="mb-4">Tổng sản phẩm</h6>
              <h3 class="mb-1 fw-bold text-primary">{{ totalBooks }}</h3>
              <p class="mb-0 text-success small"><i class="ti ti-check"> </i>Đã tải từ API</p>
            </div>
          </div>
        </div>

        <div class="col-12 col-sm-6 col-md-3">
          <div class="card h-100">
            <div class="card-body p-4">
              <h6 class="mb-4">Tổng danh mục</h6>
              <h3 class="mb-1 fw-bold text-success">{{ totalCategories }}</h3>
              <p class="mb-0 text-success small"><i class="ti ti-check"> </i>Đã tải từ API</p>
            </div>
          </div>
        </div>

        <div class="col-12 col-sm-6 col-md-3">
          <div class="card h-100">
            <div class="card-body p-4">
              <h6 class="mb-4">Sản phẩm sắp hết hàng</h6>
              <h3 class="mb-1 fw-bold text-warning">{{ lowStockCount }}</h3>
              <p class="mb-0 text-warning small"><i class="ti ti-alert-triangle"> </i>Ngưỡng ≤ 10</p>
            </div>
          </div>
        </div>

        <div class="col-12 col-sm-6 col-md-3">
          <div class="card h-100">
            <div class="card-body p-4">
              <h6 class="mb-4">Hết hàng</h6>
              <h3 class="mb-1 fw-bold text-danger">{{ outOfStockCount }}</h3>
              <p class="mb-0 text-danger small"><i class="ti ti-check"> </i>Đã tải từ API</p>
            </div>
          </div>
        </div>
      </div>

      <div class="row mb-3">
        <!-- Sales Overview (full width) -->
        <div class="col-12">
          <div class="card">
            <div class="card-body p-4">
              <div
                class="d-flex flex-column flex-md-row justify-content-between align-items-start mb-3 gap-2"
              >
                <div>
                  <h2 class="mb-0 fs-5">Tổng quan doanh số</h2>
                </div>
                <div class="controls">
                  <button @click="loadReportsData" class="btn btn-light btn-sm me-2">
                    <i class="ti ti-refresh"></i> Làm mới
                  </button>
                  <button class="btn btn-primary btn-sm">
                    Chỉ hiển thị năm nay
                  </button>
                </div>
              </div>

              <!-- Biểu đồ -->
              <div id="salesChart" ref="salesChartEl"></div>

            </div>
          </div>
        </div>
      </div>

      <div class="row">
        <!-- Top Products -->
        <div class="col-12">
          <div class="card">
            <div class="card-body p-4">
              <div class="d-flex justify-content-between align-items-center mb-3">
                <div>
                  <h2 class="mb-0 fs-5">Sản phẩm bán chạy</h2>
                </div>
              </div>

              <!-- Product rows -->
              <div class="list-group list-group-flush">
                <div v-if="loading" class="list-group-item p-3 text-center text-muted">
                  Đang tải dữ liệu...
                </div>
                <div v-else-if="error" class="list-group-item p-3 text-center text-danger">
                  {{ error }}
                </div>
                <div
                  v-else-if="topBooks.length === 0"
                  class="list-group-item p-3 text-center text-muted"
                >
                  Chưa có sản phẩm.
                </div>

                <div
                  v-else
                  v-for="book in topBooks"
                  :key="book.id"
                  class="list-group-item p-3 d-flex align-items-center"
                >
                  <div class="me-3">
                    <img
                      :src="
                        book.imageUrl ||
                        book.images?.[0]?.url ||
                        '/admin-assets/assets/images/product-1.png'
                      "
                      :alt="book.title"
                      class="rounded shadow-sm"
                      style="width: 48px; height: 48px; object-fit: cover"
                    />
                  </div>
                  <div class="flex-grow-1">
                    <div class="d-flex justify-content-between align-items-center">
                      <div>
                        <h6 class="mb-0 fw-bold">{{ book.title || book.name }}</h6>
                        <small class="text-secondary">{{
                          book.author || book.authorName || '—'
                        }}</small>
                      </div>
                      <div class="text-end">
                        <strong class="text-danger fs-5">${{ formatMoney(book.price) }}</strong>
                        <div class="small text-muted">Tồn kho: {{ getStock(book) ?? 0 }}</div>
                      </div>
                    </div>
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
import { computed, onMounted, onUnmounted, ref } from 'vue'
import ApexCharts from 'apexcharts'

import { getBooks } from '@/services/booksService'
import { getCategories } from '@/services/categoryService'
import { getOrders } from '@/services/ordersService'

const loading = ref(false)
const error = ref('')

const books = ref([])
const categories = ref([])
const orders = ref([])

const lowStockThreshold = 10
const salesChartEl = ref(null)
let chartInstance = null

function extractList(response) {
  const list =
    response?.data?.items || response?.data || response?.items || response?.results || response
  return Array.isArray(list) ? list : []
}

function getStock(book) {
  const candidates = [
    book?.stock,
    book?.quantity,
    book?.stockQuantity,
    book?.inventory?.stock,
    book?.availableQuantity,
  ]
  const value = candidates.find((v) => v !== undefined && v !== null && v !== '')
  if (value === undefined) return null
  const numberValue = Number(value)
  return Number.isFinite(numberValue) ? numberValue : null
}

function formatMoney(value) {
  const numberValue = Number(value)
  if (!Number.isFinite(numberValue)) return '0.00'
  return numberValue.toFixed(2)
}

const totalBooks = computed(() => books.value.length)
const totalCategories = computed(() => categories.value.length)

const outOfStockCount = computed(() => {
  return books.value.filter((b) => getStock(b) === 0).length
})

const lowStockCount = computed(() => {
  return books.value.filter((b) => {
    const stock = getStock(b)
    return stock !== null && stock > 0 && stock <= lowStockThreshold
  }).length
})

// Lấy 5 cuốn sách đầu tiên làm ví dụ bán chạy
const topBooks = computed(() => books.value.slice(0, 5))

// Cấu hình Biểu đồ
function renderChart() {
  if (!salesChartEl.value) return
  chartInstance?.destroy()

  // Xử lý dữ liệu đơn hàng theo tháng
  const monthlyRevenue = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];

  orders.value.forEach(order => {
    if (order.status !== 'CANCELLED') {
      const date = new Date(order.createdAt);
      if (!isNaN(date.getTime())) {
        const month = date.getMonth(); // 0 -> 11
        monthlyRevenue[month] += Number(order.total || 0);
      }
    }
  });

  const options = {
    series: [{
      name: 'Doanh thu ($)',
      data: monthlyRevenue
    }],
    chart: {
      type: 'area',
      height: 350,
      toolbar: { show: false },
      fontFamily: 'inherit'
    },
    colors: ['#E66239'],
    fill: {
      type: "gradient",
      gradient: {
        shadeIntensity: 1,
        opacityFrom: 0.4,
        opacityTo: 0.05,
        stops: [0, 100]
      }
    },
    dataLabels: { enabled: false },
    stroke: { curve: 'smooth', width: 2 },
    xaxis: {
      categories: ['Thg 1', 'Thg 2', 'Thg 3', 'Thg 4', 'Thg 5', 'Thg 6', 'Thg 7', 'Thg 8', 'Thg 9', 'Thg 10', 'Thg 11', 'Thg 12'],
    },
    yaxis: {
      labels: {
        formatter: (value) => { return "$" + value.toFixed(0) }
      }
    },
    tooltip: {
      y: { formatter: function (val) { return "$" + val.toLocaleString() } }
    }
  }

  chartInstance = new ApexCharts(salesChartEl.value, options)
  chartInstance.render()
}

async function loadReportsData() {
  loading.value = true
  error.value = ''
  try {
    // Đã sửa lỗi limit: 50 thành 48 và gọi thêm getOrders
    const [booksResponse, categoriesResponse, ordersResponse] = await Promise.all([
      getBooks({ limit: 48 }),
      getCategories(),
      getOrders({ limit: 48 })
    ])

    books.value = extractList(booksResponse)
    categories.value = extractList(categoriesResponse)
    orders.value = extractList(ordersResponse)

    // Vẽ biểu đồ sau khi có dữ liệu
    renderChart()

  } catch (exception) {
    error.value = exception instanceof Error ? exception.message : 'Không tải được dữ liệu báo cáo'
  } finally {
    loading.value = false
  }
}

onMounted(() => {
  loadReportsData()
})

onUnmounted(() => {
  if (chartInstance) {
    chartInstance.destroy()
    chartInstance = null
  }
})
</script>
