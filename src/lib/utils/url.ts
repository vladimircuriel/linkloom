import { URL_LENGTH, URL_PREFIX } from '@lib/constants/config.constants'

const alphabet = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'

const makeShortUrl = (): string => {
  if (!URL_LENGTH || Number.isNaN(+URL_LENGTH) || +URL_LENGTH <= 0) {
    throw new Error(
      'URL_LENGTH is not defined or invalid. Please set NEXT_URL_LENGTH in your environment/config.',
    )
  }

  let slug = ''
  for (let i = 0; i < +URL_LENGTH; i++) {
    slug += alphabet.charAt(Math.floor(Math.random() * alphabet.length))
  }

  if (URL_PREFIX && URL_PREFIX.trim() !== '') {
    slug = `${URL_PREFIX}-${slug}`
  }

  return slug
}

export default makeShortUrl
