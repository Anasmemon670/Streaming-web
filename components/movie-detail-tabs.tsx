'use client'

import { useEffect, useState } from 'react'
import { EPISODE_SOURCES } from '@/lib/mock-data'
import { TopCastRow } from '@/components/top-cast-row'
import { UserReviews } from '@/components/user-reviews'
import { cn } from '@/lib/utils'

const SECTIONS = [
  { id: 'episodes', label: 'Episodes' },
  { id: 'top-cast', label: 'Top Cast' },
  { id: 'user-review', label: 'User Review' },
] as const

export function MovieDetailTabs() {
  const [activeSection, setActiveSection] = useState<string>('episodes')

  useEffect(() => {
    const observers: IntersectionObserver[] = []

    SECTIONS.forEach(({ id }) => {
      const el = document.getElementById(id)
      if (!el) return

      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) setActiveSection(id)
        },
        { rootMargin: '-40% 0px -50% 0px', threshold: 0 },
      )
      observer.observe(el)
      observers.push(observer)
    })

    return () => observers.forEach((observer) => observer.disconnect())
  }, [])

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id)
    if (!el) return
    el.scrollIntoView({ behavior: 'smooth', block: 'start' })
    setActiveSection(id)
  }

  return (
    <div className="space-y-8">
      <div className="sticky top-16 z-30 bg-background/95 backdrop-blur border-b border-border -mx-1 px-1">
        <div className="flex gap-1">
          {SECTIONS.map((section) => (
            <button
              key={section.id}
              type="button"
              onClick={() => scrollToSection(section.id)}
              className={cn(
                'px-5 py-3 text-sm font-semibold transition-colors border-b-2 -mb-px',
                activeSection === section.id
                  ? 'border-accent text-accent'
                  : 'border-transparent text-muted-foreground hover:text-foreground',
              )}
            >
              {section.label}
            </button>
          ))}
        </div>
      </div>

      <section id="episodes" className="scroll-mt-28 space-y-4">
        <h2 className="text-xl font-bold text-foreground">Episodes</h2>
        <div className="flex flex-wrap gap-2">
          {EPISODE_SOURCES.map((source) => (
            <span
              key={source.name}
              className="px-4 py-2 rounded-lg text-sm font-semibold bg-secondary text-foreground border border-border"
            >
              {source.name}
            </span>
          ))}
        </div>
      </section>

      <section id="top-cast" className="scroll-mt-28 space-y-4">
        <h2 className="text-xl font-bold text-foreground">Top Cast</h2>
        <TopCastRow />
      </section>

      <section id="user-review" className="scroll-mt-28 space-y-4">
        <h2 className="text-xl font-bold text-foreground">User Review</h2>
        <UserReviews />
      </section>
    </div>
  )
}
