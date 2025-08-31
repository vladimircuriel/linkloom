// middleware.ts

import auth from '@lib/auth/auth'
import Routes from '@lib/constants/routes.constants'
import { type NextRequest, NextResponse } from 'next/server'

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|.*\\.png$).*)'],
  runtime: 'nodejs',
}

export default async function middleware(request: NextRequest) {
  const start = Date.now()
  const requestId = crypto.randomUUID()
  const url = request.nextUrl
  const path = url.pathname

  const token = request.cookies.get('session')?.value
  const payload = token ? await auth.verifyToken(token) : null

  const user = payload
    ? {
        id: String(payload.sub ?? ''),
        email: String((payload as any).email ?? ''),
        isAdmin: Boolean((payload as any).isAdmin ?? false),
      }
    : null

  const isOnDashboard = path.startsWith(Routes.DASHBOARD)
  const isOnLogin = path.startsWith(Routes.LOGIN)
  const isOnRegister = path.startsWith(Routes.REGISTER)
  const isOnShortener = path.startsWith(Routes.SHORTENER)

  if (isOnDashboard && !user?.isAdmin) {
    globalThis.logger?.warn({
      meta: {
        requestId,
        duration: `${Date.now() - start}ms`,
        path,
        user: user?.id ?? 'anon',
      },
      message: 'Access denied to Dashboard',
    })
    return NextResponse.redirect(new URL(Routes.LOGIN, url))
  }

  if ((isOnLogin || isOnRegister) && user) {
    globalThis.logger?.info({
      meta: {
        requestId,
        duration: `${Date.now() - start}ms`,
        path,
        user: user.id,
      },
      message: 'Authenticated user trying to access auth pages',
    })
    return NextResponse.redirect(new URL(Routes.HOME, url))
  }

  if (isOnShortener && !user) {
    globalThis.logger?.warn({
      meta: {
        requestId,
        duration: `${Date.now() - start}ms`,
        path,
      },
      message: 'Unauthenticated user trying to access shortener',
    })
    return NextResponse.redirect(new URL(Routes.LOGIN, url))
  }

  const requestHeaders = new Headers(request.headers)
  requestHeaders.set('x-pathname', path)

  const response = NextResponse.next({
    request: { headers: requestHeaders },
  })

  globalThis.logger?.info({
    meta: {
      requestId,
      duration: `${Date.now() - start}ms`,
      method: request.method,
      path,
      user: user?.id ?? 'anon',
    },
    message: 'Middleware processed request',
  })

  return response
}
