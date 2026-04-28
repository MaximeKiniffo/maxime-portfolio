import { reactive, ref } from 'vue'

interface ContactForm {
  name: string
  email: string
  subject: string
  message: string
}

interface FormErrors {
  name?: string
  email?: string
  message?: string
}

const FORMSPREE_URL = 'https://formspree.io/f/mzdyndkl'
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

export function useContactForm() {
  const form = reactive<ContactForm>({
    name: '',
    email: '',
    subject: '',
    message: '',
  })

  const errors = reactive<FormErrors>({})
  const isSubmitting = ref(false)
  const isSuccess = ref(false)
  const isError = ref(false)

  function validate(): boolean {
    delete errors.name
    delete errors.email
    delete errors.message

    let valid = true

    if (!form.name.trim()) {
      errors.name = 'Le nom est requis.'
      valid = false
    }

    if (!form.email.trim()) {
      errors.email = "L'email est requis."
      valid = false
    } else if (!EMAIL_REGEX.test(form.email)) {
      errors.email = "L'adresse email n'est pas valide."
      valid = false
    }

    if (!form.message.trim()) {
      errors.message = 'Le message est requis.'
      valid = false
    } else if (form.message.trim().length < 10) {
      errors.message = 'Le message doit contenir au moins 10 caractères.'
      valid = false
    }

    return valid
  }

  function resetForm() {
    form.name = ''
    form.email = ''
    form.subject = ''
    form.message = ''
    delete errors.name
    delete errors.email
    delete errors.message
  }

  async function submit() {
    if (!validate()) return

    isSubmitting.value = true
    isError.value = false

    try {
      const response = await fetch(FORMSPREE_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({
          name: form.name,
          email: form.email,
          subject: form.subject,
          message: form.message,
        }),
      })

      if (response.ok) {
        isSuccess.value = true
        resetForm()
        setTimeout(() => {
          isSuccess.value = false
        }, 3000)
      } else {
        isError.value = true
      }
    } catch {
      isError.value = true
    } finally {
      isSubmitting.value = false
    }
  }

  return { form, errors, isSubmitting, isSuccess, isError, validate, submit, resetForm }
}
