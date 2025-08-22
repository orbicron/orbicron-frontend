'use client'
import { usePiSDK } from '@/hooks/usePiSDK'
import { useAuthStore } from '@/store/authStore'
import { useState } from 'react'
import { motion } from 'framer-motion'
import { ArrowRightIcon } from '@heroicons/react/24/outline'
import { useRouter } from 'next/navigation'

export const PiAuth = () => {
  const router = useRouter();
  const { piSDK, isInitialized, authenticate } = usePiSDK()
  const { user, setUser, isAuthenticated, logout } = useAuthStore()
  const [isLoading, setIsLoading] = useState(false)

  const handleLogin = async () => {
    setIsLoading(true)
    try {
      const authResult = await authenticate()
      if (authResult) {
        setUser(authResult.user)
      }
    } catch (error) {
      console.error('Authentication error:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleLogout = () => {
    logout()
    localStorage.removeItem('pi_user')
    localStorage.removeItem('pi_access_token')
  }

  if (!isInitialized) {
    return (
      <div className="flex items-center justify-center py-8">
        <motion.div
          className="flex items-center gap-3 bg-white/10 backdrop-blur-md px-6 py-4 rounded-2xl border border-white/20"
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <div className="w-6 h-6 border-2 border-purple-400 border-t-transparent rounded-full animate-spin"></div>
          <span className="text-white font-medium">Connecting to Pi Network...</span>
        </motion.div>
      </div>
    )
  }

  if (isAuthenticated && user) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="text-center space-y-6"
      >
        <div className="bg-gradient-to-r from-green-500/20 to-emerald-500/20 backdrop-blur-md p-6 rounded-3xl border border-green-300/30">
          <div className="text-4xl mb-4">✅</div>
          <p className="text-green-300 font-semibold text-lg mb-2">Connected to Pi Network</p>
          <p className="text-white text-xl font-bold">Welcome, {user.username}!</p>
          <p className="text-green-200 text-sm mt-2">User ID: {user.uid}</p>
        </div>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-8 py-4 rounded-2xl font-semibold hover:from-purple-700 hover:to-pink-700 transition-all duration-300 hover:scale-105 hover:shadow-2xl" onClick={()=>{router.push('/dashboard')}}>
            Go to Dashboard
          </button>
          <button 
            onClick={handleLogout}
            className="bg-white/10 backdrop-blur-md text-white px-8 py-4 rounded-2xl font-semibold border border-white/20 hover:bg-white/20 transition-all duration-300"
          >
            Disconnect
          </button>
        </div>
      </motion.div>
    )
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-6"
    >
      <motion.button 
        onClick={handleLogin}
        disabled={isLoading}
        className="group relative bg-gradient-to-r from-purple-600 to-pink-600 text-white px-12 py-6 rounded-2xl font-bold text-xl hover:from-purple-700 hover:to-pink-700 transition-all duration-300 hover:scale-105 hover:shadow-2xl disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
        whileTap={{ scale: 0.95 }}
      >
        {isLoading ? (
          <div className="flex items-center justify-center gap-3">
            <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
            <span>Connecting...</span>
          </div>
        ) : (
          <div className="flex items-center justify-center gap-3">
            <span>Connect with Pi Network</span>
            <ArrowRightIcon className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
          </div>
        )}
      </motion.button>
      
      <div className="flex flex-col sm:flex-row items-center justify-center gap-4 text-sm">
        <div className="flex items-center gap-2 text-purple-300">
          <span>🔒</span>
          <span>Secure Pi Network Authentication</span>
        </div>
        <span className="hidden sm:block text-gray-400">•</span>
        <div className="flex items-center gap-2 text-purple-300">
          <span>⚡</span>
          <span>No signup required</span>
        </div>
      </div>
    </motion.div>
  )
}
