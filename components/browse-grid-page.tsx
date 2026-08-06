'use client'

import { useMemo, useState } from 'react'
import { Navbar } from '@/components/navbar'
import { FilterPanel, type FilterGroup } from '@/components/filter-panel'
import { MovieCard } from '@/components/movie-card'
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
  initialVisibleCount = 12,
  loadMoreCount = 12,
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

    return filterContent(items, {
      genre: filters.genre,
      country: filters.country,
      year: filters.year,
      language: filters.language,
      sortBy,
    })
  }, [items, filters])

  const visibleItems = filteredItems.slice(0, visibleCount)
  const hasMore = visibleCount < filteredItems.length

  const handleFilterChange = (key: string, value: string) => {
    setFilters((prev) => ({ ...prev, [key]: value }))
    setVisibleCount(initialVisibleCount)
  }

  return (
    <main className="min-h-screen bg-background">
      <Navbar />

      <div className="max-w-7xl mx-auto px-4 pt-24 pb-12 space-y-6">
        <FilterPanel
          groups={filterGroups}
          values={filters}
          onChange={handleFilterChange}
        />

        <h1 className="text-2xl md:text-3xl font-bold text-foreground">{heading}</h1>

        {visibleItems.length > 0 ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
            {visibleItems.map((item) => (
              <MovieCard
                key={item.id}
                id={item.id}
                title={item.title}
                rating={item.rating}
                year={item.year}
              />
            ))}
          </div>
        ) : (
          <div className="py-16 text-center text-muted-foreground">
            No titles match your filters. Try adjusting your selection.
          </div>
        )}

        {hasMore && (
          <div className="flex justify-center pt-4">
            <button
              type="button"
              onClick={() => setVisibleCount((count) => count + loadMoreCount)}
              className="px-8 py-3 rounded-lg bg-secondary hover:bg-accent text-foreground hover:text-white font-semibold text-sm transition-colors border border-border hover:border-accent"
            >
              Load More
            </button>
          </div>
        )}
      </div>
    </main>
  )
}
