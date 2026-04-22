export interface Skill {
  id: string
  name: string
  category: 'frontend' | 'backend' | 'tools' | 'database'
  level: number // 0-100
  icon: string // lucide icon name or 'custom'
  color: string // Tailwind bg class
}

export const skills: Skill[] = [
  // Frontend
  { id: 'vue', name: 'Vue.js', category: 'frontend', level: 85, icon: 'custom', color: 'bg-emerald-500' },
  { id: 'typescript', name: 'TypeScript', category: 'frontend', level: 75, icon: 'custom', color: 'bg-blue-500' },
  { id: 'html-css', name: 'HTML / CSS', category: 'frontend', level: 90, icon: 'code', color: 'bg-orange-500' },
  { id: 'tailwind', name: 'Tailwind CSS', category: 'frontend', level: 80, icon: 'palette', color: 'bg-cyan-500' },
  { id: 'javascript', name: 'JavaScript', category: 'frontend', level: 85, icon: 'custom', color: 'bg-yellow-500' },

  // Backend
  { id: 'nodejs', name: 'Node.js', category: 'backend', level: 80, icon: 'custom', color: 'bg-green-600' },
  { id: 'nestjs', name: 'NestJS', category: 'backend', level: 60, icon: 'custom', color: 'bg-red-500' },
  { id: 'symfony', name: 'Symfony / PHP', category: 'backend', level: 70, icon: 'custom', color: 'bg-indigo-500' },
  { id: 'api-rest', name: 'API REST', category: 'backend', level: 80, icon: 'globe', color: 'bg-teal-500' },

  // Outils
  { id: 'git', name: 'Git / GitHub', category: 'tools', level: 85, icon: 'git-branch', color: 'bg-orange-600' },
  { id: 'docker', name: 'Docker', category: 'tools', level: 50, icon: 'container', color: 'bg-blue-600' },
  { id: 'vscode', name: 'VS Code', category: 'tools', level: 90, icon: 'code-2', color: 'bg-blue-400' },
  { id: 'prisma', name: 'Prisma', category: 'tools', level: 55, icon: 'database', color: 'bg-slate-600' },

  // Base de données
  { id: 'postgresql', name: 'PostgreSQL', category: 'database', level: 65, icon: 'database', color: 'bg-blue-700' },
  { id: 'mysql', name: 'MySQL', category: 'database', level: 70, icon: 'database', color: 'bg-amber-600' },
]
