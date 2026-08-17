'use client'

import Link from 'next/link'
import { Play, Star, ChevronRight } from 'lucide-react'
import { Navbar } from '@/components/navbar'
import { HeroCarousel } from '@/components/hero-carousel'
import { ContentRow } from '@/components/content-row'

// Dynamic Section 1: 🔥Trending Now
const trendingNowMovies = [
  { id: 101, title: 'The Shards', rating: 5.8, year: 2026 },
  { id: 102, title: 'Lioness S3', rating: 7.8, year: 2024 },
  { id: 103, title: 'My Life with the Walter Boys', rating: 6.8, year: 2024 },
  { id: 104, title: 'Cosmic Adventure: Beyond The Stars', rating: 8.5, year: 2024 },
  { id: 105, title: 'Crown of Ash', rating: 9.1, year: 2023 },
  { id: 106, title: 'The Midnight Circuit', rating: 8.0, year: 2024 },
  { id: 107, title: 'Neon District: Tokyo Shadows', rating: 8.3, year: 2024 },
  { id: 108, title: 'Velocity: High Octane', rating: 8.7, year: 2024 },
  { id: 109, title: 'Sterling Point', rating: 7.1, year: 2024 },
  { id: 110, title: 'Our Sticky Love', rating: 6.6, year: 2024 },
  { id: 111, title: 'Wizards Beyond Waverly Place', rating: 6.6, year: 2024 },
  { id: 112, title: 'Echoes of the Horizon', rating: 7.9, year: 2023 },
  { id: 113, title: 'Shadow Protocol: Zero Hour', rating: 8.4, year: 2024 },
  { id: 114, title: 'Northern Star: Winter Chronicles', rating: 8.8, year: 2023 },
]

// Dynamic Section 2: 🔥Hot Short TV
const hotShortTvMovies = [
  { id: 201, title: "Billionaire's Secret Heir", rating: 8.2, year: 2025 },
  { id: 202, title: "CEO's Contract Bride", rating: 7.9, year: 2025 },
  { id: 203, title: 'Revenge of the Abandoned Daughter', rating: 8.4, year: 2024 },
  { id: 204, title: 'The Hidden Tycoon', rating: 7.6, year: 2024 },
  { id: 205, title: 'Fated to the Alpha', rating: 8.0, year: 2024 },
  { id: 206, title: 'Mistaken Identity', rating: 7.3, year: 2024 },
  { id: 207, title: 'Double Life of the Heiress', rating: 8.1, year: 2024 },
  { id: 208, title: 'Undercover Billionaire Husband', rating: 7.7, year: 2024 },
  { id: 209, title: 'Love in the Shadows', rating: 8.3, year: 2024 },
  { id: 210, title: 'Second Chance Romance', rating: 7.5, year: 2024 },
  { id: 211, title: 'The Silent Heiress', rating: 8.6, year: 2024 },
  { id: 212, title: 'Empire of Lies', rating: 7.8, year: 2023 },
  { id: 213, title: 'Tempting Fate', rating: 8.2, year: 2024 },
  { id: 214, title: "The Alpha's Return", rating: 8.5, year: 2024 },
]

// Dynamic Section 3: Coming Soon
const comingSoonMovies = [
  { id: 301, title: 'Avatar: Fire and Ash', rating: 9.4, year: 2026 },
  { id: 302, title: 'Avengers: Secret Wars', rating: 9.6, year: 2027 },
  { id: 303, title: 'Spider-Man 4: King in Black', rating: 9.1, year: 2026 },
  { id: 304, title: 'The Batman Part II', rating: 9.0, year: 2026 },
  { id: 305, title: 'Superman: Legacy', rating: 8.9, year: 2025 },
  { id: 306, title: 'Fantastic Four: First Steps', rating: 8.8, year: 2025 },
  { id: 307, title: 'Tron: Ares', rating: 8.5, year: 2025 },
  { id: 308, title: 'Mission: Impossible 8', rating: 9.2, year: 2025 },
  { id: 309, title: 'Wicked: Part Two', rating: 8.7, year: 2025 },
  { id: 310, title: 'Jurassic World 4', rating: 8.4, year: 2025 },
  { id: 311, title: 'Blade: Bloodline', rating: 8.6, year: 2025 },
  { id: 312, title: 'Shrek 5', rating: 8.9, year: 2026 },
  { id: 313, title: 'Zootopia 2', rating: 8.7, year: 2025 },
  { id: 314, title: 'Fast X Part 2', rating: 8.3, year: 2026 },
]

// Dynamic Section 4: 🔥Cinema
const cinemaMovies = [
  { id: 401, title: 'The Substance', rating: 8.1, year: 2024 },
  { id: 402, title: 'Longlegs', rating: 7.7, year: 2024 },
  { id: 403, title: 'Heretic', rating: 7.8, year: 2024 },
  { id: 404, title: 'Nosferatu', rating: 8.3, year: 2024 },
  { id: 405, title: 'Conclave', rating: 8.0, year: 2024 },
  { id: 406, title: 'Anora', rating: 8.2, year: 2024 },
  { id: 407, title: 'The Brutalist', rating: 8.6, year: 2024 },
  { id: 408, title: 'Emilia Pérez', rating: 7.9, year: 2024 },
  { id: 409, title: 'Babygirl', rating: 7.4, year: 2024 },
  { id: 410, title: 'A Complete Unknown', rating: 8.4, year: 2024 },
  { id: 411, title: 'The Room Next Door', rating: 7.6, year: 2024 },
  { id: 412, title: 'Sing Sing', rating: 8.5, year: 2024 },
  { id: 413, title: 'Nightbitch', rating: 7.1, year: 2024 },
  { id: 414, title: 'Blitz', rating: 7.5, year: 2024 },
]

// Dynamic Section 5: 🔥Trending Punjabi
const trendingPunjabiMovies = [
  { id: 501, title: 'Jatt & Juliet 3', rating: 8.2, year: 2024 },
  { id: 502, title: 'Carry On Jatta 3', rating: 8.4, year: 2023 },
  { id: 503, title: 'Warning 2', rating: 7.8, year: 2024 },
  { id: 504, title: 'Ardaas Sarbat De Bhale Di', rating: 8.9, year: 2024 },
  { id: 505, title: 'Shadaa', rating: 7.9, year: 2023 },
  { id: 506, title: 'Qismat 2', rating: 8.3, year: 2023 },
  { id: 507, title: 'Chal Mera Putt 3', rating: 8.1, year: 2023 },
  { id: 508, title: 'Saunkan Saunkne', rating: 8.0, year: 2023 },
  { id: 509, title: 'Kali Jotta', rating: 8.6, year: 2023 },
  { id: 510, title: 'Maurh: Lehndi Rutt De Nayak', rating: 7.7, year: 2023 },
  { id: 511, title: 'Gaddi Jaandi Ae Chalaangaan Maardi', rating: 7.4, year: 2023 },
  { id: 512, title: 'Jodi', rating: 8.1, year: 2023 },
  { id: 513, title: 'Godday Godday Chaa', rating: 8.0, year: 2023 },
  { id: 514, title: 'Kikli', rating: 7.6, year: 2024 },
]

// Dynamic Section 6: Hollywood
const hollywoodMovies = [
  { id: 601, title: 'Dune: Part Two', rating: 8.9, year: 2024 },
  { id: 602, title: 'Deadpool & Wolverine', rating: 8.1, year: 2024 },
  { id: 603, title: 'Oppenheimer', rating: 9.0, year: 2023 },
  { id: 604, title: 'Gladiator II', rating: 8.0, year: 2024 },
  { id: 605, title: 'Kingdom of the Planet of the Apes', rating: 7.5, year: 2024 },
  { id: 606, title: 'Furiosa: A Mad Max Saga', rating: 7.8, year: 2024 },
  { id: 607, title: 'Twisters', rating: 7.3, year: 2024 },
  { id: 608, title: 'Civil War', rating: 7.6, year: 2024 },
  { id: 609, title: 'Alien: Romulus', rating: 7.5, year: 2024 },
  { id: 610, title: 'Beetlejuice Beetlejuice', rating: 7.2, year: 2024 },
  { id: 611, title: 'A Quiet Place: Day One', rating: 7.0, year: 2024 },
  { id: 612, title: 'Challengers', rating: 7.8, year: 2024 },
  { id: 613, title: 'Bad Boys: Ride or Die', rating: 7.4, year: 2024 },
  { id: 614, title: 'The Fall Guy', rating: 7.3, year: 2024 },
]

// Dynamic Section 7: Bollywood
const bollywoodMovies = [
  { id: 701, title: 'Stree 2', rating: 8.3, year: 2024 },
  { id: 702, title: 'Jawan', rating: 8.0, year: 2023 },
  { id: 703, title: 'Animal', rating: 7.6, year: 2023 },
  { id: 704, title: 'Fighter', rating: 7.4, year: 2024 },
  { id: 705, title: 'Dunki', rating: 7.7, year: 2023 },
  { id: 706, title: 'Pathaan', rating: 7.8, year: 2023 },
  { id: 707, title: 'Bhool Bhulaiyaa 3', rating: 7.5, year: 2024 },
  { id: 708, title: 'Singham Again', rating: 7.2, year: 2024 },
  { id: 709, title: 'Chandu Champion', rating: 8.4, year: 2024 },
  { id: 710, title: 'Shaitaan', rating: 7.6, year: 2024 },
  { id: 711, title: 'Article 370', rating: 8.1, year: 2024 },
  { id: 712, title: 'Crew', rating: 7.1, year: 2024 },
  { id: 713, title: 'Bad Newz', rating: 6.9, year: 2024 },
  { id: 714, title: 'Kill', rating: 8.2, year: 2024 },
]

// Dynamic Section 8: South Indian
const southIndianMovies = [
  { id: 801, title: 'Kalki 2898 AD', rating: 8.4, year: 2024 },
  { id: 802, title: 'Pushpa 2: The Rule', rating: 8.8, year: 2024 },
  { id: 803, title: 'Devara: Part 1', rating: 7.6, year: 2024 },
  { id: 804, title: 'Salaar: Part 1 – Ceasefire', rating: 7.9, year: 2023 },
  { id: 805, title: 'Leo', rating: 8.0, year: 2023 },
  { id: 806, title: 'Jailer', rating: 8.1, year: 2023 },
  { id: 807, title: 'KGF: Chapter 2', rating: 8.7, year: 2022 },
  { id: 808, title: 'RRR', rating: 8.8, year: 2022 },
  { id: 809, title: 'Vikram', rating: 8.5, year: 2022 },
  { id: 810, title: 'Kantara', rating: 8.6, year: 2022 },
  { id: 811, title: 'HanuMan', rating: 8.3, year: 2024 },
  { id: 812, title: 'Captain Miller', rating: 7.4, year: 2024 },
  { id: 813, title: 'Tillu Square', rating: 7.8, year: 2024 },
  { id: 814, title: 'Aavesham', rating: 8.5, year: 2024 },
]

// Dynamic Section 9: Top Series
const topSeriesMovies = [
  { id: 901, title: 'House of the Dragon S2', rating: 8.5, year: 2024 },
  { id: 902, title: 'The Boys Season 4', rating: 8.6, year: 2024 },
  { id: 903, title: 'The Penguin', rating: 8.9, year: 2024 },
  { id: 904, title: 'Shōgun', rating: 9.1, year: 2024 },
  { id: 905, title: 'The Bear Season 3', rating: 8.7, year: 2024 },
  { id: 906, title: 'Fallout', rating: 8.6, year: 2024 },
  { id: 907, title: 'Slow Horses Season 4', rating: 8.8, year: 2024 },
  { id: 908, title: 'The Last of Us', rating: 8.9, year: 2023 },
  { id: 909, title: 'Severance', rating: 8.7, year: 2024 },
  { id: 910, title: 'Stranger Things', rating: 8.8, year: 2023 },
  { id: 911, title: 'Squid Game S2', rating: 8.4, year: 2024 },
  { id: 912, title: 'Succession', rating: 9.2, year: 2023 },
  { id: 913, title: 'True Detective: Night Country', rating: 8.1, year: 2024 },
  { id: 914, title: 'Fargo Season 5', rating: 8.7, year: 2024 },
]

// Dynamic Section 10: Western TV
const westernTvMovies = [
  { id: 1001, title: 'Yellowstone Season 5', rating: 8.7, year: 2024 },
  { id: 1002, title: '1923', rating: 8.5, year: 2023 },
  { id: 1003, title: '1883', rating: 8.8, year: 2022 },
  { id: 1004, title: 'Lawmen: Bass Reeves', rating: 7.9, year: 2023 },
  { id: 1005, title: 'Billy the Kid', rating: 7.8, year: 2023 },
  { id: 1006, title: 'Outer Range', rating: 7.6, year: 2024 },
  { id: 1007, title: 'Dark Winds Season 2', rating: 8.1, year: 2023 },
  { id: 1008, title: 'Joe Pickett', rating: 7.7, year: 2023 },
  { id: 1009, title: 'The English', rating: 8.0, year: 2022 },
  { id: 1010, title: 'Justified: City Primeval', rating: 7.8, year: 2023 },
  { id: 1011, title: 'Godless', rating: 8.4, year: 2021 },
  { id: 1012, title: 'Deadwood', rating: 8.9, year: 2020 },
  { id: 1013, title: 'Hell on Wheels', rating: 8.3, year: 2020 },
  { id: 1014, title: 'Longmire', rating: 8.2, year: 2020 },
]

// Dynamic Section 11: Best Asian Drama
const bestAsianDramaMovies = [
  { id: 1101, title: 'Queen of Tears', rating: 8.9, year: 2024 },
  { id: 1102, title: 'Crash Landing on You', rating: 9.1, year: 2022 },
  { id: 1103, title: 'The Glory', rating: 8.8, year: 2023 },
  { id: 1104, title: 'Hidden Love', rating: 8.7, year: 2023 },
  { id: 1105, title: 'Alchemy of Souls', rating: 8.8, year: 2023 },
  { id: 1106, title: 'Business Proposal', rating: 8.4, year: 2022 },
  { id: 1107, title: 'Vincenzo', rating: 8.7, year: 2022 },
  { id: 1108, title: 'My Demon', rating: 8.2, year: 2024 },
  { id: 1109, title: 'Till the End of the Moon', rating: 8.6, year: 2023 },
  { id: 1110, title: 'Love Between Fairy and Devil', rating: 8.7, year: 2022 },
  { id: 1111, title: 'Goblin (Guardian: The Lonely God)', rating: 9.0, year: 2021 },
  { id: 1112, title: 'Itaewon Class', rating: 8.5, year: 2021 },
  { id: 1113, title: 'King the Land', rating: 8.0, year: 2023 },
  { id: 1114, title: 'Descendants of the Sun', rating: 8.6, year: 2020 },
]

// Dynamic Section 12: Top Anime
const topAnimeMovies = [
  { id: 1201, title: 'Solo Leveling', rating: 8.9, year: 2024 },
  { id: 1202, title: 'Jujutsu Kaisen Season 2', rating: 9.1, year: 2023 },
  { id: 1203, title: 'Demon Slayer: Hashira Training', rating: 8.7, year: 2024 },
  { id: 1204, title: 'Frieren: Beyond Journey’s End', rating: 9.3, year: 2024 },
  { id: 1205, title: 'Kaiju No. 8', rating: 8.4, year: 2024 },
  { id: 1206, title: 'Chainsaw Man', rating: 8.6, year: 2023 },
  { id: 1207, title: 'Bleach: Thousand-Year Blood War', rating: 9.0, year: 2024 },
  { id: 1208, title: 'Attack on Titan Final Season', rating: 9.2, year: 2023 },
  { id: 1209, title: 'One Piece: Egghead Arc', rating: 9.1, year: 2024 },
  { id: 1210, title: 'Spy × Family Season 2', rating: 8.5, year: 2023 },
  { id: 1211, title: 'Vinland Saga Season 2', rating: 8.9, year: 2023 },
  { id: 1212, title: 'My Hero Academia Season 7', rating: 8.3, year: 2024 },
  { id: 1213, title: 'Death Note', rating: 9.0, year: 2020 },
  { id: 1214, title: 'Hunter × Hunter', rating: 9.1, year: 2020 },
]

// Dynamic Section 13: Turkish Drama
const turkishDramaMovies = [
  { id: 1301, title: 'Kuruluş: Osman', rating: 8.5, year: 2024 },
  { id: 1302, title: 'Yalı Çapkını (Golden Boy)', rating: 8.2, year: 2024 },
  { id: 1303, title: 'Kızılcık Şerbeti', rating: 8.3, year: 2024 },
  { id: 1304, title: 'Yargı (Family Secrets)', rating: 8.7, year: 2024 },
  { id: 1305, title: 'Diriliş: Ertuğrul', rating: 9.0, year: 2022 },
  { id: 1306, title: 'Sen Çal Kapımı (Love Is in the Air)', rating: 8.1, year: 2022 },
  { id: 1307, title: 'Kara Sevda (Endless Love)', rating: 8.6, year: 2021 },
  { id: 1308, title: 'Çukur (The Pit)', rating: 8.8, year: 2021 },
  { id: 1309, title: 'Aşk-ı Memnu', rating: 8.5, year: 2020 },
  { id: 1310, title: 'Ezel', rating: 9.1, year: 2020 },
  { id: 1311, title: 'Kuzey Güney', rating: 8.7, year: 2020 },
  { id: 1312, title: 'İçerde (Insider)', rating: 8.9, year: 2021 },
  { id: 1313, title: 'Muhteşem Yüzyıl', rating: 8.6, year: 2020 },
  { id: 1314, title: 'Kaderimin Oyunu', rating: 7.9, year: 2022 },
]

// Dynamic Section 14: Most Trending (Special 10-Row Grid Layout with 80 Items)
const mostTrendingGridMovies = Array.from({ length: 80 }, (_, i) => {
  const titles = [
    'Sacred Games',
    'Lockupp',
    'Off Campus',
    'The Apartment',
    'The Shards',
    'Lioness S3',
    'My Life with the Walter Boys',
    'Cosmic Adventure',
    'Dune: Part Two',
    'Stree 2',
    'Kalki 2898 AD',
    'Jatt & Juliet 3',
    'House of the Dragon',
    'Yellowstone',
    'Queen of Tears',
    'Solo Leveling',
    'Kuruluş: Osman',
    'Oppenheimer',
    'Deadpool & Wolverine',
    'Pushpa 2',
    'Animal',
    'Carry On Jatta 3',
    'The Penguin',
    '1923',
    'Crash Landing on You',
    'Jujutsu Kaisen',
    'Yalı Çapkını',
    'Gladiator II',
    'Jawan',
    'Devara: Part 1',
    'Warning 2',
    'The Boys',
    '1883',
    'The Glory',
    'Demon Slayer',
    'Kızılcık Şerbeti',
    'Civil War',
    'Fighter',
    'Salaar',
    'Ardaas Sarbat De Bhale Di',
    'Shōgun',
    'Lawmen: Bass Reeves',
    'Hidden Love',
    'Frieren',
    'Yargı',
    'Alien: Romulus',
    'Dunki',
    'Leo',
    'Shadaa',
    'The Bear',
    'Billy the Kid',
    'Alchemy of Souls',
    'Kaiju No. 8',
    'Diriliş: Ertuğrul',
    'Challengers',
    'Pathaan',
    'Jailer',
    'Qismat 2',
    'Fallout',
    'Outer Range',
    'Business Proposal',
    'Chainsaw Man',
    'Sen Çal Kapımı',
    'Twisters',
    'Bhool Bhulaiyaa 3',
    'KGF: Chapter 2',
    'Chal Mera Putt 3',
    'Slow Horses',
    'Dark Winds',
    'Vincenzo',
    'Bleach: TYBW',
    'Kara Sevda',
    'The Substance',
    'Singham Again',
    'RRR',
    'Saunkan Saunkne',
    'The Last of Us',
    'Joe Pickett',
    'My Demon',
    'Attack on Titan',
  ]
  const years = [2026, 2025, 2024, 2023, 2022, 2021, 2020, 2019, 2018]
  const ratings = [8.5, 7.8, 9.1, 8.2, 8.9, 7.6, 8.4, 9.0, 7.9, 8.7, 8.1, 8.8, 7.7, 8.3]

  return {
    id: 14000 + i + 1,
    title: titles[i % titles.length] + (i >= titles.length ? ` ${Math.floor(i / titles.length) + 1}` : ''),
    rating: ratings[i % ratings.length],
    year: years[i % years.length],
  }
})

export default function Page() {
  return (
    <main className="min-h-screen bg-[#0c0c11] text-foreground">
      <Navbar />

      {/* Full-width edge-to-edge Hero Banner */}
      <HeroCarousel />

      {/* Distinct Content Section with separate background below banner */}
      <section className="w-full bg-[#111116] border-t border-white/[0.07]">
        <div className="w-full px-3 sm:px-5 md:px-6 lg:px-8 pt-4 sm:pt-5 pb-16 space-y-5 sm:space-y-6">
          {/* Section 1: 🔥Trending Now (1-Row Horizontal Slider) */}
          <ContentRow title="🔥Trending Now" movies={trendingNowMovies} />

          {/* Section 2: 🔥Hot Short TV (1-Row Horizontal Slider) */}
          <ContentRow title="🔥Hot Short TV" movies={hotShortTvMovies} />

          {/* Section 3: Coming Soon (1-Row Horizontal Slider) */}
          <ContentRow title="Coming Soon" movies={comingSoonMovies} />

          {/* Section 4: 🔥Cinema (1-Row Horizontal Slider) */}
          <ContentRow title="🔥Cinema" movies={cinemaMovies} />

          {/* Section 5: 🔥Trending Punjabi (1-Row Horizontal Slider) */}
          <ContentRow title="🔥Trending Punjabi" movies={trendingPunjabiMovies} />

          {/* Section 6: Hollywood (1-Row Horizontal Slider) */}
          <ContentRow title="Hollywood" movies={hollywoodMovies} />

          {/* Section 7: Bollywood (1-Row Horizontal Slider) */}
          <ContentRow title="Bollywood" movies={bollywoodMovies} />

          {/* Section 8: South Indian (1-Row Horizontal Slider) */}
          <ContentRow title="South Indian" movies={southIndianMovies} />

          {/* Section 9: Top Series (1-Row Horizontal Slider) */}
          <ContentRow title="Top Series" movies={topSeriesMovies} />

          {/* Section 10: Western TV (1-Row Horizontal Slider) */}
          <ContentRow title="Western TV" movies={westernTvMovies} />

          {/* Section 11: Best Asian Drama (1-Row Horizontal Slider) */}
          <ContentRow title="Best Asian Drama" movies={bestAsianDramaMovies} />

          {/* Section 12: Top Anime (1-Row Horizontal Slider) */}
          <ContentRow title="Top Anime" movies={topAnimeMovies} />

          {/* Section 13: Turkish Drama (1-Row Horizontal Slider) */}
          <ContentRow title="Turkish Drama" movies={turkishDramaMovies} />

          {/* Section 14: Most Trending (Special 10-Row Grid Layout: 80 cards arranged in 10 rows on desktop) */}
          <div className="relative bg-[#141419]/90 border border-white/[0.08] rounded-2xl p-3.5 sm:p-5 md:p-6 shadow-xl group/frame overflow-hidden">
            {/* Left Frame Glowing Red Line Shade */}
            <div className="absolute left-0 top-3 bottom-3 w-[3px] bg-gradient-to-b from-[#E50914] via-[#E50914]/80 to-transparent rounded-r-full shadow-[0_0_12px_rgba(229,9,20,0.6)]" />

            {/* Frame Header: Title + More Button */}
            <div className="flex items-center justify-between mb-4 sm:mb-5 px-1">
              <div className="flex items-center gap-2.5">
                <span className="w-1 h-4.5 sm:h-5 bg-[#E50914] rounded-full shadow-[0_0_8px_rgba(229,9,20,0.8)]" />
                <h2 className="text-base sm:text-lg md:text-xl font-bold text-white tracking-tight">
                  Most Trending
                </h2>
              </div>
              <Link
                href="/movies"
                className="px-3 sm:px-3.5 py-1 rounded-full text-xs font-bold text-red-400 hover:text-white bg-red-950/40 hover:bg-[#E50914] border border-red-800/60 transition-all flex items-center gap-1 shadow-sm group/btn"
              >
                <span>More</span>
                <ChevronRight size={13} className="transition-transform group-hover/btn:translate-x-0.5" />
              </Link>
            </div>

            {/* 10-Row Multi-Card Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-8 gap-2.5 sm:gap-3.5">
              {mostTrendingGridMovies.map((item) => (
                <Link
                  key={item.id}
                  href={`/movie/${item.id}`}
                  className="group cursor-pointer select-none block"
                >
                  {/* Poster Container */}
                  <div className="relative bg-[#1a1a22] rounded-xl overflow-hidden aspect-[2/3] border border-white/[0.08] shadow-md group-hover:border-white/20 transition-all duration-300">
                    {/* Cinematic Background Gradient */}
                    <div className="w-full h-full bg-gradient-to-br from-[#E50914]/20 via-[#181820] to-[#121216] flex items-center justify-center relative group-hover:scale-105 transition-transform duration-300">
                      <div className="w-10 h-10 rounded-full bg-black/40 border border-white/10 flex items-center justify-center text-white/40 group-hover:text-white group-hover:bg-[#E50914] group-hover:border-transparent transition-all">
                        <Play size={18} className="translate-x-0.5 fill-current" />
                      </div>
                    </div>

                    {/* Red Year Badge on Top-Left */}
                    <div className="absolute top-2 left-2 bg-[#E50914] text-white px-1.5 py-0.5 rounded text-[10px] font-bold shadow-md">
                      {item.year}
                    </div>

                    {/* Rating Badge on Bottom-Right */}
                    <div className="absolute bottom-2 right-2 bg-black/80 backdrop-blur-md border border-white/10 text-amber-400 px-1.5 py-0.5 rounded text-[10px] font-bold flex items-center gap-1 shadow-lg">
                      <Star size={10} className="fill-amber-400 text-amber-400" />
                      <span>{item.rating.toFixed(1)}</span>
                    </div>

                    {/* Hover Play Button Overlay */}
                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex items-center justify-center">
                      <div className="w-10 h-10 rounded-full bg-[#E50914] text-white flex items-center justify-center shadow-[0_0_16px_rgba(229,9,20,0.6)] transform scale-90 group-hover:scale-100 transition-transform">
                        <Play size={18} className="fill-white translate-x-0.5" />
                      </div>
                    </div>
                  </div>

                  {/* Title Below Card */}
                  <div className="mt-1.5">
                    <h3 className="text-xs sm:text-sm font-semibold text-gray-200 group-hover:text-white truncate transition-colors">
                      {item.title}
                    </h3>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}



