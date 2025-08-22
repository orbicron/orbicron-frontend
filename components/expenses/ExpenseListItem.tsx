'use client'
import { motion } from 'framer-motion'
import { Expense } from '@/types/expense'
import { formatDate, formatPiAmount } from '@/lib/utils'
import { 
  EllipsisHorizontalIcon,
  UserGroupIcon,
  CalendarIcon 
} from '@heroicons/react/24/outline'

interface ExpenseListItemProps {
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

export const ExpenseListItem = ({ expense }: ExpenseListItemProps) => {
  return (
    <motion.div
      whileHover={{ backgroundColor: 'rgba(255, 255, 255, 0.05)' }}
      className="flex items-center gap-4 p-6 hover:bg-white/5 transition-colors"
    >
      {/* Category Icon */}
      <div className="w-12 h-12 bg-white/10 rounded-xl flex items-center justify-center flex-shrink-0">
        <span className="text-2xl">{categoryIcons[expense.category]}</span>
      </div>

      {/* Main Content */}
      <div className="flex-1 min-w-0">
        <div className="flex items-start justify-between mb-2">
          <div>
            <h3 className="text-lg font-semibold text-white mb-1 truncate">
              {expense.title}
            </h3>
            {expense.description && (
              <p className="text-gray-400 text-sm truncate">
                {expense.description}
              </p>
            )}
          </div>
          
          <div className="text-right ml-4 flex-shrink-0">
            <div className="text-2xl font-bold text-white">
              {formatPiAmount(expense.amount)}
            </div>
            <div className="text-purple-300 text-sm font-medium">
              {expense.currency}
            </div>
          </div>
        </div>

        {/* Details */}
        <div className="flex items-center gap-6 text-sm text-gray-300">
          <div className="flex items-center gap-1">
            <CalendarIcon className="w-4 h-4" />
            <span>{formatDate(expense.date)}</span>
          </div>
          
          <div className="flex items-center gap-1">
            <UserGroupIcon className="w-4 h-4" />
            <span>{expense.splitBetween.length} people</span>
          </div>
          
          <div className="capitalize">
            {expense.category}
          </div>
        </div>
      </div>

      {/* Actions */}
      <div className="flex items-center gap-2 flex-shrink-0">
        <button className="p-2 text-gray-400 hover:text-white rounded-lg hover:bg-white/10 transition-colors">
          <EllipsisHorizontalIcon className="w-5 h-5" />
        </button>
      </div>
    </motion.div>
  )
}
