'use client'

import { useState } from 'react'
import Link from 'next/link'
import {
  Play,
  Star,
  Tv,
  Film,
  ChevronRight,
  Share2,
  Send,
  MessageCircle,
} from 'lucide-react'
import type { Movie } from '@/lib/mock-data'
import { MovieDetailModal } from '@/components/movie-detail-modal'

interface MovieDetailHeroProps {
  movie: Movie
}

export function MovieDetailHero({ movie }: MovieDetailHeroProps) {
  const [isModalOpen, setIsModalOpen] = useState(false)

  const isTv =
    movie.title.toLowerCase().includes('s2') ||
    movie.title.toLowerCase().includes('season') ||
    movie.title.toLowerCase().includes('series')

  const tags = movie.genres.slice(0, 3)
  const overviewText =
    movie.overview ||
    'Yeon Shi-eun is a model student, who ranks at the top at his school. Physically, he appears like a weak boy, but, by using his smarts, tools, and psychology, he fights against violence that takes place inside and outside of his school...'

  return (
    <>
      <section className="relative w-full">
        {/* Main Gradient Box: black on poster side, smooth gray gradient in middle and right */}
        <div className="relative bg-gradient-to-r from-[#0c0c11] via-[#1a1b23] to-[#272834] border border-white/[0.09] rounded-2xl p-4 sm:p-6 md:p-7 shadow-2xl overflow-hidden">

          <div className="relative z-10 flex flex-col md:flex-row gap-5 md:gap-7 items-start justify-between">
            {/* Left: Poster + Info */}
            <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 items-start flex-1 min-w-0">
              {/* Poster */}
              <div className="shrink-0 w-[130px] sm:w-[155px] md:w-[175px] aspect-[2/3] rounded-xl overflow-hidden border border-white/15 shadow-2xl bg-[#1b1b22] relative group">
                <div className="w-full h-full bg-gradient-to-br from-[#E50914]/25 via-[#181820] to-[#101014] flex items-center justify-center">
                  <div className="w-12 h-12 rounded-full bg-black/40 border border-white/10 flex items-center justify-center text-white/50">
                    <Play size={22} className="translate-x-0.5 fill-current" />
                  </div>
                </div>
              </div>

              {/* Middle Info */}
              <div className="flex-1 min-w-0 space-y-2.5 sm:space-y-3">
                {/* Title */}
                <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-white tracking-tight text-balance">
                  {movie.title}
                </h1>

                {/* Metadata Row: Tv/Film icon | Year | R | Country */}
                <div className="flex flex-wrap items-center gap-2 sm:gap-2.5 text-xs text-gray-300">
                  <div className="flex items-center gap-1 text-gray-300">
                    {isTv ? <Tv size={15} /> : <Film size={15} />}
                  </div>
                  <span className="text-white/30">|</span>
                  <span className="font-semibold text-gray-200">{movie.year}</span>
                  <span className="text-white/30">|</span>
                  <span className="px-1.5 py-0.2 bg-white/10 text-gray-200 rounded text-[10px] font-bold">
                    R
                  </span>
                  <span className="text-white/30">|</span>
                  <span className="text-gray-300">{movie.country || 'Korea'}</span>
                </div>

                {/* 3 Tags with Red Outline Badge */}
                <div className="flex flex-wrap gap-1.5 pt-0.5">
                  {tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-2 py-0.5 rounded text-[10px] font-semibold tracking-wider text-red-200 bg-red-950/25 border border-red-800/60 uppercase"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                {/* Story (2 lines with inline More > button) */}
                <div className="text-xs sm:text-sm text-gray-300 leading-relaxed max-w-2xl">
                  <span className="line-clamp-2 inline">
                    {overviewText}{' '}
                  </span>
                  <button
                    type="button"
                    onClick={() => setIsModalOpen(true)}
                    className="inline-flex items-center text-xs font-bold text-gray-300 hover:text-[#E50914] ml-1 transition-colors cursor-pointer"
                  >
                    <span>More</span>
                    <ChevronRight size={13} className="translate-y-[0.5px]" />
                  </button>
                </div>

                {/* Only ONE Watch Online Red Vibrant Button matching prompt */}
                <div className="pt-2 sm:pt-3">
                  <Link
                    href={`/watch/${movie.id}`}
                    className="inline-flex items-center gap-2 bg-[#E50914] hover:bg-[#ff0f1f] text-white font-bold py-2.5 px-7 rounded-full shadow-[0_0_20px_rgba(229,9,20,0.55)] transition-all hover:scale-105 active:scale-95 text-xs sm:text-sm w-fit"
                  >
                    <Play size={16} className="fill-white" />
                    <span>Watch Online</span>
                  </Link>
                </div>
              </div>
            </div>

            {/* Right Side: Rating Box + Social Share Apps */}
            <div className="flex flex-col items-start md:items-end justify-between self-stretch shrink-0 gap-4 pt-2 md:pt-0">
              {/* Rating Card */}
              <div className="bg-black/40 backdrop-blur-md border border-white/10 rounded-xl px-4 py-2.5 text-left md:text-right min-w-[130px] shadow-lg">
                <div className="flex items-center md:justify-end gap-1.5 text-amber-400 font-extrabold text-lg sm:text-xl">
                  <Star size={18} className="fill-amber-400 text-amber-400" />
                  <span>{movie.rating.toFixed(1)}</span>
                  <span className="text-xs text-gray-400 font-normal">/10</span>
                </div>
                <p className="text-[11px] text-gray-400 mt-0.5">23474 rated</p>
              </div>

              {/* Social Share Apps Row */}
              <div className="flex items-center gap-1.5 pt-2">
                <button
                  type="button"
                  className="w-8 h-8 rounded-lg bg-white/[0.08] hover:bg-white/20 text-gray-300 hover:text-white flex items-center justify-center transition-all"
                  aria-label="Share link"
                >
                  <Share2 size={14} />
                </button>
                <button
                  type="button"
                  className="w-8 h-8 rounded-lg bg-[#1877F2]/80 hover:bg-[#1877F2] text-white flex items-center justify-center transition-all"
                  aria-label="Share on Facebook"
                >
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                  </svg>
                </button>
                <button
                  type="button"
                  className="w-8 h-8 rounded-lg bg-[#1DA1F2]/80 hover:bg-[#1DA1F2] text-white flex items-center justify-center transition-all"
                  aria-label="Share on Twitter"
                >
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                  </svg>
                </button>
                <button
                  type="button"
                  className="w-8 h-8 rounded-lg bg-[#25D366]/80 hover:bg-[#25D366] text-white flex items-center justify-center transition-all"
                  aria-label="Share on WhatsApp"
                >
                  <MessageCircle size={14} />
                </button>
                <button
                  type="button"
                  className="w-8 h-8 rounded-lg bg-[#0088cc]/80 hover:bg-[#0088cc] text-white flex items-center justify-center transition-all"
                  aria-label="Share on Telegram"
                >
                  <Send size={14} />
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* More Details Popup Modal */}
      <MovieDetailModal
        movie={movie}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </>
  )
}
