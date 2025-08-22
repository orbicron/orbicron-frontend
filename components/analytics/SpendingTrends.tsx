'use client'
import { motion } from 'framer-motion'
import { useState } from 'react'
import { 
  ArrowTrendingUpIcon, 
  ArrowTrendingDownIcon,
  CalendarIcon
} from '@heroicons/react/24/outline'

// Mock data for charts
const mockTrendData = [
  { date: '2024-01-01', amount: 450, category: 'food' },
  { date: '2024-01-02', amount: 230, category: 'transport' },
  { date: '2024-01-03', amount: 680, category: 'shopping' },
  { date: '2024-01-04', amount: 120, category: 'food' },
  { date: '2024-01-05', amount: 890, category: 'entertainment' },
  { date: '2024-01-06', amount: 340, category: 'food' },
  { date: '2024-01-07', amount: 560, category: 'transport' },
]

const mockInsights = [
  {
    title: 'Spending increased 15% this week',
    description: 'Mainly due to increased food expenses',
    trend: 'up' as const,
    value: '+15%',
    color: 'red'
  },
  {
    title: 'Transport costs decreased',
    description: 'Saved 23% on commuting expenses',
    trend: 'down' as const,
    value: '-23%',
    color: 'green'
  },
  {
    title: 'Weekend spending spike',
    description: 'Entertainment expenses peak on Saturdays',
    trend: 'up' as const,
    value: '+67%',
    color: 'blue'
  }
]

export const SpendingTrends = () => {
  const [chartType, setChartType] = useState<'line' | 'bar'>('line')
  const [timeframe, setTimeframe] = useState<'daily' | 'weekly' | 'monthly'>('daily')

  // Simple chart simulation (in real app, use Chart.js or similar)
  const maxAmount = Math.max(...mockTrendData.map(d => d.amount))
  
  return (
    <div className="bg-white/5 backdrop-blur-md rounded-2xl border border-white/10 p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-2xl font-bold text-white mb-2">Spending Trends</h2>
          <p className="text-gray-400">Track your expense patterns over time</p>
        </div>

        <div className="flex items-center gap-2">
          {/* Chart Type Toggle */}
          <div className="flex bg-white/10 rounded-lg p-1">
            <button
              onClick={() => setChartType('line')}
              className={`px-3 py-1 text-sm rounded transition-colors ${
                chartType === 'line' ? 'bg-purple-500 text-white' : 'text-gray-400'
              }`}
            >
              Line
            </button>
            <button
              onClick={() => setChartType('bar')}
              className={`px-3 py-1 text-sm rounded transition-colors ${
                chartType === 'bar' ? 'bg-purple-500 text-white' : 'text-gray-400'
              }`}
            >
              Bar
            </button>
          </div>

          {/* Timeframe Selector */}
          <select
            value={timeframe}
            onChange={(e) => setTimeframe(e.target.value as any)}
            className="bg-white/10 border border-white/20 rounded-lg px-3 py-1 text-white text-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
          >
            <option value="daily">Daily</option>
            <option value="weekly">Weekly</option>
            <option value="monthly">Monthly</option>
          </select>
        </div>
      </div>

      {/* Chart Area */}
      <div className="mb-8">
        <div className="h-64 bg-white/5 rounded-xl p-4 flex items-end justify-between gap-2">
          {mockTrendData.map((data, index) => (
            <motion.div
              key={index}
              initial={{ height: 0 }}
              animate={{ height: `${(data.amount / maxAmount) * 100}%` }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="flex-1 bg-gradient-to-t from-purple-500 to-pink-500 rounded-t-md min-h-[20px] relative group cursor-pointer"
            >
              {/* Tooltip */}
              <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 opacity-0 group-hover:opacity-100 transition-opacity">
                <div className="bg-black/80 text-white text-xs px-2 py-1 rounded whitespace-nowrap">
                  {data.amount} π
                  <br />
                  {new Date(data.date).toLocaleDateString()}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Date labels */}
        <div className="flex justify-between mt-2 px-4">
          {mockTrendData.map((data, index) => (
            <span key={index} className="text-xs text-gray-400">
              {new Date(data.date).getDate()}
            </span>
          ))}
        </div>
      </div>

      {/* Insights */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-white flex items-center gap-2">
          <span>💡</span>
          Key Insights
        </h3>
        
        <div className="grid gap-4">
          {mockInsights.map((insight, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
              className="flex items-center gap-4 p-4 bg-white/5 rounded-xl border border-white/10"
            >
              <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                insight.color === 'red' ? 'bg-red-500/20' :
                insight.color === 'green' ? 'bg-green-500/20' :
                'bg-blue-500/20'
              }`}>
                {insight.trend === 'up' ? (
                  <ArrowTrendingUpIcon className={`w-5 h-5 ${
                    insight.color === 'red' ? 'text-red-400' :
                    insight.color === 'green' ? 'text-green-400' :
                    'text-blue-400'
                  }`} />
                ) : (
                  <ArrowTrendingDownIcon className={`w-5 h-5 ${
                    insight.color === 'red' ? 'text-red-400' :
                    insight.color === 'green' ? 'text-green-400' :
                    'text-blue-400'
                  }`} />
                )}
              </div>

              <div className="flex-1">
                <h4 className="text-white font-semibold mb-1">{insight.title}</h4>
                <p className="text-gray-400 text-sm">{insight.description}</p>
              </div>

              <div className={`text-2xl font-bold ${
                insight.color === 'red' ? 'text-red-300' :
                insight.color === 'green' ? 'text-green-300' :
                'text-blue-300'
              }`}>
                {insight.value}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  )
}
