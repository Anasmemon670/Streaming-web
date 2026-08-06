import Link from 'next/link'
import type { Movie } from '@/lib/mock-data'

interface MoreLikeThisProps {
  movies: Movie[]
}

export function MoreLikeThis({ movies }: MoreLikeThisProps) {
  return (
    <aside className="space-y-4">
      <h2 className="text-lg font-bold text-foreground">More like this</h2>
      <div className="grid grid-cols-2 gap-3">
        {movies.map((movie) => (
          <Link key={movie.id} href={`/movie/${movie.id}`} className="group">
            <div className="relative aspect-[2/3] rounded-lg overflow-hidden bg-secondary border border-border group-hover:border-accent transition-colors">
              <div
                className="w-full h-full"
                style={{
                  backgroundImage:
                    'linear-gradient(135deg, rgba(229, 9, 20, 0.2) 0%, rgba(26, 26, 31, 1) 100%)',
                }}
              />
              <div className="absolute top-1.5 right-1.5 bg-accent text-white px-1.5 py-0.5 rounded text-xs font-bold">
                {movie.rating.toFixed(1)}
              </div>
            </div>
            <p className="mt-1.5 text-xs font-semibold text-foreground group-hover:text-accent transition-colors line-clamp-2">
              {movie.title}
            </p>
          </Link>
        ))}
      </div>
    </aside>
  )
}
