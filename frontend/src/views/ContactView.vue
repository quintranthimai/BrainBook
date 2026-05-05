<template>
  <div class="contact-page padding-large mt-5">
    <div class="container">
      <div class="text-center mb-5">
        <h4 class="text-primary fw-bold text-uppercase">Get in touch</h4>
        <h2 class="display-6 fw-bold">We are here for you! How can we help?</h2>
      </div>

      <div class="row justify-content-center">
        <div class="col-lg-8 col-md-10">
          <div class="text-center mb-5">
            <h6 class="text-primary fw-bold mb-2">Let's Connect</h6>
            <h3 class="mb-3 fw-bold">Send Your Message</h3>
            <p class="text-black-50">
              Do you have a question about a book, need help with your recent order, or want to
              suggest a new title for our collection? Just drop us a message and our bookstore team
              will get back to you shortly.
            </p>
          </div>

          <form class="contact-form">
            <div class="row">
              <div class="col-md-6 mb-3">
                <input
                  type="text"
                  class="form-control p-3 rounded-3"
                  placeholder="Your Name"
                  required
                />
              </div>
              <div class="col-md-6 mb-3">
                <input
                  type="email"
                  class="form-control p-3 rounded-3"
                  placeholder="Your Email"
                  required
                />
              </div>
              <div class="col-md-6 mb-3">
                <input type="tel" class="form-control p-3 rounded-3" placeholder="Your Phone" />
              </div>
              <div class="col-md-6 mb-3">
                <input
                  type="text"
                  class="form-control p-3 rounded-3"
                  placeholder="Order Number (Optional)"
                />
              </div>
            </div>
            <div class="mb-3">
              <input
                type="text"
                class="form-control p-3 rounded-3"
                placeholder="Subject"
                required
              />
            </div>
            <div class="mb-4">
              <textarea
                class="form-control p-3 rounded-3"
                rows="6"
                placeholder="Message"
                required
              ></textarea>
            </div>
            <button type="submit" class="btn mt-3 w-100 p-3 fs-5">Send Message</button>
          </form>
        </div>
      </div>

      <div class="row mt-5 pt-5 text-center g-4">
        <div class="col-md-3">
          <div class="contact-info-block d-flex flex-column align-items-center">
            <div
              class="icon-circle bg-primary text-white mb-3 d-flex justify-content-center align-items-center rounded-circle"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="28"
                height="28"
                fill="currentColor"
                class="bi bi-geo-alt-fill"
                viewBox="0 0 16 16"
              >
                <path
                  d="M8 16s6-5.686 6-10A6 6 0 0 0 2 6c0 4.314 6 10 6 10zm0-7a3 3 0 1 1 0-6 3 3 0 0 1 0 6z"
                />
              </svg>
            </div>
            <h5 class="fw-bold mb-1">Address</h5>
            <p class="text-black-50 mb-0">123 Book Street, HCMC</p>
          </div>
        </div>

        <div class="col-md-3">
          <div class="contact-info-block d-flex flex-column align-items-center">
            <div
              class="icon-circle bg-primary text-white mb-3 d-flex justify-content-center align-items-center rounded-circle"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="28"
                height="28"
                fill="currentColor"
                class="bi bi-envelope-fill"
                viewBox="0 0 16 16"
              >
                <path
                  d="M.05 3.555A2 2 0 0 1 2 2h12a2 2 0 0 1 1.95 1.555L8 8.414.05 3.555ZM0 4.697v7.104l5.803-3.558L0 4.697ZM6.761 8.83l-6.57 4.027A2 2 0 0 0 2 14h12a2 2 0 0 0 1.808-1.144l-6.57-4.027L8 9.586l-1.239-.757Zm3.436-.586L16 11.801V4.697l-5.803 3.546Z"
                />
              </svg>
            </div>
            <h5 class="fw-bold mb-1">Mail Us</h5>
            <p class="text-black-50 mb-0">hello@brainbook.com</p>
          </div>
        </div>

        <div class="col-md-3">
          <div class="contact-info-block d-flex flex-column align-items-center">
            <div
              class="icon-circle bg-primary text-white mb-3 d-flex justify-content-center align-items-center rounded-circle"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="28"
                height="28"
                fill="currentColor"
                class="bi bi-telephone-fill"
                viewBox="0 0 16 16"
              >
                <path
                  fill-rule="evenodd"
                  d="M1.885.511a1.745 1.745 0 0 1 2.61.163L6.29 2.98c.329.423.445.974.315 1.494l-.547 2.19a.678.678 0 0 0 .178.643l2.457 2.457a.678.678 0 0 0 .644.178l2.189-.547a1.745 1.745 0 0 1 1.494.315l2.306 1.794c.829.645.905 1.87.163 2.611l-1.034 1.034c-.74.74-1.846 1.065-2.877.702a18.634 18.634 0 0 1-7.01-4.42 18.634 18.634 0 0 1-4.42-7.009c-.362-1.03-.037-2.137.703-2.877L1.885.511z"
                />
              </svg>
            </div>
            <h5 class="fw-bold mb-1">Telephone</h5>
            <p class="text-black-50 mb-0">(+84) 123 456 789</p>
          </div>
        </div>

        <div class="col-md-3">
          <div class="contact-info-block d-flex flex-column align-items-center">
            <div
              class="icon-circle bg-primary text-white mb-3 d-flex justify-content-center align-items-center rounded-circle"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="28"
                height="28"
                fill="currentColor"
                class="bi bi-globe"
                viewBox="0 0 16 16"
              >
                <path
                  d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8zm7.5-6.923c-.67.204-1.335.82-1.887 1.855A7.97 7.97 0 0 0 5.145 4H7.5V1.077zM4.09 4a9.267 9.267 0 0 1 .64-1.539 6.7 6.7 0 0 1 .597-.933A7.025 7.025 0 0 0 2.255 4H4.09zm-.582 3.5c.03-.877.138-1.718.312-2.5H1.674a6.958 6.958 0 0 0-.656 2.5h2.49zM4.847 5a12.5 12.5 0 0 0-.338 2.5H7.5V5H4.847zM8.5 5v2.5h2.99a12.495 12.495 0 0 0-.337-2.5H8.5zM4.51 8.5a12.5 12.5 0 0 0 .337 2.5H7.5V8.5H4.51zm3.99 0V11h2.653c.187-.765.306-1.608.338-2.5H8.5zM5.145 12c.138.386.295.744.468 1.068.552 1.035 1.218 1.65 1.887 1.855V12H5.145zm.182 2.472a6.696 6.696 0 0 1-.597-.933A9.268 9.268 0 0 1 4.09 12H2.255a7.024 7.024 0 0 0 3.072 2.472zM3.82 11a13.652 13.652 0 0 1-.312-2.5h-2.49c.062.89.291 1.733.656 2.5H3.82zm6.853 3.472A7.024 7.024 0 0 0 13.745 12H11.91a9.27 9.27 0 0 1-.64 1.539 6.688 6.688 0 0 1-.597.933zM8.5 12v2.923c.67-.204 1.335-.82 1.887-1.855.173-.324.33-.682.468-1.068H8.5zm3.68-1h2.146c.365-.767.594-1.61.656-2.5h-2.49a13.65 13.65 0 0 1-.312 2.5zm2.802-3.5a6.959 6.959 0 0 0-.656-2.5H12.18c.174.782.282 1.623.312 2.5h2.49zM11.27 2.461c.247.464.462.98.64 1.539h1.835a7.024 7.024 0 0 0-3.072-2.472c.218.284.418.598.597.933zM10.855 4a7.966 7.966 0 0 0-.468-1.068C9.835 1.897 9.17 1.282 8.5 1.077V4h2.355z"
                />
              </svg>
            </div>
            <h5 class="fw-bold mb-1">Website</h5>
            <p class="text-black-50 mb-0">brainbook.com</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup></script>

<style scoped>
.icon-circle {
  width: 70px;
  height: 70px;
  transition: transform 0.3s ease;
}
.icon-circle:hover {
  transform: translateY(-5px);
}
.contact-form .form-control {
  border: 1px solid #e0e0e0;
  background-color: #fcfcfc;
}
.contact-form .form-control:focus {
  border-color: #f07c82;
  box-shadow: 0 0 0 0.25rem rgba(240, 124, 130, 0.25);
}
</style>
