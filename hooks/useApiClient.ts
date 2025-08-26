// hooks/useApiClient.ts - Updated for better error handling
import { useAuthStore } from '@/store/authStore'
import { useRouter } from 'next/navigation'

export const useApiClient = () => {
  const { logout } = useAuthStore()
  const router = useRouter()

  const apiCall = async (url: string, options: RequestInit = {}) => {
    const accessToken = localStorage.getItem('pi_access_token')

    if (!accessToken) {
      logout()
      router.push('/')
      throw new Error('No access token available')
    }

    try {
      const response = await fetch(url, {
        ...options,
        headers: {
          ...options.headers,
          'Authorization': `Bearer ${accessToken}`,
          'Content-Type': 'application/json'
        }
      })

      // Handle token expiry
      if (response.status === 401) {
        logout()
        localStorage.removeItem('pi_access_token')
        localStorage.removeItem('pi_user')
        router.push('/')
        throw new Error('Session expired. Please reconnect with Pi Network.')
      }

      return response
    } catch (error) {
      console.error('API call error:', error)
      throw error
    }
  }

  return { apiCall }
}
