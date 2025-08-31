const truncateUrl = (url: string, maxLength = 50) => {
  if (url.length <= maxLength) return url
  const start = url.slice(0, 25)
  const end = url.slice(-40)
  return `${start}...${end}`
}

export default truncateUrl
