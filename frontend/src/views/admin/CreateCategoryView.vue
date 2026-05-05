<template>
  <main id="content" class="content py-10">
    <div class="container-fluid">
      <div class="row">
        <div class="col-12">
          <div
            class="d-flex flex-column flex-md-row justify-content-between align-items-md-center mb-4 gap-3"
          >
            <div>
              <h1 class="fs-3 mb-1 fw-bold text-primary">{{ isEdit ? 'Chỉnh sửa' : 'Thêm' }} danh mục</h1>
            </div>
            <div>
              <RouterLink :to="{ name: 'admin-categories' }" class="btn btn-outline-primary">
                Về danh sách danh mục
              </RouterLink>
            </div>
          </div>
        </div>
      </div>
      <div class="row">
        <div class="col-12 col-lg-6">
          <div class="card">
            <div v-if="fetching" class="card-body p-5 text-center">
              <div class="spinner-border text-primary" role="status"></div>
            </div>
            <div v-else class="card-body p-4">
              <form @submit.prevent="handleSubmit">
                <div class="mb-3">
                  <label for="categoryName" class="form-label"
                    >Tên danh mục <span class="text-danger">*</span></label
                  >
                  <input
                    v-model="form.name"
                    type="text"
                    class="form-control"
                    id="categoryName"
                    placeholder="Nhập tên danh mục"
                    required
                  />
                </div>
                <div class="mb-3">
                  <label for="categorySlug" class="form-label">Slug (Tùy chọn)</label>
                  <input
                    v-model="form.slug"
                    type="text"
                    class="form-control"
                    id="categorySlug"
                    placeholder="slug-danh-muc"
                  />
                  <small class="text-muted">Để trống để tự động tạo từ tên.</small>
                </div>

                <div class="d-flex gap-2 mt-4">
                  <button type="submit" class="btn btn-primary" :disabled="loading">
                    <span
                      v-if="loading"
                      class="spinner-border spinner-border-sm me-1"
                      role="status"
                      aria-hidden="true"
                    ></span>
                    {{ loading ? 'Đang lưu...' : (isEdit ? 'Cập nhật danh mục' : 'Thêm danh mục') }}
                  </button>
                  <RouterLink :to="{ name: 'admin-categories' }" class="btn btn-secondary">
                    Hủy
                  </RouterLink>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  </main>
</template>

<script setup>
import { ref, reactive, onMounted, computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { createCategory, updateCategory, getCategoryById } from '@/services/categoryService'
import { toast } from 'vue3-toastify'

const route = useRoute()
const router = useRouter()

const loading = ref(false)
const fetching = ref(false)

const isEdit = computed(() => !!route.params.id)

const form = reactive({
  name: '',
  slug: '',
})

const fetchCategory = async () => {
  if (!isEdit.value) return
  fetching.value = true
  try {
    const category = await getCategoryById(route.params.id)
    form.name = category.name
    form.slug = category.slug
  } catch (error) {
    toast.error('Lỗi khi tải thông tin danh mục')
    router.push({ name: 'admin-categories' })
  } finally {
    fetching.value = false
  }
}

const handleSubmit = async () => {
  if (!form.name) {
    toast.warning('Vui lòng nhập tên danh mục')
    return
  }

  loading.value = true
  try {
    if (isEdit.value) {
      await updateCategory(route.params.id, form)
      toast.success('Cập nhật danh mục thành công!')
    } else {
      await createCategory(form)
      toast.success('Thêm danh mục thành công!')
    }
    router.push({ name: 'admin-categories' })
  } catch (error) {
    toast.error(error.response?.data?.message || 'Lỗi khi lưu danh mục')
  } finally {
    loading.value = false
  }
}

onMounted(fetchCategory)
</script>
