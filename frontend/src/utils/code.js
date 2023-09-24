export const tagName = (fullname) => {
  return '@' + fullname.replace(/\s/g, '').toLowerCase()
}

export function calculateBase64Size(base64String) {
  const dataPart = base64String.split(',')[1];
  return (dataPart?.length * 0.75); // Each character represents 6 bits or 0.75 bytes
}

export const downloadIMG = (cloudinaryUrl) => {
  const parts = cloudinaryUrl.split('upload/')
  if (parts.length !== 2) {
    return cloudinaryUrl
  }
  const newUrl = `${parts[0]}upload/fl_attachment:zoquix-fadi-seffih-${Math.ceil(Math.random() * 100)}/${parts[1]}`
  return newUrl
}