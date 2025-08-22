'use client'
import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { XMarkIcon, BoltIcon, ShieldCheckIcon } from '@heroicons/react/24/outline'
import { usePiSDK } from '@/hooks/usePiSDK'
import { formatPiAmount } from '@/lib/utils'

interface Debt {
  id: string
  type: 'owe' | 'owed'
  user: { id: string; username: string; avatar: string }
  amount: number
  description: string
  groupName: string
}

interface PiPaymentProps {
  debt: Debt
  onClose: () => void
}

export const PiPayment = ({ debt, onClose }: PiPaymentProps) => {
  const { piSDK, user } = usePiSDK()
  const [isProcessing, setIsProcessing] = useState(false)
  const [paymentStatus, setPaymentStatus] = useState<'idle' | 'processing' | 'success' | 'error'>('idle')
  const [paymentLog, setPaymentLog] = useState<string[]>([])
  const [memo, setMemo] = useState(`Settlement: ${debt.description}`)

  const addLog = (message: string) => {
    setPaymentLog(prev => [...prev, `${new Date().toLocaleTimeString()}: ${message}`])
  }

  const handlePayment = async () => {
    if (!piSDK || !user) {
      addLog('❌ Pi SDK not available')
      return
    }

    setIsProcessing(true)
    setPaymentStatus('processing')
    addLog('🚀 Initiating Pi payment...')

    try {
      const paymentData = {
        amount: debt.amount,
        memo: memo,
        metadata: {
          type: 'settlement',
          debtId: debt.id,
          groupName: debt.groupName,
          recipientId: debt.user.id,
          timestamp: Date.now()
        }
      }

      addLog(`💰 Creating payment: ${formatPiAmount(debt.amount)}`)

      const payment = await piSDK.createPayment(paymentData, {
        onReadyForServerApproval: (paymentId: string) => {
          addLog(`✅ Payment approved by Pi Network: ${paymentId}`)
          
          // In a real app, you'd call your backend here
          // For demo purposes, we'll simulate server approval
          setTimeout(() => {
            addLog('🔄 Server processing payment...')
          }, 1000)
        },
        
        onReadyForServerCompletion: (paymentId: string, txid: string) => {
          addLog(`🎉 Payment completed! TxID: ${txid}`)
          setPaymentStatus('success')
          
          // Store payment record
          const paymentRecord = {
            paymentId,
            txid,
            amount: debt.amount,
            recipientId: debt.user.id,
            debtId: debt.id,
            status: 'completed',
            timestamp: Date.now()
          }
          
          localStorage.setItem(`settlement_${paymentId}`, JSON.stringify(paymentRecord))
          addLog('💾 Payment recorded successfully')
          
          // Auto-close after success
          setTimeout(() => {
            onClose()
          }, 3000)
        },
        
        onCancel: (paymentId: string) => {
          addLog(`❌ Payment cancelled: ${paymentId}`)
          setPaymentStatus('error')
          setIsProcessing(false)
        },
        
        onError: (error: any, payment?: any) => {
          addLog(`💥 Payment error: ${error.message || error}`)
          setPaymentStatus('error')
          setIsProcessing(false)
          console.error('Payment error details:', error, payment)
        }
      })

    } catch (error: any) {
      addLog(`🚨 Exception: ${error.message}`)
      setPaymentStatus('error')
      setIsProcessing(false)
    }
  }

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 20 }}
          className="bg-white/10 backdrop-blur-md rounded-2xl border border-white/20 w-full max-w-lg p-6"
        >
          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-white">Pi Payment</h2>
            <button
              onClick={onClose}
              disabled={isProcessing}
              className="p-2 text-gray-400 hover:text-white rounded-lg hover:bg-white/10 transition-colors disabled:opacity-50"
            >
              <XMarkIcon className="w-6 h-6" />
            </button>
          </div>

          {/* Payment Details */}
          <div className="bg-white/5 rounded-xl p-4 mb-6">
            <div className="flex items-center gap-4 mb-4">
              <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center text-xl">
                {debt.user.avatar}
              </div>
              <div>
                <div className="text-white font-semibold">Pay {debt.user.username}</div>
                <div className="text-gray-400 text-sm">{debt.groupName}</div>
              </div>
            </div>
            
            <div className="border-t border-white/10 pt-4">
              <div className="flex justify-between items-center mb-2">
                <span className="text-gray-300">Amount:</span>
                <span className="text-2xl font-bold text-green-300">
                  {formatPiAmount(debt.amount)}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-300">For:</span>
                <span className="text-white">{debt.description}</span>
              </div>
            </div>
          </div>

          {/* Memo Input */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Payment Memo (Optional)
            </label>
            <input
              type="text"
              value={memo}
              onChange={(e) => setMemo(e.target.value)}
              className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              placeholder="Add a note to this payment..."
              disabled={isProcessing}
            />
          </div>

          {/* Payment Status */}
          {paymentStatus !== 'idle' && (
            <div className={`mb-6 p-4 rounded-xl border ${
              paymentStatus === 'success' ? 'bg-green-500/10 border-green-300/30' :
              paymentStatus === 'error' ? 'bg-red-500/10 border-red-300/30' :
              'bg-blue-500/10 border-blue-300/30'
            }`}>
              <div className={`font-semibold mb-2 ${
                paymentStatus === 'success' ? 'text-green-300' :
                paymentStatus === 'error' ? 'text-red-300' :
                'text-blue-300'
              }`}>
                {paymentStatus === 'success' ? '✅ Payment Successful!' :
                 paymentStatus === 'error' ? '❌ Payment Failed' :
                 '⏳ Processing Payment...'}
              </div>
              
              {/* Payment Log */}
              <div className="bg-black/20 rounded-lg p-3 max-h-32 overflow-y-auto">
                {paymentLog.map((log, index) => (
                  <div key={index} className="text-xs text-gray-300 font-mono">
                    {log}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Security Notice */}
          <div className="flex items-center gap-2 mb-6 p-3 bg-purple-500/10 rounded-lg border border-purple-300/20">
            <ShieldCheckIcon className="w-5 h-5 text-purple-400" />
            <div className="text-sm">
              <div className="text-purple-300 font-medium">Secure Pi Network Payment</div>
              <div className="text-purple-200">Protected by blockchain encryption</div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-4">
            <button
              onClick={onClose}
              disabled={isProcessing}
              className="flex-1 px-6 py-3 bg-white/10 text-white rounded-xl font-semibold hover:bg-white/20 transition-colors disabled:opacity-50"
            >
              Cancel
            </button>
            <button
              onClick={handlePayment}
              disabled={isProcessing || paymentStatus === 'success'}
              className="flex-1 flex items-center justify-center gap-2 bg-gradient-to-r from-green-600 to-emerald-600 text-white px-6 py-3 rounded-xl font-semibold hover:from-green-700 hover:to-emerald-700 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isProcessing ? (
                <>
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  Processing...
                </>
              ) : paymentStatus === 'success' ? (
                'Completed!'
              ) : (
                <>
                  <BoltIcon className="w-5 h-5" />
                  Pay {formatPiAmount(debt.amount)}
                </>
              )}
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  )
}
