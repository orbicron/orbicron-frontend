'use client'
import { motion } from 'framer-motion'
import { useState } from 'react'
import { 
  UserIcon, 
  CalendarIcon, 
  CurrencyDollarIcon,
  BoltIcon,
  ExclamationTriangleIcon
} from '@heroicons/react/24/outline'
import { PiPayment } from './PiPayment'
import { formatDate, formatPiAmount } from '@/lib/utils'

// Mock data
const mockDebts = [
  {
    id: '1',
    type: 'owe' as const,
    user: { id: 'u1', username: 'Sarah Chen', avatar: '👩‍💼' },
    amount: 45.60,
    description: 'Dinner at Pizza Palace',
    dueDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 1 week from now
    isOverdue: false,
    groupName: 'Weekend Trip',
    expenseDate: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000), // 2 days ago
  },
  {
    id: '2',
    type: 'owed' as const,
    user: { id: 'u2', username: 'Mike Rodriguez', avatar: '👨‍🎓' },
    amount: 82.30,
    description: 'Uber rides and groceries',
    dueDate: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000), // 3 days from now
    isOverdue: false,
    groupName: 'Roommates',
    expenseDate: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000), // 5 days ago
  },
  {
    id: '3',
    type: 'owe' as const,
    user: { id: 'u3', username: 'Emma Wilson', avatar: '👩‍💻' },
    amount: 23.45,
    description: 'Coffee and snacks',
    dueDate: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000), // Yesterday (overdue)
    isOverdue: true,
    groupName: 'Work Team',
    expenseDate: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000), // 10 days ago
  },
]

export const OutstandingDebts = () => {
  const [selectedDebt, setSelectedDebt] = useState<string | null>(null)
  const [showPayment, setShowPayment] = useState(false)

  const handlePayNow = (debtId: string) => {
    setSelectedDebt(debtId)
    setShowPayment(true)
  }

  return (
    <>
      <div className="space-y-6">
        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-gradient-to-r from-red-500/10 to-pink-500/10 backdrop-blur-md rounded-2xl border border-red-300/20 p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-white">You Owe</h3>
              <div className="w-10 h-10 bg-red-500/20 rounded-lg flex items-center justify-center">
                <ExclamationTriangleIcon className="w-5 h-5 text-red-400" />
              </div>
            </div>
            <div className="text-3xl font-bold text-red-300 mb-2">
              142.50 π
            </div>
            <div className="text-sm text-red-200">
              Across 3 people • 1 overdue
            </div>
          </div>

          <div className="bg-gradient-to-r from-green-500/10 to-emerald-500/10 backdrop-blur-md rounded-2xl border border-green-300/20 p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-white">Owed to You</h3>
              <div className="w-10 h-10 bg-green-500/20 rounded-lg flex items-center justify-center">
                <CurrencyDollarIcon className="w-5 h-5 text-green-400" />
              </div>
            </div>
            <div className="text-3xl font-bold text-green-300 mb-2">
              287.30 π
            </div>
            <div className="text-sm text-green-200">
              From 5 people • All current
            </div>
          </div>
        </div>

        {/* Debts List */}
        <div className="bg-white/5 backdrop-blur-md rounded-2xl border border-white/10">
          <div className="p-6 border-b border-white/10">
            <h2 className="text-2xl font-bold text-white">Outstanding Settlements</h2>
            <p className="text-gray-400 mt-1">Manage your pending payments and requests</p>
          </div>

          <div className="divide-y divide-white/10">
            {mockDebts.map((debt, index) => (
              <motion.div
                key={debt.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
                className={`p-6 hover:bg-white/5 transition-colors ${
                  debt.isOverdue ? 'bg-red-500/5' : ''
                }`}
              >
                <div className="flex items-center justify-between">
                  {/* Left side - User and details */}
                  <div className="flex items-center gap-4">
                    {/* User Avatar */}
                    <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center text-xl">
                      {debt.user.avatar}
                    </div>

                    {/* Details */}
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="text-lg font-semibold text-white">
                          {debt.user.username}
                        </h3>
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                          debt.type === 'owe' 
                            ? 'bg-red-500/20 text-red-300' 
                            : 'bg-green-500/20 text-green-300'
                        }`}>
                          {debt.type === 'owe' ? 'You owe' : 'Owes you'}
                        </span>
                        {debt.isOverdue && (
                          <span className="px-2 py-1 rounded-full text-xs font-medium bg-yellow-500/20 text-yellow-300">
                            Overdue
                          </span>
                        )}
                      </div>
                      
                      <p className="text-gray-300 text-sm mb-2">
                        {debt.description}
                      </p>
                      
                      <div className="flex items-center gap-4 text-xs text-gray-400">
                        <div className="flex items-center gap-1">
                          <CalendarIcon className="w-3 h-3" />
                          <span>Due {formatDate(debt.dueDate)}</span>
                        </div>
                        <div>
                          Group: {debt.groupName}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Right side - Amount and actions */}
                  <div className="text-right">
                    <div className={`text-2xl font-bold mb-2 ${
                      debt.type === 'owe' ? 'text-red-300' : 'text-green-300'
                    }`}>
                      {formatPiAmount(debt.amount)}
                    </div>
                    
                    {debt.type === 'owe' ? (
                      <button
                        onClick={() => handlePayNow(debt.id)}
                        className="flex items-center gap-2 bg-gradient-to-r from-green-600 to-emerald-600 text-white px-4 py-2 rounded-lg font-semibold hover:from-green-700 hover:to-emerald-700 transition-all duration-300"
                      >
                        <BoltIcon className="w-4 h-4" />
                        Pay Now
                      </button>
                    ) : (
                      <div className="flex flex-col gap-2">
                        <button className="bg-purple-600/20 text-purple-300 px-4 py-2 rounded-lg font-medium hover:bg-purple-600/30 transition-colors">
                          Send Reminder
                        </button>
                        <div className="text-xs text-gray-400">
                          Last reminder: 2 days ago
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Pi Payment Modal */}
      {showPayment && selectedDebt && (
        <PiPayment
          debt={mockDebts.find(d => d.id === selectedDebt)!}
          onClose={() => {
            setShowPayment(false)
            setSelectedDebt(null)
          }}
        />
      )}
    </>
  )
}
