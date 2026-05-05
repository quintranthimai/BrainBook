<template>
  <main class="py-5 bg-light min-vh-100 d-flex align-items-center">
    <div class="container">
      <div class="row justify-content-center">
        <div class="col-md-5">
          <div class="card shadow-lg border-0 p-4">
            <div class="text-center mb-4">
              <h2 class="fw-bold text-primary">Login to BrainBook</h2>
              <p class="text-muted">Access your account and orders</p>
            </div>
            <form @submit.prevent="handleLogin">
              <div class="mb-3">
                <label class="form-label">Email address</label>
                <input v-model="email" type="email" class="form-control" placeholder="name@example.com" required />
              </div>
              <div class="mb-3">
                <label class="form-label d-flex justify-content-between">
                  Password
                  <a href="#" class="small text-decoration-none">Forgot password?</a>
                </label>
                <input v-model="password" type="password" class="form-control" placeholder="Enter password" required />
              </div>
              <button type="submit" class="btn btn-primary w-100 py-2 mt-3" :disabled="loading">
                {{ loading ? 'Logging in...' : 'Login' }}
              </button>
            </form>
            <div class="text-center mt-4 pt-3 border-top">
              <p class="small text-muted mb-3">Or login with</p>
              <div class="d-grid gap-2">
                <button type="button" @click="googleLogin" class="btn btn-outline-danger d-flex align-items-center justify-content-center gap-2 py-2">
                  <i class="ti ti-brand-google fs-5"></i> Google
                </button>
              </div>
              <p class="small text-muted mt-4">Don't have an account? 
                <RouterLink to="/register" class="text-primary fw-bold text-decoration-none">Register here</RouterLink>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </main>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { useAuthStore } from '@/stores/auth'

import { toast } from 'vue3-toastify'
import { useCodeClient } from 'vue3-google-signin'
import { apiClient } from '@/services/api'
import { useCartStore } from '@/stores/cart'

const router = useRouter()
const route = useRoute()
const auth = useAuthStore()
const cart = useCartStore()

const email = ref('')
const password = ref('')
const loading = ref(false)

const handleLogin = async () => {
  loading.value = true
  const success = await auth.login(email.value, password.value)
  loading.value = false
  if (success) {
    cart.fetchCart()
    if (auth.user?.role === 'ADMIN') {
      router.push('/admin')
    } else {
      const redirect = route.query.redirect || '/'
      router.push(redirect)
    }
  }
}

const { login: googleLogin } = useCodeClient({
  onSuccess: async (response) => {
    try {
      const res = await apiClient.post('/auth/google', { code: response.code })
      if (res.access_token) {
        auth.setTokens(res.access_token, res.refresh_token)
        await auth.fetchProfile()
        toast.success('Login with Google successful!')
        cart.fetchCart()
        
        if (auth.user?.role === 'ADMIN') {
          router.push('/admin')
        } else {
          router.push('/')
        }
        
        setTimeout(() => window.location.reload(), 500)
      }
    } catch (e) {
      toast.error('Google login failed')
    }
  },
  onError: () => toast.error('Google Login Error'),
})
</script>
