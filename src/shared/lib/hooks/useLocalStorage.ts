export const useLocalStorage = () => {
  const get = (title: string): string | null => {
    return localStorage.getItem(title)
  }

  const set = (title: string, value: string) => {
    localStorage.setItem(title, value)
  }

  const remove = (title: string) => {
    localStorage.removeItem(title)
  }

  return {
    get,
    set,
    remove,
  }
}
