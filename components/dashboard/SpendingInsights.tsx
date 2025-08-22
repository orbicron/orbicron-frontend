'use client'
import { motion } from 'framer-motion'

const spendingData = [
  { category: 'Food', amount: 450, percentage: 35, color: 'bg-red-500' },
  { category: 'Transport', amount: 280, percentage: 22, color: 'bg-blue-500' },
  { category: 'Entertainment', amount: 320, percentage: 25, color: 'bg-purple-500' },
  { category: 'Shopping', amount: 150, percentage: 12, color: 'bg-green-500' },
  { category: 'Other', amount: 80, percentage: 6, color: 'bg-gray-500' },
]

export const SpendingInsights = () => {
  return (
    <div className="bg-white/5 backdrop-blur-md rounded-2xl border border-white/10 p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-white">Spending Insights</h2>
        <div className="text-sm text-purple-300">This Month</div>
      </div>

      <div className="space-y-4">
        {spendingData.map((item, index) => (
          <motion.div
            key={item.category}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="flex items-center gap-4"
          >
            <div className="w-16 text-gray-300 text-sm font-medium">
              {item.category}
            </div>
            
            <div className="flex-1">
              <div className="flex items-center justify-between mb-1">
                <span className="text-white font-semibold">{item.amount} π</span>
                <span className="text-gray-400 text-sm">{item.percentage}%</span>
              </div>
              
              <div className="w-full bg-white/10 rounded-full h-2">
                <motion.div
                  className={`h-2 rounded-full ${item.color}`}
                  initial={{ width: 0 }}
                  animate={{ width: `${item.percentage}%` }}
                  transition={{ duration: 1, delay: index * 0.1 }}
                />
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  )
}
