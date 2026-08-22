'use client'

import { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Home, Tv, Clapperboard, Sparkles, Crown, LogIn, LogOut, User as UserIcon } from 'lucide-react'
import { useAuth } from '@/contexts/auth-context'
import { AuthModal } from '@/components/auth-modal'
import { cn } from '@/lib/utils'

interface SidebarItem {
  label: string
  href: string
  icon: typeof Home
}

const SIDEBAR_ITEMS: SidebarItem[] = [
  { label: 'Home', href: '/', icon: Home },
  { label: 'TV show', href: '/tv', icon: Tv },
  { label: 'Movie', href: '/movies', icon: Clapperboard },
  { label: 'Animation', href: '/animation', icon: Sparkles },
  { label: 'Get Premium Free', href: '/premium', icon: Crown },
]

function isSidebarLinkActive(pathname: string, href: string): boolean {
  if (href === '/') return pathname === '/'
  if (pathname.startsWith('/watch') || pathname.startsWith('/movie')) {
    return href === '/movies'
  }
  return pathname === href || pathname.startsWith(`${href}/`)
}

export function WatchSidebar() {
  const pathname = usePathname()
  const { user, signOut } = useAuth()
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false)

  const avatarUrl = user?.email
    ? `https://api.dicebear.com/7.x/bottts/svg?seed=${encodeURIComponent(user.email)}`
    : null

  const username = user?.email ? user.email.split('@')[0] : 'User'

  return (
    <>
      <aside className="hidden md:flex w-[185px] bg-[#0c0205]/95 backdrop-blur-md border-r border-white/[0.06] flex-col justify-between fixed left-0 top-14 bottom-0 z-40 overflow-y-auto select-none [&::-webkit-scrollbar]:hidden">
        {/* Top Nav Links */}
        <nav className="px-2.5 py-3.5 space-y-1.5">
          {SIDEBAR_ITEMS.map((item) => {
            const active = isSidebarLinkActive(pathname, item.href)
            const Icon = item.icon

            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  'relative flex items-center justify-between px-3 py-2.5 rounded-xl text-xs sm:text-sm transition-all duration-200 group',
                  active
                    ? 'bg-[#38060c] text-white font-semibold shadow-[0_0_14px_rgba(200,10,30,0.3)] border border-red-800/40'
                    : 'text-[#8a8a93] hover:text-white hover:bg-white/[0.05]',
                )}
              >
                {/* Left Glowing Red Vertical Line on active matching Image 1 */}
                {active && (
                  <span className="absolute left-0 top-2 bottom-2 w-[3.5px] bg-[#E50914] rounded-r-full shadow-[0_0_8px_rgba(229,9,20,0.9)]" />
                )}

                <div className="flex items-center gap-2.5 min-w-0 pl-0.5">
                  <Icon
                    size={16}
                    className={cn(
                      'shrink-0 transition-colors',
                      active ? 'text-white' : 'text-[#7a7a85] group-hover:text-white',
                    )}
                  />
                  <span className="truncate">{item.label}</span>
                </div>

                {/* Red Dot Badge on far right on active matching Image 1 */}
                {active && (
                  <span className="w-1.5 h-1.5 rounded-full bg-[#E50914] shrink-0 shadow-[0_0_6px_rgba(229,9,20,0.8)]" />
                )}
              </Link>
            )
          })}
        </nav>

        {/* Bottom User Profile / Login Area in Sidebar */}
        <div className="p-3 border-t border-white/[0.06] mb-3">
          {user ? (
            <div className="space-y-2">
              <div className="flex items-center gap-2 px-2 py-1.5 rounded-xl bg-white/[0.04] border border-white/[0.06]">
                <img
                  src={avatarUrl!}
                  alt="User Avatar"
                  className="w-6 h-6 rounded-full object-cover shrink-0"
                />
                <span className="text-xs font-semibold text-white truncate">
                  {username}
                </span>
              </div>
              <button
                type="button"
                onClick={() => signOut()}
                className="w-full flex items-center justify-center gap-1.5 py-1.5 text-xs text-gray-400 hover:text-white hover:bg-white/5 rounded-lg transition-colors"
              >
                <LogOut size={13} />
                <span>Logout</span>
              </button>
            </div>
          ) : (
            <button
              type="button"
              onClick={() => setIsAuthModalOpen(true)}
              className="w-full flex items-center justify-center gap-2 py-2.5 px-3 rounded-xl text-xs font-bold text-white bg-[#E50914] hover:bg-[#ff0f1f] shadow-[0_0_16px_rgba(229,9,20,0.5)] transition-all hover:scale-102 active:scale-98 select-none"
            >
              <LogIn size={14} />
              <span>Login</span>
            </button>
          )}
        </div>
      </aside>

      {/* Auth Modal */}
      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
      />
    </>
  )
}
