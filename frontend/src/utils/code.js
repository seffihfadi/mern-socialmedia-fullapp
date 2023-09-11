// export const getBase64 = (file) => {
//   const reader = new FileReader()
//   reader.readAsDataURL(file)
//   reader.onloadend = () => {
//     return reader.result
//   }
//   return null
// }

// export function getTotalSizeOfBase64Images(base64Array) {
//   let totalSize = 0
//   base64Array.forEach(base64String => {
//     const dataPart = base64String.split(',')[1]
//     const dataSize = dataPart.length * 0.75
//     totalSize += dataSize
//   })
//   return totalSize
// }


export function calculateBase64Size(base64String) {
  const dataPart = base64String.split(',')[1];
  return (dataPart.length * 0.75); // Each character represents 6 bits or 0.75 bytes
}