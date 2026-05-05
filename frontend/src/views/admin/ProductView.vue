<template>
  <main id="content" class="content py-10">
    <div class="container-fluid">
      <div class="row">
        <div class="col-12">
          <div class="d-flex justify-content-between align-items-center mb-4">
            <div class="">
              <h1 class="fs-3 mb-1 fw-bold text-primary">Sản phẩm</h1>
            </div>
            <div>
              <RouterLink :to="{ name: 'admin-create-product' }" class="btn btn-primary"
                >Thêm sản phẩm</RouterLink
              >
            </div>
          </div>
        </div>
      </div>
      <div class="row">
        <div class="col-12">
          <div>
            <div class="d-flex gap-2 mb-3 flex-wrap justify-content-between">
              <input
                type="text"
                class="form-control"
                placeholder="Tìm kiếm sản phẩm..."
                style="max-width: 250px"
                v-model="searchQuery"
              />
              <div class="d-flex gap-2">
                <button class="btn btn-outline-secondary"><i class="ti ti-filter"></i> Lọc</button>
                <button class="btn btn-outline-secondary">
                  <i class="ti ti-file-excel"></i> Excel
                </button>
                <button class="btn btn-outline-secondary">
                  <i class="ti ti-file-pdf"></i> PDF
                </button>
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
                  <th>Hình ảnh</th>
                  <th>Mã (SKU)</th>
                  <th>Tác giả</th>
                  <th>Nhà xuất bản</th>
                  <th>Giá</th>
                  <th>Định dạng</th>
                  <th>Số lượng</th>
                  <th>Thao tác</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="book in books" :key="book.id" class="align-middle">
                  <td>
                    <a href="#" class="d-flex align-items-center text-decoration-none">
                      <img
                        :src="book.imageUrl || '/admin-assets/assets/images/product-1.png'"
                        alt=""
                        class="avatar avatar-md rounded"
                        style="object-fit: cover"
                      />
                      <span
                        class="ms-3 text-dark text-truncate"
                        style="max-width: 200px"
                        :title="book.title"
                      >
                        {{ book.title }}
                      </span>
                    </a>
                  </td>
                  <td>{{ book.sku }}</td>
                  <td>{{ book.author }}</td>
                  <td>{{ book.publisher || 'N/A' }}</td>
                  <td>${{ book.price }}</td>
                  <td>{{ book.format }}</td>
                  <td>{{ book.stock }}</td>
                  <td class="">
                    <RouterLink
                      :to="{ name: 'admin-edit-product', params: { id: book.id } }"
                      class="btn btn-sm btn-outline-primary me-2"
                    >
                      <i class="ti ti-edit"></i>
                    </RouterLink>
                    <button @click="handleDelete(book.id)" class="btn btn-sm btn-outline-danger">
                      <i class="ti ti-trash"></i>
                    </button>
                  </td>
                </tr>
                <tr v-if="books.length === 0">
                  <td colspan="8" class="text-center py-4 text-muted">
                    Không tìm thấy sản phẩm nào.
                  </td>
                </tr>
              </tbody>
              <tfoot class="">
                <tr>
                  <td class="border-bottom-0">Tổng cộng: {{ totalItems }} sản phẩm</td>
                  <td colspan="7" class="border-bottom-0">
                    <nav aria-label="Điều hướng trang" class="d-flex justify-content-end">
                      <ul class="pagination mb-0">
                        <li class="page-item" :class="{ disabled: currentPage <= 1 }">
                          <button class="page-link" @click="goToPage(currentPage - 1)">
                            Trước
                          </button>
                        </li>
                        <li
                          v-for="page in totalPages"
                          :key="page"
                          class="page-item"
                          :class="{ active: currentPage === page }"
                        >
                          <button class="page-link" @click="goToPage(page)">{{ page }}</button>
                        </li>
                        <li class="page-item" :class="{ disabled: currentPage >= totalPages }">
                          <button class="page-link" @click="goToPage(currentPage + 1)">Sau</button>
                        </li>
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
import { ref, onMounted, watch } from 'vue'
import { getBooks, deleteBook } from '@/services/booksService'
import { toast } from 'vue3-toastify'

const books = ref([])
const loading = ref(false)
const currentPage = ref(1)
const totalPages = ref(1)
const totalItems = ref(0)
const searchQuery = ref('')
const limit = ref(10)

let searchTimeout = null

const fetchProducts = async () => {
  loading.value = true
  try {
    const res = await getBooks({
      page: currentPage.value,
      limit: limit.value,
      q: searchQuery.value,
    })
    books.value = res.data || []
    totalPages.value = res.meta?.totalPages || 1
    totalItems.value = res.meta?.total || 0
  } catch (error) {
    console.error('Failed to fetch books', error)
    toast.error('Lỗi khi tải danh sách sản phẩm')
  } finally {
    loading.value = false
  }
}

const handleDelete = async (id) => {
  if (!confirm('Bạn có chắc chắn muốn xóa sản phẩm này?')) return
  try {
    await deleteBook(id)
    toast.success('Xóa sản phẩm thành công!')
    fetchProducts()
  } catch (error) {
    toast.error(error instanceof Error ? error.message : 'Lỗi khi xóa sản phẩm')
  }
}

const goToPage = (page) => {
  if (page >= 1 && page <= totalPages.value) {
    currentPage.value = page
    fetchProducts()
  }
}

watch(searchQuery, () => {
  if (searchTimeout) clearTimeout(searchTimeout)
  searchTimeout = setTimeout(() => {
    currentPage.value = 1
    fetchProducts()
  }, 500)
})

onMounted(() => {
  fetchProducts()
})
</script>
