const techColor: Record<string, string> = {
  'Vue.js': 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400',
  TypeScript: 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400',
  PHP: 'bg-violet-100 text-violet-700 dark:bg-violet-900/30 dark:text-violet-400',
  Symfony: 'bg-slate-200 text-slate-700 dark:bg-slate-700 dark:text-slate-300',
  'API Platform': 'bg-teal-100 text-teal-700 dark:bg-teal-900/30 dark:text-teal-400',
  MariaDB: 'bg-cyan-100 text-cyan-700 dark:bg-cyan-900/30 dark:text-cyan-400',
  Docker: 'bg-sky-100 text-sky-700 dark:bg-sky-900/30 dark:text-sky-400',
  Git: 'bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-400',
  Joomla: 'bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400',
  HTML: 'bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-400',
  CSS: 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400',
  JavaScript: 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-500',
  'React Native': 'bg-cyan-100 text-cyan-700 dark:bg-cyan-900/30 dark:text-cyan-400',
  'React.js': 'bg-cyan-100 text-cyan-700 dark:bg-cyan-900/30 dark:text-cyan-400',
  NestJS: 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400',
  Expo: 'bg-slate-200 text-slate-700 dark:bg-slate-700 dark:text-slate-300',
  JSON: 'bg-slate-200 text-slate-700 dark:bg-slate-700 dark:text-slate-300',
}

export function techClass(tech: string): string {
  return techColor[tech] ?? 'bg-slate-100 text-slate-600 dark:bg-slate-700 dark:text-slate-300'
}
