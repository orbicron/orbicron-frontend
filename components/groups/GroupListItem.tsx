'use client'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { 
  EllipsisHorizontalIcon,
  UserGroupIcon,
  CurrencyDollarIcon,
  ExclamationTriangleIcon,
  CakeIcon
} from '@heroicons/react/24/outline'
// want a crownIcon but used cakeIcon and usersgroupIcon
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

interface GroupListItemProps {
  group: Group
}

export const GroupListItem = ({ group }: GroupListItemProps) => {
  return (
    <motion.div
      whileHover={{ backgroundColor: 'rgba(255, 255, 255, 0.05)' }}
      className="flex items-center gap-6 p-6 hover:bg-white/5 transition-colors"
    >
      {/* Group Avatar */}
      <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center text-2xl flex-shrink-0 shadow-lg">
        {group.coverImage}
      </div>

      {/* Main Content */}
      <div className="flex-1 min-w-0">
        <div className="flex items-start justify-between mb-2">
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-1">
              <h3 className="text-lg font-semibold text-white truncate">
                {group.name}
              </h3>
              {group.isAdmin && (
                <CakeIcon className="w-4 h-4 text-yellow-400 flex-shrink-0" />
              )}
            </div>
            <p className="text-gray-400 text-sm truncate mb-2">
              {group.description}
            </p>
          </div>
        </div>

        {/* Stats Row */}
        <div className="flex items-center gap-6 text-sm">
          <div className="flex items-center gap-1 text-gray-300">
            <UserGroupIcon className="w-4 h-4" />
            <span>{group.memberCount} members</span>
          </div>
          
          <div className="flex items-center gap-1 text-gray-300">
            <CurrencyDollarIcon className="w-4 h-4" />
            <span>{formatPiAmount(group.totalExpenses)}</span>
          </div>
          
          {group.pendingSettlements > 0 && (
            <div className="flex items-center gap-1 text-yellow-400">
              <ExclamationTriangleIcon className="w-4 h-4" />
              <span>{group.pendingSettlements} pending</span>
            </div>
          )}
          
          <div className="text-gray-400">
            Last activity: {formatDate(group.lastActivity)}
          </div>
        </div>

        {/* Members Preview */}
        <div className="flex items-center gap-2 mt-3">
          <div className="flex -space-x-2">
            {group.members.slice(0, 4).map((member, index) => (
              <div
                key={member.id}
                className="w-6 h-6 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center text-xs border border-white/20"
                style={{ zIndex: 10 - index }}
                title={member.username}
              >
                {member.avatar}
              </div>
            ))}
            {group.memberCount > 4 && (
              <div className="w-6 h-6 bg-white/20 rounded-full flex items-center justify-center text-xs text-white border border-white/20">
                +{group.memberCount - 4}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Actions */}
      <div className="flex items-center gap-3 flex-shrink-0">
        <Link
          href={`/dashboard/groups/${group.id}`}
          className="px-4 py-2 bg-purple-600/20 text-purple-300 rounded-lg hover:bg-purple-600/30 transition-colors font-medium"
        >
          View Details
        </Link>
        
        <button className="p-2 text-gray-400 hover:text-white rounded-lg hover:bg-white/10 transition-colors">
          <EllipsisHorizontalIcon className="w-5 h-5" />
        </button>
      </div>
    </motion.div>
  )
}
