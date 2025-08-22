'use client'
import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { XMarkIcon, QrCodeIcon, LinkIcon } from '@heroicons/react/24/outline'

interface JoinGroupModalProps {
  isOpen: boolean
  onClose: () => void
}

export const JoinGroupModal = ({ isOpen, onClose }: JoinGroupModalProps) => {
  const [joinMethod, setJoinMethod] = useState<'code' | 'link' | 'qr'>('code')
  const [groupCode, setGroupCode] = useState('')
  const [groupLink, setGroupLink] = useState('')

  const handleJoin = () => {
    console.log('Joining group with method:', joinMethod, { groupCode, groupLink })
    onClose()
  }

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
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
          >
            <div className="bg-white/10 backdrop-blur-md rounded-2xl border border-white/20 w-full max-w-md p-6">
              {/* Header */}
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-white">Join Group</h2>
                <button
                  onClick={onClose}
                  className="p-2 text-gray-400 hover:text-white rounded-lg hover:bg-white/10 transition-colors"
                >
                  <XMarkIcon className="w-6 h-6" />
                </button>
              </div>

              {/* Join Method Selector */}
              <div className="flex bg-white/5 p-1 rounded-xl mb-6">
                <button
                  onClick={() => setJoinMethod('code')}
                  className={`flex-1 py-2 text-sm font-medium rounded-lg transition-colors ${
                    joinMethod === 'code'
                      ? 'bg-purple-500 text-white'
                      : 'text-gray-400 hover:text-white'
                  }`}
                >
                  Group Code
                </button>
                <button
                  onClick={() => setJoinMethod('link')}
                  className={`flex-1 py-2 text-sm font-medium rounded-lg transition-colors ${
                    joinMethod === 'link'
                      ? 'bg-purple-500 text-white'
                      : 'text-gray-400 hover:text-white'
                  }`}
                >
                  Invite Link
                </button>
                <button
                  onClick={() => setJoinMethod('qr')}
                  className={`flex-1 py-2 text-sm font-medium rounded-lg transition-colors ${
                    joinMethod === 'qr'
                      ? 'bg-purple-500 text-white'
                      : 'text-gray-400 hover:text-white'
                  }`}
                >
                  QR Code
                </button>
              </div>

              {/* Join Content */}
              <div className="space-y-4">
                {joinMethod === 'code' && (
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Enter Group Code
                    </label>
                    <input
                      type="text"
                      value={groupCode}
                      onChange={(e) => setGroupCode(e.target.value)}
                      className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent text-center font-mono text-lg tracking-widest uppercase"
                      placeholder="ABC123"
                      maxLength={6}
                    />
                    <p className="text-gray-400 text-sm mt-2">
                      Ask a group member for the 6-character group code
                    </p>
                  </div>
                )}

                {joinMethod === 'link' && (
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Enter Invite Link
                    </label>
                    <div className="relative">
                      <LinkIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                      <input
                        type="url"
                        value={groupLink}
                        onChange={(e) => setGroupLink(e.target.value)}
                        className="w-full pl-10 pr-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                        placeholder="https://orbicron.app/join/..."
                      />
                    </div>
                    <p className="text-gray-400 text-sm mt-2">
                      Paste the invite link shared by a group member
                    </p>
                  </div>
                )}

                {joinMethod === 'qr' && (
                  <div className="text-center py-8">
                    <div className="w-48 h-48 bg-white/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
                      <QrCodeIcon className="w-20 h-20 text-gray-400" />
                    </div>
                    <p className="text-gray-400 text-sm">
                      Scan QR code with your camera to join the group
                    </p>
                    <button className="mt-4 bg-purple-600/20 text-purple-300 px-4 py-2 rounded-lg hover:bg-purple-600/30 transition-colors">
                      Open Camera
                    </button>
                  </div>
                )}
              </div>

              {/* Actions */}
              {joinMethod !== 'qr' && (
                <div className="flex gap-4 pt-6 border-t border-white/10 mt-6">
                  <button
                    onClick={onClose}
                    className="flex-1 px-6 py-3 bg-white/10 text-white rounded-xl font-semibold hover:bg-white/20 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleJoin}
                    disabled={!groupCode && !groupLink}
                    className="flex-1 px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-xl font-semibold hover:from-purple-700 hover:to-pink-700 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Join Group
                  </button>
                </div>
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
