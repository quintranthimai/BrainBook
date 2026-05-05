<template>
  <main id="content" class="content py-10">
    <div class="container-fluid">
      <div class="row">
        <div class="col-12">
          <div class="mb-4">
            <h1 class="fs-3 mb-1 fw-bold text-primary">{{ isEdit ? 'Chỉnh sửa' : 'Thêm' }} bài viết</h1>
          </div>
        </div>
      </div>
      <div class="card shadow-sm border-0">
        <div class="card-body p-4">
          <form @submit.prevent="handleSubmit">
            <div class="row g-3">
              <div class="col-md-8">
                <div class="mb-3">
                  <label class="form-label fw-bold">Tiêu đề</label>
                  <input v-model="form.title" type="text" class="form-control" placeholder="Nhập tiêu đề bài viết" required />
                </div>
                <div class="mb-3">
                  <label class="form-label fw-bold">Nội dung</label>
                  <textarea v-model="form.content" class="form-control" rows="15" placeholder="Nội dung bài viết (HTML hoặc văn bản)" required></textarea>
                </div>
              </div>
              <div class="col-md-4">
                <div class="mb-3">
                  <label class="form-label fw-bold">Tác giả</label>
                  <input v-model="form.author" type="text" class="form-control" placeholder="Tên tác giả" required />
                </div>
                <div class="mb-3">
                  <label class="form-label fw-bold">Mô tả ngắn (Excerpt)</label>
                  <textarea v-model="form.excerpt" class="form-control" rows="4" placeholder="Mô tả ngắn gọn về bài viết"></textarea>
                </div>
                <div class="mb-3">
                  <label class="form-label fw-bold">Hình ảnh đại diện (URL)</label>
                  <input v-model="form.thumbnail" type="text" class="form-control" placeholder="URL hình ảnh" />
                  <div v-if="form.thumbnail" class="mt-2 text-center border p-2 rounded">
                    <img :src="form.thumbnail" class="img-fluid rounded" style="max-height: 200px;" />
                  </div>
                </div>
                <div class="d-grid gap-2 mt-4">
                  <button type="submit" class="btn btn-primary" :disabled="submitting">
                    {{ submitting ? 'Đang lưu...' : 'Lưu bài viết' }}
                  </button>
                  <RouterLink :to="{ name: 'admin-blog' }" class="btn btn-outline-secondary">Hủy</RouterLink>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  </main>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { apiGet, apiPost, apiPatch } from '@/lib/api'
import { toast } from 'vue3-toastify'

const route = useRoute()
const router = useRouter()
const submitting = ref(false)

const isEdit = computed(() => !!route.params.id)

const form = ref({
  title: '',
  content: '',
  excerpt: '',
  thumbnail: '',
  author: ''
})

const fetchPost = async () => {
  if (!isEdit.value) return
  try {
    const post = await apiGet(`/posts/${route.params.id}`)
    form.value = {
      title: post.title,
      content: post.content,
      excerpt: post.excerpt || '',
      thumbnail: post.thumbnail || '',
      author: post.author
    }
  } catch (error) {
    toast.error('Lỗi khi tải thông tin bài viết')
    router.push({ name: 'admin-blog' })
  }
}

const handleSubmit = async () => {
  submitting.value = true
  try {
    if (isEdit.value) {
      await apiPatch(`/posts/${route.params.id}`, { body: form.value })
      toast.success('Đã cập nhật bài viết')
    } else {
      await apiPost('/posts', { body: form.value })
      toast.success('Đã thêm bài viết mới')
    }
    router.push({ name: 'admin-blog' })
  } catch (error) {
    console.error('Submit error:', error)
    toast.error('Có lỗi xảy ra khi lưu bài viết')
  } finally {
    submitting.value = false
  }
}

onMounted(fetchPost)
</script>
