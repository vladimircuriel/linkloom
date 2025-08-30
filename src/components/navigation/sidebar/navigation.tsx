import DashboardIcon from '@components/icons/DashboardIcon'
import UrlsAnalyticsIcon from '@components/icons/UrlsAnalyticsIcon'
import UrlsIcon from '@components/icons/UrlsIcon'
import UserAnalyticsIcon from '@components/icons/UserAnalyticsIcon'
import UserProfileIcon from '@components/icons/UserProfileIcon'
import UsersIcon from '@components/icons/UsersIcon'
import Routes from '@lib/constants/routes.constants'

const NAVIGATION = [
  {
    title: 'Pages',
    list: [
      {
        label: 'Dashboard',
        href: `${Routes.DASHBOARD}`,
        icon: <DashboardIcon />,
      },
      {
        label: 'Users',
        href: `${Routes.DASHBOARD}/users`,
        icon: <UsersIcon />,
      },
      {
        label: 'Urls',
        href: `${Routes.DASHBOARD}/urls`,
        icon: <UrlsIcon />,
      },
    ],
  },
  {
    title: 'Analytics',
    list: [
      {
        label: 'Users',
        href: `${Routes.DASHBOARD}/analytics/users`,
        icon: <UserAnalyticsIcon />,
      },
      {
        label: 'Urls',
        href: `${Routes.DASHBOARD}/analytics/urls`,
        icon: <UrlsAnalyticsIcon />,
      },
    ],
  },
]

export default NAVIGATION
