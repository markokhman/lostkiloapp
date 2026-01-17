// import { getDayImageUrl, getRecipeImageUrl, getWorkoutImageUrl } from '../lib/supabase'

// Fallback Image URLs using Unsplash for high-quality photos
// These are used when AI-generated images are not available

export const foodImages = {
  // Breakfasts
  omelet: 'https://images.unsplash.com/photo-1525351484163-7529414344d8?w=400&h=300&fit=crop',
  bowl: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=400&h=300&fit=crop',
  porridge: 'https://images.unsplash.com/photo-1517673400267-0251440c45dc?w=400&h=300&fit=crop',
  cottage: 'https://images.unsplash.com/photo-1488477181946-6428a0291777?w=400&h=300&fit=crop',
  yogurt: 'https://images.unsplash.com/photo-1488477304112-4944851de03d?w=400&h=300&fit=crop',
  pancakes: 'https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?w=400&h=300&fit=crop',
  scramble: 'https://images.unsplash.com/photo-1482049016gy-67cde4e93618?w=400&h=300&fit=crop',
  
  // Dinners
  salmon: 'https://images.unsplash.com/photo-1467003909585-2f8a72700288?w=400&h=300&fit=crop',
  chicken: 'https://images.unsplash.com/photo-1532550907401-a500c9a57435?w=400&h=300&fit=crop',
  steak: 'https://images.unsplash.com/photo-1544025162-d76694265947?w=400&h=300&fit=crop',
  mussels: 'https://images.unsplash.com/photo-1565557623262-b51c2513a641?w=400&h=300&fit=crop',
  shrimp: 'https://images.unsplash.com/photo-1565680018434-b513d5e5fd47?w=400&h=300&fit=crop',
  salad: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=400&h=300&fit=crop',
  tartare: 'https://images.unsplash.com/photo-1534604973900-c43ab4c2e0ab?w=400&h=300&fit=crop',
  
  // General
  kefir: 'https://images.unsplash.com/photo-1550583724-b2692b85b150?w=400&h=300&fit=crop',
  vegetables: 'https://images.unsplash.com/photo-1540420773420-3366772f4999?w=400&h=300&fit=crop',
  water: 'https://images.unsplash.com/photo-1548839140-29a749e1cf4d?w=400&h=300&fit=crop',
  coffee: 'https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=400&h=300&fit=crop',
  supplements: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=400&h=300&fit=crop',
}

export const activityImages = {
  yoga: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=400&h=300&fit=crop',
  running: 'https://images.unsplash.com/photo-1476480862126-209bfaa8edc8?w=400&h=300&fit=crop',
  workout: 'https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?w=400&h=300&fit=crop',
  plank: 'https://images.unsplash.com/photo-1566241142559-40e1dab266c6?w=400&h=300&fit=crop',
  stretching: 'https://images.unsplash.com/photo-1518611012118-696072aa579a?w=400&h=300&fit=crop',
  meditation: 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=400&h=300&fit=crop',
  walking: 'https://images.unsplash.com/photo-1483721310020-03333e577078?w=400&h=300&fit=crop',
  dance: 'https://images.unsplash.com/photo-1547153760-18fc86324498?w=400&h=300&fit=crop',
  rope: 'https://images.unsplash.com/photo-1434596922112-19c563067271?w=400&h=300&fit=crop',
  morning: 'https://images.unsplash.com/photo-1470252649378-9c29740c9fa8?w=400&h=300&fit=crop',
}

export const lifestyleImages = {
  shower: 'https://images.unsplash.com/photo-1552519507-da3b142c6e3d?w=400&h=300&fit=crop',
  sleep: 'https://images.unsplash.com/photo-1531353826977-0941b4779a1c?w=400&h=300&fit=crop',
  morning: 'https://images.unsplash.com/photo-1470252649378-9c29740c9fa8?w=400&h=300&fit=crop',
  sunset: 'https://images.unsplash.com/photo-1495616811223-4d98c6e9c869?w=400&h=300&fit=crop',
  nature: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=400&h=300&fit=crop',
  success: 'https://images.unsplash.com/photo-1552674605-db6ffd4facb5?w=400&h=300&fit=crop',
}

export const heroImages = {
  course: 'https://images.unsplash.com/photo-1490645935967-10de6ba17061?w=800&h=400&fit=crop',
  transformation: 'https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=800&h=400&fit=crop',
  healthy: 'https://images.unsplash.com/photo-1498837167922-ddd27525d352?w=800&h=400&fit=crop',
}

// Avatar colors for leaderboard
export const avatarColors = [
  'from-pink-500 to-rose-500',
  'from-purple-500 to-violet-500',
  'from-blue-500 to-cyan-500',
  'from-emerald-500 to-teal-500',
  'from-amber-500 to-orange-500',
  'from-red-500 to-pink-500',
  'from-indigo-500 to-purple-500',
  'from-green-500 to-emerald-500',
]

// Fallback recipe images mapping (used when AI images not available)
const recipeFallbacks: Record<string, string> = {
  'bowl': foodImages.bowl,
  'omelet-caprese': foodImages.omelet,
  'coconut-porridge': foodImages.porridge,
  'cottage-cheese': foodImages.cottage,
  'yogurt': foodImages.yogurt,
  'syrniki': foodImages.pancakes,
  'french-pancakes': foodImages.pancakes,
  'scramble': foodImages.scramble,
  'flax-porridge': foodImages.porridge,
  'frittata': foodImages.omelet,
  'cauliflower-pie': foodImages.vegetables,
  'simple-cutlets': foodImages.chicken,
  'shawarma': foodImages.chicken,
  'shrimp-avocado-salad': foodImages.shrimp,
  'salmon-dor-blue': foodImages.salmon,
  'salmon-quinoa-cutlets': foodImages.salmon,
  'squid-egg-salad': foodImages.salad,
  'salmon-tartare': foodImages.tartare,
  'ceviche': foodImages.tartare,
  'mussels-cream': foodImages.mussels,
  'eggplant-burrata': foodImages.vegetables,
  'stuffed-chicken': foodImages.chicken,
  'duck-prunes': foodImages.steak,
  'cabbage-salad': foodImages.salad,
  'fermented-vegetables': foodImages.vegetables,
  'homemade-kefir': foodImages.kefir,
}

// Fallback workout images mapping
const workoutFallbacks: Record<string, string> = {
  'yoga': activityImages.yoga,
  'breathing': activityImages.meditation,
  'breathing-2': activityImages.meditation,
  'thai-practice-1': activityImages.stretching,
  'thai-practice-2': activityImages.stretching,
  'home-complex': activityImages.workout,
  'plank': activityImages.plank,
  'plank-advanced': activityImages.plank,
  'abs': activityImages.workout,
  'core': activityImages.workout,
  'tonus': activityImages.stretching,
  'squats': activityImages.workout,
  'jump-rope': activityImages.rope,
  'jump-rope-technique': activityImages.rope,
  'dance-warmup': activityImages.dance,
  'vacuum-massage': activityImages.stretching,
}

// Get recipe image - tries AI-generated first, falls back to Unsplash
export const getRecipeImage = (recipeId: string): string => {
  // AI images are not generated yet, using fallbacks
  // const aiImage = getRecipeImageUrl(recipeId)
  // if (aiImage) return aiImage
  return recipeFallbacks[recipeId] || foodImages.bowl
}

// Get workout image - tries AI-generated first, falls back to Unsplash
export const getWorkoutImage = (workoutId: string): string => {
  // const aiImage = getWorkoutImageUrl(workoutId)
  // if (aiImage) return aiImage
  return workoutFallbacks[workoutId] || activityImages.workout
}

// Get day image - tries AI-generated first, falls back to Unsplash
export const getDayImage = (dayNumber: number): string => {
  // const aiImage = getDayImageUrl(dayNumber)
  // if (aiImage) return aiImage
  // Fallback based on day theme
  if (dayNumber === 1) return lifestyleImages.morning
  if (dayNumber === 7 || dayNumber === 14 || dayNumber === 20) return lifestyleImages.success
  if (dayNumber % 7 === 0) return lifestyleImages.success
  return activityImages.morning
}

// Legacy exports for backward compatibility
export const recipeImages: Record<string, string> = new Proxy({} as Record<string, string>, {
  get: (_, prop: string) => getRecipeImage(prop)
})

export const workoutImages: Record<string, string> = new Proxy({} as Record<string, string>, {
  get: (_, prop: string) => getWorkoutImage(prop)
})
