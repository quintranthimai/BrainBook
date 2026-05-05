<template>
  <footer id="footer" class="padding-large">
    <div class="container">
      <div class="row">
        <div class="footer-top-area">
          <div class="row d-flex flex-wrap justify-content-between">
            <div class="col-lg-3 col-sm-6 pb-3">
              <div class="footer-menu">
                <h3 class="text-primary fw-bold m-0">BrainBook</h3>
                <p>
                  Nisi, purus vitae, ultrices nunc. Sit ac sit suscipit hendrerit. Gravida massa
                  volutpat aenean odio erat nullam fringilla.
                </p>
                <div class="social-links">
                  <ul class="d-flex list-unstyled">
                    <li>
                      <a href="#">
                        <svg class="facebook">
                          <use xlink:href="#facebook" />
                        </svg>
                      </a>
                    </li>
                    <li>
                      <a href="#">
                        <svg class="instagram">
                          <use xlink:href="#instagram" />
                        </svg>
                      </a>
                    </li>
                    <li>
                      <a href="#">
                        <svg class="twitter">
                          <use xlink:href="#twitter" />
                        </svg>
                      </a>
                    </li>
                    <li>
                      <a href="#">
                        <svg class="linkedin">
                          <use xlink:href="#linkedin" />
                        </svg>
                      </a>
                    </li>
                    <li>
                      <a href="#">
                        <svg class="youtube">
                          <use xlink:href="#youtube" />
                        </svg>
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            <div class="col-lg-2 col-sm-6 pb-3">
              <div class="footer-menu text-capitalize">
                <h5 class="widget-title pb-2 text-primary">Quick Links</h5>
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
              </div>
            </div>
            <div class="col-lg-3 col-sm-6 pb-3">
              <div class="footer-menu text-capitalize">
                <h5 class="widget-title pb-2 text-primary">Help & Info Help</h5>
                <ul class="menu-list list-unstyled">
                  <li class="menu-item mb-1">
                    <a href="#">Track Your Order</a>
                  </li>
                  <li class="menu-item mb-1">
                    <a href="#">Returns Policies</a>
                  </li>
                  <li class="menu-item mb-1">
                    <a href="#">Shipping + Delivery</a>
                  </li>
                  <li class="menu-item mb-1">
                    <a href="#">Contact Us</a>
                  </li>
                  <li class="menu-item mb-1">
                    <a href="#">Faqs</a>
                  </li>
                </ul>
              </div>
            </div>
            <div class="col-lg-3 col-sm-6 pb-3">
              <div class="footer-menu contact-item">
                <h5 class="widget-title text-capitalize pb-2 text-primary">Contact Us</h5>
                <p>
                  Do you have any queries or suggestions?
                  <a href="mailto:" class="text-decoration-underline">yourinfo@gmail.com</a>
                </p>
                <p>
                  If you need support? Just give us a call.
                  <a href="#" class="text-decoration-underline">+55 111 222 333 44</a>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </footer>
</template>

<script setup></script>
