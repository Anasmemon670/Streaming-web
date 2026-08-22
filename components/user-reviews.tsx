'use client'

import { Star } from 'lucide-react'

const DETAILED_REVIEWS = [
  {
    id: 1,
    name: 'Wahimi Juaneza',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
    timestamp: '16/08/2026 18:04',
    rating: 9,
    comment:
      "I've come to realize I really liked adaptations from novels to live actions. The story telling just hits different.",
  },
  {
    id: 2,
    name: 'Alex Rivera',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
    timestamp: '15/08/2026 21:30',
    rating: 10,
    comment:
      'The character development and high-stakes action scenes make this one of the most intense and emotional seasons yet. Absolutely phenomenal!',
  },
  {
    id: 3,
    name: 'Sarah Connor',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&auto=format&fit=crop&q=80',
    timestamp: '14/08/2026 14:12',
    rating: 9,
    comment:
      'Park Ji-hoon delivers a masterclass performance. The pacing is crisp, dark, and keeps you hooked every single episode.',
  },
]

export function UserReviews() {
  return (
    <div className="space-y-3.5 select-none">
      <h2 className="text-base sm:text-lg font-bold text-white tracking-tight">
        User Review
      </h2>

      <div className="space-y-3">
        {DETAILED_REVIEWS.map((review) => (
          <article
            key={review.id}
            className="p-4 sm:p-5 rounded-2xl bg-[#141419]/90 border border-white/[0.08] shadow-lg space-y-2.5 transition-all hover:border-white/15"
          >
            {/* Reviewer Header */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                {/* Avatar */}
                <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-full overflow-hidden border border-white/15 shrink-0 bg-[#22222c]">
                  <img
                    src={review.avatar}
                    alt={review.name}
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* Name and Date */}
                <div>
                  <h4 className="text-xs sm:text-sm font-bold text-white">
                    {review.name}
                  </h4>
                  <p className="text-[11px] text-gray-400">
                    {review.timestamp}
                  </p>
                </div>
              </div>

              {/* Star Rating */}
              <div className="flex items-center gap-1 text-amber-400 text-xs font-bold bg-black/40 px-2 py-0.5 rounded-md border border-white/5">
                <Star size={12} className="fill-amber-400 text-amber-400" />
                <span>{review.rating}/10</span>
              </div>
            </div>

            {/* Comment */}
            <p className="text-xs sm:text-sm text-gray-300 leading-relaxed pt-0.5">
              {review.comment}
            </p>
          </article>
        ))}
      </div>

      {/* No More Content Indicator */}
      <div className="pt-2 pb-1 text-center">
        <p className="text-xs text-gray-500 font-medium tracking-wide select-none">
          -- No more Content --
        </p>
      </div>
    </div>
  )
}
