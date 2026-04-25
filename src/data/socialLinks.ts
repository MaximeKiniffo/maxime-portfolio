export interface SocialLink {
  id: string
  name: string
  url: string
  icon: string
  color: string
  displayText: string
}

export const socialLinks: SocialLink[] = [
  {
    id: 'github',
    name: 'GitHub',
    url: 'https://github.com/MaximeKiniffo',
    icon: 'github',
    color: 'hover:text-gray-900 dark:hover:text-white',
    displayText: 'Mon GitHub',
  },
  {
    id: 'linkedin',
    name: 'LinkedIn',
    url: 'https://www.linkedin.com/in/maxime-kiniffo',
    icon: 'linkedin',
    color: 'hover:text-blue-600',
    displayText: 'Mon profil LinkedIn',
  },
  {
    id: 'email',
    name: 'Email',
    url: 'mailto:maxime.kiniffo44@gmail.com',
    icon: 'mail',
    color: 'hover:text-red-500',
    displayText: 'maxime.kiniffo44@gmail.com',
  },
]
