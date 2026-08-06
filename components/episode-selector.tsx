'use client'

import { useState } from 'react'
import { ChevronDown } from 'lucide-react'

const seasons = [
  {
    season: 1,
    episodes: Array.from({ length: 16 }, (_, i) => i + 1),
  },
  {
    season: 2,
    episodes: Array.from({ length: 14 }, (_, i) => i + 1),
  },
  {
    season: 3,
    episodes: Array.from({ length: 12 }, (_, i) => i + 1),
  },
]

export function EpisodeSelector() {
  const [selectedSeason, setSelectedSeason] = useState(1)
  const [selectedEpisode, setSelectedEpisode] = useState(1)
  const [seasonOpen, setSeasonOpen] = useState(false)

  const episodes = seasons.find((s) => s.season === selectedSeason)?.episodes || []

  return (
    <div className="space-y-2.5">
      <div className="relative">
        <button
          type="button"
          onClick={() => setSeasonOpen(!seasonOpen)}
          className="w-full flex items-center justify-between bg-secondary border border-border rounded-md px-2.5 py-1.5 text-sm text-foreground hover:border-accent transition-colors"
        >
          <span className="font-medium">Season {selectedSeason}</span>
          <ChevronDown
            size={14}
            className={`transition-transform ${seasonOpen ? 'rotate-180' : ''}`}
          />
        </button>

        {seasonOpen && (
          <div className="absolute top-full left-0 right-0 mt-1 bg-card border border-border rounded-md shadow-lg z-10 overflow-hidden">
            {seasons.map((s) => (
              <button
                key={s.season}
                type="button"
                onClick={() => {
                  setSelectedSeason(s.season)
                  setSelectedEpisode(1)
                  setSeasonOpen(false)
                }}
                className="w-full text-left px-2.5 py-1.5 text-sm hover:bg-secondary hover:text-accent transition-colors border-b border-border last:border-b-0"
              >
                Season {s.season}
              </button>
            ))}
          </div>
        )}
      </div>

      <div className="space-y-1.5">
        <h3 className="text-xs font-semibold text-muted-foreground">Episodes</h3>
        <div className="grid grid-cols-4 gap-1">
          {episodes.map((ep) => (
            <button
              key={ep}
              type="button"
              onClick={() => setSelectedEpisode(ep)}
              className={`py-1 rounded text-[11px] font-semibold transition-colors ${
                selectedEpisode === ep
                  ? 'bg-accent text-white'
                  : 'bg-secondary border border-border text-foreground hover:border-accent hover:text-accent'
              }`}
            >
              E{ep.toString().padStart(2, '0')}
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}
