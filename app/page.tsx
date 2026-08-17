'use client'

import { Navbar } from '@/components/navbar'
import { HeroCarousel } from '@/components/hero-carousel'
import { ContentRow } from '@/components/content-row'
import { getHomeMovies } from '@/lib/mock-data'

const movies = getHomeMovies()

export default function Page() {
  return (
    <main className="min-h-screen bg-[#0c0c11] text-foreground">
      <Navbar />

      {/* Full-width edge-to-edge Hero Banner */}
      <HeroCarousel />

      {/* Distinct Content Section with separate background below banner */}
      <section className="w-full bg-[#111116] border-t border-white/[0.07]">
        <div className="w-full px-3 sm:px-5 md:px-6 lg:px-8 pt-4 sm:pt-5 pb-14 space-y-5 sm:space-y-6">
          <ContentRow title="Popular Series" movies={movies} />
          <ContentRow title="Trending Now" movies={[...movies].reverse()} />
          <ContentRow
            title="New Releases"
            movies={movies.map((m) => ({ ...m, id: m.id + 100 }))}
          />
          <ContentRow
            title="Recommended For You"
            movies={movies.map((m) => ({ ...m, id: m.id + 200 }))}
          />
        </div>
      </section>
    </main>
  )
}


