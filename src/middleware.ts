// middleware.ts

import auth from '@lib/auth/auth'
import Routes from '@lib/constants/routes.constants'
import { type NextRequest, NextResponse } from 'next/server'

export default async function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname

  // lee token desde la cookie del request
  const token = request.cookies.get('session')?.value
  const payload = token ? await auth.verifyToken(token) : null

  // normaliza "usuario"
  const user = payload
    ? {
        id: String(payload.sub ?? ''),
        email: String((payload as any).email ?? ''),
        isAdmin: Boolean((payload as any).isAdmin ?? false),
      }
    : null

  const isOnDashboard = path.startsWith(Routes.DASHBOARD)
  const isOnUsers = path.startsWith(Routes.USERS)
  const isOnLogin = path.startsWith(Routes.LOGIN)
  const isOnRegister = path.startsWith(Routes.REGISTER)
  const isOnShortener = path.startsWith(Routes.SHORTENER)
  const isOnSettings = path.startsWith(Routes.SETTINGS)

  if ((isOnDashboard || isOnUsers) && !user?.isAdmin) {
    return NextResponse.redirect(new URL(Routes.LOGIN, request.nextUrl))
  }

  if ((isOnLogin || isOnRegister) && user) {
    return NextResponse.redirect(new URL(Routes.HOME, request.nextUrl))
  }

  if ((isOnShortener || isOnSettings) && !user) {
    return NextResponse.redirect(new URL(Routes.HOME, request.nextUrl))
  }

  const requestHeaders = new Headers(request.headers)
  requestHeaders.set('x-pathname', request.nextUrl.pathname)

  const response = NextResponse.next({
    request: {
      headers: requestHeaders,
    },
  })

  return response
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|.*\\.png$).*)'],
}
