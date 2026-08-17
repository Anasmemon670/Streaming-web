import React from 'react'
import Link from 'next/link'
import { cn } from '@/lib/utils'

interface MoviBoxLogoProps {
  className?: string
  iconSize?: number
  showText?: boolean
}

export function MoviBoxLogo({
  className,
  iconSize = 28,
  showText = true,
}: MoviBoxLogoProps) {
  return (
    <Link
      href="/"
      className={cn(
        'inline-flex items-center gap-2 shrink-0 group select-none',
        className,
      )}
    >
      {/* Crisp Vector Play Icon matching Image 1 */}
      <svg
        width={iconSize}
        height={iconSize}
        viewBox="0 0 36 36"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="shrink-0 transition-transform group-hover:scale-105 duration-200"
      >
        <defs>
          <linearGradient id="movibox-bg" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#00E5FF" />
            <stop offset="60%" stopColor="#0088FF" />
            <stop offset="100%" stopColor="#0055FF" />
          </linearGradient>
          <linearGradient id="movibox-arrow" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#55FFA0" />
            <stop offset="100%" stopColor="#00E676" />
          </linearGradient>
        </defs>

        {/* Triangle Play Shape */}
        <path
          d="M6 6.8C6 4.9 8.2 3.7 9.8 4.7L31.2 16.9C32.7 17.8 32.7 20.2 31.2 21.1L9.8 33.3C8.2 34.3 6 33.1 6 31.2V6.8Z"
          fill="url(#movibox-bg)"
        />

        {/* Filmstrip perforation dots on the left edge */}
        <circle cx="8.5" cy="10" r="1.1" fill="#03162b" opacity="0.9" />
        <circle cx="8.5" cy="15.5" r="1.1" fill="#03162b" opacity="0.9" />
        <circle cx="8.5" cy="21" r="1.1" fill="#03162b" opacity="0.9" />
        <circle cx="8.5" cy="26.5" r="1.1" fill="#03162b" opacity="0.9" />

        {/* Downward Green Arrow in Center */}
        <path
          d="M18 9.5V21.5M18 21.5L14 17.5M18 21.5L22 17.5"
          stroke="url(#movibox-arrow)"
          strokeWidth="3"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>

      {/* Brand Text in Pure White */}
      {showText && (
        <span className="text-xl sm:text-2xl font-bold tracking-tight text-white">
          MoviBox
        </span>
      )}
    </Link>
  )
}

