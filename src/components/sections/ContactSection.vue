<script setup lang="ts">
  import { ref } from 'vue'
  import { Github, Linkedin, Mail, Send } from 'lucide-vue-next'
  import SectionTitle from '@/components/ui/SectionTitle.vue'
  import BaseButton from '@/components/ui/BaseButton.vue'
  import { useSingleScrollAnimation } from '@/composables/useScrollAnimation'
  import { socialLinks } from '@/data/socialLinks'

  const sectionEl = ref<HTMLElement | null>(null)
  useSingleScrollAnimation(sectionEl)

  const iconMap = { github: Github, linkedin: Linkedin, mail: Mail }

  const form = ref({
    name: '',
    email: '',
    message: '',
  })

  const isSubmitting = ref(false)
  const isSubmitted = ref(false)

  async function handleSubmit() {
    isSubmitting.value = true
    // Formspree endpoint à remplacer par le vrai URL une fois le formulaire créé
    const response = await fetch('https://formspree.io/f/VOTRE_ID', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
      body: JSON.stringify(form.value),
    })
    isSubmitting.value = false
    if (response.ok) {
      isSubmitted.value = true
      form.value = { name: '', email: '', message: '' }
    }
  }
</script>

<template>
  <section id="contact" class="section-padding bg-slate-50 dark:bg-slate-800/30">
    <div ref="sectionEl" class="container-max">
      <SectionTitle subtitle="Une opportunité à me proposer, un projet à discuter ? Je suis disponible.">
        Contactez-moi
      </SectionTitle>

      <div class="grid md:grid-cols-2 gap-12 max-w-4xl mx-auto">
        <!-- Left: text + links -->
        <div class="space-y-6">
          <p class="text-slate-600 dark:text-slate-300 leading-relaxed">
            Je suis actuellement à la recherche d'une alternance ou d'opportunités en développement web.
            N'hésitez pas à me contacter pour toute question, proposition ou simplement pour échanger
            sur un projet qui vous tient à cœur.
          </p>

          <div class="space-y-3">
            <a
              v-for="link in socialLinks"
              :key="link.label"
              :href="link.href"
              :target="link.icon !== 'mail' ? '_blank' : undefined"
              :rel="link.icon !== 'mail' ? 'noopener noreferrer' : undefined"
              class="flex items-center gap-3 p-3 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:text-primary-600 dark:hover:text-primary-400 hover:border-primary-300 dark:hover:border-primary-700 hover:shadow-sm transition-all duration-200 group"
            >
              <span class="flex items-center justify-center w-9 h-9 rounded-lg bg-slate-100 dark:bg-slate-700 group-hover:bg-primary-50 dark:group-hover:bg-primary-950 transition-colors">
                <component :is="iconMap[link.icon]" :size="18" />
              </span>
              <span class="font-medium text-sm">{{ link.label }}</span>
            </a>
          </div>
        </div>

        <!-- Right: form -->
        <div>
          <div
            v-if="isSubmitted"
            class="flex flex-col items-center justify-center h-full gap-4 text-center p-8 rounded-xl border border-emerald-200 dark:border-emerald-800 bg-emerald-50 dark:bg-emerald-950/30"
          >
            <span class="text-5xl" aria-hidden="true">🎉</span>
            <p class="font-semibold text-emerald-700 dark:text-emerald-300">Message envoyé !</p>
            <p class="text-sm text-emerald-600 dark:text-emerald-400">
              Merci pour votre message. Je vous répondrai dans les plus brefs délais.
            </p>
          </div>

          <form
            v-else
            @submit.prevent="handleSubmit"
            class="space-y-4"
          >
            <div>
              <label
                for="name"
                class="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5"
              >
                Nom
              </label>
              <input
                id="name"
                v-model="form.name"
                type="text"
                required
                placeholder="Jean Dupont"
                class="w-full px-4 py-2.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-colors"
              />
            </div>

            <div>
              <label
                for="email"
                class="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5"
              >
                Email
              </label>
              <input
                id="email"
                v-model="form.email"
                type="email"
                required
                placeholder="jean@exemple.fr"
                class="w-full px-4 py-2.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-colors"
              />
            </div>

            <div>
              <label
                for="message"
                class="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5"
              >
                Message
              </label>
              <textarea
                id="message"
                v-model="form.message"
                required
                rows="5"
                placeholder="Bonjour Maxime, j'aimerais vous proposer..."
                class="w-full px-4 py-2.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-colors resize-none"
              />
            </div>

            <BaseButton
              type="submit"
              size="lg"
              :disabled="isSubmitting"
              class="w-full justify-center"
            >
              <Send v-if="!isSubmitting" :size="16" />
              <span>{{ isSubmitting ? 'Envoi en cours…' : 'Envoyer le message' }}</span>
            </BaseButton>
          </form>
        </div>
      </div>
    </div>
  </section>
</template>
