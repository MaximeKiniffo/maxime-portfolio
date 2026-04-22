export interface SocialLink {
  label: string
  href: string
  icon: 'github' | 'linkedin' | 'mail'
}

export const socialLinks: SocialLink[] = [
  {
    label: 'GitHub',
    href: 'https://github.com/votre-username',
    icon: 'github',
  },
  {
    label: 'LinkedIn',
    href: 'https://linkedin.com/in/votre-profil',
    icon: 'linkedin',
  },
  {
    label: 'Email',
    href: 'mailto:votre@email.fr',
    icon: 'mail',
  },
]
