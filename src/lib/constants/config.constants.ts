export const SALT_ROUNDS = process.env.NEXT_SALT_ROUNDS
export const MONGO_DB_URI = process.env.NEXT_MONGO_DB_URI
export const JWT_SECRET = process.env.NEXT_JWT_SECRET

if (!JWT_SECRET) {
  throw new Error(
    'JWT secret is not defined. Please set NEXT_JWT_SECRET in your environment/config.',
  )
}
export const ENCODED_JWT_SECRET = new TextEncoder().encode(JWT_SECRET)

export const EXPIRATION_TIME = 60 * 60 * 24 // 1 day in seconds
export const NODE_ENV = process.env.NODE_ENV
export const HOSTNAME = process.env.NEXT_HOSTNAME
export const URL_LENGTH = process.env.NEXT_URL_LENGTH ?? '6'
export const URL_PREFIX = process.env.NEXT_URL_PREFIX
export const LINK_PREVIEW_API_KEY = process.env.NEXT_LINK_PREVIEW_API_KEY
export const ADMIN_EMAIL = process.env.NEXT_ADMIN_EMAIL
export const ADMIN_PASSWORD = process.env.NEXT_ADMIN_PASSWORD
export const PINO_HOST = process.env.NEXT_PINO_HOST
export const PINO_BATCHING = process.env.NEXT_PINO_BATCHING === 'true'
export const PINO_INTERVAL = process.env.NEXT_PINO_INTERVAL
  ? parseInt(process.env.NEXT_PINO_INTERVAL, 10)
  : 5
export const PINO_LABEL = process.env.NEXT_PINO_LABEL || 'linkloom'
