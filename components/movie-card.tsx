'use client'

import Link from 'next/link'
import { Play, Star } from 'lucide-react'

interface MovieCardProps {
  id: number
  title: string
  rating: number
  year: number
  posterUrl?: string
}

export function MovieCard({ id, title, rating, year, posterUrl }: MovieCardProps) {
  return (
    <Link
      href={`/movie/${id}`}
      className="movie-card-item w-[calc((100%-2*10px)/3)] sm:w-[calc((100%-3*12px)/4)] md:w-[calc((100%-4*14px)/5)] lg:w-[calc((100%-6*14px)/7)] shrink-0 group cursor-pointer select-none block"
    >
      {/* Poster Container */}
      <div className="relative bg-[#1a1a22] rounded-xl overflow-hidden aspect-[2/3] border border-white/[0.08] shadow-md group-hover:border-white/20 transition-all duration-300">
        {/* Poster Image or Cinematic Gradient Placeholder */}
        {posterUrl ? (
          <img
            src={posterUrl}
            alt={title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
        ) : (
          <div
            className="w-full h-full bg-gradient-to-br from-[#E50914]/20 via-[#181820] to-[#121216] flex items-center justify-center relative group-hover:scale-105 transition-transform duration-300"
          >
            <div className="w-12 h-12 rounded-full bg-black/40 border border-white/10 flex items-center justify-center text-white/40 group-hover:text-white group-hover:bg-[#E50914] group-hover:border-transparent transition-all">
              <Play size={22} className="translate-x-0.5 fill-current" />
            </div>
          </div>
        )}

        {/* Hover Overlay */}
        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex items-center justify-center">
          <div className="w-11 h-11 rounded-full bg-[#E50914] text-white flex items-center justify-center shadow-[0_0_16px_rgba(229,9,20,0.6)] transform scale-90 group-hover:scale-100 transition-transform">
            <Play size={20} className="fill-white translate-x-0.5" />
          </div>
        </div>

        {/* Rating Badge at Bottom Right matching Image 1 */}
        <div className="absolute bottom-2 right-2 bg-black/80 backdrop-blur-md border border-white/10 text-amber-400 px-1.5 py-0.5 rounded text-[11px] font-bold flex items-center gap-1 shadow-lg">
          <Star size={11} className="fill-amber-400 text-amber-400" />
          <span>{rating.toFixed(1)}</span>
        </div>
      </div>

      {/* Info: Title below card matching Image 1 */}
      <div className="mt-2">
        <h3 className="text-xs sm:text-sm font-semibold text-gray-200 group-hover:text-white truncate transition-colors">
          {title}
        </h3>
      </div>
    </Link>
  )
}

