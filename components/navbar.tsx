'use client'

import { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Search, Menu, X } from 'lucide-react'
import { cn } from '@/lib/utils'
import { NAV_MAIN_LINKS, NAV_MORE_LINKS } from '@/lib/mock-data'
import { AuthModal } from '@/components/auth-modal'

const navLinks = NAV_MAIN_LINKS
const moreLinks = NAV_MORE_LINKS

function isLinkActive(pathname: string, href: string): boolean {
  if (href === '/') return pathname === '/'
  return pathname === href || pathname.startsWith(`${href}/`)
}

export function Navbar() {
  const pathname = usePathname()
  const [mobileOpen, setMobileOpen] = useState(false)
  const [moreOpen, setMoreOpen] = useState(false)
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false)

  const isMoreActive = moreLinks.some((link) => isLinkActive(pathname, link.href))

  const linkClass = (href: string) =>
    cn(
      'text-sm font-medium transition-colors',
      isLinkActive(pathname, href)
        ? 'text-accent'
        : 'text-foreground hover:text-accent',
    )

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur border-b border-border">
        <nav className="max-w-7xl mx-auto px-4 md:px-8 py-3 flex items-center gap-3 md:gap-4">
          {/* Logo — preserved left placement */}
          <Link href="/" className="text-xl sm:text-2xl font-bold text-accent shrink-0">
            MovieBox
          </Link>

          {/* Desktop nav links */}
          <div className="hidden md:flex items-center gap-6 lg:gap-8 flex-1 min-w-0 ml-2 lg:ml-4">
            {navLinks.map((link) => {
              const active = isLinkActive(pathname, link.href)
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={cn(linkClass(link.href), 'relative pb-0.5 shrink-0')}
                >
                  {link.label}
                  {active && (
                    <span className="absolute -bottom-1 left-0 right-0 h-0.5 bg-accent rounded-full" />
                  )}
                </Link>
              )
            })}

            <div
              className="relative shrink-0"
              onMouseEnter={() => setMoreOpen(true)}
              onMouseLeave={() => setMoreOpen(false)}
            >
              <button
                type="button"
                className={cn(
                  'text-sm font-medium transition-colors flex items-center gap-1 py-1',
                  isMoreActive ? 'text-accent' : 'text-foreground hover:text-accent',
                )}
              >
                More
                <span className="text-xs">v</span>
              </button>

              {moreOpen && (
                <div className="absolute top-full left-0 w-56 pt-3">
                  <div className="bg-card border border-border rounded-lg shadow-lg py-2">
                    {moreLinks.map((link) => (
                      <Link
                        key={link.href}
                        href={link.href}
                        className={cn(
                          'block px-4 py-2 text-sm transition-colors',
                          isLinkActive(pathname, link.href)
                            ? 'text-accent bg-accent/10'
                            : 'hover:bg-secondary hover:text-accent',
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

          {/* Right cluster: Search + Login — balanced gap from More */}
          <div className="flex items-center gap-2 sm:gap-3 md:gap-4 ml-auto shrink-0 min-w-0">
            <div className="hidden sm:flex items-center bg-secondary rounded-lg px-2.5 sm:px-3 py-1.5 sm:py-2 w-[140px] sm:w-[160px] md:w-[200px] lg:w-[240px] max-w-[40vw]">
              <Search size={16} className="text-muted-foreground shrink-0" />
              <input
                type="text"
                placeholder="Search..."
                className="bg-transparent ml-1.5 sm:ml-2 w-full min-w-0 text-sm outline-none placeholder-muted-foreground"
              />
            </div>

            <button
              type="button"
              onClick={() => setIsAuthModalOpen(true)}
              className="shrink-0 whitespace-nowrap px-2.5 sm:px-4 py-1.5 sm:py-2 rounded-lg text-[11px] sm:text-sm font-bold text-white bg-[#E50914] hover:bg-[#E50914]/90 shadow-[0_0_14px_rgba(229,9,20,0.45)] transition-colors"
            >
              <span className="sm:hidden">Login</span>
              <span className="hidden sm:inline">Login / Sign Up</span>
            </button>

            <button
              type="button"
              className="md:hidden text-foreground shrink-0 p-1"
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-label="Toggle menu"
            >
              {mobileOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </nav>

        {mobileOpen && (
          <div className="md:hidden bg-card border-t border-border">
            <div className="px-4 py-4 space-y-3">
              {/* Mobile search */}
              <div className="flex sm:hidden items-center bg-secondary rounded-lg px-3 py-2">
                <Search size={16} className="text-muted-foreground shrink-0" />
                <input
                  type="text"
                  placeholder="Search..."
                  className="bg-transparent ml-2 w-full text-sm outline-none placeholder-muted-foreground"
                />
              </div>

              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={cn('block', linkClass(link.href))}
                  onClick={() => setMobileOpen(false)}
                >
                  {link.label}
                </Link>
              ))}
              <button
                type="button"
                onClick={() => setMoreOpen(!moreOpen)}
                className={cn(
                  'block text-sm font-medium transition-colors w-full text-left',
                  isMoreActive ? 'text-accent' : 'hover:text-accent',
                )}
              >
                More v
              </button>
              {moreOpen && (
                <div className="pl-4 space-y-2 text-sm">
                  {moreLinks.map((link) => (
                    <Link
                      key={link.href}
                      href={link.href}
                      className={cn(
                        'block transition-colors',
                        isLinkActive(pathname, link.href)
                          ? 'text-accent'
                          : 'hover:text-accent',
                      )}
                      onClick={() => setMobileOpen(false)}
                    >
                      {link.label}
                    </Link>
                  ))}
                </div>
              )}

              <button
                type="button"
                onClick={() => {
                  setMobileOpen(false)
                  setIsAuthModalOpen(true)
                }}
                className="w-full mt-2 py-2.5 rounded-lg text-sm font-bold text-white bg-[#E50914] hover:bg-[#E50914]/90 shadow-[0_0_14px_rgba(229,9,20,0.45)] transition-colors"
              >
                Login / Sign Up
              </button>
            </div>
          </div>
        )}
      </header>

      <AuthModal isOpen={isAuthModalOpen} onClose={() => setIsAuthModalOpen(false)} />
    </>
  )
}
