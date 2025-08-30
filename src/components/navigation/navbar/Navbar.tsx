import Logo from '@components/brand/logo/Logo'
import Button from '@components/buttons/Button'
import LoginIcon from '@components/icons/LoginIcon'
import { logout } from '@lib/actions/auth.action'
import Routes from '@lib/constants/routes.constants'
import { headers } from 'next/headers'
import Link from 'next/link'

type NavbarProps = Readonly<{
  authenticated: boolean
  adminPermissions: boolean
}>

export default async function Navbar({
  authenticated = false,
  adminPermissions = false,
}: NavbarProps) {
  const headersList = await headers()
  const pathname = headersList.get('x-pathname')
  const isOnShortener = pathname === Routes.SHORTENER

  return (
    <nav className="flex items-center justify-between px-4 py-3">
      <Link href={Routes.HOME}>
        <Logo />
      </Link>
      <div className="flex gap-x-4">
        {!authenticated && (
          <Link href={Routes.LOGIN}>
            <Button className="bg-main-gray border-main-gray-border active:bg-main-gray-border">
              Login <LoginIcon />
            </Button>
          </Link>
        )}
        {!authenticated && (
          <Link className="hidden md:inline" href={Routes.REGISTER}>
            <Button shadow className="bg-main-blue border-main-blue active:bg-main-blue-active">
              Register Now
            </Button>
          </Link>
        )}
        {authenticated && adminPermissions && (
          <Link href={Routes.DASHBOARD}>
            <Button
              shadow
              className="hidden sm:block bg-main-blue border-main-blue active:bg-main-blue-active"
            >
              Dashboard
            </Button>
          </Link>
        )}
        {authenticated && !isOnShortener && (
          <Link href={Routes.SHORTENER}>
            <Button
              shadow
              className="hidden sm:block bg-main-blue border-main-blue active:bg-main-blue-active"
            >
              Shortener
            </Button>
          </Link>
        )}
        {authenticated && (
          <form action={logout}>
            <Button className="bg-main-gray border-main-gray-border active:bg-main-gray-border">
              Logout
            </Button>
          </form>
        )}
      </div>
    </nav>
  )
}
