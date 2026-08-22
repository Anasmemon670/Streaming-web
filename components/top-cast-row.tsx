import { CAST_MEMBERS } from '@/lib/mock-data'
import { User } from 'lucide-react'

export function TopCastRow() {
  return (
    <div className="flex gap-2.5 sm:gap-3 overflow-x-auto pb-2">
      {CAST_MEMBERS.map((member) => (
        <div key={member.id} className="shrink-0 w-[calc((100%-2*10px)/3)] sm:w-[calc((100%-3*12px)/4)] md:w-[calc((100%-5*12px)/6)] space-y-2 group cursor-pointer">
          {/* Portrait Container - same style as movie detail page */}
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
  )
}
