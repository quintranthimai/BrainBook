<template>
  <main id="content" class="content py-10">
    <div class="container-fluid">
      <div class="row">
        <div class="col-12">
          <div
            class="d-flex flex-column flex-md-row justify-content-between align-items-md-center mb-4 gap-3"
          >
            <div class="">
              <h1 class="fs-3 mb-1 fw-bold text-primary">
                {{ isEdit ? 'Chỉnh sửa' : 'Thêm' }} sản phẩm
              </h1>
            </div>
            <div>
              <RouterLink :to="{ name: 'admin-products' }" class="btn btn-outline-primary"
                >Về danh sách sản phẩm</RouterLink
              >
            </div>
          </div>
        </div>
      </div>
      <div class="row">
        <div class="col-12">
          <div class="card">
            <div v-if="fetching" class="card-body p-5 text-center">
              <div class="spinner-border text-primary" role="status"></div>
            </div>
            <div v-else class="card-body p-4">
              <form @submit.prevent="handleSubmit">
                <div class="row">
                  <div class="col-md-6 mb-3">
                    <label for="productName" class="form-label"
                      >Tên sản phẩm <span class="text-danger">*</span></label
                    >
                    <input
                      v-model="form.title"
                      type="text"
                      class="form-control"
                      id="productName"
                      placeholder="Nhập tên sản phẩm"
                      required
                    />
                  </div>
                  <div class="col-md-6 mb-3">
                    <label for="productSKU" class="form-label"
                      >SKU <span class="text-danger">*</span></label
                    >
                    <input
                      v-model="form.sku"
                      type="text"
                      class="form-control"
                      id="productSKU"
                      placeholder="Nhập SKU"
                      required
                    />
                  </div>
                </div>
                <div class="row">
                  <div class="col-md-6 mb-3">
                    <label for="productPrice" class="form-label"
                      >Giá <span class="text-danger">*</span></label
                    >
                    <input
                      v-model.number="form.price"
                      type="number"
                      class="form-control"
                      id="productPrice"
                      placeholder="0.00"
                      step="0.01"
                      required
                    />
                  </div>
                  <div class="col-md-6 mb-3">
                    <label for="productStock" class="form-label"
                      >Số lượng tồn kho <span class="text-danger">*</span></label
                    >
                    <input
                      v-model.number="form.stock"
                      type="number"
                      class="form-control"
                      id="productStock"
                      placeholder="0"
                      required
                    />
                  </div>
                </div>

                <div class="row">
                  <div class="col-md-6 mb-3">
                    <label for="productAuthor" class="form-label"
                      >Tác giả <span class="text-danger">*</span></label
                    >
                    <input
                      v-model.trim="form.authorName"
                      type="text"
                      class="form-control"
                      id="productAuthor"
                      placeholder="Nhập tên tác giả"
                      required
                    />
                  </div>
                  <div class="col-md-6 mb-3">
                    <label for="productPublisher" class="form-label"
                      >Nhà sản xuất / Nhà xuất bản</label
                    >
                    <input
                      v-model.trim="form.publisherName"
                      type="text"
                      class="form-control"
                      id="productPublisher"
                      placeholder="Nhập tên nhà sản xuất / nhà xuất bản"
                    />
                  </div>
                </div>

                <div class="mb-3 position-relative">
                  <label for="productCategory" class="form-label">Danh mục</label>
                  <input
                    :value="categoryQuery"
                    @input="handleCategoryInput"
                    @focus="showCategorySuggestions = true"
                    @blur="handleCategoryBlur"
                    type="text"
                    class="form-control"
                    id="productCategory"
                    placeholder="Gõ tên danh mục để tìm..."
                    autocomplete="off"
                  />
                  <div
                    v-if="showCategorySuggestions && filteredCategories.length"
                    class="list-group position-absolute w-100 shadow-sm mt-1"
                    style="z-index: 30; max-height: 240px; overflow-y: auto"
                  >
                    <button
                      v-for="category in filteredCategories"
                      :key="category.id"
                      type="button"
                      class="list-group-item list-group-item-action d-flex justify-content-between align-items-center"
                      @mousedown.prevent="selectCategory(category)"
                    >
                      <span class="fw-medium">{{ category.name }}</span>
                      <small class="text-muted">{{ category.slug }}</small>
                    </button>
                  </div>
                  <small class="text-muted">Gõ 1-2 từ để lọc rồi chọn từ danh sách gợi ý.</small>
                </div>

                <div class="mb-3">
                  <label for="productImage" class="form-label"
                    >Hình ảnh sản phẩm {{ isEdit ? '(Để trống nếu không đổi)' : '' }}</label
                  >
                  <input
                    type="file"
                    class="form-control"
                    id="productImage"
                    accept="image/*"
                    @change="handleFileChange"
                  />
                  <div v-if="imagePreview || form.imageUrl" class="mt-2">
                    <img
                      :src="imagePreview || form.imageUrl"
                      alt="Preview"
                      class="img-thumbnail"
                      style="max-height: 200px"
                    />
                  </div>
                </div>

                <div class="mb-3">
                  <label for="productDescription" class="form-label">Mô tả</label>
                  <textarea
                    v-model="form.description"
                    class="form-control"
                    id="productDescription"
                    rows="4"
                    placeholder="Nhập mô tả sản phẩm"
                  ></textarea>
                </div>
                <div class="d-flex gap-2">
                  <button type="submit" class="btn btn-primary" :disabled="loading">
                    <span
                      v-if="loading"
                      class="spinner-border spinner-border-sm me-1"
                      role="status"
                      aria-hidden="true"
                    ></span>
                    {{ loading ? 'Đang lưu...' : isEdit ? 'Cập nhật sản phẩm' : 'Thêm sản phẩm' }}
                  </button>
                  <RouterLink :to="{ name: 'admin-products' }" class="btn btn-secondary">
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
import { createBook, updateBook, getBookById, uploadImage } from '@/services/booksService'
import { getCategories } from '@/services/categoryService'
import { toast } from 'vue3-toastify'

const route = useRoute()
const router = useRouter()

const loading = ref(false)
const fetching = ref(false)
const selectedFile = ref(null)
const imagePreview = ref(null)
const categories = ref([])
const categoryQuery = ref('')
const selectedCategoryId = ref(null)
const showCategorySuggestions = ref(false)

const isEdit = computed(() => !!route.params.id)

const filteredCategories = computed(() => {
  const query = categoryQuery.value.trim().toLowerCase()
  const source = categories.value || []

  if (!query) {
    return source.slice(0, 8)
  }

  return source
    .filter((category) => {
      return (
        category.name.toLowerCase().includes(query) || category.slug.toLowerCase().includes(query)
      )
    })
    .slice(0, 8)
})

const form = reactive({
  title: '',
  sku: '',
  price: null,
  stock: null,
  authorName: '',
  publisherName: '',
  description: '',
  imageUrl: '',
})

const loadCategories = async () => {
  try {
    const response = await getCategories()
    categories.value = response?.data || response || []
  } catch (error) {
    console.error('Error loading categories:', error)
  }
}

const handleCategoryInput = (event) => {
  categoryQuery.value = event.target.value
  selectedCategoryId.value = null
  showCategorySuggestions.value = true
}

const selectCategory = (category) => {
  categoryQuery.value = category.name
  selectedCategoryId.value = category.id
  showCategorySuggestions.value = false
}

const handleCategoryBlur = () => {
  window.setTimeout(() => {
    showCategorySuggestions.value = false
  }, 150)
}

const fetchProduct = async () => {
  if (!isEdit.value) return
  fetching.value = true
  try {
    const book = await getBookById(route.params.id)
    form.title = book.title
    form.sku = book.sku
    form.price = book.price
    form.stock = book.stock
    form.authorName = book.author || ''
    form.publisherName = book.publisher || ''
    form.description = book.description || ''
    form.imageUrl = book.imageUrl || ''
    if (book.categories && book.categories.length > 0) {
      categoryQuery.value = book.categories[0].name
      selectedCategoryId.value = book.categories[0].id
    }
  } catch {
    toast.error('Lỗi khi tải thông tin sản phẩm')
    router.push({ name: 'admin-products' })
  } finally {
    fetching.value = false
  }
}

const handleFileChange = (e) => {
  const file = e.target.files[0]
  if (file) {
    selectedFile.value = file
    imagePreview.value = URL.createObjectURL(file)
  } else {
    selectedFile.value = null
    imagePreview.value = null
  }
}

const handleSubmit = async () => {
  if (!form.title || !form.sku || form.price === null || form.stock === null) {
    toast.warning('Vui lòng điền đầy đủ các trường bắt buộc')
    return
  }

  loading.value = true
  try {
    const normalizedCategory = categoryQuery.value.trim().toLowerCase()
    const matchedCategory =
      selectedCategoryId.value ||
      categories.value.find(
        (category) =>
          category.name.toLowerCase() === normalizedCategory ||
          category.slug.toLowerCase() === normalizedCategory,
      )?.id ||
      null

    if (categoryQuery.value.trim() && !matchedCategory) {
      toast.warning('Vui lòng chọn một danh mục từ danh sách gợi ý')
      loading.value = false
      return
    }

    let imageUrl = form.imageUrl

    if (selectedFile.value) {
      toast.info('Đang tải ảnh lên...', { autoClose: 1500 })
      try {
        const uploadRes = await uploadImage(selectedFile.value)
        imageUrl = uploadRes?.url || ''
      } catch (uploadError) {
        console.error('Error uploading image:', uploadError)
        toast.warning('Upload ảnh thất bại, sử dụng ảnh cũ.')
      }
    }

    const payload = {
      title: form.title,
      sku: form.sku,
      price: Number(form.price),
      stock: Number(form.stock),
      authorName: form.authorName,
      publisherName: form.publisherName,
      description: form.description,
      imageUrl: imageUrl,
    }

    if (matchedCategory) {
      payload.categoryIds = [Number(matchedCategory)]
    }

    if (isEdit.value) {
      await updateBook(route.params.id, payload)
      toast.success('Cập nhật sản phẩm thành công!')
    } else {
      await createBook(payload)
      toast.success('Thêm sản phẩm thành công!')
    }
    router.push({ name: 'admin-products' })
  } catch (error) {
    console.error('Error saving product:', error)
    toast.error(error.message || 'Lỗi khi lưu sản phẩm')
  } finally {
    loading.value = false
  }
}

onMounted(async () => {
  await loadCategories()
  await fetchProduct()
})
</script>
