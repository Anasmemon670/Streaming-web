import { USER_REVIEWS } from '@/lib/mock-data'

export function UserReviews() {
  return (
    <div className="space-y-4">
      {USER_REVIEWS.map((review) => (
        <article
          key={review.id}
          className="flex gap-3 p-4 rounded-lg bg-card border border-border"
        >
          <div
            className="shrink-0 size-10 rounded-full border border-border bg-secondary"
            style={{
              backgroundImage:
                'linear-gradient(135deg, rgba(229, 9, 20, 0.25) 0%, rgba(42, 42, 48, 1) 100%)',
            }}
          />
          <div className="min-w-0 flex-1 space-y-1">
            <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
              <p className="text-sm font-semibold text-foreground">{review.name}</p>
              <span className="text-xs text-accent font-semibold">★ {review.rating}/10</span>
              <span className="text-xs text-muted-foreground">{review.timestamp}</span>
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed">{review.comment}</p>
          </div>
        </article>
      ))}
    </div>
  )
}
