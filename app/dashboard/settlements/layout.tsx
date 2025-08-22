'use client'
import { SettlementsHeader } from '@/components/settlements/SettlementsHeader'

export default function SettlementsLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="space-y-6">
      <SettlementsHeader />
      {children}
    </div>
  )
}
