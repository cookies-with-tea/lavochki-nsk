export const urlToObject = async(image: string)=> {

  const response = await fetch(image)
  const blob = await response.blob()

  return new File([blob], 'image.jpg', { type: blob.type })
}
