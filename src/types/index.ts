export type NavItem = {
  href: string
  label: string
  icon?: React.ComponentType<{ className?: string }> | string
}

export type NavEntry = {
  title: string
  items: NavItem[]
}

export type Thing = {
  id: string
  title: string
  image: string
  tags: string[]
  price: string
  originalPrice?: string
  href?: string
}

export type Book = {
  id: string
  title: string
  author: string
  image: string
  description?: string
  tags?: string[]
  rating?: number
  href?: string
}

export type Movie = {
  id: string
  title: string
  director: string
  image: string
  description?: string
  tags?: string[]
  rating?: number
  href?: string
  year?: number
}
