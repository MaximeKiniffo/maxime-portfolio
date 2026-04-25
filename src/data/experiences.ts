export interface Experience {
  id: string
  company: string
  title: string
  type: 'alternance' | 'stage' | 'study'
  description: string
  stack: string[]
}

export const experiences: Experience[] = [
  {
    id: 'deemply',
    company: 'Deemply',
    title: 'Développeur web en alternance',
    type: 'alternance',
    description:
      "Plateforme SaaS dédiée au pilotage de la sécurité et de l'exploitation des bâtiments. La solution centralise des obligations réglementaires : registre de sécurité, DUERP, plan de prévention, permis de feu et gestion du bâtiment. J'ai participé au développement de fonctionnalités, à la correction de bugs et à l'évolution de l'application côté front-end et back-end.",
    stack: ['Vue.js', 'TypeScript', 'PHP', 'Symfony', 'API Platform', 'MariaDB', 'Docker', 'Git'],
  },
  {
    id: 'dockside',
    company: 'Dockside',
    title: 'Stagiaire développeur web',
    type: 'stage',
    description:
      "Site d'un lieu hybride mêlant restauration, événements et animations. Mon travail portait sur l'intégration, l'amélioration du responsive design et l'évolution du site dans un environnement CMS.",
    stack: ['Joomla', 'HTML', 'CSS', 'JavaScript'],
  },
  {
    id: 'c15-tour',
    company: 'C15 Tour',
    title: 'Application web & mobile full-stack',
    type: 'study',
    description:
      "Projet full-stack réalisé en équipe dans le cadre de la formation. L'application couvre une interface web, une application mobile et une API back-end. J'ai contribué à la conception des écrans, au développement des composants et à l'intégration de l'API.",
    stack: ['React.js', 'React Native', 'NestJS', 'TypeScript'],
  },
  {
    id: 'feelity',
    company: 'Feelity',
    title: 'Application mobile bien-être étudiant',
    type: 'study',
    description:
      "Application mobile orientée bien-être étudiant proposant des ressources comme des articles, vidéos et podcasts dans une interface claire et accessible. J'ai travaillé sur l'affichage du contenu, l'organisation des composants et l'intégration d'éléments multimédias.",
    stack: ['React Native', 'Expo', 'JavaScript', 'JSON'],
  },
]
