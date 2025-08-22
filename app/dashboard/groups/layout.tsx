'use client'
import { GroupHeader } from '@/components/groups/GroupHeader'

export default function GroupsLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="space-y-6">
      <GroupHeader />
      {children}
    </div>
  )
}
