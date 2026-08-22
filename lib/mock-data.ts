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
  avatar?: string | null
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
  { id: 1, name: 'Emma Stone', character: 'Dr. Elena Voss', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&auto=format&fit=crop&q=80' },
  { id: 2, name: 'Ryan Gosling', character: 'Captain Rex Kane', avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&auto=format&fit=crop&q=80' },
  { id: 3, name: 'Zendaya', character: 'Nova Reyes', avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&auto=format&fit=crop&q=80' },
  { id: 4, name: 'Timothée Chalamet', character: 'Leo Hart', avatar: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=400&auto=format&fit=crop&q=80' },
  { id: 5, name: 'Florence Pugh', character: 'Mira Ashford', avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=400&auto=format&fit=crop&q=80' },
  { id: 6, name: 'Pedro Pascal', character: 'Commander Vale', avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=400&auto=format&fit=crop&q=80' },
  { id: 7, name: 'Ana de Armas', character: 'Agent Cross', avatar: null },
  { id: 8, name: 'Oscar Isaac', character: 'Professor Alden', avatar: null },
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

export const ALL_CATALOG: ContentItem[] = [
  ...TV_CATALOG,
  ...MOVIE_CATALOG,
  ...ANIME_CATALOG,
  ...NOVEL_CATALOG,
]

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

export interface MovieDetails extends Movie {
  filmingLocation?: string
  production?: string
  awards?: string
  trailerUrl?: string
}

// Master Movie Lookup Dictionary covering all website sections
const MOVIE_DETAILS_DB: Record<number, MovieDetails> = {
  // Weak Hero / Featured
  101: {
    id: 101,
    title: 'The Shards',
    rating: 5.8,
    year: 2026,
    genres: ['Crime', 'Drama', 'Horror'],
    country: 'United States',
    language: 'English dub',
    overview:
      'A gripping psychological crime mystery tracking a circle of privileged prep school friends in 1981 Los Angeles as a terrifying serial killer targets high school students.',
    filmingLocation: '127A Smithfield Road, Frederiksted, Virgin Islands',
    production: 'Castle Rock Entertainment / HBO Max',
    awards: '21 wins & 43 nominations total',
  },
  102: {
    id: 102,
    title: 'Lioness S3',
    rating: 7.8,
    year: 2024,
    genres: ['Action', 'Drama', 'Thriller'],
    country: 'United States',
    language: 'English dub',
    overview:
      'An elite undercover CIA operative navigates the high-stakes world of international counter-terrorism while managing complex personal loyalties.',
    filmingLocation: 'Austin, Texas, USA',
    production: 'Paramount+ / MTV Entertainment Studios',
    awards: '14 wins & 28 nominations total',
  },
  103: {
    id: 103,
    title: 'My Life with the Walter Boys',
    rating: 6.8,
    year: 2024,
    genres: ['Drama', 'Romance', 'Family'],
    country: 'United States',
    language: 'English dub',
    overview:
      'After a tragic accident, a young girl moves to a small town with a large family, discovering resilience, unexpected bonds, and the true meaning of home.',
    filmingLocation: 'Calgary, Alberta, Canada',
    production: 'Sony Pictures Television / Netflix',
    awards: '5 wins & 12 nominations total',
  },
  201: {
    id: 201,
    title: "Billionaire's Secret Heir",
    rating: 8.2,
    year: 2025,
    genres: ['Drama', 'Romance', 'Short-TV'],
    country: 'China',
    language: 'English dub',
    overview:
      'A low-key heir must keep his true identity hidden from rivals and fake friends while building an unstoppable business empire.',
    filmingLocation: 'Shanghai, China',
    production: 'ShortMax / ReelShort Studios',
    awards: '8 wins & 15 nominations total',
  },
  301: {
    id: 301,
    title: 'Avatar: Fire and Ash',
    rating: 9.4,
    year: 2026,
    genres: ['Sci-Fi', 'Adventure', 'Action'],
    country: 'United States',
    language: 'English dub',
    overview:
      'Jake Sully and Neytiri journey to unexplored volcanic regions of Pandora, encountering fierce new tribes and facing unprecedented existential threats.',
    filmingLocation: 'Wellington, New Zealand',
    production: 'Lightstorm Entertainment / 20th Century Studios',
    awards: '35 wins & 60 nominations total',
  },
  401: {
    id: 401,
    title: 'The Substance',
    rating: 8.1,
    year: 2024,
    genres: ['Horror', 'Sci-Fi', 'Drama'],
    country: 'United Kingdom',
    language: 'English dub',
    overview:
      'A fading celebrity takes a black-market medical substance that temporarily creates a younger, better version of herself, with terrifying consequences.',
    filmingLocation: 'Paris and Côte d’Azur, France',
    production: 'Working Title Films / MUBI',
    awards: '18 wins & 32 nominations total',
  },
  501: {
    id: 501,
    title: 'Jatt & Juliet 3',
    rating: 8.2,
    year: 2024,
    genres: ['Comedy', 'Romance', 'Punjabi'],
    country: 'India',
    language: 'Punjabi dub',
    overview:
      'Two rival Punjab police constables are dispatched to the UK on a top-secret mission, leading to hilarious chaotic misunderstandings and undeniable romance.',
    filmingLocation: 'London, United Kingdom & Chandigarh, India',
    production: 'White Hill Studios / Speed Records',
    awards: '12 wins & 19 nominations total',
  },
  601: {
    id: 601,
    title: 'Dune: Part Two',
    rating: 8.9,
    year: 2024,
    genres: ['Sci-Fi', 'Adventure', 'Action'],
    country: 'United States',
    language: 'English dub',
    overview:
      'Paul Atreides unites with Chani and the Fremen while seeking revenge against the conspirators who destroyed his family.',
    filmingLocation: 'Budapest, Hungary & Wadi Rum, Jordan',
    production: 'Legendary Pictures / Warner Bros.',
    awards: '42 wins & 85 nominations total',
  },
  701: {
    id: 701,
    title: 'Stree 2',
    rating: 8.3,
    year: 2024,
    genres: ['Comedy', 'Horror', 'Bollywood'],
    country: 'India',
    language: 'Hindi dub',
    overview:
      'The town of Chanderi faces a new demonic headless threat, forcing Vicky and his eccentric crew to summon an ancient supernatural ally.',
    filmingLocation: 'Chanderi, Madhya Pradesh, India',
    production: 'Maddock Films / Jio Studios',
    awards: '16 wins & 25 nominations total',
  },
  801: {
    id: 801,
    title: 'Kalki 2898 AD',
    rating: 8.4,
    year: 2024,
    genres: ['Sci-Fi', 'Action', 'Fantasy'],
    country: 'India',
    language: 'Telugu dub',
    overview:
      'In a dystopian post-apocalyptic future, immortal warriors clash to protect the prophesied unborn incarnation of Vishnu against tyrannical rulers.',
    filmingLocation: 'Hyderabad, India & Italy',
    production: 'Vyjayanthi Movies',
    awards: '20 wins & 38 nominations total',
  },
  901: {
    id: 901,
    title: 'House of the Dragon S2',
    rating: 8.5,
    year: 2024,
    genres: ['Drama', 'Fantasy', 'Action'],
    country: 'United States',
    language: 'English dub',
    overview:
      'The Targaryen civil war erupts in full fury as Rhaenyra and Aegon II fight for the Iron Throne with fire, blood, and colossal dragon warfare.',
    filmingLocation: 'Cáceres, Spain & Leavesden Studios, UK',
    production: 'HBO Entertainment',
    awards: '27 wins & 54 nominations total',
  },
  1001: {
    id: 1001,
    title: 'Yellowstone Season 5',
    rating: 8.7,
    year: 2024,
    genres: ['Drama', 'Western'],
    country: 'United States',
    language: 'English dub',
    overview:
      'The Dutton family defends the largest contiguous cattle ranch in the United States amidst shifting political alliances and dangerous corporate interests.',
    filmingLocation: 'Darby, Montana & Utah, USA',
    production: '101 Studios / Paramount Network',
    awards: '30 wins & 62 nominations total',
  },
  1101: {
    id: 1101,
    title: 'Queen of Tears',
    rating: 8.9,
    year: 2024,
    genres: ['Drama', 'Romance', 'Comedy'],
    country: 'Korea',
    language: 'Korean dub',
    overview:
      'The queen of department stores and the prince of supermarkets navigate a miraculous rekindling of love amidst overwhelming corporate conspiracies.',
    filmingLocation: 'Seoul, South Korea & Frankfurt, Germany',
    production: 'Studio Dragon / tvN',
    awards: '24 wins & 45 nominations total',
  },
  1201: {
    id: 1201,
    title: 'Solo Leveling',
    rating: 8.9,
    year: 2024,
    genres: ['Animation', 'Action', 'Fantasy'],
    country: 'Japan',
    language: 'Japanese dub',
    overview:
      'Sung Jinwoo, the world’s weakest hunter, is chosen by a mysterious game-like Quest system that allows him alone to level up into an unstoppable shadow monarch.',
    filmingLocation: 'Tokyo, Japan',
    production: 'A-1 Pictures / Aniplex',
    awards: '19 wins & 31 nominations total',
  },
  1301: {
    id: 1301,
    title: 'Kuruluş: Osman',
    rating: 8.5,
    year: 2024,
    genres: ['Action', 'Drama', 'History'],
    country: 'Turkey',
    language: 'Turkish dub',
    overview:
      'Osman Bey struggles against internal betrayals and powerful external empires to lay the foundation of the legendary Ottoman Empire.',
    filmingLocation: 'Riva, Istanbul, Turkey',
    production: 'Bozdağ Film / ATV',
    awards: '33 wins & 58 nominations total',
  },
  // For You Catalog (IDs 9101 - 9128) matching Image 1
  9101: {
    id: 9101,
    title: 'Heart Beat S1-S3',
    rating: 8.6,
    year: 2024,
    genres: ['Drama', 'Medical', 'Romance'],
    country: 'India',
    language: 'Tamil dub',
    overview:
      'Based around RK Multispeciality Hospital and its doctors, who are resilient as they deal with medical and personal challenges.',
    filmingLocation: 'Chennai, Tamil Nadu, India',
    production: 'Disney+ Hotstar / Tele Factory',
    awards: '15 wins & 22 nominations total',
  },
  9102: {
    id: 9102,
    title: 'House Keeping',
    rating: 7.9,
    year: 2024,
    genres: ['Drama', 'Thriller', 'Mystery'],
    country: 'India',
    language: 'Hindi dub',
    overview:
      'A mysterious housekeeper enters the lives of an affluent couple, unraveling long-buried secrets and dark motivations.',
    filmingLocation: 'Mumbai, Maharashtra, India',
    production: 'Prime Shots / Ullu Originals',
    awards: '4 wins & 9 nominations total',
  },
  9103: {
    id: 9103,
    title: 'Nain Sukh',
    rating: 8.2,
    year: 2023,
    genres: ['Drama', 'Romance'],
    country: 'India',
    language: 'Hindi dub',
    overview:
      'An emotional narrative revolving around unconditional love, familial loyalty, and overcoming life-altering obstacles.',
    filmingLocation: 'Jaipur, Rajasthan, India',
    production: 'Zee5 / Cineverse',
    awards: '6 wins & 11 nominations total',
  },
  9104: {
    id: 9104,
    title: 'Dahaad',
    rating: 8.5,
    year: 2023,
    genres: ['Crime', 'Drama', 'Mystery'],
    country: 'India',
    language: 'Hindi dub',
    overview:
      'Sub-inspector Anjali Bhaati investigates a series of mysterious deaths across public restrooms where women are found lifeless with cyanide.',
    filmingLocation: 'Mandawa & Jaipur, Rajasthan, India',
    production: 'Excel Entertainment / Tiger Baby / Prime Video',
    awards: '18 wins & 30 nominations total',
  },
  9105: {
    id: 9105,
    title: 'Bhookh',
    rating: 7.4,
    year: 2023,
    genres: ['Drama', 'Social'],
    country: 'India',
    language: 'Hindi dub',
    overview:
      'A hard-hitting drama uncovering the internal struggles of ambition, desire, and survival in a rapidly expanding metropolis.',
    filmingLocation: 'New Delhi, India',
    production: 'Applause Entertainment',
    awards: '5 wins & 8 nominations total',
  },
  9106: {
    id: 9106,
    title: 'Sasur Harami',
    rating: 7.1,
    year: 2024,
    genres: ['Comedy', 'Drama'],
    country: 'India',
    language: 'Hindi dub',
    overview:
      'A light-hearted family drama packed with humorous misunderstandings and chaotic domestic adventures.',
    filmingLocation: 'Lucknow, Uttar Pradesh, India',
    production: 'Balaji Telefilms',
    awards: '3 wins & 6 nominations total',
  },
  9107: {
    id: 9107,
    title: 'Lesbian',
    rating: 7.6,
    year: 2023,
    genres: ['Romance', 'Drama'],
    country: 'India',
    language: 'English dub',
    overview:
      'Two brave women fight societal stigmas and familial opposition to protect their deep love and individual freedom.',
    filmingLocation: 'Goa & Mumbai, India',
    production: 'Voot Select',
    awards: '9 wins & 14 nominations total',
  },
  9108: {
    id: 9108,
    title: 'Akalmand Junglee',
    rating: 8.0,
    year: 2024,
    genres: ['Action', 'Adventure', 'Comedy'],
    country: 'India',
    language: 'Hindi dub',
    overview:
      'A sharp-witted forest guardian uses ancient jungle instincts to outsmart high-tech timber smugglers and wildlife poachers.',
    filmingLocation: 'Western Ghats, Kerala, India',
    production: 'Hombale Films',
    awards: '11 wins & 17 nominations total',
  },
  9109: {
    id: 9109,
    title: 'Jabran',
    rating: 8.3,
    year: 2023,
    genres: ['Drama', 'Thriller'],
    country: 'India',
    language: 'Hindi dub',
    overview:
      'A high-intensity psychological drama exploring the boundaries of consent, personal agency, and matrimonial expectations.',
    filmingLocation: 'Indore, Madhya Pradesh, India',
    production: 'Jio Studios',
    awards: '8 wins & 15 nominations total',
  },
  9110: {
    id: 9110,
    title: 'Resort',
    rating: 7.8,
    year: 2024,
    genres: ['Mystery', 'Thriller'],
    country: 'India',
    language: 'Hindi dub',
    overview:
      'A group of old college friends book an isolated luxury jungle resort only to realize they are trapped in a deadly vengeance game.',
    filmingLocation: 'Coorg, Karnataka, India',
    production: 'Abundantia Entertainment',
    awards: '7 wins & 12 nominations total',
  },
  9111: {
    id: 9111,
    title: 'LBW: Love Beyond Words',
    rating: 7.5,
    year: 2023,
    genres: ['Romance', 'Drama'],
    country: 'India',
    language: 'Telugu dub',
    overview:
      'Three intertwined lives find love and heartbreak across borders and cultures, discovering the eternal resonance of true affection.',
    filmingLocation: 'Hyderabad, India & Dallas, USA',
    production: 'Working Dream Production',
    awards: '6 wins & 10 nominations total',
  },
  9112: {
    id: 9112,
    title: 'Batchmates',
    rating: 8.1,
    year: 2024,
    genres: ['Comedy', 'Youth', 'Drama'],
    country: 'India',
    language: 'Hindi dub',
    overview:
      'Follows a hilarious and relatable group of engineering hostel batchmates navigating placements, crushes, and lifetime friendships.',
    filmingLocation: 'Pune, Maharashtra, India',
    production: 'The Viral Fever (TVF)',
    awards: '14 wins & 20 nominations total',
  },
  9113: {
    id: 9113,
    title: 'Wu Assassins',
    rating: 8.4,
    year: 2022,
    genres: ['Action', 'Martial Arts', 'Fantasy'],
    country: 'United States',
    language: 'English dub',
    overview:
      'An unassuming San Francisco chef becomes the chosen Wu Assassin, tasked with hunting down mystical triad warlords.',
    filmingLocation: 'Vancouver, British Columbia, Canada',
    production: 'Nomadic Pictures / Netflix',
    awards: '10 wins & 19 nominations total',
  },
  9114: {
    id: 9114,
    title: 'Commandos',
    rating: 8.2,
    year: 2023,
    genres: ['Action', 'War', 'Thriller'],
    country: 'India',
    language: 'Hindi dub',
    overview:
      'Para SF commandos execute a covert cross-border operation behind enemy lines to rescue captured intelligence officers.',
    filmingLocation: 'Leh Ladakh & Kashmir, India',
    production: 'Sunshine Pictures / Disney+ Hotstar',
    awards: '12 wins & 21 nominations total',
  },
  9115: {
    id: 9115,
    title: 'Emzini A Family Story',
    rating: 8.7,
    year: 2023,
    genres: ['Drama', 'Family'],
    country: 'South Africa',
    language: 'English dub',
    overview:
      'A powerful multigenerational dynasty navigates heritage, family disputes, and legacy across changing societal landscapes.',
    filmingLocation: 'Johannesburg, South Africa',
    production: 'Mzansi Magic / Showmax',
    awards: '16 wins & 26 nominations total',
  },
  9116: {
    id: 9116,
    title: "The Princess' Man",
    rating: 8.9,
    year: 2022,
    genres: ['History', 'Romance', 'Drama'],
    country: 'Korea',
    language: 'Korean dub',
    overview:
      'A tragic Joseon-era romance between the daughter of a ruthless usurper prince and the son of his greatest political rival.',
    filmingLocation: 'Mungyeong Saejae, South Korea',
    production: 'KBS Drama Production',
    awards: '25 wins & 40 nominations total',
  },
  9117: {
    id: 9117,
    title: 'Halo-Halo X',
    rating: 7.3,
    year: 2024,
    genres: ['Comedy', 'Romance'],
    country: 'Philippines',
    language: 'Tagalog dub',
    overview:
      'A sweet and zany romantic comedy set around a bustling Manila street cafe where eccentric locals find unexpected love.',
    filmingLocation: 'Manila, Philippines',
    production: 'Viva Films',
    awards: '4 wins & 7 nominations total',
  },
  9118: {
    id: 9118,
    title: 'Sex & Violence',
    rating: 7.8,
    year: 2023,
    genres: ['Crime', 'Drama'],
    country: 'United States',
    language: 'English dub',
    overview:
      'A hardboiled detective and an ambitious public prosecutor team up to dismantle a corrupt syndicate controlling city hall.',
    filmingLocation: 'Chicago, Illinois, USA',
    production: 'Paramount Television Studios',
    awards: '8 wins & 16 nominations total',
  },
  9119: {
    id: 9119,
    title: 'Aap Ke Aa Jane Se',
    rating: 8.0,
    year: 2022,
    genres: ['Romance', 'Drama'],
    country: 'India',
    language: 'Hindi dub',
    overview:
      'An unconventional love story between a 42-year-old mother and a 24-year-old free-spirited man defying family orthodoxy.',
    filmingLocation: 'Kanpur, Uttar Pradesh, India',
    production: 'Bodhi Tree Multimedia / Zee TV',
    awards: '10 wins & 18 nominations total',
  },
  9120: {
    id: 9120,
    title: 'LenDen',
    rating: 7.6,
    year: 2024,
    genres: ['Drama', 'Comedy'],
    country: 'India',
    language: 'Hindi dub',
    overview:
      'Small town merchants get embroiled in a humorous series of barter deals and money-lending schemes with unexpected twists.',
    filmingLocation: 'Varanasi, Uttar Pradesh, India',
    production: 'Hungama Play',
    awards: '5 wins & 8 nominations total',
  },
  9121: {
    id: 9121,
    title: 'Twist of Fate',
    rating: 8.1,
    year: 2023,
    genres: ['Romance', 'Drama'],
    country: 'India',
    language: 'Hindi dub',
    overview:
      'A celebrated rockstar and a dedicated professor discover that their destinies are perpetually intertwined through love and sacrifice.',
    filmingLocation: 'Mumbai, India',
    production: 'Balaji Telefilms / Zee TV',
    awards: '22 wins & 38 nominations total',
  },
  9122: {
    id: 9122,
    title: 'Dhandha',
    rating: 8.4,
    year: 2024,
    genres: ['Crime', 'Drama', 'Action'],
    country: 'India',
    language: 'Hindi dub',
    overview:
      'Two ambitious brothers rise through the gritty dockyard smuggling rings of 1990s Mumbai to build a formidable criminal empire.',
    filmingLocation: 'Mumbai Docks & Alibaug, India',
    production: 'Junglee Pictures',
    awards: '13 wins & 22 nominations total',
  },
}

export function getMovieById(id: number): MovieDetails {
  if (MOVIE_DETAILS_DB[id]) {
    return MOVIE_DETAILS_DB[id]
  }

  const fromHome = MOCK_MOVIES.find((movie) => movie.id === id)
  if (fromHome) {
    return {
      ...fromHome,
      filmingLocation: 'Los Angeles, California, USA',
      production: 'Universal Pictures / Warner Bros.',
      awards: '12 wins & 24 nominations total',
    }
  }

  const fromCatalog = ALL_CATALOG.find((item) => item.id === id)
  if (fromCatalog) {
    const isKorean = fromCatalog.country === 'Korea' || fromCatalog.language?.includes('Korean')
    const isJapanese = fromCatalog.country === 'Japan' || fromCatalog.language?.includes('Japanese')
    const isIndian = fromCatalog.country === 'India' || fromCatalog.country === 'Pakistan'
    const isTurkish = fromCatalog.country === 'Turkey'

    return {
      id: fromCatalog.id,
      title: fromCatalog.title,
      rating: fromCatalog.rating,
      year: fromCatalog.year,
      genres: fromCatalog.genres.slice(0, 3),
      overview: fromCatalog.overview,
      country: fromCatalog.country,
      language: fromCatalog.language,
      filmingLocation: isKorean
        ? 'Seoul & Busan, South Korea'
        : isJapanese
        ? 'Tokyo & Kyoto, Japan'
        : isIndian
        ? 'Mumbai & Hyderabad, India'
        : isTurkish
        ? 'Istanbul, Turkey'
        : '127A Smithfield Road, Frederiksted, Virgin Islands',
      production: isKorean
        ? 'Studio Dragon / CJ ENM'
        : isJapanese
        ? 'Toho / Aniplex'
        : isIndian
        ? 'Maddock Films / Dharma Productions'
        : 'Castle Rock Entertainment',
      awards: '18 wins & 35 nominations total',
    }
  }

  // Dynamic fallback for any other generated ID
  return {
    id,
    title: id === 7001 ? 'Weak Hero' : id === 7002 ? 'Pyramid Game' : `Movie Title ${id}`,
    rating: 8.4,
    year: 2024,
    genres: ['Action', 'Drama', 'Thriller'],
    country: 'Korea',
    language: 'Korean dub',
    overview:
      'Yeon Shi-eun is a model student, who ranks at the top at his school. Physically, he appears like a weak boy, but, by using his smarts, tools, and psychology, he fights against violence that takes place inside and outside of his school.',
    filmingLocation: '127A Smithfield Road, Frederiksted, Virgin Islands',
    production: 'Castle Rock Entertainment / Studio Dragon',
    awards: '21 wins & 43 nominations total',
  }
}

export function getRecommendedMovies(currentId: number, count = 22): Movie[] {
  const catalogMatches = ALL_CATALOG.filter((item) => item.id !== currentId).slice(0, count)
  if (catalogMatches.length >= count) {
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

