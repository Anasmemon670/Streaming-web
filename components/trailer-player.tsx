'use client'

import { useState, useRef, useEffect, useCallback } from 'react'
import {
  Play,
  Pause,
  Volume2,
  VolumeX,
  Maximize2,
  Minimize2,
  MoreVertical,
  Download,
  Bookmark,
  Gauge,
} from 'lucide-react'

export function TrailerPlayer() {
  const [isPlaying, setIsPlaying] = useState(false)
  const [isMuted, setIsMuted] = useState(false)
  const [volume, setVolume] = useState(70)
  const [progress, setProgress] = useState(35)
  const [isFullscreen, setIsFullscreen] = useState(false)
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [playbackSpeed, setPlaybackSpeed] = useState('1.0x')
  const [showSpeedSubmenu, setShowSpeedSubmenu] = useState(false)
  const [showVolumeSlider, setShowVolumeSlider] = useState(false)

  const containerRef = useRef<HTMLDivElement>(null)
  const menuRef = useRef<HTMLDivElement>(null)

  // Toggle Play / Pause
  const togglePlay = useCallback(() => {
    setIsPlaying((prev) => !prev)
  }, [])

  // Toggle Fullscreen
  const toggleFullscreen = useCallback(() => {
    if (!containerRef.current) return

    if (!document.fullscreenElement) {
      containerRef.current.requestFullscreen().catch((err) => {
        console.error(`Error attempting to enable fullscreen: ${err.message}`)
      })
    } else {
      document.exitFullscreen().catch((err) => {
        console.error(`Error attempting to exit fullscreen: ${err.message}`)
      })
    }
  }, [])

  // Listen for fullscreen change event (such as pressing ESC)
  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement)
    }

    document.addEventListener('fullscreenchange', handleFullscreenChange)
    return () => document.removeEventListener('fullscreenchange', handleFullscreenChange)
  }, [])

  // Keyboard controls: ArrowUp/Down for Volume, Space for Play/Pause, ESC handled by browser
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Don't intercept if user is typing in an input
      if (['INPUT', 'TEXTAREA'].includes((e.target as HTMLElement)?.tagName)) {
        return
      }

      if (e.key === 'ArrowUp') {
        e.preventDefault()
        setVolume((prev) => Math.min(100, Math.round((prev + 10) / 10) * 10))
        setIsMuted(false)
      } else if (e.key === 'ArrowDown') {
        e.preventDefault()
        setVolume((prev) => Math.max(0, Math.round((prev - 10) / 10) * 10))
      } else if (e.key === ' ') {
        e.preventDefault()
        togglePlay()
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [togglePlay])

  // Close 3-dots dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setIsMenuOpen(false)
        setShowSpeedSubmenu(false)
      }
    }
    if (isMenuOpen) {
      document.addEventListener('mousedown', handleClickOutside)
    }
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [isMenuOpen])

  return (
    <div className="space-y-3 select-none">
      <h2 className="text-base sm:text-lg font-bold text-white tracking-tight">
        Trailer
      </h2>

      {/* Video Container Card with exact requested 490px x 272px dimension on desktop */}
      <div
        ref={containerRef}
        className={`relative w-full max-w-[490px] h-[272px] rounded-2xl overflow-hidden bg-black border border-white/[0.08] group shadow-2xl ${
          isFullscreen ? '!max-w-none !h-screen !w-screen !rounded-none' : ''
        }`}
      >
        {/* Cinema Video Still Background (no zoom on hover) */}
        <div
          onClick={togglePlay}
          className="w-full h-full cursor-pointer relative"
        >
          <img
            src="https://images.unsplash.com/photo-1536440136628-849c177e76a1?w=1400&auto=format&fit=crop&q=80"
            alt="Weak Hero Trailer"
            className="w-full h-full object-cover brightness-90 transition-none"
          />

          {/* Top-Right Watermark / Brand Logo */}
          <div className="absolute top-3 right-4 z-10 pointer-events-none">
            <span className="text-white/90 font-black text-sm tracking-wider uppercase drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">
              wavve
            </span>
          </div>

          {/* Center Play Button Overlay (when paused) */}
          {!isPlaying && (
            <div className="absolute inset-0 flex items-center justify-center bg-black/30 backdrop-blur-[1px] transition-opacity">
              <div className="w-14 h-14 rounded-full bg-[#E50914] text-white flex items-center justify-center shadow-[0_0_24px_rgba(229,9,20,0.7)] hover:scale-110 active:scale-95 transition-transform">
                <Play size={22} className="fill-white translate-x-0.5" />
              </div>
            </div>
          )}
        </div>

        {/* Hover Controls Overlay */}
        <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/95 via-black/60 to-transparent p-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-20 space-y-2">
          {/* Progress Timeline Bar */}
          <div
            className="relative w-full h-1.5 bg-white/20 hover:h-2 rounded-full cursor-pointer transition-all group/bar"
            onClick={(e) => {
              e.stopPropagation()
              const rect = e.currentTarget.getBoundingClientRect()
              const pos = ((e.clientX - rect.left) / rect.width) * 100
              setProgress(Math.max(0, Math.min(100, pos)))
            }}
          >
            <div
              className="h-full bg-[#E50914] rounded-full relative"
              style={{ width: `${progress}%` }}
            >
              <div className="absolute right-0 top-1/2 -translate-y-1/2 w-3 h-3 rounded-full bg-white shadow-md opacity-0 group-hover/bar:opacity-100 transition-opacity" />
            </div>
          </div>

          {/* Control Buttons Row */}
          <div className="flex items-center justify-between text-white text-xs">
            {/* Left Controls: Play/Pause + Time */}
            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation()
                  togglePlay()
                }}
                className="hover:text-[#E50914] transition-colors p-1"
                aria-label={isPlaying ? 'Pause' : 'Play'}
              >
                {isPlaying ? <Pause size={18} /> : <Play size={18} className="fill-current" />}
              </button>

              <span className="text-gray-300 text-[11px]">
                0:45 / 2:15
              </span>
            </div>

            {/* Right Controls: Volume Slider, Fullscreen, 3-Dots Menu */}
            <div className="flex items-center gap-2.5 relative">
              {/* Volume Button with Horizontal Slider */}
              <div
                className="flex items-center gap-1.5 relative group/vol"
                onMouseEnter={() => setShowVolumeSlider(true)}
                onMouseLeave={() => setShowVolumeSlider(false)}
              >
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation()
                    setIsMuted(!isMuted)
                  }}
                  className="hover:text-[#E50914] transition-colors p-1"
                  aria-label={isMuted ? 'Unmute' : 'Mute'}
                >
                  {isMuted || volume === 0 ? <VolumeX size={18} /> : <Volume2 size={18} />}
                </button>

                {/* Horizontal Volume Slider with Number Indicator */}
                <div
                  className={`flex items-center gap-1.5 transition-all duration-200 ${
                    showVolumeSlider ? 'opacity-100 w-24' : 'opacity-0 w-0 pointer-events-none'
                  } overflow-hidden`}
                >
                  <input
                    type="range"
                    min="0"
                    max="100"
                    step="10"
                    value={isMuted ? 0 : volume}
                    onChange={(e) => {
                      setVolume(Number(e.target.value))
                      setIsMuted(false)
                    }}
                    className="w-16 h-1 bg-white/30 rounded-lg appearance-none cursor-pointer accent-[#E50914]"
                  />
                  <span className="text-[10px] text-gray-300 font-mono min-w-[24px]">
                    {isMuted ? '0%' : `${volume}%`}
                  </span>
                </div>
              </div>

              {/* Fullscreen Toggle Button */}
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation()
                  toggleFullscreen()
                }}
                className="hover:text-[#E50914] transition-colors p-1"
                aria-label={isFullscreen ? 'Exit Fullscreen' : 'Fullscreen'}
              >
                {isFullscreen ? <Minimize2 size={17} /> : <Maximize2 size={17} />}
              </button>

              {/* 3-Dots Menu Button */}
              <div className="relative" ref={menuRef}>
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation()
                    setIsMenuOpen(!isMenuOpen)
                  }}
                  className="hover:text-[#E50914] transition-colors p-1"
                  aria-label="More options"
                >
                  <MoreVertical size={18} />
                </button>

                {/* Dropdown Options */}
                {isMenuOpen && (
                  <div className="absolute right-0 bottom-full mb-2 w-44 bg-[#181820]/95 backdrop-blur-md border border-white/10 rounded-xl shadow-2xl py-1.5 z-30 text-xs text-gray-200 animate-in fade-in zoom-in-95 duration-150">
                    <button
                      type="button"
                      onClick={() => setShowSpeedSubmenu(!showSpeedSubmenu)}
                      className="w-full px-3 py-2 text-left hover:bg-white/10 flex items-center justify-between transition-colors"
                    >
                      <span className="flex items-center gap-2">
                        <Gauge size={14} />
                        <span>Playback Speed</span>
                      </span>
                      <span className="text-gray-400">{playbackSpeed}</span>
                    </button>

                    {showSpeedSubmenu && (
                      <div className="bg-black/40 py-1 border-y border-white/5 space-y-0.5">
                        {['0.5x', '1.0x', '1.25x', '1.5x', '2.0x'].map((spd) => (
                          <button
                            key={spd}
                            type="button"
                            onClick={() => {
                              setPlaybackSpeed(spd)
                              setShowSpeedSubmenu(false)
                              setIsMenuOpen(false)
                            }}
                            className={`w-full px-5 py-1 text-left text-[11px] hover:text-[#E50914] ${
                              playbackSpeed === spd ? 'text-[#E50914] font-bold' : 'text-gray-400'
                            }`}
                          >
                            {spd}
                          </button>
                        ))}
                      </div>
                    )}

                    <button
                      type="button"
                      onClick={() => setIsMenuOpen(false)}
                      className="w-full px-3 py-2 text-left hover:bg-white/10 flex items-center gap-2 transition-colors"
                    >
                      <Bookmark size={14} />
                      <span>Save</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => setIsMenuOpen(false)}
                      className="w-full px-3 py-2 text-left hover:bg-white/10 flex items-center gap-2 transition-colors"
                    >
                      <Download size={14} />
                      <span>Download</span>
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
