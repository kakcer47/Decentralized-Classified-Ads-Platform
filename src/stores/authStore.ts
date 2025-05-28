import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { immer } from 'zustand/middleware/immer'
import { generatePrivateKey, getPublicKey } from '@noble/ed25519'
import { v4 as uuidv4 } from 'uuid'
import type { User } from '../types'

interface AuthState {
  users: User[]
  currentUser: User | null
  isAuthenticated: boolean
  
  // Действия
  createUser: (name: string, emoji: string) => Promise<User>
  switchUser: (userId: string) => void
  deleteUser: (userId: string) => void
  logout: () => void
  updateUser: (userId: string, updates: Partial<User>) => void
}

// Список доступных эмодзи для аватаров
export const AVAILABLE_EMOJIS = [
  '😀', '😎', '🤖', '👾', '🦄', '🚀', '⭐', '🌟',
  '🔥', '💎', '🎨', '🎭', '🎪', '🎯', '🎲', '🎮',
  '🌈', '🌸', '🌺', '🍀', '🌙', '☀️', '⚡', '🔮',
  '🎸', '🎹', '🎤', '🎧', '📸', '🎬', '📚', '✨'
]

export const useAuthStore = create<AuthState>()(
  persist(
    immer((set, get) => ({
      users: [],
      currentUser: null,
      isAuthenticated: false,

      createUser: async (name: string, emoji: string) => {
        const privateKey = generatePrivateKey()
        const publicKey = await getPublicKey(privateKey)
        
        const newUser: User = {
          id: uuidv4(),
          name: name.trim(),
          emoji,
          publicKey: Buffer.from(publicKey).toString('hex'),
          privateKey: Buffer.from(privateKey).toString('hex'),
          createdAt: new Date(),
          reputation: 0,
          adsCount: 0
        }

        set(state => {
          state.users.push(newUser)
          state.currentUser = newUser
          state.isAuthenticated = true
        })

        return newUser
      },

      switchUser: (userId: string) => {
        const user = get().users.find(u => u.id === userId)
        if (user) {
          set(state => {
            state.currentUser = user
            state.isAuthenticated = true
          })
        }
      },

      deleteUser: (userId: string) => {
        set(state => {
          state.users = state.users.filter(u => u.id !== userId)
          if (state.currentUser?.id === userId) {
            state.currentUser = state.users[0] || null
            state.isAuthenticated = state.users.length > 0
          }
        })
      },

      logout: () => {
        set(state => {
          state.currentUser = null
          state.isAuthenticated = false
        })
      },

      updateUser: (userId: string, updates: Partial<User>) => {
        set(state => {
          const userIndex = state.users.findIndex(u => u.id === userId)
          if (userIndex >= 0) {
            state.users[userIndex] = { ...state.users[userIndex], ...updates }
            if (state.currentUser?.id === userId) {
              state.currentUser = state.users[userIndex]
            }
          }
        })
      }
    })),
    {
      name: 'fractal-auth-storage',
      version: 1
    }
  )
)