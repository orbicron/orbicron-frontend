'use client'
import { useState } from 'react'
import { motion } from 'framer-motion'
import { SpendingTrends } from '@/components/analytics/SpendingTrends'
import { CategoryBreakdown } from '@/components/analytics/CategoryBreakdown'
import { MonthlyReports } from '@/components/analytics/MonthlyReports'
import { Achievements } from '@/components/analytics/Acheivments'

export default function AnalyticsPage() {
  const [activeView, setActiveView] = useState<'overview' | 'trends' | 'categories' | 'reports' | 'achievements'>('overview')

  return (
    <div className="space-y-6">
      {/* Tab Navigation */}
      <div className="bg-white/5 backdrop-blur-md rounded-xl border border-white/10 p-2">
        <div className="flex flex-wrap gap-2">
          {[
            { id: 'overview', label: 'Overview', icon: '📊' },
            { id: 'trends', label: 'Trends', icon: '📈' },
            { id: 'categories', label: 'Categories', icon: '🎯' },
            { id: 'reports', label: 'Reports', icon: '📅' },
            { id: 'achievements', label: 'Achievements', icon: '🏆' },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveView(tab.id as any)}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
                activeView === tab.id
                  ? 'bg-purple-500 text-white'
                  : 'text-gray-300 hover:text-white hover:bg-white/10'
              }`}
            >
              <span className="text-lg">{tab.icon}</span>
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Content */}
      <motion.div
        key={activeView}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        {activeView === 'overview' && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <SpendingTrends />
            <CategoryBreakdown />
          </div>
        )}
        {activeView === 'trends' && <SpendingTrends />}
        {activeView === 'categories' && <CategoryBreakdown />}
        {activeView === 'reports' && <MonthlyReports />}
        {activeView === 'achievements' && <Achievements />}
      </motion.div>
    </div>
  )
}
