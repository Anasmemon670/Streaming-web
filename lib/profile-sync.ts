import { supabase } from './supabase'

export async function syncUserProfile(user: any) {
  try {
    const avatarUrl = user.email
      ? `https://api.dicebear.com/7.x/bottts/svg?seed=${encodeURIComponent(user.email)}`
      : null

    // Use upsert directly - one query instead of two
    await supabase
      .from('profiles')
      .upsert({
        id: user.id,
        email: user.email,
        avatar_url: avatarUrl,
        updated_at: new Date().toISOString(),
      })
  } catch (error) {
    console.error('Error syncing user profile:', error)
  }
}
