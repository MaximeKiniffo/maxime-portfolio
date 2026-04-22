<script setup lang="ts">
  import { ref } from 'vue'
  import { Code2, Lightbulb, Users } from 'lucide-vue-next'
  import SectionTitle from '@/components/ui/SectionTitle.vue'
  import { useSingleScrollAnimation } from '@/composables/useScrollAnimation'

  const sectionEl = ref<HTMLElement | null>(null)
  useSingleScrollAnimation(sectionEl)

  const highlights = [
    {
      icon: Code2,
      title: 'Code propre',
      description: 'Attaché à écrire du code lisible, maintenable et bien structuré.',
    },
    {
      icon: Lightbulb,
      title: 'Curiosité technique',
      description: 'Toujours en veille sur les nouvelles technologies et bonnes pratiques.',
    },
    {
      icon: Users,
      title: 'Esprit d\'équipe',
      description: 'À l\'aise en environnement Agile, communicatif et ouvert au feedback.',
    },
  ]
</script>

<template>
  <section id="about" class="section-padding bg-slate-50 dark:bg-slate-800/30">
    <div ref="sectionEl" class="container-max">
      <SectionTitle subtitle="Quelques mots sur mon parcours et ma vision du métier">
        À propos
      </SectionTitle>

      <div class="grid md:grid-cols-2 gap-12 items-center">
        <!-- Photo placeholder -->
        <div class="flex justify-center md:justify-start">
          <div class="relative">
            <div
              class="w-56 h-56 sm:w-64 sm:h-64 rounded-full border-4 border-primary-200 dark:border-primary-800 bg-gradient-to-br from-primary-100 to-primary-200 dark:from-primary-900 dark:to-primary-950 flex items-center justify-center overflow-hidden shadow-xl"
            >
              <span class="text-7xl select-none" aria-hidden="true">👨‍💻</span>
            </div>
            <!-- Decorative ring -->
            <div
              class="absolute -inset-3 rounded-full border-2 border-dashed border-primary-300/40 dark:border-primary-700/40"
              aria-hidden="true"
            />
          </div>
        </div>

        <!-- Text content -->
        <div class="space-y-5 text-slate-600 dark:text-slate-300 leading-relaxed">
          <p>
            Développeur web en alternance, je construis des applications web de bout en bout —
            de la conception de l'interface utilisateur jusqu'au déploiement en production.
            Mon quotidien tourne autour de <strong class="text-slate-800 dark:text-white">Vue.js</strong>,
            <strong class="text-slate-800 dark:text-white">Node.js</strong> et
            <strong class="text-slate-800 dark:text-white">TypeScript</strong>, avec une vraie attention
            portée à la qualité du code et à l'expérience utilisateur.
          </p>
          <p>
            Convaincu que les meilleures applications naissent d'une bonne communication entre
            les équipes techniques et métier, je m'attache à comprendre les besoins réels
            avant de proposer des solutions techniques. J'aime les projets qui challengent et qui
            permettent d'apprendre quelque chose de nouveau à chaque sprint.
          </p>
          <p>
            En dehors du code, je m'intéresse à l'architecture logicielle, aux design patterns
            et à la performance web. Je contribue à des projets open source quand l'occasion se présente,
            et j'assiste régulièrement à des meetups tech locaux.
          </p>
        </div>
      </div>

      <!-- Highlights -->
      <div class="grid sm:grid-cols-3 gap-6 mt-16">
        <div
          v-for="item in highlights"
          :key="item.title"
          class="flex flex-col items-center text-center gap-3 p-6 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 hover:border-primary-300 dark:hover:border-primary-700 hover:shadow-md transition-all duration-200"
        >
          <div class="flex items-center justify-center w-12 h-12 rounded-xl bg-primary-50 dark:bg-primary-950 text-primary-600 dark:text-primary-400">
            <component :is="item.icon" :size="22" />
          </div>
          <h3 class="font-semibold text-slate-800 dark:text-white">{{ item.title }}</h3>
          <p class="text-sm text-slate-500 dark:text-slate-400">{{ item.description }}</p>
        </div>
      </div>
    </div>
  </section>
</template>
