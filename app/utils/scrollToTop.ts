export const scrollToTop = (): void => {
  window.scrollTo({ top: 0, behavior: 'smooth' })
}

export const scrollToAnchor = (id: string): void => {
  const destination = document.getElementById(id)

  if (destination) {
    window.scrollTo({
      top: destination.offsetTop - 60,
      behavior: 'smooth'
    })
  }
}
