'use client'

import { use } from 'react'
import { Navbar } from '@/components/navbar'
import { MovieDetailHero } from '@/components/movie-detail-hero'
import { MovieDetailTabs } from '@/components/movie-detail-tabs'
import { MoreLikeThis } from '@/components/more-like-this'
import { getMovieById, getRecommendedMovies } from '@/lib/mock-data'

interface MoviePageProps {
  params: Promise<{ id: string }>
}

export default function MoviePage({ params }: MoviePageProps) {
  const { id } = use(params)
  const movieId = Number(id)
  const movie = getMovieById(movieId)
  const recommendations = getRecommendedMovies(movieId, 6)

  return (
    <main className="min-h-screen bg-background">
      <Navbar />

      <MovieDetailHero movie={movie} />

      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <MovieDetailTabs />
          </div>
          <div className="lg:col-span-1">
            <MoreLikeThis movies={recommendations} />
          </div>
        </div>
      </div>
    </main>
  )
}
