import { BrowseGridPage } from '@/components/browse-grid-page'
import {
  ANIME_CATALOG,
  FILTER_ANIMATION_COUNTRIES,
  FILTER_ANIMATION_YEARS,
  FILTER_SORT_OPTIONS,
} from '@/lib/mock-data'

const filterGroups = [
  { key: 'country', label: 'Country', options: FILTER_ANIMATION_COUNTRIES },
  { key: 'year', label: 'Year', options: FILTER_ANIMATION_YEARS },
  { key: 'sortBy', label: 'Sort By', options: FILTER_SORT_OPTIONS },
]

export default function AnimationPage() {
  return (
    <BrowseGridPage
      heading="Anime Shows & Movies"
      items={ANIME_CATALOG}
      filterGroups={filterGroups}
    />
  )
}
