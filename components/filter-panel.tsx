'use client'

import { cn } from '@/lib/utils'

export interface FilterGroup {
  key: string
  label: string
  options: readonly string[]
}

interface FilterPanelProps {
  groups: FilterGroup[]
  values: Record<string, string>
  onChange: (key: string, value: string) => void
}

export function FilterPanel({ groups, values, onChange }: FilterPanelProps) {
  return (
    <div className="relative bg-black/35 backdrop-blur-md border border-white/[0.08] rounded-2xl p-4 sm:p-5 md:p-6 shadow-xl space-y-4 overflow-hidden">
      {/* Left Frame Glowing Red Line Shade matching screenshot */}
      <div className="absolute left-0 top-3 bottom-3 w-[3px] bg-gradient-to-b from-[#E50914] via-[#E50914]/80 to-transparent rounded-r-full shadow-[0_0_12px_rgba(229,9,20,0.6)]" />

      {groups.map((group) => (
        <div key={group.key} className="flex flex-col sm:flex-row sm:items-start gap-1.5 sm:gap-4 pl-1 sm:pl-2">
          {/* Group Label */}
          <span className="text-[11px] sm:text-xs font-bold text-gray-400 w-20 sm:w-24 shrink-0 tracking-wider uppercase pt-1 select-none">
            {group.label}
          </span>

          {/* Group Options */}
          <div className="flex flex-wrap items-center gap-x-1.5 sm:gap-x-2.5 gap-y-1.5 flex-1">
            {group.options.map((option) => {
              const current =
                values[group.key] ??
                (group.key === 'sortBy' ? group.options[0] : 'All')
              const isActive = current === option

              return (
                <button
                  key={option}
                  type="button"
                  onClick={() => onChange(group.key, option)}
                  className={cn(
                    'text-xs font-medium transition-all select-none rounded-full',
                    isActive
                      ? 'px-3 py-0.5 bg-[#E50914] text-white border border-red-700/80 font-bold shadow-[0_0_8px_rgba(229,9,20,0.5)]'
                      : 'px-2 py-0.5 text-gray-300 hover:text-white hover:bg-white/[0.06]',
                  )}
                >
                  {option}
                </button>
              )
            })}
          </div>
        </div>
      ))}
    </div>
  )
}

