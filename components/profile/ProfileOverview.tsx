'use client'
import { motion } from 'framer-motion'
import { useAuthStore } from '@/store/authStore'
import { 
  ShieldCheckIcon, 
  CurrencyDollarIcon, 
  UserGroupIcon,
  ChartBarIcon,
  CalendarIcon,
  TrophyIcon
} from '@heroicons/react/24/outline'

export const ProfileOverview = () => {
  const { user } = useAuthStore()

  const profileData = {
    joinedDate: '2024-01-15',
    totalTransactions: 156,
    totalSettled: 2456.80,
    activeGroups: 8,
    achievements: 12,
    currentStreak: 18,
    level: 8,
    nextLevelProgress: 65
  }

  const recentActivity = [
    { type: 'payment', description: 'Paid Sarah Chen 45.60 π', time: '2 hours ago', color: 'green' },
    { type: 'expense', description: 'Added "Dinner at Pizza Palace"', time: '5 hours ago', color: 'blue' },
    { type: 'group', description: 'Joined "Weekend Trip" group', time: '1 day ago', color: 'purple' },
    { type: 'achievement', description: 'Earned "Budget Master" achievement', time: '3 days ago', color: 'yellow' },
  ]

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      {/* Main Profile Info */}
      <div className="lg:col-span-2 space-y-6">
        {/* Pi Network Connection Status */}
        <div className="bg-white/5 backdrop-blur-md rounded-2xl border border-white/10 p-6">
          <h2 className="text-xl font-bold text-white mb-6">Pi Network Connection</h2>
          
          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 bg-green-500/10 rounded-xl border border-green-300/30">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-green-500/20 rounded-lg flex items-center justify-center">
                  <ShieldCheckIcon className="w-5 h-5 text-green-400" />
                </div>
                <div>
                  <div className="text-white font-semibold">Connected & Verified</div>
                  <div className="text-green-200 text-sm">KYC Status: Verified</div>
                </div>
              </div>
              <div className="text-green-300 font-bold text-2xl">π</div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="p-4 bg-white/5 rounded-xl">
                <div className="text-purple-300 font-semibold">Pi User ID</div>
                <div className="text-white text-sm font-mono">{user?.uid}</div>
              </div>
              <div className="p-4 bg-white/5 rounded-xl">
                <div className="text-purple-300 font-semibold">Connected Since</div>
                <div className="text-white text-sm">{new Date(profileData.joinedDate).toLocaleDateString()}</div>
              </div>
            </div>

            <div className="p-4 bg-blue-500/10 rounded-xl border border-blue-300/30">
              <div className="flex items-center justify-between mb-2">
                <span className="text-blue-200">Pi Token Balance</span>
                <span className="text-blue-300 font-bold">Available</span>
              </div>
              <div className="text-2xl font-bold text-white">1,250.00 π</div>
            </div>
          </div>
        </div>

        {/* Account Statistics */}
        <div className="bg-white/5 backdrop-blur-md rounded-2xl border border-white/10 p-6">
          <h2 className="text-xl font-bold text-white mb-6">Account Statistics</h2>
          
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            <div className="p-4 bg-gradient-to-r from-purple-500/10 to-indigo-500/10 rounded-xl border border-purple-300/20">
              <CurrencyDollarIcon className="w-8 h-8 text-purple-400 mb-2" />
              <div className="text-2xl font-bold text-white">{profileData.totalSettled.toFixed(2)} π</div>
              <div className="text-purple-200 text-sm">Total Settled</div>
            </div>

            <div className="p-4 bg-gradient-to-r from-blue-500/10 to-cyan-500/10 rounded-xl border border-blue-300/20">
              <ChartBarIcon className="w-8 h-8 text-blue-400 mb-2" />
              <div className="text-2xl font-bold text-white">{profileData.totalTransactions}</div>
              <div className="text-blue-200 text-sm">Transactions</div>
            </div>

            <div className="p-4 bg-gradient-to-r from-green-500/10 to-emerald-500/10 rounded-xl border border-green-300/20">
              <UserGroupIcon className="w-8 h-8 text-green-400 mb-2" />
              <div className="text-2xl font-bold text-white">{profileData.activeGroups}</div>
              <div className="text-green-200 text-sm">Active Groups</div>
            </div>

            <div className="p-4 bg-gradient-to-r from-yellow-500/10 to-orange-500/10 rounded-xl border border-yellow-300/20">
              <TrophyIcon className="w-8 h-8 text-yellow-400 mb-2" />
              <div className="text-2xl font-bold text-white">{profileData.achievements}</div>
              <div className="text-yellow-200 text-sm">Achievements</div>
            </div>

            <div className="p-4 bg-gradient-to-r from-red-500/10 to-pink-500/10 rounded-xl border border-red-300/20">
              <div className="text-2xl mb-2">🔥</div>
              <div className="text-2xl font-bold text-white">{profileData.currentStreak}</div>
              <div className="text-red-200 text-sm">Day Streak</div>
            </div>

            <div className="p-4 bg-gradient-to-r from-indigo-500/10 to-purple-500/10 rounded-xl border border-indigo-300/20">
              <div className="text-2xl mb-2">⭐</div>
              <div className="text-2xl font-bold text-white">Level {profileData.level}</div>
              <div className="text-indigo-200 text-sm">Expense Explorer</div>
            </div>
          </div>

          {/* Level Progress */}
          <div className="mt-6 p-4 bg-white/5 rounded-xl">
            <div className="flex justify-between items-center mb-2">
              <span className="text-white font-semibold">Progress to Level {profileData.level + 1}</span>
              <span className="text-purple-300">{profileData.nextLevelProgress}%</span>
            </div>
            <div className="w-full bg-white/20 rounded-full h-3">
              <motion.div
                className="h-3 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full"
                initial={{ width: 0 }}
                animate={{ width: `${profileData.nextLevelProgress}%` }}
                transition={{ duration: 1, delay: 0.2 }}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Recent Activity Sidebar */}
      <div className="space-y-6">
        <div className="bg-white/5 backdrop-blur-md rounded-2xl border border-white/10 p-6">
          <h2 className="text-xl font-bold text-white mb-6">Recent Activity</h2>
          
          <div className="space-y-4">
            {recentActivity.map((activity, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
                className="flex items-start gap-3 p-3 bg-white/5 rounded-lg"
              >
                <div className={`w-2 h-2 rounded-full mt-2 ${
                  activity.color === 'green' ? 'bg-green-400' :
                  activity.color === 'blue' ? 'bg-blue-400' :
                  activity.color === 'purple' ? 'bg-purple-400' :
                  'bg-yellow-400'
                }`} />
                <div className="flex-1">
                  <p className="text-white text-sm">{activity.description}</p>
                  <p className="text-gray-400 text-xs mt-1">{activity.time}</p>
                </div>
              </motion.div>
            ))}
          </div>

          <button className="w-full mt-4 py-2 text-purple-300 hover:text-white border border-purple-300/30 hover:border-purple-300/50 rounded-lg transition-colors text-sm">
            View All Activity
          </button>
        </div>

        {/* Quick Actions */}
        <div className="bg-white/5 backdrop-blur-md rounded-2xl border border-white/10 p-6">
          <h2 className="text-xl font-bold text-white mb-6">Quick Actions</h2>
          
          <div className="space-y-3">
            <button className="w-full flex items-center gap-3 p-3 bg-white/5 hover:bg-white/10 rounded-lg transition-colors text-left">
              <div className="w-8 h-8 bg-green-500/20 rounded-lg flex items-center justify-center">
                <CurrencyDollarIcon className="w-4 h-4 text-green-400" />
              </div>
              <span className="text-white">Add Pi Tokens</span>
            </button>

            <button className="w-full flex items-center gap-3 p-3 bg-white/5 hover:bg-white/10 rounded-lg transition-colors text-left">
              <div className="w-8 h-8 bg-blue-500/20 rounded-lg flex items-center justify-center">
                <UserGroupIcon className="w-4 h-4 text-blue-400" />
              </div>
              <span className="text-white">Invite Friends</span>
            </button>

            <button className="w-full flex items-center gap-3 p-3 bg-white/5 hover:bg-white/10 rounded-lg transition-colors text-left">
              <div className="w-8 h-8 bg-purple-500/20 rounded-lg flex items-center justify-center">
                <TrophyIcon className="w-4 h-4 text-purple-400" />
              </div>
              <span className="text-white">View Achievements</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
