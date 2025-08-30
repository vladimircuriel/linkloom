import DashboardIcon from '@components/icons/DashboardIcon'
import UrlsAnalyticsIcon from '@components/icons/UrlsAnalyticsIcon'
import UrlsIcon from '@components/icons/UrlsIcon'
import UserAnalyticsIcon from '@components/icons/UserAnalyticsIcon'
import UserProfileIcon from '@components/icons/UserProfileIcon'
import UsersIcon from '@components/icons/UsersIcon'

const NAVIGATION = [
  {
    title: 'Pages',
    list: [
      {
        label: 'Dashboard',
        href: '/dashboard',
        icon: <DashboardIcon />,
      },
      {
        label: 'Users',
        href: '/dashboard/users',
        icon: <UsersIcon />,
      },
      {
        label: 'Urls',
        href: '/dashboard/urls',
        icon: <UrlsIcon />,
      },
    ],
  },
  {
    title: 'Analytics',
    list: [
      {
        label: 'Users',
        href: '/dashboard/analytics/users',
        icon: <UserAnalyticsIcon />,
      },
      {
        label: 'Urls',
        href: '/dashboard/analytics/urls',
        icon: <UrlsAnalyticsIcon />,
      },
    ],
  },
  {
    title: 'User',
    list: [
      {
        label: 'Profile',
        href: '/dashboard/user/profile',
        icon: <UserProfileIcon />,
      },
    ],
  },
]

export default NAVIGATION
