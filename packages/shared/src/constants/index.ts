// Shared constants

export const APP_NAME = 'Recipe Roulette'
export const APP_DESCRIPTION = 'A gamified cooking application that helps users discover recipes based on available ingredients'

export const DIFFICULTY_RATINGS = {
  EASY: 'Easy',
  MEDIUM: 'Medium', 
  HARD: 'Hard',
} as const

export const USER_ROLES = {
  USER: 'user',
  ADMIN: 'admin',
} as const

export const CUISINE_TYPES = [
  'Italian',
  'Mexican',
  'Asian',
  'American',
  'French',
  'Mediterranean',
  'Indian',
  'Chinese',
  'Japanese',
  'Thai',
] as const