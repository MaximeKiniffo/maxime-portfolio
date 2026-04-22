export interface NavItem {
  label: string
  href: string
}

export const navItems: NavItem[] = [
  { label: 'Accueil', href: '#hero' },
  { label: 'À propos', href: '#about' },
  { label: 'Compétences', href: '#skills' },
  { label: 'Contact', href: '#contact' },
]
