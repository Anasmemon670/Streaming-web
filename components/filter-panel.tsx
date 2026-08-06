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
    <div className="bg-card border border-border rounded-xl p-4 md:p-5 space-y-4">
      {groups.map((group) => (
        <div key={group.key} className="space-y-2">
          <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
            {group.label}
          </p>
          <div className="flex flex-wrap gap-2">
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
                    'px-3 py-1.5 rounded-full text-xs md:text-sm font-medium transition-colors border',
                    isActive
                      ? 'bg-accent text-white border-accent'
                      : 'bg-secondary text-muted-foreground border-border hover:text-foreground hover:border-accent/50',
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
