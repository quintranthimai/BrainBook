<template>
  <div class="container d-flex align-items-center justify-content-center min-vh-100">
    <div class="card" style="max-width: 420px; width: 100%">
      <div class="card-body p-5">
        <div class="text-center mb-3">
          <RouterLink to="/" class="mb-4 d-inline-block">
            <img src="/admin-assets/assets/images/logo-icon.svg" alt="" width="36" />
            <span class="ms-2">
              <img src="/admin-assets/assets/images/logo.svg" alt="" />
            </span>
          </RouterLink>
          <h1 class="card-title mb-5 h5 fw-bold text-primary">Đăng nhập vào tài khoản</h1>
        </div>

        <form class="needs-validation mt-3" novalidate @submit.prevent="handleSubmit">
          <div class="mb-3">
            <label for="email" class="form-label">Địa chỉ email</label>
            <input
              id="email"
              type="email"
              class="form-control"
              placeholder="name@example.com"
              required
              autofocus
              v-model.trim="email"
            />
            <div class="invalid-feedback">Vui lòng nhập email hợp lệ.</div>
          </div>

          <div class="mb-3">
            <label for="password" class="form-label d-flex justify-content-between">
              <span>Mật khẩu</span>
              <a href="#" class="small link-primary">Quên mật khẩu?</a>
            </label>
            <input
              id="password"
              type="password"
              class="form-control"
              placeholder="Mật khẩu"
              required
              minlength="6"
              v-model="password"
            />
            <div class="invalid-feedback">Vui lòng nhập mật khẩu (tối thiểu 6 ký tự).</div>
          </div>

          <div class="d-flex justify-content-between align-items-center mb-3">
            <div class="form-check">
              <input id="remember" class="form-check-input" type="checkbox" />
              <label class="form-check-label small" for="remember">Ghi nhớ đăng nhập</label>
            </div>
          </div>

          <div v-if="error" class="alert alert-danger py-2" role="alert">{{ error }}</div>

          <button class="btn btn-primary w-100" type="submit" :disabled="loading">
            {{ loading ? 'Đang đăng nhập...' : 'Đăng nhập' }}
          </button>
        </form>

        <div class="text-center mt-3 small text-muted">
          Chưa có tài khoản?
          <RouterLink :to="{ name: 'admin-signup' }" class="link-primary">Đăng ký</RouterLink>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth'

import { login } from '@/services/authService'

const router = useRouter()
const route = useRoute()
const auth = useAuthStore()

const email = ref('')
const password = ref('')
const loading = ref(false)
const error = ref('')

async function handleSubmit() {
  loading.value = true
  error.value = ''

  try {
    const response = await login({ email: email.value, password: password.value })
    const token =
      response?.access_token ||
      response?.accessToken ||
      response?.token ||
      response?.data?.access_token ||
      response?.data?.accessToken ||
      response?.data?.token
    if (token) {
      auth.setTokens(token, response?.refresh_token || response?.data?.refresh_token || null)
    }

    const redirect = typeof route.query.redirect === 'string' ? route.query.redirect : ''
    if (redirect && redirect.startsWith('/admin')) {
      await router.replace(redirect)
      return
    }

    await router.push({ name: 'admin' })
  } catch (exception) {
    error.value = exception instanceof Error ? exception.message : 'Đăng nhập thất bại'
  } finally {
    loading.value = false
  }
}
</script>
