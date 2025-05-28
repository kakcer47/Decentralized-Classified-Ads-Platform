// Типы для объявлений
export interface Ad {
  id: string
  title: string
  description: string
  price?: number
  currency: string
  category: string
  location: string
  authorId: string
  authorName: string
  createdAt: Date
  updatedAt: Date
  images?: string[]
  tags: string[]
  status: 'active' | 'paused' | 'sold' | 'expired'
  views: number
  favorites: number
}

// Типы для пользователя
export interface User {
  id: string
  name: string
  emoji: string
  publicKey: string
  privateKey: string
  createdAt: Date
  reputation: number
  adsCount: number
}

// Типы для P2P сети
export interface NetworkNode {
  id: string
  name: string
  isOnline: boolean
  lastSeen: Date
  location?: string
  connections: number
  trust: number
  capabilities: NodeCapabilities
}

export interface NodeCapabilities {
  canStore: boolean
  canRelay: boolean
  bandwidth: 'low' | 'medium' | 'high'
  storage: number // в MB
}

// Типы для сообщений в сети
export interface NetworkMessage {
  id: string
  type: 'ad' | 'user' | 'heartbeat' | 'request'
  payload: any
  authorId: string
  timestamp: Date
  signature: string
  hop: number
}

// Типы для фильтрации
export interface AdFilter {
  category?: string
  location?: string
  priceMin?: number
  priceMax?: number
  searchQuery?: string
  tags?: string[]
  sortBy: 'date' | 'price' | 'views' | 'relevance'
  sortOrder: 'asc' | 'desc'
}

// Типы для уведомлений
export interface Notification {
  id: string
  type: 'info' | 'success' | 'warning' | 'error'
  title: string
  message: string
  timestamp: Date
  read: boolean
  actionUrl?: string
}

// Типы для статистики
export interface NetworkStats {
  totalNodes: number
  onlineNodes: number
  totalAds: number
  activeAds: number
  messagesPerSecond: number
  networkHealth: number // 0-100%
}

// Константы
export const CATEGORIES = [
  'electronics',
  'vehicles', 
  'property',
  'jobs',
  'services',
  'fashion',
  'home',
  'sports',
  'books',
  'other'
] as const

export const CURRENCIES = [
  'RUB', 'USD', 'EUR', 'BTC', 'ETH'
] as const

export type Category = typeof CATEGORIES[number]
export type Currency = typeof CURRENCIES[number]