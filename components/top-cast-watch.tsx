'use client'

import { useRef } from 'react'
import { User } from 'lucide-react'

const WATCH_TOP_CAST = [
  { id: 1, name: 'Anumol K...', role: 'Radhi', photo: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=300&auto=format&fit=crop&q=80' },
  { id: 2, name: 'Charukesh', role: 'Arjun', photo: null },
  { id: 3, name: 'Deepa Balu', role: 'Reena', photo: null },
  { id: 4, name: 'Kishore', role: 'Vikram', photo: null },
  { id: 5, name: 'Yogalakshmi', role: 'Teju', photo: null },
  { id: 6, name: 'Karthik Kumar', role: 'Vijay', photo: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&auto=format&fit=crop&q=80' },
  { id: 7, name: 'Sabarosh', role: 'Rocky', photo: null },
  { id: 8, name: 'Chandrasekar...', role: 'Dev', photo: null },
  { id: 9, name: 'Pradeepraj...', role: 'Doctor Raj', photo: null },
  { id: 10, name: 'Guru Sankar', role: 'Dr. Anand', photo: null },
]

export function TopCastWatch() {
  const scrollRef = useRef<HTMLDivElement>(null)

  return (
    <div className="space-y-3 select-none">
      <h2 className="text-base sm:text-lg font-bold text-white tracking-tight">
        Top Cast ({WATCH_TOP_CAST.length})
      </h2>

      {/* Scrollable Cast Container matching Image 1 */}
      <div
        ref={scrollRef}
        className="flex gap-3 overflow-x-auto pb-2 select-none [&::-webkit-scrollbar]:h-1 [&::-webkit-scrollbar-thumb]:bg-white/20 [&::-webkit-scrollbar-thumb]:rounded-full"
      >
        {WATCH_TOP_CAST.map((cast) => (
          <div
            key={cast.id}
            className="w-[105px] sm:w-[115px] shrink-0 space-y-1.5 group cursor-pointer"
          >
            {/* Portrait Image */}
            <div className="relative aspect-[3/4] rounded-lg overflow-hidden bg-[#1a1a24] border border-white/[0.08] group-hover:border-white/20 transition-all shadow-md">
              {cast.photo ? (
                <img
                  src={cast.photo}
                  alt={cast.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
              ) : (
                <div className="w-full h-full bg-gradient-to-b from-[#242432] to-[#14141c] flex items-center justify-center text-white/20">
                  <User size={36} />
                </div>
              )}
            </div>

            {/* Cast Info */}
            <div className="px-0.5">
              <p className="text-xs font-semibold text-gray-200 group-hover:text-white truncate transition-colors">
                {cast.name}
              </p>
              <p className="text-[11px] text-[#7a7a85] truncate">
                {cast.role}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
