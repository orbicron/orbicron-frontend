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
  console.log("this is the user i dont",user)
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
    <>
      {/* Fixed Header */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-white/5 backdrop-blur-md border-b border-white/10">
        <div className="flex items-center justify-between px-6 py-4 h-16">
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
            </div>
          </div>
        </div>
      </header>

      {/* User Dropdown Menu - Positioned below header and above sidebar */}
      <AnimatePresence>
        {isUserMenuOpen && (
          <>
            {/* Backdrop */}
            <div 
              className="fixed inset-0 z-40 bg-black/20 backdrop-blur-sm"
              onClick={() => setIsUserMenuOpen(false)}
            />
            
            {/* Modal positioned below header */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: -10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: -10 }}
              transition={{ duration: 0.2 }}
              className="fixed top-20 right-6 z-50 w-80 bg-white/10 backdrop-blur-md rounded-2xl border border-white/20 shadow-2xl overflow-hidden"
            >
              {/* User Info Header */}
              <div className="p-6 border-b border-white/10">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
                    <UserIcon className="w-8 h-8 text-white" />
                  </div>
                  <div>
                    <p className="font-bold text-white text-xl">{user?.username}</p>
                    <p className="text-purple-300 text-sm">User ID: {user?.uid?.slice(0, 8)}...</p>
                  </div>
                </div>
                
                {/* Pi Network Status */}
                <div className="flex items-center gap-3 px-4 py-3 bg-green-500/20 rounded-xl border border-green-300/30">
                  <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
                  <span className="text-green-300 font-medium">Pi Network Connected</span>
                  <div className="ml-auto text-green-400 text-xl">π</div>
                </div>
              </div>

              {/* Menu Items */}
              <div className="p-3">
                <button
                  onClick={() => {
                    setIsUserMenuOpen(false)
                    // Add navigation logic here
                  }}
                  className="w-full flex items-center gap-4 px-4 py-4 text-gray-300 hover:text-white hover:bg-white/10 rounded-xl transition-all duration-200 group"
                >
                  <div className="w-10 h-10 bg-white/10 rounded-lg flex items-center justify-center group-hover:bg-purple-500/20">
                    <UserIcon className="w-5 h-5 group-hover:text-purple-300" />
                  </div>
                  <div className="text-left">
                    <p className="font-medium">Profile Settings</p>
                    <p className="text-xs text-gray-400">Manage your account</p>
                  </div>
                </button>

                <button
                  onClick={() => {
                    setIsUserMenuOpen(false)
                    // Add navigation logic here
                  }}
                  className="w-full flex items-center gap-4 px-4 py-4 text-gray-300 hover:text-white hover:bg-white/10 rounded-xl transition-all duration-200 group"
                >
                  <div className="w-10 h-10 bg-white/10 rounded-lg flex items-center justify-center group-hover:bg-blue-500/20">
                    <Cog6ToothIcon className="w-5 h-5 group-hover:text-blue-300" />
                  </div>
                  <div className="text-left">
                    <p className="font-medium">App Settings</p>
                    <p className="text-xs text-gray-400">Preferences & notifications</p>
                  </div>
                </button>

                {/* Divider */}
                <div className="my-3 border-t border-white/10"></div>

                {/* Logout Button */}
                <button
                  onClick={handleLogout}
                  className="w-full flex items-center gap-4 px-4 py-4 text-red-300 hover:text-red-200 hover:bg-red-500/20 rounded-xl transition-all duration-200 group"
                >
                  <div className="w-10 h-10 bg-red-500/20 rounded-lg flex items-center justify-center group-hover:bg-red-500/30">
                    <ArrowRightOnRectangleIcon className="w-5 h-5 group-hover:scale-110 transition-transform" />
                  </div>
                  <div className="text-left">
                    <p className="font-medium">Disconnect Pi Network</p>
                    <p className="text-xs text-red-400">Sign out of Orbicron</p>
                  </div>
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  )
}
