// components/wallet/WalletConnector.tsx
'use client'
import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useWalletStore } from '@/store/walletStore'
import { 
  WalletIcon, 
  CheckCircleIcon, 
  ExclamationCircleIcon,
  ArrowRightOnRectangleIcon 
} from '@heroicons/react/24/outline'

export const WalletConnector = () => {
  const { 
    isConnected, 
    isConnecting, 
    wallet, 
    error, 
    connectWallet, 
    disconnectWallet, 
    clearError 
  } = useWalletStore()
  
  const [showDetails, setShowDetails] = useState(false)

  const handleConnect = async () => {
    clearError()
    await connectWallet()
  }

  const formatBalance = (balance: number) => {
    return new Intl.NumberFormat('en-US', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    }).format(balance)
  }

  // Connected State
  if (isConnected && wallet) {
    return (
      <div className="relative">
        <motion.button
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          onClick={() => setShowDetails(!showDetails)}
          className="flex items-center gap-3 bg-gradient-to-r from-green-500/20 to-emerald-500/20 backdrop-blur-md px-4 py-2 rounded-xl border border-green-300/30 hover:border-green-300/50 transition-all duration-300"
        >
          <div className="w-8 h-8 bg-gradient-to-r from-green-500 to-emerald-500 rounded-lg flex items-center justify-center">
            <CheckCircleIcon className="w-5 h-5 text-white" />
          </div>
          
          <div className="text-left">
            <div className="text-green-300 font-semibold text-sm">Wallet Connected</div>
            <div className="text-green-200 text-xs">{wallet.address}</div>
          </div>
          
          <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
        </motion.button>

        {/* Wallet Details Dropdown */}
        <AnimatePresence>
          {showDetails && (
            <motion.div
              initial={{ opacity: 0, y: -10, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -10, scale: 0.95 }}
              className="absolute top-full right-0 mt-2 w-80 bg-white/10 backdrop-blur-md rounded-2xl border border-white/20 shadow-2xl z-50"
            >
              <div className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-white font-semibold">Pi Wallet</h3>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                    <span className="text-green-300 text-sm">Connected</span>
                  </div>
                </div>

                {/* Wallet Address */}
                <div className="mb-4 p-3 bg-white/5 rounded-lg">
                  <div className="text-gray-400 text-xs mb-1">Wallet Address</div>
                  <div className="text-white text-sm font-mono">{wallet.address}</div>
                </div>

                {/* Balance Information */}
                {wallet.balance && (
                  <div className="mb-6 space-y-3">
                    <div className="text-gray-300 text-sm font-medium">Balance</div>
                    
                    <div className="grid grid-cols-2 gap-3">
                      <div className="p-3 bg-gradient-to-r from-purple-500/10 to-indigo-500/10 rounded-lg border border-purple-300/20">
                        <div className="text-purple-300 text-xs">Available</div>
                        <div className="text-white font-bold">{formatBalance(wallet.balance.available)} π</div>
                      </div>
                      
                      <div className="p-3 bg-gradient-to-r from-orange-500/10 to-red-500/10 rounded-lg border border-orange-300/20">
                        <div className="text-orange-300 text-xs">Locked</div>
                        <div className="text-white font-bold">{formatBalance(wallet.balance.locked)} π</div>
                      </div>
                    </div>

                    <div className="p-3 bg-gradient-to-r from-blue-500/10 to-cyan-500/10 rounded-lg border border-blue-300/20">
                      <div className="text-blue-300 text-xs">Total Balance</div>
                      <div className="text-white font-bold text-lg">{formatBalance(wallet.balance.total)} π</div>
                    </div>
                  </div>
                )}

                {/* Actions */}
                <div className="flex gap-3">
                  <button
                    onClick={() => {
                      setShowDetails(false)
                      // Navigate to wallet details page if you have one
                    }}
                    className="flex-1 bg-purple-600/20 text-purple-300 py-2 px-4 rounded-lg hover:bg-purple-600/30 transition-colors"
                  >
                    View Details
                  </button>
                  
                  <button
                    onClick={() => {
                      disconnectWallet()
                      setShowDetails(false)
                    }}
                    className="bg-red-600/20 text-red-300 py-2 px-4 rounded-lg hover:bg-red-600/30 transition-colors"
                  >
                    <ArrowRightOnRectangleIcon className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    )
  }

  // Error State
  if (error) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="flex items-center gap-3 bg-gradient-to-r from-red-500/20 to-pink-500/20 backdrop-blur-md px-4 py-2 rounded-xl border border-red-300/30"
      >
        <ExclamationCircleIcon className="w-5 h-5 text-red-400" />
        <div>
          <div className="text-red-300 font-medium text-sm">Connection Failed</div>
          <div className="text-red-200 text-xs">{error}</div>
        </div>
        <button
          onClick={handleConnect}
          className="text-red-300 hover:text-white text-sm font-medium"
        >
          Retry
        </button>
      </motion.div>
    )
  }

  // Connecting State
  if (isConnecting) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="flex items-center gap-3 bg-gradient-to-r from-blue-500/20 to-cyan-500/20 backdrop-blur-md px-4 py-2 rounded-xl border border-blue-300/30"
      >
        <div className="w-5 h-5 border-2 border-blue-400 border-t-transparent rounded-full animate-spin"></div>
        <div className="text-blue-300 font-medium text-sm">Connecting...</div>
      </motion.div>
    )
  }

  // Disconnected State - Connect Button
  return (
    <motion.button
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      onClick={handleConnect}
      className="flex items-center gap-3 bg-gradient-to-r from-purple-500/20 to-pink-500/20 backdrop-blur-md px-4 py-2 rounded-xl border border-purple-300/30 hover:border-purple-300/50 transition-all duration-300 hover:shadow-lg"
    >
      <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg flex items-center justify-center">
        <WalletIcon className="w-5 h-5 text-white" />
      </div>
      
      <div className="text-left">
        <div className="text-purple-300 font-semibold text-sm">Connect Wallet</div>
        <div className="text-purple-200 text-xs">Pi Network</div>
      </div>
    </motion.button>
  )
}
