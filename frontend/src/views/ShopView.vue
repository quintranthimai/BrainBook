<template>
  <section id="items-listing" class="padding-large bg-light">
    <div class="container mt-4">
      <div class="d-flex justify-content-between align-items-center mb-4">
        <h3 class="d-flex align-items-center text-primary fw-bold mb-0">All Books</h3>
        <!-- Mobile Filter Toggle -->
        <button
          class="btn btn-outline-dark d-lg-none"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#filterCollapse"
          aria-expanded="false"
          aria-controls="filterCollapse"
        >
          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
          >
            <line x1="4" y1="21" x2="4" y2="14"></line>
            <line x1="4" y1="10" x2="4" y2="3"></line>
            <line x1="12" y1="21" x2="12" y2="12"></line>
            <line x1="12" y1="8" x2="12" y2="3"></line>
            <line x1="20" y1="21" x2="20" y2="16"></line>
            <line x1="20" y1="12" x2="20" y2="3"></line>
            <line x1="1" y1="14" x2="7" y2="14"></line>
            <line x1="9" y1="8" x2="15" y2="8"></line>
            <line x1="17" y1="16" x2="23" y2="16"></line>
          </svg>
          Filters
        </button>
      </div>

      <!-- Filters Section -->
      <div class="collapse d-lg-block mb-4" id="filterCollapse">
        <div class="card card-body border-0 shadow-sm rounded-4">
          <div class="row g-3 align-items-end">
            <!-- Search -->
            <div class="col-12 col-lg-3 position-relative">
              <label
                class="form-label small fw-medium text-uppercase tracking-wider"
                style="color: #6c757d"
                >Search</label
              >
              <div class="position-relative">
                <svg
                  class="input-icon"
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                >
                  <circle cx="11" cy="11" r="8"></circle>
                  <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                </svg>
                <input
                  v-model="qInput"
                  type="text"
                  class="form-control p-2 px-3 rounded-3 with-icon"
                  placeholder="Title, author, ISBN..."
                />
              </div>
            </div>

            <!-- Category -->
            <div class="col-6 col-md-3 col-lg-2">
              <label
                class="form-label small fw-medium text-uppercase tracking-wider"
                style="color: #6c757d"
                >Category</label
              >
              <select v-model="categorySlug" class="form-select p-2 px-3 rounded-3">
                <option value="">All Categories</option>
                <option value="romance">Romance</option>
                <option value="fiction">Fiction</option>
              </select>
            </div>

            <!-- Sort -->
            <div class="col-6 col-md-3 col-lg-2">
              <label
                class="form-label small fw-medium text-uppercase tracking-wider"
                style="color: #6c757d"
                >Sort By</label
              >
              <select v-model="sort" class="form-select p-2 px-3 rounded-3">
                <option value="">Latest</option>
                <option value="best_seller">Best Seller</option>
                <option value="price_asc">Price: Low to High</option>
                <option value="price_desc">Price: High to Low</option>
              </select>
            </div>

            <!-- Price Range -->
            <div class="col-12 col-md-6 col-lg-3">
              <label
                class="form-label small fw-medium text-uppercase tracking-wider"
                style="color: #6c757d"
                >Price Range ($)</label
              >
              <div class="d-flex gap-2 align-items-center">
                <input
                  v-model.number="minPrice"
                  type="number"
                  class="form-control p-2 px-3 rounded-3 text-center"
                  placeholder="Min"
                  min="0"
                />
                <span class="text-muted">-</span>
                <input
                  v-model.number="maxPrice"
                  type="number"
                  class="form-control p-2 px-3 rounded-3 text-center"
                  placeholder="Max"
                  min="0"
                />
              </div>
            </div>

            <!-- Limit -->
            <div class="col-6 col-md-3 col-lg-2">
              <label
                class="form-label small fw-medium text-uppercase tracking-wider"
                style="color: #6c757d"
                >Per page</label
              >
              <select v-model.number="limit" class="form-select p-2 px-3 rounded-3">
                <option :value="12">12 Items</option>
                <option :value="24">24 Items</option>
                <option :value="48">48 Items</option>
              </select>
            </div>
          </div>
          <div v-if="priceError" class="text-danger small mt-2 d-flex align-items-center gap-1">
            <svg
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
            >
              <circle cx="12" cy="12" r="10"></circle>
              <line x1="12" y1="8" x2="12" y2="12"></line>
              <line x1="12" y1="16" x2="12.01" y2="16"></line>
            </svg>
            {{ priceError }}
          </div>
        </div>
      </div>

      <!-- Results Count -->
      <div
        class="mb-4 small d-flex justify-content-between align-items-center"
        style="color: #6c757d"
      >
        <span v-if="!loading && !error && totalCount !== null">
          Showing <strong class="text-dark">{{ books.length }}</strong> of
          <strong class="text-dark">{{ totalCount }}</strong> books
        </span>
        <span v-else></span>
      </div>

      <!-- Loading Skeletons -->
      <div v-if="loading" class="row g-4">
        <div v-for="i in limit" :key="'skel' + i" class="col-6 col-md-4 col-lg-3">
          <div class="card h-100 border-0 rounded-4 shadow-sm bg-white" aria-hidden="true">
            <div class="placeholder-glow">
              <div class="placeholder w-100 rounded-top-4" style="aspect-ratio: 3/4"></div>
            </div>
            <div class="card-body p-3 placeholder-glow">
              <h5 class="card-title placeholder col-10 rounded"></h5>
              <p class="card-text placeholder col-6 rounded mb-2"></p>
              <p class="card-text placeholder col-4 rounded mb-3"></p>
              <div class="placeholder col-5 rounded fs-5" style="height: 1.5rem"></div>
            </div>
          </div>
        </div>
      </div>

      <!-- Error State -->
      <div v-else-if="error" class="alert alert-danger rounded-4 border-0 shadow-sm" role="alert">
        {{ error }}
      </div>

      <!-- Empty State -->
      <div
        v-else-if="books.length === 0"
        class="text-center py-5 bg-white rounded-4 shadow-sm my-4"
      >
        <svg
          width="64"
          height="64"
          viewBox="0 0 24 24"
          fill="none"
          stroke="#ccc"
          stroke-width="1.5"
          class="mb-3"
        >
          <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"></path>
          <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"></path>
        </svg>
        <h4 class="text-dark fw-bold">No books found</h4>
        <p class="text-muted">We couldn't find any books matching your current filters.</p>
        <button class="btn btn-outline-dark rounded-3 mt-2" @click="resetFilters">
          Clear Filters
        </button>
      </div>

      <!-- Books Grid -->
      <div v-else class="row g-4">
        <div v-for="b in books" :key="b.id" class="col-6 col-md-4 col-lg-3">
          <div class="card shop-card h-100 border-0 rounded-4 shadow-sm bg-white position-relative">
            <!-- Badges -->
            <div
              class="position-absolute top-0 start-0 w-100 p-2 d-flex justify-content-between align-items-start"
              style="z-index: 8; pointer-events: none"
            >
              <div class="d-flex flex-column gap-1">
                <span
                  v-if="isNew(b.createdAt)"
                  class="badge bg-info text-dark rounded-pill px-2 shadow-sm"
                  >New</span
                >
                <span
                  v-if="b.compareAtPrice > b.price"
                  class="badge bg-danger rounded-pill px-2 shadow-sm"
                >
                  -{{ Math.round((1 - b.price / b.compareAtPrice) * 100) }}%
                </span>
              </div>
              <button
                :class="['btn', 'wishlist-btn', 'rounded-circle', 'shadow-sm', 'position-relative']"
                :style="{ pointerEvents: 'auto' }"
                @click.prevent="toggleWishlist(b)"
              >
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  :fill="isInWishlist(b.id) ? '#ff6b9d' : '#ffffff'"
                  stroke="#ff6b9d"
                  stroke-width="2"
                  class="d-block"
                >
                  <path
                    d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"
                  ></path>
                </svg>
              </button>
            </div>

            <!-- Image Cover -->
            <div class="card-img-wrapper rounded-top-4 overflow-hidden bg-light position-relative">
              <img
                :src="b.imageUrl"
                class="product-img"
                :alt="b.title"
                style="
                  width: 100% !important;
                  aspect-ratio: 3/4 !important;
                  object-fit: cover !important;
                  object-position: center !important;
                  height: auto !important;
                  max-height: none !important;
                  max-width: 100% !important;
                  display: block;
                "
                loading="lazy"
              />

              <!-- Hover Overlay Actions -->
              <div
                class="hover-overlay d-flex flex-column justify-content-center align-items-center gap-2"
              >
                <button
                  class="btn btn-dark rounded-pill shadow-sm px-4 fw-medium"
                  @click.prevent="addToCart(b)"
                >
                  Add to Cart
                </button>
                <RouterLink
                  :to="{ name: 'product-detail', params: { slug: b.slug } }"
                  class="btn bg-white text-dark border border-dark rounded-pill shadow-sm px-4 fw-medium"
                >
                  View Details
                </RouterLink>
              </div>
            </div>

            <!-- Card Body -->
            <div class="card-body p-3 p-md-4 d-flex flex-column">
              <RouterLink
                :to="{ name: 'product-detail', params: { slug: b.slug } }"
                class="text-decoration-none hover-primary d-block"
              >
                <h6 class="card-title fw-bold mb-1 text-truncate" :title="b.title">
                  {{ b.title }}
                </h6>
              </RouterLink>
              <p class="card-text small mb-2 text-truncate" style="color: #888" :title="b.author">
                {{ b.author }}
              </p>

              <div v-if="b.reviewCount > 0" class="d-flex align-items-center mb-2">
                <div
                  class="rating text-warning d-flex align-items-center me-1"
                  style="font-size: 0.8rem"
                >
                  <svg
                    class="star star-fill"
                    v-for="i in 5"
                    :key="i"
                    :class="{ 'opacity-25': i > Math.round(b.ratingAvg || 0) }"
                    width="12"
                    height="12"
                  >
                    <use xlink:href="#star-fill"></use>
                  </svg>
                </div>
                <span class="small" style="font-size: 0.75rem; color: #888"
                  >({{ b.reviewCount }})</span
                >
              </div>
              <div v-else class="mb-2">
                <span class="small" style="font-size: 0.75rem; color: #888">Chưa có đánh giá</span>
              </div>

              <div class="mt-auto d-flex align-items-end gap-2 pt-2 border-top border-light">
                <span class="price text-primary fw-bold fs-5 mb-0 leading-none"
                  >${{ b.price }}</span
                >
                <s v-if="b.compareAtPrice > b.price" class="small mb-1" style="color: #adb5bd"
                  >${{ b.compareAtPrice }}</s
                >
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Pagination -->
      <div
        v-if="totalPages > 1 && !loading && !error"
        class="d-flex justify-content-center gap-2 mt-5 flex-wrap pagination-ui pb-5"
      >
        <button
          class="btn btn-white border rounded-3 px-3 shadow-sm"
          :disabled="page <= 1"
          @click="goToPage(page - 1)"
        >
          Prev
        </button>
        <button
          v-for="p in pageButtons"
          :key="p"
          class="btn rounded-3 shadow-sm"
          :class="p === page ? 'btn-dark' : 'btn-white border'"
          @click="goToPage(p)"
        >
          {{ p }}
        </button>
        <button
          class="btn btn-white border rounded-3 px-3 shadow-sm"
          :disabled="page >= totalPages"
          @click="goToPage(page + 1)"
        >
          Next
        </button>
      </div>
    </div>
  </section>
</template>

<script setup>
import { computed, onMounted, nextTick, ref, watch } from 'vue'
import { RouterLink, useRouter } from 'vue-router'
import { apiGet } from '@/lib/api'
import { apiPost } from '@/lib/api'
import { useAuthStore } from '@/stores/auth'
import { useCartStore } from '../stores/cart'
import { toast } from 'vue3-toastify'

const cart = useCartStore()
const auth = useAuthStore()
const router = useRouter()
const books = ref([])
const loading = ref(false)
const error = ref('')
const page = ref(1)
const limit = ref(12)
const totalPages = ref(1)
const totalCount = ref(null)

const qInput = ref('')
const q = ref('')
const categorySlug = ref('')
const sort = ref('')
const minPrice = ref(null)
const maxPrice = ref(null)
const wishlistIds = ref([])

const priceError = computed(() => {
  if (minPrice.value !== null && maxPrice.value !== null && minPrice.value > maxPrice.value) {
    return 'Min price cannot be greater than Max.'
  }
  return ''
})

const pageButtons = computed(() => {
  const t = totalPages.value
  const p = page.value
  if (t <= 1) return [1]
  const start = Math.max(1, p - 2)
  const end = Math.min(t, start + 4)
  const out = []
  for (let i = start; i <= end; i++) out.push(i)
  return out
})

function isNew(createdAt) {
  if (!createdAt) return false
  const date = new Date(createdAt)
  const now = new Date()
  const diffDays = Math.ceil((now - date) / (1000 * 60 * 60 * 24))
  return diffDays <= 30
}

function addToCart(book) {
  cart.addToCart(book.id, 1)
}

const isInWishlist = (bookId) => wishlistIds.value.includes(bookId)

const loadWishlist = async () => {
  if (!auth.isLoggedIn) {
    wishlistIds.value = []
    return
  }

  try {
    const items = await apiGet('/wishlist')
    wishlistIds.value = Array.isArray(items) ? items.map((item) => item.bookId) : []
  } catch (error) {
    console.error('Failed to load wishlist for shop view', error)
    wishlistIds.value = []
  }
}

async function toggleWishlist(book) {
  if (!book?.id) return

  if (!auth.isLoggedIn) {
    const modalEl = document.getElementById('exampleModal')
    if (modalEl && window.bootstrap?.Modal) {
      const modal = new window.bootstrap.Modal(modalEl)
      modal.show()
    } else {
      router.push('/login')
    }
    return
  }

  try {
    if (isInWishlist(book.id)) {
      await apiPost(`/wishlist/remove/${book.id}`)
      wishlistIds.value = wishlistIds.value.filter((id) => id !== book.id)
      toast.info('Removed from wishlist')
    } else {
      await apiPost(`/wishlist/add/${book.id}`)
      wishlistIds.value = [...wishlistIds.value, book.id]
      toast.success('Added to wishlist!')
    }
  } catch (error) {
    toast.error(error instanceof Error ? error.message : 'Wishlist action failed')
  }
}

function resetFilters() {
  qInput.value = ''
  categorySlug.value = ''
  sort.value = ''
  minPrice.value = null
  maxPrice.value = null
  page.value = 1
}

async function fetchBooks() {
  if (priceError.value) return // Prevent fetch if price is invalid

  loading.value = true
  error.value = ''
  try {
    const params = {
      page: page.value,
      limit: limit.value,
      q: q.value,
      categorySlug: categorySlug.value,
      sort: sort.value,
    }
    if (minPrice.value !== null && minPrice.value !== '') params.minPrice = minPrice.value
    if (maxPrice.value !== null && maxPrice.value !== '') params.maxPrice = maxPrice.value

    const res = await apiGet('/books', { params })
    books.value = res.data ?? []
    totalPages.value = res.meta?.totalPages ?? 1
    totalCount.value = res.meta?.total ?? 0
  } catch (e) {
    error.value = e instanceof Error ? e.message : 'Failed to load books'
  } finally {
    loading.value = false
  }
}

async function goToPage(p) {
  if (p < 1 || p > totalPages.value) return
  page.value = p
  window.scrollTo({ top: 0, behavior: 'smooth' })
  await fetchBooks()
}

// Watch filters
let filterTimer
watch([limit, categorySlug, sort, minPrice, maxPrice], () => {
  if (filterTimer) clearTimeout(filterTimer)
  if (priceError.value) return // don't trigger fetch if error

  filterTimer = setTimeout(async () => {
    page.value = 1
    await fetchBooks()
  }, 500)
})

// Watch search
let qTimer
watch(qInput, (val) => {
  if (qTimer) clearTimeout(qTimer)
  qTimer = setTimeout(async () => {
    q.value = val
    page.value = 1
    await fetchBooks()
  }, 400)
})

onMounted(async () => {
  await fetchBooks()
  await loadWishlist()
  await nextTick()
  setTimeout(() => {
    if (typeof window.initHomeScripts === 'function') {
      window.initHomeScripts()
    }
  }, 100)
  setTimeout(() => {
    const preloader = document.getElementById('preloader')
    if (preloader) {
      preloader.classList.add('hide-preloader')
    }
  }, 300)
})
</script>

<style scoped>
/* Filter UI */
.input-icon {
  position: absolute;
  left: 12px;
  top: 50%;
  transform: translateY(-50%);
  color: #adb5bd;
  pointer-events: none;
}
.with-icon {
  padding-left: 38px !important;
}
.tracking-wider {
  letter-spacing: 0.05em;
}

/* Card Styling */
.shop-card {
  transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
}
.shop-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 15px 35px rgba(0, 0, 0, 0.08) !important;
}
.product-img {
  transition: transform 0.7s cubic-bezier(0.25, 0.8, 0.25, 1);
}
.shop-card:hover .product-img {
  transform: scale(1.05);
}

/* Hover Overlay for CTA */
.hover-overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(255, 255, 255, 0.85);
  opacity: 0;
  visibility: hidden;
  transition: all 0.3s ease;
  z-index: 5;
}
.shop-card:hover .hover-overlay {
  opacity: 1;
  visibility: visible;
}
.hover-overlay .btn {
  transform: translateY(20px);
  transition:
    transform 0.3s ease,
    opacity 0.3s ease;
  opacity: 0;
}
.shop-card:hover .hover-overlay .btn {
  transform: translateY(0);
  opacity: 1;
}

/* Wishlist Button */
.wishlist-btn {
  width: 42px;
  height: 42px;
  min-width: 42px;
  min-height: 42px;
  padding: 0;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  background-color: #ffffff !important;
  border: 1px solid #ff6b9d !important;
  color: #ff6b9d !important;
  transition: all 0.2s ease;
}
.wishlist-btn:hover {
  background-color: #fff6fa !important;
  transform: scale(1.06);
}

/* Form Controls */
.form-control,
.form-select {
  border: 1px solid #dee2e6;
  background-color: #f8f9fa;
  transition: all 0.2s ease;
}
.form-control:focus,
.form-select:focus {
  background-color: #ffffff;
  border-color: #86b7fe;
  box-shadow: 0 0 0 0.25rem rgba(13, 110, 253, 0.15);
}

/* Pagination */
.pagination-ui .btn {
  min-width: 44px;
  font-weight: 500;
  transition: all 0.2s;
}
.btn-white {
  background-color: white;
  color: #333;
}
.btn-white:hover:not(:disabled) {
  background-color: #f8f9fa;
}
</style>
