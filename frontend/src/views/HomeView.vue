<template>
  <div id="preloader" class="preloader-container">
    <div class="book">
      <div class="inner">
        <div class="left"></div>
        <div class="middle"></div>
        <div class="right"></div>
      </div>
      <ul>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
      </ul>
    </div>
  </div>

  <section
    id="billboard"
    class="position-relative d-flex align-items-center py-5 bg-light-gray"
    style="
      background-image: url(images/banner-image-bg.jpg);
      background-size: cover;
      background-repeat: no-repeat;
      background-position: center;
      height: 800px;
    "
  >
    <div
      class="position-absolute end-0 pe-0 pe-xxl-5 me-0 me-xxl-5 swiper-next main-slider-button-next"
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
      class="position-absolute start-0 ps-0 ps-xxl-5 ms-0 ms-xxl-5 swiper-prev main-slider-button-prev"
    >
      <svg
        class="chevron-back-circle d-flex justify-content-center align-items-center p-2"
        width="80"
        height="80"
      >
        <use xlink:href="#alt-arrow-left-outline"></use>
      </svg>
    </div>
    <div class="swiper main-swiper">
      <div class="swiper-wrapper d-flex align-items-center">
        <div class="swiper-slide">
          <div class="container">
            <div class="row d-flex flex-column-reverse flex-md-row align-items-center">
              <div class="col-md-5 offset-md-1 mt-5 mt-md-0 text-center text-md-start">
                <div class="banner-content">
                  <h2>The Fine Print Book Collection</h2>
                  <p>Best Offer Save 30%. Grab it now!</p>
                  <a href="index.html" class="btn mt-3">Shop Collection</a>
                </div>
              </div>
              <div class="col-md-6 text-center">
                <div class="image-holder">
                  <img src="/images/banner-image2.png" class="img-fluid" alt="banner" />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="swiper-slide">
          <div class="container">
            <div class="row d-flex flex-column-reverse flex-md-row align-items-center">
              <div class="col-md-5 offset-md-1 mt-5 mt-md-0 text-center text-md-start">
                <div class="banner-content">
                  <h2>How Innovation works</h2>
                  <p>Discount available. Grab it now!</p>
                  <a href="index.html" class="btn mt-3">Shop Product</a>
                </div>
              </div>
              <div class="col-md-6 text-center">
                <div class="image-holder">
                  <img src="/images/banner-image1.png" class="img-fluid" alt="banner" />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="swiper-slide">
          <div class="container">
            <div class="row d-flex flex-column-reverse flex-md-row align-items-center">
              <div class="col-md-5 offset-md-1 mt-5 mt-md-0 text-center text-md-start">
                <div class="banner-content">
                  <h2>Your Heart is the Sea</h2>
                  <p>Limited stocks available. Grab it now!</p>
                  <a href="index.html" class="btn mt-3">Shop Collection</a>
                </div>
              </div>
              <div class="col-md-6 text-center">
                <div class="image-holder">
                  <img src="/images/banner-image.png" class="img-fluid" alt="banner" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>

  <section id="company-services" class="padding-large pb-0">
    <div class="container">
      <div class="row">
        <div class="col-lg-3 col-md-6 pb-3 pb-lg-0">
          <div class="icon-box d-flex">
            <div class="icon-box-icon pe-3 pb-3">
              <svg class="cart-outline">
                <use xlink:href="#cart-outline" />
              </svg>
            </div>
            <div class="icon-box-content">
              <h4 class="card-title mb-1 text-capitalize text-dark">Free delivery</h4>
              <p>Consectetur adipi elit lorem ipsum dolor sit amet.</p>
            </div>
          </div>
        </div>
        <div class="col-lg-3 col-md-6 pb-3 pb-lg-0">
          <div class="icon-box d-flex">
            <div class="icon-box-icon pe-3 pb-3">
              <svg class="quality">
                <use xlink:href="#quality" />
              </svg>
            </div>
            <div class="icon-box-content">
              <h4 class="card-title mb-1 text-capitalize text-dark">Quality guarantee</h4>
              <p>Dolor sit amet orem ipsu mcons ectetur adipi elit.</p>
            </div>
          </div>
        </div>
        <div class="col-lg-3 col-md-6 pb-3 pb-lg-0">
          <div class="icon-box d-flex">
            <div class="icon-box-icon pe-3 pb-3">
              <svg class="price-tag">
                <use xlink:href="#price-tag" />
              </svg>
            </div>
            <div class="icon-box-content">
              <h4 class="card-title mb-1 text-capitalize text-dark">Daily offers</h4>
              <p>Amet consectetur adipi elit loreme ipsum dolor sit.</p>
            </div>
          </div>
        </div>
        <div class="col-lg-3 col-md-6 pb-3 pb-lg-0">
          <div class="icon-box d-flex">
            <div class="icon-box-icon pe-3 pb-3">
              <svg class="shield-plus">
                <use xlink:href="#shield-plus" />
              </svg>
            </div>
            <div class="icon-box-content">
              <h4 class="card-title mb-1 text-capitalize text-dark">100% secure payment</h4>
              <p>Rem Lopsum dolor sit amet, consectetur adipi elit.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>

  <section id="best-selling-items" class="position-relative padding-large">
    <div class="container">
      <div class="section-title d-md-flex justify-content-between align-items-center mb-4">
        <h3 class="d-flex align-items-center text-primary">Best selling items</h3>
        <RouterLink to="/shop" class="btn">View All</RouterLink>
      </div>
      <div
        class="swiper-nav-btn product-slider-button-next position-absolute top-50 end-0 translate-middle-y me-3 me-lg-5 d-flex align-items-center justify-content-center"
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
        class="swiper-nav-btn product-slider-button-prev position-absolute top-50 start-0 translate-middle-y ms-3 ms-lg-5 d-flex align-items-center justify-content-center"
      >
        <svg
          class="chevron-back-circle d-flex justify-content-center align-items-center p-2"
          width="80"
          height="80"
        >
          <use xlink:href="#alt-arrow-left-outline"></use>
        </svg>
      </div>
      <div class="swiper product-swiper">
        <div class="swiper-wrapper">
          <template v-if="bestSellingBooks.length">
            <div v-for="b in bestSellingBooks" :key="b.id" class="swiper-slide pb-4">
              <div
                class="card shop-card h-100 border-0 rounded-4 shadow-sm bg-white position-relative"
              >
                <div
                  class="position-absolute top-0 start-0 w-100 p-2 d-flex justify-content-between align-items-start"
                  style="z-index: 3; pointer-events: none"
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
                    :class="[
                      'btn',
                      'btn-icon',
                      'rounded-circle',
                      'shadow-sm',
                      'bg-white',
                      'border-primary',
                    ]"
                    style="pointer-events: auto"
                    @click.prevent="toggleWishlist(b)"
                  >
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      :fill="isInWishlist(b.id) ? 'currentColor' : 'none'"
                      stroke="currentColor"
                      stroke-width="2"
                      class="text-primary"
                    >
                      <path
                        d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"
                      ></path>
                    </svg>
                  </button>
                </div>

                <div
                  class="card-img-wrapper rounded-top-4 overflow-hidden bg-light position-relative"
                >
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

                  <div
                    class="hover-overlay d-flex flex-column justify-content-center align-items-center gap-2 position-absolute top-0 start-0 w-100 h-100 bg-white bg-opacity-85"
                    style="transition: opacity 0.3s ease"
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

                <div class="card-body p-3 p-md-4 d-flex flex-column">
                  <RouterLink
                    :to="{ name: 'product-detail', params: { slug: b.slug } }"
                    class="text-decoration-none"
                  >
                    <h6 class="card-title fw-bold mb-1 text-truncate" :title="b.title">
                      {{ b.title }}
                    </h6>
                  </RouterLink>
                  <p
                    class="card-text small mb-2 text-truncate"
                    style="color: #888"
                    :title="b.author"
                  >
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
                    <span class="small" style="font-size: 0.75rem; color: #888"
                      >Chưa có đánh giá</span
                    >
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
          </template>
          <template v-else>
            <div class="swiper-slide">
              <p class="text-muted">Loading books...</p>
            </div>
          </template>
        </div>
      </div>
    </div>
  </section>

  <section
    id="limited-offer"
    class="padding-large"
    style="
      background-image: url(/images/banner-image-bg-1.jpg);
      background-size: cover;
      background-repeat: no-repeat;
      background-position: center;
      height: 800px;
    "
  >
    <div class="container">
      <div class="row d-flex align-items-center">
        <div class="col-md-6 text-center">
          <div class="image-holder">
            <img src="/images/banner-image3.png" class="img-fluid" alt="banner" />
          </div>
        </div>
        <div class="col-md-5 offset-md-1 mt-5 mt-md-0 text-center text-md-start">
          <h2>30% Discount on all items. Hurry Up !!!</h2>
          <div id="countdown-clock" class="text-dark d-flex align-items-center my-3">
            <div class="time d-grid pe-3">
              <span class="days fs-1 fw-normal"></span>
              <small>Days</small>
            </div>
            <span class="fs-1 text-primary">:</span>
            <div class="time d-grid pe-3 ps-3">
              <span class="hours fs-1 fw-normal"></span>
              <small>Hrs</small>
            </div>
            <span class="fs-1 text-primary">:</span>
            <div class="time d-grid pe-3 ps-3">
              <span class="minutes fs-1 fw-normal"></span>
              <small>Min</small>
            </div>
            <span class="fs-1 text-primary">:</span>
            <div class="time d-grid ps-3">
              <span class="seconds fs-1 fw-normal"></span>
              <small>Sec</small>
            </div>
          </div>
          <a href="index.html" class="btn mt-3">Shop Collection</a>
        </div>
      </div>
    </div>
  </section>

  <section id="items-listing" class="padding-large">
    <div class="container">
      <div class="row">
        <div class="col-md-6 mb-4 mb-lg-0 col-lg-3 d-flex">
          <div class="featured border rounded-3 p-4 h-100 d-flex flex-column w-100">
            <div class="section-title overflow-hidden mb-5 mt-2">
              <h3 class="d-flex flex-column mb-0 text-primary">Featured</h3>
            </div>
            <div class="items-lists flex-grow-1 d-flex flex-column justify-content-between">
              <template v-for="(b, idx) in featuredBooks" :key="b.id">
                <div class="item d-flex align-items-start">
                  <img :src="b.imageUrl" class="img-fluid shadow-sm" :alt="b.title" />
                  <div class="item-content ms-3 flex-grow-1 min-w-0 overflow-hidden">
                    <h6 class="mb-0 fw-bold" :title="b.title">
                      <RouterLink
                        :to="{ name: 'product-detail', params: { slug: b.slug } }"
                        class="d-block w-100 text-truncate text-decoration-none "
                      >
                        {{ b.title }}
                      </RouterLink>
                    </h6>
                    <div class="review-content d-flex flex-wrap align-items-center gap-2">
                      <p class="mb-0 my-2 fs-6 text-black-50">{{ b.author }}</p>

                      <div class="rating text-warning d-flex align-items-center">
                        <svg
                          v-for="i in 5"
                          :key="i"
                          class="star star-fill"
                          :class="{ 'opacity-25': i > Math.max(1, Math.round(b.ratingAvg || 0)) }"
                        >
                          <use xlink:href="#star-fill"></use>
                        </svg>
                      </div>
                    </div>
                    <span class="price text-primary fw-bold mb-2 fs-5">${{ b.price }}</span>
                  </div>
                </div>
                <hr v-if="idx < featuredBooks.length - 1" class="gray-400" />
              </template>
            </div>
          </div>
        </div>
        <div class="col-md-6 mb-4 mb-lg-0 col-lg-3 d-flex">
          <div class="latest-items border rounded-3 p-4 h-100 d-flex flex-column w-100">
            <div class="section-title overflow-hidden mb-5 mt-2">
              <h3 class="d-flex flex-column mb-0 text-primary">Latest items</h3>
            </div>
            <div class="items-lists flex-grow-1 d-flex flex-column justify-content-between">
              <template v-for="(b, idx) in latestBooks" :key="b.id">
                <div class="item d-flex align-items-start">
                  <img :src="b.imageUrl" class="img-fluid shadow-sm" :alt="b.title" />
                  <div class="item-content ms-3 flex-grow-1 min-w-0 overflow-hidden">
                    <h6 class="mb-0 fw-bold" :title="b.title">
                      <RouterLink
                        :to="{ name: 'product-detail', params: { slug: b.slug } }"
                        class="d-block w-100 text-truncate text-decoration-none"
                      >
                        {{ b.title }}
                      </RouterLink>
                    </h6>
                    <div class="review-content d-flex flex-wrap align-items-center gap-2">
                      <p class="mb-0 my-2 fs-6 text-black-50">{{ b.author }}</p>
                      <div class="rating text-warning d-flex align-items-center">
                        <svg
                          v-for="i in 5"
                          :key="i"
                          class="star star-fill"
                          :class="{ 'opacity-25': i > Math.max(1, Math.round(b.ratingAvg || 0)) }"
                        >
                          <use xlink:href="#star-fill"></use>
                        </svg>
                      </div>
                    </div>
                    <span class="price text-primary fw-bold mb-2 fs-5">${{ b.price }}</span>
                  </div>
                </div>
                <hr v-if="idx < latestBooks.length - 1" class="gray-400" />
              </template>
            </div>
          </div>
        </div>
        <div class="col-md-6 mb-4 mb-lg-0 col-lg-3 d-flex">
          <div class="best-reviewed border rounded-3 p-4 h-100 d-flex flex-column w-100">
            <div class="section-title overflow-hidden mb-5 mt-2">
              <h3 class="d-flex flex-column mb-0 text-primary">Best reviewed</h3>
            </div>
            <div class="items-lists flex-grow-1 d-flex flex-column justify-content-between">
              <template v-for="(b, idx) in bestReviewedBooks" :key="b.id">
                <div class="item d-flex align-items-start">
                  <img :src="b.imageUrl" class="img-fluid shadow-sm" :alt="b.title" />
                  <div class="item-content ms-3 flex-grow-1 min-w-0 overflow-hidden">
                    <h6 class="mb-0 fw-bold" :title="b.title">
                      <RouterLink
                        :to="{ name: 'product-detail', params: { slug: b.slug } }"
                        class="d-block w-100 text-truncate text-decoration-none"
                      >
                        {{ b.title }}
                      </RouterLink>
                    </h6>
                    <div class="review-content d-flex flex-wrap align-items-center gap-2">
                      <p class="mb-0 my-2 fs-6 text-black-50">{{ b.author }}</p>
                      <div class="rating text-warning d-flex align-items-center">
                        <svg
                          v-for="i in 5"
                          :key="i"
                          class="star star-fill"
                          :class="{ 'opacity-25': i > Math.max(1, Math.round(b.ratingAvg || 0)) }"
                        >
                          <use xlink:href="#star-fill"></use>
                        </svg>
                      </div>
                    </div>
                    <span class="price text-primary fw-bold mb-2 fs-5">${{ b.price }}</span>
                  </div>
                </div>
                <hr v-if="idx < bestReviewedBooks.length - 1" class="gray-400" />
              </template>
            </div>
          </div>
        </div>
        <div class="col-md-6 mb-4 mb-lg-0 col-lg-3 d-flex">
          <div class="on-sale border rounded-3 p-4 h-100 d-flex flex-column w-100">
            <div class="section-title overflow-hidden mb-5 mt-2">
              <h3 class="d-flex flex-column mb-0 text-primary">On sale</h3>
            </div>
            <div class="items-lists flex-grow-1 d-flex flex-column justify-content-between">
              <template v-for="(b, idx) in onSaleBooks" :key="b.id">
                <div class="item d-flex align-items-start">
                  <img :src="b.imageUrl" class="img-fluid shadow-sm" :alt="b.title" />
                  <div class="item-content ms-3 flex-grow-1 min-w-0 overflow-hidden">
                    <h6 class="mb-0 fw-bold" :title="b.title">
                      <RouterLink
                        :to="{ name: 'product-detail', params: { slug: b.slug } }"
                        class="d-block w-100 text-truncate text-decoration-none"
                      >
                        {{ b.title }}
                      </RouterLink>
                    </h6>
                    <div class="review-content d-flex flex-wrap align-items-center gap-2">
                      <p class="mb-0 my-2 fs-6 text-black-50">{{ b.author }}</p>
                      <div class="rating text-warning d-flex align-items-center">
                        <svg
                          v-for="i in 5"
                          :key="i"
                          class="star star-fill"
                          :class="{ 'opacity-25': i > Math.max(1, Math.round(b.ratingAvg || 0)) }"
                        >
                          <use xlink:href="#star-fill"></use>
                        </svg>
                      </div>
                    </div>
                    <span class="price text-primary fw-bold mb-2 fs-5">
                      <template v-if="b.compareAtPrice && b.compareAtPrice > b.price">
                        <s class="text-black-50">${{ b.compareAtPrice }}</s> ${{ b.price }}
                      </template>
                      <template v-else> ${{ b.price }} </template>
                    </span>
                  </div>
                </div>
                <hr v-if="idx < onSaleBooks.length - 1" class="gray-400" />
              </template>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>

  <section id="categories" class="padding-large pt-0">
    <div class="container">
      <div class="section-title overflow-hidden mb-4">
        <h3 class="d-flex align-items-center text-primary">Categories</h3>
      </div>
      <div class="row">
        <div class="col-md-4">
          <div class="card mb-4 border-0 rounded-3 position-relative">
            <a href="index.html">
              <img src="/images/category1.jpg" class="img-fluid rounded-3" alt="cart item" />
              <h6 class="position-absolute bottom-0 bg-primary m-4 py-2 px-3 rounded-3">
                <a href="index.html" class="text-white">Romance</a>
              </h6>
            </a>
          </div>
        </div>
        <div class="col-md-4">
          <div class="card text-center mb-4 border-0 rounded-3">
            <a href="index.html">
              <img src="/images/category2.jpg" class="img-fluid rounded-3" alt="cart item" />
              <h6 class="position-absolute bottom-0 bg-primary m-4 py-2 px-3 rounded-3">
                <a href="index.html" class="text-white">Lifestyle</a>
              </h6>
            </a>
          </div>
        </div>
        <div class="col-md-4">
          <div class="card text-center mb-4 border-0 rounded-3">
            <a href="index.html">
              <img src="/images/category3.jpg" class="img-fluid rounded-3" alt="cart item" />
              <h6 class="position-absolute bottom-0 bg-primary m-4 py-2 px-3 rounded-3">
                <a href="index.html" class="text-white">Recipe</a>
              </h6>
            </a>
          </div>
        </div>
      </div>
    </div>
  </section>

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
        <h3 class="mb-4">Customers reviews</h3>
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
          <div class="swiper-slide">
            <div class="card position-relative text-left p-5 border rounded-3">
              <blockquote>
                "As an avid reader, I'm always on the lookout for new releases, and this bookstore
                never disappoints. They always have the latest titles, and their recommendations
                have introduced me to some incredible reads!"
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
              <h5 class="mt-1 fw-normal">Thomas John</h5>
            </div>
          </div>
          <div class="swiper-slide">
            <div class="card position-relative text-left p-5 border rounded-3">
              <blockquote>
                "I ordered a few books online from this store, and I was impressed by the quick
                delivery and careful packaging. It's clear that they prioritize customer
                satisfaction, and I'll definitely be shopping here again!"
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
              <h5 class="mt-1 fw-normal">Kevin Bryan</h5>
            </div>
          </div>
          <div class="swiper-slide">
            <div class="card position-relative text-left p-5 border rounded-3">
              <blockquote>
                “I stumbled upon this tech store while searching for a new laptop, and I couldn't be
                happier with my experience! The staff was incredibly knowledgeable and guided me
                through the process of choosing the perfect device for my needs. Highly
                recommended!”
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
              <h5 class="mt-1 fw-normal">Stevin</h5>
            </div>
          </div>
          <div class="swiper-slide">
            <div class="card position-relative text-left p-5 border rounded-3">
              <blockquote>
                “I stumbled upon this tech store while searching for a new laptop, and I couldn't be
                happier with my experience! The staff was incredibly knowledgeable and guided me
                through the process of choosing the perfect device for my needs. Highly
                recommended!”
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
              <h5 class="mt-1 fw-normal">Roman</h5>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>

  <section id="latest-posts" class="padding-large">
    <div class="container">
      <div class="section-title d-md-flex justify-content-between align-items-center mb-4">
        <h3 class="d-flex align-items-center text-primary">Latest posts</h3>
        <a href="index.html" class="btn">View All</a>
      </div>
      <div class="row">
        <div class="col-md-3 posts mb-4">
          <img src="/images/post-item1.jpg" alt="post image" class="img-fluid rounded-3" />
          <a href="blog.html" class="fs-6 text-primary">Books</a>
          <h4 class="card-title mb-2 text-capitalize text-dark">
            <a href="index.html">10 Must-Read Books of the Year: Our Top Picks!</a>
          </h4>
          <p class="mb-2">
            Dive into the world of cutting-edge technology with our latest blog post, where we
            highlight five essential gadge.
            <span
              ><a class="text-decoration-underline text-black-50" href="index.html"
                >Read More</a
              ></span
            >
          </p>
        </div>
        <div class="col-md-3 posts mb-4">
          <img src="/images/post-item2.jpg" alt="post image" class="img-fluid rounded-3" />
          <a href="blog.html" class="fs-6 text-primary">Books</a>
          <h4 class="card-title mb-2 text-capitalize text-dark">
            <a href="index.html">The Fascinating Realm of Science Fiction</a>
          </h4>
          <p class="mb-2">
            Explore the intersection of technology and sustainability in our latest blog post. Learn
            about the innovative
            <span
              ><a class="text-decoration-underline text-black-50" href="index.html"
                >Read More</a
              ></span
            >
          </p>
        </div>
        <div class="col-md-3 posts mb-4">
          <img src="/images/post-item3.jpg" alt="post image" class="img-fluid rounded-3" />
          <a href="blog.html" class="fs-6 text-primary">Books</a>
          <h4 class="card-title mb-2 text-capitalize text-dark">
            <a href="index.html">Finding Love in the Pages of a Book</a>
          </h4>
          <p class="mb-2">
            Stay ahead of the curve with our insightful look into the rapidly evolving landscape of
            wearable technology.
            <span
              ><a class="text-decoration-underline text-black-50" href="index.html"
                >Read More</a
              ></span
            >
          </p>
        </div>
        <div class="col-md-3 posts mb-4">
          <img src="/images/post-item4.jpg" alt="post image" class="img-fluid rounded-3" />
          <a href="blog.html" class="fs-6 text-primary">Books</a>
          <h4 class="card-title mb-2 text-capitalize text-dark">
            <a href="index.html">Reading for Mental Health: How Books Can Heal and Inspire</a>
          </h4>
          <p class="mb-2">
            In today's remote work environment, productivity is key. Discover the top apps and tools
            that can help you stay
            <span
              ><a class="text-decoration-underline text-black-50" href="index.html"
                >Read More</a
              ></span
            >
          </p>
        </div>
      </div>
    </div>
  </section>

  <section id="instagram">
    <div class="container">
      <div class="text-center mb-4 text-primary">
        <h3>Instagram</h3>
      </div>
      <div class="row">
        <div class="col-md-2">
          <figure class="instagram-item position-relative rounded-3">
            <a href="https://templatesjungle.com/" class="image-link position-relative">
              <div class="icon-overlay position-absolute d-flex justify-content-center">
                <svg class="instagram">
                  <use xlink:href="#instagram"></use>
                </svg>
              </div>
              <img
                src="/images/insta-item1.jpg"
                alt="instagram"
                class="img-fluid rounded-3 insta-image"
              />
            </a>
          </figure>
        </div>
        <div class="col-md-2">
          <figure class="instagram-item position-relative rounded-3">
            <a href="https://templatesjungle.com/" class="image-link position-relative">
              <div class="icon-overlay position-absolute d-flex justify-content-center">
                <svg class="instagram">
                  <use xlink:href="#instagram"></use>
                </svg>
              </div>
              <img
                src="/images/insta-item2.jpg"
                alt="instagram"
                class="img-fluid rounded-3 insta-image"
              />
            </a>
          </figure>
        </div>
        <div class="col-md-2">
          <figure class="instagram-item position-relative rounded-3">
            <a href="https://templatesjungle.com/" class="image-link position-relative">
              <div class="icon-overlay position-absolute d-flex justify-content-center">
                <svg class="instagram">
                  <use xlink:href="#instagram"></use>
                </svg>
              </div>
              <img
                src="/images/insta-item3.jpg"
                alt="instagram"
                class="img-fluid rounded-3 insta-image"
              />
            </a>
          </figure>
        </div>
        <div class="col-md-2">
          <figure class="instagram-item position-relative rounded-3">
            <a href="https://templatesjungle.com/" class="image-link position-relative">
              <div class="icon-overlay position-absolute d-flex justify-content-center">
                <svg class="instagram">
                  <use xlink:href="#instagram"></use>
                </svg>
              </div>
              <img
                src="/images/insta-item4.jpg"
                alt="instagram"
                class="img-fluid rounded-3 insta-image"
              />
            </a>
          </figure>
        </div>
        <div class="col-md-2">
          <figure class="instagram-item position-relative rounded-3">
            <a href="https://templatesjungle.com/" class="image-link position-relative">
              <div class="icon-overlay position-absolute d-flex justify-content-center">
                <svg class="instagram">
                  <use xlink:href="#instagram"></use>
                </svg>
              </div>
              <img
                src="/images/insta-item5.jpg"
                alt="instagram"
                class="img-fluid rounded-3 insta-image"
              />
            </a>
          </figure>
        </div>
        <div class="col-md-2">
          <figure class="instagram-item position-relative rounded-3">
            <a href="https://templatesjungle.com/" class="image-link position-relative">
              <div class="icon-overlay position-absolute d-flex justify-content-center">
                <svg class="instagram">
                  <use xlink:href="#instagram"></use>
                </svg>
              </div>
              <img
                src="/images/insta-item6.jpg"
                alt="instagram"
                class="img-fluid rounded-3 insta-image"
              />
            </a>
          </figure>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { computed, onMounted, nextTick, ref } from 'vue'
import { useRouter } from 'vue-router'
import { apiGet } from '@/lib/api'
import { useCartStore } from '@/stores/cart'
import { useAuthStore } from '@/stores/auth'
import { apiPost } from '@/lib/api'
import { toast } from 'vue3-toastify'

const books = ref([])
const loading = ref(false)
const cart = useCartStore()
const auth = useAuthStore()
const router = useRouter()
const wishlistIds = ref([])

const bestSellingBooks = computed(() => {
  const rows = Array.isArray(books.value) ? books.value : []
  return [...rows]
    .sort((a, b) => (Number(b.reviewCount) || 0) - (Number(a.reviewCount) || 0))
    .slice(0, 10)
})

const featuredBooks = computed(() => {
  const rows = Array.isArray(books.value) ? books.value : []
  return rows.slice(0, 3)
})

const latestBooks = computed(() => {
  const rows = Array.isArray(books.value) ? books.value : []
  return rows.slice(3, 6)
})

const bestReviewedBooks = computed(() => {
  const rows = Array.isArray(books.value) ? books.value : []
  return [...rows]
    .sort((a, b) => {
      const ratingDiff = (Number(b.ratingAvg) || 0) - (Number(a.ratingAvg) || 0)
      if (ratingDiff !== 0) return ratingDiff
      return (Number(b.reviewCount) || 0) - (Number(a.reviewCount) || 0)
    })
    .slice(0, 3)
})

const onSaleBooks = computed(() => {
  const rows = Array.isArray(books.value) ? books.value : []
  const sale = rows
    .filter((b) => Number(b.compareAtPrice) && Number(b.compareAtPrice) > Number(b.price))
    .slice(0, 3)
  if (sale.length) return sale
  return rows.slice(6, 9)
})

function addToCart(book) {
  if (!book?.id) return
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
    console.error('Failed to load wishlist for home view', error)
    wishlistIds.value = []
  }
}

const loadBooks = async () => {
  loading.value = true
  try {
    const res = await apiGet('/books', { params: { page: 1, limit: 24 } })
    books.value = res?.data ?? []
  } catch (error) {
    console.error('Failed to load books for home view', error)
  } finally {
    loading.value = false
  }
}

// Hàm kiểm tra xem sách có phải mới thêm trong vòng 7 ngày không (để hiện huy hiệu New)
const isNew = (dateString) => {
  if (!dateString) return false
  const date = new Date(dateString)
  const now = new Date()
  const diffTime = Math.abs(now - date)
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
  return diffDays <= 7
}

const toggleWishlist = async (book) => {
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

onMounted(async () => {
  await loadBooks()
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
/* Ẩn overlay đi theo mặc định */
.card-img-wrapper .hover-overlay {
  opacity: 0;
  visibility: hidden;
  z-index: 5;
}

/* Hiện overlay khi di chuột vào phần ảnh */
.card-img-wrapper:hover .hover-overlay {
  opacity: 1;
  visibility: visible;
}

.card-img-wrapper .hover-overlay .btn {
  transform: translateY(20px);
  transition:
    transform 0.3s ease,
    opacity 0.3s ease;
  opacity: 0;
}

.card-img-wrapper:hover .hover-overlay .btn {
  transform: translateY(0);
  opacity: 1;
}

.btn-icon {
  width: 38px;
  height: 38px;
  padding: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px solid #ddd;
  background: #fff;
  transition: all 0.2s;
}

.btn-icon:hover {
  background: var(--primary-color);
  color: #fff;
  border-color: var(--primary-color);
}
</style>
