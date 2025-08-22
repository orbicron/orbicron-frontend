'use client'
import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { XMarkIcon, PhotoIcon, UserPlusIcon } from '@heroicons/react/24/outline'
import { useForm } from 'react-hook-form'

interface CreateGroupModalProps {
  isOpen: boolean
  onClose: () => void
}

const coverEmojis = ['🏖️', '🏠', '🍽️', '🎉', '✈️', '🏔️', '🎬', '🛍️', '⚽', '🎵']

export const CreateGroupModal = ({ isOpen, onClose }: CreateGroupModalProps) => {
  const [selectedEmoji, setSelectedEmoji] = useState(coverEmojis[0])
  const [inviteEmails, setInviteEmails] = useState<string[]>([''])
  const { register, handleSubmit, reset, formState: { errors } } = useForm()

  const addEmailField = () => {
    setInviteEmails([...inviteEmails, ''])
  }

  const removeEmailField = (index: number) => {
    setInviteEmails(inviteEmails.filter((_, i) => i !== index))
  }

  const updateEmail = (index: number, value: string) => {
    const newEmails = [...inviteEmails]
    newEmails[index] = value
    setInviteEmails(newEmails)
  }

  const onSubmit = (data: any) => {
    console.log('Creating group:', { ...data, coverEmoji: selectedEmoji, inviteEmails })
    reset()
    setInviteEmails([''])
    onClose()
  }

  const handleClose = () => {
    reset()
    setInviteEmails([''])
    onClose()
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <div 
            className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm"
            onClick={handleClose}
          />
          
          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 overflow-y-auto"
          >
            <div className="bg-white/10 backdrop-blur-md rounded-2xl border border-white/20 w-full max-w-2xl p-6 max-h-[90vh] overflow-y-auto">
              {/* Header */}
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-white">Create New Group</h2>
                <button
                  onClick={handleClose}
                  className="p-2 text-gray-400 hover:text-white rounded-lg hover:bg-white/10 transition-colors"
                >
                  <XMarkIcon className="w-6 h-6" />
                </button>
              </div>
              
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                {/* Group Cover */}
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-3">
                    Group Cover
                  </label>
                  <div className="flex items-center gap-3 flex-wrap">
                    {coverEmojis.map((emoji) => (
                      <button
                        key={emoji}
                        type="button"
                        onClick={() => setSelectedEmoji(emoji)}
                        className={`w-12 h-12 rounded-xl flex items-center justify-center text-2xl transition-all duration-200 ${
                          selectedEmoji === emoji
                            ? 'bg-purple-500 scale-110'
                            : 'bg-white/10 hover:bg-white/20'
                        }`}
                      >
                        {emoji}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Group Name */}
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Group Name *
                  </label>
                  <input
                    {...register('name', { required: 'Group name is required' })}
                    className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    placeholder="Enter group name"
                  />
                  {errors.name && (
                    <p className="text-red-400 text-sm mt-1">{errors.name.message as string}</p>
                  )}
                </div>

                {/* Description */}
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Description
                  </label>
                  <textarea
                    {...register('description')}
                    className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent resize-none"
                    rows={3}
                    placeholder="What's this group about?"
                  />
                </div>

                {/* Group Type */}
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Group Type
                  </label>
                  <select
                    {...register('type')}
                    className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  >
                    <option value="general">General Expenses</option>
                    <option value="trip">Trip / Travel</option>
                    <option value="household">Household</option>
                    <option value="event">Event / Party</option>
                    <option value="business">Business</option>
                  </select>
                </div>

                {/* Invite Members */}
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-3">
                    Invite Members (Optional)
                  </label>
                  <div className="space-y-3">
                    {inviteEmails.map((email, index) => (
                      <div key={index} className="flex gap-3">
                        <input
                          type="email"
                          value={email}
                          onChange={(e) => updateEmail(index, e.target.value)}
                          className="flex-1 px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                          placeholder="Enter email or Pi Network username"
                        />
                        {inviteEmails.length > 1 && (
                          <button
                            type="button"
                            onClick={() => removeEmailField(index)}
                            className="px-3 py-3 text-red-400 hover:text-red-300 hover:bg-red-500/20 rounded-xl transition-colors"
                          >
                            <XMarkIcon className="w-5 h-5" />
                          </button>
                        )}
                      </div>
                    ))}
                    
                    <button
                      type="button"
                      onClick={addEmailField}
                      className="flex items-center gap-2 text-purple-400 hover:text-purple-300 text-sm transition-colors"
                    >
                      <UserPlusIcon className="w-4 h-4" />
                      Add another member
                    </button>
                  </div>
                </div>

                {/* Privacy Settings */}
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-3">
                    Privacy Settings
                  </label>
                  <div className="space-y-3">
                    <label className="flex items-center gap-3 cursor-pointer">
                      <input
                        type="checkbox"
                        {...register('allowInvites')}
                        className="w-4 h-4 text-purple-600 bg-white/10 border-white/20 rounded focus:ring-purple-500 focus:ring-2"
                      />
                      <span className="text-gray-300">Allow members to invite others</span>
                    </label>
                    
                    <label className="flex items-center gap-3 cursor-pointer">
                      <input
                        type="checkbox"
                        {...register('requireApproval')}
                        className="w-4 h-4 text-purple-600 bg-white/10 border-white/20 rounded focus:ring-purple-500 focus:ring-2"
                      />
                      <span className="text-gray-300">Require admin approval for new expenses</span>
                    </label>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex gap-4 pt-6 border-t border-white/10">
                  <button
                    type="button"
                    onClick={handleClose}
                    className="flex-1 px-6 py-3 bg-white/10 text-white rounded-xl font-semibold hover:bg-white/20 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="flex-1 px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-xl font-semibold hover:from-purple-700 hover:to-pink-700 transition-all duration-300"
                  >
                    Create Group
                  </button>
                </div>
              </form>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
