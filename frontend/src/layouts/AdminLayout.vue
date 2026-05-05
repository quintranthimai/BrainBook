<template>
  <div class="admin-main-wrapper">
    <div
      id="overlay"
      class="overlay"
      :class="{ show: isMobileOpen }"
      role="button"
      tabindex="0"
      aria-label="Close sidebar"
      @click="closeMobile"
    />

    <AdminSidebar :collapsed="isCollapsed" :mobile-open="isMobileOpen" @navigate="closeMobile" />

    <div class="content-page">
      <AdminTopbar :full="isCollapsed" @toggle-desktop="toggleDesktop" @open-mobile="openMobile" />

      <main class="admin-content">
        <RouterView />
      </main>

      <AdminFooter />
    </div>
  </div>
</template>

<script setup>
import { onMounted, onUnmounted, ref, watch } from 'vue'
import AdminSidebar from '@/components/admin/AdminSidebar.vue'
import AdminTopbar from '@/components/admin/AdminTopbar.vue'
import AdminFooter from '@/components/admin/AdminFooter.vue'

const ADMIN_STYLE_ID = 'admin-template-style'

const isCollapsed = ref(false)
const isMobileOpen = ref(false)

const ensureAdminStyles = () => {
  if (document.getElementById(ADMIN_STYLE_ID)) return
  const link = document.createElement('link')
  link.id = ADMIN_STYLE_ID
  link.rel = 'stylesheet'
  link.href = '/admin-assets/assets/css/style.css'
  document.head.appendChild(link)
}

const removeAdminStyles = () => {
  document.getElementById(ADMIN_STYLE_ID)?.remove()
}

const syncContentFullClass = () => {
  // template CSS expects `.content.full` + `.topbar.full`
  document.getElementById('content')?.classList.toggle('full', isCollapsed.value)
}

const toggleDesktop = () => {
  isCollapsed.value = !isCollapsed.value
}

const openMobile = () => {
  isMobileOpen.value = true
}

const closeMobile = () => {
  isMobileOpen.value = false
}

onMounted(() => {
  ensureAdminStyles()
  syncContentFullClass()
})

watch(isCollapsed, () => {
  syncContentFullClass()
})

onUnmounted(() => {
  // đảm bảo đóng menu mobile khi rời /admin
  isMobileOpen.value = false
  document.getElementById('content')?.classList.remove('full')
  removeAdminStyles()
})
</script>
