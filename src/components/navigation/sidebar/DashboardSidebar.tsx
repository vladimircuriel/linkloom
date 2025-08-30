'use client'

import LogoutButton from '@components/buttons/LogoutButton'
import HomeIcon from '@components/icons/HomeIcon'
import User from '@components/user/User'
import Routes from '@lib/constants/routes.constants'
import type { UserDoc } from '@lib/models/user/user.model'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import NAVIGATION from './navigation'

type DashboardSidebarProps = Readonly<{
  user: UserDoc
}>

export default function DashboardSidebar({ user }: DashboardSidebarProps) {
  const pathname = usePathname()

  return (
    <aside className="w-full pt-5 bg-background-gray rounded-2xl">
      <nav className="flex flex-col mx-6 gap-y-5">
        <User user={user} />
        <ul>
          {NAVIGATION.map((cat) => (
            <li key={cat.title} className="flex flex-col gap-y-2">
              <span className="text-xs font-semibold text-start text-main-dark-white">
                {cat.title}
              </span>
              {cat.list.map((item) => (
                <Link
                  key={item.label}
                  className={`flex items-center w-full p-3 transition rounded-lg gap-x-3 hover:bg-main-blue/50 ${pathname === item.href ? 'bg-main-blue' : ''}`}
                  href={item.href}
                >
                  {item.icon}
                  {item.label}
                </Link>
              ))}
            </li>
          ))}
        </ul>
        <div className="flex flex-col gap-y-2 mt-64">
          <Link
            href={Routes.SHORTENER}
            className="flex items-center w-full p-3 transition rounded-lg gap-x-3 hover:bg-main-blue/50"
          >
            <HomeIcon />
            Shortener
          </Link>
          <LogoutButton />
        </div>
      </nav>
    </aside>
  )
}
