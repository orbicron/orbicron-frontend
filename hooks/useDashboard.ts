// hooks/useDashboard.ts
import { useState, useEffect } from 'react'
import { useApiClient } from './useApiClient'

interface DashboardData {
    financialSummary: {
        totalOwed: number
        totalOwing: number
        netBalance: number
        piBalance: number
        owedChange: number
        owingChange: number
    }
    recentExpenses: any[]
    recentActivity: any[]
    user: any
}

export const useDashboard = () => {
    const [data, setData] = useState<DashboardData | null>(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)
    const { apiCall } = useApiClient()

    const fetchDashboardData = async () => {
        try {
            setLoading(true)
            setError(null)

            const response = await apiCall('/api/dashboard')

            if (response.ok) {
                const result = await response.json()
                setData(result.data)
            } else {
                throw new Error('Failed to fetch dashboard data')
            }
        } catch (err: any) {
            setError(err.message)
            console.error('Dashboard fetch error:', err)
        } finally {
            setLoading(false)
        }
    }

    // Refresh data every 5 minutes
    useEffect(() => {
        fetchDashboardData()

        const interval = setInterval(fetchDashboardData, 5 * 60 * 1000)
        return () => clearInterval(interval)
    }, [])

    return {
        data,
        loading,
        error,
        refresh: fetchDashboardData
    }
}
