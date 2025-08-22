'use client'
import { AnalyticsHeader } from '@/components/analytics/AnalyticsHeader'

export default function AnalyticsLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="space-y-6">
      <AnalyticsHeader />
      {children}
    </div>
  )
}
