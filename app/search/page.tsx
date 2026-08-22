'use client'

import { useSearchParams } from 'next/navigation'
import { useState, useMemo, Suspense } from 'react'
import Link from 'next/link'
import { ChevronRight, Play, Star, Sparkles, RefreshCw } from 'lucide-react'
import { Navbar } from '@/components/navbar'
import { ALL_CATALOG, MOCK_MOVIES, Movie } from '@/lib/mock-data'

function SearchContent() {
  const searchParams = useSearchParams()
  const query = searchParams.get('q') || ''
  const [visibleCount, setVisibleCount] = useState(24)

  // Find all matched movies + related movies
  const allResults = useMemo(() => {
    const term = query.toLowerCase().trim()
    const pool: Movie[] = [...MOCK_MOVIES, ...ALL_CATALOG]

    // Deduplicate by title
    const uniquePool = pool.filter(
      (item, idx, self) => self.findIndex((t) => t.title.toLowerCase() === item.title.toLowerCase()) === idx,
    )

    if (!term) return uniquePool

    const exactOrPrefixMatches = uniquePool.filter((item) =>
      item.title.toLowerCase().includes(term),
    )

    const genreMatches = uniquePool.filter((item) =>
      item.genres?.some((g) => g.toLowerCase().includes(term)),
    )

    const combined = [...exactOrPrefixMatches, ...genreMatches]
    const uniqueMatches = combined.filter(
      (item, idx, self) => self.findIndex((t) => t.id === item.id) === idx,
    )

    // If matches are few, fill up with related recommendations so user gets plenty of content
    if (uniqueMatches.length < 32) {
      const fillers = uniquePool.filter((item) => !uniqueMatches.some((m) => m.id === item.id))
      return [...uniqueMatches, ...fillers]
    }

    return uniqueMatches
  }, [query])

  const visibleMovies = allResults.slice(0, visibleCount)
  const hasMore = visibleCount < allResults.length

  const handleSeeMore = () => {
    setVisibleCount((prev) => prev + 16)
  }

  return (
    <div className="w-full px-3 sm:px-5 md:px-6 lg:px-8 pt-18 sm:pt-20 pb-16 space-y-6 relative z-10">
      {/* Breadcrumb: Home > Search Results > "Query" */}
      <nav className="flex items-center gap-1.5 text-xs text-gray-400 select-none px-1 flex-wrap">
        <Link href="/" className="hover:text-white transition-colors">
          Home
        </Link>
        <ChevronRight size={13} className="text-gray-500" />
        <span className="text-gray-400">Search Results</span>
        {query && (
          <>
            <ChevronRight size={13} className="text-gray-500" />
            <span className="text-white font-medium truncate max-w-[200px]">
              &ldquo;{query}&rdquo;
            </span>
          </>
        )}
      </nav>

      {/* Heading Title with Glowing Red Bar */}
      <div className="flex items-center justify-between flex-wrap gap-2 border-b border-white/[0.08] pb-3">
        <div className="flex items-center gap-2.5">
          <span className="w-1 h-5 bg-[#E50914] rounded-full shadow-[0_0_10px_rgba(229,9,20,0.8)]" />
          <h1 className="text-base sm:text-lg md:text-xl font-bold text-white tracking-tight">
            {query ? `Search results for "${query}"` : 'All Movies & Series'}
          </h1>
        </div>

        <span className="text-xs text-gray-400 font-medium">
          Showing {visibleMovies.length} of {allResults.length} titles
        </span>
      </div>

      {/* 8-Card Responsive Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-8 gap-2.5 sm:gap-3.5">
        {visibleMovies.map((item) => (
          <Link
            key={item.id}
            href={`/movie/${item.id}`}
            className="group cursor-pointer select-none block"
          >
            {/* Poster Card */}
            <div className="relative bg-[#1a1a24] rounded-xl overflow-hidden aspect-[2/3] border border-white/[0.08] shadow-md group-hover:border-white/20 transition-all duration-300">
              <div className="w-full h-full bg-gradient-to-br from-[#E50914]/20 via-[#181820] to-[#101014] flex items-center justify-center relative group-hover:scale-105 transition-transform duration-300">
                <div className="w-10 h-10 rounded-full bg-black/40 border border-white/10 flex items-center justify-center text-white/40 group-hover:text-white group-hover:bg-[#E50914] group-hover:border-transparent transition-all">
                  <Play size={18} className="translate-x-0.5 fill-current" />
                </div>
              </div>

              {/* Red Year Badge on Top-Left */}
              <div className="absolute top-2 left-2 bg-[#E50914] text-white px-1.5 py-0.5 rounded text-[10px] font-bold shadow-md">
                {item.year}
              </div>

              {/* Rating Badge on Bottom-Right */}
              <div className="absolute bottom-2 right-2 bg-black/80 backdrop-blur-md border border-white/10 text-amber-400 px-1.5 py-0.5 rounded text-[10px] font-bold flex items-center gap-1 shadow-lg">
                <Star size={10} className="fill-amber-400 text-amber-400" />
                <span>{item.rating.toFixed(1)}</span>
              </div>

              {/* Hover Overlay */}
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex items-center justify-center">
                <div className="w-10 h-10 rounded-full bg-[#E50914] text-white flex items-center justify-center shadow-[0_0_16px_rgba(229,9,20,0.6)] transform scale-90 group-hover:scale-100 transition-transform">
                  <Play size={18} className="fill-white translate-x-0.5" />
                </div>
              </div>
            </div>

            {/* Movie Title */}
            <div className="mt-1.5">
              <h3 className="text-xs sm:text-sm font-semibold text-gray-200 group-hover:text-white truncate transition-colors">
                {item.title}
              </h3>
            </div>
          </Link>
        ))}
      </div>

      {/* See More Glowing Red Button */}
      {hasMore && (
        <div className="pt-8 pb-4 flex justify-center">
          <button
            type="button"
            onClick={handleSeeMore}
            className="flex items-center gap-2.5 px-8 py-3 rounded-full text-sm font-bold text-white bg-[#E50914] hover:bg-[#ff0f1f] shadow-[0_0_24px_rgba(229,9,20,0.65)] hover:scale-105 active:scale-95 transition-all select-none"
          >
            <Sparkles size={16} />
            <span>See More</span>
          </button>
        </div>
      )}
    </div>
  )
}

export default function SearchPage() {
  return (
    <main className="min-h-screen bg-[#0c0c11] text-foreground relative overflow-hidden flex flex-col justify-between">
      {/* Top Ambient Crimson/Wine Shade Gradient */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-[1920px] h-[720px] bg-[radial-gradient(ellipse_90%_60%_at_50%_0%,rgba(230,15,35,0.48),rgba(70,6,14,0.3)_58%,transparent_100%)] pointer-events-none z-0" />
      <div className="absolute top-0 left-0 right-0 h-[620px] bg-gradient-to-b from-[#4e060e]/80 via-[#26070d]/45 to-transparent pointer-events-none z-0" />

      <Navbar />

      <Suspense fallback={<div className="py-32 text-center text-gray-400">Loading search results...</div>}>
        <SearchContent />
      </Suspense>

      {/* Centered Disclaimer Footer */}
      <footer className="w-full border-t border-white/[0.08] bg-[#070103] py-6 px-4 sm:px-8 text-center relative z-10">
        <p className="max-w-4xl mx-auto text-xs text-gray-500 leading-relaxed">
          Disclaimer: All videos and pictures on MoviBox are from the Internet, and their copyrights belong to the original creators. We only provide webpage services and do not store, record, or upload any content.
        </p>
      </footer>
    </main>
  )
}
