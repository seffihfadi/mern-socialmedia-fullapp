export const tagName = (fullname) => {
  return '@' + fullname.replace(/\s/g, '').toLowerCase()
}

export function calculateBase64Size(base64String) {
  const dataPart = base64String.split(',')[1];
  return (dataPart?.length * 0.75); // Each character represents 6 bits or 0.75 bytes
}