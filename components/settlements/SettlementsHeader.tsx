'use client'
import { useState } from 'react'
import { motion } from 'framer-motion'
import { 
  BanknotesIcon,
  ArrowPathIcon,
  BoltIcon,
  DocumentTextIcon,
  MagnifyingGlassIcon,
  FunnelIcon
} from '@heroicons/react/24/outline'
import { QuickSettleModal } from './QuickSettleModal'
import { PaymentRequestModal } from './PaymentRequestModal'

export const SettlementsHeader = () => {
  const [showQuickSettle, setShowQuickSettle] = useState(false)
  const [showPaymentRequest, setShowPaymentRequest] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const [showFilters, setShowFilters] = useState(false)

  return (
    <>
      <div className="bg-white/5 backdrop-blur-md rounded-2xl border border-white/10 p-6">
        {/* Header Title and Stats */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between mb-6">
          <div>
            <h1 className="text-3xl font-bold text-white mb-2">Settlements</h1>
            <div className="flex items-center gap-6 text-sm">
              <span className="text-red-300">
                <span className="font-semibold">142.50 π</span> You Owe
              </span>
              <span className="text-green-300">
                <span className="font-semibold">287.30 π</span> Owed to You
              </span>
              <span className="text-blue-300">
                <span className="font-semibold">144.80 π</span> Net Balance
              </span>
            </div>
          </div>

          {/* Quick Action Buttons */}
          <div className="flex items-center gap-3 mt-4 lg:mt-0">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setShowQuickSettle(true)}
              className="flex items-center gap-2 bg-gradient-to-r from-green-600 to-emerald-600 text-white px-6 py-3 rounded-xl font-semibold hover:from-green-700 hover:to-emerald-700 transition-all duration-300"
            >
              <BoltIcon className="w-5 h-5" />
              Quick Settle
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setShowPaymentRequest(true)}
              className="flex items-center gap-2 bg-white/10 backdrop-blur-md text-white px-6 py-3 rounded-xl font-semibold border border-white/20 hover:bg-white/20 transition-all duration-300"
            >
              <DocumentTextIcon className="w-5 h-5" />
              Request Payment
            </motion.button>
          </div>
        </div>

        {/* Search and Filters */}
        <div className="flex flex-col lg:flex-row gap-4 lg:items-center justify-between">
          {/* Search Bar */}
          <div className="relative flex-1 max-w-md">
            <MagnifyingGlassIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search settlements..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-3 bg-white/10 backdrop-blur-md border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            />
          </div>

          {/* Tab Navigation */}
          <div className="flex items-center bg-white/10 backdrop-blur-md rounded-xl border border-white/20 p-1">
            <button className="px-4 py-2 rounded-lg bg-purple-500 text-white font-medium">
              Outstanding
            </button>
            <button className="px-4 py-2 rounded-lg text-gray-300 hover:text-white transition-colors">
              History
            </button>
            <button className="px-4 py-2 rounded-lg text-gray-300 hover:text-white transition-colors">
              Requests
            </button>
          </div>

          {/* Filters Button */}
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white/10 text-gray-300 hover:text-white hover:bg-white/20 transition-all duration-200"
          >
            <FunnelIcon className="w-5 h-5" />
            Filters
          </button>
        </div>

        {/* Quick Stats Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
          <div className="bg-gradient-to-r from-red-500/20 to-pink-500/20 rounded-xl p-4 border border-red-300/30">
            <div className="text-2xl font-bold text-red-300">5</div>
            <div className="text-sm text-red-200">Outstanding Debts</div>
          </div>
          <div className="bg-gradient-to-r from-green-500/20 to-emerald-500/20 rounded-xl p-4 border border-green-300/30">
            <div className="text-2xl font-bold text-green-300">8</div>
            <div className="text-sm text-green-200">Pending Receipts</div>
          </div>
          <div className="bg-gradient-to-r from-blue-500/20 to-cyan-500/20 rounded-xl p-4 border border-blue-300/30">
            <div className="text-2xl font-bold text-blue-300">23</div>
            <div className="text-sm text-blue-200">Completed This Month</div>
          </div>
          <div className="bg-gradient-to-r from-purple-500/20 to-indigo-500/20 rounded-xl p-4 border border-purple-300/30">
            <div className="text-2xl font-bold text-purple-300">1,245 π</div>
            <div className="text-sm text-purple-200">Total Settled</div>
          </div>
        </div>
      </div>

      {/* Modals */}
      <QuickSettleModal 
        isOpen={showQuickSettle} 
        onClose={() => setShowQuickSettle(false)} 
      />
      <PaymentRequestModal 
        isOpen={showPaymentRequest} 
        onClose={() => setShowPaymentRequest(false)} 
      />
    </>
  )
}
