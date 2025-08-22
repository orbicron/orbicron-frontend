'use client'
import { useState } from 'react'
import { motion } from 'framer-motion'
import { XMarkIcon } from '@heroicons/react/24/outline'

export const SearchFilters = () => {
  const [selectedCategory, setSelectedCategory] = useState<string[]>([])
  const [dateRange, setDateRange] = useState({ start: '', end: '' })
  const [amountRange, setAmountRange] = useState({ min: '', max: '' })
  const [selectedCurrency, setSelectedCurrency] = useState<string[]>([])

  const categories = [
    { value: 'food', label: 'Food & Dining', icon: '🍕' },
    { value: 'transport', label: 'Transport', icon: '🚗' },
    { value: 'accommodation', label: 'Accommodation', icon: '🏨' },
    { value: 'entertainment', label: 'Entertainment', icon: '🎬' },
    { value: 'shopping', label: 'Shopping', icon: '🛍️' },
    { value: 'other', label: 'Other', icon: '📝' },
  ]

  const currencies = [
    { value: 'PI', label: 'Pi Tokens' },
    { value: 'USD', label: 'US Dollar' },
  ]

  const toggleCategory = (category: string) => {
    setSelectedCategory(prev =>
      prev.includes(category)
        ? prev.filter(c => c !== category)
        : [...prev, category]
    )
  }

  const toggleCurrency = (currency: string) => {
    setSelectedCurrency(prev =>
      prev.includes(currency)
        ? prev.filter(c => c !== currency)
        : [...prev, currency]
    )
  }

  const clearFilters = () => {
    setSelectedCategory([])
    setDateRange({ start: '', end: '' })
    setAmountRange({ min: '', max: '' })
    setSelectedCurrency([])
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="space-y-6"
    >
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-white">Filters</h3>
        <button
          onClick={clearFilters}
          className="flex items-center gap-2 text-gray-400 hover:text-white text-sm transition-colors"
        >
          <XMarkIcon className="w-4 h-4" />
          Clear All
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Categories */}
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-3">
            Categories
          </label>
          <div className="space-y-2">
            {categories.map(category => (
              <button
                key={category.value}
                onClick={() => toggleCategory(category.value)}
                className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg transition-all duration-200 ${
                  selectedCategory.includes(category.value)
                    ? 'bg-purple-500/20 border border-purple-300/30 text-white'
                    : 'bg-white/5 border border-white/10 text-gray-300 hover:text-white hover:bg-white/10'
                }`}
              >
                <span className="text-lg">{category.icon}</span>
                <span className="text-sm">{category.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Date Range */}
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-3">
            Date Range
          </label>
          <div className="space-y-3">
            <input
              type="date"
              value={dateRange.start}
              onChange={(e) => setDateRange(prev => ({ ...prev, start: e.target.value }))}
              className="w-full px-3 py-2 bg-white/10 border border-white/20 rounded-lg text-white text-sm focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              placeholder="Start date"
            />
            <input
              type="date"
              value={dateRange.end}
              onChange={(e) => setDateRange(prev => ({ ...prev, end: e.target.value }))}
              className="w-full px-3 py-2 bg-white/10 border border-white/20 rounded-lg text-white text-sm focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              placeholder="End date"
            />
          </div>
        </div>

        {/* Amount Range */}
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-3">
            Amount Range
          </label>
          <div className="space-y-3">
            <input
              type="number"
              value={amountRange.min}
              onChange={(e) => setAmountRange(prev => ({ ...prev, min: e.target.value }))}
              className="w-full px-3 py-2 bg-white/10 border border-white/20 rounded-lg text-white text-sm focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              placeholder="Min amount"
            />
            <input
              type="number"
              value={amountRange.max}
              onChange={(e) => setAmountRange(prev => ({ ...prev, max: e.target.value }))}
              className="w-full px-3 py-2 bg-white/10 border border-white/20 rounded-lg text-white text-sm focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              placeholder="Max amount"
            />
          </div>
        </div>

        {/* Currency */}
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-3">
            Currency
          </label>
          <div className="space-y-2">
            {currencies.map(currency => (
              <button
                key={currency.value}
                onClick={() => toggleCurrency(currency.value)}
                className={`w-full flex items-center justify-between px-3 py-2 rounded-lg transition-all duration-200 ${
                  selectedCurrency.includes(currency.value)
                    ? 'bg-purple-500/20 border border-purple-300/30 text-white'
                    : 'bg-white/5 border border-white/10 text-gray-300 hover:text-white hover:bg-white/10'
                }`}
              >
                <span className="text-sm">{currency.label}</span>
                <span className="text-xs font-mono">{currency.value}</span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  )
}
