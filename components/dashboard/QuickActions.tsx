'use client'
import { motion } from 'framer-motion'
import { 
  PlusIcon,
  CameraIcon,
  BanknotesIcon,
  UserGroupIcon,
  QrCodeIcon,
  MicrophoneIcon
} from '@heroicons/react/24/outline'
import { useState } from 'react'

let highOrder = (callback:any)=>{
   callback(true)
}

const quickActions = [
  {
    title: 'Add Expense',
    description: 'Split a new expense',
    icon: PlusIcon,
    color: 'from-purple-500 to-indigo-500',
    action: (callback:any)=>highOrder(callback),
  },
  {
    title: 'Scan Receipt',
    description: 'AI-powered scanning',
    icon: CameraIcon,
    color: 'from-blue-500 to-cyan-500',
    action: () => console.log('Scan receipt'),
  },
  {
    title: 'Settle Debts',
    description: 'Pay with Pi tokens',
    icon: BanknotesIcon,
    color: 'from-green-500 to-emerald-500',
    action: () => console.log('Settle debts'),
  },
  {
    title: 'Create Group',
    description: 'New expense group',
    icon: UserGroupIcon,
    color: 'from-pink-500 to-rose-500',
    action: () => console.log('Create group'),
  },
  {
    title: 'Join Group',
    description: 'Scan QR code',
    icon: QrCodeIcon,
    color: 'from-orange-500 to-amber-500',
    action: () => console.log('Join group'),
  }
]

export const QuickActions = () => {
  const [showAddExpense, setShowAddExpense] = useState(false)
  return (
    <div className="bg-white/5 backdrop-blur-md rounded-2xl border border-white/10 p-6">
      <h2 className="text-2xl font-bold text-white mb-6">Quick Actions</h2>
      
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        {quickActions.map((action, index) => {
          const Icon = action.icon
          
          return (
            <motion.button
              key={action.title}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={action.title=='Add Expense'?setShowAddExpense(true):action.action}
              className="group relative p-4 bg-white/5 hover:bg-white/10 rounded-xl border border-white/10 hover:border-white/20 transition-all duration-300"
            >
              {/* Background gradient on hover */}
              <div className={`absolute inset-0 bg-gradient-to-r ${action.color} opacity-0 group-hover:opacity-10 rounded-xl transition-opacity duration-300`}></div>
              
              <div className="relative z-10 text-center">
                {/* Icon */}
                <div className={`w-12 h-12 bg-gradient-to-r ${action.color} rounded-xl flex items-center justify-center mx-auto mb-3 group-hover:scale-110 transition-transform duration-300`}>
                  <Icon className="w-6 h-6 text-white" />
                </div>
                
                {/* Title */}
                <h3 className="text-white font-semibold text-sm mb-1">
                  {action.title}
                </h3>
                
                {/* Description */}
                <p className="text-gray-400 text-xs">
                  {action.description}
                </p>
              </div>
            </motion.button>  
          )
        })}
      </div>
    </div>
  )
}
