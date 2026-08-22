'use client'

import { use, useState, useEffect } from 'react'
import Link from 'next/link'
import { ChevronRight } from 'lucide-react'
import { Navbar } from '@/components/navbar'
import { MovieDetailHero } from '@/components/movie-detail-hero'
import { TrailerPlayer } from '@/components/trailer-player'
import { TopCastSlider } from '@/components/top-cast-slider'
import { UserReviews } from '@/components/user-reviews'
import { MoreLikeThis } from '@/components/more-like-this'
import { getMovieById } from '@/lib/mock-data'
import { cn } from '@/lib/utils'

interface MoviePageProps {
  params: Promise<{ id: string }>
}

const DETAIL_TABS = [
  { id: 'episodes', label: 'Episodes' },
  { id: 'trailer', label: 'Trailer' },
  { id: 'top-cast', label: 'Top Cast' },
  { id: 'user-review', label: 'User Review' },
] as const

const EPISODE_SOURCES = ['film', 'Iklk', 'Netflix', 'Plex', 'Prime Video', 'iQIYI']

export default function MoviePage({ params }: MoviePageProps) {
  const { id } = use(params)
  const movieId = Number(id)
  const movie = getMovieById(movieId)

  const [activeTab, setActiveTab] = useState<string>('episodes')
  const [activeSource, setActiveSource] = useState<string>('film')

  useEffect(() => {
    const handleScrollSpy = () => {
      const scrollPosition = window.scrollY + 200
      for (const tab of DETAIL_TABS) {
        const el = document.getElementById(tab.id)
        if (el) {
          const top = el.offsetTop
          const height = el.offsetHeight
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveTab(tab.id)
            break
          }
        }
      }
    }
    window.addEventListener('scroll', handleScrollSpy)
    return () => window.removeEventListener('scroll', handleScrollSpy)
  }, [])

  const scrollToTab = (tabId: string) => {
    const el = document.getElementById(tabId)
    if (el) {
      const yOffset = -130
      const y = el.getBoundingClientRect().top + window.pageYOffset + yOffset
      window.scrollTo({ top: y, behavior: 'smooth' })
      setActiveTab(tabId)
    }
  }

  return (
    <main className="min-h-screen bg-[#0e0205] bg-[radial-gradient(ellipse_100%_80%_at_50%_0%,rgba(160,10,28,0.45),rgba(40,4,8,0.85)_55%,#090204_100%)] text-foreground relative overflow-hidden flex flex-col justify-between">
      {/* Top Ambient Crimson/Wine Shade Gradient starting from top edge through header into hero box */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-[1920px] h-[750px] bg-[radial-gradient(ellipse_90%_60%_at_50%_0%,rgba(230,15,35,0.45),rgba(70,6,14,0.28)_58%,transparent_100%)] pointer-events-none z-0" />
      <div className="absolute top-0 left-0 right-0 h-[620px] bg-gradient-to-b from-[#4a060e]/75 via-[#22070d]/40 to-transparent pointer-events-none z-0" />

      <Navbar />

      <div className="w-full px-3 sm:px-5 md:px-6 lg:px-8 pt-18 sm:pt-20 pb-12 space-y-5 relative z-10">
        {/* Breadcrumb Navigation: Home > Details */}
        <nav className="flex items-center gap-1.5 text-xs text-gray-400 select-none px-1">
          <Link
            href="/"
            className="hover:text-white transition-colors"
          >
            Home
          </Link>
          <ChevronRight size={13} className="text-gray-500" />
          <span className="text-gray-200 font-medium">{movie.title || 'Details'}</span>
        </nav>

        {/* Hero Movie Info Box (Black to Gray Gradient with Dynamic Movie Info) */}
        <MovieDetailHero movie={movie} />

        {/* Sticky Sub-Nav Section Tabs */}
        <div className="sticky top-14 z-30 bg-[#0c0c11]/90 backdrop-blur-md border-b border-white/[0.08] py-2.5 -mx-3 px-3 sm:-mx-5 sm:px-5 md:-mx-6 md:px-6 lg:-mx-8 lg:px-8">
          <div className="flex items-center gap-4 sm:gap-6 md:gap-8 overflow-x-auto select-none [&::-webkit-scrollbar]:hidden">
            {DETAIL_TABS.map((tab) => (
              <button
                key={tab.id}
                type="button"
                onClick={() => scrollToTab(tab.id)}
                className={cn(
                  'text-xs sm:text-sm font-semibold tracking-tight pb-1 relative transition-colors shrink-0',
                  activeTab === tab.id
                    ? 'text-white'
                    : 'text-gray-400 hover:text-gray-200',
                )}
              >
                <span>{tab.label}</span>
                {activeTab === tab.id && (
                  <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#E50914] rounded-full shadow-[0_0_8px_rgba(229,9,20,0.8)]" />
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Lower Two-Column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-7 sm:gap-8 items-start pt-2">
          {/* Left Column (Approx 70% width: 8 of 12 cols) */}
          <div className="lg:col-span-8 space-y-8">
            {/* Section 1: Episodes */}
            <section id="episodes" className="space-y-3 scroll-mt-28">
              <h2 className="text-base sm:text-lg font-bold text-white tracking-tight">
                Episodes
              </h2>
              <div className="flex flex-wrap gap-2">
                {EPISODE_SOURCES.map((source) => (
                  <button
                    key={source}
                    type="button"
                    onClick={() => setActiveSource(source)}
                    className={cn(
                      'px-4 py-1.5 rounded-full text-xs font-semibold transition-all border select-none',
                      activeSource === source
                        ? 'bg-[#E50914] text-white border-red-700/80 shadow-[0_0_10px_rgba(229,9,20,0.5)]'
                        : 'bg-[#181820] text-gray-300 border-white/10 hover:border-white/20 hover:text-white',
                    )}
                  >
                    {source}
                  </button>
                ))}
              </div>
            </section>

            {/* Section 2: Trailer Video Player (490 x 272, no hover zoom, play/pause on click, volume slider) */}
            <section id="trailer" className="scroll-mt-28">
              <TrailerPlayer />
            </section>

            {/* Section 3: Top Cast (26) Slider */}
            <section id="top-cast" className="scroll-mt-28">
              <TopCastSlider />
            </section>

            {/* Section 4: User Review (with -- No more Content --) */}
            <section id="user-review" className="scroll-mt-28">
              <UserReviews />
            </section>
          </div>

          {/* Right Column (Approx 30% width: 4 of 12 cols): More like this (22 cards) */}
          <div className="lg:col-span-4">
            <MoreLikeThis currentMovieId={movieId} />
          </div>
        </div>
      </div>

      {/* Centered Disclaimer Footer */}
      <footer className="w-full border-t border-white/[0.07] bg-[#09090d] py-6 px-4 sm:px-8 text-center relative z-10">
        <p className="max-w-4xl mx-auto text-xs sm:text-[13px] text-gray-500 leading-relaxed">
          Disclaimer: All videos and pictures on MoviBox are from the Internet, and their copyrights belong to the original creators. We only provide webpage services and do not store, record, or upload any content.
        </p>
      </footer>
    </main>
  )
}
