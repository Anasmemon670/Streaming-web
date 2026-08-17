export interface Movie {
  id: number
  title: string
  rating: number
  year: number
  genres: string[]
  overview: string
  country?: string
  language?: string
}

export interface ContentItem extends Movie {
  country: string
  language: string
  heatScore: number
  sortOrder: number
  category: 'tv' | 'movie' | 'anime' | 'novel'
}

export interface CastMember {
  id: number
  name: string
  character: string
}

export interface EpisodeSource {
  name: string
  episodes: number
}

export const FILTER_GENRES = [
  'All',
  'Action',
  'Adventure',
  'Animation',
  'Biography',
  'Comedy',
  'Crime',
  'Documentary',
  'Drama',
  'Family',
  'Fantasy',
  'Film-Noir',
  'Game-Show',
  'History',
  'Horror',
  'Music',
  'Musical',
  'Mystery',
  'News',
  'Reality-TV',
  'Romance',
  'Sci-Fi',
  'Short',
  'Sport',
  'Talk-Show',
  'Thriller',
  'War',
  'Western',
  'Other',
]

export const FILTER_COUNTRIES = [
  'All',
  'United States',
  'United Kingdom',
  'Korea',
  'Japan',
  'Bangladesh',
  'China',
  'Egypt',
  'France',
  'Germany',
  'India',
  'Indonesia',
  'Iraq',
  'Italy',
  'Ivory Coast',
  'Kenya',
  'Lebanon',
  'Mexico',
  'Morocco',
  'Nigeria',
  'Pakistan',
  'Philippines',
  'Russia',
  'Saudi Arabia',
  'South Africa',
  'Spain',
  'Syria',
  'Thailand',
  'Malaysia',
  'Turkey',
  'Other',
]

export const FILTER_YEARS = [
  'All',
  '2026',
  '2025',
  '2024',
  '2023',
  '2022',
  '2021',
  '2020',
  '2010s',
  '2000s',
  '1990s',
  '1980s',
  'Other',
]

export const FILTER_ANIMATION_YEARS = [
  'All',
  '2026',
  '2025',
  '2024',
  '2023',
  '2022',
  '2021',
  '2020',
  '2010s',
  '2000s',
  '1990s',
  '1980s',
  'Other',
]

export const FILTER_ANIMATION_COUNTRIES = [
  'All',
  'United States',
  'United Kingdom',
  'France',
  'Japan',
  'China',
  'Korea',
  'Other',
]

export const FILTER_LANGUAGES = [
  'All',
  'English dub',
  'French dub',
  'Hindi dub',
  'Bengali dub',
  'Urdu dub',
  'Punjabi dub',
  'Tamil dub',
  'Telugu dub',
  'Malayalam dub',
  'Kannada dub',
  'Arabic dub',
  'Arabic sub',
  'Tagalog dub',
  'Indonesian dub',
  'Russian dub',
  'Kurdish sub',
  'Spanish dub',
  'Spanish sub',
  'SpanishLatam dub',
]

export const FILTER_SORT_OPTIONS = ['ForYou', 'Hottest', 'Latest', 'Rating'] as const

export type SortOption = (typeof FILTER_SORT_OPTIONS)[number]

export const MOCK_MOVIES: Movie[] = [
  {
    id: 1,
    title: 'Cosmic Adventure',
    rating: 8.5,
    year: 2024,
    genres: ['Action', 'Sci-Fi', 'Adventure'],
    country: 'United States',
    language: 'English dub',
    overview:
      'A stunning journey through the stars where an unlikely hero discovers ancient secrets that could change the fate of the universe.',
  },
  {
    id: 2,
    title: 'Mystery in the City',
    rating: 8.2,
    year: 2024,
    genres: ['Thriller', 'Drama', 'Mystery'],
    country: 'United Kingdom',
    language: 'English dub',
    overview:
      'Uncover the secrets hidden in plain sight as a detective races against time to solve a case that spans decades.',
  },
  {
    id: 3,
    title: 'Epic Fantasy Quest',
    rating: 9.1,
    year: 2023,
    genres: ['Fantasy', 'Adventure', 'Action'],
    country: 'United States',
    language: 'English dub',
    overview:
      'A legendary tale of heroes and legends as kingdoms clash and an ancient prophecy begins to unfold.',
  },
  {
    id: 4,
    title: 'Movie Title 4',
    rating: 7.8,
    year: 2024,
    genres: ['Drama', 'Romance', 'Comedy'],
    country: 'France',
    language: 'French dub',
    overview: 'Two strangers meet on a cross-country train and discover that love can arrive when least expected.',
  },
  {
    id: 5,
    title: 'Movie Title 5',
    rating: 7.2,
    year: 2023,
    genres: ['Horror', 'Mystery', 'Thriller'],
    country: 'Japan',
    language: 'Japanese dub',
    overview: 'An abandoned mansion holds dark secrets that a group of friends must confront before dawn.',
  },
  {
    id: 6,
    title: 'Movie Title 6',
    rating: 8.0,
    year: 2024,
    genres: ['Comedy', 'Family', 'Drama'],
    country: 'India',
    language: 'Hindi dub',
    overview: 'A chaotic family reunion turns into an unforgettable weekend of laughter and unexpected revelations.',
  },
  {
    id: 7,
    title: 'Movie Title 7',
    rating: 6.9,
    year: 2022,
    genres: ['Action', 'Crime', 'Thriller'],
    country: 'Korea',
    language: 'Korean dub',
    overview: 'A retired operative is pulled back into the underworld when an old enemy resurfaces with a deadly plan.',
  },
  {
    id: 8,
    title: 'Movie Title 8',
    rating: 7.5,
    year: 2024,
    genres: ['Animation', 'Adventure', 'Family'],
    country: 'Japan',
    language: 'Japanese dub',
    overview: 'A young explorer and their robot companion embark on a vibrant quest across floating islands.',
  },
  {
    id: 9,
    title: 'Movie Title 9',
    rating: 8.3,
    year: 2023,
    genres: ['Sci-Fi', 'Drama', 'Action'],
    country: 'United States',
    language: 'English dub',
    overview: 'Humanity\'s last colony faces extinction unless a scientist can unlock a long-forgotten technology.',
  },
  {
    id: 10,
    title: 'Movie Title 10',
    rating: 6.5,
    year: 2024,
    genres: ['Documentary', 'Biography', 'Drama'],
    country: 'United Kingdom',
    language: 'English dub',
    overview: 'An intimate look at the lives of artists who shaped a generation through bold creative expression.',
  },
  {
    id: 11,
    title: 'Movie Title 11',
    rating: 7.1,
    year: 2023,
    genres: ['Thriller', 'Action', 'Crime'],
    country: 'Pakistan',
    language: 'Urdu dub',
    overview: 'A covert mission goes sideways, forcing an elite team to improvise behind enemy lines.',
  },
  {
    id: 12,
    title: 'Movie Title 12',
    rating: 8.7,
    year: 2024,
    genres: ['Fantasy', 'Drama', 'Adventure'],
    country: 'China',
    language: 'English dub',
    overview: 'Magic returns to a world that forgot it, and one reluctant mage must choose between power and peace.',
  },
]

export const EPISODE_SOURCES: EpisodeSource[] = [
  { name: 'Netflix', episodes: 12 },
  { name: 'Plex', episodes: 10 },
  { name: 'Prime Video', episodes: 8 },
  { name: 'iQIYI', episodes: 16 },
]

export const CAST_MEMBERS: CastMember[] = [
  { id: 1, name: 'Emma Stone', character: 'Dr. Elena Voss' },
  { id: 2, name: 'Ryan Gosling', character: 'Captain Rex Kane' },
  { id: 3, name: 'Zendaya', character: 'Nova Reyes' },
  { id: 4, name: 'Timothée Chalamet', character: 'Leo Hart' },
  { id: 5, name: 'Florence Pugh', character: 'Mira Ashford' },
  { id: 6, name: 'Pedro Pascal', character: 'Commander Vale' },
  { id: 7, name: 'Ana de Armas', character: 'Agent Cross' },
  { id: 8, name: 'Oscar Isaac', character: 'Professor Alden' },
]

export interface UserReview {
  id: number
  name: string
  timestamp: string
  rating: number
  comment: string
}

export const USER_REVIEWS: UserReview[] = [
  {
    id: 1,
    name: 'Alex Rivera',
    timestamp: '2 days ago',
    rating: 9,
    comment:
      'Absolutely stunning visuals and a story that keeps you hooked until the final scene. One of the best releases this year.',
  },
  {
    id: 2,
    name: 'Jordan Lee',
    timestamp: '5 days ago',
    rating: 8,
    comment:
      'Great pacing and strong performances. A few plot twists felt familiar, but overall a very enjoyable watch.',
  },
  {
    id: 3,
    name: 'Sam Patel',
    timestamp: '1 week ago',
    rating: 7,
    comment:
      'Solid entertainment with memorable cast chemistry. Looking forward to the next season if they announce one.',
  },
  {
    id: 4,
    name: 'Casey Morgan',
    timestamp: '2 weeks ago',
    rating: 8,
    comment:
      'The soundtrack elevates every emotional beat. Worth watching for the atmosphere alone.',
  },
]

export const NAV_MAIN_LINKS = [
  { label: 'Home', href: '/' },
  { label: 'TV show', href: '/tv' },
  { label: 'Movie', href: '/movies' },
  { label: 'Animation', href: '/animation' },
] as const

export const NAV_MORE_LINKS = [
  { label: 'Get Premium Free', href: '/premium' },
] as const

/** Watch-page left sidebar only — exact site routes */
export const WATCH_SIDEBAR_LINKS = [
  { label: 'Home', href: '/' },
  { label: 'TV Shows', href: '/tv' },
  { label: 'Movies', href: '/movies' },
  { label: 'Animation', href: '/animation' },
  { label: 'Get Premium Free', href: '/premium' },
] as const

const TV_TITLES = [
  'Shadow Protocol',
  'Midnight Circuit',
  'Harbor Lights',
  'The Last Signal',
  'Crown of Ash',
  'Neon District',
  'Silent Witness',
  'Iron Meridian',
  'Glass Horizon',
  'Velvet Code',
  'Storm Archive',
  'Echo Division',
]

const MOVIE_TITLES = [
  'Crimson Tidefall',
  'Northern Star',
  'The Hollow Crown',
  'Parallel Lines',
  'Obsidian Gate',
  'Silver Harbor',
  'Zero Meridian',
  'Black Orchid',
  'Frozen Ember',
  'Golden Frame',
  'Deep Current',
  'White Raven',
]

const ANIME_TITLES = [
  'Spirit Blade Chronicle',
  'Skyward Academy',
  'Moonlit Ronin',
  'Crystal Nexus',
  'Dragon Veil',
  'Starfall Guild',
  'Phantom Bloom',
  'Azure Horizon',
  'Neon Sakura',
  'Eclipse Rider',
  'Silent Kitsune',
  'Iron Blossom',
]

const NOVEL_TITLES = [
  'The Paper Throne',
  'Letters from Winter',
  'Ash and Ivory',
  'The Seventh Archive',
  'River of Glass',
  'Candlemark',
  'The Hollow Library',
  'Midnight Manuscript',
  'Salt and Silk',
  'The Obsidian Quill',
  'Whispering Atlas',
  'Garden of Echoes',
]

function buildCatalog(
  titles: string[],
  category: ContentItem['category'],
  idOffset: number,
): ContentItem[] {
  const countries = FILTER_COUNTRIES.filter((c) => c !== 'All')
  const languages = FILTER_LANGUAGES.filter((l) => l !== 'All')
  const genres = FILTER_GENRES.filter((g) => g !== 'All')
  const years = [2026, 2025, 2024, 2023, 2022, 2021, 2020, 2018, 2015, 2012, 2008, 1995, 1985]

  return titles.flatMap((baseTitle, index) =>
    [0, 1, 2, 3].map((variant) => {
      const i = index * 4 + variant
      const year = years[i % years.length]

      return {
        id: idOffset + i + 1,
        title: variant === 0 ? baseTitle : `${baseTitle} ${variant + 1}`,
        rating: 6 + ((i * 7) % 35) / 10,
        year,
        genres: [
          genres[i % genres.length],
          genres[(i + 5) % genres.length],
          genres[(i + 9) % genres.length],
        ],
        country: countries[i % countries.length],
        language: languages[i % languages.length],
        heatScore: 500 - i,
        sortOrder: i,
        category,
        overview: `A compelling ${category} entry following unforgettable characters through high stakes and emotional depth.`,
      }
    }),
  )
}

export const TV_CATALOG = buildCatalog(TV_TITLES, 'tv', 1000)
export const MOVIE_CATALOG = buildCatalog(MOVIE_TITLES, 'movie', 2000)
export const ANIME_CATALOG = buildCatalog(ANIME_TITLES, 'anime', 3000)
export const NOVEL_CATALOG = buildCatalog(NOVEL_TITLES, 'novel', 4000)

export interface ContentFilters {
  genre?: string
  country?: string
  year?: string
  language?: string
  sortBy?: SortOption
}

function matchesYear(item: ContentItem, yearFilter: string): boolean {
  if (yearFilter === 'All') return true

  if (yearFilter.endsWith('s')) {
    const decade = parseInt(yearFilter, 10)
    if (Number.isNaN(decade)) return true
    return item.year >= decade && item.year < decade + 10
  }

  if (yearFilter === 'Other') {
    const knownYears = new Set([2026, 2025, 2024, 2023, 2022, 2021, 2020])
    const knownDecades = [1980, 1990, 2000, 2010]
    const inKnownYear = knownYears.has(item.year)
    const inKnownDecade = knownDecades.some(
      (decade) => item.year >= decade && item.year < decade + 10,
    )
    return !inKnownYear && !inKnownDecade
  }

  return item.year === parseInt(yearFilter, 10)
}

export function filterContent(items: ContentItem[], filters: ContentFilters): ContentItem[] {
  let result = items.filter((item) => {
    if (filters.genre && filters.genre !== 'All' && !item.genres.includes(filters.genre)) {
      return false
    }
    if (filters.country && filters.country !== 'All') {
      if (filters.country === 'Other') {
        const standard = FILTER_ANIMATION_COUNTRIES.filter((c) => c !== 'All' && c !== 'Other')
        if (standard.includes(item.country)) return false
      } else if (item.country !== filters.country) {
        return false
      }
    }
    if (filters.year && !matchesYear(item, filters.year)) {
      return false
    }
    if (filters.language && filters.language !== 'All' && item.language !== filters.language) {
      return false
    }
    return true
  })

  const sortBy = filters.sortBy ?? 'ForYou'

  switch (sortBy) {
    case 'Hottest':
      result = [...result].sort((a, b) => b.heatScore - a.heatScore)
      break
    case 'Latest':
      result = [...result].sort((a, b) => b.year - a.year || a.id - b.id)
      break
    case 'Rating':
      result = [...result].sort((a, b) => b.rating - a.rating || a.id - b.id)
      break
    case 'ForYou':
    default:
      result = [...result].sort((a, b) => a.sortOrder - b.sortOrder)
      break
  }

  return result
}

const ALL_CATALOG: ContentItem[] = [
  ...TV_CATALOG,
  ...MOVIE_CATALOG,
  ...ANIME_CATALOG,
  ...NOVEL_CATALOG,
]

export function getMovieById(id: number): Movie {
  const fromHome = MOCK_MOVIES.find((movie) => movie.id === id)
  if (fromHome) return fromHome

  const fromCatalog = ALL_CATALOG.find((item) => item.id === id)
  if (fromCatalog) {
    return {
      id: fromCatalog.id,
      title: fromCatalog.title,
      rating: fromCatalog.rating,
      year: fromCatalog.year,
      genres: fromCatalog.genres.slice(0, 3),
      overview: fromCatalog.overview,
      country: fromCatalog.country,
      language: fromCatalog.language,
    }
  }

  return {
    id,
    title: `Movie Title ${id}`,
    rating: 6.1,
    year: 2024,
    genres: ['Action', 'Drama', 'Thriller'],
    country: 'United States',
    language: 'English dub',
    overview:
      'An exciting story unfolds as heroes face impossible odds and discover what they are truly capable of.',
  }
}

export function getRecommendedMovies(currentId: number, count = 7): Movie[] {
  const catalogMatches = ALL_CATALOG.filter((item) => item.id !== currentId).slice(0, count)
  if (catalogMatches.length > 0) {
    return catalogMatches.map((item) => ({
      id: item.id,
      title: item.title,
      rating: item.rating,
      year: item.year,
      genres: item.genres,
      overview: item.overview,
      country: item.country,
      language: item.language,
    }))
  }

  return MOCK_MOVIES.filter((movie) => movie.id !== currentId).slice(0, count)
}

export function getHomeMovies(): Movie[] {
  return MOCK_MOVIES
}
