export const ensureBase64DataUrlPrefix = (imageUrl: string): string => {
  const prefix = 'data:image/png;base64,'
  if (!imageUrl.includes('data')) {
    return prefix + imageUrl
  }
  return imageUrl
}
