'use client'
import { motion } from 'framer-motion'
import { useState } from 'react'
import { 
  EllipsisVerticalIcon, 
  UserGroupIcon, 
  CalendarIcon,
  CurrencyDollarIcon
} from '@heroicons/react/24/outline'
import { Expense } from '@/types/expense'
import { formatDate, formatPiAmount } from '@/lib/utils'

interface ExpenseCardProps {
  expense: Expense
}

const categoryIcons = {
  food: '🍕',
  transport: '🚗',
  accommodation: '🏨',
  entertainment: '🎬',
  shopping: '🛍️',
  other: '📝'
}

const categoryColors = {
  food: 'from-red-500 to-pink-500',
  transport: 'from-blue-500 to-cyan-500',
  accommodation: 'from-purple-500 to-indigo-500',
  entertainment: 'from-green-500 to-emerald-500',
  shopping: 'from-yellow-500 to-orange-500',
  other: 'from-gray-500 to-slate-500'
}

export const ExpenseCard = ({ expense }: ExpenseCardProps) => {
  const [showMenu, setShowMenu] = useState(false)

  return (
    <motion.div
      whileHover={{ y: -5 }}
      className="group relative bg-white/5 backdrop-blur-md rounded-2xl border border-white/10 p-6 hover:border-white/20 transition-all duration-300 overflow-hidden"
    >
      {/* Background gradient effect */}
      <div className={`absolute inset-0 bg-gradient-to-r ${categoryColors[expense.category]} opacity-0 group-hover:opacity-5 transition-opacity duration-300`}></div>
      
      {/* Header */}
      <div className="relative z-10 flex items-start justify-between mb-4">
        <div className={`w-12 h-12 bg-gradient-to-r ${categoryColors[expense.category]} rounded-xl flex items-center justify-center`}>
          <span className="text-2xl">{categoryIcons[expense.category]}</span>
        </div>
        
        <div className="relative">
          <button
            onClick={() => setShowMenu(!showMenu)}
            className="p-2 text-gray-400 hover:text-white rounded-lg hover:bg-white/10 transition-colors"
          >
            <EllipsisVerticalIcon className="w-5 h-5" />
          </button>
          
          {showMenu && (
            <div className="absolute right-0 top-10 w-40 bg-white/10 backdrop-blur-md rounded-xl border border-white/20 shadow-xl z-20">
              <button className="w-full px-4 py-2 text-left text-white hover:bg-white/10 transition-colors first:rounded-t-xl">
                Edit
              </button>
              <button className="w-full px-4 py-2 text-left text-white hover:bg-white/10 transition-colors">
                Duplicate
              </button>
              <button className="w-full px-4 py-2 text-left text-red-300 hover:bg-red-500/20 transition-colors last:rounded-b-xl">
                Delete
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Content */}
      <div className="relative z-10">
        <h3 className="text-xl font-bold text-white mb-2 line-clamp-2">
          {expense.title}
        </h3>
        
        {expense.description && (
          <p className="text-gray-300 text-sm mb-4 line-clamp-2">
            {expense.description}
          </p>
        )}

        {/* Amount */}
        <div className="flex items-center gap-2 mb-4">
          <CurrencyDollarIcon className="w-5 h-5 text-purple-400" />
          <span className="text-2xl font-bold text-white">
            {formatPiAmount(expense.amount)}
          </span>
        </div>

        {/* Details */}
        <div className="space-y-2 text-sm">
          <div className="flex items-center gap-2 text-gray-300">
            <CalendarIcon className="w-4 h-4" />
            <span>{formatDate(expense.date)}</span>
          </div>
          
          <div className="flex items-center gap-2 text-gray-300">
            <UserGroupIcon className="w-4 h-4" />
            <span>{expense.splitBetween.length} people</span>
          </div>
        </div>

        {/* Status */}
        <div className="mt-4 pt-4 border-t border-white/10">
          <div className="flex items-center justify-between">
            <span className={`px-3 py-1 rounded-full text-xs font-medium ${
              expense.currency === 'PI' 
                ? 'bg-purple-500/20 text-purple-300' 
                : 'bg-blue-500/20 text-blue-300'
            }`}>
              {expense.currency} Currency
            </span>
            
            <button className="text-purple-400 hover:text-purple-300 text-sm font-medium transition-colors">
              View Details →
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  )
}
