import { JoseAuth } from '@lib/auth/jose.auth'
import { ENCODED_JWT_SECRET, EXPIRATION_TIME } from '@lib/constants/config.constants'
import { JWTPayload } from 'jose'

JoseAuth.init({ jwtSecret: ENCODED_JWT_SECRET, ttlSeconds: EXPIRATION_TIME })

const auth = JoseAuth.get()

export default auth
