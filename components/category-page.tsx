import { Navbar } from '@/components/navbar'
import { ContentRow } from '@/components/content-row'
import { getHomeMovies } from '@/lib/mock-data'

const movies = getHomeMovies()

interface CategoryPageProps {
  title: string
  description: string
  movieSlice?: [number, number]
  idOffset?: number
}

export function CategoryPage({
  title,
  description,
  movieSlice = [0, 6],
  idOffset = 0,
}: CategoryPageProps) {
  const sectionMovies = movies
    .slice(movieSlice[0], movieSlice[1])
    .map((m) => ({ ...m, id: m.id + idOffset }))

  return (
    <main className="min-h-screen bg-background">
      <Navbar />
      <div className="max-w-7xl mx-auto px-4 pt-24 pb-8 space-y-8">
        <div>
          <h1 className="text-3xl font-bold text-foreground">{title}</h1>
          <p className="text-muted-foreground mt-2">{description}</p>
        </div>
        <ContentRow title={`Popular ${title}`} movies={sectionMovies} />
        <ContentRow
          title="Recently Added"
          movies={movies.slice(6, 12).map((m) => ({ ...m, id: m.id + idOffset + 100 }))}
        />
      </div>
    </main>
  )
}
