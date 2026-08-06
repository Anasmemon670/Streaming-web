'use client'

import { useState, type ReactNode } from 'react'
import Link from 'next/link'
import {
  Ban,
  Clapperboard,
  Download,
  Coins,
  Crown,
  ChevronRight,
  X,
  PartyPopper,
} from 'lucide-react'
import { Navbar } from '@/components/navbar'
import { cn } from '@/lib/utils'

type HistoryTab = 'earned' | 'redeemed'

const EARNED_HISTORY = [
  { id: 1, title: 'Daily Check-in Day 1', amount: '+2', date: 'Today' },
  { id: 2, title: 'Visit Sponsor Page', amount: '+5', date: 'Yesterday' },
  { id: 3, title: 'Watch 1 Hour Movie', amount: '+8', date: '2 days ago' },
]

const REDEEMED_HISTORY = [
  { id: 1, title: '3 Days VIP Pass', amount: '-50', date: 'Last week' },
  { id: 2, title: '7 Days VIP Pass', amount: '-100', date: '2 weeks ago' },
]

const REDEEM_PACKS = [
  { coins: 50, label: '3 Days VIP Pass' },
  { coins: 100, label: '7 Days VIP Pass' },
  { coins: 420, label: '30 Days VIP Pass' },
]

const SPONSOR_TASKS = [
  { id: 1, title: 'Visit Sponsor Page (20s)', coins: 5 },
  { id: 2, title: 'Watch Product Ad (15s)', coins: 5 },
  { id: 3, title: 'Open Partner Offer (20s)', coins: 5 },
  { id: 4, title: 'View Trailer Ad (10s)', coins: 4 },
  { id: 5, title: 'Complete Survey Clip (25s)', coins: 6 },
  { id: 6, title: 'Sponsor Brand Story (20s)', coins: 5 },
]

const MOVIE_QUESTS = [
  { id: 1, title: 'Watch 1 Hour Movie', coins: 8, expires: '12:00:00' },
  { id: 2, title: 'Finish Any Full Feature', coins: 8, expires: '12:00:00' },
]

export default function PremiumPage() {
  const [coins, setCoins] = useState(0)
  const [historyOpen, setHistoryOpen] = useState(false)
  const [historyTab, setHistoryTab] = useState<HistoryTab>('earned')
  const [claimedDay, setClaimedDay] = useState(0)
  const [toast, setToast] = useState<string | null>(null)

  const showToast = (message: string) => {
    setToast(message)
    window.setTimeout(() => setToast(null), 2200)
  }

  const handleClaim = () => {
    if (claimedDay >= 7) {
      showToast('Already claimed today')
      return
    }
    const nextDay = claimedDay + 1
    setClaimedDay(nextDay)
    if (nextDay === 7) {
      showToast('🎉 1-Day VIP Pass claimed!')
    } else {
      setCoins((c) => c + 2)
      showToast('+2 Coins claimed')
    }
  }

  const handleRedeem = (cost: number, label: string) => {
    if (coins < cost) {
      showToast('Not enough coins')
      return
    }
    setCoins((c) => c - cost)
    showToast(`Redeemed: ${label}`)
  }

  const handleSponsorWatch = (reward: number) => {
    setCoins((c) => c + reward)
    showToast(`+${reward} Coins earned`)
  }

  return (
    <main className="min-h-screen bg-[#0b0c10] text-white">
      <Navbar />

      <div className="max-w-3xl mx-auto px-4 pt-24 pb-16 space-y-8">
        {/* User profile & coins */}
        <section className="rounded-xl border border-[#E50914]/25 bg-[#140507] p-4 md:p-5 shadow-[0_0_24px_rgba(229,9,20,0.12)] space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div className="space-y-1">
              <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-black/40 border border-white/10 text-white/90">
                anas***@gmail.com
              </span>
              <p className="text-sm text-[#b0b0b0]">
                Current Status:{' '}
                <span className="text-white font-semibold">Free Member</span>
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={() => setHistoryOpen(true)}
            className="w-full flex items-center justify-between rounded-xl bg-black/35 border border-[#E50914]/30 px-4 py-3 hover:border-[#E50914]/60 transition-colors"
          >
            <div className="flex items-center gap-2">
              <Coins size={18} className="text-yellow-400" />
              <span className="text-sm font-semibold">Coins: {coins}</span>
            </div>
            <ChevronRight size={18} className="text-white/70" />
          </button>
        </section>

        {/* Premium benefits */}
        <section className="space-y-4">
          <h2 className="text-xl font-bold">Get your Premium benefits</h2>
          <div className="flex flex-wrap gap-2 md:gap-3">
            <BenefitBadge icon={<Ban size={16} />} label="No ads" />
            <BenefitBadge icon={<Clapperboard size={16} />} label="4K / Ultra HD quality" />
            <BenefitBadge icon={<Download size={16} />} label="Multi-downloads" />
          </div>
        </section>

        {/* Coin redeem packages — no cash cards */}
        <section className="space-y-4">
          <h2 className="text-lg font-bold">Redeem with Coins</h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {REDEEM_PACKS.map((pack) => (
              <div
                key={pack.coins}
                className="rounded-xl border border-[#E50914]/40 bg-[#140507] p-4 shadow-[0_0_20px_rgba(229,9,20,0.2)] space-y-3"
              >
                <div className="flex items-center gap-1.5 text-yellow-400 text-sm font-bold">
                  <Coins size={16} />
                  {pack.coins} Coins
                </div>
                <p className="text-sm font-semibold text-white">{pack.label}</p>
                <button
                  type="button"
                  onClick={() => handleRedeem(pack.coins, pack.label)}
                  className="w-full py-2 rounded-lg text-sm font-bold bg-[#E50914] hover:bg-[#E50914]/90 text-white transition-colors"
                >
                  Redeem
                </button>
              </div>
            ))}
          </div>
        </section>

        {/* Daily check-in */}
        <section className="rounded-xl border border-[#E50914]/20 bg-[#140507] p-4 md:p-5 space-y-4">
          <h2 className="text-lg font-bold">Check-in daily</h2>
          <div className="grid grid-cols-4 sm:grid-cols-7 gap-2">
            {Array.from({ length: 7 }, (_, i) => {
              const day = i + 1
              const isDay7 = day === 7
              const isClaimed = day <= claimedDay

              return (
                <div
                  key={day}
                  className={cn(
                    'rounded-xl border p-2.5 min-h-[84px] flex flex-col items-center justify-center text-center gap-1',
                    isClaimed
                      ? 'border-[#E50914] bg-[#E50914]/15'
                      : 'border-white/10 bg-black/30',
                    isDay7 && 'border-yellow-500/40',
                  )}
                >
                  <span className="text-[10px] text-[#888888]">Day {day}</span>
                  {isDay7 ? (
                    <>
                      <Crown size={18} className="text-yellow-400" />
                      <span className="text-[10px] font-semibold leading-tight">
                        <PartyPopper size={12} className="inline mr-0.5" />
                        1-Day VIP Pass
                      </span>
                    </>
                  ) : (
                    <>
                      <Coins size={14} className="text-yellow-400" />
                      <span className="text-[11px] font-semibold">+2 Coins</span>
                    </>
                  )}
                </div>
              )
            })}
          </div>
          <button
            type="button"
            onClick={handleClaim}
            className="w-full sm:w-auto px-6 py-2.5 rounded-lg text-sm font-bold bg-[#E50914] hover:bg-[#E50914]/90 transition-colors"
          >
            Claim
          </button>
          <p className="text-xs text-[#888888]">
            Streak resets to Day 1 if a day is missed.
          </p>
        </section>

        {/* Do & Get */}
        <section className="space-y-3">
          <h2 className="text-lg font-bold">Do & Get</h2>
          <div className="rounded-xl border border-[#E50914]/20 bg-[#140507] divide-y divide-white/5 overflow-hidden">
            {SPONSOR_TASKS.map((task) => (
              <div
                key={task.id}
                className="flex items-center justify-between gap-3 px-3 py-2.5"
              >
                <div className="min-w-0 flex items-center gap-2">
                  <span className="text-sm text-white/90 truncate">{task.title}</span>
                  <span className="inline-flex items-center gap-1 shrink-0 text-[11px] font-semibold text-yellow-400">
                    <Coins size={12} />+{task.coins} Coins
                  </span>
                </div>
                <button
                  type="button"
                  onClick={() => handleSponsorWatch(task.coins)}
                  className="shrink-0 px-3 py-1 rounded-md text-xs font-bold bg-yellow-500 text-black hover:bg-yellow-400 transition-colors"
                >
                  Watch
                </button>
              </div>
            ))}

            {MOVIE_QUESTS.map((quest) => (
              <div
                key={quest.id}
                className="flex items-center justify-between gap-3 px-3 py-2.5"
              >
                <div className="min-w-0 space-y-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="text-sm text-white/90">{quest.title}</span>
                    <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-yellow-400">
                      <Coins size={12} />+{quest.coins} Coins
                    </span>
                  </div>
                  <span className="inline-flex text-[10px] px-1.5 py-0.5 rounded bg-black/40 text-[#b0b0b0] border border-white/10">
                    ⏱ Expires in {quest.expires}
                  </span>
                </div>
                <Link
                  href="/movies"
                  className="shrink-0 px-3 py-1 rounded-md text-xs font-bold bg-[#E50914] text-white hover:bg-[#E50914]/90 transition-colors"
                >
                  Watch
                </Link>
              </div>
            ))}
          </div>
        </section>
      </div>

      {/* Points History Modal */}
      {historyOpen && (
        <div className="fixed inset-0 z-[80] flex items-center justify-center p-4">
          <button
            type="button"
            className="absolute inset-0 bg-black/70 backdrop-blur-sm"
            aria-label="Close points history"
            onClick={() => setHistoryOpen(false)}
          />
          <div className="relative w-full max-w-md rounded-2xl border border-white/15 bg-[#140507]/85 backdrop-blur-xl shadow-[0_0_40px_rgba(229,9,20,0.25)] p-5 space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-bold">Points History</h3>
              <button
                type="button"
                onClick={() => setHistoryOpen(false)}
                className="text-[#888888] hover:text-white transition-colors"
              >
                <X size={18} />
              </button>
            </div>

            <div className="flex gap-1 p-1 rounded-lg bg-black/40 border border-white/10">
              {(['earned', 'redeemed'] as const).map((tab) => (
                <button
                  key={tab}
                  type="button"
                  onClick={() => setHistoryTab(tab)}
                  className={cn(
                    'flex-1 py-2 rounded-md text-xs font-semibold capitalize transition-colors',
                    historyTab === tab
                      ? 'bg-[#E50914] text-white'
                      : 'text-[#888888] hover:text-white',
                  )}
                >
                  {tab === 'earned' ? 'Earned History' : 'Redeemed History'}
                </button>
              ))}
            </div>

            <div className="space-y-2 max-h-64 overflow-y-auto">
              {(historyTab === 'earned' ? EARNED_HISTORY : REDEEMED_HISTORY).map((item) => (
                <div
                  key={item.id}
                  className="flex items-center justify-between rounded-lg bg-black/35 border border-white/10 px-3 py-2.5"
                >
                  <div>
                    <p className="text-sm font-medium">{item.title}</p>
                    <p className="text-[11px] text-[#888888]">{item.date}</p>
                  </div>
                  <span
                    className={cn(
                      'text-sm font-bold',
                      historyTab === 'earned' ? 'text-yellow-400' : 'text-[#E50914]',
                    )}
                  >
                    {item.amount}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {toast && (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-[90] px-4 py-2 rounded-lg bg-[#1e1e24] border border-[#E50914]/40 text-sm font-medium shadow-lg">
          {toast}
        </div>
      )}
    </main>
  )
}

function BenefitBadge({ icon, label }: { icon: ReactNode; label: string }) {
  return (
    <div className="inline-flex items-center gap-2 px-3 py-2 rounded-full bg-[#140507] border border-[#E50914]/35 text-xs md:text-sm font-medium shadow-[0_0_12px_rgba(229,9,20,0.15)]">
      <span className="text-[#E50914]">{icon}</span>
      <span>{label}</span>
    </div>
  )
}
