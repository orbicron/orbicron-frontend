'use client'
import { motion } from 'framer-motion'
import { useState } from 'react'
import { 
  PaperAirplaneIcon,
  ClockIcon,
  CheckCircleIcon,
  XCircleIcon
} from '@heroicons/react/24/outline'
import { formatDate, formatPiAmount } from '@/lib/utils'

// Mock payment requests data
const mockRequests = [
  {
    id: 'req1',
    type: 'sent' as const,
    user: { username: 'Alice Johnson', avatar: '👩‍🔬' },
    amount: 34.50,
    description: 'Your share of dinner bill',
    status: 'pending' as const,
    sentDate: new Date(Date.now() - 2 * 60 * 60 * 1000), // 2 hours ago
    dueDate: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000), // 5 days from now
    groupName: 'Friends Night Out'
  },
  {
    id: 'req2',
    type: 'received' as const,
    user: { username: 'Bob Wilson', avatar: '👨‍💼' },
    amount: 67.80,
    description: 'Grocery shopping split',
    status: 'pending' as const,
    sentDate: new Date(Date.now() - 5 * 60 * 60 * 1000), // 5 hours ago
    dueDate: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000), // 3 days from now
    groupName: 'Household Expenses'
  },
  {
    id: 'req3',
    type: 'sent' as const,
    user: { username: 'Carol Davis', avatar: '👩‍💻' },
    amount: 25.00,
    description: 'Movie tickets',
    status: 'paid' as const,
    sentDate: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000), // 1 day ago
    dueDate: new Date(Date.now() - 6 * 60 * 60 * 1000), // Paid 6 hours ago
    groupName: 'Weekend Activities'
  },
  {
    id: 'req4',
    type: 'received' as const,
    user: { username: 'Dave Miller', avatar: '👨‍🎓' },
    amount: 15.25,
    description: 'Coffee meetup',
    status: 'declined' as const,
    sentDate: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000), // 2 days ago
    dueDate: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000), // Yesterday
    groupName: 'Study Group'
  },
]

export const PaymentRequests = () => {
  const [filter, setFilter] = useState<'all' | 'sent' | 'received'>('all')
  const [statusFilter, setStatusFilter] = useState<'all' | 'pending' | 'paid' | 'declined'>('all')

  const filteredRequests = mockRequests.filter(request => {
    if (filter !== 'all' && request.type !== filter) return false
    if (statusFilter !== 'all' && request.status !== statusFilter) return false
    return true
  })

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'pending':
        return <ClockIcon className="w-5 h-5 text-yellow-400" />
      case 'paid':
        return <CheckCircleIcon className="w-5 h-5 text-green-400" />
      case 'declined':
        return <XCircleIcon className="w-5 h-5 text-red-400" />
      default:
        return <ClockIcon className="w-5 h-5 text-gray-400" />
    }
  }

  const handlePayRequest = (requestId: string) => {
    console.log('Paying request:', requestId)
    // Implement payment logic
  }

  const handleDeclineRequest = (requestId: string) => {
    console.log('Declining request:', requestId)
    // Implement decline logic
  }

  return (
    <div className="space-y-6">
      {/* Summary Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-blue-500/10 rounded-xl p-4 border border-blue-300/20">
          <div className="text-2xl font-bold text-blue-300">12</div>
          <div className="text-sm text-blue-200">Requests Sent</div>
        </div>
        <div className="bg-purple-500/10 rounded-xl p-4 border border-purple-300/20">
          <div className="text-2xl font-bold text-purple-300">8</div>
          <div className="text-sm text-purple-200">Requests Received</div>
        </div>
        <div className="bg-yellow-500/10 rounded-xl p-4 border border-yellow-300/20">
          <div className="text-2xl font-bold text-yellow-300">6</div>
          <div className="text-sm text-yellow-200">Pending Responses</div>
        </div>
        <div className="bg-green-500/10 rounded-xl p-4 border border-green-300/20">
          <div className="text-2xl font-bold text-green-300">234.50 π</div>
          <div className="text-sm text-green-200">Total Requested</div>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white/5 backdrop-blur-md rounded-xl border border-white/10 p-4">
        <div className="flex flex-col sm:flex-row gap-4">
          {/* Type Filter */}
          <div className="flex items-center gap-2">
            <span className="text-white text-sm font-medium">Type:</span>
            <div className="flex bg-white/10 rounded-lg p-1">
              {['all', 'sent', 'received'].map((type) => (
                <button
                  key={type}
                  onClick={() => setFilter(type as any)}
                  className={`px-3 py-1 text-sm rounded-md transition-colors capitalize ${
                    filter === type 
                      ? 'bg-purple-500 text-white' 
                      : 'text-gray-300 hover:text-white'
                  }`}
                >
                  {type}
                </button>
              ))}
            </div>
          </div>

          {/* Status Filter */}
          <div className="flex items-center gap-2">
            <span className="text-white text-sm font-medium">Status:</span>
            <div className="flex bg-white/10 rounded-lg p-1">
              {['all', 'pending', 'paid', 'declined'].map((status) => (
                <button
                  key={status}
                  onClick={() => setStatusFilter(status as any)}
                  className={`px-3 py-1 text-sm rounded-md transition-colors capitalize ${
                    statusFilter === status 
                      ? 'bg-purple-500 text-white' 
                      : 'text-gray-300 hover:text-white'
                  }`}
                >
                  {status}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Requests List */}
      <div className="bg-white/5 backdrop-blur-md rounded-2xl border border-white/10">
        <div className="p-6 border-b border-white/10">
          <h2 className="text-2xl font-bold text-white">Payment Requests</h2>
          <p className="text-gray-400 mt-1">Manage your sent and received payment requests</p>
        </div>

        <div className="divide-y divide-white/10">
          {filteredRequests.map((request, index) => (
            <motion.div
              key={request.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
              className="p-6 hover:bg-white/5 transition-colors"
            >
              <div className="flex items-center justify-between">
                {/* Left side - Request details */}
                <div className="flex items-center gap-4">
                  {/* Direction indicator */}
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                    request.type === 'sent' 
                      ? 'bg-blue-500/20' 
                      : 'bg-purple-500/20'
                  }`}>
                    <PaperAirplaneIcon className={`w-5 h-5 ${
                      request.type === 'sent' 
                        ? 'text-blue-400' 
                        : 'text-purple-400 rotate-180'
                    }`} />
                  </div>

                  {/* User and details */}
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
                      {request.user.avatar}
                    </div>
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="text-white font-semibold">
                          {request.type === 'sent' ? 'Request to' : 'Request from'} {request.user.username}
                        </h3>
                        <span className={`flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${
                          request.status === 'pending' ? 'bg-yellow-500/20 text-yellow-300' :
                          request.status === 'paid' ? 'bg-green-500/20 text-green-300' :
                          'bg-red-500/20 text-red-300'
                        }`}>
                          {getStatusIcon(request.status)}
                          <span className="capitalize">{request.status}</span>
                        </span>
                      </div>
                      <p className="text-gray-300 text-sm mb-1">{request.description}</p>
                      <div className="flex items-center gap-4 text-xs text-gray-400">
                        <span>Sent {formatDate(request.sentDate)}</span>
                        <span>{request.groupName}</span>
                        {request.status === 'pending' && (
                          <span>Due {formatDate(request.dueDate)}</span>
                        )}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Right side - Amount and actions */}
                <div className="text-right">
                  <div className="text-2xl font-bold text-white mb-2">
                    {formatPiAmount(request.amount)}
                  </div>
                  
                  {request.type === 'received' && request.status === 'pending' && (
                    <div className="flex gap-2">
                      <button
                        onClick={() => handleDeclineRequest(request.id)}
                        className="px-4 py-2 bg-red-600/20 text-red-300 rounded-lg font-medium hover:bg-red-600/30 transition-colors"
                      >
                        Decline
                      </button>
                      <button
                        onClick={() => handlePayRequest(request.id)}
                        className="px-4 py-2 bg-green-600 text-white rounded-lg font-medium hover:bg-green-700 transition-colors"
                      >
                        Pay Now
                      </button>
                    </div>
                  )}
                  
                  {request.type === 'sent' && request.status === 'pending' && (
                    <button className="px-4 py-2 bg-blue-600/20 text-blue-300 rounded-lg font-medium hover:bg-blue-600/30 transition-colors">
                      Send Reminder
                    </button>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  )
}
