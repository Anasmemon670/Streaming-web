import { BrowseGridPage } from '@/components/browse-grid-page'
import {
  TV_CATALOG,
  FILTER_GENRES,
  FILTER_COUNTRIES,
  FILTER_YEARS,
  FILTER_SORT_OPTIONS,
} from '@/lib/mock-data'

const filterGroups = [
  { key: 'genre', label: 'Genre', options: FILTER_GENRES },
  { key: 'country', label: 'Country', options: FILTER_COUNTRIES },
  { key: 'year', label: 'Year', options: FILTER_YEARS },
  { key: 'sortBy', label: 'Sort By', options: FILTER_SORT_OPTIONS },
]

export default function MostWatchedPage() {
  return (
    <BrowseGridPage
      heading="Most Watched"
      items={TV_CATALOG}
      filterGroups={filterGroups}
    />
  )
}
