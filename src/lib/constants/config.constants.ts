export const SALT_ROUNDS = process.env.NEXT_SALT_ROUNDS
export const MONGO_DB_URI = process.env.NEXT_MONGO_DB_URI
export const JWT_SECRET = process.env.NEXT_JWT_SECRET
export const ENCODED_JWT_SECRET = new TextEncoder().encode(JWT_SECRET)
export const EXPIRATION_TIME = 60 * 60 * 24 // 1 day in seconds
export const NODE_ENV = process.env.NODE_ENV
