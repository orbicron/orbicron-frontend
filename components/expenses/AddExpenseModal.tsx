// components/expenses/AddExpenseModal.tsx
'use client'
import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useForm } from 'react-hook-form'
import { 
  XMarkIcon, 
  CurrencyDollarIcon,
  TagIcon,
  DocumentTextIcon
} from '@heroicons/react/24/outline'
import { useApiClient } from '@/hooks/useApiClient'

interface AddExpenseModalProps {
  isOpen: boolean
  onClose: () => void
  onSuccess: () => void
}

interface ExpenseFormData {
  title: string
  amount: number
  currency: string
  category: string
  description?: string
}

const categories = [
  { value: 'food', label: '🍕 Food & Dining', icon: '🍕' },
  { value: 'transport', label: '🚗 Transportation', icon: '🚗' },
  { value: 'entertainment', label: '🎬 Entertainment', icon: '🎬' },
  { value: 'shopping', label: '🛍️ Shopping', icon: '🛍️' },
  { value: 'accommodation', label: '🏨 Accommodation', icon: '🏨' },
  { value: 'groceries', label: '🛒 Groceries', icon: '🛒' },
  { value: 'health', label: '⚕️ Healthcare', icon: '⚕️' },
  { value: 'other', label: '📝 Other', icon: '📝' },
]

export const AddExpenseModal = ({ isOpen, onClose, onSuccess }: AddExpenseModalProps) => {
  const { apiCall } = useApiClient()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  
  const { 
    register, 
    handleSubmit, 
    formState: { errors }, 
    reset, 
    watch 
  } = useForm<ExpenseFormData>({
    defaultValues: {
      title: '',
      amount: 0,
      currency: 'PI',
      category: '',
      description: ''
    }
  })

  const selectedCategory = watch('category')
  const selectedCategoryData = categories.find(cat => cat.value === selectedCategory)

  const onSubmit = async (data: ExpenseFormData) => {
    setLoading(true)
    setError(null)

    try {
      const response = await apiCall('/api/expenses', {
        method: 'POST',
        body: JSON.stringify({
          title: data.title,
          amount: Number(data.amount),
          currency: data.currency,
          category: data.category,
          description: data.description || null
        })
      })

      if (response.ok) {
        const result = await response.json()
        console.log('Expense created successfully:', result)
        
        // Reset form and close modal
        reset()
        onSuccess()
        onClose()
      } else {
        const errorData = await response.json()
        setError(errorData.error || 'Failed to create expense')
      }
    } catch (err: any) {
      console.error('Expense creation error:', err)
      setError('Network error. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  const handleClose = () => {
    reset()
    setError(null)
    onClose()
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-black/50 backdrop-blur-sm"
            onClick={handleClose}
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="relative bg-white/10 backdrop-blur-md rounded-2xl border border-white/20 w-full max-w-md p-6 shadow-2xl"
          >
            {/* Header */}
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl flex items-center justify-center">
                  <CurrencyDollarIcon className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h2 className="text-xl font-bold text-white">Add New Expense</h2>
                  <p className="text-purple-300 text-sm">Track your spending</p>
                </div>
              </div>

              <button
                onClick={handleClose}
                className="p-2 text-gray-400 hover:text-white rounded-lg hover:bg-white/10 transition-colors"
              >
                <XMarkIcon className="w-6 h-6" />
              </button>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
              {/* Title */}
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  <DocumentTextIcon className="w-4 h-4 inline mr-1" />
                  Expense Title *
                </label>
                <input
                  {...register('title', { 
                    required: 'Title is required',
                    minLength: { value: 3, message: 'Title must be at least 3 characters' }
                  })}
                  type="text"
                  placeholder="e.g., Dinner at Pizza Palace"
                  className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300"
                />
                {errors.title && (
                  <p className="text-red-400 text-sm mt-1">{errors.title.message}</p>
                )}
              </div>

              {/* Amount & Currency */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Amount *
                  </label>
                  <input
                    {...register('amount', { 
                      required: 'Amount is required',
                      min: { value: 0.01, message: 'Amount must be greater than 0' }
                    })}
                    type="number"
                    step="0.01"
                    min="0"
                    placeholder="0.00"
                    className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300"
                  />
                  {errors.amount && (
                    <p className="text-red-400 text-sm mt-1">{errors.amount.message}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Currency
                  </label>
                  <select
                    {...register('currency')}
                    className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300 appearance-none cursor-pointer"
                  >
                    <option value="PI" className="bg-slate-800">π Pi</option>
                    <option value="USD" className="bg-slate-800">$ USD</option>
                    <option value="EUR" className="bg-slate-800">€ EUR</option>
                  </select>
                </div>
              </div>

              {/* Category */}
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  <TagIcon className="w-4 h-4 inline mr-1" />
                  Category *
                </label>
                <div className="grid grid-cols-2 gap-2">
                  {categories.map((category) => (
                    <label
                      key={category.value}
                      className={`flex items-center gap-2 p-3 rounded-lg cursor-pointer transition-all duration-200 ${
                        selectedCategory === category.value
                          ? 'bg-gradient-to-r from-purple-500/30 to-pink-500/30 border border-purple-300/50 text-white'
                          : 'bg-white/5 border border-white/10 text-gray-300 hover:bg-white/10 hover:border-white/20'
                      }`}
                    >
                      <input
                        {...register('category', { required: 'Please select a category' })}
                        type="radio"
                        value={category.value}
                        className="sr-only"
                      />
                      <span className="text-lg">{category.icon}</span>
                      <span className="text-sm font-medium truncate">{category.label.replace(/^[^\s]+ /, '')}</span>
                    </label>
                  ))}
                </div>
                {errors.category && (
                  <p className="text-red-400 text-sm mt-1">{errors.category.message}</p>
                )}
              </div>

              {/* Description (Optional) */}
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Description (Optional)
                </label>
                <textarea
                  {...register('description')}
                  rows={3}
                  placeholder="Add any additional details..."
                  className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300 resize-none"
                />
              </div>

              {/* Error Message */}
              {error && (
                <div className="bg-red-500/10 border border-red-300/20 rounded-lg p-3">
                  <p className="text-red-400 text-sm">{error}</p>
                </div>
              )}

              {/* Action Buttons */}
              <div className="flex gap-3 pt-4">
                <button
                  type="button"
                  onClick={handleClose}
                  className="flex-1 px-6 py-3 bg-white/10 text-gray-300 rounded-xl font-semibold border border-white/20 hover:bg-white/20 hover:text-white transition-all duration-300"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={loading}
                  className="flex-1 px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-xl font-semibold hover:from-purple-700 hover:to-pink-700 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {loading ? (
                    <div className="flex items-center justify-center gap-2">
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      Creating...
                    </div>
                  ) : (
                    'Add Expense'
                  )}
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  )
}
