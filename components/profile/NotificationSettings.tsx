'use client'
import { useState } from 'react'
import { motion } from 'framer-motion'
import { 
  BellIcon, 
  DevicePhoneMobileIcon, 
  EnvelopeIcon,
  SpeakerWaveIcon,
  ShieldCheckIcon
} from '@heroicons/react/24/outline'

interface NotificationSetting {
  id: string
  title: string
  description: string
  enabled: boolean
  channels: {
    push: boolean
    email: boolean
    sound: boolean
  }
}

export const NotificationSettings = () => {
  const [notifications, setNotifications] = useState<NotificationSetting[]>([
    {
      id: 'payment_received',
      title: 'Payment Received',
      description: 'When someone pays you through Pi Network',
      enabled: true,
      channels: { push: true, email: true, sound: true }
    },
    {
      id: 'payment_sent',
      title: 'Payment Sent',
      description: 'Confirmation when your Pi payment is successful',
      enabled: true,
      channels: { push: true, email: false, sound: false }
    },
    {
      id: 'expense_added',
      title: 'New Expense Added',
      description: 'When someone adds an expense to your group',
      enabled: true,
      channels: { push: true, email: false, sound: false }
    },
    {
      id: 'settlement_reminder',
      title: 'Settlement Reminders',
      description: 'Reminders for outstanding debts and payments',
      enabled: true,
      channels: { push: true, email: true, sound: false }
    },
    {
      id: 'group_updates',
      title: 'Group Updates',
      description: 'When members join/leave groups or group settings change',
      enabled: false,
      channels: { push: false, email: false, sound: false }
    },
    {
      id: 'achievements',
      title: 'Achievements & Rewards',
      description: 'When you unlock new achievements or earn Pi rewards',
      enabled: true,
      channels: { push: true, email: false, sound: true }
    },
    {
      id: 'security_alerts',
      title: 'Security Alerts',
      description: 'Important security notifications and account changes',
      enabled: true,
      channels: { push: true, email: true, sound: true }
    }
  ])

  const [globalSettings, setGlobalSettings] = useState({
    pushEnabled: true,
    emailEnabled: true,
    soundEnabled: true,
    quietHours: {
      enabled: true,
      start: '22:00',
      end: '08:00'
    }
  })

  const toggleNotification = (id: string) => {
    setNotifications(prev => prev.map(notification => 
      notification.id === id 
        ? { ...notification, enabled: !notification.enabled }
        : notification
    ))
  }

  const toggleChannel = (id: string, channel: 'push' | 'email' | 'sound') => {
    setNotifications(prev => prev.map(notification => 
      notification.id === id 
        ? { 
            ...notification, 
            channels: { 
              ...notification.channels, 
              [channel]: !notification.channels[channel] 
            }
          }
        : notification
    ))
  }

  return (
    <div className="space-y-6">
      {/* Global Notification Settings */}
      <div className="bg-white/5 backdrop-blur-md rounded-2xl border border-white/10 p-6">
        <h2 className="text-2xl font-bold text-white mb-6">Global Settings</h2>
        
        <div className="space-y-4">
          {/* Master Toggle */}
          <div className="flex items-center justify-between p-4 bg-white/5 rounded-xl">
            <div className="flex items-center gap-3">
              <BellIcon className="w-6 h-6 text-purple-400" />
              <div>
                <div className="text-white font-semibold">All Notifications</div>
                <div className="text-gray-400 text-sm">Enable or disable all notifications</div>
              </div>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={globalSettings.pushEnabled}
                onChange={(e) => setGlobalSettings(prev => ({ ...prev, pushEnabled: e.target.checked }))}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-gray-600 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-purple-600"></div>
            </label>
          </div>

          {/* Quiet Hours */}
          <div className="p-4 bg-white/5 rounded-xl">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="text-xl">🌙</div>
                <div>
                  <div className="text-white font-semibold">Quiet Hours</div>
                  <div className="text-gray-400 text-sm">Disable notifications during specific hours</div>
                </div>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={globalSettings.quietHours.enabled}
                  onChange={(e) => setGlobalSettings(prev => ({ 
                    ...prev, 
                    quietHours: { ...prev.quietHours, enabled: e.target.checked }
                  }))}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-gray-600 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-purple-600"></div>
              </label>
            </div>

            {globalSettings.quietHours.enabled && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                className="grid grid-cols-2 gap-4"
              >
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Start Time</label>
                  <input
                    type="time"
                    value={globalSettings.quietHours.start}
                    onChange={(e) => setGlobalSettings(prev => ({
                      ...prev,
                      quietHours: { ...prev.quietHours, start: e.target.value }
                    }))}
                    className="w-full px-3 py-2 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">End Time</label>
                  <input
                    type="time"
                    value={globalSettings.quietHours.end}
                    onChange={(e) => setGlobalSettings(prev => ({
                      ...prev,
                      quietHours: { ...prev.quietHours, end: e.target.value }
                    }))}
                    className="w-full px-3 py-2 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                  />
                </div>
              </motion.div>
            )}
          </div>
        </div>
      </div>

      {/* Notification Types */}
      <div className="bg-white/5 backdrop-blur-md rounded-2xl border border-white/10 p-6">
        <h2 className="text-2xl font-bold text-white mb-6">Notification Types</h2>
        
        <div className="space-y-4">
          {notifications.map((notification, index) => (
            <motion.div
              key={notification.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.05 }}
              className={`p-4 rounded-xl border transition-all duration-200 ${
                notification.enabled
                  ? 'bg-white/5 border-white/10 hover:border-white/20'
                  : 'bg-gray-500/5 border-gray-500/10'
              }`}
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className={`font-semibold ${
                      notification.enabled ? 'text-white' : 'text-gray-500'
                    }`}>
                      {notification.title}
                    </h3>
                    {notification.id === 'security_alerts' && (
                      <ShieldCheckIcon className="w-4 h-4 text-green-400" />
                    )}
                  </div>
                  <p className={`text-sm ${
                    notification.enabled ? 'text-gray-300' : 'text-gray-500'
                  }`}>
                    {notification.description}
                  </p>
                </div>
                
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={notification.enabled}
                    onChange={() => toggleNotification(notification.id)}
                    className="sr-only peer"
                    disabled={notification.id === 'security_alerts'} // Security alerts always enabled
                  />
                  <div className={`w-11 h-6 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all ${
                    notification.enabled ? 'bg-purple-600' : 'bg-gray-600'
                  } ${notification.id === 'security_alerts' ? 'opacity-50 cursor-not-allowed' : ''}`}></div>
                </label>
              </div>

              {notification.enabled && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  className="flex items-center gap-6 pt-4 border-t border-white/10"
                >
                  <span className="text-sm text-gray-300 font-medium">Delivery:</span>
                  
                  {/* Push Notifications */}
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={notification.channels.push}
                      onChange={() => toggleChannel(notification.id, 'push')}
                      className="w-4 h-4 text-purple-600 bg-white/10 border-white/20 rounded focus:ring-purple-500 focus:ring-2"
                    />
                    <DevicePhoneMobileIcon className="w-4 h-4 text-gray-400" />
                    <span className="text-sm text-gray-300">Push</span>
                  </label>

                  {/* Email */}
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={notification.channels.email}
                      onChange={() => toggleChannel(notification.id, 'email')}
                      className="w-4 h-4 text-purple-600 bg-white/10 border-white/20 rounded focus:ring-purple-500 focus:ring-2"
                    />
                    <EnvelopeIcon className="w-4 h-4 text-gray-400" />
                    <span className="text-sm text-gray-300">Email</span>
                  </label>

                  {/* Sound */}
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={notification.channels.sound}
                      onChange={() => toggleChannel(notification.id, 'sound')}
                      className="w-4 h-4 text-purple-600 bg-white/10 border-white/20 rounded focus:ring-purple-500 focus:ring-2"
                    />
                    <SpeakerWaveIcon className="w-4 h-4 text-gray-400" />
                    <span className="text-sm text-gray-300">Sound</span>
                  </label>
                </motion.div>
              )}
            </motion.div>
          ))}
        </div>
      </div>

      {/* Test Notification */}
      <div className="bg-white/5 backdrop-blur-md rounded-2xl border border-white/10 p-6">
        <h2 className="text-xl font-bold text-white mb-4">Test Notifications</h2>
        <p className="text-gray-400 mb-4">Send a test notification to make sure everything is working correctly.</p>
        
        <button className="px-6 py-3 bg-purple-600 text-white rounded-xl font-semibold hover:bg-purple-700 transition-colors">
          Send Test Notification
        </button>
      </div>
    </div>
  )
}
