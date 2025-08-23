'use client'
import { DashboardHeader } from '@/components/dashboard/DashboardHeader'
import { DashboardSidebar } from '@/components/dashboard/DashboardSidebar'
import { useAuthStore } from '@/store/authStore'
import { redirect } from 'next/navigation'
import { useEffect, useState } from 'react'

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const { isAuthenticated } = useAuthStore()
  const [isMobile, setIsMobile] = useState(false)

  // useEffect(() => {
  //   if (!isAuthenticated) {
  //     redirect('/')
  //   }
  // }, [isAuthenticated])

  useEffect(() => {
    const checkScreenSize = () => {
      setIsMobile(window.innerWidth < 768)
    }

    checkScreenSize()
    window.addEventListener('resize', checkScreenSize)

    return () => window.removeEventListener('resize', checkScreenSize)
  }, [])

  // if (!isAuthenticated) {
  //   return null
  // }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      <DashboardHeader />
      <div className="flex pt-16">
        <DashboardSidebar />
        <main className={`flex-1 p-4 md:p-6 min-h-[calc(100vh-4rem)] ${
          isMobile ? 'mb-16' : 'ml-64'
        }`}>
          {children}
        </main>
      </div>
    </div>
  )
}
