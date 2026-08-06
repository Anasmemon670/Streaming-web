import { BrowseGridPage } from '@/components/browse-grid-page'
import {
  MOVIE_CATALOG,
  FILTER_GENRES,
  FILTER_COUNTRIES,
  FILTER_YEARS,
  FILTER_LANGUAGES,
  FILTER_SORT_OPTIONS,
} from '@/lib/mock-data'

const filterGroups = [
  { key: 'genre', label: 'Genre', options: FILTER_GENRES },
  { key: 'country', label: 'Country', options: FILTER_COUNTRIES },
  { key: 'year', label: 'Year', options: FILTER_YEARS },
  { key: 'language', label: 'Language', options: FILTER_LANGUAGES },
  { key: 'sortBy', label: 'Sort By', options: FILTER_SORT_OPTIONS },
]

export default function MoviesPage() {
  return (
    <BrowseGridPage
      heading="Watch Movies"
      items={MOVIE_CATALOG}
      filterGroups={filterGroups}
    />
  )
}
