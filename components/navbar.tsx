'use client'

import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Search, Menu, X, LogOut, ChevronDown } from 'lucide-react'
import { cn } from '@/lib/utils'
import { NAV_MAIN_LINKS, NAV_MORE_LINKS } from '@/lib/mock-data'
import { AuthModal } from '@/components/auth-modal'
import { useAuth } from '@/contexts/auth-context'
import { MoviBoxLogo } from '@/components/movibox-logo'

const navLinks = NAV_MAIN_LINKS
const moreLinks = NAV_MORE_LINKS

function isLinkActive(pathname: string, href: string): boolean {
  if (href === '/') return pathname === '/'
  return pathname === href || pathname.startsWith(`${href}/`)
}

function extractUsernameFromEmail(email?: string | null): string {
  if (!email) return 'User'
  const localPart = email.split('@')[0]
  return localPart
    .split('.')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ')
}

export function Navbar() {
  const pathname = usePathname()
  const { user, signOut } = useAuth()
  const [mobileOpen, setMobileOpen] = useState(false)
  const [moreOpen, setMoreOpen] = useState(false)
  const [userMenuOpen, setUserMenuOpen] = useState(false)
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false)
  const userMenuRef = useRef<HTMLDivElement>(null)

  const avatarUrl = user?.email
    ? `https://api.dicebear.com/7.x/bottts/svg?seed=${encodeURIComponent(user.email)}`
    : null

  // Close user menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (userMenuRef.current && !userMenuRef.current.contains(event.target as Node)) {
        setUserMenuOpen(false)
      }
    }

    if (userMenuOpen) {
      document.addEventListener('mousedown', handleClickOutside)
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [userMenuOpen])

  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const isMoreActive = moreLinks.some((link) => isLinkActive(pathname, link.href))
  const isCategoryPage =
    pathname === '/tv' ||
    pathname === '/movies' ||
    pathname === '/animation' ||
    pathname.startsWith('/movie')

  return (
    <>
      <header
        className={cn(
          'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
          scrolled
            ? 'bg-[#0a0a0f]/90 backdrop-blur-md border-b border-white/5 shadow-lg'
            : 'bg-transparent border-b border-transparent',
        )}
      >
        <nav className="w-full px-4 sm:px-6 md:px-8 lg:px-10 py-2.5 sm:py-3 flex items-center justify-between gap-3 md:gap-6">
          {/* Logo with custom vector icon and white text */}
          <MoviBoxLogo />

          {/* Desktop Nav Links */}
          <div className="hidden md:flex items-center gap-1.5 lg:gap-2 flex-1 min-w-0 ml-1 lg:ml-3">
            {navLinks.map((link) => {
              const active = isLinkActive(pathname, link.href)
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={cn(
                    'text-sm font-medium px-3.5 py-1.5 rounded-full transition-all duration-200 shrink-0 select-none',
                    active
                      ? isCategoryPage
                        ? 'bg-[#38060c]/80 border border-red-800/80 text-white shadow-[0_0_10px_rgba(200,10,30,0.3)]'
                        : 'bg-[#22222a] border border-white/10 text-white shadow-sm'
                      : 'text-gray-300 hover:text-white hover:bg-white/10',
                  )}
                >
                  {link.label}
                </Link>
              )
            })}

            {/* More Dropdown */}
            <div
              className="relative shrink-0"
              onMouseEnter={() => setMoreOpen(true)}
              onMouseLeave={() => setMoreOpen(false)}
            >
              <button
                type="button"
                className={cn(
                  'text-sm font-medium px-3.5 py-1.5 rounded-full transition-all duration-200 flex items-center gap-1 shrink-0 select-none',
                  isMoreActive
                    ? isCategoryPage
                      ? 'bg-[#38060c]/80 border border-red-800/80 text-white shadow-[0_0_10px_rgba(200,10,30,0.3)]'
                      : 'bg-[#22222a] border border-white/10 text-white shadow-sm'
                    : 'text-gray-300 hover:text-white hover:bg-white/10',
                )}
              >
                <span>More</span>
                <ChevronDown size={14} className="opacity-70" />
              </button>

              {moreOpen && (
                <div className="absolute top-full left-0 w-56 pt-2 z-50">
                  <div className="bg-[#18181f]/95 backdrop-blur-md border border-white/10 rounded-xl shadow-2xl py-2 overflow-hidden">
                    {moreLinks.map((link) => (
                      <Link
                        key={link.href}
                        href={link.href}
                        className={cn(
                          'block px-4 py-2.5 text-sm transition-colors',
                          isLinkActive(pathname, link.href)
                            ? 'text-white bg-white/10 font-semibold'
                            : 'text-gray-300 hover:bg-white/5 hover:text-white',
                        )}
                      >
                        {link.label}
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Right Cluster: Search Bar + Login Button */}
          <div className="flex items-center gap-2.5 sm:gap-3.5 md:gap-4 shrink-0 min-w-0">
            {/* Search Input with transparent backdrop allowing ambient shade to shine through */}
            <div className="hidden sm:flex items-center bg-black/30 backdrop-blur-sm border border-white/10 rounded-full px-3.5 sm:px-4 py-1.5 sm:py-2 w-[180px] sm:w-[220px] md:w-[270px] lg:w-[320px] transition-all focus-within:border-white/25 focus-within:bg-black/45">
              <Search size={16} className="text-gray-400 shrink-0" />
              <input
                type="text"
                placeholder="Search movies/ TV Shows"
                className="bg-transparent ml-2 w-full min-w-0 text-sm text-white placeholder-gray-400/80 outline-none"
              />
            </div>

            {/* User Profile or Login Red Pill Button */}
            {user ? (
              <div className="relative shrink-0" ref={userMenuRef}>
                <button
                  type="button"
                  onClick={() => setUserMenuOpen(!userMenuOpen)}
                  className="flex items-center gap-2 px-2.5 sm:px-3.5 py-1.5 sm:py-2 rounded-full bg-[#1e1e24] border border-white/10 hover:bg-[#25252c] transition-colors"
                >
                  <img
                    src={avatarUrl!}
                    alt="User avatar"
                    className="w-7 h-7 sm:w-7 sm:h-7 rounded-full object-cover"
                  />
                  <span className="hidden md:block text-xs sm:text-sm font-medium text-white max-w-[120px] truncate">
                    {extractUsernameFromEmail(user.email)}
                  </span>
                  <ChevronDown size={14} className="text-gray-400" />
                </button>

                {userMenuOpen && (
                  <div className="absolute right-0 top-full mt-2 w-48 bg-[#18181f]/95 backdrop-blur-md border border-white/10 rounded-xl shadow-2xl py-2 z-50">
                    <button
                      type="button"
                      onClick={async () => {
                        await signOut()
                        setUserMenuOpen(false)
                      }}
                      className="w-full flex items-center gap-2 px-4 py-2 text-sm text-gray-200 hover:bg-white/10 hover:text-white transition-colors"
                    >
                      <LogOut size={16} />
                      Logout
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <button
                type="button"
                onClick={() => setIsAuthModalOpen(true)}
                className="shrink-0 whitespace-nowrap px-4 sm:px-5 py-1.5 sm:py-2 rounded-full text-xs sm:text-sm font-bold text-white bg-[#E50914] hover:bg-[#ff0f1f] shadow-[0_0_16px_rgba(229,9,20,0.45)] transition-all hover:scale-105 active:scale-95 flex items-center gap-2"
              >
                <span className="sm:hidden">Login</span>
                <span className="hidden sm:inline">Login / Sign Up</span>
              </button>
            )}

            {/* Mobile Hamburger Toggle */}
            <button
              type="button"
              className="md:hidden text-gray-200 hover:text-white shrink-0 p-1.5 rounded-lg hover:bg-white/10 transition-colors"
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-label="Toggle menu"
            >
              {mobileOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </nav>

        {/* Mobile Navigation Drawer */}
        {mobileOpen && (
          <div className="md:hidden bg-[#111116]/95 backdrop-blur-lg border-t border-white/10 shadow-2xl">
            <div className="px-4 py-4 space-y-3">
              {/* Mobile Search */}
              <div className="flex sm:hidden items-center bg-[#18181e] border border-white/10 rounded-full px-3.5 py-2">
                <Search size={16} className="text-gray-400 shrink-0" />
                <input
                  type="text"
                  placeholder="Search movies/ TV Shows"
                  className="bg-transparent ml-2 w-full text-sm text-white placeholder-gray-400 outline-none"
                />
              </div>

              {navLinks.map((link) => {
                const active = isLinkActive(pathname, link.href)
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={cn(
                      'block px-3.5 py-2 rounded-lg text-sm font-medium transition-colors',
                      active
                        ? 'bg-[#22222a] text-white border border-white/10'
                        : 'text-gray-300 hover:bg-white/10 hover:text-white',
                    )}
                    onClick={() => setMobileOpen(false)}
                  >
                    {link.label}
                  </Link>
                )
              })}

              <div>
                <button
                  type="button"
                  onClick={() => setMoreOpen(!moreOpen)}
                  className={cn(
                    'flex items-center justify-between w-full px-3.5 py-2 rounded-lg text-sm font-medium transition-colors',
                    isMoreActive
                      ? 'bg-[#22222a] text-white border border-white/10'
                      : 'text-gray-300 hover:bg-white/10 hover:text-white',
                  )}
                >
                  <span>More</span>
                  <ChevronDown
                    size={14}
                    className={cn('transition-transform duration-200', moreOpen && 'rotate-180')}
                  />
                </button>
                {moreOpen && (
                  <div className="pl-4 mt-1.5 space-y-1">
                    {moreLinks.map((link) => (
                      <Link
                        key={link.href}
                        href={link.href}
                        className={cn(
                          'block px-3 py-1.5 rounded-md text-sm transition-colors',
                          isLinkActive(pathname, link.href)
                            ? 'text-white font-semibold'
                            : 'text-gray-400 hover:text-white',
                        )}
                        onClick={() => setMobileOpen(false)}
                      >
                        {link.label}
                      </Link>
                    ))}
                  </div>
                )}
              </div>

              {user ? (
                <div className="flex items-center gap-3 pt-3 mt-3 border-t border-white/10">
                  <img
                    src={avatarUrl!}
                    alt="User avatar"
                    className="w-9 h-9 rounded-full object-cover"
                  />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-white truncate">
                      {extractUsernameFromEmail(user.email)}
                    </p>
                    <button
                      type="button"
                      onClick={async () => {
                        await signOut()
                        setMobileOpen(false)
                      }}
                      className="text-xs text-gray-400 hover:text-white transition-colors"
                    >
                      Logout
                    </button>
                  </div>
                </div>
              ) : (
                <button
                  type="button"
                  onClick={() => {
                    setMobileOpen(false)
                    setIsAuthModalOpen(true)
                  }}
                  className="w-full mt-2 py-2.5 rounded-full text-sm font-bold text-white bg-[#E50914] hover:bg-[#ff0f1f] shadow-[0_0_14px_rgba(229,9,20,0.45)] transition-colors"
                >
                  Login / Sign Up
                </button>
              )}
            </div>
          </div>
        )}
      </header>

      <AuthModal isOpen={isAuthModalOpen} onClose={() => setIsAuthModalOpen(false)} />
    </>
  )
}

