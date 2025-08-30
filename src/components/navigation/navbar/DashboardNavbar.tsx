import SearchInput from '@components/inputs/SearchInput'
import Routes from '@/src/lib/constants/routes.constants'

type DashboardNavbarProps = Readonly<{
  currentRoute?: string
  pathname: string | null
}>

export default function DashboardNavbar({ currentRoute, pathname }: DashboardNavbarProps) {
  const isDashboard = pathname === Routes.DASHBOARD

  return (
    <nav className="flex items-center justify-between w-full p-5 rounded-lg bg-background-gray">
      <h3 className="text-lg font-semibold capitalize text-main-dark-white">{currentRoute}</h3>
      <ul className="flex items-center justify-center gap-x-4">
        {!isDashboard && (
          <li>
            <SearchInput placeholder="Search..." />
          </li>
        )}
        {isDashboard && (
          <li>
            <span className="text-sm text-main-dark-white">Welcome back!</span>
          </li>
        )}
      </ul>
    </nav>
  )
}
