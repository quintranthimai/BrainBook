<template>
  <header id="header" class="site-header">
    <nav id="header-nav" class="navbar navbar-expand-lg py-3">
      <div class="container">
        <a class="navbar-brand text-decoration-none" href="/">
          <h2 class="text-primary fw-bold m-0">BrainBook</h2>
        </a>
        <button
          class="navbar-toggler d-flex d-lg-none order-3 p-2"
          type="button"
          data-bs-toggle="offcanvas"
          data-bs-target="#bdNavbar"
          aria-controls="bdNavbar"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <svg class="navbar-icon">
            <use xlink:href="#navbar-icon"></use>
          </svg>
        </button>
        <div
          class="offcanvas offcanvas-end"
          tabindex="-1"
          id="bdNavbar"
          aria-labelledby="bdNavbarOffcanvasLabel"
        >
          <div class="offcanvas-header px-4 pb-0">
            <a class="navbar-brand text-decoration-none" href="/">
              <h2 class="text-primary fw-bold m-0">BrainBook</h2>
            </a>
            <button
              type="button"
              class="btn-close btn-close-black"
              data-bs-dismiss="offcanvas"
              aria-label="Close"
              data-bs-target="#bdNavbar"
            ></button>
          </div>
          <div class="offcanvas-body">
            <ul
              id="navbar"
              class="navbar-nav text-uppercase justify-content-start justify-content-lg-center align-items-start align-items-lg-center flex-grow-1"
            >
              <li class="nav-item">
                <RouterLink class="nav-link me-4" to="/">Home</RouterLink>
              </li>
              <li class="nav-item">
                <RouterLink class="nav-link me-4" to="/about">About</RouterLink>
              </li>
              <li class="nav-item">
                <RouterLink class="nav-link me-4" to="/shop">Shop</RouterLink>
              </li>
              <li class="nav-item">
                <RouterLink class="nav-link me-4" to="/blogs">Blogs</RouterLink>
              </li>
              <li class="nav-item">
                <RouterLink class="nav-link me-4" to="/contact">Contact</RouterLink>
              </li>
            </ul>
            <div class="user-items d-flex">
              <ul class="d-flex justify-content-end list-unstyled mb-0">
                <li class="search-item pe-3">
                  <a href="#" class="search-button">
                    <svg class="search">
                      <use xlink:href="#search"></use>
                    </svg>
                  </a>
                </li>
                <!-- Auth Dropdown if logged in -->
                <li class="pe-3 dropdown" v-if="auth.isLoggedIn">
                  <a href="#" class="dropdown-toggle d-flex align-items-center gap-1 text-decoration-none" data-bs-toggle="dropdown" aria-expanded="false">
                    <svg class="user text-primary">
                      <use xlink:href="#user"></use>
                    </svg>
                    <span v-if="auth.user" class="fw-medium text-dark d-none d-lg-block">{{ auth.user.firstName || auth.user.email.split('@')[0] }}</span>
                  </a>
                  <ul class="dropdown-menu dropdown-menu-end shadow-sm">
                    <li><h6 class="dropdown-header">My Account</h6></li>
                    <li><RouterLink class="dropdown-item" to="/account">Dashboard</RouterLink></li>
                    <li><RouterLink class="dropdown-item" to="/account">Orders</RouterLink></li>
                    <li><hr class="dropdown-divider"></li>
                    <li><a class="dropdown-item text-danger" href="#" @click.prevent="auth.logout()">Logout</a></li>
                  </ul>
                </li>

                <!-- Auth Modal trigger if not logged in -->
                <li class="pe-3" v-else>
                  <a href="#" data-bs-toggle="modal" data-bs-target="#exampleModal">
                    <svg class="user">
                      <use xlink:href="#user"></use>
                    </svg>
                  </a>
                  <!-- Modal -->
                  <div
                    class="modal fade"
                    id="exampleModal"
                    tabindex="-1"
                    aria-labelledby="exampleModalLabel"
                    aria-hidden="true"
                  >
                    <div class="modal-dialog">
                      <div class="modal-content">
                        <div class="modal-header border-bottom-0">
                          <button
                            type="button"
                            class="btn-close"
                            data-bs-dismiss="modal"
                            aria-label="Close"
                          ></button>
                        </div>
                        <div class="modal-body">
                          <div class="tabs-listing">
                            <nav>
                              <div
                                class="nav nav-tabs d-flex justify-content-center"
                                id="nav-tab"
                                role="tablist"
                              >
                                <button
                                  class="nav-link text-capitalize active"
                                  id="nav-sign-in-tab"
                                  data-bs-toggle="tab"
                                  data-bs-target="#nav-sign-in"
                                  type="button"
                                  role="tab"
                                  aria-controls="nav-sign-in"
                                  aria-selected="true"
                                >
                                  Sign In
                                </button>
                                <button
                                  class="nav-link text-capitalize"
                                  id="nav-register-tab"
                                  data-bs-toggle="tab"
                                  data-bs-target="#nav-register"
                                  type="button"
                                  role="tab"
                                  aria-controls="nav-register"
                                  aria-selected="false"
                                >
                                  Register
                                </button>
                              </div>
                            </nav>
                            <div class="tab-content" id="nav-tabContent">
                              <div
                                class="tab-pane fade active show"
                                id="nav-sign-in"
                                role="tabpanel"
                                aria-labelledby="nav-sign-in-tab"
                              >
                               <form @submit.prevent="handleLogin">
                                <div class="form-group py-3">
                                  <label class="mb-2" for="sign-in"
                                    >Email address *</label
                                  >
                                  <input
                                    type="email"
                                    v-model="loginEmail"
                                    placeholder="Your Email"
                                    class="form-control w-100 rounded-3 p-3"
                                    required
                                  />
                                </div>
                                <div class="form-group pb-3">
                                  <label class="mb-2" for="sign-in">Password *</label>
                                  <input
                                    type="password"
                                    v-model="loginPassword"
                                    placeholder="Your Password"
                                    class="form-control w-100 rounded-3 p-3"
                                    required
                                  />
                                </div>
                                <button type="submit" class="btn btn-dark w-100 my-3">
                                  Login
                                </button>
                               </form>
                              </div>
                              <div
                                class="tab-pane fade"
                                id="nav-register"
                                role="tabpanel"
                                aria-labelledby="nav-register-tab"
                              >
                                <div v-if="regStep === 1">
                                  <form @submit.prevent="regStep = 2" class="p-3">
                                    <div class="mb-3">
                                      <label class="small mb-1">Email address *</label>
                                      <input v-model="registerEmail" type="email" placeholder="email@example.com" class="form-control" required />
                                    </div>
                                    <div class="mb-3">
                                      <label class="small mb-1">Password *</label>
                                      <input v-model="registerPassword" type="password" minlength="8" placeholder="At least 8 characters" class="form-control" required />
                                    </div>
                                    <div class="mb-3">
                                      <label class="small mb-1">Confirm Password *</label>
                                      <input v-model="registerConfirm" type="password" placeholder="Re-type password" class="form-control" required />
                                      <div v-if="registerPassword && registerConfirm && registerPassword !== registerConfirm" class="text-danger small mt-1">
                                        Passwords do not match
                                      </div>
                                    </div>
                                    <button type="submit" class="btn btn-dark w-100" :disabled="registerPassword !== registerConfirm">Next Step</button>
                                  </form>
                                </div>

                                <div v-else-if="regStep === 2">
                                  <form @submit.prevent="handleRegister" class="p-3">
                                    <div class="row g-2 mb-3">
                                      <div class="col-6">
                                        <label class="small mb-1">First Name *</label>
                                        <input v-model="registerFirst" type="text" placeholder="John" class="form-control" required />
                                      </div>
                                      <div class="col-6">
                                        <label class="small mb-1">Last Name *</label>
                                        <input v-model="registerLast" type="text" placeholder="Doe" class="form-control" required />
                                      </div>
                                    </div>
                                    <div class="mb-3">
                                      <label class="small mb-1">Phone Number</label>
                                      <input v-model="registerPhone" type="tel" placeholder="0123456789" class="form-control" />
                                    </div>
                                    <div class="row g-2 mb-3">
                                      <div class="col-6">
                                        <label class="small mb-1">Birthday</label>
                                        <input v-model="registerBirthday" type="date" class="form-control" />
                                      </div>
                                      <div class="col-6">
                                        <label class="small mb-1">Gender</label>
                                        <select v-model="registerGender" class="form-select">
                                          <option value="">Other</option>
                                          <option value="male">Male</option>
                                          <option value="female">Female</option>
                                        </select>
                                      </div>
                                    </div>
                                    <div class="form-check mb-2">
                                      <input class="form-check-input" type="checkbox" id="newsletter" v-model="registerNewsletter">
                                      <label class="form-check-label small" for="newsletter">
                                        I want to receive news and promotions
                                      </label>
                                    </div>
                                    <div class="form-check mb-3">
                                      <input class="form-input-check" type="checkbox" id="terms" v-model="registerTerms" required>
                                      <label class="form-check-label small" for="terms">
                                        I agree to the <a href="#" class="text-primary" data-bs-dismiss="modal">Terms of Service</a> *
                                      </label>
                                    </div>
                                    
                                    <div class="d-flex gap-2">
                                      <button type="button" @click="regStep = 1" class="btn btn-outline-dark w-50">Back</button>
                                      <button type="submit" class="btn btn-dark w-50">Register</button>
                                    </div>
                                  </form>
                                </div>

                                <div class="mt-4 pt-3 border-top text-center">
                                  <p class="small text-muted mb-2">Or register with</p>
                                  <div class="d-flex justify-content-center gap-2">
                                    <button type="button" @click="googleLogin" class="btn btn-outline-danger btn-sm px-3">
                                      <i class="ti ti-brand-google me-1"></i> Google
                                    </button>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </li>
                <li class="cart-dropdown dropdown">
                  <a
                    href="#"
                    class="dropdown-toggle"
                    data-bs-toggle="dropdown"
                    role="button"
                    aria-expanded="false"
                  >
                    <svg class="cart">
                      <use xlink:href="#cart"></use>
                    </svg>
                    <span class="fs-6 fw-light">({{ cart.totalItems }})</span>
                  </a>
                  <div
                    class="dropdown-menu animate slide dropdown-menu-start dropdown-menu-lg-end p-3"
                  >
                    <h4 class="d-flex justify-content-between align-items-center mb-3">
                      <span class="text-primary">Your cart</span>
                      <span class="badge bg-secondary rounded-pill">{{ cart.totalItems }}</span>
                    </h4>
                    
                    <div v-if="cart.items.length === 0" class="text-center py-4 text-muted">
                      <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" class="mb-2">
                        <circle cx="9" cy="21" r="1"></circle>
                        <circle cx="20" cy="21" r="1"></circle>
                        <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
                      </svg>
                      <p class="mb-0">Your cart is currently empty.</p>
                      <div class="d-flex flex-wrap justify-content-center mt-3">
                        <RouterLink class="w-100 btn btn-dark mb-1" to="/shop">Go Shopping</RouterLink>
                      </div>
                    </div>

                    <div v-else>
                      <ul class="list-group mb-3">
                        <li
                          v-for="item in cart.items" :key="item.id"
                          class="list-group-item bg-transparent d-flex justify-content-between lh-sm"
                        >
                          <div>
                            <h6 class="mb-0 text-truncate" style="max-width: 150px;" :title="item.name">
                              {{ item.name }}
                            </h6>
                            <small class="text-muted">Qty: {{ item.quantity }}</small>
                          </div>
                          <span class="text-primary fw-bold">${{ item.price }}</span>
                        </li>
                        <li class="list-group-item bg-transparent d-flex justify-content-between mt-2">
                          <span class="text-capitalize"><b>Total (USD)</b></span>
                          <strong>${{ cart.totalPrice.toFixed(2) }}</strong>
                        </li>
                      </ul>
                      <div class="d-flex flex-wrap justify-content-center">
                        <RouterLink class="w-100 btn btn-dark mb-1" to="/cart">View Cart</RouterLink>
                        <RouterLink to="/checkout" class="w-100 btn btn-primary">Go to checkout</RouterLink>
                      </div>
                    </div>

                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </nav>
  </header>

  <div class="search-popup">
    <div class="search-popup-container">
      <form role="search" method="get" class="search-form" action="">
        <input
          type="search"
          id="search-form"
          class="search-field"
          placeholder="Type and press enter"
          value=""
          name="s"
        />
        <button type="submit" class="search-submit">
          <svg class="search">
            <use xlink:href="#search"></use>
          </svg>
        </button>
      </form>

      <h5 class="cat-list-title text-center mb-4 text-primary">Browse Categories</h5>

      <ul class="cat-list d-flex flex-wrap justify-content-center gap-3 list-unstyled mt-3">
        <li class="cat-list-item">
          <a href="#" class="btn btn-outline-primary rounded-pill px-4 py-2" title="Romance"
            >Romance</a
          >
        </li>
        <li class="cat-list-item">
          <a href="#" class="btn btn-outline-primary rounded-pill px-4 py-2" title="Thriller"
            >Thriller</a
          >
        </li>
        <li class="cat-list-item">
          <a href="#" class="btn btn-outline-primary rounded-pill px-4 py-2" title="Sci-fi"
            >Sci-fi</a
          >
        </li>
        <li class="cat-list-item">
          <a href="#" class="btn btn-outline-primary rounded-pill px-4 py-2" title="Cooking"
            >Cooking</a
          >
        </li>
        <li class="cat-list-item">
          <a href="#" class="btn btn-outline-primary rounded-pill px-4 py-2" title="Health"
            >Health</a
          >
        </li>
        <li class="cat-list-item">
          <a href="#" class="btn btn-outline-primary rounded-pill px-4 py-2" title="Lifestyle"
            >Lifestyle</a
          >
        </li>
        <li class="cat-list-item">
          <a href="#" class="btn btn-outline-primary rounded-pill px-4 py-2" title="Fiction"
            >Fiction</a
          >
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { toast } from 'vue3-toastify'
import { useAuthStore } from '../stores/auth'
import { useCartStore } from '../stores/cart'
import { apiClient } from '@/services/api'

const router = useRouter()
const auth = useAuthStore()
const cart = useCartStore()

const loginEmail = ref('')
const loginPassword = ref('')

const regStep = ref(1)
const registerEmail = ref('')
const registerPassword = ref('')
const registerConfirm = ref('')
const registerFirst = ref('')
const registerLast = ref('')
const registerPhone = ref('')
const registerBirthday = ref('')
const registerGender = ref('')
const registerNewsletter = ref(false)
const registerTerms = ref(false)

// Hàm dọn dẹp Modal Bootstrap để tránh lỗi màn hình tối
const cleanupModal = () => {
  const modalEl = document.getElementById('exampleModal')
  if (modalEl) {
    const modal = window.bootstrap?.Modal?.getInstance(modalEl)
    if (modal) modal.hide()
  }
  // Xóa thủ công các thành phần còn sót lại
  document.querySelectorAll('.modal-backdrop').forEach(el => el.remove())
  document.body.classList.remove('modal-open')
  document.body.style.overflow = ''
  document.body.style.paddingRight = ''
}

import { useCodeClient } from 'vue3-google-signin'

const { login: googleLogin } = useCodeClient({
  onSuccess: async (response) => {
    try {
      const res = await apiClient.post('/auth/google', { code: response.code })
      if (res.access_token) {
        auth.setTokens(res.access_token, res.refresh_token)
        await auth.fetchProfile()
        toast.success('Login with Google successful!')
        
        cleanupModal()
        cart.fetchCart()
        
        if (auth.user?.role === 'ADMIN') {
          router.push('/admin')
        } else {
          router.push('/')
        }
        
        // Force reload to ensure all components (especially the modal) are cleaned up
        setTimeout(() => window.location.reload(), 500)
      }
    } catch (e) {
      console.error('Google Login Backend Error:', e)
      toast.error('Google login failed: ' + (e.message || 'Server error'))
    }
  },
  onError: () => toast.error('Google Login Error'),
})

async function handleLogin() {
  const success = await auth.login(loginEmail.value, loginPassword.value)
  if (success) {
    cleanupModal()
    
    // Refresh cart
    cart.fetchCart()

    if (auth.user?.role === 'ADMIN') {
      router.push('/admin')
    }
  }
}

async function handleRegister() {
  if (registerPassword.value !== registerConfirm.value) {
    toast.error('Passwords do not match')
    return
  }
  
  const success = await auth.register({
    email: registerEmail.value,
    password: registerPassword.value,
    firstName: registerFirst.value,
    lastName: registerLast.value,
    phone: registerPhone.value,
    birthday: registerBirthday.value,
    gender: registerGender.value,
    newsletter: registerNewsletter.value
  })
  
  if (success) {
    // Reset step
    regStep.value = 1
    // Switch to login tab
    const loginTab = document.getElementById('nav-sign-in-tab')
    if (loginTab) {
      const tab = window.bootstrap?.Tab?.getInstance(loginTab) || new window.bootstrap.Tab(loginTab)
      tab.show()
    }
    toast.info('Registration successful! Please login.')
  }
}
</script>
<style scoped>
/* Ẩn dấu gạch chéo mặc định của template trong phần search */
.search-popup .cat-list-item::after {
  display: none !important;
}

/* Tinh chỉnh lại một chút cho nút bấm đẹp hơn khi hover */
.search-popup .cat-list-item a {
  font-weight: 600;
  text-decoration: none;
  transition: all 0.3s ease;
}
.search-popup .cat-list-item a:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 8px rgba(240, 124, 130, 0.3); /* Đổ bóng màu hồng cam */
}
</style>
