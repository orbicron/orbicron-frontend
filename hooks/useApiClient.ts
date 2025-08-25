// hooks/useApiClient.ts
import { useAuthStore } from '@/store/authStore'

export const useApiClient = () => {
    const { logout } = useAuthStore()

    const apiCall = async (url: string, options: RequestInit = {}) => {
        const accessToken = localStorage.getItem('pi_access_token')

        if (!accessToken) {
            logout()
            throw new Error('No access token available')
        }

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
            window.location.href = '/'
            throw new Error('Session expired')
        }

        return response
    }

    return { apiCall }
}
