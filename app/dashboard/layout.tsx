'use client'
import { DashboardHeader } from '@/components/dashboard/DashboardHeader'
import { DashboardSidebar } from '@/components/dashboard/DashboardSidebar'
import { useAuthStore } from '@/store/authStore'
import { redirect } from 'next/navigation'
import { useEffect } from 'react'

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const { isAuthenticated } = useAuthStore()

  useEffect(() => {
    if (!isAuthenticated) {
      redirect('/')
    }
  }, [isAuthenticated])

  if (!isAuthenticated) {
    return null
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      <DashboardHeader />
      <div className="flex pt-16"> {/* Add padding-top for fixed header */}
        <DashboardSidebar />
        <main className="flex-1 p-6 ml-64 min-h-[calc(100vh-4rem)]"> {/* Adjust for header height */}
          {children}
        </main>
      </div>
    </div>
  )
}
