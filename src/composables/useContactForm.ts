import { onUnmounted, reactive, ref } from 'vue'

interface ContactForm {
  name: string
  email: string
  subject: string
  message: string
}

interface FormErrors {
  name?: string
  email?: string
  subject?: string
  message?: string
}

const FORMSPREE_URL = 'https://formspree.io/f/mzdyndkl'
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
const FIELD_LIMITS = {
  name: 80,
  email: 254,
  subject: 120,
  message: 2000,
}

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
  let successTimeout: ReturnType<typeof setTimeout> | null = null

  function clearErrors() {
    delete errors.name
    delete errors.email
    delete errors.subject
    delete errors.message
  }

  function validate(): boolean {
    clearErrors()

    const name = form.name.trim()
    const email = form.email.trim()
    const subject = form.subject.trim()
    const message = form.message.trim()
    let valid = true

    if (!name) {
      errors.name = 'Le nom est requis.'
      valid = false
    } else if (name.length > FIELD_LIMITS.name) {
      errors.name = `Le nom ne doit pas depasser ${FIELD_LIMITS.name} caracteres.`
      valid = false
    }

    if (!email) {
      errors.email = "L'email est requis."
      valid = false
    } else if (email.length > FIELD_LIMITS.email) {
      errors.email = `L'email ne doit pas depasser ${FIELD_LIMITS.email} caracteres.`
      valid = false
    } else if (!EMAIL_REGEX.test(email)) {
      errors.email = "L'adresse email n'est pas valide."
      valid = false
    }

    if (subject.length > FIELD_LIMITS.subject) {
      errors.subject = `Le sujet ne doit pas depasser ${FIELD_LIMITS.subject} caracteres.`
      valid = false
    }

    if (!message) {
      errors.message = 'Le message est requis.'
      valid = false
    } else if (message.length < 10) {
      errors.message = 'Le message doit contenir au moins 10 caracteres.'
      valid = false
    } else if (message.length > FIELD_LIMITS.message) {
      errors.message = `Le message ne doit pas depasser ${FIELD_LIMITS.message} caracteres.`
      valid = false
    }

    return valid
  }

  function resetForm() {
    form.name = ''
    form.email = ''
    form.subject = ''
    form.message = ''
    clearErrors()
  }

  async function submit() {
    if (!validate()) return

    const payload = {
      name: form.name.trim(),
      email: form.email.trim(),
      subject: form.subject.trim(),
      message: form.message.trim(),
      _gotcha: '',
    }

    isSubmitting.value = true
    isError.value = false

    try {
      const response = await fetch(FORMSPREE_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify(payload),
      })

      if (response.ok) {
        isSuccess.value = true
        resetForm()
        if (successTimeout !== null) clearTimeout(successTimeout)
        successTimeout = setTimeout(() => {
          isSuccess.value = false
          successTimeout = null
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

  onUnmounted(() => {
    if (successTimeout !== null) clearTimeout(successTimeout)
  })

  return { form, errors, isSubmitting, isSuccess, isError, validate, submit, resetForm }
}
