'use client'

import Link from 'next/link'
import { Play, Star } from 'lucide-react'
import { getRecommendedMovies } from '@/lib/mock-data'

interface MoreLikeThisProps {
  currentMovieId?: number
}

export function MoreLikeThis({ currentMovieId = 101 }: MoreLikeThisProps) {
  const recommendations = getRecommendedMovies(currentMovieId, 22)

  return (
    <aside className="space-y-3.5 select-none">
      <h2 className="text-base sm:text-lg font-bold text-white tracking-tight">
        More like this
      </h2>

      {/* 2-Column Grid with 11 Rows (22 items) matching home page card compact styling */}
      <div className="grid grid-cols-2 gap-2 sm:gap-2.5 md:gap-3">
        {recommendations.map((movie) => (
          <Link
            key={movie.id}
            href={`/movie/${movie.id}`}
            className="group cursor-pointer select-none block"
          >
            {/* Poster Container with responsive size targeting 152 x 213 pixels */}
            <div className="relative bg-[#1a1a22] rounded-xl overflow-hidden w-full aspect-[152/213] border border-white/[0.08] shadow-md group-hover:border-white/20 transition-all duration-300">
              <div className="w-full h-full bg-gradient-to-br from-[#E50914]/20 via-[#181820] to-[#121216] flex items-center justify-center relative group-hover:scale-105 transition-transform duration-300">
                <div className="w-9 h-9 rounded-full bg-black/40 border border-white/10 flex items-center justify-center text-white/40 group-hover:text-white group-hover:bg-[#E50914] group-hover:border-transparent transition-all">
                  <Play size={16} className="translate-x-0.5 fill-current" />
                </div>
              </div>

              {/* Red Year Badge on Top-Left */}
              <div className="absolute top-2 left-2 bg-[#E50914] text-white px-1.5 py-0.5 rounded text-[10px] font-bold shadow-md">
                {movie.year}
              </div>

              {/* Rating Badge on Bottom-Right */}
              <div className="absolute bottom-2 right-2 bg-black/80 backdrop-blur-md border border-white/10 text-amber-400 px-1.5 py-0.5 rounded text-[10px] font-bold flex items-center gap-1 shadow-lg">
                <Star size={10} className="fill-amber-400 text-amber-400" />
                <span>{movie.rating.toFixed(1)}</span>
              </div>

              {/* Hover Play Button Overlay */}
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex items-center justify-center">
                <div className="w-9 h-9 rounded-full bg-[#E50914] text-white flex items-center justify-center shadow-[0_0_16px_rgba(229,9,20,0.6)] transform scale-90 group-hover:scale-100 transition-transform">
                  <Play size={16} className="fill-white translate-x-0.5" />
                </div>
              </div>
            </div>

            {/* Title Below Card */}
            <div className="mt-1.5">
              <h3 className="text-xs sm:text-sm font-semibold text-gray-200 group-hover:text-white truncate transition-colors">
                {movie.title}
              </h3>
            </div>
          </Link>
        ))}
      </div>
    </aside>
  )
}
