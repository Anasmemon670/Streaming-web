'use client'

import { useEffect, useState } from 'react'
import { Download, Share2, Flag, X } from 'lucide-react'
import { cn } from '@/lib/utils'

const REPORT_OPTIONS = [
  'Video playback error',
  'Audio desync',
  'Wrong subtitles',
  'Broken quality stream',
  'Other issue',
]

export function WatchActionButtons() {
  const [toast, setToast] = useState<string | null>(null)
  const [reportOpen, setReportOpen] = useState(false)
  const [reportOption, setReportOption] = useState(REPORT_OPTIONS[0])

  useEffect(() => {
    if (!toast) return
    const timer = setTimeout(() => setToast(null), 2500)
    return () => clearTimeout(timer)
  }, [toast])

  const handleDownload = () => {
    setToast('Preparing Download...')
    const blob = new Blob(
      ['MovieBox sample download placeholder.\nThis is a demo file for UI testing.'],
      { type: 'text/plain' },
    )
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = 'moviebox-sample.txt'
    document.body.appendChild(a)
    a.click()
    a.remove()
    URL.revokeObjectURL(url)
  }

  const handleShare = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href)
      setToast('Link Copied!')
    } catch {
      setToast('Unable to copy link')
    }
  }

  const handleReportSubmit = () => {
    setReportOpen(false)
    setToast('Report submitted. Thank you!')
  }

  return (
    <>
      <div className="flex flex-wrap gap-2 pt-1 relative">
        <button
          type="button"
          onClick={handleDownload}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-medium bg-secondary border border-border text-foreground hover:border-accent hover:text-accent transition-colors"
        >
          <Download size={14} />
          Download Video
        </button>
        <button
          type="button"
          onClick={handleShare}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-medium bg-secondary border border-border text-foreground hover:border-accent hover:text-accent transition-colors"
        >
          <Share2 size={14} />
          Share
        </button>
        <button
          type="button"
          onClick={() => setReportOpen(true)}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-medium bg-secondary border border-border text-foreground hover:border-accent hover:text-accent transition-colors"
        >
          <Flag size={14} />
          Report
        </button>

        {toast && (
          <div className="absolute left-0 -top-10 z-50 px-3 py-1.5 rounded-md bg-[#1e1e24] border border-accent/40 text-white text-xs font-medium shadow-lg animate-in fade-in">
            {toast}
          </div>
        )}
      </div>

      {reportOpen && (
        <div className="fixed inset-0 z-[80] flex items-center justify-center p-4">
          <button
            type="button"
            className="absolute inset-0 bg-black/70"
            aria-label="Close report dialog"
            onClick={() => setReportOpen(false)}
          />
          <div className="relative w-full max-w-md rounded-xl border border-border bg-[#16161c] shadow-2xl p-5 space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-bold text-white">Report an Issue</h3>
              <button
                type="button"
                onClick={() => setReportOpen(false)}
                className="text-[#888888] hover:text-white transition-colors"
              >
                <X size={18} />
              </button>
            </div>

            <div className="space-y-2">
              {REPORT_OPTIONS.map((option) => (
                <label
                  key={option}
                  className={cn(
                    'flex items-center gap-3 px-3 py-2.5 rounded-lg border cursor-pointer transition-colors',
                    reportOption === option
                      ? 'border-accent bg-accent/10 text-white'
                      : 'border-border text-[#888888] hover:border-accent/50 hover:text-white',
                  )}
                >
                  <input
                    type="radio"
                    name="report"
                    className="accent-[#E50914]"
                    checked={reportOption === option}
                    onChange={() => setReportOption(option)}
                  />
                  <span className="text-sm">{option}</span>
                </label>
              ))}
            </div>

            <div className="flex justify-end gap-2 pt-2">
              <button
                type="button"
                onClick={() => setReportOpen(false)}
                className="px-4 py-2 rounded-lg text-sm font-medium bg-secondary text-foreground hover:bg-muted transition-colors"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleReportSubmit}
                className="px-4 py-2 rounded-lg text-sm font-medium bg-accent text-white hover:bg-accent/90 transition-colors"
              >
                Submit
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
