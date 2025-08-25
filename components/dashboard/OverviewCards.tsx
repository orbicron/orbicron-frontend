'use client'
import { motion } from 'framer-motion'
import { 
  ArrowTrendingUpIcon, 
  ArrowTrendingDownIcon,
  CurrencyDollarIcon,
  ScaleIcon 
} from '@heroicons/react/24/outline'
import { useWalletStore } from '@/store/walletStore'
import { format } from 'path'

interface OverviewData {
  totalOwed: number
  totalOwing: number
  netBalance: number
  piBalance: number
  owedChange: number
  owingChange: number
}

interface OverviewCardsProps {
  data?: OverviewData
  loading?: boolean
  piBalance?:number
}

export const OverviewCards = ({ data, loading,piBalance }: OverviewCardsProps) => {
  const { wallet, isConnected } = useWalletStore()
  const formatAmount = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    }).format(amount)
  }

  const formatChange = (change: number) => {
    if (change === 0) return 'No change'
    const sign = change > 0 ? '+' : ''
    return `${sign}${change.toFixed(1)}%`
  }

  // Create dynamic overview data
  const overviewData = data ? [
    {
      title: 'Total You Owe',
      amount: formatAmount(data.totalOwed),
      currency: 'π',
      change: formatAmount(data.owedChange),
      changeType: data.owedChange > 0 ? 'increase' : data.owedChange < 0 ? 'decrease' : 'neutral',
      icon: ArrowTrendingDownIcon,
      color: 'from-red-500 to-pink-500',
      bgColor: 'from-red-500/20 to-pink-500/20',
    },
    {
      title: 'Total Owed to You',
      amount: formatAmount(data.totalOwing),
      currency: 'π',
      change: formatChange(data.owingChange),
      changeType: data.owingChange > 0 ? 'increase' : data.owingChange < 0 ? 'decrease' : 'neutral',
      icon: ArrowTrendingUpIcon,
      color: 'from-green-500 to-emerald-500',
      bgColor: 'from-green-500/20 to-emerald-500/20',
    },
    {
      title: 'Net Balance',
      amount: formatAmount(data.netBalance),
      currency: 'π',
      change: data.netBalance > 0 ? 'You\'re owed' : data.netBalance < 0 ? 'You owe' : 'Even',
      changeType: data.netBalance > 0 ? 'positive' : data.netBalance < 0 ? 'negative' : 'neutral',
      icon: ScaleIcon,
      color: 'from-blue-500 to-cyan-500',
      bgColor: 'from-blue-500/20 to-cyan-500/20',
    },
    {
      title: 'Pi Token Balance',
      amount:  isConnected && wallet?.balance ? 
        formatAmount(wallet.balance.total) : 
        '---',
      currency: 'π',
      change: isConnected ? 
        `${formatAmount(wallet?.balance?.available || 0)} available` : 
        'Connect wallet to view',
      changeType: 'neutral' as const,
      icon: CurrencyDollarIcon,
      color: 'from-purple-500 to-indigo-500',
      bgColor: 'from-purple-500/20 to-indigo-500/20',
    },
  ] : []

  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[...Array(4)].map((_, index) => (
          <div
            key={index}
            className="bg-white/5 backdrop-blur-md rounded-2xl border border-white/10 p-6 animate-pulse"
          >
            <div className="w-12 h-12 bg-white/10 rounded-xl mb-4"></div>
            <div className="h-4 bg-white/10 rounded mb-2 w-3/4"></div>
            <div className="h-8 bg-white/10 rounded mb-2"></div>
            <div className="h-3 bg-white/10 rounded w-1/2"></div>
          </div>
        ))}
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {overviewData.map((item, index) => {
        const Icon = item.icon
        
        return (
          <motion.div
            key={item.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="relative group"
          >
            <div className={`absolute inset-0 bg-gradient-to-r ${item.bgColor} rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300`}></div>
            
            <div className="relative bg-white/5 backdrop-blur-md rounded-2xl border border-white/10 p-6 hover:border-white/20 transition-all duration-300 group-hover:transform group-hover:scale-105">
              {/* Icon */}
              <div className={`w-12 h-12 bg-gradient-to-r ${item.color} rounded-xl flex items-center justify-center mb-4`}>
                <Icon className="w-6 h-6 text-white" />
              </div>

              {/* Title */}
              <h3 className="text-gray-300 text-sm font-medium mb-2">
                {item.title}
              </h3>

              {/* Amount */}
              <div className="flex items-baseline gap-2 mb-2">
                <span className="text-3xl font-bold text-white">
                  {item.amount}
                </span>
                <span className={`text-lg font-semibold bg-gradient-to-r ${item.color} bg-clip-text text-transparent`}>
                  {item.currency}
                </span>
              </div>

              {/* Change indicator */}
              <div className={`text-sm font-medium ${
                item.changeType === 'increase' ? 'text-red-400' :
                item.changeType === 'decrease' ? 'text-green-400' :
                item.changeType === 'positive' ? 'text-blue-400' :
                item.changeType === 'negative' ? 'text-red-400' :
                'text-purple-400'
              }`}>
                {item.change}
              </div>

              {/* Decorative element */}
              <div className={`absolute top-4 right-4 w-2 h-2 bg-gradient-to-r ${item.color} rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 animate-pulse`}></div>
            </div>
          </motion.div>
        )
      })}
    </div>
  )
}
