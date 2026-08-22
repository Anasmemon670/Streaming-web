'use client'

import { useEffect } from 'react'
import { X, Tv, Film } from 'lucide-react'
import type { Movie } from '@/lib/mock-data'

interface MovieDetailModalProps {
  movie: Movie
  isOpen: boolean
  onClose: () => void
}

export function MovieDetailModal({ movie, isOpen, onClose }: MovieDetailModalProps) {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    if (isOpen) {
      document.body.style.overflow = 'hidden'
      window.addEventListener('keydown', handleKeyDown)
    }
    return () => {
      document.body.style.overflow = 'unset'
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [isOpen, onClose])

  if (!isOpen) return null

  const isTv =
    movie.title.toLowerCase().includes('s2') ||
    movie.title.toLowerCase().includes('season') ||
    movie.title.toLowerCase().includes('series')

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 select-none animate-in fade-in duration-200">
      {/* Dark Translucent Backdrop with Blur */}
      <div
        className="absolute inset-0 bg-black/80 backdrop-blur-md"
        onClick={onClose}
      />

      {/* Modal Card with Ambient Red Glow Accent */}
      <div className="relative w-full max-w-lg bg-[#151218]/95 border border-red-900/40 rounded-2xl p-5 sm:p-6 shadow-2xl z-10 space-y-4 overflow-hidden text-gray-200">
        {/* Top ambient glow inside modal */}
        <div className="absolute top-0 left-0 right-0 h-28 bg-gradient-to-b from-[#3a060c]/50 to-transparent pointer-events-none" />

        {/* Modal Header */}
        <div className="flex items-center justify-between relative z-10 border-b border-white/[0.08] pb-3">
          <h2 className="text-base sm:text-lg font-semibold text-white tracking-tight">
            More Detail
          </h2>
          <button
            type="button"
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-white/[0.08] hover:bg-white/20 text-gray-300 hover:text-white flex items-center justify-center transition-colors"
            aria-label="Close modal"
          >
            <X size={18} />
          </button>
        </div>

        {/* Modal Body */}
        <div className="space-y-4 max-h-[70vh] overflow-y-auto pr-1 text-xs sm:text-sm text-gray-300 relative z-10 [&::-webkit-scrollbar]:w-1.5 [&::-webkit-scrollbar-thumb]:bg-white/20 [&::-webkit-scrollbar-thumb]:rounded-full">
          {/* Intro Section */}
          <div className="space-y-2">
            <h3 className="text-sm font-semibold text-white tracking-wide">
              Intro
            </h3>

            {/* Metadata Tags */}
            <div className="flex flex-wrap items-center gap-2 text-xs text-gray-400">
              <div className="flex items-center gap-1 text-gray-300">
                {isTv ? <Tv size={14} /> : <Film size={14} />}
              </div>
              <span>|</span>
              <span>{movie.year}</span>
              <span>|</span>
              <span className="px-1.5 py-0.2 bg-white/10 text-gray-200 rounded text-[10px] font-bold">
                R
              </span>
              <span>|</span>
              <span>{movie.country || 'Korea'}</span>
            </div>

            {/* Category Badges */}
            <div className="flex flex-wrap gap-1.5 pt-1">
              {movie.genres.map((tag) => (
                <span
                  key={tag}
                  className="px-2 py-0.5 rounded text-[10px] font-semibold text-red-200 bg-red-950/30 border border-red-800/60 uppercase"
                >
                  {tag}
                </span>
              ))}
            </div>

            {/* Full Story Synopsis */}
            <p className="leading-relaxed text-gray-300 pt-1">
              {movie.overview ||
                'Yeon Shi-eun is a model student, who ranks at the top at his school. Physically, he appears like a weak boy, but, by using his smarts, tools, and psychology, he fights against violence that takes place inside and outside of his school, standing up for justice.'}
            </p>
          </div>

          {/* Detailed Info Specs */}
          <div className="border-t border-white/[0.08] pt-3 space-y-2.5 text-xs text-gray-300">
            <div>
              <p className="text-gray-400 font-semibold">Filming Location:</p>
              <p className="text-white/90">127A Smithfield Road, Frederiksted, Virgin Islands</p>
            </div>

            <div>
              <p className="text-gray-400 font-semibold">Production:</p>
              <p className="text-white/90">Castle Rock Entertainment / Studio Dragon</p>
            </div>

            <div>
              <p className="text-gray-400 font-semibold">Award:</p>
              <p className="text-white/90">21 wins & 43 nominations total</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
