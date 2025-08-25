// components/payments/QuickPay.tsx - Updated with URL parsing and editable address

'use client'
import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  QrCodeIcon, 
  CurrencyDollarIcon, 
  CheckCircleIcon,
  XMarkIcon,
  CameraIcon,
  KeyIcon,
  ArrowRightIcon,
  ArrowLeftIcon,
  PencilIcon
} from '@heroicons/react/24/outline'
import { useApiClient } from '@/hooks/useApiClient'

// QR Scanner component
interface BarcodeScanner {
  onUpdate: (err: any, result?: { text: string }) => void
  width?: number
  height?: number
  facingMode?: string
}

const BarcodeScanner: React.ComponentType<BarcodeScanner> = 
  typeof window !== 'undefined' 
    ? require('react-qr-barcode-scanner').default 
    : () => null

interface QuickPayProps {
  isOpen: boolean
  onClose: () => void
  onPaymentSuccess?: () => void
}

type PaymentStage = 'scan' | 'details' | 'confirm' | 'success'

export const QuickPay = ({ isOpen, onClose, onPaymentSuccess }: QuickPayProps) => {
  const { apiCall } = useApiClient()
  
  // Stage management
  const [currentStage, setCurrentStage] = useState<PaymentStage>('scan')
  
  // Form state
  const [scannerActive, setScannerActive] = useState(true)
  const [receiverAddress, setReceiverAddress] = useState('')
  const [isEditingAddress, setIsEditingAddress] = useState(false)
  const [amount, setAmount] = useState('')
  const [currency, setCurrency] = useState('PI')
  const [category, setCategory] = useState('')
  const [description, setDescription] = useState('')
  
  // UI state
  const [paymentProcessing, setPaymentProcessing] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [isMobile, setIsMobile] = useState(false)

  // Check if mobile
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768)
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  // Reset form when modal opens/closes
  useEffect(() => {
    if (isOpen) {
      setCurrentStage('scan')
      setScannerActive(true)
      setReceiverAddress('')
      setIsEditingAddress(false)
      setAmount('')
      setCategory('')
      setDescription('')
      setError(null)
    }
  }, [isOpen])

  // 🆕 Parse Pi Network payment URL
  const parsePaymentUrl = (url: string): string | null => {
    try {
      // Handle Pi Network payment URL format: https://wallet.pinet.com/pay-request?publicKey=...
      if (url.includes('wallet.pinet.com/pay-request') || url.includes('pi.network/pay')) {
        const urlObj = new URL(url)
        const publicKey = urlObj.searchParams.get('publicKey')
        
        if (publicKey) {
          console.log('Extracted public key from URL:', publicKey)
          return publicKey
        }
      }
      
      // If it's already a public key (starts with G and is long enough)
      if (url.match(/^G[A-Z0-9]{55}$/)) {
        return url
      }
      
      // Try to extract any parameter that looks like a public key
      const publicKeyMatch = url.match(/publicKey=([A-Z0-9]+)/i)
      if (publicKeyMatch) {
        return publicKeyMatch[1]
      }
      
      // Return the original if it looks like a wallet address
      if (url.length > 20 && url.match(/^[A-Za-z0-9]+$/)) {
        return url
      }
      
      return null
    } catch (error) {
      console.error('Error parsing payment URL:', error)
      return null
    }
  }

  // 🆕 Enhanced QR scan success handler
  const handleScanSuccess = (err: any, result?: { text: string }) => {
    if (result?.text) {
      console.log('Raw QR scan result:', result.text)
      
      const parsedAddress = parsePaymentUrl(result.text)
      
      if (parsedAddress) {
        setReceiverAddress(parsedAddress)
        setScannerActive(false)
        setCurrentStage('details')
        setError(null)
        console.log('Parsed wallet address:', parsedAddress)
      } else {
        setError('Invalid QR code format. Please scan a valid Pi Network payment QR code.')
        console.error('Failed to parse QR code:', result.text)
      }
    }
  }

  // Handle manual address input
  const handleAddressChange = (value: string) => {
    setReceiverAddress(value)
    setError(null)
  }

  // Move to payment details stage
  const goToDetailsStage = () => {
    if (!receiverAddress.trim()) {
      setError('Please enter a wallet address or scan QR code')
      return
    }
    setCurrentStage('details')
    setScannerActive(false)
  }

  // Move to confirmation stage
  const goToConfirmStage = () => {
    if (!amount || Number(amount) <= 0) {
      setError('Please enter a valid amount')
      return
    }
    setCurrentStage('confirm')
    setError(null)
  }

  // Go back to previous stage
  const goBack = () => {
    setError(null)
    switch (currentStage) {
      case 'details':
        setCurrentStage('scan')
        setIsEditingAddress(false)
        if (!receiverAddress) setScannerActive(true)
        break
      case 'confirm':
        setCurrentStage('details')
        break
      default:
        break
    }
  }

  // 🆕 Handle address editing in details stage
  const toggleAddressEdit = () => {
    setIsEditingAddress(!isEditingAddress)
    setError(null)
  }

  // Process payment
  const processPayment = async () => {
    setPaymentProcessing(true)
    setError(null)

    try {
      const response = await apiCall('/api/payments', {
        method: 'POST',
        body: JSON.stringify({
          receiverPublicKey: receiverAddress,
          amount: Number(amount),
          currency,
          category: category || null,
          description: description || null,
          paymentType: 'quick_pay'
        })
      })

      if (response.ok) {
        const result = await response.json()
        console.log('Payment processed:', result)
        
        setPaymentProcessing(false)
        setCurrentStage('success')
        
        // Auto close after success
        setTimeout(() => {
          handleClose()
          if (onPaymentSuccess) onPaymentSuccess()
        }, 3000)
      } else {
        const errorData = await response.json()
        setError(errorData.error || 'Payment failed')
        setPaymentProcessing(false)
      }
    } catch (err: any) {
      console.error('Payment error:', err)
      setError('Network error. Please try again.')
      setPaymentProcessing(false)
    }
  }

  // Reset and close modal
  const handleClose = () => {
    setCurrentStage('scan')
    setScannerActive(true)
    setReceiverAddress('')
    setIsEditingAddress(false)
    setAmount('')
    setCurrency('PI')
    setCategory('')
    setDescription('')
    setPaymentProcessing(false)
    setError(null)
    onClose()
  }

  // Animation variants
  const stageVariants = {
    enter: { opacity: 0, x: 300 },
    center: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: -300 }
  }

  const mobileVariants = {
    hidden: { opacity: 0, y: '100%' },
    visible: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: '100%' }
  }

  const desktopVariants = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: { opacity: 1, scale: 1 },
    exit: { opacity: 0, scale: 0.9 }
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50"
            onClick={handleClose}
          />

          {/* Modal Container */}
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
                    {currentStage !== 'scan' && (
                      <button
                        onClick={goBack}
                        className="p-2 text-gray-400 hover:text-white rounded-lg hover:bg-white/10 transition-colors"
                      >
                        <ArrowLeftIcon className="w-5 h-5" />
                      </button>
                    )}
                    <div className="w-10 h-10 bg-gradient-to-r from-green-500 to-emerald-500 rounded-xl flex items-center justify-center">
                      <QrCodeIcon className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h2 className="text-xl font-bold text-white">Quick Pay</h2>
                      <p className="text-green-300 text-sm">
                        {currentStage === 'scan' && 'Scan or enter wallet address'}
                        {currentStage === 'details' && 'Enter payment details'}
                        {currentStage === 'confirm' && 'Confirm payment'}
                        {currentStage === 'success' && 'Payment successful'}
                      </p>
                    </div>
                  </div>

                  <button
                    onClick={handleClose}
                    className="p-2 text-gray-400 hover:text-white rounded-lg hover:bg-white/10 transition-colors"
                  >
                    <XMarkIcon className="w-6 h-6" />
                  </button>
                </div>

                {/* Progress Indicator */}
                <div className="flex items-center justify-center mt-4">
                  <div className="flex items-center space-x-2">
                    {['scan', 'details', 'confirm', 'success'].map((stage, index) => (
                      <div key={stage} className="flex items-center">
                        <div className={`w-2 h-2 rounded-full transition-all ${
                          currentStage === stage 
                            ? 'bg-green-400 scale-125' 
                            : index < ['scan', 'details', 'confirm', 'success'].indexOf(currentStage)
                              ? 'bg-green-400/60'
                              : 'bg-white/20'
                        }`} />
                        {index < 3 && <div className="w-8 h-0.5 bg-white/20 mx-1" />}
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Content */}
              <div className="p-6">
                <AnimatePresence mode="wait">
                  {/* Stage 1: Scan QR Code or Enter Address */}
                  {currentStage === 'scan' && (
                    <motion.div
                      key="scan"
                      variants={stageVariants}
                      initial="enter"
                      animate="center"
                      exit="exit"
                      className="space-y-6"
                    >
                      {/* QR Scanner */}
                      <div>
                        <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                          <CameraIcon className="w-5 h-5" />
                          Scan Pi Network QR Code
                        </h3>
                        
                        <div className="relative">
                          <div className="bg-black/50 rounded-xl overflow-hidden border border-white/20">
                            {scannerActive && BarcodeScanner ? (
                              <BarcodeScanner
                                onUpdate={handleScanSuccess}
                                width={400}
                                height={300}
                                facingMode="environment"
                              />
                            ) : (
                              <div className="w-full h-64 flex items-center justify-center bg-gray-800/50">
                                <div className="text-center">
                                  <CameraIcon className="w-12 h-12 text-gray-400 mx-auto mb-2" />
                                  <p className="text-gray-400">
                                    {receiverAddress ? 'QR Code Scanned!' : 'Camera not available'}
                                  </p>
                                </div>
                              </div>
                            )}
                          </div>
                          
                          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                            <div className="w-48 h-48 border-2 border-green-400 rounded-xl opacity-50">
                              <div className="absolute top-0 left-0 w-6 h-6 border-t-2 border-l-2 border-green-400"></div>
                              <div className="absolute top-0 right-0 w-6 h-6 border-t-2 border-r-2 border-green-400"></div>
                              <div className="absolute bottom-0 left-0 w-6 h-6 border-b-2 border-l-2 border-green-400"></div>
                              <div className="absolute bottom-0 right-0 w-6 h-6 border-b-2 border-r-2 border-green-400"></div>
                            </div>
                          </div>
                        </div>
                        
                        <div className="flex justify-center mt-3">
                          <button
                            onClick={() => setScannerActive(!scannerActive)}
                            className={`px-4 py-2 rounded-lg font-medium transition-all ${
                              scannerActive
                                ? 'bg-red-500/20 text-red-300 border border-red-300/30'
                                : 'bg-green-500/20 text-green-300 border border-green-300/30'
                            }`}
                          >
                            {scannerActive ? 'Stop Scanner' : 'Start Scanner'}
                          </button>
                        </div>
                      </div>

                      {/* Divider */}
                      <div className="relative">
                        <div className="absolute inset-0 flex items-center">
                          <div className="w-full border-t border-white/20"></div>
                        </div>
                        <div className="relative flex justify-center text-sm">
                          <span className="px-2 bg-slate-900 text-gray-400">OR</span>
                        </div>
                      </div>

                      {/* Manual Address Input */}
                      <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">
                          <KeyIcon className="w-4 h-4 inline mr-1" />
                          Enter Wallet Address
                        </label>
                        <div className="relative">
                          <input
                            type="text"
                            value={receiverAddress}
                            onChange={(e) => handleAddressChange(e.target.value)}
                            placeholder="Paste or type receiver's wallet public key"
                            className="w-full px-4 py-3 pr-12 bg-white/10 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-300"
                          />
                          {receiverAddress && (
                            <button
                              onClick={goToDetailsStage}
                              className="absolute right-2 top-1/2 transform -translate-y-1/2 p-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors"
                            >
                              <ArrowRightIcon className="w-4 h-4" />
                            </button>
                          )}
                        </div>
                        {receiverAddress && (
                          <p className="text-green-400 text-sm mt-2 flex items-center gap-1">
                            <CheckCircleIcon className="w-4 h-4" />
                            Wallet address detected
                          </p>
                        )}
                      </div>

                      {!receiverAddress && (
                        <button
                          onClick={goToDetailsStage}
                          disabled
                          className="w-full py-3 bg-gray-600 text-gray-400 rounded-xl font-semibold cursor-not-allowed"
                        >
                          Enter wallet address to continue
                        </button>
                      )}
                    </motion.div>
                  )}

                  {/* Stage 2: Payment Details */}
                  {currentStage === 'details' && (
                    <motion.div
                      key="details"
                      variants={stageVariants}
                      initial="enter"
                      animate="center"
                      exit="exit"
                      className="space-y-6"
                    >
                      {/* 🆕 Editable Receiver Info */}
                      <div className="bg-white/5 rounded-xl p-4 border border-white/10">
                        <div className="flex items-center justify-between mb-2">
                          <p className="text-sm text-gray-400">Sending to:</p>
                          <button
                            onClick={toggleAddressEdit}
                            className="flex items-center gap-1 text-green-400 hover:text-green-300 text-sm"
                          >
                            <PencilIcon className="w-4 h-4" />
                            Edit
                          </button>
                        </div>
                        
                        {isEditingAddress ? (
                          <div className="space-y-3">
                            <input
                              type="text"
                              value={receiverAddress}
                              onChange={(e) => handleAddressChange(e.target.value)}
                              placeholder="Enter wallet address"
                              className="w-full px-3 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-300"
                              autoFocus
                            />
                            <div className="flex gap-2">
                              <button
                                onClick={() => setIsEditingAddress(false)}
                                className="px-3 py-1 bg-green-500 text-white rounded-md text-sm hover:bg-green-600 transition-colors"
                              >
                                Save
                              </button>
                              <button
                                onClick={toggleAddressEdit}
                                className="px-3 py-1 bg-gray-600 text-white rounded-md text-sm hover:bg-gray-700 transition-colors"
                              >
                                Cancel
                              </button>
                            </div>
                          </div>
                        ) : (
                          <p className="text-white font-mono text-sm break-all bg-white/5 rounded-lg p-2">
                            {receiverAddress}
                          </p>
                        )}
                      </div>

                      {/* Payment Amount */}
                      <div className="grid grid-cols-3 gap-4">
                        <div className="col-span-2">
                          <label className="block text-sm font-medium text-gray-300 mb-2">
                            Amount *
                          </label>
                          <input
                            type="number"
                            step="0.01"
                            min="0"
                            value={amount}
                            onChange={(e) => setAmount(e.target.value)}
                            placeholder="0.00"
                            className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-300"
                            autoFocus={!isEditingAddress}
                          />
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-300 mb-2">
                            Currency
                          </label>
                          <select
                            value={currency}
                            onChange={(e) => setCurrency(e.target.value)}
                            className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-300 appearance-none cursor-pointer"
                          >
                            <option value="PI" className="bg-slate-800">π</option>
                            <option value="USD" className="bg-slate-800">$</option>
                          </select>
                        </div>
                      </div>

                      {/* Category */}
                      <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">
                          Category (Optional)
                        </label>
                        <input
                          type="text"
                          value={category}
                          onChange={(e) => setCategory(e.target.value)}
                          placeholder="e.g., Food, Transport, Entertainment"
                          className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-300"
                        />
                      </div>

                      {/* Description */}
                      <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">
                          Note (Optional)
                        </label>
                        <textarea
                          value={description}
                          onChange={(e) => setDescription(e.target.value)}
                          placeholder="Add a note for this payment..."
                          rows={3}
                          className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-300 resize-none"
                        />
                      </div>

                      <button
                        onClick={goToConfirmStage}
                        disabled={!amount || Number(amount) <= 0 || !receiverAddress}
                        className="w-full py-3 bg-gradient-to-r from-green-600 to-emerald-600 text-white rounded-xl font-semibold hover:from-green-700 hover:to-emerald-700 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        Review Payment
                      </button>
                    </motion.div>
                  )}

                  {/* Stage 3: Confirmation - Same as before */}
                  {currentStage === 'confirm' && (
                    <motion.div
                      key="confirm"
                      variants={stageVariants}
                      initial="enter"
                      animate="center"
                      exit="exit"
                      className="space-y-6"
                    >
                      <div className="text-center">
                        <div className="w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                          <CurrencyDollarIcon className="w-8 h-8 text-green-400" />
                        </div>
                        
                        <h3 className="text-2xl font-bold text-white mb-2">Confirm Payment</h3>
                        <p className="text-gray-300">
                          Review your payment details before sending
                        </p>
                      </div>

                      {/* Payment Summary */}
                      <div className="bg-white/5 rounded-xl p-6 border border-white/10 space-y-4">
                        <div className="flex justify-between items-center py-3 border-b border-white/10">
                          <span className="text-gray-400">Amount</span>
                          <span className="text-white font-bold text-xl">{amount} {currency}</span>
                        </div>
                        
                        <div className="flex justify-between items-start py-3 border-b border-white/10">
                          <span className="text-gray-400">To</span>
                          <span className="text-white font-mono text-sm text-right break-all">
                            {receiverAddress}
                          </span>
                        </div>

                        {category && (
                          <div className="flex justify-between items-center py-3 border-b border-white/10">
                            <span className="text-gray-400">Category</span>
                            <span className="text-white">{category}</span>
                          </div>
                        )}

                        {description && (
                          <div className="flex justify-between items-start py-3">
                            <span className="text-gray-400">Note</span>
                            <span className="text-white text-right">{description}</span>
                          </div>
                        )}
                      </div>

                      <button
                        onClick={processPayment}
                        disabled={paymentProcessing}
                        className="w-full py-4 bg-gradient-to-r from-green-600 to-emerald-600 text-white rounded-xl font-bold text-lg hover:from-green-700 hover:to-emerald-700 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        {paymentProcessing ? (
                          <div className="flex items-center justify-center gap-3">
                            <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                            Processing Payment...
                          </div>
                        ) : (
                          `Send ${amount} ${currency}`
                        )}
                      </button>
                    </motion.div>
                  )}

                  {/* Stage 4: Success - Same as before */}
                  {currentStage === 'success' && (
                    <motion.div
                      key="success"
                      variants={stageVariants}
                      initial="enter"
                      animate="center"
                      exit="exit"
                      className="text-center py-8"
                    >
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ type: "spring", duration: 0.6 }}
                        className="w-24 h-24 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-6"
                      >
                        <CheckCircleIcon className="w-16 h-16 text-green-400" />
                      </motion.div>
                      
                      <h3 className="text-3xl font-bold text-white mb-4">Payment Successful!</h3>
                      <p className="text-gray-300 mb-2">Your payment has been sent successfully</p>
                      <p className="text-green-400 font-semibold">{amount} {currency} sent</p>
                      
                      <div className="mt-8 text-sm text-gray-400">
                        This window will close automatically...
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Error Display */}
                {error && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mt-6 bg-red-500/10 border border-red-300/20 rounded-xl p-4"
                  >
                    <p className="text-red-400 text-sm">{error}</p>
                  </motion.div>
                )}
              </div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  )
}
