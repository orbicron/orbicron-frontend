'use client'
import { useState } from 'react'
import { motion } from 'framer-motion'
import { ProfileOverview } from '@/components/profile/ProfileOverview'
import { AccountSettings } from '@/components/profile/AccountSettings'
import { NotificationSettings } from '@/components/profile/NotificationSettings'
import { AppPreferences } from '@/components/profile/AppPreferences'

export default function ProfilePage() {
  const [activeTab, setActiveTab] = useState<'overview' | 'settings' | 'notifications' | 'preferences'>('overview')

  return (
    <div className="space-y-6">
      {/* Tab Content */}
      <motion.div
        key={activeTab}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        {activeTab === 'overview' && <ProfileOverview />}
        {activeTab === 'settings' && <AccountSettings />}
        {activeTab === 'notifications' && <NotificationSettings />}
        {activeTab === 'preferences' && <AppPreferences />}
      </motion.div>
    </div>
  )
}
