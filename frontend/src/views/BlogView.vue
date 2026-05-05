<template>
  <section
    id="customers-reviews"
    class="position-relative padding-large"
    style="
      background-image: url(images/banner-image-bg.jpg);
      background-size: cover;
      background-repeat: no-repeat;
      background-position: center;
      height: 600px;
    "
  >
    <div class="container offset-md-3 col-md-6">
      <div
        class="position-absolute top-50 end-0 pe-0 pe-xxl-5 me-0 me-xxl-5 swiper-next testimonial-button-next"
      >
        <svg
          class="chevron-forward-circle d-flex justify-content-center align-items-center p-2"
          width="80"
          height="80"
        >
          <use xlink:href="#alt-arrow-right-outline"></use>
        </svg>
      </div>
      <div
        class="position-absolute top-50 start-0 ps-0 ps-xxl-5 ms-0 ms-xxl-5 swiper-prev testimonial-button-prev"
      >
        <svg
          class="chevron-back-circle d-flex justify-content-center align-items-center p-2"
          width="80"
          height="80"
        >
          <use xlink:href="#alt-arrow-left-outline"></use>
        </svg>
      </div>
      <div class="section-title mb-4 text-center">
        <h3 class="mb-4 text-primary">Customers reviews</h3>
      </div>
      <div class="swiper testimonial-swiper">
        <div class="swiper-wrapper">
          <div class="swiper-slide">
            <div class="card position-relative text-left p-5 border rounded-3">
              <blockquote>
                "I stumbled upon this bookstore while visiting the city, and it instantly became my
                favorite spot. The cozy atmosphere, friendly staff, and wide selection of books make
                every visit a delight!"
              </blockquote>
              <div class="rating text-warning d-flex align-items-center">
                <svg class="star star-fill">
                  <use xlink:href="#star-fill"></use>
                </svg>
                <svg class="star star-fill">
                  <use xlink:href="#star-fill"></use>
                </svg>
                <svg class="star star-fill">
                  <use xlink:href="#star-fill"></use>
                </svg>
                <svg class="star star-fill">
                  <use xlink:href="#star-fill"></use>
                </svg>
                <svg class="star star-fill">
                  <use xlink:href="#star-fill"></use>
                </svg>
              </div>
              <h5 class="mt-1 fw-normal">Emma Chamberlin</h5>
            </div>
          </div>
          <!-- Other slides omitted for brevity in template, keeping structure -->
        </div>
      </div>
    </div>
  </section>

  <section id="latest-posts" class="padding-large">
    <div class="container">
      <div class="section-title d-md-flex justify-content-between align-items-center mb-4">
        <h3 class="d-flex align-items-center text-primary">Latest posts</h3>
      </div>
      <div v-if="loading" class="text-center py-5">
        <div class="spinner-border text-primary" role="status"></div>
      </div>
      <div v-else class="row">
        <div v-for="post in posts" :key="post.id" class="col-md-3 posts mb-4">
          <img :src="post.thumbnail || '/images/post-item1.jpg'" alt="post image" class="img-fluid rounded-3" style="height: 200px; width: 100%; object-fit: cover;" />
          <a href="#" class="fs-6 text-primary">{{ post.author }}</a>
          <h4 class="card-title mb-2 text-capitalize text-dark">
            <a href="#">{{ post.title }}</a>
          </h4>
          <p class="mb-2">
            {{ post.excerpt || (post.content ? post.content.substring(0, 100) + '...' : '') }}
            <span><a class="text-decoration-underline text-black-50" href="#">Read More</a></span>
          </p>
        </div>
        <div v-if="posts.length === 0" class="col-12 text-center text-muted">
          No posts found.
        </div>
      </div>
    </div>
  </section>

  <section id="instagram">
    <div class="container text-center py-5">
      <h3 class="text-primary mb-4">Instagram</h3>
      <div class="row g-3">
        <div v-for="n in 6" :key="n" class="col-md-2">
          <img :src="`/images/insta-item${n}.jpg`" class="img-fluid rounded-3" alt="instagram" />
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { apiGet } from '@/lib/api'

const posts = ref([])
const loading = ref(false)

const fetchPosts = async () => {
  loading.value = true
  try {
    posts.value = await apiGet('/posts')
  } catch (error) {
    console.error('Failed to fetch posts', error)
  } finally {
    loading.value = false
  }
}

onMounted(fetchPosts)
</script>