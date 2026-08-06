import { BrowseGridPage } from '@/components/browse-grid-page'
import {
  NOVEL_CATALOG,
  FILTER_GENRES,
  FILTER_YEARS,
  FILTER_SORT_OPTIONS,
} from '@/lib/mock-data'

const filterGroups = [
  { key: 'genre', label: 'Genre', options: FILTER_GENRES },
  { key: 'year', label: 'Year', options: FILTER_YEARS },
  { key: 'sortBy', label: 'Sort By', options: FILTER_SORT_OPTIONS },
]

export default function NovelsPage() {
  return (
    <BrowseGridPage
      heading="Read Novels"
      items={NOVEL_CATALOG}
      filterGroups={filterGroups}
    />
  )
}
