'use client'
import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { OverviewCards } from '@/components/dashboard/OverviewCards'
import { QuickActions } from '@/components/dashboard/QuickActions'
import { SpendingInsights } from '@/components/dashboard/SpendingInsights'
import { RecentActivity } from '@/components/dashboard/RecentActivity'
import { useAuthStore } from '@/store/authStore'
import { useApiClient } from '@/hooks/useApiClient'

interface DashboardData {
  user: {
    id: string
    displayId: string
    avatar: string
    preferences: any
  }
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
  piBalance: {
    available: number
    locked: number
    total: number
  }
}

export default function DashboardPage() {
  const { user, isAuthenticated } = useAuthStore()
  const { apiCall } = useApiClient()
  const [data, setData] = useState<DashboardData | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [lastRefresh, setLastRefresh] = useState<Date>(new Date())
  // Fetch dashboard data
  const fetchDashboardData = async () => {
    if (!isAuthenticated) return

    try {
      setError(null)
      const response = await apiCall('/api/dashboard')
      
      if (response.ok) {
        const result = await response.json()
        setData(result.data)
        setLastRefresh(new Date())
      } else {
        throw new Error(`Failed to fetch dashboard data: ${response.status}`)
      }
    } catch (err: any) {
      console.error('Dashboard fetch error:', err)
      setError(err.message || 'Failed to load dashboard data')
    } finally {
      setLoading(false)
    }
  }

  // Manual refresh function
  const handleRefresh = async () => {
    setLoading(true)
    await fetchDashboardData()
  }

  // Initial data fetch
  useEffect(() => {
    if (isAuthenticated && user) {
      fetchDashboardData()
    }
  }, [isAuthenticated, user])

  // Auto-refresh every 5 minutes
  useEffect(() => {
    if (!isAuthenticated) return

    const interval = setInterval(() => {
      fetchDashboardData()
    }, 5 * 60 * 1000) // 5 minutes

    return () => clearInterval(interval)
  }, [isAuthenticated])

  // Loading state
  if (loading && !data) {
    return (
      <div className="space-y-8">
        {/* Loading Header */}
        <div className="mb-8">
          <div className="h-8 bg-white/10 rounded-lg w-64 mb-2 animate-pulse"></div>
          <div className="h-4 bg-white/10 rounded-lg w-96 animate-pulse"></div>
        </div>

        {/* Loading Overview Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[...Array(4)].map((_, index) => (
            <div
              key={index}
              className="bg-white/5 backdrop-blur-md rounded-2xl border border-white/10 p-6 animate-pulse"
            >
              <div className="w-12 h-12 bg-white/10 rounded-xl mb-4"></div>
              <div className="h-4 bg-white/10 rounded mb-2 w-3/4"></div>
              <div className="h-8 bg-white/10 rounded mb-2"></div>
              <div className="h-3 bg-white/10 rounded w-1/2"></div>
            </div>
          ))}
        </div>

        {/* Loading Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <div className="bg-white/5 backdrop-blur-md rounded-2xl border border-white/10 p-6 h-96 animate-pulse"></div>
          </div>
          <div className="lg:col-span-1">
            <div className="bg-white/5 backdrop-blur-md rounded-2xl border border-white/10 p-6 h-96 animate-pulse"></div>
          </div>
        </div>
      </div>
    )
  }

  // Error state
  if (error && !data) {
    return (
      <div className="flex items-center justify-center py-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center"
        >
          <div className="w-16 h-16 bg-red-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
            <span className="text-2xl">⚠️</span>
          </div>
          <h3 className="text-xl font-bold text-white mb-2">Failed to Load Dashboard</h3>
          <p className="text-gray-400 mb-6 max-w-md">{error}</p>
          <div className="flex gap-4 justify-center">
            <button 
              onClick={handleRefresh}
              disabled={loading}
              className="bg-purple-600 text-white px-6 py-3 rounded-xl font-semibold hover:bg-purple-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? 'Retrying...' : 'Try Again'}
            </button>
            <button 
              onClick={() => window.location.reload()}
              className="bg-white/10 text-white px-6 py-3 rounded-xl font-semibold hover:bg-white/20 transition-colors"
            >
              Reload Page
            </button>
          </div>
        </motion.div>
      </div>
    )
  }

  // Main dashboard content
  return (
    <div className="space-y-8">
      {/* Welcome Header with User Info */}
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <div className="flex flex-col sm:flex-row sm:items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-white mb-2">
              Welcome back{data?.user?.displayId ? `, ${data.user.displayId}` : ''}! 👋
            </h1>
            <p className="text-purple-300">
              Here's what's happening with your expenses today.
            </p>
          </div>
          
          {/* Refresh & Last Updated */}
          <div className="flex items-center gap-4 mt-4 sm:mt-0">
            <div className="text-sm text-gray-400">
              Last updated: {lastRefresh.toLocaleTimeString()}
            </div>
            <button
              onClick={handleRefresh}
              disabled={loading}
              className="p-2 text-gray-400 hover:text-white rounded-lg hover:bg-white/10 transition-colors disabled:opacity-50"
              title="Refresh dashboard data"
            >
              <div className={`w-5 h-5 ${loading ? 'animate-spin' : ''}`}>
                🔄
              </div>
            </button>
          </div>
        </div>
      </motion.div>

      {/* Overview Cards with Real Data */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
      >
        <OverviewCards 
          data={data?.financialSummary} 
          loading={loading}
          
        />
      </motion.div>

      {/* Quick Actions */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        <QuickActions />
      </motion.div>

      {/* Main Content Grid */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="grid grid-cols-1 lg:grid-cols-3 gap-8"
      >
        {/* Spending Insights - Takes 2 columns */}
        <div className="lg:col-span-2">
          <SpendingInsights 
         
          />
        </div>
        
        {/* Recent Activity - Takes 1 column */}
        <div className="lg:col-span-1">
          <RecentActivity 
          />
        </div>
      </motion.div>

      {/* Connection Status Footer */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
        className="flex items-center justify-center py-4"
      >
        <div className="flex items-center gap-2 text-xs text-gray-500">
          <div className={`w-2 h-2 rounded-full ${
            error ? 'bg-red-400' : 'bg-green-400 animate-pulse'
          }`}></div>
          <span>
            {error ? 'Connection issues detected' : 'All systems operational'}
          </span>
          {data?.piBalance && (
            <>
              <span>•</span>
              <span>Pi Network connected</span>
            </>
          )}
        </div>
      </motion.div>
    </div>
  )
}
