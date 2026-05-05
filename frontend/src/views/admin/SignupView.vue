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
          <h1 class="card-title mb-5 h5 fw-bold text-primary">Tạo tài khoản</h1>
        </div>

        <form class="needs-validation mt-3" novalidate @submit.prevent="handleSubmit">
          <div class="mb-3">
            <label for="fullName" class="form-label">Họ và tên</label>
            <input
              id="fullName"
              type="text"
              class="form-control"
              placeholder="Jane Doe"
              required
              v-model.trim="fullName"
            />
            <div class="invalid-feedback">Vui lòng nhập họ và tên.</div>
          </div>

          <div class="mb-3">
            <label for="email" class="form-label">Địa chỉ email</label>
            <input
              id="email"
              type="email"
              class="form-control"
              placeholder="name@example.com"
              required
              v-model.trim="email"
            />
            <div class="invalid-feedback">Vui lòng nhập email hợp lệ.</div>
          </div>

          <div class="mb-3">
            <label for="password" class="form-label">Mật khẩu</label>
            <input
              id="password"
              type="password"
              class="form-control"
              placeholder="Tạo mật khẩu"
              required
              minlength="6"
              v-model="password"
            />
            <div class="invalid-feedback">Vui lòng nhập mật khẩu (tối thiểu 6 ký tự).</div>
          </div>

          <div class="mb-3">
            <label for="confirmPassword" class="form-label">Xác nhận mật khẩu</label>
            <input
              id="confirmPassword"
              type="password"
              class="form-control"
              placeholder="Nhập lại mật khẩu"
              required
              v-model="confirmPassword"
            />
            <div class="invalid-feedback">Mật khẩu phải trùng khớp.</div>
          </div>

          <div class="mb-3 form-check">
            <input
              id="terms"
              class="form-check-input"
              type="checkbox"
              required
              v-model="accepted"
            />
            <label class="form-check-label small" for="terms"
              >Tôi đồng ý với
              <a href="#" class="text-decoration-none">điều khoản và quyền riêng tư</a></label
            >
            <div class="invalid-feedback">Bạn cần đồng ý trước khi tiếp tục.</div>
          </div>

          <div v-if="error" class="alert alert-danger py-2" role="alert">{{ error }}</div>
          <div v-if="success" class="alert alert-success py-2" role="alert">
            Tạo tài khoản thành công. Đang chuyển hướng...
          </div>

          <button class="btn btn-primary w-100" type="submit" :disabled="loading">
            {{ loading ? 'Đang đăng ký...' : 'Đăng ký' }}
          </button>
        </form>

        <div class="text-center mt-3 small text-muted">
          Đã có tài khoản?
          <RouterLink :to="{ name: 'admin-signin' }" class="link-primary">Đăng nhập</RouterLink>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth'

import { register } from '@/services/authService'

const router = useRouter()
const auth = useAuthStore()

const fullName = ref('')
const email = ref('')
const password = ref('')
const confirmPassword = ref('')
const accepted = ref(false)

const loading = ref(false)
const error = ref('')
const success = ref(false)

async function handleSubmit() {
  error.value = ''
  success.value = false

  if (!fullName.value) {
    error.value = 'Vui lòng nhập họ và tên'
    return
  }

  const nameParts = fullName.value.split(/\s+/).filter(Boolean)
  if (nameParts.length < 2) {
    error.value = 'Vui lòng nhập đầy đủ họ và tên (ít nhất 2 từ)'
    return
  }

  const firstName = nameParts[0]
  const lastName = nameParts.slice(1).join(' ')

  if (!email.value) {
    error.value = 'Vui lòng nhập email'
    return
  }
  if (!password.value || password.value.length < 6) {
    error.value = 'Mật khẩu phải có ít nhất 6 ký tự'
    return
  }
  if (password.value !== confirmPassword.value) {
    error.value = 'Mật khẩu xác nhận không khớp'
    return
  }
  if (!accepted.value) {
    error.value = 'Bạn cần đồng ý điều khoản để tiếp tục'
    return
  }

  loading.value = true
  try {
    const response = await register({
      email: email.value,
      password: password.value,
      firstName,
      lastName,
    })
    success.value = true

    const token = response?.access_token || response?.accessToken || response?.token
    if (token) {
      auth.setTokens(token, response?.refresh_token || response?.data?.refresh_token || null)
      await router.push({ name: 'admin' })
      return
    }

    setTimeout(() => {
      router.push({ name: 'admin-signin' })
    }, 500)
  } catch (exception) {
    error.value = exception instanceof Error ? exception.message : 'Đăng ký thất bại'
  } finally {
    loading.value = false
  }
}
</script>
