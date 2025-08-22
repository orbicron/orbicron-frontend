'use client'
import { useState } from 'react'
import { motion } from 'framer-motion'
import { 
  ChartBarIcon,
  CalendarIcon,
  DocumentArrowDownIcon,
  Cog6ToothIcon
} from '@heroicons/react/24/outline'

export const AnalyticsHeader = () => {
  const [timeRange, setTimeRange] = useState<'week' | 'month' | 'quarter' | 'year'>('month')

  const exportReport = (format: 'pdf' | 'csv') => {
    console.log(`Exporting report as ${format}`)
    // Implement export functionality
  }

  return (
    <div className="bg-white/5 backdrop-blur-md rounded-2xl border border-white/10 p-6">
      {/* Header Title and Stats */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between mb-6">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">Analytics Dashboard</h1>
          <div className="flex items-center gap-6 text-sm">
            <span className="text-purple-300">
              <span className="font-semibold">2,456.80 π</span> Total Spent
            </span>
            <span className="text-green-300">
              <span className="font-semibold">156</span> Transactions
            </span>
            <span className="text-blue-300">
              <span className="font-semibold">8</span> Categories
            </span>
          </div>
        </div>

        {/* Controls */}
        <div className="flex items-center gap-3 mt-4 lg:mt-0">
          {/* Time Range Selector */}
          <div className="flex items-center bg-white/10 backdrop-blur-md rounded-xl border border-white/20 p-1">
            {(['week', 'month', 'quarter', 'year'] as const).map((range) => (
              <button
                key={range}
                onClick={() => setTimeRange(range)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors capitalize ${
                  timeRange === range
                    ? 'bg-purple-500 text-white'
                    : 'text-gray-300 hover:text-white'
                }`}
              >
                {range}
              </button>
            ))}
          </div>

          {/* Export Button */}
          <div className="relative group">
            <button className="flex items-center gap-2 bg-white/10 backdrop-blur-md text-white px-4 py-2 rounded-xl font-semibold border border-white/20 hover:bg-white/20 transition-all duration-300">
              <DocumentArrowDownIcon className="w-5 h-5" />
              Export
            </button>
            
            {/* Dropdown */}
            <div className="absolute right-0 top-12 w-32 bg-white/10 backdrop-blur-md rounded-xl border border-white/20 shadow-xl opacity-0 group-hover:opacity-100 transition-opacity z-10">
              <button 
                onClick={() => exportReport('pdf')}
                className="w-full px-4 py-2 text-left text-white hover:bg-white/10 transition-colors first:rounded-t-xl"
              >
                Export PDF
              </button>
              <button 
                onClick={() => exportReport('csv')}
                className="w-full px-4 py-2 text-left text-white hover:bg-white/10 transition-colors last:rounded-b-xl"
              >
                Export CSV
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Stats Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-gradient-to-r from-purple-500/20 to-indigo-500/20 rounded-xl p-4 border border-purple-300/30">
          <div className="text-2xl font-bold text-purple-300">2,456.80 π</div>
          <div className="text-sm text-purple-200">This Month</div>
          <div className="text-xs text-green-400 mt-1">+12.5% vs last month</div>
        </div>
        <div className="bg-gradient-to-r from-green-500/20 to-emerald-500/20 rounded-xl p-4 border border-green-300/30">
          <div className="text-2xl font-bold text-green-300">456.20 π</div>
          <div className="text-sm text-green-200">Daily Average</div>
          <div className="text-xs text-green-400 mt-1">Optimal range</div>
        </div>
        <div className="bg-gradient-to-r from-blue-500/20 to-cyan-500/20 rounded-xl p-4 border border-blue-300/30">
          <div className="text-2xl font-bold text-blue-300">156</div>
          <div className="text-sm text-blue-200">Transactions</div>
          <div className="text-xs text-blue-400 mt-1">5.2 per day</div>
        </div>
        <div className="bg-gradient-to-r from-yellow-500/20 to-orange-500/20 rounded-xl p-4 border border-yellow-300/30">
          <div className="text-2xl font-bold text-yellow-300">8</div>
          <div className="text-sm text-yellow-200">Categories Used</div>
          <div className="text-xs text-yellow-400 mt-1">Top: Food (45%)</div>
        </div>
      </div>
    </div>
  )
}
