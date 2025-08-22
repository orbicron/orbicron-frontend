'use client'
import { motion } from 'framer-motion'
import { useState } from 'react'
import Link from 'next/link'
import { 
  EllipsisVerticalIcon, 
  UserGroupIcon, 
  CurrencyDollarIcon,
  ExclamationTriangleIcon,
  CalendarIcon
} from '@heroicons/react/24/outline'
import { formatDate, formatPiAmount } from '@/lib/utils'

interface Group {
  id: string
  name: string
  description: string
  memberCount: number
  totalExpenses: number
  pendingSettlements: number
  lastActivity: Date
  coverImage: string
  isAdmin: boolean
  members: Array<{
    id: string
    username: string
    avatar: string
  }>
}

interface GroupCardProps {
  group: Group
}

export const GroupCard = ({ group }: GroupCardProps) => {
  const [showMenu, setShowMenu] = useState(false)

  return (
    <motion.div
      whileHover={{ y: -5 }}
      className="group relative bg-white/5 backdrop-blur-md rounded-2xl border border-white/10 p-6 hover:border-white/20 transition-all duration-300 overflow-hidden"
    >
      {/* Background gradient effect */}
      <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 to-pink-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
      
      {/* Header */}
      <div className="relative z-10 flex items-start justify-between mb-4">
        <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center text-3xl shadow-lg">
          {group.coverImage}
        </div>
        
        <div className="flex items-center gap-2">
          {group.isAdmin && (
            <div className="p-1.5 bg-yellow-500/20 rounded-lg">
              <UserGroupIcon className="w-4 h-4 text-yellow-400" />
              {/* CrownIcon */}
            </div>
          )}
          
          <div className="relative">
            <button
              onClick={() => setShowMenu(!showMenu)}
              className="p-2 text-gray-400 hover:text-white rounded-lg hover:bg-white/10 transition-colors"
            >
              <EllipsisVerticalIcon className="w-5 h-5" />
            </button>
            
            {showMenu && (
              <div className="absolute right-0 top-10 w-48 bg-white/10 backdrop-blur-md rounded-xl border border-white/20 shadow-xl z-20">
                <Link href={`/dashboard/groups/${group.id}`} className="block w-full px-4 py-2 text-left text-white hover:bg-white/10 transition-colors first:rounded-t-xl">
                  View Details
                </Link>
                <Link href={`/dashboard/groups/${group.id}/analytics`} className="block w-full px-4 py-2 text-left text-white hover:bg-white/10 transition-colors">
                  View Analytics
                </Link>
                {group.isAdmin && (
                  <>
                    <button className="w-full px-4 py-2 text-left text-white hover:bg-white/10 transition-colors">
                      Group Settings
                    </button>
                    <button className="w-full px-4 py-2 text-left text-red-300 hover:bg-red-500/20 transition-colors last:rounded-b-xl">
                      Delete Group
                    </button>
                  </>
                )}
                {!group.isAdmin && (
                  <button className="w-full px-4 py-2 text-left text-red-300 hover:bg-red-500/20 transition-colors last:rounded-b-xl">
                    Leave Group
                  </button>
                )}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="relative z-10">
        <h3 className="text-xl font-bold text-white mb-2 line-clamp-1">
          {group.name}
        </h3>
        
        <p className="text-gray-300 text-sm mb-4 line-clamp-2">
          {group.description}
        </p>

        {/* Members Preview */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <div className="flex -space-x-2">
              {group.members.slice(0, 3).map((member, index) => (
                <div
                  key={member.id}
                  className="w-8 h-8 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center text-sm border-2 border-white/20"
                  style={{ zIndex: 10 - index }}
                >
                  {member.avatar}
                </div>
              ))}
              {group.memberCount > 3 && (
                <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center text-xs text-white border-2 border-white/20">
                  +{group.memberCount - 3}
                </div>
              )}
            </div>
            <span className="text-gray-400 text-sm">{group.memberCount} members</span>
          </div>
        </div>

        {/* Stats */}
        <div className="space-y-3 mb-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-gray-300">
              <CurrencyDollarIcon className="w-4 h-4" />
              <span className="text-sm">Total Expenses</span>
            </div>
            <span className="text-white font-semibold">
              {formatPiAmount(group.totalExpenses)}
            </span>
          </div>

          {group.pendingSettlements > 0 && (
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-yellow-400">
                <ExclamationTriangleIcon className="w-4 h-4" />
                <span className="text-sm">Pending Settlements</span>
              </div>
              <span className="text-yellow-400 font-semibold">
                {group.pendingSettlements}
              </span>
            </div>
          )}

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-gray-300">
              <CalendarIcon className="w-4 h-4" />
              <span className="text-sm">Last Activity</span>
            </div>
            <span className="text-gray-400 text-sm">
              {formatDate(group.lastActivity)}
            </span>
          </div>
        </div>

        {/* Action Button */}
        <Link
          href={`/dashboard/groups/${group.id}`}
          className="w-full bg-gradient-to-r from-purple-600/20 to-pink-600/20 hover:from-purple-600/30 hover:to-pink-600/30 text-white py-3 rounded-xl font-semibold text-center border border-purple-300/20 hover:border-purple-300/40 transition-all duration-300 block"
        >
          View Group Details
        </Link>
      </div>
    </motion.div>
  )
}
