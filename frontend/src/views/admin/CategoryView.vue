<template>
  <main id="content" class="content py-10">
    <div class="container-fluid">
      <div class="row">
        <div class="col-12">
          <div class="d-flex justify-content-between align-items-center mb-4">
            <div>
              <h1 class="fs-3 mb-1 fw-bold text-primary">Danh mục</h1>
            </div>
            <div>
              <RouterLink to="/admin/create-category" class="btn btn-primary"
                >Thêm danh mục</RouterLink
              >
            </div>
          </div>
        </div>
      </div>

      <div class="row">
        <div class="col-12">
          <div class="row g-2 mb-3 align-items-center">
            <div class="col-12 col-md-4 col-lg-3">
              <input type="text" class="form-control" placeholder="Tìm kiếm danh mục..." />
            </div>
          </div>

          <div class="card table-responsive">
            <table class="table mb-0 text-nowrap table-hover">
              <thead class="table-light border-light">
                <tr>
                  <th>Tên</th>
                  <th>Slug</th>
                  <th>Sản phẩm</th>
                  <th>Trạng thái</th>
                  <th>Thao tác</th>
                </tr>
              </thead>
              <tbody>
                <tr v-if="loading">
                  <td colspan="5" class="py-4 text-center text-muted">Đang tải dữ liệu...</td>
                </tr>

                <tr v-else-if="error">
                  <td colspan="5" class="py-4 text-center text-danger">{{ error }}</td>
                </tr>

                <tr v-else-if="categories.length === 0">
                  <td colspan="5" class="py-4 text-center text-muted">Chưa có danh mục nào.</td>
                </tr>

                <tr
                  v-for="category in categories"
                  :key="category.id"
                  class="align-middle"
                >
                  <td>{{ category.name }}</td>
                  <td>{{ category.slug }}</td>
                  <td>{{ category.productCount || 0 }}</td>
                  <td>
                    <span
                      class="badge"
                      :class="category.isActive === false ? 'text-bg-secondary' : 'text-bg-success'"
                    >
                      {{ category.isActive === false ? 'Nháp' : 'Hoạt động' }}
                    </span>
                  </td>
                  <td>
                    <RouterLink :to="{ name: 'admin-edit-category', params: { id: category.id } }" class="btn btn-sm btn-outline-primary me-2">
                      <i class="ti ti-edit"></i>
                    </RouterLink>
                    <button class="btn btn-sm btn-outline-danger" @click="handleDelete(category.id)">
                      <i class="ti ti-trash"></i>
                    </button>
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
import { onMounted, ref } from 'vue'
import { RouterLink } from 'vue-router'
import { getCategories, deleteCategory } from '@/services/categoryService'
import { toast } from 'vue3-toastify'

const categories = ref([])
const loading = ref(false)
const error = ref('')

async function loadCategories() {
  loading.value = true
  error.value = ''

  try {
    const response = await getCategories()
    categories.value = response?.data || response || []
  } catch (exception) {
    error.value = exception instanceof Error ? exception.message : 'Không tải được danh mục'
  } finally {
    loading.value = false
  }
}

async function handleDelete(id) {
  if (!confirm('Bạn có chắc chắn muốn xóa danh mục này?')) return
  try {
    await deleteCategory(id)
    toast.success('Xóa danh mục thành công!')
    loadCategories()
  } catch (exception) {
    toast.error('Lỗi khi xóa danh mục')
  }
}

onMounted(loadCategories)
</script>
