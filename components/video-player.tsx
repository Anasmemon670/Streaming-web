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
} from 'lucide-react'
import { cn } from '@/lib/utils'

const SAMPLE_VIDEO =
  'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4'

const SPEED_OPTIONS = [
  { label: '0.5x', value: 0.5 },
  { label: '0.75x', value: 0.75 },
  { label: 'Normal', value: 1 },
  { label: '1.25x', value: 1.25 },
  { label: '1.5x', value: 1.5 },
  { label: '2.0x', value: 2 },
] as const

type AspectRatio = 'default' | '16:9' | '4:3' | 'cover'
type FlipMode = 'normal' | 'horizontal' | 'vertical'
type SubtitleStyle = 'standard' | 'yellow' | 'black-bg'
type Quality = '720P' | '1080P'
type SettingsPanel = 'root' | 'speed' | 'aspect' | 'flip' | 'subtitle'

interface VideoPlayerProps {
  title: string
}

export function VideoPlayer({ title }: VideoPlayerProps) {
  const videoRef = useRef<HTMLVideoElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)

  const [playing, setPlaying] = useState(false)
  const [muted, setMuted] = useState(false)
  const [volume, setVolume] = useState(80)
  const [showVolume, setShowVolume] = useState(false)
  const [volumeKeyboardActive, setVolumeKeyboardActive] = useState(false)
  const [progress, setProgress] = useState(0)
  const [duration, setDuration] = useState(0)
  const [isFullscreen, setIsFullscreen] = useState(false)
  const [settingsOpen, setSettingsOpen] = useState(false)
  const [settingsPanel, setSettingsPanel] = useState<SettingsPanel>('root')
  const [playbackRate, setPlaybackRate] = useState(1)
  const [aspect, setAspect] = useState<AspectRatio>('default')
  const [flip, setFlip] = useState<FlipMode>('normal')
  const [subtitleStyle, setSubtitleStyle] = useState<SubtitleStyle>('standard')
  const [quality, setQuality] = useState<Quality>('720P')
  const [showCaptions, setShowCaptions] = useState(true)

  useEffect(() => {
    const video = videoRef.current
    if (!video) return
    video.volume = volume / 100
    video.muted = muted
  }, [volume, muted])

  useEffect(() => {
    const video = videoRef.current
    if (video) video.playbackRate = playbackRate
  }, [playbackRate])

  useEffect(() => {
    const onFsChange = () => setIsFullscreen(Boolean(document.fullscreenElement))
    document.addEventListener('fullscreenchange', onFsChange)
    return () => document.removeEventListener('fullscreenchange', onFsChange)
  }, [])

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

  const handleVideoClick = useCallback(() => {
    togglePlay()
  }, [togglePlay])

  const handleCenterPlayClick = useCallback(
    (e: React.MouseEvent<HTMLButtonElement>) => {
      e.stopPropagation()
      togglePlay()
    },
    [togglePlay],
  )

  const adjustVolume = useCallback((delta: number) => {
    setVolume((prev) => {
      const next = Math.min(100, Math.max(0, prev + delta))
      setMuted(next === 0)
      return next
    })
  }, [])

  const handleVolumeKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === 'ArrowUp') {
        e.preventDefault()
        adjustVolume(5)
      } else if (e.key === 'ArrowDown') {
        e.preventDefault()
        adjustVolume(-5)
      }
    },
    [adjustVolume],
  )

  useEffect(() => {
    if (!volumeKeyboardActive) return
    document.addEventListener('keydown', handleVolumeKeyDown)
    return () => document.removeEventListener('keydown', handleVolumeKeyDown)
  }, [volumeKeyboardActive, handleVolumeKeyDown])

  const toggleFullscreen = async () => {
    const el = containerRef.current
    if (!el) return
    if (!document.fullscreenElement) {
      await el.requestFullscreen()
    } else {
      await document.exitFullscreen()
    }
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

  const formatTime = (sec: number) => {
    if (!Number.isFinite(sec)) return '0:00'
    const m = Math.floor(sec / 60)
    const s = Math.floor(sec % 60)
    return `${m}:${s.toString().padStart(2, '0')}`
  }

  const selectOption = <T,>(setter: (v: T) => void, value: T) => {
    setter(value)
    setSettingsPanel('root')
  }

  return (
    <div
      ref={containerRef}
      className={cn(
        'relative bg-black rounded-lg overflow-hidden group min-w-0',
        aspectBoxClass,
      )}
    >
      <video
        ref={videoRef}
        src={SAMPLE_VIDEO}
        className={cn('w-full h-full cursor-pointer', objectFitClass, flipClass)}
        playsInline
        onClick={handleVideoClick}
        onTimeUpdate={(e) => setProgress(e.currentTarget.currentTime)}
        onLoadedMetadata={(e) => setDuration(e.currentTarget.duration)}
        onPlay={() => setPlaying(true)}
        onPause={() => setPlaying(false)}
      />

      {/* Quality badge overlay (demo) */}
      <div className="absolute top-3 left-3 z-10 px-2 py-0.5 rounded bg-black/60 text-[10px] font-bold text-white">
        {quality}
      </div>

      {/* Captions demo overlay */}
      {showCaptions && (
        <div className="absolute bottom-16 left-1/2 -translate-x-1/2 z-10 pointer-events-none max-w-[80%] text-center">
          <span className={cn('text-sm md:text-base font-medium drop-shadow', captionClass)}>
            {title} — sample subtitle track
          </span>
        </div>
      )}

      {/* Center play/pause */}
      <button
        type="button"
        onClick={handleCenterPlayClick}
        className={cn(
          'absolute inset-0 m-auto size-14 md:size-16 rounded-full bg-accent/90 hover:bg-accent text-white flex items-center justify-center transition-opacity z-20 pointer-events-auto',
          playing ? 'opacity-0 group-hover:opacity-100' : 'opacity-100',
        )}
        aria-label={playing ? 'Pause' : 'Play'}
      >
        {playing ? <Pause size={28} fill="white" /> : <Play size={28} fill="white" className="ml-1" />}
      </button>

      {/* Bottom controls */}
      <div className="absolute bottom-0 left-0 right-0 z-30 bg-gradient-to-t from-black/90 via-black/50 to-transparent p-2 md:p-3 opacity-0 group-hover:opacity-100 focus-within:opacity-100 transition-opacity">
        <input
          type="range"
          min={0}
          max={duration || 0}
          step={0.1}
          value={progress}
          onChange={(e) => {
            const time = Number(e.target.value)
            if (videoRef.current) videoRef.current.currentTime = time
            setProgress(time)
          }}
          className="w-full h-1 mb-2 accent-[#E50914] cursor-pointer"
        />

        <div className="flex items-center gap-1.5 md:gap-2 flex-wrap">
          <button
            type="button"
            onClick={togglePlay}
            className="text-white hover:text-accent transition-colors p-1"
            aria-label={playing ? 'Pause' : 'Play'}
          >
            {playing ? <Pause size={18} /> : <Play size={18} />}
          </button>

          <span className="text-[11px] text-white/80 tabular-nums min-w-[72px]">
            {formatTime(progress)} / {formatTime(duration)}
          </span>

          <div
            className="relative"
            onMouseEnter={() => setShowVolume(true)}
            onMouseLeave={() => {
              setShowVolume(false)
              setVolumeKeyboardActive(false)
            }}
          >
            <button
              type="button"
              onClick={() => {
                setMuted((m) => !m)
                setShowVolume(true)
                setVolumeKeyboardActive(true)
              }}
              onFocus={() => {
                setShowVolume(true)
                setVolumeKeyboardActive(true)
              }}
              onBlur={() => setVolumeKeyboardActive(false)}
              className="text-white hover:text-accent transition-colors p-1"
              aria-label="Volume"
            >
              {muted || volume === 0 ? <VolumeX size={18} /> : <Volume2 size={18} />}
            </button>

            {showVolume && (
              <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 flex flex-col items-center gap-1.5 px-2.5 py-3 rounded-lg bg-[#1a1a20] border border-border shadow-xl">
                <span className="text-[10px] text-white/70 tabular-nums">{muted ? 0 : volume}</span>
                <input
                  type="range"
                  min={0}
                  max={100}
                  value={muted ? 0 : volume}
                  onChange={(e) => {
                    const v = Number(e.target.value)
                    setVolume(v)
                    setMuted(v === 0)
                  }}
                  className="watch-volume-slider h-24 cursor-pointer"
                  aria-label="Volume level"
                  aria-orientation="vertical"
                />
              </div>
            )}
          </div>

          <div className="flex-1" />

          <button
            type="button"
            onClick={() => setQuality((q) => (q === '720P' ? '1080P' : '720P'))}
            className="px-2 py-0.5 rounded text-[11px] font-bold bg-white/10 hover:bg-accent text-white transition-colors"
          >
            {quality}
          </button>

          <div className="relative">
            <button
              type="button"
              onClick={() => {
                setSettingsOpen((o) => !o)
                setSettingsPanel('root')
              }}
              className="text-white hover:text-accent transition-colors p-1"
              aria-label="Settings"
            >
              <Settings size={18} />
            </button>

            {settingsOpen && (
              <div className="absolute bottom-full right-0 mb-2 w-56 rounded-lg bg-[#1a1a20] border border-border shadow-2xl overflow-hidden z-40">
                {settingsPanel === 'root' && (
                  <div className="py-1">
                    {(
                      [
                        ['speed', 'Play Speed', SPEED_OPTIONS.find((s) => s.value === playbackRate)?.label ?? 'Normal'],
                        ['aspect', 'Aspect Ratio', aspect === 'default' ? 'Default' : aspect === 'cover' ? 'Cover/Fill' : aspect],
                        ['flip', 'Video Flip', flip === 'normal' ? 'Normal' : flip === 'horizontal' ? 'Horizontal Flip' : 'Vertical Flip'],
                        ['subtitle', 'Subtitle Style', subtitleStyle === 'standard' ? 'Standard' : subtitleStyle === 'yellow' ? 'Yellow Text' : 'Black BG'],
                      ] as const
                    ).map(([panel, label, value]) => (
                      <button
                        key={panel}
                        type="button"
                        onClick={() => setSettingsPanel(panel)}
                        className="w-full flex items-center justify-between px-3 py-2.5 text-sm text-white hover:bg-white/5 transition-colors"
                      >
                        <span>{label}</span>
                        <span className="text-[#888888] text-xs">{value} ›</span>
                      </button>
                    ))}
                    <button
                      type="button"
                      onClick={() => setShowCaptions((c) => !c)}
                      className="w-full flex items-center justify-between px-3 py-2.5 text-sm text-white hover:bg-white/5 transition-colors border-t border-border"
                    >
                      <span>Subtitles</span>
                      <span className="text-[#888888] text-xs">{showCaptions ? 'On' : 'Off'}</span>
                    </button>
                  </div>
                )}

                {settingsPanel === 'speed' && (
                  <SettingsList
                    title="Play Speed"
                    onBack={() => setSettingsPanel('root')}
                    options={SPEED_OPTIONS.map((o) => ({
                      label: o.label,
                      active: playbackRate === o.value,
                      onClick: () => selectOption(setPlaybackRate, o.value),
                    }))}
                  />
                )}

                {settingsPanel === 'aspect' && (
                  <SettingsList
                    title="Aspect Ratio"
                    onBack={() => setSettingsPanel('root')}
                    options={(
                      [
                        ['default', 'Default'],
                        ['16:9', '16:9'],
                        ['4:3', '4:3'],
                        ['cover', 'Cover/Fill'],
                      ] as const
                    ).map(([value, label]) => ({
                      label,
                      active: aspect === value,
                      onClick: () => selectOption(setAspect, value),
                    }))}
                  />
                )}

                {settingsPanel === 'flip' && (
                  <SettingsList
                    title="Video Flip"
                    onBack={() => setSettingsPanel('root')}
                    options={(
                      [
                        ['normal', 'Normal'],
                        ['horizontal', 'Horizontal Flip'],
                        ['vertical', 'Vertical Flip'],
                      ] as const
                    ).map(([value, label]) => ({
                      label,
                      active: flip === value,
                      onClick: () => selectOption(setFlip, value),
                    }))}
                  />
                )}

                {settingsPanel === 'subtitle' && (
                  <SettingsList
                    title="Subtitle Style"
                    onBack={() => setSettingsPanel('root')}
                    options={(
                      [
                        ['standard', 'Standard'],
                        ['yellow', 'Yellow Text'],
                        ['black-bg', 'Black BG'],
                      ] as const
                    ).map(([value, label]) => ({
                      label,
                      active: subtitleStyle === value,
                      onClick: () => selectOption(setSubtitleStyle, value),
                    }))}
                  />
                )}
              </div>
            )}
          </div>

          <button
            type="button"
            onClick={toggleFullscreen}
            className="text-white hover:text-accent transition-colors p-1"
            aria-label={isFullscreen ? 'Exit fullscreen' : 'Fullscreen'}
          >
            {isFullscreen ? <Minimize size={18} /> : <Maximize size={18} />}
          </button>
        </div>
      </div>
    </div>
  )
}

function SettingsList({
  title,
  onBack,
  options,
}: {
  title: string
  onBack: () => void
  options: Array<{ label: string; active: boolean; onClick: () => void }>
}) {
  return (
    <div className="py-1">
      <button
        type="button"
        onClick={onBack}
        className="w-full text-left px-3 py-2 text-xs font-semibold text-[#888888] hover:text-white border-b border-border"
      >
        ‹ {title}
      </button>
      {options.map((opt) => (
        <button
          key={opt.label}
          type="button"
          onClick={opt.onClick}
          className={cn(
            'w-full text-left px-3 py-2.5 text-sm transition-colors',
            opt.active ? 'text-accent bg-accent/10' : 'text-white hover:bg-white/5',
          )}
        >
          {opt.label}
        </button>
      ))}
    </div>
  )
}
