'use client'
import { motion } from 'framer-motion'
import { 
  CheckCircleIcon, 
  XCircleIcon, 
  ClockIcon, 
  ArrowRightIcon,
  LinkIcon
} from '@heroicons/react/24/outline'
import { formatDate, formatPiAmount } from '@/lib/utils'

// Mock settlement history data
const mockHistory = [
  {
    id: 'tx1',
    type: 'sent' as const,
    user: { username: 'Sarah Chen', avatar: '👩‍💼' },
    amount: 45.60,
    description: 'Dinner at Pizza Palace',
    status: 'completed' as const,
    timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000), // 2 hours ago
    txHash: '0x1234...5678',
    groupName: 'Weekend Trip',
    piTransactionId: 'pi_tx_abc123'
  },
  {
    id: 'tx2',
    type: 'received' as const,
    user: { username: 'Mike Rodriguez', avatar: '👨‍🎓' },
    amount: 23.40,
    description: 'Coffee and snacks',
    status: 'completed' as const,
    timestamp: new Date(Date.now() - 5 * 60 * 60 * 1000), // 5 hours ago
    txHash: '0x5678...9012',
    groupName: 'Work Team',
    piTransactionId: 'pi_tx_def456'
  },
  {
    id: 'tx3',
    type: 'sent' as const,
    user: { username: 'Emma Wilson', avatar: '👩‍💻' },
    amount: 67.80,
    description: 'Uber rides',
    status: 'pending' as const,
    timestamp: new Date(Date.now() - 30 * 60 * 1000), // 30 minutes ago
    txHash: null,
    groupName: 'Roommates',
    piTransactionId: 'pi_tx_ghi789'
  },
  {
    id: 'tx4',
    type: 'received' as const,
    user: { username: 'David Park', avatar: '👨‍💼' },
    amount: 15.25,
    description: 'Lunch split',
    status: 'failed' as const,
    timestamp: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000), // 1 day ago
    txHash: null,
    groupName: 'Team Lunch',
    piTransactionId: 'pi_tx_jkl012'
  },
]

export const SettlementHistory = () => {
  const openPiBlockExplorer = (txHash: string) => {
    // Open Pi Network block explorer (when available)
    window.open(`https://explorer.pi.network/tx/${txHash}`, '_blank')
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed':
        return <CheckCircleIcon className="w-5 h-5 text-green-400" />
      case 'pending':
        return <ClockIcon className="w-5 h-5 text-yellow-400" />
      case 'failed':
        return <XCircleIcon className="w-5 h-5 text-red-400" />
      default:
        return <ClockIcon className="w-5 h-5 text-gray-400" />
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return 'text-green-300 bg-green-500/20 border-green-300/30'
      case 'pending':
        return 'text-yellow-300 bg-yellow-500/20 border-yellow-300/30'
      case 'failed':
        return 'text-red-300 bg-red-500/20 border-red-300/30'
      default:
        return 'text-gray-300 bg-gray-500/20 border-gray-300/30'
    }
  }

  return (
    <div className="space-y-6">
      {/* Summary Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white/5 backdrop-blur-md rounded-xl border border-white/10 p-6">
          <h3 className="text-lg font-semibold text-white mb-2">This Month</h3>
          <div className="text-3xl font-bold text-green-300">456.80 π</div>
          <div className="text-sm text-gray-400">23 transactions completed</div>
        </div>
        <div className="bg-white/5 backdrop-blur-md rounded-xl border border-white/10 p-6">
          <h3 className="text-lg font-semibold text-white mb-2">Total Sent</h3>
          <div className="text-3xl font-bold text-blue-300">1,234.50 π</div>
          <div className="text-sm text-gray-400">156 payments made</div>
        </div>
        <div className="bg-white/5 backdrop-blur-md rounded-xl border border-white/10 p-6">
          <h3 className="text-lg font-semibold text-white mb-2">Total Received</h3>
          <div className="text-3xl font-bold text-purple-300">987.25 π</div>
          <div className="text-sm text-gray-400">89 payments received</div>
        </div>
      </div>

      {/* Transaction History */}
      <div className="bg-white/5 backdrop-blur-md rounded-2xl border border-white/10">
        <div className="p-6 border-b border-white/10">
          <h2 className="text-2xl font-bold text-white">Settlement History</h2>
          <p className="text-gray-400 mt-1">Your complete Pi token transaction history</p>
        </div>

        <div className="divide-y divide-white/10">
          {mockHistory.map((transaction, index) => (
            <motion.div
              key={transaction.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
              className="p-6 hover:bg-white/5 transition-colors"
            >
              <div className="flex items-center justify-between">
                {/* Left side - Transaction details */}
                <div className="flex items-center gap-4">
                  {/* Direction indicator */}
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                    transaction.type === 'sent' 
                      ? 'bg-red-500/20 text-red-400' 
                      : 'bg-green-500/20 text-green-400'
                  }`}>
                    <ArrowRightIcon className={`w-5 h-5 ${
                      transaction.type === 'sent' ? 'rotate-0' : 'rotate-180'
                    }`} />
                  </div>

                  {/* User and details */}
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
                      {transaction.user.avatar}
                    </div>
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="text-white font-semibold">
                          {transaction.type === 'sent' ? 'Paid' : 'Received from'} {transaction.user.username}
                        </h3>
                        <span className={`px-2 py-1 rounded-full text-xs font-medium border ${getStatusColor(transaction.status)}`}>
                          {getStatusIcon(transaction.status)}
                          <span className="ml-1 capitalize">{transaction.status}</span>
                        </span>
                      </div>
                      <p className="text-gray-300 text-sm mb-1">{transaction.description}</p>
                      <div className="flex items-center gap-4 text-xs text-gray-400">
                        <span>{formatDate(transaction.timestamp)}</span>
                        <span>{transaction.groupName}</span>
                        {transaction.txHash && (
                          <button
                            onClick={() => openPiBlockExplorer(transaction.txHash!)}
                            className="flex items-center gap-1 text-purple-400 hover:text-purple-300 transition-colors"
                          >
                            <LinkIcon className="w-3 h-3" />
                            View on Pi Explorer
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Right side - Amount */}
                <div className="text-right">
                  <div className={`text-2xl font-bold ${
                    transaction.type === 'sent' ? 'text-red-300' : 'text-green-300'
                  }`}>
                    {transaction.type === 'sent' ? '-' : '+'}
                    {formatPiAmount(transaction.amount)}
                  </div>
                  {transaction.piTransactionId && (
                    <div className="text-xs text-gray-400 mt-1 font-mono">
                      ID: {transaction.piTransactionId}
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Load more */}
        <div className="p-6 text-center border-t border-white/10">
          <button className="bg-purple-600/20 text-purple-300 px-6 py-3 rounded-xl font-semibold hover:bg-purple-600/30 transition-colors">
            Load More Transactions
          </button>
        </div>
      </div>
    </div>
  )
}
