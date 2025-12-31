export interface UserInfo {
  id: string
  memberId: number
  bonjourId: string | null
  bonjourIdUpdatedAt: Date | null
  bonjourIdUpdateCount: number
  name: string
  email: string
  image?: string | null
  createdAt: Date
  updatedAt: Date
}
