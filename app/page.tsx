'use client'

import { Navbar } from '@/components/navbar'
import { HeroCarousel } from '@/components/hero-carousel'
import { ContentRow } from '@/components/content-row'
import { getHomeMovies } from '@/lib/mock-data'

const movies = getHomeMovies()

export default function Page() {
  return (
    <main className="min-h-screen bg-background">
      <Navbar />

      <div className="max-w-7xl mx-auto px-4 py-8 space-y-12">
        <HeroCarousel />

        <ContentRow title="Trending Now" movies={movies.slice(0, 6)} />
        <ContentRow title="Top Rated" movies={movies.slice(6, 12)} />
        <ContentRow
          title="New Releases"
          movies={movies.map((m) => ({ ...m, id: m.id + 100 }))}
        />
        <ContentRow
          title="Recommended For You"
          movies={movies.map((m) => ({ ...m, id: m.id + 200 }))}
        />

        <div className="h-8" />
      </div>
    </main>
  )
}
