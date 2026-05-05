<template>
  <main id="content" class="content py-10">
    <div class="container-fluid">
      <div class="row">
        <div class="col-12">
          <div class="mb-4">
            <h1 class="fs-3 mb-1 fw-bold text-primary">Quản lý kho hàng</h1>
          </div>
        </div>
      </div>
      <div class="row">
        <div class="col-12">
          <div class="card table-responsive">
            <div v-if="loading" class="text-center p-4">
              <div class="spinner-border text-primary" role="status"></div>
            </div>
            <table v-else class="table mb-0 text-nowrap table-hover">
              <thead class="table-light border-light">
                <tr>
                  <th>Sản phẩm</th>
                  <th>SKU</th>
                  <th>Tồn kho (Stock)</th>
                  <th>Đã giữ (Reserved)</th>
                  <th>Khả dụng</th>
                  <th>Thao tác</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="book in books" :key="book.id" class="align-middle">
                  <td>{{ book.title }}</td>
                  <td>{{ book.sku }}</td>
                  <td>
                    <input
                      type="number"
                      v-model.number="book.stock"
                      class="form-control form-control-sm"
                      style="width: 100px"
                      @change="book.changed = true"
                    />
                  </td>
                  <td>{{ book.reserved || 0 }}</td>
                  <td :class="book.stock - (book.reserved || 0) < 5 ? 'text-danger fw-bold' : ''">
                    {{ book.stock - (book.reserved || 0) }}
                  </td>
                  <td>
                    <button
                      v-if="book.changed"
                      @click="updateStock(book)"
                      class="btn btn-sm btn-primary"
                    >
                      Lưu
                    </button>
                  </td>
                </tr>
                <tr v-if="books.length === 0">
                  <td colspan="6" class="text-center py-4 text-muted">
                    Không tìm thấy sản phẩm nào.
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  </main>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { getBooks, updateBook } from '@/services/booksService'
import { toast } from 'vue3-toastify'

const books = ref([])
const loading = ref(false)

const fetchProducts = async () => {
  loading.value = true
  try {
    const res = await getBooks({ limit: 48 })
    books.value = (res.data || []).map((b) => ({ ...b, changed: false }))
  } catch (error) {
    console.error('Failed to fetch books', error)
    toast.error('Lỗi khi tải danh sách kho')
  } finally {
    loading.value = false
  }
}

const updateStock = async (book) => {
  try {
    await updateBook(book.id, { stock: book.stock })
    toast.success(`Đã cập nhật kho cho ${book.title}`)
    book.changed = false
  } catch (error) {
    toast.error('Lỗi khi cập nhật kho')
  }
}

onMounted(fetchProducts)
</script>
