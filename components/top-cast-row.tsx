import { CAST_MEMBERS } from '@/lib/mock-data'

export function TopCastRow() {
  return (
    <div className="flex gap-4 overflow-x-auto pb-2">
      {CAST_MEMBERS.map((member) => (
        <div key={member.id} className="shrink-0 w-24 space-y-2 text-center">
          <div
            className="size-20 mx-auto rounded-full overflow-hidden border-2 border-border bg-secondary"
            style={{
              backgroundImage:
                'linear-gradient(135deg, rgba(229, 9, 20, 0.2) 0%, rgba(42, 42, 48, 1) 100%)',
            }}
          />
          <div>
            <p className="text-sm font-semibold text-foreground truncate">{member.name}</p>
            <p className="text-xs text-muted-foreground truncate">{member.character}</p>
          </div>
        </div>
      ))}
    </div>
  )
}
