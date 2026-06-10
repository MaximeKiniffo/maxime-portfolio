export interface Experience {
  id: string
  company: string
  title: string
  type: 'alternance' | 'stage' | 'study'
  description: string
  stack: string[]
  websiteUrl?: string
  projectPage?: boolean
  projectUrl?: string
  projectHighlights?: string[]
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
    websiteUrl: 'https://deemply.com',
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
      "C15 Tour est une application de gestion et de suivi GPS pour organiser des convois ou des balades en groupe autour de la Citroën C15. Elle permet à un organisateur de créer un événement, préparer un itinéraire sur carte, ajouter des points d’arrêt, puis partager un code d’accès aux participants. Ces derniers peuvent rejoindre le tour depuis l’application mobile et transmettre leur position en temps réel afin de faciliter le suivi du groupe pendant le trajet.",
    stack: ['React.js', 'React Native', 'NestJS', 'TypeScript'],
    projectPage: true,
    projectHighlights: [
      "Création d'événements avec itinéraire et points d'arrêt",
      "Partage d'un code d'accès pour rejoindre un tour",
      'Suivi GPS en temps réel depuis une application mobile',
    ],
  },
  {
    id: 'feelity',
    company: 'Feelity',
    title: 'Application mobile bien-être étudiant',
    type: 'study',
    description:
      "Application mobile orientée bien-être étudiant proposant des ressources comme des articles, vidéos et podcasts dans une interface claire et accessible. J'ai travaillé sur l'affichage du contenu, l'organisation des composants et l'intégration d'éléments multimédias.",
    stack: ['React Native', 'Expo', 'JavaScript', 'JSON'],
    projectPage: true,
    projectHighlights: [
      'Organisation de contenus bien-être par formats et thématiques',
      "Intégration d'articles, vidéos et podcasts dans une interface mobile",
      'Travail sur une expérience claire, accessible et adaptée aux étudiants',
    ],
  },
]
