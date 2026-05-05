<template>
  <main class="py-5 bg-light min-vh-100 d-flex align-items-center">
    <div class="container">
      <div class="row justify-content-center">
        <div class="col-md-6">
          <div class="card shadow-lg border-0 p-4">
            <div class="text-center mb-4">
              <h2 class="fw-bold text-primary">Create Account</h2>
              <p class="text-muted">Join the BrainBook community today</p>
            </div>
            <form @submit.prevent="handleRegister">
              <div class="row g-3 mb-3">
                <div class="col-md-6">
                  <label class="form-label">First Name</label>
                  <input v-model="form.firstName" type="text" class="form-control" placeholder="John" required />
                </div>
                <div class="col-md-6">
                  <label class="form-label">Last Name</label>
                  <input v-model="form.lastName" type="text" class="form-control" placeholder="Doe" required />
                </div>
              </div>
              <div class="mb-3">
                <label class="form-label">Email address</label>
                <input v-model="form.email" type="email" class="form-control" placeholder="name@example.com" required />
              </div>
              <div class="mb-3">
                <label class="form-label">Password</label>
                <input v-model="form.password" type="password" class="form-control" placeholder="Min 6 characters" minlength="6" required />
              </div>
              <div class="form-check mb-4">
                <input class="form-check-input" type="checkbox" id="terms" required />
                <label class="form-check-label small text-muted" for="terms">
                  I agree to the Terms & Conditions and Privacy Policy.
                </label>
              </div>
              <button type="submit" class="btn btn-primary w-100 py-2" :disabled="loading">
                {{ loading ? 'Creating account...' : 'Register' }}
              </button>
            </form>
            <div class="text-center mt-4">
              <p class="small text-muted">Already have an account? 
                <RouterLink to="/login" class="text-primary fw-bold text-decoration-none">Login here</RouterLink>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </main>
</template>

<script setup>
import { reactive, ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth'

const router = useRouter()
const auth = useAuthStore()

const loading = ref(false)
const form = reactive({
  email: '',
  password: '',
  firstName: '',
  lastName: ''
})

const handleRegister = async () => {
  loading.value = true
  const success = await auth.register(form)
  loading.value = false
  if (success) {
    router.push('/login')
  }
}
</script>
