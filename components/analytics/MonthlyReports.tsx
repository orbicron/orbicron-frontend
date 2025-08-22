'use client'
import { motion } from 'framer-motion'
import { useState } from 'react'
import { 
  CalendarIcon, 
  DocumentArrowDownIcon,
  ArrowTrendingUpIcon,
  ArrowTrendingDownIcon,
  ExclamationTriangleIcon
} from '@heroicons/react/24/outline'

const mockReports = [
  {
    month: 'January 2024',
    totalSpent: 2456.80,
    transactions: 156,
    avgDaily: 79.25,
    topCategory: 'Food & Dining',
    trend: 'up' as const,
    trendValue: '+12.5%',
    budget: 3000,
    savings: 543.20,
    highlights: [
      'Exceeded food budget by 15%',
      'Saved 23% on transportation',
      'New record: 156 transactions'
    ]
  },
  {
    month: 'December 2023',
    totalSpent: 2187.45,
    transactions: 134,
    avgDaily: 70.56,
    topCategory: 'Entertainment',
    trend: 'down' as const,
    trendValue: '-8.3%',
    budget: 2800,
    savings: 612.55,
    highlights: [
      'Holiday season spending spike',
      'Entertainment dominated expenses',
      'Stayed within budget'
    ]
  },
  {
    month: 'November 2023',
    totalSpent: 2376.90,
    transactions: 142,
    avgDaily: 79.23,
    topCategory: 'Shopping',
    trend: 'up' as const,
    trendValue: '+18.7%',
    budget: 2500,
    savings: 123.10,
    highlights: [
      'Black Friday shopping spree',
      'Clothing expenses increased',
      'Budget slightly exceeded'
    ]
  }
]

export const MonthlyReports = () => {
  const [selectedReport, setSelectedReport] = useState(0)
  const currentReport = mockReports[selectedReport]

  const getBudgetStatus = (spent: number, budget: number) => {
    const percentage = (spent / budget) * 100
    if (percentage > 100) return { status: 'over', color: 'red', text: 'Over Budget' }
    if (percentage > 90) return { status: 'warning', color: 'yellow', text: 'Near Limit' }
    return { status: 'good', color: 'green', text: 'On Track' }
  }

  return (
    <div className="space-y-6">
      {/* Report Selector */}
      <div className="bg-white/5 backdrop-blur-md rounded-2xl border border-white/10 p-6">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-white mb-4 lg:mb-0">Monthly Reports</h2>
          
          <div className="flex items-center gap-4">
            <select
              value={selectedReport}
              onChange={(e) => setSelectedReport(Number(e.target.value))}
              className="bg-white/10 border border-white/20 rounded-xl px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
            >
              {mockReports.map((report, index) => (
                <option key={index} value={index} className="bg-slate-800">
                  {report.month}
                </option>
              ))}
            </select>
            
            <button className="flex items-center gap-2 bg-purple-600 text-white px-4 py-2 rounded-xl font-semibold hover:bg-purple-700 transition-colors">
              <DocumentArrowDownIcon className="w-5 h-5" />
              Export Report
            </button>
          </div>
        </div>

        {/* Report Overview */}
        <motion.div
          key={selectedReport}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="grid grid-cols-1 md:grid-cols-4 gap-6"
        >
          <div className="bg-gradient-to-r from-purple-500/20 to-indigo-500/20 rounded-xl p-6 border border-purple-300/30">
            <div className="flex items-center justify-between mb-2">
              <span className="text-purple-200">Total Spent</span>
              <div className={`flex items-center gap-1 ${
                currentReport.trend === 'up' ? 'text-red-400' : 'text-green-400'
              }`}>
                {currentReport.trend === 'up' ? (
                  <ArrowTrendingUpIcon className="w-4 h-4" />
                ) : (
                  <ArrowTrendingDownIcon className="w-4 h-4" />
                )}
                <span className="text-sm">{currentReport.trendValue}</span>
              </div>
            </div>
            <div className="text-3xl font-bold text-white">
              {currentReport.totalSpent.toFixed(2)} π
            </div>
          </div>

          <div className="bg-gradient-to-r from-blue-500/20 to-cyan-500/20 rounded-xl p-6 border border-blue-300/30">
            <span className="text-blue-200 block mb-2">Transactions</span>
            <div className="text-3xl font-bold text-white">
              {currentReport.transactions}
            </div>
            <span className="text-blue-300 text-sm">
              {currentReport.avgDaily.toFixed(2)} π avg/day
            </span>
          </div>

          <div className="bg-gradient-to-r from-green-500/20 to-emerald-500/20 rounded-xl p-6 border border-green-300/30">
            <span className="text-green-200 block mb-2">Budget Status</span>
            <div className="text-3xl font-bold text-white">
              {((currentReport.totalSpent / currentReport.budget) * 100).toFixed(0)}%
            </div>
            <span className={`text-sm ${
              getBudgetStatus(currentReport.totalSpent, currentReport.budget).status === 'over' ? 'text-red-300' :
              getBudgetStatus(currentReport.totalSpent, currentReport.budget).status === 'warning' ? 'text-yellow-300' :
              'text-green-300'
            }`}>
              {getBudgetStatus(currentReport.totalSpent, currentReport.budget).text}
            </span>
          </div>

          <div className="bg-gradient-to-r from-yellow-500/20 to-orange-500/20 rounded-xl p-6 border border-yellow-300/30">
            <span className="text-yellow-200 block mb-2">Top Category</span>
            <div className="text-xl font-bold text-white">
              {currentReport.topCategory}
            </div>
            <span className="text-yellow-300 text-sm">Most frequent</span>
          </div>
        </motion.div>
      </div>

      {/* Detailed Analysis */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Budget Breakdown */}
        <div className="bg-white/5 backdrop-blur-md rounded-2xl border border-white/10 p-6">
          <h3 className="text-xl font-bold text-white mb-6">Budget vs Actual</h3>
          
          <div className="space-y-4">
            <div className="flex justify-between items-center mb-2">
              <span className="text-gray-300">Budget</span>
              <span className="text-white font-semibold">{currentReport.budget.toFixed(2)} π</span>
            </div>
            <div className="flex justify-between items-center mb-2">
              <span className="text-gray-300">Spent</span>
              <span className="text-white font-semibold">{currentReport.totalSpent.toFixed(2)} π</span>
            </div>
            <div className="flex justify-between items-center mb-4">
              <span className="text-gray-300">Remaining</span>
              <span className={`font-semibold ${
                currentReport.budget - currentReport.totalSpent > 0 ? 'text-green-300' : 'text-red-300'
              }`}>
                {(currentReport.budget - currentReport.totalSpent).toFixed(2)} π
              </span>
            </div>

            {/* Progress Bar */}
            <div className="w-full bg-white/20 rounded-full h-4 mb-4">
              <div
                className={`h-4 rounded-full transition-all duration-500 ${
                  currentReport.totalSpent > currentReport.budget
                    ? 'bg-gradient-to-r from-red-500 to-pink-500'
                    : 'bg-gradient-to-r from-green-500 to-emerald-500'
                }`}
                style={{
                  width: `${Math.min((currentReport.totalSpent / currentReport.budget) * 100, 100)}%`
                }}
              />
            </div>

            {currentReport.totalSpent > currentReport.budget && (
              <div className="flex items-center gap-2 p-3 bg-red-500/10 rounded-lg border border-red-300/20">
                <ExclamationTriangleIcon className="w-5 h-5 text-red-400" />
                <span className="text-red-300 text-sm">
                  Exceeded budget by {(currentReport.totalSpent - currentReport.budget).toFixed(2)} π
                </span>
              </div>
            )}
          </div>
        </div>

        {/* Monthly Highlights */}
        <div className="bg-white/5 backdrop-blur-md rounded-2xl border border-white/10 p-6">
          <h3 className="text-xl font-bold text-white mb-6">Monthly Highlights</h3>
          
          <div className="space-y-4">
            {currentReport.highlights.map((highlight, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
                className="flex items-center gap-3 p-3 bg-white/5 rounded-lg"
              >
                <div className="w-6 h-6 bg-purple-500/20 rounded-full flex items-center justify-center">
                  <span className="text-purple-400 text-sm font-bold">{index + 1}</span>
                </div>
                <span className="text-gray-300">{highlight}</span>
              </motion.div>
            ))}
          </div>

          {/* Savings Information */}
          <div className="mt-6 pt-6 border-t border-white/10">
            <div className="flex justify-between items-center">
              <span className="text-gray-300">Potential Savings</span>
              <span className="text-green-300 font-bold text-xl">
                {currentReport.savings.toFixed(2)} π
              </span>
            </div>
            <p className="text-gray-400 text-sm mt-2">
              Based on optimized spending patterns
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
