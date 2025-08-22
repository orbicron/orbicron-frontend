'use client'
import { motion } from 'framer-motion'

const recentActivities = [
  {
    type: 'expense',
    title: 'Dinner at Pizza Palace',
    amount: '45.60',
    user: 'Alex',
    time: '2 hours ago',
    status: 'pending',
  },
  {
    type: 'settlement',
    title: 'Settled with Sarah',
    amount: '23.40',
    user: 'You',
    time: '5 hours ago',
    status: 'completed',
  },
  {
    type: 'expense',
    title: 'Uber ride home',
    amount: '18.20',
    user: 'Mike',
    time: '1 day ago',
    status: 'split',
  },
  {
    type: 'group',
    title: 'Added to "Weekend Trip"',
    amount: null,
    user: 'Emma',
    time: '2 days ago',
    status: 'joined',
  },
]

export const RecentActivity = () => {
  return (
    <div className="bg-white/5 backdrop-blur-md rounded-2xl border border-white/10 p-6">
      <h2 className="text-2xl font-bold text-white mb-6">Recent Activity</h2>
      
      <div className="space-y-4">
        {recentActivities.map((activity, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
            className="flex items-start gap-4 p-4 bg-white/5 rounded-xl hover:bg-white/10 transition-colors"
          >
            {/* Activity Icon */}
            <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
              activity.type === 'expense' ? 'bg-blue-500/20 text-blue-400' :
              activity.type === 'settlement' ? 'bg-green-500/20 text-green-400' :
              'bg-purple-500/20 text-purple-400'
            }`}>
              {activity.type === 'expense' ? '💰' :
               activity.type === 'settlement' ? '✅' : '👥'}
            </div>
            
            {/* Activity Details */}
            <div className="flex-1">
              <h3 className="text-white font-medium text-sm mb-1">
                {activity.title}
              </h3>
              <p className="text-gray-400 text-xs mb-2">
                {activity.user} • {activity.time}
              </p>
              
              <div className="flex items-center justify-between">
                {activity.amount && (
                  <span className="text-purple-300 font-semibold text-sm">
                    {activity.amount} π
                  </span>
                )}
                
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                  activity.status === 'completed' ? 'bg-green-500/20 text-green-400' :
                  activity.status === 'pending' ? 'bg-yellow-500/20 text-yellow-400' :
                  activity.status === 'split' ? 'bg-blue-500/20 text-blue-400' :
                  'bg-purple-500/20 text-purple-400'
                }`}>
                  {activity.status}
                </span>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
      
      <button className="w-full mt-6 py-3 text-purple-300 hover:text-white border border-purple-300/30 hover:border-purple-300/50 rounded-xl transition-colors">
        View All Activity
      </button>
    </div>
  )
}
