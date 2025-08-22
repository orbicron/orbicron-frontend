'use client'
import { useState } from 'react'
import { motion } from 'framer-motion'
import { 
  PlusIcon, 
  UsersIcon,
  MagnifyingGlassIcon,
  Squares2X2Icon,
  ListBulletIcon,
  FunnelIcon,
  QrCodeIcon
} from '@heroicons/react/24/outline'
import { CreateGroupModal } from './CreateGroupModal'
import { JoinGroupModal } from './JoinGroupModal'

export const GroupHeader = () => {
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid')
  const [showFilters, setShowFilters] = useState(false)
  const [showCreateModal, setShowCreateModal] = useState(false)
  const [showJoinModal, setShowJoinModal] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')

  return (
    <>
      <div className="bg-white/5 backdrop-blur-md rounded-2xl border border-white/10 p-6">
        {/* Header Title and Stats */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between mb-6">
          <div>
            <h1 className="text-3xl font-bold text-white mb-2">Groups</h1>
            <div className="flex items-center gap-6 text-sm">
              <span className="text-purple-300">
                <span className="font-semibold">8</span> Active Groups
              </span>
              <span className="text-green-300">
                <span className="font-semibold">24</span> Total Members
              </span>
              <span className="text-blue-300">
                <span className="font-semibold">3,420.50 π</span> Total Expenses
              </span>
            </div>
          </div>

          {/* Quick Action Buttons */}
          <div className="flex items-center gap-3 mt-4 lg:mt-0">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setShowCreateModal(true)}
              className="flex items-center gap-2 bg-gradient-to-r from-purple-600 to-pink-600 text-white px-6 py-3 rounded-xl font-semibold hover:from-purple-700 hover:to-pink-700 transition-all duration-300"
            >
              <PlusIcon className="w-5 h-5" />
              Create Group
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setShowJoinModal(true)}
              className="flex items-center gap-2 bg-white/10 backdrop-blur-md text-white px-6 py-3 rounded-xl font-semibold border border-white/20 hover:bg-white/20 transition-all duration-300"
            >
              <QrCodeIcon className="w-5 h-5" />
              Join Group
            </motion.button>
          </div>
        </div>

        {/* Search and Controls */}
        <div className="flex flex-col lg:flex-row gap-4 lg:items-center justify-between">
          {/* Search Bar */}
          <div className="relative flex-1 max-w-md">
            <MagnifyingGlassIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search groups..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-3 bg-white/10 backdrop-blur-md border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            />
          </div>

          {/* Controls */}
          <div className="flex items-center gap-3">
            {/* View Mode Toggle */}
            <div className="flex items-center bg-white/10 backdrop-blur-md rounded-xl border border-white/20 p-1">
              <button
                onClick={() => setViewMode('grid')}
                className={`p-2 rounded-lg transition-all duration-200 ${
                  viewMode === 'grid'
                    ? 'bg-purple-500 text-white'
                    : 'text-gray-400 hover:text-white'
                }`}
              >
                <Squares2X2Icon className="w-5 h-5" />
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`p-2 rounded-lg transition-all duration-200 ${
                  viewMode === 'list'
                    ? 'bg-purple-500 text-white'
                    : 'text-gray-400 hover:text-white'
                }`}
              >
                <ListBulletIcon className="w-5 h-5" />
              </button>
            </div>

            {/* Filters Toggle */}
            <button
              onClick={() => setShowFilters(!showFilters)}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl transition-all duration-200 ${
                showFilters
                  ? 'bg-purple-500 text-white'
                  : 'bg-white/10 text-gray-300 hover:text-white hover:bg-white/20'
              }`}
            >
              <FunnelIcon className="w-5 h-5" />
              Filters
            </button>
          </div>
        </div>

        {/* Quick Stats Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
          <div className="bg-white/10 rounded-xl p-4 text-center">
            <div className="text-2xl font-bold text-purple-300">8</div>
            <div className="text-sm text-gray-400">Active Groups</div>
          </div>
          <div className="bg-white/10 rounded-xl p-4 text-center">
            <div className="text-2xl font-bold text-green-300">24</div>
            <div className="text-sm text-gray-400">Total Members</div>
          </div>
          <div className="bg-white/10 rounded-xl p-4 text-center">
            <div className="text-2xl font-bold text-blue-300">156</div>
            <div className="text-sm text-gray-400">Total Expenses</div>
          </div>
          <div className="bg-white/10 rounded-xl p-4 text-center">
            <div className="text-2xl font-bold text-yellow-300">12</div>
            <div className="text-sm text-gray-400">Pending Settlements</div>
          </div>
        </div>
      </div>

      {/* Modals */}
      <CreateGroupModal 
        isOpen={showCreateModal} 
        onClose={() => setShowCreateModal(false)} 
      />
      <JoinGroupModal 
        isOpen={showJoinModal} 
        onClose={() => setShowJoinModal(false)} 
      />
    </>
  )
}
