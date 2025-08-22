'use client'
import { usePathname } from 'next/navigation'
import Link from 'next/link'
import { 
  HomeIcon,
  CreditCardIcon,
  UserGroupIcon,
  BanknotesIcon,
  ChartBarIcon,
  UserIcon
} from '@heroicons/react/24/outline'

const navigation = [
  { name: 'Dashboard', href: '/dashboard', icon: HomeIcon },
  { name: 'Expenses', href: '/dashboard/expenses', icon: CreditCardIcon },
  { name: 'Groups', href: '/dashboard/groups', icon: UserGroupIcon },
  { name: 'Settlements', href: '/dashboard/settlements', icon: BanknotesIcon },
  { name: 'Analytics', href: '/dashboard/analytics', icon: ChartBarIcon },
  { name: 'Profile', href: '/dashboard/profile', icon: UserIcon },
]

export const DashboardSidebar = () => {
  const pathname = usePathname()

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
