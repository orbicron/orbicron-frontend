'use client'
import { motion } from 'framer-motion'
import { useState } from 'react'
import { 
  TrophyIcon,
  StarIcon,
  FireIcon,
  BoltIcon,
  ShieldCheckIcon
} from '@heroicons/react/24/outline'

const mockAchievements = [
  {
    id: 'first_expense',
    title: 'First Steps',
    description: 'Added your first expense',
    icon: '🎯',
    earned: true,
    earnedDate: '2024-01-15',
    rarity: 'common' as const,
    piReward: 5
  },
  {
    id: 'budget_master',
    title: 'Budget Master',
    description: 'Stayed within budget for 3 months',
    icon: '💰',
    earned: true,
    earnedDate: '2024-01-20',
    rarity: 'rare' as const,
    piReward: 50
  },
  {
    id: 'receipt_scanner',
    title: 'Scanner Pro',
    description: 'Scanned 50 receipts with AI',
    icon: '📱',
    earned: true,
    earnedDate: '2024-01-25',
    rarity: 'uncommon' as const,
    piReward: 25
  },
  {
    id: 'social_splitter',
    title: 'Social Butterfly',
    description: 'Split expenses with 20+ different people',
    icon: '👥',
    earned: false,
    progress: 15,
    total: 20,
    rarity: 'epic' as const,
    piReward: 100
  },
  {
    id: 'pi_millionaire',
    title: 'Pi Millionaire',
    description: 'Processed over 1,000,000 π in transactions',
    icon: '💎',
    earned: false,
    progress: 245680,
    total: 1000000,
    rarity: 'legendary' as const,
    piReward: 500
  },
  {
    id: 'streak_keeper',
    title: 'Streak Keeper',
    description: 'Logged expenses daily for 30 days',
    icon: '🔥',
    earned: false,
    progress: 18,
    total: 30,
    rarity: 'rare' as const,
    piReward: 75
  }
]

const mockStats = {
  totalEarned: 80,
  totalPossible: 655,
  currentStreak: 18,
  longestStreak: 25,
  level: 8,
  experiencePoints: 1240,
  nextLevelXp: 1500
}

export const Achievements = () => {
  const [filter, setFilter] = useState<'all' | 'earned' | 'unearned'>('all')

  const filteredAchievements = mockAchievements.filter(achievement => {
    if (filter === 'earned') return achievement.earned
    if (filter === 'unearned') return !achievement.earned
    return true
  })

  const getRarityColor = (rarity: string) => {
    switch (rarity) {
      case 'common': return 'from-gray-500 to-slate-500'
      case 'uncommon': return 'from-green-500 to-emerald-500'
      case 'rare': return 'from-blue-500 to-cyan-500'
      case 'epic': return 'from-purple-500 to-indigo-500'
      case 'legendary': return 'from-yellow-500 to-orange-500'
      default: return 'from-gray-500 to-slate-500'
    }
  }

  const getRarityBorder = (rarity: string) => {
    switch (rarity) {
      case 'common': return 'border-gray-300/30'
      case 'uncommon': return 'border-green-300/30'
      case 'rare': return 'border-blue-300/30'
      case 'epic': return 'border-purple-300/30'
      case 'legendary': return 'border-yellow-300/30'
      default: return 'border-gray-300/30'
    }
  }

  return (
    <div className="space-y-6">
      {/* Player Stats */}
      <div className="bg-white/5 backdrop-blur-md rounded-2xl border border-white/10 p-6">
        <h2 className="text-2xl font-bold text-white mb-6">Your Progress</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="text-center">
            <div className="w-20 h-20 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center text-2xl font-bold text-white mx-auto mb-3">
              {mockStats.level}
            </div>
            <div className="text-white font-semibold">Level {mockStats.level}</div>
            <div className="text-gray-400 text-sm">Expense Explorer</div>
            <div className="w-full bg-white/20 rounded-full h-2 mt-2">
              <div
                className="h-2 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full transition-all duration-500"
                style={{ width: `${(mockStats.experiencePoints / mockStats.nextLevelXp) * 100}%` }}
              />
            </div>
            <div className="text-xs text-gray-400 mt-1">
              {mockStats.experiencePoints} / {mockStats.nextLevelXp} XP
            </div>
          </div>

          <div className="text-center">
            <TrophyIcon className="w-12 h-12 text-yellow-400 mx-auto mb-3" />
            <div className="text-2xl font-bold text-white">{mockStats.totalEarned}</div>
            <div className="text-gray-400">Pi Earned</div>
          </div>

          <div className="text-center">
            <FireIcon className="w-12 h-12 text-orange-400 mx-auto mb-3" />
            <div className="text-2xl font-bold text-white">{mockStats.currentStreak}</div>
            <div className="text-gray-400">Day Streak</div>
          </div>

          <div className="text-center">
            <StarIcon className="w-12 h-12 text-purple-400 mx-auto mb-3" />
            <div className="text-2xl font-bold text-white">
              {mockAchievements.filter(a => a.earned).length}
            </div>
            <div className="text-gray-400">Achievements</div>
          </div>
        </div>
      </div>

      {/* Achievements List */}
      <div className="bg-white/5 backdrop-blur-md rounded-2xl border border-white/10 p-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-white mb-4 sm:mb-0">Achievements</h2>
          
          <div className="flex bg-white/10 rounded-lg p-1">
            {(['all', 'earned', 'unearned'] as const).map((filterType) => (
              <button
                key={filterType}
                onClick={() => setFilter(filterType)}
                className={`px-4 py-2 rounded-md text-sm font-medium transition-colors capitalize ${
                  filter === filterType ? 'bg-purple-500 text-white' : 'text-gray-300 hover:text-white'
                }`}
              >
                {filterType}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredAchievements.map((achievement, index) => (
            <motion.div
              key={achievement.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
              className={`relative p-6 rounded-2xl border-2 transition-all duration-300 hover:transform hover:scale-105 ${
                achievement.earned 
                  ? `bg-gradient-to-r ${getRarityColor(achievement.rarity)}/10 ${getRarityBorder(achievement.rarity)} hover:${getRarityBorder(achievement.rarity.replace('300/30', '300/50'))}`
                  : 'bg-white/5 border-white/10 hover:border-white/20'
              }`}
            >
              {/* Rarity Badge */}
              <div className={`absolute -top-2 -right-2 px-2 py-1 rounded-full text-xs font-bold capitalize ${
                achievement.rarity === 'legendary' ? 'bg-gradient-to-r from-yellow-500 to-orange-500 text-white' :
                achievement.rarity === 'epic' ? 'bg-gradient-to-r from-purple-500 to-indigo-500 text-white' :
                achievement.rarity === 'rare' ? 'bg-gradient-to-r from-blue-500 to-cyan-500 text-white' :
                achievement.rarity === 'uncommon' ? 'bg-gradient-to-r from-green-500 to-emerald-500 text-white' :
                'bg-gradient-to-r from-gray-500 to-slate-500 text-white'
              }`}>
                {achievement.rarity}
              </div>

              {/* Achievement Icon */}
              <div className={`w-16 h-16 rounded-2xl mb-4 flex items-center justify-center text-3xl ${
                achievement.earned 
                  ? `bg-gradient-to-r ${getRarityColor(achievement.rarity)}`
                  : 'bg-white/10'
              }`}>
                {achievement.earned ? achievement.icon : '🔒'}
              </div>

              {/* Achievement Info */}
              <h3 className={`text-xl font-bold mb-2 ${
                achievement.earned ? 'text-white' : 'text-gray-400'
              }`}>
                {achievement.title}
              </h3>
              <p className={`text-sm mb-4 ${
                achievement.earned ? 'text-gray-300' : 'text-gray-500'
              }`}>
                {achievement.description}
              </p>

              {/* Progress or Earned Date */}
              {achievement.earned ? (
                <div className="flex items-center justify-between">
                  <span className="text-green-300 text-sm font-medium">
                    Earned {new Date(achievement.earnedDate!).toLocaleDateString()}
                  </span>
                  <span className="flex items-center gap-1 text-yellow-400 font-bold">
                    <TrophyIcon className="w-4 h-4" />
                    +{achievement.piReward} π
                  </span>
                </div>
              ) : (
                <div>
                  {achievement.progress !== undefined && (
                    <div className="mb-3">
                      <div className="flex justify-between items-center mb-1">
                        <span className="text-gray-400 text-sm">Progress</span>
                        <span className="text-white text-sm font-medium">
                          {achievement.progress} / {achievement.total}
                        </span>
                      </div>
                      <div className="w-full bg-white/20 rounded-full h-2">
                        <div
                          className="h-2 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full transition-all duration-500"
                          style={{ width: `${(achievement.progress! / achievement.total!) * 100}%` }}
                        />
                      </div>
                    </div>
                  )}
                  <div className="flex items-center justify-between">
                    <span className="text-gray-500 text-sm">Locked</span>
                    <span className="flex items-center gap-1 text-gray-400">
                      <TrophyIcon className="w-4 h-4" />
                      {achievement.piReward} π
                    </span>
                  </div>
                </div>
              )}
            </motion.div>
          ))}
        </div>
      </div>

      {/* Recent Activity */}
      <div className="bg-white/5 backdrop-blur-md rounded-2xl border border-white/10 p-6">
        <h3 className="text-xl font-bold text-white mb-6">Recent Activity</h3>
        
        <div className="space-y-4">
          <div className="flex items-center gap-4 p-4 bg-white/5 rounded-xl">
            <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full flex items-center justify-center">
              📱
            </div>
            <div className="flex-1">
              <div className="text-white font-semibold">Scanner Pro Unlocked!</div>
              <div className="text-gray-400 text-sm">Earned 25 π • 3 days ago</div>
            </div>
            <div className="text-blue-300 font-bold">+25 π</div>
          </div>

          <div className="flex items-center gap-4 p-4 bg-white/5 rounded-xl">
            <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-indigo-500 rounded-full flex items-center justify-center">
              💰
            </div>
            <div className="flex-1">
              <div className="text-white font-semibold">Budget Master Achieved!</div>
              <div className="text-gray-400 text-sm">Earned 50 π • 1 week ago</div>
            </div>
            <div className="text-purple-300 font-bold">+50 π</div>
          </div>

          <div className="flex items-center gap-4 p-4 bg-white/5 rounded-xl">
            <div className="w-10 h-10 bg-gradient-to-r from-gray-500 to-slate-500 rounded-full flex items-center justify-center">
              🎯
            </div>
            <div className="flex-1">
              <div className="text-white font-semibold">First Steps Completed!</div>
              <div className="text-gray-400 text-sm">Earned 5 π • 2 weeks ago</div>
            </div>
            <div className="text-gray-300 font-bold">+5 π</div>
          </div>
        </div>
      </div>
    </div>
  )
}
