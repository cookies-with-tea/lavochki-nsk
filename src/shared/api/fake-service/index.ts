export const fakeFetch = async <T = unknown>(data: T): Promise<T> => {
  return new Promise<T>((resolve) => {
    resolve(data)
  })
}
