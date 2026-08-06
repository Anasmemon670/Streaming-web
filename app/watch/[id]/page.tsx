'use client'

import { use } from 'react'
import { Navbar } from '@/components/navbar'
import { WatchSidebar } from '@/components/watch-sidebar'
import { EpisodeSelector } from '@/components/episode-selector'
import { TopCastRow } from '@/components/top-cast-row'
import { MovieCard } from '@/components/movie-card'
import { VideoPlayer } from '@/components/video-player'
import { WatchActionButtons } from '@/components/watch-action-buttons'
import { getMovieById, getRecommendedMovies } from '@/lib/mock-data'

interface WatchPageProps {
  params: Promise<{ id: string }>
}

export default function WatchPage({ params }: WatchPageProps) {
  const { id } = use(params)
  const movie = getMovieById(Number(id))
  const recommendations = getRecommendedMovies(Number(id), 14)
  const genres = movie.genres.slice(0, 3)

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <WatchSidebar />

      <div className="md:pl-[200px] pt-14">
        <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,1fr)_210px] gap-3 px-3 md:px-4 pb-10 items-start">
          {/* Main stream */}
          <div className="min-w-0 space-y-5">
            <h1 className="text-base md:text-lg font-semibold text-foreground pt-3">
              {movie.title}
            </h1>

            <VideoPlayer title={movie.title} />

            <div className="space-y-3">
              <div className="flex flex-wrap items-center gap-3">
                <h2 className="text-xl md:text-2xl font-bold text-foreground">{movie.title}</h2>
                <span className="inline-flex items-center gap-1 bg-accent text-white text-xs font-bold px-2 py-0.5 rounded">
                  ★ {movie.rating.toFixed(1)} / 10
                </span>
              </div>

              <div className="flex flex-wrap items-center gap-2 text-sm">
                <span className="text-muted-foreground">{movie.year}</span>
                <span className="text-border">|</span>
                {genres.map((genre, index) => (
                  <span key={genre} className="text-accent">
                    {genre}
                    {index < genres.length - 1 ? ',' : ''}
                  </span>
                ))}
              </div>

              <div className="flex flex-wrap gap-2">
                {movie.country && (
                  <span className="px-2.5 py-1 bg-secondary text-muted-foreground text-xs rounded-full border border-border">
                    {movie.country}
                  </span>
                )}
                {movie.language && (
                  <span className="px-2.5 py-1 bg-secondary text-muted-foreground text-xs rounded-full border border-border">
                    {movie.language}
                  </span>
                )}
                {genres.map((genre) => (
                  <span
                    key={`g-${genre}`}
                    className="px-2.5 py-1 bg-accent/20 text-accent text-xs rounded-full"
                  >
                    {genre}
                  </span>
                ))}
              </div>

              <p className="text-sm md:text-base text-foreground leading-relaxed max-w-4xl">
                {movie.overview}
              </p>

              <WatchActionButtons />
            </div>

            <section className="space-y-3 pt-2 border-t border-border">
              <h2 className="text-lg font-bold text-foreground">Top Cast</h2>
              <TopCastRow />
            </section>

            <section className="space-y-3 pt-2 border-t border-border">
              <h2 className="text-lg font-bold text-foreground">For You</h2>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-7 gap-3">
                {recommendations.map((item) => (
                  <MovieCard
                    key={item.id}
                    id={item.id}
                    title={item.title}
                    rating={item.rating}
                    year={item.year}
                  />
                ))}
              </div>
            </section>
          </div>

          {/* Sticky episode panel */}
          <aside className="sticky top-6 self-start max-h-[calc(100vh-3rem)] overflow-y-auto bg-card border border-border rounded-lg p-2.5 w-full lg:mt-12">
            <h2 className="text-sm font-bold text-foreground mb-2">Episodes</h2>
            <EpisodeSelector />
          </aside>
        </div>
      </div>
    </div>
  )
}
