export const searchParams = () => {
  const set = (key: string, value: string) => {
    const url = new URL(window.location.href)

    url.searchParams.set(key, value)

    window.history.pushState({}, '', url.toString())
  }

  const get = (key: string) => {
    const url = new URL(window.location.href)

    return url.searchParams.get(key) || ''
  }

  return {
    set,
    get,
  }
}
