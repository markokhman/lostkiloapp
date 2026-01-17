import { createClient } from '@supabase/supabase-js'
import { getStorageFilename, getThumbnailFilename } from '../data/mediaMapping'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

if (!supabaseUrl || !supabaseAnonKey) {
  console.warn('Supabase credentials not found. Media features will be disabled.')
}

export const supabase = supabaseUrl && supabaseAnonKey 
  ? createClient(supabaseUrl, supabaseAnonKey)
  : null

// Storage bucket names
export const BUCKETS = {
  VIDEOS: 'videos',
  THUMBNAILS: 'thumbnails',
  IMAGES: 'images'
}

// Get public URL for a file in storage
export const getPublicUrl = (bucket: string, path: string): string | null => {
  if (!supabase) return null
  const { data } = supabase.storage.from(bucket).getPublicUrl(path)
  return data.publicUrl
}

// Get video URL by original filename (handles transliteration)
export const getVideoUrl = (originalFilename: string): string | null => {
  const storageFilename = getStorageFilename(originalFilename)
  return getPublicUrl(BUCKETS.VIDEOS, storageFilename)
}

// Get thumbnail URL by original video filename
export const getThumbnailUrl = (originalVideoFilename: string): string | null => {
  const storageThumbName = getThumbnailFilename(originalVideoFilename)
  return getPublicUrl(BUCKETS.THUMBNAILS, storageThumbName)
}

// Get image URL by original filename
export const getImageUrl = (originalFilename: string): string | null => {
  const storageFilename = getStorageFilename(originalFilename)
  return getPublicUrl(BUCKETS.IMAGES, storageFilename)
}

// Get AI-generated day image URL
export const getDayImageUrl = (dayNumber: number): string | null => {
  return getPublicUrl(BUCKETS.IMAGES, `day_${dayNumber}.png`)
}

// Get AI-generated recipe image URL
export const getRecipeImageUrl = (recipeId: string): string | null => {
  // Convert recipe ID to filename format (already in lowercase with hyphens)
  const filename = `recipe_${recipeId.replace(/-/g, '_')}.png`
  return getPublicUrl(BUCKETS.IMAGES, filename)
}

// Get AI-generated workout image URL
export const getWorkoutImageUrl = (workoutId: string): string | null => {
  const filename = `workout_${workoutId.replace(/-/g, '_')}.png`
  return getPublicUrl(BUCKETS.IMAGES, filename)
}
