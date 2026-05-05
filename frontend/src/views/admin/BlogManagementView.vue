<template>
  <main id="content" class="content py-10">
    <div class="container-fluid">
      <div class="row">
        <div class="col-12">
          <div class="d-flex justify-content-between align-items-center mb-4">
            <div>
              <h1 class="fs-3 mb-1 fw-bold text-primary">Quản lý Blog</h1>
            </div>
            <div>
              <RouterLink :to="{ name: 'admin-create-post' }" class="btn btn-primary">Thêm bài viết</RouterLink>
            </div>
          </div>
        </div>
      </div>
      <div class="row">
        <div class="col-12">
          <div class="card table-responsive">
            <div v-if="loading" class="text-center p-4">
              <div class="spinner-border text-primary" role="status">
                <span class="visually-hidden">Loading...</span>
              </div>
            </div>
            <table v-else class="table mb-0 text-nowrap table-hover">
              <thead class="table-light border-light">
                <tr>
                  <th>Tiêu đề</th>
                  <th>Tác giả</th>
                  <th>Ngày tạo</th>
                  <th>Thao tác</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="post in posts" :key="post.id" class="align-middle">
                  <td>
                    <div class="d-flex align-items-center">
                      <img
                        :src="post.thumbnail || '/images/post-item1.jpg'"
                        alt=""
                        class="avatar avatar-md rounded"
                        style="width: 50px; height: 50px; object-fit: cover;"
                      />
                      <span class="ms-3 text-dark text-truncate" style="max-width: 300px;" :title="post.title">
                        {{ post.title }}
                      </span>
                    </div>
                  </td>
                  <td>{{ post.author }}</td>
                  <td>{{ formatDate(post.createdAt) }}</td>
                  <td>
                    <RouterLink :to="{ name: 'admin-edit-post', params: { id: post.id } }" class="btn btn-sm btn-outline-primary me-2">
                      <i class="ti ti-edit"></i>
                    </RouterLink>
                    <button @click="deletePost(post.id)" class="btn btn-sm btn-outline-danger">
                      <i class="ti ti-trash"></i>
                    </button>
                  </td>
                </tr>
                <tr v-if="posts.length === 0">
                  <td colspan="4" class="text-center py-4 text-muted">Không tìm thấy bài viết nào.</td>
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
import { apiGet, apiDelete } from '@/lib/api'
import { toast } from 'vue3-toastify'

const posts = ref([])
const loading = ref(false)

const fetchPosts = async () => {
  loading.value = true
  try {
    posts.value = await apiGet('/posts')
  } catch (error) {
    console.error('Failed to fetch posts', error)
    toast.error('Lỗi khi tải danh sách bài viết')
  } finally {
    loading.value = false
  }
}

const deletePost = async (id) => {
  if (!confirm('Bạn có chắc chắn muốn xóa bài viết này?')) return
  try {
    await apiDelete(`/posts/${id}`)
    toast.success('Đã xóa bài viết')
    fetchPosts()
  } catch (error) {
    toast.error('Lỗi khi xóa bài viết')
  }
}

const formatDate = (dateStr) => {
  return new Date(dateStr).toLocaleDateString('vi-VN')
}

onMounted(fetchPosts)
</script>
