'use client'
import { useState } from 'react'
import { motion } from 'framer-motion'
import { OutstandingDebts } from '@/components/settlements/OutstandingDebts'
import { SettlementHistory } from '@/components/settlements/SettlementHistory'
import { PaymentRequests } from '@/components/settlements/PaymentRequests'

export default function SettlementsPage() {
  const [activeTab, setActiveTab] = useState<'outstanding' | 'history' | 'requests'>('outstanding')

  return (
    <div className="space-y-6">
      {/* Tab Content */}
      <motion.div
        key={activeTab}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        {activeTab === 'outstanding' && <OutstandingDebts />}
        {activeTab === 'history' && <SettlementHistory />}
        {activeTab === 'requests' && <PaymentRequests />}
      </motion.div>
    </div>
  )
}
