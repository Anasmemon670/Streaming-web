'use client'

import { useMemo, useState } from 'react'
import Link from 'next/link'
import { Play, Star } from 'lucide-react'
import { Navbar } from '@/components/navbar'
import { FilterPanel, type FilterGroup } from '@/components/filter-panel'
import {
  filterContent,
  type ContentItem,
  type SortOption,
  FILTER_SORT_OPTIONS,
} from '@/lib/mock-data'

interface BrowseGridPageProps {
  heading: string
  items: ContentItem[]
  filterGroups: FilterGroup[]
  initialVisibleCount?: number
  loadMoreCount?: number
}

export function BrowseGridPage({
  heading,
  items,
  filterGroups,
  initialVisibleCount = 16,
  loadMoreCount = 16,
}: BrowseGridPageProps) {
  const initialValues = useMemo(
    () =>
      filterGroups.reduce<Record<string, string>>((acc, group) => {
        acc[group.key] = group.options[0] ?? 'All'
        return acc
      }, {}),
    [filterGroups],
  )

  const [filters, setFilters] = useState<Record<string, string>>(initialValues)
  const [visibleCount, setVisibleCount] = useState(initialVisibleCount)

  const filteredItems = useMemo(() => {
    const sortBy = FILTER_SORT_OPTIONS.includes(filters.sortBy as SortOption)
      ? (filters.sortBy as SortOption)
      : 'ForYou'

    const baseFiltered = filterContent(items, {
      genre: filters.genre,
      country: filters.country,
      year: filters.year,
      language: filters.language,
      sortBy,
    })

    if (baseFiltered.length === 0) return []

    // Ensure infinite items can be generated smoothly if user keeps clicking Load More
    if (visibleCount > baseFiltered.length) {
      const repeats = Math.ceil(visibleCount / baseFiltered.length)
      const extended: ContentItem[] = []
      for (let r = 0; r < repeats; r++) {
        for (const item of baseFiltered) {
          extended.push({
            ...item,
            id: item.id + r * 10000,
          })
        }
      }
      return extended
    }

    return baseFiltered
  }, [items, filters, visibleCount])

  const visibleItems = filteredItems.slice(0, visibleCount)

  const handleFilterChange = (key: string, value: string) => {
    setFilters((prev) => ({ ...prev, [key]: value }))
    setVisibleCount(initialVisibleCount)
  }

  const handleLoadMore = () => {
    setVisibleCount((prev) => prev + loadMoreCount)
  }

  return (
    <main className="min-h-screen bg-[#0c0c11] text-foreground relative overflow-hidden">
      {/* Top Ambient Crimson/Wine Shade Gradient starting from the top edge and flowing through header into filters */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-[1920px] h-[720px] bg-[radial-gradient(ellipse_90%_60%_at_50%_0%,rgba(230,15,35,0.48),rgba(70,6,14,0.3)_58%,transparent_100%)] pointer-events-none z-0" />
      <div className="absolute top-0 left-0 right-0 h-[620px] bg-gradient-to-b from-[#4e060e]/80 via-[#26070d]/45 to-transparent pointer-events-none z-0" />

      <Navbar />

      <div className="w-full px-3 sm:px-5 md:px-6 lg:px-8 pt-20 pb-16 space-y-6 relative z-10">
        {/* Enclosed Filter Panel */}
        <FilterPanel
          groups={filterGroups}
          values={filters}
          onChange={handleFilterChange}
        />

        {/* Section Heading with Glowing Red Bar matching screenshot */}
        <div className="flex items-center gap-2.5 pt-1">
          <span className="w-1 h-5 bg-[#E50914] rounded-full shadow-[0_0_10px_rgba(229,9,20,0.8)]" />
          <h1 className="text-base sm:text-lg md:text-xl font-bold text-white tracking-tight">
            {heading}
          </h1>
        </div>

        {/* 8 Cards per row on Laptop / Desktop screens */}
        {visibleItems.length > 0 ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-8 gap-2.5 sm:gap-3.5">
            {visibleItems.map((item) => (
              <Link
                key={item.id}
                href={`/movie/${item.id}`}
                className="group cursor-pointer select-none block"
              >
                {/* Poster Container */}
                <div className="relative bg-[#1a1a22] rounded-xl overflow-hidden aspect-[2/3] border border-white/[0.08] shadow-md group-hover:border-white/20 transition-all duration-300">
                  {/* Cinematic Background Gradient */}
                  <div className="w-full h-full bg-gradient-to-br from-[#E50914]/20 via-[#181820] to-[#121216] flex items-center justify-center relative group-hover:scale-105 transition-transform duration-300">
                    <div className="w-10 h-10 rounded-full bg-black/40 border border-white/10 flex items-center justify-center text-white/40 group-hover:text-white group-hover:bg-[#E50914] group-hover:border-transparent transition-all">
                      <Play size={18} className="translate-x-0.5 fill-current" />
                    </div>
                  </div>

                  {/* Red Year Badge on Top-Left matching screenshot */}
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
        ) : (
          <div className="py-16 text-center text-gray-400">
            No titles match your filters. Try adjusting your selection.
          </div>
        )}

        {/* Continuous Load More Button */}
        <div className="flex justify-center pt-6">
          <button
            type="button"
            onClick={handleLoadMore}
            className="px-8 py-2.5 rounded-full bg-[#181822] hover:bg-[#E50914] text-gray-200 hover:text-white font-bold text-xs sm:text-sm transition-all border border-white/10 hover:border-transparent shadow-lg hover:shadow-[0_0_16px_rgba(229,9,20,0.4)] active:scale-95"
          >
            Load More
          </button>
        </div>
      </div>
    </main>
  )
}

