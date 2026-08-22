'use client'

import { use } from 'react'
import Link from 'next/link'
import { Play } from 'lucide-react'
import { Navbar } from '@/components/navbar'
import { WatchSidebar } from '@/components/watch-sidebar'
import { EpisodeSelector } from '@/components/episode-selector'
import { VideoPlayer } from '@/components/video-player'
import { WatchActionButtons } from '@/components/watch-action-buttons'
import { TopCastWatch } from '@/components/top-cast-watch'
import { getMovieById } from '@/lib/mock-data'

interface WatchPageProps {
  params: Promise<{ id: string }>
}

// 28 Curated Movie Cards for 4 Full Rows matching Image 1
const FOR_YOU_28_MOVIES = [
  // Row 1
  { id: 9101, title: 'Heart Beat', rating: 8.6, year: 2024, poster: 'https://images.unsplash.com/photo-1536440136628-849c177e76a1?w=400&auto=format&fit=crop&q=80' },
  { id: 9102, title: 'House Keeping', rating: 7.9, year: 2024, poster: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=400&auto=format&fit=crop&q=80' },
  { id: 9103, title: 'Nain Sukh', rating: 8.2, year: 2023, poster: 'https://images.unsplash.com/photo-1509198397868-475647b2a1e5?w=400&auto=format&fit=crop&q=80' },
  { id: 9104, title: 'Dahaad', rating: 8.5, year: 2023, poster: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?w=400&auto=format&fit=crop&q=80' },
  { id: 9105, title: 'Bhookh', rating: 7.4, year: 2023, poster: 'https://images.unsplash.com/photo-1485846234645-a62644f84728?w=400&auto=format&fit=crop&q=80' },
  { id: 9106, title: 'Sasur Harami', rating: 7.1, year: 2024, poster: 'https://images.unsplash.com/photo-1578632767115-351597cf2477?w=400&auto=format&fit=crop&q=80' },
  { id: 9107, title: 'Lesbian', rating: 7.6, year: 2023, poster: 'https://images.unsplash.com/photo-1517604931442-7e0c8ed2963c?w=400&auto=format&fit=crop&q=80' },
  // Row 2
  { id: 9108, title: 'Akalmand Junglee', rating: 8.0, year: 2024, poster: 'https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?w=400&auto=format&fit=crop&q=80' },
  { id: 9109, title: 'Jabran', rating: 8.3, year: 2023, poster: 'https://images.unsplash.com/photo-1519681393784-d120267933ba?w=400&auto=format&fit=crop&q=80' },
  { id: 9110, title: 'Resort', rating: 7.8, year: 2024, poster: 'https://images.unsplash.com/photo-1516589178581-6cd7833ae3b2?w=400&auto=format&fit=crop&q=80' },
  { id: 9111, title: 'LBW: Love Beyond Words', rating: 7.5, year: 2023, poster: 'https://images.unsplash.com/photo-1514533450685-4493e01d1fdc?w=400&auto=format&fit=crop&q=80' },
  { id: 9112, title: 'Batchmates', rating: 8.1, year: 2024, poster: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=400&auto=format&fit=crop&q=80' },
  { id: 9113, title: 'Wu Assassins', rating: 8.4, year: 2022, poster: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=400&auto=format&fit=crop&q=80' },
  { id: 9114, title: 'Commandos', rating: 8.2, year: 2023, poster: 'https://images.unsplash.com/photo-1483921020237-2ff51e8e4b22?w=400&auto=format&fit=crop&q=80' },
  // Row 3
  { id: 9115, title: 'Emzini A Family Story', rating: 8.7, year: 2023, poster: 'https://images.unsplash.com/photo-1536440136628-849c177e76a1?w=400&auto=format&fit=crop&q=80' },
  { id: 9116, title: "The Princess' Man", rating: 8.9, year: 2022, poster: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=400&auto=format&fit=crop&q=80' },
  { id: 9117, title: 'Halo-Halo X', rating: 7.3, year: 2024, poster: 'https://images.unsplash.com/photo-1509198397868-475647b2a1e5?w=400&auto=format&fit=crop&q=80' },
  { id: 9118, title: 'Sex & Violence', rating: 7.8, year: 2023, poster: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?w=400&auto=format&fit=crop&q=80' },
  { id: 9119, title: 'Aap Ke Aa Jane Se', rating: 8.0, year: 2022, poster: 'https://images.unsplash.com/photo-1485846234645-a62644f84728?w=400&auto=format&fit=crop&q=80' },
  { id: 9120, title: 'LenDen', rating: 7.6, year: 2024, poster: 'https://images.unsplash.com/photo-1578632767115-351597cf2477?w=400&auto=format&fit=crop&q=80' },
  { id: 9121, title: 'Twist of Fate', rating: 8.1, year: 2023, poster: 'https://images.unsplash.com/photo-1517604931442-7e0c8ed2963c?w=400&auto=format&fit=crop&q=80' },
  // Row 4
  { id: 9122, title: 'Dhandha', rating: 8.4, year: 2024, poster: 'https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?w=400&auto=format&fit=crop&q=80' },
  { id: 9123, title: 'Sacred Games', rating: 8.9, year: 2023, poster: 'https://images.unsplash.com/photo-1519681393784-d120267933ba?w=400&auto=format&fit=crop&q=80' },
  { id: 9124, title: 'Lockupp', rating: 7.7, year: 2023, poster: 'https://images.unsplash.com/photo-1516589178581-6cd7833ae3b2?w=400&auto=format&fit=crop&q=80' },
  { id: 9125, title: 'The Apartment', rating: 8.2, year: 2024, poster: 'https://images.unsplash.com/photo-1514533450685-4493e01d1fdc?w=400&auto=format&fit=crop&q=80' },
  { id: 9126, title: 'The Shards', rating: 8.0, year: 2024, poster: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=400&auto=format&fit=crop&q=80' },
  { id: 9127, title: 'Lioness S3', rating: 8.5, year: 2024, poster: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=400&auto=format&fit=crop&q=80' },
  { id: 9128, title: 'Solo Leveling', rating: 9.1, year: 2024, poster: 'https://images.unsplash.com/photo-1483921020237-2ff51e8e4b22?w=400&auto=format&fit=crop&q=80' },
]

export default function WatchPage({ params }: WatchPageProps) {
  const { id } = use(params)
  const movie = getMovieById(Number(id))

  const movieTitle = movie.title || 'Heart Beat S1-S3'
  const categoryTag = movie.genres?.[0] ? `India / ${movie.genres[0]}` : 'India / Drama'

  return (
    <div className="min-h-screen bg-[#110306] bg-[radial-gradient(ellipse_100%_80%_at_50%_0%,rgba(160,10,28,0.48),rgba(40,4,8,0.85)_55%,#090204_100%)] text-foreground flex flex-col justify-between relative overflow-hidden">
      <Navbar />

      {/* Left Sidebar (Only visible on Movie Watch Page) */}
      <WatchSidebar />

      {/* Main Watch Page Content Container */}
      <div className="md:pl-[185px] pt-14 flex-1 relative z-10">
        <div className="px-3 sm:px-5 md:px-6 lg:px-7 py-4 space-y-6">
          {/* Upper Section: Video Player & Direct Metadata on Left, Resources Panel on Right */}
          <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,1fr)_270px] xl:grid-cols-[minmax(0,1fr)_300px] gap-4 sm:gap-5 items-start">
            {/* Left Column: Video Player + Movie Metadata Directly Under Video matching Image 1 */}
            <div className="min-w-0 space-y-3">
              {/* Title above video player */}
              <h1 className="text-sm sm:text-base font-bold text-white tracking-tight">
                {movieTitle}
              </h1>

              {/* Video Player Component */}
              <VideoPlayer title={movieTitle} />

              {/* Movie Meta Info directly aligned with Video Player width matching Image 1 */}
              <div className="space-y-3 pt-2">
                <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3 border-b border-white/[0.08] pb-3.5">
                  {/* Left Title & Date */}
                  <div className="space-y-1">
                    <h2 className="text-xl sm:text-2xl font-black text-white tracking-tight">
                      {movieTitle}
                    </h2>
                    <p className="text-xs text-[#8a8a95]">
                      {movie.year || 2024} 03-08
                    </p>
                  </div>

                  {/* Right Meta: Rating + Country/Category + Subtitles */}
                  <div className="flex items-start gap-4 shrink-0">
                    <div className="text-2xl sm:text-3xl font-black text-white tracking-tight">
                      {movie.rating ? movie.rating.toFixed(1) : '8.6'}
                    </div>

                    <div className="text-xs text-[#a0a0ab] space-y-1">
                      <div className="flex items-center gap-1.5">
                        <span>📍</span>
                        <span>{movie.country ? `${movie.country} / ${movie.genres[0] || 'Drama'}` : categoryTag}</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <span>💬</span>
                        <span>Subtitles:...</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Overview / Story Synopsis */}
                <p className="text-xs sm:text-sm text-[#b5b5c2] leading-relaxed">
                  {movie.overview ||
                    'Based around RK Multispeciality Hospital and its doctors, who are resilient as they deal with medical and personal challenges.'}
                </p>

                {/* 3 Action Buttons (Download, Share, Video Downloader) */}
                <WatchActionButtons />
              </div>

              {/* Section: Top Cast (10) underneath video metadata */}
              <section className="pt-3 border-t border-white/[0.08]">
                <TopCastWatch />
              </section>
            </div>

            {/* Right Column: Resources / Episode Selection Panel matching Image 1 */}
            <div className="w-full lg:pt-7">
              <EpisodeSelector />
            </div>
          </div>

          {/* Section: For You (4 Full Rows of Movie Cards with Active Links) */}
          <section className="pt-4 border-t border-white/[0.08] space-y-3.5">
            <h2 className="text-base sm:text-lg font-bold text-white tracking-tight">
              For You
            </h2>

            {/* 4 Full Rows Grid (7 items per row on desktop) */}
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-7 gap-3">
              {FOR_YOU_28_MOVIES.map((item) => (
                <Link
                  key={item.id}
                  href={`/movie/${item.id}`}
                  className="group cursor-pointer select-none block"
                >
                  {/* Poster Card */}
                  <div className="relative bg-[#1a1a24] rounded-xl overflow-hidden aspect-[2/3] border border-white/[0.08] shadow-md group-hover:border-white/20 transition-all duration-300">
                    <img
                      src={item.poster}
                      alt={item.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />

                    {/* Hover Play Button Overlay */}
                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex items-center justify-center">
                      <div className="w-9 h-9 rounded-full bg-[#E50914] text-white flex items-center justify-center shadow-[0_0_16px_rgba(229,9,20,0.6)] transform scale-90 group-hover:scale-100 transition-transform">
                        <Play size={16} className="fill-white translate-x-0.5" />
                      </div>
                    </div>
                  </div>

                  {/* Title Below Card */}
                  <div className="mt-1.5 px-0.5">
                    <h3 className="text-xs font-semibold text-gray-200 group-hover:text-white truncate transition-colors">
                      {item.title}
                    </h3>
                  </div>
                </Link>
              ))}
            </div>
          </section>
        </div>
      </div>

      {/* Centered Disclaimer Footer */}
      <footer className="w-full border-t border-white/[0.08] bg-[#070103] py-5 px-4 sm:px-8 text-center relative z-10 md:pl-[185px]">
        <p className="max-w-4xl mx-auto text-xs text-gray-500 leading-relaxed">
          Disclaimer: All videos and pictures on MoviBox are from the Internet, and their copyrights belong to the original creators. We only provide webpage services and do not store, record, or upload any content.
        </p>
      </footer>
    </div>
  )
}
