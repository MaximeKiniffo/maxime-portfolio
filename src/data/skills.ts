export interface Skill {
  id: string
  name: string
  category: 'frontend' | 'backend' | 'tools' | 'database'
  level: number // 0-100
  icon: string // iconify icon name, or 'custom' for Windsurf
  color: string // Tailwind bg class for progress bar
}

export const skills: Skill[] = [
  // Frontend
  { id: 'vue', name: 'Vue.js', category: 'frontend', level: 50, icon: 'logos:vue', color: 'bg-emerald-500' },
  { id: 'react', name: 'React', category: 'frontend', level: 40, icon: 'logos:react', color: 'bg-cyan-400' },
  { id: 'javascript', name: 'JavaScript', category: 'frontend', level: 65, icon: 'logos:javascript', color: 'bg-yellow-400' },
  { id: 'typescript', name: 'TypeScript', category: 'frontend', level: 50, icon: 'logos:typescript-icon', color: 'bg-blue-500' },
  { id: 'html-css', name: 'HTML / CSS', category: 'frontend', level: 65, icon: 'logos:html-5', color: 'bg-orange-500' },


  // Backend
  { id: 'nodejs', name: 'Node.js', category: 'backend', level: 50, icon: 'logos:nodejs-icon', color: 'bg-green-600' },
  { id: 'nestjs', name: 'NestJS', category: 'backend', level: 30, icon: 'logos:nestjs', color: 'bg-red-500' },
  { id: 'symfony', name: 'Symfony / PHP', category: 'backend', level: 30, icon: 'logos:symfony', color: 'bg-indigo-500' },
  { id: 'api-rest', name: 'API REST', category: 'backend', level: 60, icon: 'carbon:api', color: 'bg-teal-500' },

  // Outils
  { id: 'git', name: 'Git / GitHub', category: 'tools', level: 60, icon: 'logos:git-icon', color: 'bg-orange-600' },
  { id: 'docker', name: 'Docker', category: 'tools', level: 35, icon: 'logos:docker-icon', color: 'bg-blue-600' },
  { id: 'windsurf', name: 'Windsurf', category: 'tools', level: 60, icon: 'custom', color: 'bg-teal-600' },
  { id: 'ia', name: 'I.A', category: 'tools', level: 50, icon: 'mdi:brain', color: 'bg-purple-500' },


  // Base de données
  { id: 'postgresql', name: 'PostgreSQL', category: 'database', level: 50, icon: 'logos:postgresql', color: 'bg-blue-700' },
  { id: 'mysql', name: 'MySQL', category: 'database', level: 50, icon: 'logos:mysql', color: 'bg-amber-600' },
]
