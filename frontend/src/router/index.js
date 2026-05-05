import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/HomeView.vue'
import AboutView from '../views/AboutView.vue'
import ShopView from '../views/ShopView.vue'
import BlogView from '../views/BlogView.vue'
import ContactView from '../views/ContactView.vue'
import ProductDetailView from '@/views/ProductDetailView.vue'
import CheckoutView from '@/views/CheckoutView.vue'
import SuccessView from '@/views/SuccessView.vue'
import CartView from '@/views/CartView.vue'

import { getAccessToken } from '@/services/api'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  scrollBehavior() {
    return { top: 0 }
  },
  routes: [
    // ==========================================
    // KHU VỰC 1: CLIENT ROUTES
    // ==========================================
    {
      path: '/',
      name: 'home',
      component: Home,
    },

    {
      path: '/about',
      name: 'about',
      component: AboutView,
    },

    {
      path: '/shop',
      name: 'shop',
      component: ShopView,
    },

    {
      path: '/blogs',
      name: 'blogs',
      component: BlogView,
    },

    {
      path: '/contact',
      name: 'contact',
      component: ContactView,
    },

    {
      path: '/product/:slug',
      name: 'product-detail',
      component: ProductDetailView,
    },

    {
      path: '/checkout',
      name: 'checkout',
      component: CheckoutView,
    },

    {
      path: '/success',
      name: 'success',
      component: SuccessView,
    },

    {
      path: '/cart',
      name: 'cart',
      component: CartView,
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('@/views/LoginView.vue'),
    },
    {
      path: '/register',
      name: 'register',
      component: () => import('@/views/RegisterView.vue'),
    },
    {
      path: '/account',
      name: 'account',
      component: () => import('@/views/AccountView.vue'),
      meta: { requiresAuth: true },
    },
    {
      path: '/wishlist',
      name: 'wishlist',
      component: () => import('@/views/WishlistView.vue'),
      meta: { requiresAuth: true },
    },

    // ==========================================
    // KHU VỰC 2: ADMIN ROUTES (lazy-load)
    // ==========================================
    {
      path: '/admin',
      component: () => import('@/layouts/AdminLayout.vue'),
      meta: { isAdmin: true },
      children: [
        {
          path: '',
          name: 'admin',
          component: () => import('@/views/admin/DashboardView.vue'),
          meta: { requiresAuth: true },
        },
        {
          path: 'products',
          name: 'admin-products',
          component: () => import('@/views/admin/ProductView.vue'),
          meta: { requiresAuth: true },
        },
        {
          path: 'create-product',
          name: 'admin-create-product',
          component: () => import('@/views/admin/CreateProductView.vue'),
          meta: { requiresAuth: true },
        },
        {
          path: 'edit-product/:id',
          name: 'admin-edit-product',
          component: () => import('@/views/admin/CreateProductView.vue'),
          meta: { requiresAuth: true },
        },
        {
          path: 'categories',
          name: 'admin-categories',
          component: () => import('@/views/admin/CategoryView.vue'),
          meta: { requiresAuth: true },
        },
        {
          path: 'create-category',
          name: 'admin-create-category',
          component: () => import('@/views/admin/CreateCategoryView.vue'),
          meta: { requiresAuth: true },
        },
        {
          path: 'edit-category/:id',
          name: 'admin-edit-category',
          component: () => import('@/views/admin/CreateCategoryView.vue'),
          meta: { requiresAuth: true },
        },
        {
          path: 'orders',
          name: 'admin-orders',
          component: () => import('@/views/admin/OrderView.vue'),
          meta: { requiresAuth: true },
        },
        {
          path: 'orders/:id',
          name: 'admin-order-detail',
          component: () => import('@/views/admin/OrderDetailView.vue'),
          meta: { requiresAuth: true },
        },
        {
          path: 'reports',
          name: 'admin-reports',
          component: () => import('@/views/admin/ReportsView.vue'),
          meta: { requiresAuth: true },
        },
        {
          path: 'blog',
          name: 'admin-blog',
          component: () => import('@/views/admin/BlogManagementView.vue'),
          meta: { requiresAuth: true },
        },
        {
          path: 'blog/create',
          name: 'admin-create-post',
          component: () => import('@/views/admin/CreatePostView.vue'),
          meta: { requiresAuth: true },
        },
        {
          path: 'blog/edit/:id',
          name: 'admin-edit-post',
          component: () => import('@/views/admin/CreatePostView.vue'),
          meta: { requiresAuth: true },
        },
        {
          path: 'users',
          name: 'admin-users',
          component: () => import('@/views/admin/UserManagementView.vue'),
          meta: { requiresAuth: true },
        },
        {
          path: 'inventory',
          name: 'admin-inventory',
          component: () => import('@/views/admin/InventoryView.vue'),
          meta: { requiresAuth: true },
        },
        {
          path: 'signin',
          name: 'admin-signin',
          component: () => import('@/views/admin/SigninView.vue'),
          meta: { guestOnly: true },
        },
        {
          path: 'signup',
          name: 'admin-signup',
          component: () => import('@/views/admin/SignupView.vue'),
          meta: { guestOnly: true },
        },
      ],
    },
  ],
})

// Navigation guard cho admin routes
router.beforeEach((to) => {
  const token = getAccessToken()
  const isAuthed = Boolean(token)

  if (to.matched.some((record) => record.meta?.requiresAuth) && !isAuthed) {
    return {
      name: 'admin-signin',
      query: { redirect: to.fullPath },
    }
  }

  if (to.matched.some((record) => record.meta?.guestOnly) && isAuthed) {
    return { name: 'admin' }
  }

  return true
})

export default router
