'use client'

import { useState } from 'react'
import { cn } from '@/lib/utils'

const SEASONS_DATA = [
  {
    season: 'S01',
    episodes: Array.from({ length: 16 }, (_, i) => i + 1),
  },
  {
    season: 'S02',
    episodes: Array.from({ length: 16 }, (_, i) => i + 1),
  },
  {
    season: 'S03',
    episodes: Array.from({ length: 16 }, (_, i) => i + 1),
  },
]

interface EpisodeSelectorProps {
  onSelectEpisode?: (season: string, episode: number) => void
}

export function EpisodeSelector({ onSelectEpisode }: EpisodeSelectorProps) {
  const [activeSeason, setActiveSeason] = useState('S03')
  const [activeEpisode, setActiveEpisode] = useState(1)

  const currentEpisodes =
    SEASONS_DATA.find((s) => s.season === activeSeason)?.episodes || []

  const handleEpisodeClick = (ep: number) => {
    setActiveEpisode(ep)
    if (onSelectEpisode) {
      onSelectEpisode(activeSeason, ep)
    }
  }

  return (
    <div className="bg-[#0c0c12] border border-white/[0.08] rounded-xl p-3 sm:p-3.5 space-y-3 select-none shadow-xl">
      {/* Header */}
      <div>
        <h3 className="text-sm sm:text-base font-bold text-white tracking-tight">
          Resources
        </h3>
        <p className="text-[11px] text-[#7a7a85] truncate mt-0.5">
          Source: f2movies.to <span className="text-white/20">|</span> By Manisha patel
        </p>
      </div>

      {/* Season Tabs Row (S01, S02, S03) */}
      <div className="flex items-center gap-2">
        {SEASONS_DATA.map((s) => {
          const isSelected = activeSeason === s.season
          return (
            <button
              key={s.season}
              type="button"
              onClick={() => {
                setActiveSeason(s.season)
                setActiveEpisode(1)
              }}
              className={cn(
                'flex-1 py-1 px-2 rounded-md text-xs font-bold transition-all',
                isSelected
                  ? 'bg-[#15341c] text-[#4ade80] border border-[#22c55e]/60 shadow-[0_0_8px_rgba(34,197,94,0.25)]'
                  : 'bg-[#14141b] text-gray-400 border border-white/[0.06] hover:text-white hover:border-white/20',
              )}
            >
              {s.season}
            </button>
          )
        })}
      </div>

      {/* 4-Column Episode Numbers Grid (01 to 16) matching Image 1 */}
      <div className="grid grid-cols-4 gap-1.5 pt-0.5">
        {currentEpisodes.map((ep) => {
          const isCurrent = activeEpisode === ep
          const epString = ep.toString().padStart(2, '0')

          return (
            <button
              key={ep}
              type="button"
              onClick={() => handleEpisodeClick(ep)}
              className={cn(
                'h-9 rounded-md text-xs font-bold transition-all flex items-center justify-center relative',
                isCurrent
                  ? 'bg-[#15341c] text-[#4ade80] border border-[#22c55e]/60 shadow-[0_0_10px_rgba(34,197,94,0.3)]'
                  : 'bg-[#14141b] text-gray-300 border border-white/[0.06] hover:bg-[#1a1a24] hover:text-white hover:border-white/20',
              )}
            >
              {isCurrent ? (
                <div className="flex items-center gap-1">
                  <span className="inline-flex gap-[2px] items-end h-3">
                    <span className="w-[2px] h-2 bg-[#4ade80] animate-pulse" />
                    <span className="w-[2px] h-3 bg-[#4ade80] animate-pulse" />
                    <span className="w-[2px] h-1.5 bg-[#4ade80] animate-pulse" />
                  </span>
                </div>
              ) : (
                <span>{epString}</span>
              )}
            </button>
          )
        })}
      </div>
    </div>
  )
}
