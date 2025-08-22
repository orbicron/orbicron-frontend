'use client'
import { motion, AnimatePresence } from 'framer-motion'
import { XMarkIcon, CameraIcon } from '@heroicons/react/24/outline'

interface ReceiptScannerModalProps {
  isOpen: boolean
  onClose: () => void
}

export const ReceiptScannerModal = ({ isOpen, onClose }: ReceiptScannerModalProps) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <div 
            className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm"
            onClick={onClose}
          />
          
          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 overflow-y-auto"
          >
            <div className="bg-white/10 backdrop-blur-md rounded-2xl border border-white/20 w-full max-w-4xl p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-white">AI Receipt Scanner</h2>
                <button
                  onClick={onClose}
                  className="p-2 text-gray-400 hover:text-white rounded-lg hover:bg-white/10 transition-colors"
                >
                  <XMarkIcon className="w-6 h-6" />
                </button>
              </div>
              
              {/* Scanner interface will be implemented next */}
              <div className="text-center py-20">
                <CameraIcon className="w-20 h-20 text-gray-400 mx-auto mb-4" />
                <p className="text-white text-lg">AI Receipt Scanner coming next...</p>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
