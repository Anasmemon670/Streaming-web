'use client'

import { useState, useRef, useEffect } from 'react'
import Link from 'next/link'
import { ChevronRight, ChevronLeft } from 'lucide-react'
import { MovieCard } from './movie-card'

interface ContentRowProps {
  title: string
  movies: Array<{
    id: number
    title: string
    rating: number
    year: number
    posterUrl?: string
  }>
}

export function ContentRow({ title, movies }: ContentRowProps) {
  const scrollContainerRef = useRef<HTMLDivElement>(null)
  const [canScrollLeft, setCanScrollLeft] = useState(false)
  const [canScrollRight, setCanScrollRight] = useState(true)

  const checkScroll = () => {
    if (!scrollContainerRef.current) return
    const { scrollLeft, scrollWidth, clientWidth } = scrollContainerRef.current
    setCanScrollLeft(scrollLeft > 10)
    setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 10)
  }

  useEffect(() => {
    checkScroll()
    const container = scrollContainerRef.current
    if (container) {
      container.addEventListener('scroll', checkScroll)
    }
    window.addEventListener('resize', checkScroll)
    return () => {
      if (container) {
        container.removeEventListener('scroll', checkScroll)
      }
      window.removeEventListener('resize', checkScroll)
    }
  }, [movies])

  const handleScroll = (direction: 'left' | 'right') => {
    if (!scrollContainerRef.current) return
    const container = scrollContainerRef.current
    const cardElement = container.querySelector('.movie-card-item') as HTMLElement
    if (!cardElement) return

    const style = window.getComputedStyle(container)
    const gap = parseFloat(style.columnGap || style.gap || '14') || 14
    const cardWidthWithGap = cardElement.offsetWidth + gap
    // Slide by exactly 3 cards at a time as requested
    const scrollAmount = cardWidthWithGap * 3
    container.scrollBy({
      left: direction === 'right' ? scrollAmount : -scrollAmount,
      behavior: 'smooth',
    })
  }

  return (
    <div className="relative bg-[#141419]/90 border border-white/[0.08] rounded-2xl p-3 sm:p-4 md:p-5 shadow-xl group/frame overflow-hidden">
      {/* Left Frame Glowing Red Line Shade matching Image 1 */}
      <div className="absolute left-0 top-3 bottom-3 w-[3px] bg-gradient-to-b from-[#E50914] via-[#E50914]/80 to-transparent rounded-r-full shadow-[0_0_12px_rgba(229,9,20,0.6)]" />

      {/* Frame Header: Title + More Button */}
      <div className="flex items-center justify-between mb-3 sm:mb-3.5 px-1">
        <div className="flex items-center gap-2.5">
          <span className="w-1 h-4.5 sm:h-5 bg-[#E50914] rounded-full shadow-[0_0_8px_rgba(229,9,20,0.8)]" />
          <h2 className="text-base sm:text-lg md:text-xl font-bold text-white tracking-tight">
            {title}
          </h2>
        </div>
        <Link
          href="/movies"
          className="px-3 sm:px-3.5 py-1 rounded-full text-xs font-bold text-red-400 hover:text-white bg-red-950/40 hover:bg-[#E50914] border border-red-800/60 transition-all flex items-center gap-1 shadow-sm group/btn"
        >
          <span>More</span>
          <ChevronRight size={13} className="transition-transform group-hover/btn:translate-x-0.5" />
        </Link>
      </div>

      {/* Slider Area */}
      <div className="relative">
        {/* Left Arrow Button - Only visible when scrolled right */}
        {canScrollLeft && (
          <button
            type="button"
            onClick={() => handleScroll('left')}
            className="absolute left-1 sm:left-2 top-1/2 -translate-y-1/2 w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-black/75 hover:bg-black/95 border border-white/20 text-white backdrop-blur-md flex items-center justify-center shadow-2xl transition-all hover:scale-110 active:scale-95 z-20"
            aria-label="Scroll left"
          >
            <ChevronLeft size={20} />
          </button>
        )}

        {/* Scrollable Movie Cards Row */}
        <div
          ref={scrollContainerRef}
          onScroll={checkScroll}
          className="flex gap-2.5 sm:gap-3 md:gap-3.5 overflow-x-auto scroll-smooth py-1 px-1 select-none [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]"
        >
          {movies.map((movie) => (
            <MovieCard key={movie.id} {...movie} />
          ))}
        </div>

        {/* Right Arrow Button - Only visible when remaining cards exist */}
        {canScrollRight && (
          <button
            type="button"
            onClick={() => handleScroll('right')}
            className="absolute right-1 sm:right-2 top-1/2 -translate-y-1/2 w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-black/75 hover:bg-black/95 border border-white/20 text-white backdrop-blur-md flex items-center justify-center shadow-2xl transition-all hover:scale-110 active:scale-95 z-20"
            aria-label="Scroll right"
          >
            <ChevronRight size={20} />
          </button>
        )}
      </div>
    </div>
  )
}


