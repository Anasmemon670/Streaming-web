'use client'

import { useState, useEffect, useRef } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { Search, X, TrendingUp, History, Play, Star } from 'lucide-react'
import { ALL_CATALOG, MOCK_MOVIES } from '@/lib/mock-data'

const TRENDING_SEARCHES = [
  'Weak Hero S2',
  'Solo Leveling',
  'Heart Beat',
  'Dune: Part Two',
  'Pushpa 2: The Rule',
  'Stree 2',
  'Queen of Tears',
  'House of the Dragon',
  'Stranger Things',
  'Dahaad',
]

const DEFAULT_HISTORY = ['Heart Beat', 'Solo Leveling', 'Weak Hero', 'Dune']

export function HeaderSearch() {
  const router = useRouter()
  const [query, setQuery] = useState('')
  const [isOpen, setIsOpen] = useState(false)
  const [history, setHistory] = useState<string[]>(DEFAULT_HISTORY)
  const containerRef = useRef<HTMLDivElement>(null)

  // Load search history from localStorage
  useEffect(() => {
    try {
      const saved = localStorage.getItem('moviebox_search_history')
      if (saved) {
        setHistory(JSON.parse(saved))
      }
    } catch {
      // fallback
    }
  }, [])

  // Save history to localStorage
  const saveHistory = (items: string[]) => {
    setHistory(items)
    try {
      localStorage.setItem('moviebox_search_history', JSON.stringify(items))
    } catch {
      // fallback
    }
  };

  // Close dropdown on click outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setIsOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const handleSearchSubmit = (searchTerm: string) => {
    const term = searchTerm.trim()
    if (!term) return

    // Update history (prevent duplicates)
    const updated = [term, ...history.filter((h) => h.toLowerCase() !== term.toLowerCase())].slice(0, 8)
    saveHistory(updated)

    setIsOpen(false)
    router.push(`/search?q=${encodeURIComponent(term)}`)
  }

  const handleRemoveHistoryItem = (e: React.MouseEvent, item: string) => {
    e.stopPropagation()
    const updated = history.filter((h) => h !== item)
    saveHistory(updated)
  }

  // Filter live results from catalog based on query
  const liveResults = query.trim()
    ? [
        ...MOCK_MOVIES,
        ...ALL_CATALOG,
      ]
        .filter((item) => item.title.toLowerCase().includes(query.toLowerCase().trim()))
        .filter((item, idx, arr) => arr.findIndex((t) => t.title === item.title) === idx)
        .slice(0, 6)
    : []

  return (
    <div className="relative" ref={containerRef}>
      {/* Search Input Container */}
      <form
        onSubmit={(e) => {
          e.preventDefault()
          handleSearchSubmit(query)
        }}
        className="flex items-center bg-black/35 backdrop-blur-md border border-white/10 rounded-full px-3.5 py-1.5 w-[160px] sm:w-[210px] md:w-[260px] lg:w-[320px] transition-all focus-within:w-[190px] sm:focus-within:w-[240px] md:focus-within:w-[300px] lg:focus-within:w-[360px] focus-within:border-red-800/60 focus-within:bg-black/60 focus-within:shadow-[0_0_15px_rgba(229,9,20,0.25)]"
      >
        <Search size={15} className="text-gray-400 shrink-0" />
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={() => setIsOpen(true)}
          placeholder="Search movies/ TV Shows"
          className="bg-transparent ml-2 w-full min-w-0 text-xs sm:text-sm text-white placeholder-gray-400/80 outline-none"
        />
        {query && (
          <button
            type="button"
            onClick={() => setQuery('')}
            className="text-gray-400 hover:text-white p-0.5"
            aria-label="Clear input"
          >
            <X size={14} />
          </button>
        )}
      </form>

      {/* Search Dropdown (Size: 455px x 312px) */}
      {isOpen && (
        <div className="absolute top-full right-0 mt-2 w-[340px] sm:w-[420px] md:w-[455px] max-h-[350px] bg-[#120a10]/95 backdrop-blur-xl border border-red-950/60 rounded-2xl shadow-2xl p-4 z-50 overflow-y-auto space-y-4 text-xs select-none animate-in fade-in zoom-in-95 duration-150 [&::-webkit-scrollbar]:w-1.5 [&::-webkit-scrollbar-thumb]:bg-white/20 [&::-webkit-scrollbar-thumb]:rounded-full">
          {/* Top subtle ambient crimson glow */}
          <div className="absolute top-0 left-0 right-0 h-20 bg-gradient-to-b from-[#40060d]/40 to-transparent pointer-events-none rounded-t-2xl" />

          {/* Section 1: Live Typeahead Results (when query is typed) */}
          {query.trim() ? (
            <div className="space-y-2 relative z-10">
              <h4 className="text-gray-400 font-semibold flex items-center justify-between text-[11px] uppercase tracking-wider">
                <span>Matching Results</span>
                <span className="text-[10px] text-gray-500 font-normal">Press Enter to view all</span>
              </h4>

              {liveResults.length > 0 ? (
                <div className="space-y-1.5">
                  {liveResults.map((item) => (
                    <Link
                      key={item.id}
                      href={`/movie/${item.id}`}
                      onClick={() => {
                        handleSearchSubmit(item.title)
                        setIsOpen(false)
                      }}
                      className="flex items-center justify-between p-2 rounded-xl bg-white/[0.03] hover:bg-red-950/40 border border-transparent hover:border-red-800/40 transition-all group"
                    >
                      <div className="flex items-center gap-2.5 min-w-0">
                        <div className="w-7 h-9 rounded bg-[#1a1a24] border border-white/10 flex items-center justify-center text-white/30 shrink-0 group-hover:text-white group-hover:bg-[#E50914] transition-colors">
                          <Play size={12} className="fill-current translate-x-0.5" />
                        </div>
                        <div className="min-w-0">
                          <p className="font-semibold text-gray-200 group-hover:text-white truncate">
                            {item.title}
                          </p>
                          <p className="text-[10px] text-gray-400">
                            {item.year} • {item.genres?.[0] || 'Drama'}
                          </p>
                        </div>
                      </div>

                      <div className="flex items-center gap-1 text-amber-400 font-bold shrink-0 text-[11px]">
                        <Star size={11} className="fill-amber-400" />
                        <span>{item.rating.toFixed(1)}</span>
                      </div>
                    </Link>
                  ))}
                </div>
              ) : (
                <p className="text-gray-400 text-center py-4">No quick results found. Press enter to search all.</p>
              )}
            </div>
          ) : (
            <>
              {/* Section 2: Search History with individual 'X' delete buttons */}
              {history.length > 0 && (
                <div className="space-y-2 relative z-10">
                  <div className="flex items-center justify-between text-[11px] font-semibold text-gray-400 tracking-wide uppercase">
                    <span className="flex items-center gap-1.5">
                      <History size={13} className="text-gray-400" />
                      <span>Search History</span>
                    </span>
                    <button
                      type="button"
                      onClick={() => saveHistory([])}
                      className="text-gray-500 hover:text-red-400 text-[10px] lowercase transition-colors"
                    >
                      clear all
                    </button>
                  </div>

                  <div className="flex flex-wrap gap-1.5">
                    {history.map((item) => (
                      <div
                        key={item}
                        onClick={() => handleSearchSubmit(item)}
                        className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/[0.05] hover:bg-red-950/40 border border-white/10 hover:border-red-800/50 text-gray-300 hover:text-white cursor-pointer transition-all group"
                      >
                        <span className="truncate max-w-[150px]">{item}</span>
                        <button
                          type="button"
                          onClick={(e) => handleRemoveHistoryItem(e, item)}
                          className="text-gray-500 group-hover:text-gray-300 hover:!text-red-400 p-0.5 transition-colors"
                          aria-label={`Remove ${item} from history`}
                        >
                          <X size={12} />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Section 3: Everyone Searching (8 to 10 trending items) */}
              <div className="space-y-2 relative z-10 pt-1 border-t border-white/[0.06]">
                <h4 className="flex items-center gap-1.5 text-[11px] font-semibold text-gray-400 tracking-wide uppercase">
                  <TrendingUp size={13} className="text-red-500" />
                  <span>Everyone Searching</span>
                </h4>

                <div className="grid grid-cols-2 gap-1.5">
                  {TRENDING_SEARCHES.map((item, idx) => (
                    <button
                      key={item}
                      type="button"
                      onClick={() => handleSearchSubmit(item)}
                      className="flex items-center gap-2 p-2 rounded-xl text-left bg-white/[0.02] hover:bg-white/[0.07] text-gray-300 hover:text-white transition-all group"
                    >
                      <span className={`w-4 font-bold text-center ${idx < 3 ? 'text-red-500 font-extrabold' : 'text-gray-500'}`}>
                        {idx + 1}
                      </span>
                      <span className="truncate group-hover:translate-x-0.5 transition-transform">{item}</span>
                    </button>
                  ))}
                </div>
              </div>
            </>
          )}
        </div>
      )}
    </div>
  )
}
