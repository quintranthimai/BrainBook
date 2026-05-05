import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { toast } from 'vue3-toastify'
import { apiPost, apiGet } from '@/lib/api'
import { clearAuth, getAccessToken, setAccessToken, setRefreshToken } from '@/services/api'

export const useAuthStore = defineStore('auth', () => {
  const token = ref(getAccessToken() || null)
  const user = ref(null)

  const isLoggedIn = computed(() => !!token.value)

  function setTokens(accessToken, refreshToken) {
    token.value = accessToken || null
    if (accessToken) {
      setAccessToken(accessToken)
    }
    if (refreshToken) {
      setRefreshToken(refreshToken)
    }
    if (!accessToken && !refreshToken) {
      clearAuth()
    }
  }

  function setUser(profile) {
    user.value = profile ? { ...profile } : null
  }

  async function login(email, password) {
    try {
      const data = await apiPost('/auth/login', { body: { email, password } })
      const accessToken = data.access_token || data.accessToken || data.token
      const refreshToken = data.refresh_token

      if (!accessToken) {
        throw new Error('Không nhận được token đăng nhập')
      }

      setTokens(accessToken, refreshToken)
      setUser(data.user)

      toast.success('Đăng nhập thành công!')
      return true
    } catch (err) {
      toast.error(err.message)
      return false
    }
  }

  async function register(payload) {
    try {
      const data = await apiPost('/auth/register', { body: payload })
      const accessToken = data.access_token || data.accessToken || data.token
      const refreshToken = data.refresh_token

      if (accessToken) {
        setTokens(accessToken, refreshToken)
        setUser(data.user)
        toast.success('Đăng ký thành công!')
        return true
      }
      return false
    } catch (err) {
      toast.error(err.message)
      return false
    }
  }

  async function fetchProfile() {
    if (!token.value) return
    try {
      const data = await apiGet('/auth/profile')
      setUser(data)
    } catch (err) {
      console.error(err)
      // If profile fails, it might be due to expired token
      // the api interceptor will try to refresh.
      // If it still fails, then we logout.
    }
  }

  function logout() {
    setTokens(null, null)
    user.value = null
    toast.info('Đã đăng xuất.')
    window.location.reload()
  }

  // Load profile on start
  if (token.value) {
    fetchProfile()
  }

  return { token, user, isLoggedIn, login, register, logout, fetchProfile, setTokens, setUser }
})
