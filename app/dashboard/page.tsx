'use client'
import { OverviewCards } from '@/components/dashboard/OverviewCards'
import { QuickActions } from '@/components/dashboard/QuickActions'
import { SpendingInsights } from '@/components/dashboard/SpendingInsights'
import { RecentActivity } from '@/components/dashboard/RecentActivity'

export default function DashboardPage() {
  return (
    <div className="space-y-8">
      {/* Welcome Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white mb-2">
          Welcome back! 👋
        </h1>
        <p className="text-purple-300">
          Here's what's happening with your expenses today.
        </p>
      </div>

      {/* Overview Cards */}
      <OverviewCards />

      {/* Quick Actions */}
      <QuickActions />

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Spending Insights - Takes 2 columns */}
        <div className="lg:col-span-2">
          <SpendingInsights />
        </div>
        
        {/* Recent Activity - Takes 1 column */}
        <div className="lg:col-span-1">
          <RecentActivity />
        </div>
      </div>
    </div>
  )
}
