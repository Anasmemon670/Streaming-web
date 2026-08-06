'use client'

import Link from 'next/link'
import { Play, Plus } from 'lucide-react'

interface MovieCardProps {
  id: number
  title: string
  rating: number
  year: number
}

export function MovieCard({ id, title, rating, year }: MovieCardProps) {
  return (
    <Link href={`/movie/${id}`}>
      <div className="group cursor-pointer">
        {/* Poster Container */}
        <div className="relative bg-secondary rounded-lg overflow-hidden aspect-[2/3] mb-3">
          {/* Gradient Placeholder */}
          <div
            className="w-full h-full bg-gradient-to-br from-accent/20 via-secondary to-secondary flex items-center justify-center"
            style={{
              backgroundImage: `linear-gradient(135deg, rgba(229, 9, 20, 0.2) 0%, rgba(26, 26, 31, 1) 100%)`,
            }}
          >
            <div className="text-center text-muted-foreground">
              <Play size={48} className="mx-auto mb-2 opacity-50" />
            </div>
          </div>

          {/* Overlay on Hover */}
          <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
            <button className="bg-accent hover:bg-accent/90 text-white p-3 rounded-full transition-colors">
              <Play size={24} className="fill-white" />
            </button>
          </div>

          {/* Rating Badge */}
          <div className="absolute top-2 right-2 bg-accent text-white px-2 py-1 rounded text-xs font-bold">
            {rating.toFixed(1)}
          </div>
        </div>

        {/* Info */}
        <div className="space-y-1">
          <h3 className="text-sm font-semibold text-foreground group-hover:text-accent transition-colors line-clamp-2">
            {title}
          </h3>
          <p className="text-xs text-muted-foreground">{year}</p>
        </div>
      </div>
    </Link>
  )
}
