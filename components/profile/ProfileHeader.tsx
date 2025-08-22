'use client'
import { useState } from 'react'
import { motion } from 'framer-motion'
import { useAuthStore } from '@/store/authStore'
import { 
  UserIcon, 
  Cog6ToothIcon,
  BellIcon,
  PaintBrushIcon,
  ShieldCheckIcon
} from '@heroicons/react/24/outline'

export const ProfileHeader = () => {
  const { user } = useAuthStore()
  const [activeTab, setActiveTab] = useState<'overview' | 'settings' | 'notifications' | 'preferences'>('overview')

  return (
    <div className="bg-white/5 backdrop-blur-md rounded-2xl border border-white/10">
      {/* Profile Overview */}
      <div className="p-6 border-b border-white/10">
        <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
          {/* Avatar and Basic Info */}
          <div className="flex items-center gap-4">
            <div className="relative">
              <div className="w-20 h-20 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
                <UserIcon className="w-10 h-10 text-white" />
              </div>
              {/* Pi Network Status Indicator */}
              <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-green-500 rounded-full border-2 border-white flex items-center justify-center">
                <span className="text-white text-xs font-bold">π</span>
              </div>
            </div>
            
            <div>
              <h1 className="text-2xl font-bold text-white mb-1">{user?.username}</h1>
              <div className="flex items-center gap-2 mb-2">
                <ShieldCheckIcon className="w-4 h-4 text-green-400" />
                <span className="text-green-300 text-sm font-medium">Pi Network Connected</span>
              </div>
              <div className="text-gray-400 text-sm">
                User ID: {user?.uid?.slice(0, 8)}...
              </div>
            </div>
          </div>

          {/* Stats */}
          <div className="flex-1 grid grid-cols-3 gap-6 md:ml-8">
            <div className="text-center">
              <div className="text-2xl font-bold text-purple-300">156</div>
              <div className="text-sm text-gray-400">Transactions</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-green-300">2,456 π</div>
              <div className="text-sm text-gray-400">Total Settled</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-300">8</div>
              <div className="text-sm text-gray-400">Active Groups</div>
            </div>
          </div>
        </div>
      </div>

      {/* Tab Navigation */}
      <div className="px-6 py-4">
        <div className="flex flex-wrap gap-2">
          {[
            { id: 'overview', label: 'Overview', icon: UserIcon },
            { id: 'settings', label: 'Account Settings', icon: Cog6ToothIcon },
            { id: 'notifications', label: 'Notifications', icon: BellIcon },
            { id: 'preferences', label: 'App Preferences', icon: PaintBrushIcon },
          ].map((tab) => {
            const Icon = tab.icon
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`flex items-center gap-2 px-4 py-2 rounded-xl font-medium transition-all duration-200 ${
                  activeTab === tab.id
                    ? 'bg-purple-500 text-white'
                    : 'text-gray-300 hover:text-white hover:bg-white/10'
                }`}
              >
                <Icon className="w-5 h-5" />
                {tab.label}
              </button>
            )
          })}
        </div>
      </div>
    </div>
  )
}
