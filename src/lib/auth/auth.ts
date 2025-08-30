import { JoseAuth } from '@lib/auth/jose.auth'
import { ENCODED_JWT_SECRET, EXPIRATION_TIME } from '@lib/constants/config.constants'

if (!ENCODED_JWT_SECRET) {
  throw new Error(
    'JWT secret is not defined. Please set ENCODED_JWT_SECRET in your environment/config.',
  )
}

JoseAuth.init({ jwtSecret: ENCODED_JWT_SECRET, ttlSeconds: EXPIRATION_TIME })

const auth = JoseAuth.get()

export default auth
