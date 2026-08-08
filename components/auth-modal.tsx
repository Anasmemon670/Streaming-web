'use client'

import { useEffect, useMemo, useState, type FormEvent } from 'react'
import { X, Loader2, Check, AlertCircle } from 'lucide-react'
import { cn } from '@/lib/utils'
import { supabase } from '@/lib/supabase'

interface AuthModalProps {
  isOpen: boolean
  onClose: () => void
}

function GoogleIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 48 48" aria-hidden="true">
      <path
        fill="#FFC107"
        d="M43.6 20.5H42V20H24v8h11.3C33.7 32.7 29.3 36 24 36c-6.6 0-12-5.4-12-12s5.4-12 12-12c3 0 5.8 1.1 7.9 3l5.7-5.7C34 5.1 29.3 3 24 3 12.3 3 3 12.3 3 24s9.3 21 21 21 21-9.3 21-21c0-1.2-.1-2.3-.4-3.5z"
      />
      <path
        fill="#FF3D00"
        d="M6.3 14.7l6.6 4.8C14.7 15.1 19 12 24 12c3 0 5.8 1.1 7.9 3l5.7-5.7C34 5.1 29.3 3 24 3 16.3 3 9.7 7.3 6.3 14.7z"
      />
      <path
        fill="#4CAF50"
        d="M24 45c5.2 0 9.9-2 13.4-5.2l-6.2-5.2C29.2 36.3 26.7 37 24 37c-5.2 0-9.6-3.3-11.3-7.9l-6.5 5C9.6 40.6 16.2 45 24 45z"
      />
      <path
        fill="#1976D2"
        d="M43.6 20.5H42V20H24v8h11.3c-1.1 3.1-3.5 5.5-6.1 7.1l.1.1 6.2 5.2C38.1 38.3 45 33 45 24c0-1.2-.1-2.3-.4-3.5z"
      />
    </svg>
  )
}

export function AuthModal({ isOpen, onClose }: AuthModalProps) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const [error, setError] = useState('')

  const requirements = useMemo(
    () => ({
      minLength: password.length >= 8,
      uppercase: /[A-Z]/.test(password),
      lowercase: /[a-z]/.test(password),
      numberOrSpecial: /[0-9!@#$%^&*(),.?":{}|<>_\-+=\[\]\\/;'`~]/.test(password),
    }),
    [password],
  )

  useEffect(() => {
    if (!isOpen) {
      setEmail('')
      setPassword('')
      setIsLoading(false)
      setIsSuccess(false)
      setError('')
    }
  }, [isOpen])

  useEffect(() => {
    if (!isOpen) return
    document.body.style.overflow = 'hidden'
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && !isLoading) onClose()
    }
    document.addEventListener('keydown', onKey)
    return () => {
      document.body.style.overflow = ''
      document.removeEventListener('keydown', onKey)
    }
  }, [isOpen, isLoading, onClose])

  if (!isOpen) return null

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    if (isLoading || isSuccess) return

    setIsLoading(true)
    setError('')

    try {
      // Try to sign in first
      const { data: signInData, error: signInError } = await supabase.auth.signInWithPassword({
        email,
        password,
      })

      if (signInError) {
        // If sign in fails, try to sign up
        const { data: signUpData, error: signUpError } = await supabase.auth.signUp({
          email,
          password,
        })

        if (signUpError) {
          throw signUpError
        }

        // Check if user needs email confirmation
        if (signUpData.user && !signUpData.session) {
          setError('Please check your email to confirm your account')
          setIsLoading(false)
          return
        }
      }

      setIsSuccess(true)
      setTimeout(() => {
        onClose()
      }, 800)
    } catch (err: any) {
      setError(err.message || 'Authentication failed')
      setIsLoading(false)
    }
  }

  const handleGoogleSignIn = async () => {
    setIsLoading(true)
    setError('')

    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: `${window.location.origin}/api/auth/callback`,
        },
      })

      if (error) {
        throw error
      }
    } catch (err: any) {
      setError(err.message || 'Google sign in failed')
      setIsLoading(false)
    }
  }

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-3 sm:p-4">
      <button
        type="button"
        className="absolute inset-0 bg-black/75 backdrop-blur-md"
        aria-label="Close auth modal"
        onClick={() => {
          if (!isLoading) onClose()
        }}
      />

      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="auth-modal-title"
        className={cn(
          'relative w-full max-w-md max-h-[90vh] overflow-y-auto rounded-2xl',
          'border border-white/15 bg-[#140507]/85 backdrop-blur-xl',
          'shadow-[0_0_40px_rgba(229,9,20,0.28)] p-5 sm:p-6',
          'transition-opacity duration-300',
          isSuccess ? 'opacity-90' : 'opacity-100',
        )}
      >
        <button
          type="button"
          onClick={() => {
            if (!isLoading) onClose()
          }}
          className="absolute top-3 right-3 sm:top-4 sm:right-4 p-1.5 rounded-lg text-[#888888] hover:text-white hover:bg-white/5 transition-colors"
          aria-label="Close"
        >
          <X size={18} />
        </button>

        <h2 id="auth-modal-title" className="text-xl sm:text-2xl font-bold text-white pr-8 mb-5">
          Welcome to MoviBox
        </h2>

        <button
          type="button"
          onClick={handleGoogleSignIn}
          disabled={isLoading}
          className="w-full flex items-center justify-center gap-2.5 py-2.5 sm:py-3 rounded-xl bg-white text-gray-900 text-sm font-semibold hover:bg-gray-100 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <GoogleIcon />
          Continue with Google
        </button>

        {error && (
          <div className="flex items-center gap-2 p-3 rounded-lg bg-red-500/10 border border-red-500/20 text-red-400 text-sm">
            <AlertCircle size={16} />
            {error}
          </div>
        )}

        <div className="flex items-center gap-3 my-4 sm:my-5">
          <div className="flex-1 h-px bg-white/15" />
          <span className="text-xs font-semibold text-[#888888]">OR</span>
          <div className="flex-1 h-px bg-white/15" />
        </div>

        <form onSubmit={handleSubmit} className="space-y-3.5 sm:space-y-4">
          <div className="space-y-1.5">
            <label htmlFor="auth-email" className="text-xs font-medium text-[#b0b0b0]">
              Email
            </label>
            <input
              id="auth-email"
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              className="w-full rounded-xl bg-black/40 border border-white/10 px-3.5 py-2.5 text-sm text-white outline-none placeholder:text-[#666] focus:border-[#E50914]/60 transition-colors"
            />
          </div>

          <div className="space-y-1.5">
            <label htmlFor="auth-password" className="text-xs font-medium text-[#b0b0b0]">
              Password
            </label>
            <input
              id="auth-password"
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter password"
              className="w-full rounded-xl bg-black/40 border border-white/10 px-3.5 py-2.5 text-sm text-white outline-none placeholder:text-[#666] focus:border-[#E50914]/60 transition-colors"
            />

            <ul className="mt-2 space-y-1">
              <RequirementHint met={requirements.minLength} label="Min 8 characters" />
              <RequirementHint met={requirements.uppercase} label="1 Uppercase letter" />
              <RequirementHint met={requirements.lowercase} label="1 Lowercase letter" />
              <RequirementHint
                met={requirements.numberOrSpecial}
                label="1 Number or Special character"
              />
            </ul>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className={cn(
              'w-full py-2.5 sm:py-3 rounded-xl text-sm font-bold transition-all flex items-center justify-center gap-2 min-h-[44px]',
              isSuccess
                ? 'bg-emerald-600 text-white shadow-[0_0_20px_rgba(16,185,129,0.45)]'
                : 'bg-[#E50914] hover:bg-[#E50914]/90 text-white shadow-[0_0_20px_rgba(229,9,20,0.35)]',
              isLoading && 'opacity-90 cursor-wait',
            )}
          >
            {isLoading ? (
              <>
                <Loader2 size={18} className="animate-spin" />
                Signing in...
              </>
            ) : isSuccess ? (
              <>
                <Check size={18} />
                ✓ Successfully Logged In!
              </>
            ) : (
              'Sign In / Sign Up'
            )}
          </button>
        </form>
      </div>
    </div>
  )
}

function RequirementHint({ met, label }: { met: boolean; label: string }) {
  return (
    <li
      className={cn(
        'text-[11px] sm:text-xs flex items-center gap-1.5 transition-colors',
        met ? 'text-emerald-400' : 'text-[#666666]',
      )}
    >
      <span
        className={cn(
          'size-1.5 rounded-full shrink-0',
          met ? 'bg-emerald-400' : 'bg-[#444444]',
        )}
      />
      {label}
    </li>
  )
}
