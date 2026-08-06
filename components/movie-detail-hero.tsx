'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Volume2, VolumeX } from 'lucide-react'
import type { Movie } from '@/lib/mock-data'

interface MovieDetailHeroProps {
  movie: Movie
}

export function MovieDetailHero({ movie }: MovieDetailHeroProps) {
  const [muted, setMuted] = useState(true)
  const genres = movie.genres.slice(0, 3)

  return (
    <section className="relative w-full h-[420px] md:h-[520px] overflow-hidden">
      <div
        className="absolute inset-0 bg-secondary"
        style={{
          backgroundImage:
            'linear-gradient(135deg, rgba(229, 9, 20, 0.25) 0%, rgba(13, 13, 17, 0.95) 60%, rgba(13, 13, 17, 1) 100%)',
        }}
      />

      <div className="absolute top-24 left-4 md:left-8 z-20 text-sm">
        <Link href="/" className="text-muted-foreground hover:text-accent transition-colors">
          Home
        </Link>
        <span className="text-muted-foreground mx-2">&gt;</span>
        <span className="text-foreground">Details</span>
      </div>

      <button
        type="button"
        onClick={() => setMuted((prev) => !prev)}
        className="absolute top-24 right-4 md:right-8 z-20 flex items-center justify-center size-10 rounded-full bg-black/60 hover:bg-black/80 text-white transition-colors"
        aria-label={muted ? 'Unmute trailer' : 'Mute trailer'}
      >
        {muted ? <VolumeX size={20} /> : <Volume2 size={20} />}
      </button>

      <div className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-transparent" />

      <div className="absolute bottom-0 left-0 right-0 z-10 px-4 md:px-8 pb-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col sm:flex-row gap-5 md:gap-6 items-start">
            <div
              className="shrink-0 w-28 md:w-36 aspect-[2/3] rounded-lg overflow-hidden border border-border bg-secondary"
              style={{
                backgroundImage:
                  'linear-gradient(135deg, rgba(229, 9, 20, 0.3) 0%, rgba(26, 26, 31, 1) 100%)',
              }}
            />

            <div className="flex-1 min-w-0 space-y-3">
              <div className="flex flex-wrap items-center gap-3">
                <h1 className="text-2xl md:text-4xl font-bold text-foreground">{movie.title}</h1>
                <span className="inline-flex items-center gap-1 bg-accent text-white text-sm font-bold px-2.5 py-1 rounded-md shrink-0">
                  ★ {movie.rating.toFixed(1)} / 10
                </span>
              </div>

              <div className="flex flex-wrap items-center gap-2 text-sm">
                <span className="text-muted-foreground">Year: {movie.year}</span>
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
                  <span className="px-3 py-1 bg-secondary text-muted-foreground text-xs rounded-full border border-border">
                    {movie.country}
                  </span>
                )}
                {movie.language && (
                  <span className="px-3 py-1 bg-secondary text-muted-foreground text-xs rounded-full border border-border">
                    {movie.language}
                  </span>
                )}
                {genres.map((genre) => (
                  <span
                    key={`tag-${genre}`}
                    className="px-3 py-1 bg-accent/20 text-accent text-xs rounded-full"
                  >
                    {genre}
                  </span>
                ))}
              </div>

              <p className="text-muted-foreground text-sm md:text-base leading-relaxed max-w-2xl line-clamp-3">
                {movie.overview}
              </p>

              <Link
                href={`/watch/${movie.id}`}
                className="inline-flex items-center gap-2 bg-accent hover:bg-accent/90 text-white font-bold py-3 px-8 rounded-lg transition-colors"
              >
                🍿 Watch Online
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
