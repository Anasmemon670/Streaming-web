'use client'

import { useState } from 'react'
import { Download, Share2, Film, Check } from 'lucide-react'

export function WatchActionButtons() {
  const [downloading, setDownloading] = useState(false)
  const [copied, setCopied] = useState(false)

  const handleDownload = () => {
    setDownloading(true)
    setTimeout(() => setDownloading(false), 2000)
    const blob = new Blob(
      ['MovieBox Video Download Sample\nFile ready for high speed playback.'],
      { type: 'text/plain' },
    )
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = 'MovieBox-Video.txt'
    document.body.appendChild(a)
    a.click()
    a.remove()
    URL.revokeObjectURL(url)
  }

  const handleShare = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch {
      // fallback
    }
  }

  return (
    <div className="flex flex-wrap items-center gap-2.5 pt-2 select-none">
      {/* Button 1: Download This Video */}
      <button
        type="button"
        onClick={handleDownload}
        className="flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-semibold bg-[#22222b] hover:bg-[#2c2c38] text-gray-200 hover:text-white border border-white/[0.08] transition-all shadow-md active:scale-95"
      >
        <Download size={14} className="text-gray-300" />
        <span>{downloading ? 'Downloading...' : 'Download This Video'}</span>
      </button>

      {/* Button 2: Share */}
      <button
        type="button"
        onClick={handleShare}
        className="flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-semibold bg-[#22222b] hover:bg-[#2c2c38] text-gray-200 hover:text-white border border-white/[0.08] transition-all shadow-md active:scale-95"
      >
        {copied ? <Check size={14} className="text-[#4ade80]" /> : <Share2 size={14} className="text-gray-300" />}
        <span>{copied ? 'Link Copied!' : 'Share'}</span>
      </button>

      {/* Button 3: Video Downloader */}
      <button
        type="button"
        onClick={handleDownload}
        className="flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-semibold bg-[#22222b] hover:bg-[#2c2c38] text-gray-200 hover:text-white border border-white/[0.08] transition-all shadow-md active:scale-95"
      >
        <Film size={14} className="text-gray-300" />
        <span>Video Downloader</span>
      </button>
    </div>
  )
}
