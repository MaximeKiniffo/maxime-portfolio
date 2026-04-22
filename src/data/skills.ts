export type SkillCategory = 'Frontend' | 'Backend' | 'Outils' | 'Base de données'

export interface Skill {
  name: string
  category: SkillCategory
  level: 'débutant' | 'intermédiaire' | 'avancé'
}

export const skills: Skill[] = [
  // Frontend
  { name: 'Vue.js', category: 'Frontend', level: 'avancé' },
  { name: 'TypeScript', category: 'Frontend', level: 'avancé' },
  { name: 'HTML / CSS', category: 'Frontend', level: 'avancé' },
  { name: 'Tailwind CSS', category: 'Frontend', level: 'avancé' },
  { name: 'JavaScript', category: 'Frontend', level: 'avancé' },

  // Backend
  { name: 'Node.js', category: 'Backend', level: 'avancé' },
  { name: 'NestJS', category: 'Backend', level: 'intermédiaire' },
  { name: 'Symfony', category: 'Backend', level: 'intermédiaire' },
  { name: 'PHP', category: 'Backend', level: 'intermédiaire' },
  { name: 'API REST', category: 'Backend', level: 'avancé' },

  // Outils
  { name: 'Git', category: 'Outils', level: 'avancé' },
  { name: 'Docker', category: 'Outils', level: 'intermédiaire' },
  { name: 'VS Code', category: 'Outils', level: 'avancé' },
  { name: 'Prisma', category: 'Outils', level: 'intermédiaire' },

  // Base de données
  { name: 'PostgreSQL', category: 'Base de données', level: 'intermédiaire' },
  { name: 'MySQL', category: 'Base de données', level: 'intermédiaire' },
]

export const categories: SkillCategory[] = ['Frontend', 'Backend', 'Outils', 'Base de données']
