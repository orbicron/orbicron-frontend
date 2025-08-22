'use client'
import { ProfileHeader } from '@/components/profile/ProfileHeader'

export default function ProfileLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="space-y-6">
      <ProfileHeader />
      {children}
    </div>
  )
}
