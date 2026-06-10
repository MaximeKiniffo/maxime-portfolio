export interface ProjectImage {
  src: string
  alt: string
  caption?: string
}

export interface Experience {
  id: string
  company: string
  title: string
  type: 'alternance' | 'stage' | 'study' | 'personal'
  description: string
  stack: string[]
  websiteUrl?: string
  projectPage?: boolean
  projectUrl?: string
  projectHighlights?: string[]
  projectImages?: ProjectImage[]
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
  {
    id: 'sudoku',
    company: 'Sudoku',
    title: 'Application mobile de Sudoku',
    type: 'study',
    description:
      "Projet réalisé dans le cadre d'un exercice de UI/UX design autour de la refonte d'une application existante. Plutôt que de simplement modifier l'interface de départ, nous avons choisi de créer une nouvelle application de Sudoku à partir de zéro, avec une vision produit centrée sur une expérience claire, lisible et agréable pour un public large.",
    stack: ['Expo', 'React Native', 'TypeScript', 'Expo Router'],
    projectPage: true,
    projectUrl:
      'https://expo.dev/accounts/maximekiniffo/projects/sudoku/builds/7802346c-36ec-49ec-ab8d-5e86b4fd2895',
    projectHighlights: [
      "Création d'une nouvelle expérience Sudoku à partir de zéro",
      'Travail UI/UX sur une interface épurée, lisible et accessible',
      "Construction d'une application mobile multiplateforme avec Expo, React Native, TypeScript et Expo Router",
    ],
  },
  {
    id: 'pokedex',
    company: 'Pokédex',
    title: 'Application web React',
    type: 'personal',
    description:
      "Pokédex web développé sous forme de SPA React. L'application affiche une liste de Pokémon, permet de chercher et filtrer par génération ou par type, puis ouvre une fiche détail avec les statistiques, attaques, évolutions, formes et sons. Les données sont récupérées côté client depuis la PokéAPI, sans backend propre au projet.",
    stack: ['React.js', 'TypeScript', 'Tailwind CSS'],
    projectPage: true,
    projectUrl: 'https://pokedex-react-maxime-kiniffo.netlify.app/',
    projectHighlights: [
      'Recherche et filtres par génération et par type',
      'Fiches détail avec statistiques, attaques, évolutions, formes et sons',
      'Récupération et cache des données PokéAPI côté client avec React Query',
    ],
  },
]
