<template>
  <div class="product-detail-page bg-white">
    <!-- Breadcrumbs -->
    <nav class="breadcrumb-nav py-3 border-bottom bg-light shadow-sm">
      <div class="container">
        <ol class="breadcrumb mb-0">
          <li class="breadcrumb-item"><RouterLink to="/" class="text-dark fw-bold text-decoration-none">Home</RouterLink></li>
          <li class="breadcrumb-item"><RouterLink to="/shop" class="text-dark fw-bold text-decoration-none">Shop</RouterLink></li>
          <li v-if="book" class="breadcrumb-item active text-danger fw-bolder">{{ book.title }}</li>
        </ol>
      </div>
    </nav>

    <div class="container py-5 mt-4">
      <div v-if="loading" class="text-center py-5 my-5">
        <div class="spinner-grow text-primary" role="status" style="width: 3rem; height: 3rem;"></div>
        <p class="mt-3 text-dark fw-bold">Unfolding the story...</p>
      </div>

      <div v-else-if="error" class="alert alert-danger rounded-4 p-4 shadow-sm animate-fade-in" role="alert">
        <i class="ti ti-alert-circle me-2 fs-4"></i> {{ error }}
      </div>

      <div v-else-if="book" class="row g-5">
        <!-- Product Images & Trust Badges -->
        <div class="col-lg-5">
          <div class="sticky-top" style="top: 100px; z-index: 10;">
            <div class="main-image-container mb-3 rounded-4 overflow-hidden shadow-premium bg-light position-relative">
              <div class="badge-hot position-absolute top-0 start-0 m-3 z-1">
                <span class="badge bg-danger rounded-pill px-3 py-2 shadow-sm d-flex align-items-center gap-1">
                  <i class="ti ti-flame"></i> Trending Now
                </span>
              </div>
              <img
                :src="book.imageUrl"
                class="img-fluid w-100 transition-zoom"
                :alt="book.title"
                style="aspect-ratio: 3/4; object-fit: contain; padding: 40px;"
              />
              <button class="btn-view-inside position-absolute bottom-0 start-50 translate-middle-x mb-4 shadow" @click="showMockup = true">
                <i class="ti ti-book-open me-2"></i> View Inside
              </button>
            </div>

            <div class="trust-indicators d-flex justify-content-around p-3 bg-light rounded-4 border">
              <div class="text-center">
                <i class="ti ti-truck text-primary fs-4"></i>
                <p class="mb-0 small fw-bold text-dark">Free Shipping</p>
              </div>
              <div class="text-center">
                <i class="ti ti-shield-check text-success fs-4"></i>
                <p class="mb-0 small fw-bold text-dark">Secure Payment</p>
              </div>
              <div class="text-center">
                <i class="ti ti-arrow-back-up text-info fs-4"></i>
                <p class="mb-0 small fw-bold text-dark">Easy Returns</p>
              </div>
            </div>
          </div>
        </div>

        <!-- Product Details -->
        <div class="col-lg-7">
          <div class="ps-lg-4">
            <div class="d-flex flex-wrap align-items-center gap-2 mb-3">
              <span class="badge bg-danger rounded-pill px-3 py-2 fw-bold">BEST SELLER</span>
              <span class="text-danger fw-bold small animate-pulse"><i class="ti ti-shopping-cart-check"></i> 🔥 1,200+ copies sold this month</span>
            </div>

            <h1 class="display-4 fw-bold text-dark mb-2">{{ book.title }}</h1>
            <p class="fs-4 text-dark mb-4">By <span class="text-danger fw-bolder text-decoration-underline cursor-pointer">{{ book.author }}</span></p>

            <div class="d-flex align-items-center mb-4 gap-4">
              <div class="rating-group bg-light p-2 px-3 rounded-pill d-flex align-items-center gap-2 border">
                <div class="rating-stars text-warning d-flex">
                  <template v-for="i in 5" :key="i">
                    <i class="ti fs-5" :class="i <= Math.round(book.ratingAvg || 5) ? 'ti-star-filled' : 'ti-star'"></i>
                  </template>
                </div>
                <span class="fw-bold text-dark">{{ book.ratingAvg || '5.0' }}</span>
              </div>
              <a href="#reviews-section" class="text-dark text-decoration-none small fw-bold border-bottom border-dark">
                {{ book.reviewCount || 42 }} Verified Reviews
              </a>
            </div>

            <div class="price-section mb-4">
              <div class="d-flex align-items-end gap-3 mb-1">
                <span class="display-5 fw-bold text-danger">${{ book.price }}</span>
                <s v-if="book.compareAtPrice" class="fs-3 text-muted mb-2">${{ book.compareAtPrice }}</s>
                <span class="badge bg-danger mb-2" v-if="book.compareAtPrice">SAVE {{ Math.round((1 - book.price/book.compareAtPrice) * 100) }}%</span>
              </div>
              <p class="text-success small fw-bold"><i class="ti ti-check"></i> Inclusive of all taxes</p>
            </div>

            <!-- Key Highlights -->
            <div class="highlights-grid row g-3 mb-4">
              <div class="col-sm-6">
                <div class="h-card p-3 border rounded-4 d-flex align-items-center gap-3 bg-white transition-hover shadow-sm">
                  <div class="h-icon bg-primary-subtle text-danger rounded-circle"><i class="ti ti-files"></i></div>
                  <div>
                    <small class="text-dark d-block uppercase fw-bolder tracking-wider">Pages</small>
                    <span class="fw-bold text-dark">{{ book.pageCount || '---' }} pages</span>
                  </div>
                </div>
              </div>
              <div class="col-sm-6">
                <div class="h-card p-3 border rounded-4 d-flex align-items-center gap-3 bg-white transition-hover shadow-sm">
                  <div class="h-icon bg-info-subtle text-info rounded-circle"><i class="ti ti-world"></i></div>
                  <div>
                    <small class="text-dark d-block uppercase fw-bolder tracking-wider">Language</small>
                    <span class="fw-bold text-dark">{{ book.language || 'English' }}</span>
                  </div>
                </div>
              </div>
            </div>

            <!-- Action Area -->
            <div class="purchase-box p-4 bg-light rounded-5 mb-4 border shadow-sm">
              <div class="row g-3">
                <div class="col-md-4">
                  <label class="form-label small fw-bolder text-dark uppercase tracking-tighter mb-2">QUANTITY</label>
                  <div class="quantity-picker d-flex align-items-center bg-white rounded-pill p-1 border shadow-sm">
                    <button class="btn btn-icon rounded-circle" @click="quantity > 1 ? quantity-- : null">
                      <i class="ti ti-minus text-dark"></i>
                    </button>
                    <input type="number" class="form-control border-0 bg-transparent text-center fw-bold px-0 text-dark" v-model="quantity" style="width: 50px" readonly />
                    <button class="btn btn-icon rounded-circle" @click="quantity++">
                      <i class="ti ti-plus text-dark"></i>
                    </button>
                  </div>
                </div>
                <div class="col-md-8 d-flex align-items-end gap-2">
                  <button
                    type="button"
                    @click="addToCart"
                    :disabled="book.stock <= 0"
                    class="btn btn-dark btn-lg px-4 py-3 rounded-pill flex-grow-1 shadow-premium d-flex align-items-center justify-content-center gap-2 transition-all-3"
                  >
                    <i class="ti ti-shopping-cart fs-4"></i> ADD TO CART
                  </button>
                  <button @click="toggleWishlist" class="btn btn-icon btn-outline-danger rounded-circle shadow-sm bg-white text-primary" style="width: 58px; height: 58px; flex-shrink:0;">
                    <i class="ti fs-3" :class="isInWishlist ? 'ti-heart-filled' : 'ti-heart'"></i>
                  </button>
                </div>
                <div class="col-12 mt-3">
                  <button @click="buyNow" class="btn btn-buy-now w-100 py-3 rounded-pill fw-bold shadow-sm transition-all-3">
                    <i class="ti ti-bolt me-2"></i> BUY IT NOW
                  </button>
                </div>
              </div>
            </div>

            <!-- Social Share & Categories -->
            <div class="d-flex flex-wrap justify-content-between align-items-center gap-3">
              <div class="d-flex align-items-center gap-3">
                <span class="small fw-bolder text-dark">Share:</span>
                <div class="d-flex gap-2">
                  <a href="#" class="share-icon fb"><i class="ti ti-brand-facebook"></i></a>
                  <a href="#" class="share-icon x"><i class="ti ti-brand-x"></i></a>
                  <a href="#" class="share-icon pin"><i class="ti ti-brand-pinterest"></i></a>
                </div>
              </div>
              <div v-if="book.categories?.length" class="tags">
                <span class="small fw-bolder text-dark me-2">Categories:</span>
                <RouterLink v-for="cat in book.categories" :key="cat.id" :to="`/shop?category=${cat.slug}`" class="badge bg-white border text-dark fw-bold text-decoration-none me-1 hover-primary transition-all-2">
                  {{ cat.name }}
                </RouterLink>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Detail Tabs -->
      <div v-if="book" class="row mt-5 pt-5">
        <div class="col-12">
          <div class="custom-tabs border-bottom mb-5 d-flex justify-content-center gap-5">
            <button class="tab-btn" :class="{ active: activeTab === 'desc' }" @click="activeTab = 'desc'">
              THE STORY
            </button>
            <button class="tab-btn" :class="{ active: activeTab === 'reviews' }" @click="activeTab = 'reviews'" id="reviews-section">
              READERS OPINION
            </button>
            <button class="tab-btn" :class="{ active: activeTab === 'specs' }" @click="activeTab = 'specs'">
              BOOK INFORMATION
            </button>
          </div>

          <div class="tab-content py-3">
            <!-- Story Tab -->
            <div v-if="activeTab === 'desc'" class="animate-fade-in">
              <div class="row justify-content-center">
                <div class="col-lg-9">
                   <div class="description-content">
                     <h3 class="fw-bold mb-4 text-center text-dark">About this Masterpiece</h3>
                     <div class="long-description fs-5" style="white-space: pre-line; line-height: 2.1; color: #1a1a1a;">
                       {{ (book.longDescription && book.longDescription.length > 50) ? book.longDescription : (book.description && book.description.length > 50 ? book.description : 'This masterpiece is a compelling journey through time and emotion. It stands as a testament to the power of storytelling, weaving a complex narrative that challenges the mind and touches the heart. Every chapter invites you deeper into a world meticulously crafted with rich detail and profound insight. Whether you are seeking inspiration, knowledge, or a brief escape from reality, this book promises an unforgettable experience that will linger in your thoughts long after the final page is turned.') }}
                     </div>

                     <div class="highlight-box mt-5 p-4 rounded-4 bg-primary-subtle border-start border-danger border-5">
                       <h5 class="fw-bold mb-3 text-danger"><i class="ti ti-sparkles"></i> Why you should read this?</h5>
                       <ul class="mb-0 text-dark fw-medium">
                         <li class="mb-2">A timeless classic that explores the depths of human resilience.</li>
                         <li class="mb-2">Perfect for lovers of historical fiction and epic storytelling.</li>
                         <li class="mb-0">Winner of prestigious literary awards and loved by millions worldwide.</li>
                       </ul>
                     </div>
                   </div>
                </div>
              </div>
            </div>

            <!-- book information Tab -->
            <div v-if="activeTab === 'specs'" class="animate-fade-in">
              <div class="row justify-content-center">
                <div class="col-lg-8">
                  <div class="table-responsive">
                    <table class="table table-borderless table-striped-columns border rounded-4 overflow-hidden shadow-sm">
                      <tbody>
                        <tr><td class="fw-bolder text-dark py-3 px-4 bg-light" style="width: 30%">Title</td><td class="py-3 px-4 fw-bold text-dark">{{ book.title }}</td></tr>
                        <tr><td class="fw-bolder text-dark py-3 px-4 bg-light">Author</td><td class="py-3 px-4 fw-bold text-danger">{{ book.author }}</td></tr>
                        <tr><td class="fw-bolder text-dark py-3 px-4 bg-light">Publisher</td><td class="py-3 px-4 fw-bold text-dark">{{ book.publisher || 'Classic Press' }}</td></tr>
                        <tr><td class="fw-bolder text-dark py-3 px-4 bg-light">Pages</td><td class="py-3 px-4 fw-bold text-dark">{{ book.pageCount || 'N/A' }} pages</td></tr>
                        <tr><td class="fw-bolder text-dark py-3 px-4 bg-light">Dimensions</td><td class="py-3 px-4 fw-bold text-dark">{{ book.dimensions || '5.5 x 1.2 x 8.2 inches' }}</td></tr>
                        <tr><td class="fw-bolder text-dark py-3 px-4 bg-light">ISBN-10</td><td class="py-3 px-4 fw-bold text-dark">{{ book.sku }}</td></tr>
                        <tr><td class="fw-bolder text-dark py-3 px-4 bg-light">Language</td><td class="py-3 px-4 fw-bold text-dark">{{ book.language || 'English' }}</td></tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>

            <!-- Reviews Tab -->
            <div v-if="activeTab === 'reviews'" class="animate-fade-in">
              <div class="row">
                <!-- Rating Breakdown -->
                <div class="col-lg-4 mb-5">
                  <div class="card border-0 bg-light rounded-5 p-4 shadow-sm sticky-top" style="top: 120px;">
                    <div class="text-center mb-4">
                      <h1 class="display-3 fw-bold mb-0 text-dark">{{ book.ratingAvg || '5.0' }}</h1>
                      <div class="text-warning fs-3 mb-1">
                        <i class="ti ti-star-filled"></i><i class="ti ti-star-filled"></i><i class="ti ti-star-filled"></i><i class="ti ti-star-filled"></i><i class="ti ti-star-filled"></i>
                      </div>
                      <p class="text-dark fw-bold">Based on {{ book.reviewCount || 42 }} reviews</p>
                    </div>

                    <div class="rating-bars">
                      <div v-for="i in [5,4,3,2,1]" :key="i" class="d-flex align-items-center gap-2 mb-2">
                        <span class="small fw-bolder text-dark" style="width: 20px">{{ i }}</span>
                        <div class="progress flex-grow-1" style="height: 10px; background-color: #e9ecef;">
                          <div class="progress-bar bg-warning" :style="{ width: (i >= 4 ? 80 + i*3 : 10) + '%' }"></div>
                        </div>
                        <span class="small text-dark fw-bold" style="width: 35px">{{ i >= 4 ? 85 + i : 5 }}%</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div class="col-lg-8">
                  <div class="d-flex justify-content-between align-items-center mb-4">
                    <h4 class="fw-bold mb-0 text-dark">What Readers are Saying</h4>
                    <button class="btn btn-primary rounded-pill px-4 fw-bold" v-if="auth.isLoggedIn" @click="activeTab = 'reviews'">Write a Review</button>
                  </div>

                  <div v-if="reviews.length === 0" class="text-center py-5 bg-light rounded-4 border">
                    <i class="ti ti-messages fs-1 text-muted mb-3 d-block"></i>
                    <h5 class="fw-bold text-dark">Your opinion matters!</h5>
                    <p class="text-muted">Be the first reader to review this book.</p>
                  </div>

                  <div v-else class="reviews-list">
                    <div v-for="review in reviews" :key="review.id" class="review-card p-4 rounded-4 border mb-4 shadow-sm bg-white transition-hover">
                      <div class="d-flex align-items-start gap-3">
                        <div class="user-avatar bg-dark text-white rounded-circle d-flex align-items-center justify-content-center fw-bold fs-4 shadow-sm">
                          {{ review.user.firstName.charAt(0) }}
                        </div>
                        <div class="flex-grow-1">
                          <div class="d-flex justify-content-between align-items-center mb-1">
                            <h6 class="fw-bold mb-0 text-dark">{{ review.user.firstName }} {{ review.user.lastName }}</h6>
                            <span class="badge bg-success-subtle text-success rounded-pill small fw-bold border border-success"><i class="ti ti-circle-check"></i> Verified Buyer</span>
                          </div>
                          <div class="rating-stars text-warning mb-2" style="font-size: 0.9rem;">
                            <i v-for="i in 5" :key="i" class="ti" :class="i <= review.rating ? 'ti-star-filled' : 'ti-star'"></i>
                          </div>
                          <p class="mb-0 text-dark fw-medium" style="line-height: 1.7;">{{ review.comment }}</p>
                          <div class="mt-3 d-flex gap-3">
                            <button class="btn btn-sm btn-light rounded-pill px-3 text-dark fw-bold border shadow-sm small"><i class="ti ti-thumb-up"></i> Helpful ({{ Math.floor(Math.random() * 10) }})</button>
                            <button class="btn btn-sm btn-light rounded-pill px-3 text-muted border small">Report</button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Related Books -->
      <div v-if="relatedBooks.length > 0" class="related-products mt-5 pt-5 border-top">
        <div class="d-flex justify-content-between align-items-center mb-4">
          <h2 class="fw-bold text-dark">You May Also Like</h2>
          <RouterLink to="/shop" class="btn btn-outline-dark rounded-pill px-4 fw-bold">Explore More</RouterLink>
        </div>
        <div class="row g-4">
          <div v-for="rBook in relatedBooks" :key="rBook.id" class="col-6 col-md-4 col-lg-3">
             <div class="card h-100 border-0 shadow-sm rounded-4 overflow-hidden product-card transition-hover border">
               <RouterLink :to="`/product/${rBook.slug}`" class="text-decoration-none">
                 <div class="bg-light p-4 text-center">
                   <img :src="rBook.imageUrl" class="img-fluid" style="height: 180px; object-fit: contain" />
                 </div>
                 <div class="card-body">
                   <p class="text-dark fw-bold small mb-1">{{ rBook.author }}</p>
                   <h6 class="fw-bold text-dark text-truncate mb-2">{{ rBook.title }}</h6>
                   <div class="d-flex justify-content-between align-items-center">
                     <span class="fw-bold text-danger fs-5">${{ rBook.price }}</span>
                     <div class="rating text-warning small fw-bold">
                       <i class="ti ti-star-filled"></i> {{ rBook.ratingAvg || '5.0' }}
                     </div>
                   </div>
                 </div>
               </RouterLink>
             </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Interior Mockup Modal -->
    <div v-if="showMockup" class="modal-overlay d-flex align-items-center justify-content-center" @click.self="showMockup = false">
      <div class="modal-content-custom bg-white p-2 rounded-4 shadow-lg animate-fade-in" style="max-width: 900px; width: 95%;">
        <div class="position-relative">
          <button class="btn-close-custom" @click="showMockup = false">&times;</button>
          <img src="https://images.unsplash.com/photo-1544947950-fa07a98d237f?auto=format&fit=crop&q=80&w=1200" class="img-fluid rounded-3" alt="interior mockup" />
          <div class="p-4 text-center">
            <h4 class="fw-bold text-dark">Experience the Premium Quality</h4>
            <p class="text-dark fw-medium">High-quality paper, clear typography, and a durable binding made to last generations.</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref, reactive, watch } from 'vue'
import { useRoute, useRouter, RouterLink } from 'vue-router'
import { useAuthStore } from '@/stores/auth'
import { useCartStore } from '@/stores/cart'
import { apiGet, apiPost } from '@/lib/api'
import { getBookReviews, createReview } from '@/services/reviewService'
import { toast } from 'vue3-toastify'

const auth = useAuthStore()
const cart = useCartStore()
const router = useRouter()
const route = useRoute()

const quantity = ref(1)
const activeTab = ref('desc')
const book = ref(null)
const reviews = ref([])
const relatedBooks = ref([])
const loading = ref(false)
const error = ref('')
const submittingReview = ref(false)
const isInWishlist = ref(false)
const showMockup = ref(false)

const newReview = reactive({
  rating: 5,
  comment: ''
})

const fetchBookData = async (slug) => {
  loading.value = true
  try {
    const data = await apiGet(`/books/slug/${encodeURIComponent(slug)}`)
    book.value = data
    await fetchReviews(data.id)
    await checkWishlist(data.id)
    await fetchRelatedBooks(data.id)
    window.scrollTo(0, 0)
  } catch (e) {
    error.value = 'Failed to load book details. Please try again later.'
  } finally {
    loading.value = false
  }
}

const fetchReviews = async (bookId) => {
  try {
    reviews.value = await getBookReviews(bookId)
  } catch (e) {
    console.error('Failed to load reviews')
  }
}

const fetchRelatedBooks = async (currentBookId) => {
  try {
    const res = await apiGet('/books', { params: { limit: 8 } })
    relatedBooks.value = res.data.filter(b => b.id !== currentBookId).slice(0, 4)
  } catch (e) {}
}

const checkWishlist = async (bookId) => {
  if (!auth.isLoggedIn) return
  try {
    const wishlist = await apiGet('/wishlist')
    isInWishlist.value = wishlist.some(item => item.bookId === bookId)
  } catch (e) {}
}

const handleSubmitReview = async () => {
  if (submittingReview.value) return
  submittingReview.value = true
  try {
    await createReview(book.value.id, newReview)
    toast.success('Thank you for your review!')
    newReview.comment = ''
    newReview.rating = 5
    await fetchReviews(book.value.id)
    const updatedBook = await apiGet(`/books/slug/${route.params.slug}`)
    book.value = updatedBook
  } catch (e) {
    toast.error(e.message || 'Failed to submit review')
  } finally {
    submittingReview.value = false
  }
}

const addToCart = async () => {
  if (!book.value) return
  try {
    await cart.addToCart(book.value.id, quantity.value)
    toast.success('Added to cart successfully!')
  } catch (e) {
    toast.error('Failed to add to cart')
  }
}

const buyNow = async () => {
  await addToCart()
  router.push('/cart')
}

const toggleWishlist = async () => {
  if (!auth.isLoggedIn) {
    const modalEl = document.getElementById('exampleModal')
    if (modalEl) {
      const modal = new window.bootstrap.Modal(modalEl)
      modal.show()
    } else {
      router.push('/login')
    }
    return
  }
  try {
    if (isInWishlist.value) {
      await apiPost(`/wishlist/remove/${book.value.id}`)
      isInWishlist.value = false
      toast.info('Removed from wishlist')
    } else {
      await apiPost(`/wishlist/add/${book.value.id}`)
      isInWishlist.value = true
      toast.success('Added to wishlist!')
    }
  } catch (e) {
    toast.error('Action failed')
  }
}

const formatDate = (date) => new Date(date).toLocaleDateString('en-US', {
  year: 'numeric',
  month: 'long',
  day: 'numeric'
})

onMounted(() => {
  if (route.params.slug) fetchBookData(route.params.slug)
})

watch(() => route.params.slug, (newSlug) => {
  if (newSlug) fetchBookData(newSlug)
})
</script>

<style scoped>
.breadcrumb-nav { font-size: 0.85rem; }
.breadcrumb-item + .breadcrumb-item::before {
  color: #333 !important;
  font-weight: bold;
}
.shadow-premium { box-shadow: 0 30px 60px rgba(0,0,0,0.08) !important; }
.transition-zoom { transition: transform 0.8s cubic-bezier(0.4, 0, 0.2, 1); }
.main-image-container:hover .transition-zoom { transform: scale(1.08); }

.btn-view-inside {
  background: rgba(255,255,255,0.9);
  backdrop-filter: blur(5px);
  border: none;
  padding: 10px 25px;
  border-radius: 100px;
  font-weight: 700;
  color: #212529;
  transition: all 0.3s;
}
.btn-view-inside:hover { background: #000; color: #fff; transform: translateX(-50%) translateY(-5px); }

.btn-buy-now {
  background: linear-gradient(135deg, #FF4B2B 0%, #FF416C 100%);
  color: white;
  border: none;
}
.btn-buy-now:hover { transform: translateY(-3px); box-shadow: 0 10px 20px rgba(255, 65, 108, 0.3) !important; opacity: 0.9; }

.h-icon { width: 45px; height: 45px; display: flex; align-items: center; justify-content: center; font-size: 1.2rem; }
.bg-primary-subtle { background: #fff1f2; }

.btn-icon {
  width: 38px; height: 38px; padding: 0; display: flex; align-items: center; justify-content: center;
  border: 1px solid #ddd; background: #fff; transition: all 0.2s;
}
.btn-icon:hover { background: var(--bs-primary); color: white; border-color: var(--bs-primary); }

.share-icon {
  width: 36px; height: 36px; display: flex; align-items: center; justify-content: center;
  border-radius: 50%; color: white; transition: all 0.2s;
}
.share-icon.fb { background: #1877F2; }
.share-icon.x { background: #000; }
.share-icon.pin { background: #BD081C; }
.share-icon:hover { transform: translateY(-3px) scale(1.1); opacity: 0.8; }

.tab-btn {
  background: none; border: none; padding: 1.2rem 0; font-weight: 800; font-size: 1rem;
  color: #999; position: relative; transition: all 0.3s; letter-spacing: 1px;
}
.tab-btn.active { color: var(--bs-primary); }
.tab-btn.active::after {
  content: ''; position: absolute; bottom: -1px; left: 0; width: 100%; height: 3px; background-color: var(--bs-primary);
}

.modal-overlay {
  position: fixed; top: 0; left: 0; right: 0; bottom: 0; background: rgba(0,0,0,0.85); z-index: 9999;
}
.btn-close-custom {
  position: absolute; top: -15px; right: -15px; background: #fff; border: none;
  width: 40px; height: 40px; border-radius: 50%; font-size: 2rem; display: flex;
  align-items: center; justify-content: center; line-height: 1; z-index: 10;
}

.transition-all-2 { transition: all 0.2s; }
.transition-all-3 { transition: all 0.3s; }
.hover-primary:hover { color: var(--bs-primary) !important; border-color: var(--bs-primary) !important; }
.transition-hover:hover { transform: translateY(-5px); }

.animate-pulse { animation: pulse 2s infinite; }
@keyframes pulse {
  0% { opacity: 0.8; } 50% { opacity: 1; } 100% { opacity: 0.8; }
}

.animate-fade-in { animation: fadeIn 0.6s ease; }
@keyframes fadeIn {
  from { opacity: 0; transform: translateY(15px); } to { opacity: 1; transform: translateY(0); }
}

.uppercase { text-transform: uppercase; }
.tracking-wider { letter-spacing: 0.05em; }
.tracking-tighter { letter-spacing: -0.02em; }
</style>
