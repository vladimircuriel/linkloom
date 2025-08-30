import SearchInput from '@components/inputs/SearchInput'

type DashboardNavbarProps = Readonly<{
  currentRoute?: string
}>

export default function DashboardNavbar({ currentRoute }: DashboardNavbarProps) {
  return (
    <nav className="flex items-center justify-between w-full p-5 rounded-lg bg-background-gray">
      <h3 className="text-lg font-semibold capitalize text-main-dark-white">{currentRoute}</h3>
      <ul className="flex items-center justify-center gap-x-4">
        <li>
          <SearchInput placeholder="Search..." />
        </li>
      </ul>
    </nav>
  )
}
