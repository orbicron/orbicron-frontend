'use client'
import { useState } from 'react'
import { motion } from 'framer-motion'
import { useAuthStore } from '@/store/authStore'
import { 
  UserIcon, 
  EyeIcon, 
  EyeSlashIcon,
  ShieldCheckIcon,
  KeyIcon,
  TrashIcon,
  ExclamationTriangleIcon
} from '@heroicons/react/24/outline'
import { useForm } from 'react-hook-form'

export const AccountSettings = () => {
  const { user, logout } = useAuthStore()
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false)
  const [showPasswordFields, setShowPasswordFields] = useState(false)
  const { register, handleSubmit, formState: { errors } } = useForm({
    defaultValues: {
      username: user?.username || '',
      email: '',
      bio: '',
      location: ''
    }
  })

  const onSubmit = (data: any) => {
    console.log('Updating profile:', data)
    // Implement profile update logic
  }

  const handleDisconnectPi = () => {
    console.log('Disconnecting from Pi Network')
    logout()
  }

  const handleDeleteAccount = () => {
    console.log('Deleting account')
    // Implement account deletion logic
    setShowDeleteConfirm(false)
  }

  return (
    <div className="space-y-6">
      {/* Profile Information */}
      <div className="bg-white/5 backdrop-blur-md rounded-2xl border border-white/10 p-6">
        <h2 className="text-2xl font-bold text-white mb-6">Profile Information</h2>
        
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {/* Avatar Section */}
          <div className="flex items-center gap-6">
            <div className="relative">
              <div className="w-20 h-20 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
                <UserIcon className="w-10 h-10 text-white" />
              </div>
              <button
                type="button"
                className="absolute -bottom-1 -right-1 w-6 h-6 bg-purple-600 rounded-full flex items-center justify-center hover:bg-purple-700 transition-colors"
              >
                <span className="text-white text-xs">📷</span>
              </button>
            </div>
            <div>
              <h3 className="text-white font-semibold">Profile Picture</h3>
              <p className="text-gray-400 text-sm">Click the camera icon to update your avatar</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Username */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Username
              </label>
              <input
                {...register('username', { required: 'Username is required' })}
                className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                placeholder="Your username"
              />
              {errors.username && (
                <p className="text-red-400 text-sm mt-1">{errors.username.message as string}</p>
              )}
            </div>

            {/* Email */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Email Address
              </label>
              <input
                {...register('email')}
                type="email"
                className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                placeholder="your.email@example.com"
              />
            </div>
          </div>

          {/* Bio */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Bio
            </label>
            <textarea
              {...register('bio')}
              className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent resize-none"
              rows={3}
              placeholder="Tell us about yourself..."
            />
          </div>

          {/* Location */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Location
            </label>
            <input
              {...register('location')}
              className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              placeholder="City, Country"
            />
          </div>

          {/* Save Button */}
          <div className="flex justify-end">
            <button
              type="submit"
              className="px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-xl font-semibold hover:from-purple-700 hover:to-pink-700 transition-all duration-300"
            >
              Save Changes
            </button>
          </div>
        </form>
      </div>

      {/* Security Settings */}
      <div className="bg-white/5 backdrop-blur-md rounded-2xl border border-white/10 p-6">
        <h2 className="text-2xl font-bold text-white mb-6">Security Settings</h2>
        
        <div className="space-y-4">
          {/* Pi Network Connection */}
          <div className="flex items-center justify-between p-4 bg-green-500/10 rounded-xl border border-green-300/30">
            <div className="flex items-center gap-3">
              <ShieldCheckIcon className="w-6 h-6 text-green-400" />
              <div>
                <div className="text-white font-semibold">Pi Network Connection</div>
                <div className="text-green-200 text-sm">Authenticated and secure</div>
              </div>
            </div>
            <button
              onClick={handleDisconnectPi}
              className="px-4 py-2 bg-red-600/20 text-red-300 rounded-lg hover:bg-red-600/30 transition-colors"
            >
              Disconnect
            </button>
          </div>

          {/* Password Section */}
          <div className="p-4 bg-white/5 rounded-xl">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <KeyIcon className="w-6 h-6 text-purple-400" />
                <div>
                  <div className="text-white font-semibold">Password & Security</div>
                  <div className="text-gray-400 text-sm">Managed by Pi Network</div>
                </div>
              </div>
              <button
                onClick={() => setShowPasswordFields(!showPasswordFields)}
                className="px-4 py-2 bg-purple-600/20 text-purple-300 rounded-lg hover:bg-purple-600/30 transition-colors"
              >
                {showPasswordFields ? 'Hide' : 'Change Password'}
              </button>
            </div>

            {showPasswordFields && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                className="space-y-4 mt-4 pt-4 border-t border-white/10"
              >
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Current Password
                  </label>
                  <input
                    type="password"
                    className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    placeholder="Enter current password"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    New Password
                  </label>
                  <input
                    type="password"
                    className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    placeholder="Enter new password"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Confirm New Password
                  </label>
                  <input
                    type="password"
                    className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    placeholder="Confirm new password"
                  />
                </div>
                <button className="px-6 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors">
                  Update Password
                </button>
              </motion.div>
            )}
          </div>
        </div>
      </div>

      {/* Danger Zone */}
      <div className="bg-red-500/5 backdrop-blur-md rounded-2xl border border-red-300/20 p-6">
        <h2 className="text-2xl font-bold text-red-300 mb-6">Danger Zone</h2>
        
        <div className="space-y-4">
          <div className="flex items-center justify-between p-4 bg-red-500/10 rounded-xl border border-red-300/30">
            <div className="flex items-center gap-3">
              <ExclamationTriangleIcon className="w-6 h-6 text-red-400" />
              <div>
                <div className="text-white font-semibold">Delete Account</div>
                <div className="text-red-200 text-sm">Permanently delete your account and all data</div>
              </div>
            </div>
            <button
              onClick={() => setShowDeleteConfirm(true)}
              className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
            >
              Delete Account
            </button>
          </div>
        </div>

        {/* Delete Confirmation Modal */}
        {showDeleteConfirm && (
          <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-white/10 backdrop-blur-md rounded-2xl border border-white/20 w-full max-w-md p-6"
            >
              <div className="text-center">
                <ExclamationTriangleIcon className="w-12 h-12 text-red-400 mx-auto mb-4" />
                <h3 className="text-xl font-bold text-white mb-2">Delete Account?</h3>
                <p className="text-gray-300 mb-6">
                  This action cannot be undone. All your data, including expenses, 
                  groups, and Pi token history will be permanently deleted.
                </p>
                
                <div className="flex gap-4">
                  <button
                    onClick={() => setShowDeleteConfirm(false)}
                    className="flex-1 px-4 py-2 bg-white/10 text-white rounded-lg hover:bg-white/20 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleDeleteAccount}
                    className="flex-1 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
                  >
                    Delete Forever
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </div>
    </div>
  )
}
