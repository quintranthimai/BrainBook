import { createApp } from 'vue'
import { createPinia } from 'pinia'
import Vue3Toastify from 'vue3-toastify'
import 'vue3-toastify/dist/index.css'

import GoogleSignInPlugin from 'vue3-google-signin'

import App from './App.vue'
import router from './router'

const app = createApp(App)

app.use(createPinia())
app.use(router)

app.use(GoogleSignInPlugin, {
  clientId: '1016805497943-jffnkdsrck1k8vseu2sn03elq426i6fv.apps.googleusercontent.com',
})

app.use(Vue3Toastify, {
  autoClose: 3000,
  position: 'bottom-right',
})

app.mount('#app')
