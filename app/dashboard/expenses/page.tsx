'use client'
import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { ExpenseCard } from '@/components/expenses/ExpenseCard'
import { ExpenseListItem } from '@/components/expenses/ExpenseListItem'
import { useExpenseStore } from '@/store/expenseStore'
import { Expense } from '@/types/expense'

export default function ExpensesPage() {
  const { expenses } = useExpenseStore()
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid')
  const [filteredExpenses, setFilteredExpenses] = useState<Expense[]>(expenses)

  useEffect(() => {
    // Apply filters and search here
    setFilteredExpenses(expenses)
  }, [expenses])

  if (filteredExpenses.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-16 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="w-24 h-24 bg-white/10 rounded-full flex items-center justify-center mb-6"
        >
          <span className="text-4xl">📄</span>
        </motion.div>
        <h3 className="text-2xl font-bold text-white mb-2">No expenses yet</h3>
        <p className="text-gray-400 mb-6 max-w-md">
          Start by adding your first expense or scanning a receipt to get started with Orbicron.
        </p>
        <button className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-6 py-3 rounded-xl font-semibold hover:from-purple-700 hover:to-pink-700 transition-all duration-300">
          Add Your First Expense
        </button>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {viewMode === 'grid' ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredExpenses.map((expense, index) => (
            <motion.div
              key={expense.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
            >
              <ExpenseCard expense={expense} />
            </motion.div>
          ))}
        </div>
      ) : (
        <div className="bg-white/5 backdrop-blur-md rounded-2xl border border-white/10 overflow-hidden">
          <div className="divide-y divide-white/10">
            {filteredExpenses.map((expense, index) => (
              <motion.div
                key={expense.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
              >
                <ExpenseListItem expense={expense} />
              </motion.div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
