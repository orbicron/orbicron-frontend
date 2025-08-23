'use client'
import { usePathname } from 'next/navigation'
import { useState, useEffect } from 'react'
import Link from 'next/link'
import { 
  HomeIcon,
  CreditCardIcon,
  UserGroupIcon,
  BanknotesIcon,
  ChartBarIcon,
  UserIcon,
  Bars3Icon,
  XMarkIcon
} from '@heroicons/react/24/outline'

const navigation = [
  { name: 'Dashboard', href: '/dashboard', icon: HomeIcon, shortName: 'Home' },
  { name: 'Expenses', href: '/dashboard/expenses', icon: CreditCardIcon, shortName: 'Expenses' },
  { name: 'Groups', href: '/dashboard/groups', icon: UserGroupIcon, shortName: 'Groups' },
  { name: 'Settlements', href: '/dashboard/settlements', icon: BanknotesIcon, shortName: 'Settle' },
  { name: 'Analytics', href: '/dashboard/analytics', icon: ChartBarIcon, shortName: 'Charts' },
  { name: 'Profile', href: '/dashboard/profile', icon: UserIcon, shortName: 'Profile' },
]

export const DashboardSidebar = () => {
  const pathname = usePathname()
  const [isMobile, setIsMobile] = useState(false)
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)

  useEffect(() => {
    const checkScreenSize = () => {
      setIsMobile(window.innerWidth < 768) // md breakpoint
    }

    checkScreenSize()
    window.addEventListener('resize', checkScreenSize)

    return () => window.removeEventListener('resize', checkScreenSize)
  }, [])

  // Close sidebar when route changes on mobile
  useEffect(() => {
    setIsSidebarOpen(false)
  }, [pathname])

  if (isMobile) {
    return (
      <>
        {/* Mobile Bottom Navigation */}
        <nav className="fixed bottom-0 left-0 right-0 z-50 bg-white/10 backdrop-blur-md border-t border-white/20">
          <div className="grid grid-cols-5 h-16">
            {navigation.slice(0, 5).map((item) => {
              const isActive = pathname === item.href
              const Icon = item.icon
              
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`flex flex-col items-center justify-center transition-all duration-200 ${
                    isActive
                      ? 'text-white bg-purple-500/20'
                      : 'text-gray-400 hover:text-white'
                  }`}
                >
                  <div className={`p-1.5 rounded-lg ${
                    isActive 
                      ? 'bg-gradient-to-r from-purple-500 to-pink-500' 
                      : ''
                  }`}>
                    <Icon className="w-5 h-5" />
                  </div>
                  <span className="text-xs mt-1 font-medium">
                    {item.shortName}
                  </span>
                  {isActive && (
                    <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-8 h-0.5 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full"></div>
                  )}
                </Link>
              )
            })}
          </div>
        </nav>

        {/* Profile Button - Floating Action Button on Mobile */}
        {pathname !== '/dashboard/profile' && (
          <Link
            href="/dashboard/profile"
            className="fixed bottom-20 right-4 z-40 w-12 h-12 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full flex items-center justify-center shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110"
          >
            <UserIcon className="w-6 h-6 text-white" />
          </Link>
        )}

        {/* Mobile Sidebar Overlay (for additional options if needed) */}
        {isSidebarOpen && (
          <>
            <div 
              className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40"
              onClick={() => setIsSidebarOpen(false)}
            />
            <div className="fixed left-0 top-0 bottom-0 w-64 bg-slate-900/95 backdrop-blur-md z-50 transform transition-transform duration-300">
              <div className="p-4">
                <button
                  onClick={() => setIsSidebarOpen(false)}
                  className="absolute top-4 right-4 p-2 text-gray-400 hover:text-white rounded-lg hover:bg-white/10"
                >
                  <XMarkIcon className="w-6 h-6" />
                </button>
                
                <div className="mt-8">
                  <h2 className="text-white font-bold text-xl mb-6">Navigation</h2>
                  <nav className="space-y-2">
                    {navigation.map((item) => {
                      const isActive = pathname === item.href
                      const Icon = item.icon
                      
                      return (
                        <Link
                          key={item.name}
                          href={item.href}
                          className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 ${
                            isActive
                              ? 'bg-gradient-to-r from-purple-500/20 to-pink-500/20 text-white border border-purple-300/30'
                              : 'text-gray-300 hover:text-white hover:bg-white/10'
                          }`}
                        >
                          <Icon className="w-5 h-5" />
                          <span className="font-medium">{item.name}</span>
                        </Link>
                      )
                    })}
                  </nav>
                </div>
              </div>
            </div>
          </>
        )}
      </>
    )
  }

  // Desktop Sidebar (unchanged)
  return (
    <aside className="fixed left-0 top-16 h-[calc(100vh-4rem)] w-64 bg-white/5 backdrop-blur-md border-r border-white/10 z-30">
      {/* Sidebar Header */}
      <div className="p-4 border-b border-white/10">
        <div className="flex items-center gap-2 text-purple-300">
          <div className="w-2 h-2 bg-purple-400 rounded-full animate-pulse"></div>
          <span className="text-sm font-medium">Navigation</span>
        </div>
      </div>

      {/* Navigation */}
      <nav className="p-4 space-y-2 overflow-y-auto">
        {navigation.map((item) => {
          const isActive = pathname === item.href
          const Icon = item.icon
          
          return (
            <Link
              key={item.name}
              href={item.href}
              className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 group ${
                isActive
                  ? 'bg-gradient-to-r from-purple-500/20 to-pink-500/20 text-white border border-purple-300/30 shadow-lg'
                  : 'text-gray-300 hover:text-white hover:bg-white/10 hover:scale-105'
              }`}
            >
              <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                isActive 
                  ? 'bg-gradient-to-r from-purple-500 to-pink-500' 
                  : 'bg-white/10 group-hover:bg-purple-500/20'
              }`}>
                <Icon className={`w-5 h-5 ${
                  isActive ? 'text-white' : 'text-gray-400 group-hover:text-purple-300'
                }`} />
              </div>
              
              <div className="flex-1">
                <span className="font-medium">{item.name}</span>
                {isActive && (
                  <div className="w-full h-0.5 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full mt-1"></div>
                )}
              </div>
              
              {isActive && (
                <div className="w-2 h-2 bg-purple-400 rounded-full animate-pulse"></div>
              )}
            </Link>
          )
        })}
      </nav>

      {/* Sidebar Footer */}
      <div className="absolute bottom-4 left-4 right-4">
        <div className="p-3 bg-white/5 rounded-xl border border-white/10">
          <div className="flex items-center gap-2 text-xs text-purple-300">
            <div className="w-1.5 h-1.5 bg-green-400 rounded-full"></div>
            <span>All systems operational</span>
          </div>
        </div>
      </div>
    </aside>
  )
}
