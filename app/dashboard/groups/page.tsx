'use client'
import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { GroupCard } from '@/components/groups/GroupCard'
import { GroupListItem } from '@/components/groups/GroupListItem'
import { useGroupStore } from '@/store/GroupStore'
import { UsersIcon } from '@heroicons/react/24/outline'

// Mock data for demonstration
const mockGroups = [
  {
    id: '1',
    name: 'Weekend Trip to Goa',
    description: 'Beach vacation with college friends',
    memberCount: 6,
    totalExpenses: 2450.75,
    pendingSettlements: 3,
    lastActivity: new Date(),
    coverImage: '🏖️',
    isAdmin: true,
    members: [
      { id: '1', username: 'Alice', avatar: '👩‍💼' },
      { id: '2', username: 'Bob', avatar: '👨‍💻' },
      { id: '3', username: 'Charlie', avatar: '👨‍🎓' },
    ]
  },
  {
    id: '2',
    name: 'Roommates Expenses',
    description: 'Monthly shared expenses for apartment',
    memberCount: 4,
    totalExpenses: 1200.50,
    pendingSettlements: 2,
    lastActivity: new Date(),
    coverImage: '🏠',
    isAdmin: false,
    members: [
      { id: '4', username: 'David', avatar: '👨‍💼' },
      { id: '5', username: 'Emma', avatar: '👩‍💻' },
    ]
  },
  {
    id: '3',
    name: 'Team Lunch',
    description: 'Weekly team lunches and celebrations',
    memberCount: 8,
    totalExpenses: 850.25,
    pendingSettlements: 1,
    lastActivity: new Date(),
    coverImage: '🍽️',
    isAdmin: true,
    members: [
      { id: '6', username: 'Frank', avatar: '👨‍🔬' },
      { id: '7', username: 'Grace', avatar: '👩‍🎨' },
    ]
  },
]

export default function GroupsPage() {
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid')
  const [groups, setGroups] = useState(mockGroups)

  if (groups.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-16 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="w-24 h-24 bg-white/10 rounded-full flex items-center justify-center mb-6"
        >
          <UsersIcon className="w-12 h-12 text-purple-400" />
        </motion.div>
        <h3 className="text-2xl font-bold text-white mb-2">No groups yet</h3>
        <p className="text-gray-400 mb-6 max-w-md">
          Create your first group or join an existing one to start splitting expenses with friends.
        </p>
        <div className="flex gap-4">
          <button className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-6 py-3 rounded-xl font-semibold hover:from-purple-700 hover:to-pink-700 transition-all duration-300">
            Create First Group
          </button>
          <button className="bg-white/10 backdrop-blur-md text-white px-6 py-3 rounded-xl font-semibold border border-white/20 hover:bg-white/20 transition-all duration-300">
            Join Existing Group
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {viewMode === 'grid' ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {groups.map((group, index) => (
            <motion.div
              key={group.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
            >
              <GroupCard group={group} />
            </motion.div>
          ))}
        </div>
      ) : (
        <div className="bg-white/5 backdrop-blur-md rounded-2xl border border-white/10 overflow-hidden">
          <div className="divide-y divide-white/10">
            {groups.map((group, index) => (
              <motion.div
                key={group.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
              >
                <GroupListItem group={group} />
              </motion.div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
