<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import { Github, Linkedin, Mail, Send, Download, Loader2 } from 'lucide-vue-next'
import SectionTitle from '@/components/ui/SectionTitle.vue'
import BaseButton from '@/components/ui/BaseButton.vue'
import { socialLinks } from '@/data/socialLinks'
import { useContactForm } from '@/composables/useContactForm'

const cvPath = import.meta.env.BASE_URL + 'cv.pdf'

const iconMap: Record<string, object> = { github: Github, linkedin: Linkedin, mail: Mail }

const { form, errors, isSubmitting, isSuccess, isError, submit } = useContactForm()

const containerEl = ref<HTMLElement | null>(null)
const leftEl = ref<HTMLElement | null>(null)
const rightEl = ref<HTMLElement | null>(null)
let observer: IntersectionObserver | null = null

onMounted(() => {
  const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  if (prefersReduced) return

  leftEl.value?.classList.add('opacity-0')
  rightEl.value?.classList.add('opacity-0')

  observer = new IntersectionObserver(
    ([entry]) => {
      if (entry.isIntersecting) {
        leftEl.value?.classList.add('animate-fade-in-up')
        leftEl.value?.classList.remove('opacity-0')
        setTimeout(() => {
          rightEl.value?.classList.add('animate-fade-in-up')
          rightEl.value?.classList.remove('opacity-0')
        }, 150)
        observer?.disconnect()
      }
    },
    { threshold: 0.1, rootMargin: '0px 0px -60px 0px' },
  )

  containerEl.value && observer.observe(containerEl.value)
})

onUnmounted(() => {
  observer?.disconnect()
})
</script>

<template>
  <section id="contact" class="section-padding bg-slate-50 dark:bg-slate-800/30">
    <div ref="containerEl" class="container-max">
      <div class="grid md:grid-cols-2 gap-8 lg:gap-16 items-start">
        <!-- ── Left column ── -->
        <div ref="leftEl">
          <SectionTitle align="left">Me contacter</SectionTitle>

          <p class="text-slate-600 dark:text-slate-300 leading-relaxed mb-8 -mt-6">
            Vous avez un projet, une opportunité ou simplement envie d'échanger ? N'hésitez pas à
            me contacter !
          </p>

          <!-- Contact cards avec border-left au hover -->
          <div class="space-y-3 mb-8">
            <a
              v-for="link in socialLinks"
              :key="link.id"
              :href="link.url"
              :target="link.url.startsWith('mailto:') ? undefined : '_blank'"
              :rel="link.url.startsWith('mailto:') ? undefined : 'noopener noreferrer'"
              class="contact-card flex items-center gap-4 p-4 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 hover:shadow-md hover:scale-[1.01] transition-all duration-200 group focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-500"
            >
              <span
                class="flex items-center justify-center w-10 h-10 rounded-lg bg-slate-100 dark:bg-slate-700 group-hover:bg-primary-50 dark:group-hover:bg-primary-950 transition-colors flex-shrink-0"
              >
                <component
                  :is="iconMap[link.icon]"
                  :size="18"
                  :class="['transition-colors text-slate-500 dark:text-slate-400', link.color]"
                />
              </span>
              <div>
                <p
                  class="text-xs font-medium text-slate-400 dark:text-slate-500 uppercase tracking-wide"
                >
                  {{ link.name }}
                </p>
                <p class="font-semibold text-sm text-slate-800 dark:text-slate-200 mt-0.5">
                  {{ link.displayText }}
                </p>
              </div>
            </a>
          </div>

          <!-- CV download -->
          <a
            :href="cvPath"
            download="CV-Maxime.pdf"
            class="inline-flex items-center gap-2 font-medium rounded-lg transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2 dark:focus-visible:ring-offset-slate-900 border-2 border-slate-300 dark:border-slate-600 text-slate-600 dark:text-slate-300 hover:border-primary-500 dark:hover:border-primary-400 hover:text-primary-600 dark:hover:text-primary-400 hover:bg-primary-50 dark:hover:bg-primary-950 px-5 py-2.5 text-sm"
          >
            <Download :size="16" />
            Télécharger mon CV
          </a>
        </div>

        <!-- ── Right column: form ── -->
        <div ref="rightEl">
          <!-- Success state -->
          <div
            v-if="isSuccess"
            role="status"
            aria-live="polite"
            class="flex flex-col items-center justify-center gap-4 text-center p-10 rounded-2xl border border-emerald-200 dark:border-emerald-800 bg-emerald-50 dark:bg-emerald-950/30"
          >
            <span class="text-5xl" aria-hidden="true">🎉</span>
            <p class="font-semibold text-emerald-700 dark:text-emerald-300 text-lg">
              Message envoyé !
            </p>
            <p class="text-sm text-emerald-600 dark:text-emerald-400">
              Merci pour votre message. Je vous répondrai dans les plus brefs délais.
            </p>
          </div>

          <!-- Form -->
          <form
            v-else
            novalidate
            class="space-y-5 bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 p-6 sm:p-8 shadow-sm"
            @submit.prevent="submit"
          >
            <!-- Error banner -->
            <div
              v-if="isError"
              role="alert"
              aria-live="assertive"
              class="flex items-start gap-2 p-3 rounded-lg bg-red-50 dark:bg-red-950/30 border border-red-200 dark:border-red-800 text-red-700 dark:text-red-300 text-sm"
            >
              Une erreur est survenue. Veuillez réessayer ou me contacter directement par email.
            </div>

            <!-- Nom -->
            <div>
              <label
                for="contact-name"
                class="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5"
              >
                Nom <span class="text-red-500" aria-hidden="true">*</span>
              </label>
              <input
                id="contact-name"
                v-model="form.name"
                type="text"
                autocomplete="name"
                placeholder="Jean Dupont"
                :aria-describedby="errors.name ? 'error-name' : undefined"
                :aria-invalid="!!errors.name || undefined"
                class="w-full px-4 py-2.5 rounded-lg border text-sm text-slate-900 dark:text-gray-100 bg-white dark:bg-slate-800 placeholder-slate-400 dark:placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-colors"
                :class="errors.name ? 'border-red-400 dark:border-red-600' : 'border-slate-200 dark:border-slate-600'"
              />
              <p
                v-if="errors.name"
                id="error-name"
                role="alert"
                class="mt-1.5 text-xs text-red-600 dark:text-red-400"
              >
                {{ errors.name }}
              </p>
            </div>

            <!-- Email -->
            <div>
              <label
                for="contact-email"
                class="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5"
              >
                Email <span class="text-red-500" aria-hidden="true">*</span>
              </label>
              <input
                id="contact-email"
                v-model="form.email"
                type="email"
                autocomplete="email"
                placeholder="jean@exemple.fr"
                :aria-describedby="errors.email ? 'error-email' : undefined"
                :aria-invalid="!!errors.email || undefined"
                class="w-full px-4 py-2.5 rounded-lg border text-sm text-slate-900 dark:text-gray-100 bg-white dark:bg-slate-800 placeholder-slate-400 dark:placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-colors"
                :class="errors.email ? 'border-red-400 dark:border-red-600' : 'border-slate-200 dark:border-slate-600'"
              />
              <p
                v-if="errors.email"
                id="error-email"
                role="alert"
                class="mt-1.5 text-xs text-red-600 dark:text-red-400"
              >
                {{ errors.email }}
              </p>
            </div>

            <!-- Sujet -->
            <div>
              <label
                for="contact-subject"
                class="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5"
              >
                Sujet
                <span class="text-slate-400 dark:text-slate-500 font-normal">(optionnel)</span>
              </label>
              <input
                id="contact-subject"
                v-model="form.subject"
                type="text"
                placeholder="Proposition de mission, question..."
                class="w-full px-4 py-2.5 rounded-lg border border-slate-200 dark:border-slate-600 text-sm text-slate-900 dark:text-gray-100 bg-white dark:bg-slate-800 placeholder-slate-400 dark:placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-colors"
              />
            </div>

            <!-- Message -->
            <div>
              <label
                for="contact-message"
                class="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5"
              >
                Message <span class="text-red-500" aria-hidden="true">*</span>
              </label>
              <textarea
                id="contact-message"
                v-model="form.message"
                rows="5"
                placeholder="Bonjour Maxime, j'aimerais vous proposer..."
                :aria-describedby="errors.message ? 'error-message' : undefined"
                :aria-invalid="!!errors.message || undefined"
                class="w-full px-4 py-2.5 rounded-lg border text-sm text-slate-900 dark:text-gray-100 bg-white dark:bg-slate-800 placeholder-slate-400 dark:placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-colors resize-none"
                :class="errors.message ? 'border-red-400 dark:border-red-600' : 'border-slate-200 dark:border-slate-600'"
              />
              <p
                v-if="errors.message"
                id="error-message"
                role="alert"
                class="mt-1.5 text-xs text-red-600 dark:text-red-400"
              >
                {{ errors.message }}
              </p>
            </div>

            <!-- Submit -->
            <BaseButton
              type="submit"
              size="lg"
              :disabled="isSubmitting"
              class="w-full justify-center"
            >
              <Loader2 v-if="isSubmitting" :size="16" class="animate-spin" />
              <Send v-else :size="16" />
              {{ isSubmitting ? 'Envoi en cours…' : 'Envoyer le message' }}
            </BaseButton>
          </form>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
/* Border-left accent apparaît en couleur primaire au hover */
.contact-card {
  border-left-width: 3px;
  border-left-color: transparent;
}

.contact-card:hover {
  border-left-color: #6366f1;
}

:global(html.dark) .contact-card:hover {
  border-left-color: #818cf8;
}
</style>
