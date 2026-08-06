'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { ChevronLeft, ChevronRight, Star, Play } from 'lucide-react'

const heroItems = [
  {
    id: 1,
    title: 'Cosmic Adventure',
    subtitle: 'A stunning journey through the stars',
    rating: 8.5,
    tags: ['Action', 'Sci-Fi', '2024'],
    color: 'from-blue-600/20 to-transparent',
  },
  {
    id: 2,
    title: 'Mystery in the City',
    subtitle: 'Uncover the secrets hidden in plain sight',
    rating: 8.2,
    tags: ['Thriller', 'Drama', '2024'],
    color: 'from-purple-600/20 to-transparent',
  },
  {
    id: 3,
    title: 'Epic Fantasy Quest',
    subtitle: 'A legendary tale of heroes and legends',
    rating: 9.1,
    tags: ['Fantasy', 'Adventure', '2023'],
    color: 'from-emerald-600/20 to-transparent',
  },
]

export function HeroCarousel() {
  const [current, setCurrent] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % heroItems.length)
    }, 6000)
    return () => clearInterval(timer)
  }, [])

  const next = () => setCurrent((prev) => (prev + 1) % heroItems.length)
  const prev = () => setCurrent((prev) => (prev - 1 + heroItems.length) % heroItems.length)

  const item = heroItems[current]

  return (
    <div className="relative w-full h-96 md:h-[500px] bg-secondary rounded-xl overflow-hidden group mt-20">
      {/* Background Gradient */}
      <div
        className={`absolute inset-0 bg-gradient-to-r ${item.color}`}
        style={{
          backgroundImage: `linear-gradient(135deg, rgba(229, 9, 20, 0.15), rgba(10, 10, 15, 0.8))`,
        }}
      />

      {/* Content */}
      <div className="relative h-full flex flex-col justify-center px-8 md:px-16">
        <div className="max-w-2xl">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-3 text-balance">
            {item.title}
          </h1>
          <p className="text-gray-300 text-lg mb-4">{item.subtitle}</p>

          {/* Tags and Rating */}
          <div className="flex items-center gap-4 mb-6">
            <div className="flex items-center gap-1">
              <Star size={18} className="fill-accent text-accent" />
              <span className="text-white font-semibold">{item.rating}</span>
            </div>
            <div className="flex gap-2">
              {item.tags.map((tag) => (
                <span
                  key={tag}
                  className="px-3 py-1 bg-accent/20 text-accent text-sm rounded-full"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>

          {/* Action Button */}
          <Link
            href={`/movie/${item.id}`}
            className="inline-flex items-center gap-2 bg-accent hover:bg-accent/90 text-white font-bold py-3 px-8 rounded-lg transition-colors w-fit"
          >
            <Play size={20} className="fill-white" />
            Watch Now
          </Link>
        </div>
      </div>

      {/* Navigation Buttons */}
      <button
        onClick={prev}
        className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/75 text-white p-2 rounded-full transition-colors opacity-0 group-hover:opacity-100"
      >
        <ChevronLeft size={24} />
      </button>
      <button
        onClick={next}
        className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/75 text-white p-2 rounded-full transition-colors opacity-0 group-hover:opacity-100"
      >
        <ChevronRight size={24} />
      </button>

      {/* Indicators */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
        {heroItems.map((_, idx) => (
          <button
            key={idx}
            onClick={() => setCurrent(idx)}
            className={`h-2 rounded-full transition-all ${
              idx === current
                ? 'bg-accent w-8'
                : 'bg-white/30 w-2 hover:bg-white/50'
            }`}
          />
        ))}
      </div>
    </div>
  )
}
