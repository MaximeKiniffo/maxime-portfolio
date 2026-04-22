const NAVBAR_HEIGHT = 80

export function useScrollTo() {
  function scrollTo(id: string) {
    const el = document.getElementById(id)
    if (!el) return
    const top = el.getBoundingClientRect().top + window.scrollY - NAVBAR_HEIGHT
    window.scrollTo({ top, behavior: 'smooth' })
  }

  function scrollToHref(href: string) {
    scrollTo(href.replace(/^#/, ''))
  }

  return { scrollTo, scrollToHref }
}
