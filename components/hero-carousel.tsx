'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { ChevronLeft, ChevronRight, Star, Play, Tv, Film } from 'lucide-react'

const heroItems = [
  {
    id: 1,
    title: 'The Shards',
    subtitle: 'A gripping psychological crime mystery unraveling dark teenage secrets.',
    rating: 5.8,
    year: 2026,
    type: 'TV' as const,
    tags: ['CRIME', 'DRAMA', 'HORROR'],
    spotlightUrl:
      'https://images.unsplash.com/photo-1536440136628-849c177e76a1?w=1400&auto=format&fit=crop&q=80',
  },
  {
    id: 2,
    title: 'Lioness S3',
    subtitle: 'Special Ops team navigates intense covert missions against impossible odds.',
    rating: 7.8,
    year: 2023,
    type: 'TV' as const,
    tags: ['ACTION', 'DRAMA', 'THRILLER'],
    spotlightUrl:
      'https://images.unsplash.com/photo-1485846234645-a62644f84728?w=1400&auto=format&fit=crop&q=80',
  },
  {
    id: 3,
    title: 'My Life with the Walter Boys Season3',
    subtitle: 'A heartwarming story of love, family, and unexpected bonds.',
    rating: 6.8,
    year: 2023,
    type: 'TV' as const,
    tags: ['DRAMA', 'ROMANCE', 'FAMILY'],
    spotlightUrl:
      'https://images.unsplash.com/photo-1517604931442-7e0c8ed2963c?w=1400&auto=format&fit=crop&q=80',
  },
  {
    id: 4,
    title: 'Cosmic Adventure: Beyond The Stars',
    subtitle: 'A stunning visual journey through unknown galaxies and dangerous worlds.',
    rating: 8.5,
    year: 2024,
    type: 'MOVIE' as const,
    tags: ['ACTION', 'SCI-FI', 'ADVENTURE'],
    spotlightUrl:
      'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=1400&auto=format&fit=crop&q=80',
  },
  {
    id: 5,
    title: 'Crown of Ash: Epic Fantasy Quest',
    subtitle: 'A legendary tale of brave warriors and forgotten ancient realms.',
    rating: 9.1,
    year: 2023,
    type: 'MOVIE' as const,
    tags: ['FANTASY', 'ADVENTURE', 'MYSTERY'],
    spotlightUrl:
      'https://images.unsplash.com/photo-1578632767115-351597cf2477?w=1400&auto=format&fit=crop&q=80',
  },
  {
    id: 6,
    title: 'The Midnight Circuit',
    subtitle: 'An undercover detective plunges into the high-stakes underground underworld.',
    rating: 8.0,
    year: 2024,
    type: 'TV' as const,
    tags: ['CRIME', 'DRAMA', 'THRILLER'],
    spotlightUrl:
      'https://images.unsplash.com/photo-1509198397868-475647b2a1e5?w=1200&auto=format&fit=crop&q=80',
  },
  {
    id: 7,
    title: 'Neon District: Shadows of Tokyo',
    subtitle: 'A futuristic cybernetic thrill through illuminated alleys and high-tech secrets.',
    rating: 8.3,
    year: 2024,
    type: 'MOVIE' as const,
    tags: ['ACTION', 'SCI-FI', 'CRIME'],
    spotlightUrl:
      'https://images.unsplash.com/photo-1542751371-adc38448a05e?w=1400&auto=format&fit=crop&q=80',
  },
  {
    id: 8,
    title: 'Velocity: High Octane',
    subtitle: 'Speed, adrenaline, and danger push legendary drivers to the extreme edge.',
    rating: 8.7,
    year: 2024,
    type: 'MOVIE' as const,
    tags: ['ACTION', 'THRILLER', 'ADVENTURE'],
    spotlightUrl:
      'https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?w=1400&auto=format&fit=crop&q=80',
  },
  {
    id: 9,
    title: 'Sterling Point: Uncover the Secrets',
    subtitle: 'Dark family mysteries and buried secrets surface in a misty coastal town.',
    rating: 7.1,
    year: 2024,
    type: 'TV' as const,
    tags: ['DRAMA', 'MYSTERY', 'THRILLER'],
    spotlightUrl:
      'https://images.unsplash.com/photo-1519681393784-d120267933ba?w=1400&auto=format&fit=crop&q=80',
  },
  {
    id: 10,
    title: 'Our Sticky Love',
    subtitle: 'A delightful and chaotic romantic comedy full of heartwarming moments.',
    rating: 6.6,
    year: 2024,
    type: 'TV' as const,
    tags: ['ROMANCE', 'COMEDY', 'DRAMA'],
    spotlightUrl:
      'https://images.unsplash.com/photo-1516589178581-6cd7833ae3b2?w=1400&auto=format&fit=crop&q=80',
  },
  {
    id: 11,
    title: 'Wizards Beyond Waverly Place',
    subtitle: 'Magic and mischief return with a new generation of powerful spellcasters.',
    rating: 6.6,
    year: 2024,
    type: 'TV' as const,
    tags: ['FANTASY', 'ADVENTURE', 'FAMILY'],
    spotlightUrl:
      'https://images.unsplash.com/photo-1514533450685-4493e01d1fdc?w=1400&auto=format&fit=crop&q=80',
  },
  {
    id: 12,
    title: 'Echoes of the Horizon',
    subtitle: 'A breathtaking drama across rugged frontiers and untamed wilderness.',
    rating: 7.9,
    year: 2023,
    type: 'TV' as const,
    tags: ['DRAMA', 'ADVENTURE', 'MYSTERY'],
    spotlightUrl:
      'https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=1200&auto=format&fit=crop&q=80',
  },
  {
    id: 13,
    title: 'Shadow Protocol: Zero Hour',
    subtitle: 'An elite black-ops squad races to avert an imminent global cyber crisis.',
    rating: 8.4,
    year: 2024,
    type: 'MOVIE' as const,
    tags: ['ACTION', 'THRILLER', 'SCI-FI'],
    spotlightUrl:
      'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=1400&auto=format&fit=crop&q=80',
  },
  {
    id: 14,
    title: 'Northern Star: Winter Chronicles',
    subtitle: 'The epic story of survival, grit, and hope amidst the frozen northern tundra.',
    rating: 8.8,
    year: 2023,
    type: 'MOVIE' as const,
    tags: ['DRAMA', 'ADVENTURE', 'BIOGRAPHY'],
    spotlightUrl:
      'https://images.unsplash.com/photo-1483921020237-2ff51e8e4b22?w=1400&auto=format&fit=crop&q=80',
  },
]

export function HeroCarousel() {
  const [current, setCurrent] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % heroItems.length)
    }, 6500)
    return () => clearInterval(timer)
  }, [])

  const next = () => setCurrent((prev) => (prev + 1) % heroItems.length)
  const prev = () => setCurrent((prev) => (prev - 1 + heroItems.length) % heroItems.length)

  const item = heroItems[current]

  return (
    <div className="relative w-full h-[370px] sm:h-[410px] md:h-[445px] lg:h-[465px] bg-[#0c0c11] overflow-hidden group select-none mt-14 sm:mt-16">
      {/* Background with Ambient Glow & Clear Centered Movie Photo matching Image 1 */}
      {heroItems.map((hero, idx) => (
        <div
          key={hero.id}
          className={`absolute inset-0 transition-opacity duration-700 ease-in-out ${
            idx === current ? 'opacity-100' : 'opacity-0 pointer-events-none'
          }`}
        >
          {/* Ambient blurred glow layer with vibrant color spread */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <img
              src={hero.spotlightUrl}
              alt=""
              className="w-full h-full object-cover object-center opacity-45 blur-3xl scale-125 saturate-150"
            />
          </div>

          {/* Crisp, Bright Centered Movie Photo Still matching Image 1 */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <div className="relative h-full w-[90%] sm:w-[75%] md:w-[55%] lg:w-[48%] max-w-[580px] overflow-hidden">
              <img
                src={hero.spotlightUrl}
                alt={hero.title}
                className="w-full h-full object-cover object-center opacity-100 brightness-110 contrast-105 saturate-115 shadow-2xl"
              />
              {/* Soft Left & Right Vignette Fades on the Center Image */}
              <div className="absolute inset-y-0 left-0 w-14 sm:w-16 bg-gradient-to-r from-[#0c0c11] to-transparent" />
              <div className="absolute inset-y-0 right-0 w-14 sm:w-16 bg-gradient-to-l from-[#0c0c11] to-transparent" />
            </div>
          </div>

          {/* Deep Dark Gradient on the Left for Flawless Text Readability */}
          <div className="absolute inset-0 bg-gradient-to-r from-[#0c0c11] via-[#0c0c11]/80 via-28% to-transparent pointer-events-none" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0c0c11] via-transparent to-black/20 pointer-events-none" />
        </div>
      ))}

      {/* Hero Content Aligned with Tight Left Offset matching Image 1 */}
      <div className="relative z-10 w-full px-3 sm:px-5 md:px-6 h-full flex flex-col justify-end pb-7 sm:pb-8 pt-12">
        <div className="pl-8 sm:pl-10 md:pl-12 max-w-lg">
          {/* 3 Genre Tags with Red Outline Badge */}
          <div className="flex flex-wrap items-center gap-1.5 sm:gap-2 mb-2 sm:mb-2.5">
            {item.tags.map((tag) => (
              <span
                key={tag}
                className="px-2 py-0.5 rounded text-[10px] font-semibold tracking-wider text-red-200 bg-red-950/20 border border-red-800/60 uppercase"
              >
                {tag}
              </span>
            ))}
          </div>

          {/* Title - Proportioned & Clean */}
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-white tracking-tight leading-tight mb-2 sm:mb-2.5 text-balance">
            {item.title}
          </h1>

          {/* Metadata Row: Icon only | Year | Gold Star Rating */}
          <div className="flex items-center gap-2 sm:gap-2.5 text-xs text-gray-300 mb-4 sm:mb-5">
            <div className="flex items-center text-gray-300 opacity-90">
              {item.type === 'TV' ? <Tv size={15} /> : <Film size={15} />}
            </div>
            <span className="text-white/30">|</span>
            <span className="font-semibold text-gray-200">{item.year}</span>
            <span className="text-white/30">|</span>
            <div className="flex items-center gap-1 font-bold text-amber-400">
              <Star size={13} className="fill-amber-400 text-amber-400" />
              <span>{item.rating.toFixed(1)}</span>
            </div>
          </div>

          {/* Watch Now Button - Sleek & Compact Red Pill */}
          <Link
            href={`/movie/${item.id}`}
            className="inline-flex items-center gap-1.5 bg-[#E50914] hover:bg-[#ff0f1f] text-white font-bold py-2 sm:py-2.5 px-5 sm:px-6 rounded-full shadow-[0_0_18px_rgba(229,9,20,0.5)] transition-all hover:scale-105 active:scale-95 text-xs sm:text-sm w-fit"
          >
            <Play size={15} className="fill-white text-white" />
            <span>Watch Now</span>
          </Link>
        </div>
      </div>

      {/* Left Navigation Arrow */}
      <button
        type="button"
        onClick={prev}
        className="absolute left-2 sm:left-3 top-1/2 -translate-y-1/2 w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-black/40 hover:bg-black/75 border border-white/10 flex items-center justify-center text-white backdrop-blur-sm transition-all hover:scale-110 active:scale-95 z-20"
        aria-label="Previous slide"
      >
        <ChevronLeft size={20} />
      </button>

      {/* Right Navigation Arrow */}
      <button
        type="button"
        onClick={next}
        className="absolute right-2 sm:right-3 top-1/2 -translate-y-1/2 w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-black/40 hover:bg-black/75 border border-white/10 flex items-center justify-center text-white backdrop-blur-sm transition-all hover:scale-110 active:scale-95 z-20"
        aria-label="Next slide"
      >
        <ChevronRight size={20} />
      </button>

      {/* Bottom Carousel 14 Dash Indicators matching Image 1 */}
      <div className="absolute bottom-3 sm:bottom-4 right-4 sm:right-8 md:right-12 z-20 flex items-center gap-1 sm:gap-1.5">
        {heroItems.map((_, idx) => (
          <button
            key={idx}
            type="button"
            onClick={() => setCurrent(idx)}
            aria-label={`Go to slide ${idx + 1}`}
            className={`h-0.5 sm:h-1 rounded-full transition-all duration-300 ${
              idx === current
                ? 'bg-[#E50914] w-5 sm:w-6 shadow-[0_0_6px_rgba(229,9,20,0.8)]'
                : 'bg-white/20 hover:bg-white/40 w-2.5 sm:w-3.5'
            }`}
          />
        ))}
      </div>
    </div>
  )
}





