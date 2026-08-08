import { supabase } from './supabase'

export async function createProfile(user: any) {
  const avatarUrl = user.email
    ? `https://api.dicebear.com/7.x/bottts/svg?seed=${encodeURIComponent(user.email)}`
    : null

  const { error } = await supabase
    .from('profiles')
    .upsert({
      id: user.id,
      email: user.email,
      avatar_url: avatarUrl,
      updated_at: new Date().toISOString(),
    })

  if (error) {
    console.error('Error creating profile:', error)
  }
}

export async function syncUserProfile(user: any) {
  try {
    // Check if profile exists
    const { data: existingProfile } = await supabase
      .from('profiles')
      .select('id')
      .eq('id', user.id)
      .single()

    if (!existingProfile) {
      // Create new profile
      await createProfile(user)
    }
  } catch (error) {
    console.error('Error syncing user profile:', error)
  }
}
