<template>
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
</template>

<script setup></script>
