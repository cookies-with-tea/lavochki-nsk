const errorsDictionary: Record<string, string> = {
  'cannot be blank': 'не может быть пустым'
} as const

export const useDictionary = () => {
  return {
    errorsDictionary,
  }
}