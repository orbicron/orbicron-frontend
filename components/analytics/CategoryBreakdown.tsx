'use client'
import { motion } from 'framer-motion'
import { useState } from 'react'

const mockCategoryData = [
  { category: 'Food & Dining', amount: 1234.50, percentage: 42, icon: '🍕', color: 'from-red-500 to-pink-500' },
  { category: 'Transportation', amount: 567.30, percentage: 19, icon: '🚗', color: 'from-blue-500 to-cyan-500' },
  { category: 'Entertainment', amount: 432.80, percentage: 15, icon: '🎬', color: 'from-purple-500 to-indigo-500' },
  { category: 'Shopping', amount: 389.20, percentage: 13, icon: '🛍️', color: 'from-green-500 to-emerald-500' },
  { category: 'Accommodation', amount: 234.60, percentage: 8, icon: '🏨', color: 'from-yellow-500 to-orange-500' },
  { category: 'Other', amount: 89.40, percentage: 3, icon: '📝', color: 'from-gray-500 to-slate-500' },
]

export const CategoryBreakdown = () => {
  const [viewType, setViewType] = useState<'pie' | 'list'>('pie')
  
  // Simple pie chart simulation
  let cumulativePercentage = 0
  const pieSegments = mockCategoryData.map((category) => {
    const startAngle = cumulativePercentage * 3.6 // Convert to degrees
    const endAngle = (cumulativePercentage + category.percentage) * 3.6
    cumulativePercentage += category.percentage
    return { ...category, startAngle, endAngle }
  })

  return (
    <div className="bg-white/5 backdrop-blur-md rounded-2xl border border-white/10 p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-2xl font-bold text-white mb-2">Category Breakdown</h2>
          <p className="text-gray-400">Where your Pi tokens are going</p>
        </div>

        <div className="flex bg-white/10 rounded-lg p-1">
          <button
            onClick={() => setViewType('pie')}
            className={`px-3 py-1 text-sm rounded transition-colors ${
              viewType === 'pie' ? 'bg-purple-500 text-white' : 'text-gray-400'
            }`}
          >
            Chart
          </button>
          <button
            onClick={() => setViewType('list')}
            className={`px-3 py-1 text-sm rounded transition-colors ${
              viewType === 'list' ? 'bg-purple-500 text-white' : 'text-gray-400'
            }`}
          >
            List
          </button>
        </div>
      </div>

      {viewType === 'pie' ? (
        <div className="flex flex-col lg:flex-row items-center gap-8">
          {/* Pie Chart */}
          <div className="relative w-48 h-48 mx-auto">
            {/* Simple CSS-based pie chart */}
            <div className="w-48 h-48 rounded-full relative overflow-hidden">
              {pieSegments.map((segment, index) => (
                <div
                  key={segment.category}
                  className={`absolute inset-0 rounded-full`}
                  style={{
                    background: `conic-gradient(from ${segment.startAngle}deg, transparent ${segment.startAngle}deg, rgba(139, 92, 246, 0.8) ${segment.endAngle}deg, transparent ${segment.endAngle}deg)`,
                  }}
                />
              ))}
              
              {/* Center hole */}
              <div className="absolute inset-4 bg-slate-900 rounded-full flex items-center justify-center">
                <div className="text-center">
                  <div className="text-2xl font-bold text-white">2,947 π</div>
                  <div className="text-sm text-gray-400">Total</div>
                </div>
              </div>
            </div>
          </div>

          {/* Legend */}
          <div className="flex-1 space-y-3">
            {mockCategoryData.map((category, index) => (
              <motion.div
                key={category.category}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
                className="flex items-center gap-4 p-3 bg-white/5 rounded-lg hover:bg-white/10 transition-colors cursor-pointer"
              >
                <div className="text-2xl">{category.icon}</div>
                <div className="flex-1">
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-white font-medium">{category.category}</span>
                    <span className="text-purple-300 font-semibold">
                      {category.amount.toFixed(2)} π
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="flex-1 bg-white/20 rounded-full h-2">
                      <motion.div
                        className={`h-2 rounded-full bg-gradient-to-r ${category.color}`}
                        initial={{ width: 0 }}
                        animate={{ width: `${category.percentage}%` }}
                        transition={{ duration: 0.5, delay: index * 0.1 }}
                      />
                    </div>
                    <span className="text-gray-400 text-sm w-12 text-right">
                      {category.percentage}%
                    </span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      ) : (
        <div className="space-y-4">
          {mockCategoryData.map((category, index) => (
            <motion.div
              key={category.category}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
              className="flex items-center justify-between p-4 bg-white/5 rounded-xl border border-white/10 hover:border-white/20 transition-all duration-300"
            >
              <div className="flex items-center gap-4">
                <div className={`w-12 h-12 rounded-xl bg-gradient-to-r ${category.color} flex items-center justify-center text-2xl`}>
                  {category.icon}
                </div>
                <div>
                  <h3 className="text-white font-semibold text-lg">{category.category}</h3>
                  <p className="text-gray-400 text-sm">{category.percentage}% of total spending</p>
                </div>
              </div>
              
              <div className="text-right">
                <div className="text-2xl font-bold text-white">
                  {category.amount.toFixed(2)} π
                </div>
                <div className="text-gray-400 text-sm">
                  Avg: {(category.amount / 30).toFixed(2)} π/day
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      )}

      {/* Category Insights */}
      <div className="mt-8 pt-6 border-t border-white/10">
        <h3 className="text-lg font-semibold text-white mb-4">Category Insights</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-4 bg-gradient-to-r from-red-500/10 to-pink-500/10 rounded-xl border border-red-300/20">
            <div className="text-red-300 font-semibold mb-1">Highest Category</div>
            <div className="text-white">Food & Dining (42%)</div>
            <div className="text-red-200 text-sm">Consider meal planning to reduce costs</div>
          </div>
          <div className="p-4 bg-gradient-to-r from-green-500/10 to-emerald-500/10 rounded-xl border border-green-300/20">
            <div className="text-green-300 font-semibold mb-1">Most Efficient</div>
            <div className="text-white">Transportation (19%)</div>
            <div className="text-green-200 text-sm">Well-controlled spending in this category</div>
          </div>
        </div>
      </div>
    </div>
  )
}
