export interface User {
  id: string
  memberId: number
  name: string
  email: string
  image?: string | null
  createdAt: Date
  updatedAt: Date
}

export interface BonjourInfo {
  bonjourId: string | null
  bonjourIdUpdatedAt: Date | null
  bonjourIdUpdateCount: number
  avatar: string
  displayName: string
  bio: string
}
