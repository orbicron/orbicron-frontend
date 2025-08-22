'use client'
import { useState, useRef, useEffect } from 'react'
import { useAuthStore } from '@/store/authStore'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  UserIcon, 
  Cog6ToothIcon, 
  ArrowRightOnRectangleIcon,
  BellIcon,
  ChevronDownIcon 
} from '@heroicons/react/24/outline'

export const DashboardHeader = () => {
  const { user, logout } = useAuthStore()
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false)
  const menuRef = useRef<HTMLDivElement>(null)

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsUserMenuOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const handleLogout = () => {
    logout()
    localStorage.removeItem('pi_user')
    localStorage.removeItem('pi_access_token')
    window.location.href = '/'
  }

  return (
    <header className="sticky top-0 z-50 bg-white/5 backdrop-blur-md border-b border-white/10">
      <div className="flex items-center justify-between px-6 py-4">
        {/* App Logo and Name */}
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl flex items-center justify-center">
            <span className="text-white font-bold text-lg">O</span>
          </div>
          <div>
            <h1 className="text-2xl font-bold text-white">Orbicron</h1>
            <p className="text-purple-300 text-xs">Expense Splitter</p>
          </div>
        </div>

        {/* Right side - Notifications and User Menu */}
        <div className="flex items-center gap-4">
          {/* Notifications */}
          <button className="relative p-2 text-gray-300 hover:text-white transition-colors rounded-lg hover:bg-white/10">
            <BellIcon className="w-6 h-6" />
            <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full flex items-center justify-center">
              <span className="text-white text-xs font-bold">3</span>
            </span>
          </button>

          {/* User Menu */}
          <div className="relative" ref={menuRef}>
            <button
              onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
              className="flex items-center gap-3 p-2 pr-4 text-white hover:bg-white/10 rounded-xl transition-all duration-200 group"
            >
              {/* User Avatar */}
              <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
                <UserIcon className="w-6 h-6 text-white" />
              </div>
              
              {/* User Info */}
              <div className="text-left hidden sm:block">
                <p className="font-semibold text-sm">{user?.username}</p>
                <p className="text-purple-300 text-xs">π Connected</p>
              </div>
              
              {/* Dropdown Icon */}
              <ChevronDownIcon 
                className={`w-4 h-4 text-gray-400 transition-transform duration-200 ${
                  isUserMenuOpen ? 'rotate-180' : ''
                }`} 
              />
            </button>

            {/* User Dropdown Menu */}
            <AnimatePresence>
              {isUserMenuOpen && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95, y: -10 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95, y: -10 }}
                  transition={{ duration: 0.2 }}
                  className="absolute right-0 mt-2 w-72 bg-white/10 backdrop-blur-md rounded-2xl border border-white/20 shadow-2xl overflow-hidden"
                >
                  {/* User Info Header */}
                  <div className="p-4 border-b border-white/10">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
                        <UserIcon className="w-7 h-7 text-white" />
                      </div>
                      <div>
                        <p className="font-semibold text-white text-lg">{user?.username}</p>
                        <p className="text-purple-300 text-sm">User ID: {user?.uid}</p>
                      </div>
                    </div>
                    
                    {/* Pi Network Status */}
                    <div className="flex items-center gap-2 px-3 py-2 bg-green-500/20 rounded-lg border border-green-300/30">
                      <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                      <span className="text-green-300 text-sm font-medium">Pi Network Connected</span>
                    </div>
                  </div>

                  {/* Menu Items */}
                  <div className="p-2">
                    <button
                      onClick={() => setIsUserMenuOpen(false)}
                      className="w-full flex items-center gap-3 px-4 py-3 text-gray-300 hover:text-white hover:bg-white/10 rounded-xl transition-all duration-200 group"
                    >
                      <Cog6ToothIcon className="w-5 h-5 group-hover:text-purple-300" />
                      <span>Account Settings</span>
                    </button>

                    <button
                      onClick={() => setIsUserMenuOpen(false)}
                      className="w-full flex items-center gap-3 px-4 py-3 text-gray-300 hover:text-white hover:bg-white/10 rounded-xl transition-all duration-200 group"
                    >
                      <UserIcon className="w-5 h-5 group-hover:text-blue-300" />
                      <span>Profile Settings</span>
                    </button>

                    {/* Divider */}
                    <div className="my-2 border-t border-white/10"></div>

                    {/* Logout Button */}
                    <button
                      onClick={handleLogout}
                      className="w-full flex items-center gap-3 px-4 py-3 text-red-300 hover:text-red-200 hover:bg-red-500/20 rounded-xl transition-all duration-200 group"
                    >
                      <ArrowRightOnRectangleIcon className="w-5 h-5 group-hover:scale-110 transition-transform" />
                      <span className="font-medium">Disconnect Pi Network</span>
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </header>
  )
}
