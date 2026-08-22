'use client'

import { useCallback, useEffect, useRef, useState } from 'react'
import {
  Pause,
  Play,
  Volume2,
  VolumeX,
  Maximize,
  Minimize,
  Settings,
  Flag,
  Check,
  ChevronRight,
} from 'lucide-react'
import { cn } from '@/lib/utils'

const SAMPLE_VIDEO =
  'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4'

const SPEED_OPTIONS = [
  { label: '0.5x', value: 0.5 },
  { label: '0.75x', value: 0.75 },
  { label: 'Normal (1.0x)', value: 1 },
  { label: '1.25x', value: 1.25 },
  { label: '1.5x', value: 1.5 },
  { label: '2.0x', value: 2 },
] as const

const SUBTITLE_OPTIONS = ['English', 'Hindi', 'Korean', 'Off'] as const
const QUALITY_OPTIONS = ['480P', '720P', '1080P', 'Auto'] as const

type AspectRatio = 'default' | '16:9' | '4:3' | 'cover'
type FlipMode = 'normal' | 'horizontal' | 'vertical'
type SubtitleStyle = 'standard' | 'yellow' | 'black-bg'
type SettingsPanel = 'root' | 'speed' | 'aspect' | 'flip' | 'subtitle'

interface VideoPlayerProps {
  title: string
  posterUrl?: string
}

export function VideoPlayer({ title }: VideoPlayerProps) {
  const videoRef = useRef<HTMLVideoElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)

  const [playing, setPlaying] = useState(false)
  const [muted, setMuted] = useState(false)
  const [volume, setVolume] = useState(80)
  const [showVolumeSlider, setShowVolumeSlider] = useState(false)
  const [progress, setProgress] = useState(3)
  const [duration, setDuration] = useState(1894) // 31:34
  const [isFullscreen, setIsFullscreen] = useState(false)

  // Subtitles & Quality drop-up states
  const [selectedSubtitle, setSelectedSubtitle] = useState<string>('English')
  const [showSubtitleMenu, setShowSubtitleMenu] = useState(false)
  const [selectedQuality, setSelectedQuality] = useState<string>('480P')
  const [showQualityMenu, setShowQualityMenu] = useState(false)

  // Settings Panel States
  const [settingsOpen, setSettingsOpen] = useState(false)
  const [settingsPanel, setSettingsPanel] = useState<SettingsPanel>('root')
  const [playbackRate, setPlaybackRate] = useState(1)
  const [aspect, setAspect] = useState<AspectRatio>('default')
  const [flip, setFlip] = useState<FlipMode>('normal')
  const [subtitleStyle, setSubtitleStyle] = useState<SubtitleStyle>('standard')

  // Notification Toast
  const [toast, setToast] = useState<string | null>(null)

  // Apply volume & mute to video element
  useEffect(() => {
    const video = videoRef.current
    if (!video) return
    video.volume = volume / 100
    video.muted = muted
  }, [volume, muted])

  // Apply playback speed to video element
  useEffect(() => {
    const video = videoRef.current
    if (video) video.playbackRate = playbackRate
  }, [playbackRate])

  // Fullscreen change listener
  useEffect(() => {
    const onFsChange = () => setIsFullscreen(Boolean(document.fullscreenElement))
    document.addEventListener('fullscreenchange', onFsChange)
    return () => document.removeEventListener('fullscreenchange', onFsChange)
  }, [])

  // Toggle Play / Pause
  const togglePlay = useCallback(() => {
    const video = videoRef.current
    if (!video) return

    if (video.paused) {
      void video.play().then(() => setPlaying(true)).catch(() => setPlaying(false))
    } else {
      video.pause()
      setPlaying(false)
    }
  }, [])

  // Keyboard controls for ArrowUp / ArrowDown volume adjustment
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (['INPUT', 'TEXTAREA'].includes((e.target as HTMLElement)?.tagName)) return

      if (e.key === 'ArrowUp') {
        e.preventDefault()
        setVolume((v) => {
          const next = Math.min(100, Math.round((v + 10) / 10) * 10)
          setMuted(false)
          return next
        })
        setShowVolumeSlider(true)
      } else if (e.key === 'ArrowDown') {
        e.preventDefault()
        setVolume((v) => {
          const next = Math.max(0, Math.round((v - 10) / 10) * 10)
          if (next === 0) setMuted(true)
          return next
        })
        setShowVolumeSlider(true)
      } else if (e.key === ' ' || e.key === 'k') {
        e.preventDefault()
        togglePlay()
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [togglePlay])

  // Fullscreen toggle
  const toggleFullscreen = async () => {
    const el = containerRef.current
    if (!el) return
    if (!document.fullscreenElement) {
      await el.requestFullscreen().catch(() => {})
    } else {
      await document.exitFullscreen().catch(() => {})
    }
  }

  // Picture in Picture Toggle
  const togglePiP = async () => {
    try {
      if (videoRef.current) {
        if (document.pictureInPictureElement) {
          await document.exitPictureInPicture()
        } else {
          await videoRef.current.requestPictureInPicture()
        }
      }
    } catch (err) {
      setToast('Picture-in-Picture not supported in this browser')
      setTimeout(() => setToast(null), 2500)
    }
  }

  const formatTime = (sec: number) => {
    if (!Number.isFinite(sec)) return '00:00'
    const m = Math.floor(sec / 60)
    const s = Math.floor(sec % 60)
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`
  }

  const objectFitClass =
    aspect === 'cover' ? 'object-cover' : aspect === 'default' ? 'object-contain' : 'object-fill'

  const aspectBoxClass =
    aspect === '4:3' ? 'aspect-[4/3]' : aspect === '16:9' ? 'aspect-video' : 'aspect-video'

  const flipClass =
    flip === 'horizontal'
      ? 'scale-x-[-1]'
      : flip === 'vertical'
        ? 'scale-y-[-1]'
        : ''

  const captionClass =
    subtitleStyle === 'yellow'
      ? 'text-yellow-300'
      : subtitleStyle === 'black-bg'
        ? 'text-white bg-black/80 px-2 py-0.5 rounded'
        : 'text-white'

  return (
    <div className="space-y-2 select-none">
      {/* Video Container */}
      <div
        ref={containerRef}
        className={cn(
          'relative w-full rounded-xl overflow-hidden bg-black border border-white/[0.08] group shadow-2xl',
          aspectBoxClass,
          isFullscreen && '!rounded-none !h-screen !w-screen',
        )}
      >
        <video
          ref={videoRef}
          src={SAMPLE_VIDEO}
          className={cn('w-full h-full cursor-pointer', objectFitClass, flipClass)}
          playsInline
          onClick={togglePlay}
          onTimeUpdate={(e) => setProgress(e.currentTarget.currentTime)}
          onLoadedMetadata={(e) => setDuration(e.currentTarget.duration || 1894)}
          onPlay={() => setPlaying(true)}
          onPause={() => setPlaying(false)}
        />

        {/* Subtitles Overlay */}
        {selectedSubtitle !== 'Off' && (
          <div className="absolute bottom-16 left-1/2 -translate-x-1/2 z-20 pointer-events-none max-w-[85%] text-center">
            <span className={cn('text-xs sm:text-sm font-medium drop-shadow-[0_2px_4px_rgba(0,0,0,0.9)]', captionClass)}>
              {title} — [{selectedSubtitle}] Subtitle Track
            </span>
          </div>
        )}

        {/* Center Play Overlay Button (Refined Size & 100% Working) */}
        {!playing && (
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation()
              togglePlay()
            }}
            className="absolute inset-0 m-auto size-12 sm:size-14 rounded-full bg-white text-black flex items-center justify-center shadow-[0_0_24px_rgba(0,0,0,0.85)] hover:scale-110 active:scale-95 transition-transform z-20 cursor-pointer"
            aria-label="Play video"
          >
            <Play size={24} className="fill-black text-black ml-1" />
          </button>
        )}

        {/* Bottom Custom Controls Bar */}
        <div className="absolute inset-x-0 bottom-0 z-30 bg-gradient-to-t from-black/95 via-black/60 to-transparent px-3 py-2.5 opacity-0 group-hover:opacity-100 focus-within:opacity-100 transition-opacity duration-200 space-y-2">
          {/* Progress Timeline Slider */}
          <div
            className="relative w-full h-1 hover:h-1.5 bg-white/25 rounded-full cursor-pointer transition-all group/bar"
            onClick={(e) => {
              const rect = e.currentTarget.getBoundingClientRect()
              const pos = (e.clientX - rect.left) / rect.width
              const time = pos * (duration || 1894)
              if (videoRef.current) videoRef.current.currentTime = time
              setProgress(time)
            }}
          >
            <div
              className="h-full bg-[#E50914] rounded-full relative"
              style={{ width: `${(progress / (duration || 1894)) * 100}%` }}
            >
              <div className="absolute right-0 top-1/2 -translate-y-1/2 w-2.5 h-2.5 rounded-full bg-white opacity-0 group-hover/bar:opacity-100 transition-opacity" />
            </div>
          </div>

          {/* Controls Row */}
          <div className="flex items-center justify-between text-white text-xs">
            {/* Left: Play/Pause, Vertical Volume Slider, Time */}
            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={togglePlay}
                className="text-white hover:text-[#E50914] transition-colors p-0.5"
                aria-label={playing ? 'Pause' : 'Play'}
              >
                {playing ? <Pause size={18} /> : <Play size={18} className="fill-current" />}
              </button>

              {/* Volume Button with Vertical Slider Box on Hover */}
              <div
                className="relative"
                onMouseEnter={() => setShowVolumeSlider(true)}
                onMouseLeave={() => setShowVolumeSlider(false)}
              >
                <button
                  type="button"
                  onClick={() => setMuted(!muted)}
                  className="text-white hover:text-[#E50914] transition-colors p-0.5"
                  aria-label={muted ? 'Unmute' : 'Mute'}
                >
                  {muted || volume === 0 ? <VolumeX size={18} /> : <Volume2 size={18} />}
                </button>

                {/* Vertical Slider Drop-Up */}
                {showVolumeSlider && (
                  <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 p-2.5 rounded-xl bg-[#14141b]/95 backdrop-blur-md border border-white/10 shadow-2xl flex flex-col items-center gap-2 z-40">
                    <span className="text-[10px] text-gray-300 font-mono">
                      {muted ? '0%' : `${volume}%`}
                    </span>
                    <input
                      type="range"
                      min="0"
                      max="100"
                      step="5"
                      value={muted ? 0 : volume}
                      onChange={(e) => {
                        const val = Number(e.target.value)
                        setVolume(val)
                        setMuted(val === 0)
                      }}
                      className="h-20 w-1.5 appearance-none bg-white/20 rounded-full cursor-pointer accent-[#E50914] [writing-mode:bt-lr] [-webkit-appearance:slider-vertical]"
                      aria-label="Volume level"
                    />
                  </div>
                )}
              </div>

              <span className="text-[11px] text-gray-300 font-mono">
                {formatTime(progress)} / {formatTime(duration)}
              </span>
            </div>

            {/* Right: Subtitle Drop-up, Quality Drop-up, Settings Drop-up, PiP, Fullscreen */}
            <div className="flex items-center gap-2.5 sm:gap-3.5 relative">
              {/* 1. Subtitle Drop-Up Menu */}
              <div
                className="relative"
                onMouseEnter={() => setShowSubtitleMenu(true)}
                onMouseLeave={() => setShowSubtitleMenu(false)}
              >
                <button
                  type="button"
                  onClick={() => setShowSubtitleMenu(!showSubtitleMenu)}
                  className="px-2 py-0.5 rounded text-[11px] font-semibold text-gray-200 hover:text-white bg-white/10 hover:bg-white/20 transition-colors"
                >
                  {selectedSubtitle}
                </button>

                {showSubtitleMenu && (
                  <div className="absolute bottom-full right-0 mb-2 w-28 bg-[#181822]/95 backdrop-blur-md border border-white/10 rounded-xl shadow-2xl py-1 z-40 text-[11px] animate-in fade-in zoom-in-95 duration-100">
                    {SUBTITLE_OPTIONS.map((sub) => (
                      <button
                        key={sub}
                        type="button"
                        onClick={() => {
                          setSelectedSubtitle(sub)
                          setShowSubtitleMenu(false)
                        }}
                        className={cn(
                          'w-full px-3 py-1.5 text-left flex items-center justify-between transition-colors',
                          selectedSubtitle === sub ? 'text-[#E50914] font-bold bg-white/5' : 'text-gray-300 hover:bg-white/10 hover:text-white',
                        )}
                      >
                        <span>{sub}</span>
                        {selectedSubtitle === sub && <Check size={12} />}
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* 2. Quality Drop-Up Menu */}
              <div
                className="relative"
                onMouseEnter={() => setShowQualityMenu(true)}
                onMouseLeave={() => setShowQualityMenu(false)}
              >
                <button
                  type="button"
                  onClick={() => setShowQualityMenu(!showQualityMenu)}
                  className="px-2 py-0.5 rounded text-[11px] font-bold bg-white/10 hover:bg-[#E50914] text-white transition-colors"
                >
                  {selectedQuality}
                </button>

                {showQualityMenu && (
                  <div className="absolute bottom-full right-0 mb-2 w-24 bg-[#181822]/95 backdrop-blur-md border border-white/10 rounded-xl shadow-2xl py-1 z-40 text-[11px] animate-in fade-in zoom-in-95 duration-100">
                    {QUALITY_OPTIONS.map((q) => (
                      <button
                        key={q}
                        type="button"
                        onClick={() => {
                          setSelectedQuality(q)
                          setShowQualityMenu(false)
                        }}
                        className={cn(
                          'w-full px-3 py-1.5 text-left flex items-center justify-between transition-colors',
                          selectedQuality === q ? 'text-[#E50914] font-bold bg-white/5' : 'text-gray-300 hover:bg-white/10 hover:text-white',
                        )}
                      >
                        <span>{q}</span>
                        {selectedQuality === q && <Check size={12} />}
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* 3. Settings Gear Drop-Up Menu */}
              <div className="relative">
                <button
                  type="button"
                  onClick={() => {
                    setSettingsOpen(!settingsOpen)
                    setSettingsPanel('root')
                  }}
                  className="text-gray-300 hover:text-white transition-colors p-0.5"
                  aria-label="Settings"
                >
                  <Settings size={16} />
                </button>

                {settingsOpen && (
                  <div className="absolute bottom-full right-0 mb-2 w-56 rounded-xl bg-[#181822]/95 backdrop-blur-md border border-white/10 shadow-2xl overflow-hidden z-40 text-xs animate-in fade-in zoom-in-95 duration-100">
                    {settingsPanel === 'root' && (
                      <div className="py-1">
                        <button
                          type="button"
                          onClick={() => setSettingsPanel('speed')}
                          className="w-full flex items-center justify-between px-3 py-2 text-gray-200 hover:bg-white/10 transition-colors"
                        >
                          <span>Playback Speed</span>
                          <span className="text-gray-400 text-[11px] flex items-center gap-0.5">
                            {SPEED_OPTIONS.find((s) => s.value === playbackRate)?.label ?? 'Normal'}
                            <ChevronRight size={12} />
                          </span>
                        </button>

                        <button
                          type="button"
                          onClick={() => setSettingsPanel('aspect')}
                          className="w-full flex items-center justify-between px-3 py-2 text-gray-200 hover:bg-white/10 transition-colors"
                        >
                          <span>Aspect Ratio</span>
                          <span className="text-gray-400 text-[11px] flex items-center gap-0.5">
                            {aspect === 'default' ? 'Default' : aspect}
                            <ChevronRight size={12} />
                          </span>
                        </button>

                        <button
                          type="button"
                          onClick={() => setSettingsPanel('flip')}
                          className="w-full flex items-center justify-between px-3 py-2 text-gray-200 hover:bg-white/10 transition-colors"
                        >
                          <span>Video Flip</span>
                          <span className="text-gray-400 text-[11px] flex items-center gap-0.5">
                            {flip}
                            <ChevronRight size={12} />
                          </span>
                        </button>

                        <button
                          type="button"
                          onClick={() => setSettingsPanel('subtitle')}
                          className="w-full flex items-center justify-between px-3 py-2 text-gray-200 hover:bg-white/10 transition-colors"
                        >
                          <span>Subtitle Style</span>
                          <span className="text-gray-400 text-[11px] flex items-center gap-0.5">
                            {subtitleStyle}
                            <ChevronRight size={12} />
                          </span>
                        </button>
                      </div>
                    )}

                    {settingsPanel === 'speed' && (
                      <div className="py-1">
                        <button
                          type="button"
                          onClick={() => setSettingsPanel('root')}
                          className="w-full text-left px-3 py-1.5 text-[11px] font-bold text-gray-400 hover:text-white border-b border-white/10"
                        >
                          ‹ Playback Speed
                        </button>
                        {SPEED_OPTIONS.map((opt) => (
                          <button
                            key={opt.label}
                            type="button"
                            onClick={() => {
                              setPlaybackRate(opt.value)
                              setSettingsPanel('root')
                              setSettingsOpen(false)
                            }}
                            className={cn(
                              'w-full text-left px-3 py-2 transition-colors flex items-center justify-between',
                              playbackRate === opt.value ? 'text-[#E50914] font-bold bg-white/5' : 'text-gray-300 hover:bg-white/10',
                            )}
                          >
                            <span>{opt.label}</span>
                            {playbackRate === opt.value && <Check size={12} />}
                          </button>
                        ))}
                      </div>
                    )}

                    {settingsPanel === 'aspect' && (
                      <div className="py-1">
                        <button
                          type="button"
                          onClick={() => setSettingsPanel('root')}
                          className="w-full text-left px-3 py-1.5 text-[11px] font-bold text-gray-400 hover:text-white border-b border-white/10"
                        >
                          ‹ Aspect Ratio
                        </button>
                        {[
                          ['default', 'Default'],
                          ['16:9', '16:9'],
                          ['4:3', '4:3'],
                          ['cover', 'Cover/Fill'],
                        ].map(([value, label]) => (
                          <button
                            key={value}
                            type="button"
                            onClick={() => {
                              setAspect(value as AspectRatio)
                              setSettingsPanel('root')
                              setSettingsOpen(false)
                            }}
                            className={cn(
                              'w-full text-left px-3 py-2 transition-colors flex items-center justify-between',
                              aspect === value ? 'text-[#E50914] font-bold bg-white/5' : 'text-gray-300 hover:bg-white/10',
                            )}
                          >
                            <span>{label}</span>
                            {aspect === value && <Check size={12} />}
                          </button>
                        ))}
                      </div>
                    )}

                    {settingsPanel === 'flip' && (
                      <div className="py-1">
                        <button
                          type="button"
                          onClick={() => setSettingsPanel('root')}
                          className="w-full text-left px-3 py-1.5 text-[11px] font-bold text-gray-400 hover:text-white border-b border-white/10"
                        >
                          ‹ Video Flip
                        </button>
                        {[
                          ['normal', 'Normal'],
                          ['horizontal', 'Horizontal Flip'],
                          ['vertical', 'Vertical Flip'],
                        ].map(([value, label]) => (
                          <button
                            key={value}
                            type="button"
                            onClick={() => {
                              setFlip(value as FlipMode)
                              setSettingsPanel('root')
                              setSettingsOpen(false)
                            }}
                            className={cn(
                              'w-full text-left px-3 py-2 transition-colors flex items-center justify-between',
                              flip === value ? 'text-[#E50914] font-bold bg-white/5' : 'text-gray-300 hover:bg-white/10',
                            )}
                          >
                            <span>{label}</span>
                            {flip === value && <Check size={12} />}
                          </button>
                        ))}
                      </div>
                    )}

                    {settingsPanel === 'subtitle' && (
                      <div className="py-1">
                        <button
                          type="button"
                          onClick={() => setSettingsPanel('root')}
                          className="w-full text-left px-3 py-1.5 text-[11px] font-bold text-gray-400 hover:text-white border-b border-white/10"
                        >
                          ‹ Subtitle Style
                        </button>
                        {[
                          ['standard', 'Standard'],
                          ['yellow', 'Yellow Text'],
                          ['black-bg', 'Black BG Box'],
                        ].map(([value, label]) => (
                          <button
                            key={value}
                            type="button"
                            onClick={() => {
                              setSubtitleStyle(value as SubtitleStyle)
                              setSettingsPanel('root')
                              setSettingsOpen(false)
                            }}
                            className={cn(
                              'w-full text-left px-3 py-2 transition-colors flex items-center justify-between',
                              subtitleStyle === value ? 'text-[#E50914] font-bold bg-white/5' : 'text-gray-300 hover:bg-white/10',
                            )}
                          >
                            <span>{label}</span>
                            {subtitleStyle === value && <Check size={12} />}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                )}
              </div>

              {/* 4. Picture-in-Picture (PiP) Mode Button */}
              <button
                type="button"
                onClick={togglePiP}
                className="text-gray-300 hover:text-white transition-colors p-0.5"
                aria-label="Picture in Picture Mode"
                title="Picture-in-Picture Mode"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M2 10V5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-7" />
                  <rect x="2" y="14" width="8" height="6" rx="1" />
                </svg>
              </button>

              {/* 5. Fullscreen Toggle */}
              <button
                type="button"
                onClick={toggleFullscreen}
                className="text-gray-300 hover:text-white transition-colors p-0.5"
                aria-label={isFullscreen ? 'Exit Fullscreen' : 'Fullscreen'}
              >
                {isFullscreen ? <Minimize size={16} /> : <Maximize size={16} />}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Sub-bar below video: Playback Issues & Report */}
      <div className="flex items-center justify-between text-xs text-[#8a8a95] px-1 pt-0.5">
        <p className="text-[11px] sm:text-xs">
          Having playback issues? <a href="#" className="underline hover:text-gray-300">Please contact us.</a>
        </p>

        <button
          type="button"
          onClick={() => {
            setToast('Feedback received. We will look into this video stream!')
            setTimeout(() => setToast(null), 3000)
          }}
          className="flex items-center gap-1.5 text-[11px] sm:text-xs text-[#a0a0ab] hover:text-white transition-colors font-medium cursor-pointer"
        >
          <Flag size={13} />
          <span>Report</span>
        </button>
      </div>

      {/* Toast Notification */}
      {toast && (
        <div className="fixed bottom-6 right-6 z-50 bg-[#16161f] border border-red-800/60 text-white text-xs px-4 py-2.5 rounded-xl shadow-2xl animate-in fade-in">
          {toast}
        </div>
      )}
    </div>
  )
}
