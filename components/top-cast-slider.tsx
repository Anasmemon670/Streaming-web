'use client'

import { useState, useRef, useEffect } from 'react'
import { ChevronLeft, ChevronRight, User } from 'lucide-react'

const TOP_CAST_26 = [
  { id: 1, name: 'Park Dhan Hee', character: 'Director', avatar: null },
  { id: 2, name: 'You Su-min', character: 'Director', avatar: null },
  { id: 3, name: 'Han Jun-hee', character: 'Director', avatar: null },
  { id: 4, name: 'Ji-Hoon Park', character: 'Yeon Shi-eun', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&auto=format&fit=crop&q=80' },
  { id: 5, name: 'Ji-Hoon Park', character: 'Gray Yeon', avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&auto=format&fit=crop&q=80' },
  { id: 6, name: 'Kyung Hong', character: 'Oh Beom-seok', avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&auto=format&fit=crop&q=80' },
  { id: 7, name: 'Choi Hyun-wook', character: 'Ahn Soo-ho', avatar: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=400&auto=format&fit=crop&q=80' },
  { id: 8, name: 'Shin Seung-ho', character: 'Jeon Seok-dae', avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=400&auto=format&fit=crop&q=80' },
  { id: 9, name: 'Lee Yeon', character: 'Young-yi', avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=400&auto=format&fit=crop&q=80' },
  { id: 10, name: 'Kim Su-gyeom', character: 'Jeon Young-bin', avatar: null },
  { id: 11, name: 'Yoon Jung-hoon', character: 'Lee Jung-chan', avatar: null },
  { id: 12, name: 'Hwang Sung-bin', character: 'Han Tae-hoon', avatar: null },
  { id: 13, name: 'Cha Woo-min', character: 'Kang Woo-young', avatar: null },
  { id: 14, name: 'Bae Hyun-sung', character: 'Park Hoo-min', avatar: null },
  { id: 15, name: 'Ryeo Un', character: 'Bae Sung-jae', avatar: null },
  { id: 16, name: 'Lee Min-jae', character: 'Go Hyun-tak', avatar: null },
  { id: 17, name: 'Kim Min-seok', character: 'Kim Phil-young', avatar: null },
  { id: 18, name: 'Na Chul', character: 'Kim Gil-soo', avatar: null },
  { id: 19, name: 'Jo Han-chul', character: 'Oh Jin-won', avatar: null },
  { id: 20, name: 'Kim Sung-kyun', character: "Shi-eun's Father", avatar: null },
  { id: 21, name: 'Gong Hyun-joo', character: "Shi-eun's Mother", avatar: null },
  { id: 22, name: 'Shin Jun-chul', character: 'Teacher', avatar: null },
  { id: 23, name: 'Jung Seok-won', character: 'Executive', avatar: null },
  { id: 24, name: 'Lee Jae-won', character: 'Detective', avatar: null },
  { id: 25, name: 'Oh Dong-min', character: 'Lawyer', avatar: null },
  { id: 26, name: 'Park Ji-bin', character: 'Cameo', avatar: null },
]

export function TopCastSlider() {
  const scrollRef = useRef<HTMLDivElement>(null)
  const [canScrollLeft, setCanScrollLeft] = useState(false)
  const [canScrollRight, setCanScrollRight] = useState(true)

  const checkScroll = () => {
    if (!scrollRef.current) return
    const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current
    setCanScrollLeft(scrollLeft > 10)
    setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 10)
  }

  useEffect(() => {
    checkScroll()
    const el = scrollRef.current
    if (el) el.addEventListener('scroll', checkScroll)
    window.addEventListener('resize', checkScroll)
    return () => {
      if (el) el.removeEventListener('scroll', checkScroll)
      window.removeEventListener('resize', checkScroll)
    }
  }, [])

  const handleScroll = (direction: 'left' | 'right') => {
    if (!scrollRef.current) return
    const container = scrollRef.current
    const item = container.querySelector('.cast-card-item') as HTMLElement
    const step = item ? item.offsetWidth + 12 : 140
    // Slide by 3 cards
    container.scrollBy({
      left: direction === 'right' ? step * 3 : -step * 3,
      behavior: 'smooth',
    })
  }

  return (
    <div className="space-y-3 select-none relative group/slider">
      {/* Heading with Count */}
      <h2 className="text-base sm:text-lg font-bold text-white tracking-tight">
        Top Cast({TOP_CAST_26.length})
      </h2>

      <div className="relative">
        {/* Left Arrow Button */}
        {canScrollLeft && (
          <button
            type="button"
            onClick={() => handleScroll('left')}
            className="absolute left-0 top-1/2 -translate-y-1/2 w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-black/75 hover:bg-black/95 border border-white/20 text-white backdrop-blur-md flex items-center justify-center shadow-2xl transition-all hover:scale-110 active:scale-95 z-20"
            aria-label="Scroll left"
          >
            <ChevronLeft size={20} />
          </button>
        )}

        {/* 6-Card Scrollable Row */}
        <div
          ref={scrollRef}
          onScroll={checkScroll}
          className="flex gap-2.5 sm:gap-3 overflow-x-auto scroll-smooth py-1 select-none [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]"
        >
          {TOP_CAST_26.map((member) => (
            <div
              key={member.id}
              className="cast-card-item w-[calc((100%-2*10px)/3)] sm:w-[calc((100%-3*12px)/4)] md:w-[calc((100%-5*12px)/6)] shrink-0 space-y-2 group cursor-pointer"
            >
              {/* Portrait Container */}
              <div className="relative aspect-[3/4] rounded-xl overflow-hidden bg-[#181820] border border-white/[0.08] group-hover:border-white/20 transition-all shadow-md">
                {member.avatar ? (
                  <img
                    src={member.avatar}
                    alt={member.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                ) : (
                  <div className="w-full h-full bg-gradient-to-b from-[#22222c] to-[#141419] flex items-center justify-center text-white/25">
                    <User size={38} />
                  </div>
                )}
              </div>

              {/* Names */}
              <div className="text-center px-0.5">
                <p className="text-xs font-semibold text-gray-200 group-hover:text-white truncate transition-colors">
                  {member.name}
                </p>
                <p className="text-[11px] text-gray-400 truncate mt-0.5">
                  {member.character}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Right Arrow Button */}
        {canScrollRight && (
          <button
            type="button"
            onClick={() => handleScroll('right')}
            className="absolute right-0 top-1/2 -translate-y-1/2 w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-black/75 hover:bg-black/95 border border-white/20 text-white backdrop-blur-md flex items-center justify-center shadow-2xl transition-all hover:scale-110 active:scale-95 z-20"
            aria-label="Scroll right"
          >
            <ChevronRight size={20} />
          </button>
        )}
      </div>
    </div>
  )
}
