<template>
  <main id="content" class="content py-10">
    <div class="container-fluid">
      <div class="row">
        <div class="col-12">
          <div class="mb-4">
            <h1 class="fs-3 mb-1 fw-bold text-primary">Quản lý người dùng</h1>
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
                  <th>Người dùng</th>
                  <th>Email</th>
                  <th>Vai trò</th>
                  <th>Ngày tạo</th>
                  <th>Thao tác</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="user in users" :key="user.id" class="align-middle">
                  <td>{{ user.firstName }} {{ user.lastName }}</td>
                  <td>{{ user.email }}</td>
                  <td>
                    <select 
                      :value="user.role" 
                      @change="changeRole(user.id, $event.target.value)"
                      class="form-select form-select-sm w-auto"
                    >
                      <option value="CUSTOMER">Customer</option>
                      <option value="ADMIN">Admin</option>
                    </select>
                  </td>
                  <td>{{ formatDate(user.createdAt) }}</td>
                  <td>
                    <button @click="handleDelete(user.id)" class="btn btn-sm btn-outline-danger">
                      <i class="ti ti-trash"></i>
                    </button>
                  </td>
                </tr>
                <tr v-if="users.length === 0">
                  <td colspan="5" class="text-center py-4 text-muted">Không tìm thấy người dùng nào.</td>
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
import { getUsers, updateUserRole, deleteUser } from '@/services/userService'
import { toast } from 'vue3-toastify'

const users = ref([])
const loading = ref(false)

const fetchUsers = async () => {
  loading.value = true
  try {
    users.value = await getUsers()
  } catch (error) {
    console.error('Failed to fetch users', error)
    toast.error('Lỗi khi tải danh sách người dùng')
  } finally {
    loading.value = false
  }
}

const changeRole = async (id, newRole) => {
  try {
    await updateUserRole(id, newRole)
    toast.success('Đã cập nhật vai trò')
    fetchUsers()
  } catch (error) {
    toast.error('Lỗi khi cập nhật vai trò')
  }
}

const handleDelete = async (id) => {
  if (!confirm('Bạn có chắc chắn muốn xóa người dùng này?')) return
  try {
    await deleteUser(id)
    toast.success('Đã xóa người dùng')
    fetchUsers()
  } catch (error) {
    toast.error('Lỗi khi xóa người dùng')
  }
}

const formatDate = (dateStr) => {
  return new Date(dateStr).toLocaleDateString('vi-VN')
}

onMounted(fetchUsers)
</script>
