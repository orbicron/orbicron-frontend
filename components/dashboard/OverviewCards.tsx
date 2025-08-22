'use client'
import { motion } from 'framer-motion'
import { 
  ArrowTrendingUpIcon, 
  ArrowTrendingDownIcon,
  CurrencyDollarIcon,
  ScaleIcon 
} from '@heroicons/react/24/outline'

const overviewData = [
  {
    title: 'Total You Owe',
    amount: '142.50',
    currency: 'π',
    change: '+12.5%',
    changeType: 'increase' as const,
    icon: ArrowTrendingDownIcon,
    color: 'from-red-500 to-pink-500',
    bgColor: 'from-red-500/20 to-pink-500/20',
  },
  {
    title: 'Total Owed to You',
    amount: '287.30',
    currency: 'π',
    change: '+8.2%',
    changeType: 'increase' as const,
    icon: ArrowTrendingUpIcon,
    color: 'from-green-500 to-emerald-500',
    bgColor: 'from-green-500/20 to-emerald-500/20',
  },
  {
    title: 'Net Balance',
    amount: '144.80',
    currency: 'π',
    change: 'You\'re owed',
    changeType: 'positive' as const,
    icon: ScaleIcon,
    color: 'from-blue-500 to-cyan-500',
    bgColor: 'from-blue-500/20 to-cyan-500/20',
  },
  {
    title: 'Pi Token Balance',
    amount: '1,250.00',
    currency: 'π',
    change: 'Available',
    changeType: 'neutral' as const,
    icon: CurrencyDollarIcon,
    color: 'from-purple-500 to-indigo-500',
    bgColor: 'from-purple-500/20 to-indigo-500/20',
  },
]

export const OverviewCards = () => {
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
                item.changeType === 'increase' ? 'text-green-400' :
                item.changeType === 'positive' ? 'text-blue-400' :
                item.changeType === 'neutral' ? 'text-purple-400' :
                'text-gray-400'
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
