export type NavItem = {
  href: string
  label: string
  icon?: React.ComponentType<{ className?: string }> | string
}

export type NavEntry = {
  title: string
  items: NavItem[]
}
