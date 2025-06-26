// Shared TypeScript types and interfaces
// This will be populated with data models from the Technical Architecture

export type DifficultyRating = 'EASY' | 'MEDIUM' | 'HARD'
export type UserRole = 'USER' | 'ADMIN'

// Placeholder interfaces - will be fully implemented in database setup
export interface User {
  id: string
  email: string
  name: string | null
  role: UserRole
  createdAt: Date
  updatedAt: Date
}

export interface Ingredient {
  id: string
  name: string
  category?: string
  unit?: string
}