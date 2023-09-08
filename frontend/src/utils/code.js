export const getBase64 = (file) => {
  const reader = new FileReader()
  reader.readAsDataURL(file)
  reader.onloadend = () => {
    return reader.result
  }
  return null
}