import { MovieCard } from './movie-card'

interface ContentRowProps {
  title: string
  movies: Array<{ id: number; title: string; rating: number; year: number }>
}

export function ContentRow({ title, movies }: ContentRowProps) {
  return (
    <section className="space-y-4">
      <h2 className="text-2xl font-bold text-foreground">{title}</h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 lg:grid-cols-6 gap-4">
        {movies.map((movie) => (
          <MovieCard key={movie.id} {...movie} />
        ))}
      </div>
    </section>
  )
}
