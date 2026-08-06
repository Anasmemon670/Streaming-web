'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Home, Tv, Clapperboard, Sparkles, Crown } from 'lucide-react'
import { WATCH_SIDEBAR_LINKS } from '@/lib/mock-data'
import { cn } from '@/lib/utils'
import type { LucideIcon } from 'lucide-react'

const ICONS: Record<string, LucideIcon> = {
  '/': Home,
  '/tv': Tv,
  '/movies': Clapperboard,
  '/animation': Sparkles,
  '/premium': Crown,
}

function isLinkActive(pathname: string, href: string): boolean {
  if (href === '/') return pathname === '/'
  return pathname === href || pathname.startsWith(`${href}/`)
}

export function WatchSidebar() {
  const pathname = usePathname()

  return (
    <aside className="hidden md:flex w-[200px] bg-[#121217] border-r border-border flex-col fixed left-0 top-14 bottom-0 z-40 overflow-y-auto">
      <nav className="px-2 py-4 space-y-1">
        {WATCH_SIDEBAR_LINKS.map((link) => {
          const active = isLinkActive(pathname, link.href)
          const Icon = ICONS[link.href] ?? Home

          return (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                'flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors',
                active
                  ? 'bg-[#1e1e24] text-white border-l-4 border-[#E50914] pl-2'
                  : 'text-[#888888] border-l-4 border-transparent hover:text-white hover:bg-[#1a1a20]',
              )}
            >
              <Icon
                size={18}
                className={cn('shrink-0', active ? 'text-white' : 'text-[#888888]')}
              />
              <span className="truncate">{link.label}</span>
            </Link>
          )
        })}
      </nav>
    </aside>
  )
}
