import 'server-only'

import { NODE_ENV } from '@lib/constants/config.constants'
import { type JWTPayload, jwtVerify, SignJWT } from 'jose'
import { cookies } from 'next/headers'

type AuthPayload = JWTPayload & {
  email: string
  isAdmin: boolean
  userId?: string
}

export class JoseAuth {
  private static instance: JoseAuth | null = null
  private constructor(
    private readonly jwtSecret: Uint8Array,
    private readonly ttlSeconds: number,
  ) {}

  static init(opts: { jwtSecret: Uint8Array; ttlSeconds: number }) {
    JoseAuth.instance = new JoseAuth(opts.jwtSecret, opts.ttlSeconds)
  }

  static get(): JoseAuth {
    if (!JoseAuth.instance)
      throw new Error('JoseAuth not initialized. Call JoseAuth.init(...) first.')
    return JoseAuth.instance
  }

  async createToken(payload: JWTPayload): Promise<string> {
    const now = Math.floor(Date.now() / 1000)
    return new SignJWT(payload)
      .setProtectedHeader({ alg: 'HS256', typ: 'JWT' })
      .setIssuedAt(now)
      .setExpirationTime(now + this.ttlSeconds)
      .sign(this.jwtSecret)
  }

  async verifyToken(token: string): Promise<JWTPayload | null> {
    try {
      const { payload } = await jwtVerify(token, this.jwtSecret, { algorithms: ['HS256'] })
      return payload
    } catch {
      return null
    }
  }

  async setSession(token: string): Promise<void> {
    const jar = await cookies()
    jar.set('session', token, {
      httpOnly: true,
      secure: NODE_ENV === 'production',
      sameSite: 'lax',
      path: '/',
      maxAge: this.ttlSeconds,
    })
  }

  async createSession(payload: JWTPayload): Promise<void> {
    const token = await this.createToken(payload)
    await this.setSession(token)
  }

  async readSession(): Promise<string | null> {
    const jar = await cookies()
    return jar.get('session')?.value ?? null
  }

  async getSessionPayload(): Promise<JWTPayload | null> {
    const token = await this.readSession()
    if (!token) return null
    return this.verifyToken(token)
  }

  isAuthPayload(p: JWTPayload | null): p is AuthPayload {
    return !!p && typeof (p as any).email === 'string'
  }

  async getAuthPayload(): Promise<AuthPayload | null> {
    const payload = await this.getSessionPayload()
    if (this.isAuthPayload(payload)) return payload
    return null
  }

  async deleteSession(): Promise<void> {
    const jar = await cookies()
    jar.delete('session')
  }
}
