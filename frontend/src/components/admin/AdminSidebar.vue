<template>
  <aside
    id="sidebar"
    class="sidebar"
    :class="{ collapsed, 'mobile-show': mobileOpen }"
    aria-label="Admin sidebar"
  >
    <div class="logo-area">
      <RouterLink to="/admin" class="d-inline-flex align-items-center text-decoration-none">
        <span class="logo-text ms-2 fw-bold text-primary fs-4">BrainBook</span>
      </RouterLink>
    </div>

    <ul class="nav flex-column">
      <li>
        <RouterLink class="nav-link" to="/admin" active-class="active" @click="emitNavigate">
          <i class="ti ti-home"></i><span class="nav-text">Bảng điều khiển</span>
        </RouterLink>
      </li>
      <li>
        <RouterLink class="nav-link" to="/admin/products">
          <i class="ti ti-box"></i><span class="nav-text">Sản phẩm</span>
        </RouterLink>
      </li>
      <li>
        <RouterLink class="nav-link" to="/admin/create-product">
          <i class="ti ti-plus"></i><span class="nav-text">Thêm sản phẩm</span>
        </RouterLink>
      </li>
      <li>
        <RouterLink class="nav-link" to="/admin/categories">
          <i class="ti ti-tags"></i><span class="nav-text">Danh mục</span>
        </RouterLink>
      </li>
      <li>
        <RouterLink class="nav-link" to="/admin/create-category">
          <i class="ti ti-plus"></i><span class="nav-text">Thêm danh mục</span>
        </RouterLink>
      </li>
      <li>
        <RouterLink class="nav-link" to="/admin/orders">
          <i class="ti ti-shopping-cart"></i><span class="nav-text">Đơn hàng</span>
        </RouterLink>
      </li>
      <li>
        <RouterLink class="nav-link" to="/admin/reports">
          <i class="ti ti-receipt"></i><span class="nav-text">Báo cáo</span>
        </RouterLink>
      </li>
      <li>
        <RouterLink class="nav-link" to="/admin/blog" active-class="active">
          <i class="ti ti-news"></i><span class="nav-text">Quản lý Blog</span>
        </RouterLink>
      </li>
      <li>
        <RouterLink class="nav-link" to="/admin/users" active-class="active">
          <i class="ti ti-users"></i><span class="nav-text">Người dùng</span>
        </RouterLink>
      </li>
      <li>
        <RouterLink class="nav-link" to="/admin/inventory" active-class="active">
          <i class="ti ti-package"></i><span class="nav-text">Kho hàng</span>
        </RouterLink>
      </li>
      <li class="px-4 pt-4 pb-2"><small class="nav-text text-secondary">Tài khoản</small></li>
      <li v-if="isAuthed">
        <a class="nav-link" href="#" @click.prevent="handleLogout">
          <i class="ti ti-logout"></i><span class="nav-text">Đăng xuất</span>
        </a>
      </li>
      <template v-else>
        <li>
          <RouterLink class="nav-link" to="/admin/signin" @click="emitNavigate">
            <i class="ti ti-login"></i><span class="nav-text">Đăng nhập</span>
          </RouterLink>
        </li>
        <li>
          <RouterLink class="nav-link" to="/admin/signup" @click="emitNavigate">
            <i class="ti ti-user-plus"></i><span class="nav-text">Đăng ký</span>
          </RouterLink>
        </li>
      </template>
    </ul>
  </aside>
</template>

<script setup>
import { computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { RouterLink } from 'vue-router'

import { clearAccessToken, getAccessToken } from '@/services/api'

defineProps({
  collapsed: { type: Boolean, default: false },
  mobileOpen: { type: Boolean, default: false },
})

const emit = defineEmits(['navigate'])
const emitNavigate = () => emit('navigate')

const router = useRouter()
const route = useRoute()

const isAuthed = computed(() => {
  // Make it reactive on navigation (signin -> dashboard, logout -> signin)
  route.fullPath
  return Boolean(getAccessToken())
})

async function handleLogout() {
  clearAccessToken()
  emitNavigate()
  await router.push({ name: 'admin-signin' })
}
</script>
