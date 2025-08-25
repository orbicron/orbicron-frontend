// components/expenses/AddExpenseModal.tsx
'use client'
import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useForm } from 'react-hook-form'
import { 
  XMarkIcon, 
  CurrencyDollarIcon,
  TagIcon,
  DocumentTextIcon,
  MinusIcon
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
  { value: 'food', label: 'Food & Dining', icon: '🍕' },
  { value: 'transport', label: 'Transportation', icon: '🚗' },
  { value: 'entertainment', label: 'Entertainment', icon: '🎬' },
  { value: 'shopping', label: 'Shopping', icon: '🛍️' },
  { value: 'accommodation', label: 'Accommodation', icon: '🏨' },
  { value: 'groceries', label: 'Groceries', icon: '🛒' },
  { value: 'health', label: 'Healthcare', icon: '⚕️' },
  { value: 'other', label: 'Other', icon: '📝' },
]

export const AddExpenseModal = ({ isOpen, onClose, onSuccess }: AddExpenseModalProps) => {
  const { apiCall } = useApiClient()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [isMobile, setIsMobile] = useState(false)
  
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
      category: 'food',
      description: ''
    }
  })

  const selectedCategory = watch('category')
  const selectedCategoryData = categories.find(cat => cat.value === selectedCategory)

  // Check if mobile
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768)
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  // Disable body scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => {
      document.body.style.overflow = ''
    }
  }, [isOpen])

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

  // Animation variants for different screen sizes
  const mobileVariants = {
    hidden: { 
      opacity: 0, 
      y: '100%',
      transition: { duration: 0.3 }
    },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.3, ease: 'easeOut' }
    },
    exit: { 
      opacity: 0, 
      y: '100%',
      transition: { duration: 0.25, ease: 'easeIn' }
    }
  }

  const desktopVariants = {
    hidden: { 
      opacity: 0, 
      scale: 0.9,
      y: 20,
      transition: { duration: 0.2 }
    },
    visible: { 
      opacity: 1, 
      scale: 1,
      y: 0,
      transition: { duration: 0.2, ease: 'easeOut' }
    },
    exit: { 
      opacity: 0, 
      scale: 0.9,
      y: 20,
      transition: { duration: 0.15, ease: 'easeIn' }
    }
  }

  return (
    <AnimatePresence mode="wait">
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50"
            onClick={handleClose}
          />

          {/* Modal Container - Responsive positioning */}
          <div className="fixed inset-0 z-50 flex items-end md:items-center md:justify-center p-0 md:p-4">
            <motion.div
              variants={isMobile ? mobileVariants : desktopVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              className={`
                w-full max-w-2xl mx-auto bg-slate-900/95 backdrop-blur-md border border-white/20 shadow-2xl
                ${isMobile 
                  ? 'rounded-t-3xl h-[90vh] max-h-[90vh] overflow-y-auto' 
                  : 'rounded-2xl max-h-[85vh] overflow-y-auto'
                }
              `}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Mobile Handle Bar */}
              {isMobile && (
                <div className="flex justify-center pt-3 pb-2">
                  <div className="w-12 h-1 bg-white/30 rounded-full"></div>
                </div>
              )}

              {/* Header */}
              <div className="sticky top-0 bg-slate-900/95 backdrop-blur-md border-b border-white/10 p-6 pb-4">
                <div className="flex items-center justify-between">
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
                    {isMobile ? (
                      <MinusIcon className="w-6 h-6" />
                    ) : (
                      <XMarkIcon className="w-6 h-6" />
                    )}
                  </button>
                </div>
              </div>

              {/* Form Content */}
              <div className="p-6">
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
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
                  <div className="grid grid-cols-3 gap-4">
                    <div className="col-span-2">
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

                  {/* Category Selection */}
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-3">
                      <TagIcon className="w-4 h-4 inline mr-1" />
                      Category *
                    </label>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                      {categories.map((category) => (
                        <label
                          key={category.value}
                          className={`flex flex-col items-center gap-2 p-3 rounded-xl cursor-pointer transition-all duration-200 ${
                            selectedCategory === category.value
                              ? 'bg-gradient-to-r from-purple-500/30 to-pink-500/30 border border-purple-300/50 text-white scale-105'
                              : 'bg-white/5 border border-white/10 text-gray-300 hover:bg-white/10 hover:border-white/20 hover:scale-102'
                          }`}
                        >
                          <input
                            {...register('category', { required: 'Please select a category' })}
                            type="radio"
                            value={category.value}
                            className="sr-only"
                          />
                          <span className="text-2xl">{category.icon}</span>
                          <span className="text-xs font-medium text-center leading-tight">{category.label}</span>
                        </label>
                      ))}
                    </div>
                    {errors.category && (
                      <p className="text-red-400 text-sm mt-2">{errors.category.message}</p>
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
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="bg-red-500/10 border border-red-300/20 rounded-xl p-4"
                    >
                      <p className="text-red-400 text-sm">{error}</p>
                    </motion.div>
                  )}
                </form>
              </div>

              {/* Sticky Footer with Actions */}
              <div className="sticky bottom-0 bg-slate-900/95 backdrop-blur-md border-t border-white/10 p-6">
                <div className={`flex gap-3 ${isMobile ? 'flex-col-reverse' : ''}`}>
                  <button
                    type="button"
                    onClick={handleClose}
                    className={`${isMobile ? 'w-full' : 'flex-1'} px-6 py-3 bg-white/10 text-gray-300 rounded-xl font-semibold border border-white/20 hover:bg-white/20 hover:text-white transition-all duration-300`}
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    form="expense-form"
                    onClick={handleSubmit(onSubmit)}
                    disabled={loading}
                    className={`${isMobile ? 'w-full' : 'flex-1'} px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-xl font-semibold hover:from-purple-700 hover:to-pink-700 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed`}
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
              </div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  )
}
